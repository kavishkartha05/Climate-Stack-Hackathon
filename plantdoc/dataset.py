"""PlantDoc dataset loading."""
import tensorflow as tf
from pathlib import Path

from plantdoc.config import TRAIN_DIR, TEST_DIR, IMAGE_SIZE, BATCH_SIZE, RANDOM_STATE


def _augment(image, label):
    image = tf.image.random_flip_left_right(image)
    image = tf.image.random_flip_up_down(image)
    image = tf.image.random_brightness(image, 0.2)
    image = tf.image.random_contrast(image, 0.8, 1.2)
    image = tf.clip_by_value(image, 0.0, 1.0)
    return image, label


def build_train_dataset(
    train_dir=None,
    image_size=None,
    batch_size=None,
    augment=True,
    seed=RANDOM_STATE,
):
    train_dir = Path(train_dir or TRAIN_DIR)
    if not train_dir.is_dir():
        raise FileNotFoundError(
            f"Train dir not found: {train_dir}. Clone the repo:\n"
            "  mkdir -p data && cd data && git clone https://github.com/pratikkayal/PlantDoc-Dataset.git"
        )
    image_size = image_size or IMAGE_SIZE
    batch_size = batch_size or BATCH_SIZE

    ds = tf.keras.utils.image_dataset_from_directory(
        train_dir,
        labels="inferred",
        label_mode="categorical",
        image_size=image_size,
        batch_size=batch_size,
        shuffle=True,
        seed=seed,
    )
    ds = ds.map(
        lambda x, y: (tf.keras.layers.Rescaling(1.0 / 255.0)(x), y),
        num_parallel_calls=tf.data.AUTOTUNE,
    )
    if augment:
        ds = ds.map(_augment, num_parallel_calls=tf.data.AUTOTUNE)
    return ds.prefetch(tf.data.AUTOTUNE)


def build_test_dataset(test_dir=None, image_size=None, batch_size=None):
    test_dir = Path(test_dir or TEST_DIR)
    if not test_dir.is_dir():
        raise FileNotFoundError(f"Test dir not found: {test_dir}")
    image_size = image_size or IMAGE_SIZE
    batch_size = batch_size or BATCH_SIZE

    ds = tf.keras.utils.image_dataset_from_directory(
        test_dir,
        labels="inferred",
        label_mode="categorical",
        image_size=image_size,
        batch_size=batch_size,
        shuffle=False,
    )
    ds = ds.map(
        lambda x, y: (tf.keras.layers.Rescaling(1.0 / 255.0)(x), y),
        num_parallel_calls=tf.data.AUTOTUNE,
    )
    return ds.prefetch(tf.data.AUTOTUNE)
