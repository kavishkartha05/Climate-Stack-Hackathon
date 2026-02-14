"""
FastAPI backend: run a leaf image through the PlantDoc model.
  uvicorn main:app --reload
  POST /predict with multipart/form-data file "file" (image)
"""
from pathlib import Path

from fastapi import FastAPI, File, HTTPException, UploadFile
from pydantic import BaseModel

from plantdoc.predict import load_model_and_classes, predict_from_bytes

ROOT = Path(__file__).parent
MODEL_PATH = ROOT / "vgg16_plantdoc.weights.h5"
CLASSES_PATH = ROOT / "class_names.json"

app = FastAPI(title="PlantDoc API", description="Plant disease classification from leaf images")

model = None
class_names = None


@app.on_event("startup")
def load_model():
    global model, class_names
    if not MODEL_PATH.is_file():
        raise FileNotFoundError(f"Model not found: {MODEL_PATH}. Put vgg16_plantdoc.weights.h5 in the project root.")
    model, class_names = load_model_and_classes(str(MODEL_PATH), str(CLASSES_PATH) if CLASSES_PATH.is_file() else None)


class PredictResponse(BaseModel):
    label: str
    confidence: float
    all_classes: list[float] | None = None


@app.post("/predict", response_model=PredictResponse)
async def predict(file: UploadFile = File(..., description="Leaf image (jpg/png)")):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(400, "Upload must be an image (e.g. image/jpeg, image/png)")
    try:
        body = await file.read()
    except Exception as e:
        raise HTTPException(400, f"Failed to read file: {e}")
    if not body:
        raise HTTPException(400, "Empty file")
    try:
        label, conf, probs = predict_from_bytes(model, body, class_names)
    except Exception as e:
        raise HTTPException(422, f"Prediction failed (invalid image?): {e}")
    return PredictResponse(
        label=label,
        confidence=round(conf, 4),
        all_classes=probs,
    )


@app.get("/health")
def health():
    return {"status": "ok", "model_loaded": model is not None}
