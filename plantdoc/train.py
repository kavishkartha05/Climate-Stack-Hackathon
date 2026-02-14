"""Train a PlantDoc classifier."""
import argparse
from pathlib import Path

import tensorflow as tf

from plantdoc.config import (
    TRAIN_DIR,
    TEST_DIR,
    OUTPUT_DIR,
    LEARNING_RATE,
    MOMENTUM,
    LOSS,
    METRICS,
    BATCH_SIZE,
    EPOCHS,
    SUPPORTED_MODELS,
)
from plantdoc.dataset import build_train_dataset, build_test_dataset
from plantdoc.models import build_model


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", type=str, default="VGG16", choices=SUPPORTED_MODELS)
    parser.add_argument("--epochs", type=int, default=EPOCHS)
    parser.add_argument("--batch-size", type=int, default=BATCH_SIZE)
    parser.add_argument("--lr", type=float, default=LEARNING_RATE)
    args = parser.parse_args()

    train_ds = build_train_dataset(batch_size=args.batch_size)
    test_ds = build_test_dataset(batch_size=args.batch_size)

    class_names = train_ds.class_names
    num_classes = len(class_names)

    model = build_model(args.model, num_classes)
    model.compile(
        optimizer=tf.keras.optimizers.SGD(learning_rate=args.lr, momentum=MOMENTUM),
        loss=LOSS,
        metrics=METRICS,
    )

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ckpt_path = OUTPUT_DIR / f"{args.model.lower()}_plantdoc.keras"

    model.fit(
        train_ds,
        validation_data=test_ds,
        epochs=args.epochs,
        callbacks=[
            tf.keras.callbacks.ModelCheckpoint(
                str(ckpt_path), save_best_only=True, monitor="val_accuracy", mode="max"
            ),
        ],
    )
    print(f"Best model saved to {ckpt_path}")


if __name__ == "__main__":
    main()
