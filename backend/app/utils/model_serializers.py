from pathlib import Path
from typing import Any
import joblib


def save_trained_model_artifact(model_object: Any, file_path: str | Path) -> None:
    path = Path(file_path)
    path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model_object, path, compress=3)


def load_trained_model_artifact(file_path: str | Path) -> Any:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Model artifact file not found at {path}")
    return joblib.load(path)
