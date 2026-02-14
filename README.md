# PlantDoc model reproduction

Classification setup from **PlantDoc: A Dataset for Visual Plant Disease Detection** (CoDS-COMAD 2020).  
Dataset: [pratikkayal/PlantDoc-Dataset](https://github.com/pratikkayal/PlantDoc-Dataset).

## 1. Dataset

Clone the dataset so that `train/` and `test/` live under `data/PlantDoc-Dataset/`:

```bash
mkdir -p data && cd data && git clone https://github.com/pratikkayal/PlantDoc-Dataset.git
```

- `data/PlantDoc-Dataset/train/` — one subfolder per class  
- `data/PlantDoc-Dataset/test/` — same class subfolders

## 2. Install dependencies

```bash
pip install -r requirements.txt
```

## 3. Train

```bash
python -m plantdoc.train --model VGG16 --epochs 50
```

Other models: `InceptionV3`, `InceptionResNetV2`:

```bash
python -m plantdoc.train --model InceptionResNetV2 --epochs 50
```

Checkpoints are saved under `outputs/` (e.g. `outputs/vgg16_plantdoc.keras`).

## Train in the cloud

Upload `notebooks/plantdoc_train_colab.ipynb` to [Google Colab](https://colab.research.google.com), set runtime to T4 GPU, and run all cells. Download the `.keras` file and the `.weights.h5` file from the notebook.

## Using the trained model (inference)

Put `vgg16_plantdoc.weights.h5` in the project root. Optionally add `class_names.json` for readable labels.

```bash
python -m plantdoc.predict vgg16_plantdoc.weights.h5 path/to/leaf.jpg --classes class_names.json
```

Example output:
```
Prediction: Tomato leaf bacterial spot
Confidence: 87.32%
```

## FastAPI backend

Put `vgg16_plantdoc.weights.h5` and optionally `class_names.json` in the project root.

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

- **POST /predict** — upload a leaf image (form field `file`). Returns `label`, `confidence`, `all_classes`.
- **GET /health** — check that the model is loaded.

Example:
```bash
curl -X POST http://127.0.0.1:8000/predict -F "file=@data/PlantDoc-Dataset/test/Apple leaf/4120978-single-green-leaf-of-apple-tree.jpg"
```

Docs: http://127.0.0.1:8000/docs

## Reference

- **Paper:** [arXiv:1911.10317](https://arxiv.org/abs/1911.10317) / [ACM](https://doi.org/10.1145/3371158.3371196)
- **Dataset:** [GitHub - pratikkayal/PlantDoc-Dataset](https://github.com/pratikkayal/PlantDoc-Dataset) (CC-BY-4.0)
