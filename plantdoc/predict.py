"""
Load the trained PlantDoc .keras model and predict class for an image.
Usage:
  python -m plantdoc.predict path/to/model.keras path/to/leaf_image.jpg
  python -m plantdoc.predict path/to/model.keras path/to/leaf_image.jpg --classes class_names.json
"""
import argparse
import json
from pathlib import Path

import tensorflow as tf

IMG_SIZE = (100, 100)
NUM_CLASSES = 27


def _build_vgg16_plantdoc():
    """VGG16 100x100, global avg pool, Dense(27)."""
    keras = tf.keras
    inp = keras.layers.Input(shape=(*IMG_SIZE, 3))
    base = keras.applications.VGG16(
        include_top=False, weights=None, input_tensor=inp, pooling="avg"
    )
    out = keras.layers.Dense(NUM_CLASSES, activation="softmax")(base.output)
    return keras.Model(inp, out)


def load_model_and_classes(model_path, classes_path=None):
    model = _build_vgg16_plantdoc()
    model_path = Path(model_path)
    if model_path.suffix.lower() == ".keras":
        raise ValueError("Use vgg16_plantdoc.weights.h5 for this API.")
    model.load_weights(model_path)
    if classes_path and Path(classes_path).is_file():
        with open(classes_path) as f:
            class_names = json.load(f)
    else:
        class_names = None
    return model, class_names


def preprocess(image_path):
    img = tf.io.read_file(str(image_path))
    img = tf.io.decode_image(img, channels=3, expand_animations=False)
    img = tf.image.resize(img, IMG_SIZE)
    img = img / 255.0
    return tf.expand_dims(img, 0)


def preprocess_bytes(image_bytes: bytes):
    img = tf.io.decode_image(image_bytes, channels=3, expand_animations=False)
    img = tf.image.resize(img, IMG_SIZE)
    img = img / 255.0
    return tf.expand_dims(img, 0)


def predict(model, image_path, class_names=None):
    x = preprocess(image_path)
    return predict_batch(model, x, class_names)


def predict_from_bytes(model, image_bytes: bytes, class_names=None):
    x = preprocess_bytes(image_bytes)
    return predict_batch(model, x, class_names)


def predict_batch(model, x, class_names=None):
    logits = model(x, training=False)
    probs = tf.nn.softmax(logits[0]).numpy()
    idx = int(tf.argmax(probs, axis=-1).numpy())
    conf = float(probs[idx])
    label = class_names[idx] if class_names else f"class_{idx}"
    return label, conf, probs.tolist()


def main():
    parser = argparse.ArgumentParser(description="Predict plant disease from a leaf image")
    parser.add_argument("model", type=str, help="Path to .keras model file (e.g. vgg16_plantdoc.keras)")
    parser.add_argument("image", type=str, help="Path to leaf image (jpg/png)")
    parser.add_argument("--classes", "-c", type=str, default=None, help="Optional JSON list of class names (order = model output index)")
    args = parser.parse_args()

    model_path = Path(args.model)
    image_path = Path(args.image)
    if not model_path.is_file():
        raise SystemExit(f"Model not found: {model_path}")
    if not image_path.is_file():
        raise SystemExit(f"Image not found: {image_path}")

    model, class_names = load_model_and_classes(args.model, args.classes)
    label, conf, probs = predict(model, image_path, class_names)

    print(f"Prediction: {label}")
    print(f"Confidence: {conf:.2%}")
    if class_names and len(probs) <= 10:
        for i, p in enumerate(probs):
            print(f"  {class_names[i]}: {p:.2%}")


if __name__ == "__main__":
    main()
