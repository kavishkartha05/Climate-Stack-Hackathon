"""VGG16, InceptionV3, InceptionResNetV2."""
import tensorflow as tf
from tensorflow import keras

from plantdoc.config import INPUT_SHAPE, USE_IMAGENET_WEIGHTS, SUPPORTED_MODELS


def build_model(model_name, num_classes, input_shape=None, use_imagenet=True):
    input_shape = input_shape or INPUT_SHAPE
    weights = "imagenet" if use_imagenet else None
    inp = keras.layers.Input(shape=input_shape)

    if model_name == "VGG16":
        base = keras.applications.VGG16(
            include_top=False, weights=weights, input_tensor=inp, pooling="avg"
        )
    elif model_name == "InceptionV3":
        base = keras.applications.InceptionV3(
            include_top=False, weights=weights, input_tensor=inp, pooling="avg"
        )
    elif model_name == "InceptionResNetV2":
        base = keras.applications.InceptionResNetV2(
            include_top=False, weights=weights, input_tensor=inp, pooling="avg"
        )
    else:
        raise ValueError(f"Model must be one of {SUPPORTED_MODELS}")

    x = base.output
    out = keras.layers.Dense(num_classes, activation="softmax")(x)
    return keras.Model(inputs=inp, outputs=out)
