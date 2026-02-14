"""PlantDoc configuration."""
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = PROJECT_ROOT / "data" / "PlantDoc-Dataset"
TRAIN_DIR = DATA_DIR / "train"
TEST_DIR = DATA_DIR / "test"
OUTPUT_DIR = PROJECT_ROOT / "outputs"

IMAGE_SIZE = (100, 100)
INPUT_SHAPE = (*IMAGE_SIZE, 3)

LEARNING_RATE = 0.001
MOMENTUM = 0.9
LOSS = "categorical_crossentropy"
METRICS = ["accuracy"]
USE_IMAGENET_WEIGHTS = True

TRAIN_SPLIT = 0.8
RANDOM_STATE = 42
BATCH_SIZE = 32
EPOCHS = 50

SUPPORTED_MODELS = ["VGG16", "InceptionV3", "InceptionResNetV2"]
