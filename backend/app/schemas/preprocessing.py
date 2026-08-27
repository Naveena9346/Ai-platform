from uuid import UUID
from typing import Any, Literal
from pydantic import BaseModel


class ImputationStep(BaseModel):
    column: str
    strategy: Literal["mean", "median", "mode", "constant", "knn", "mice"]
    fill_value: Any | None = None


class OutlierStep(BaseModel):
    column: str
    method: Literal["zscore", "iqr", "isolation_forest"]
    threshold: float = 3.0
    action: Literal["clip", "remove"] = "clip"


class EncodingStep(BaseModel):
    column: str
    method: Literal["onehot", "ordinal", "target", "frequency"]


class ScalingStep(BaseModel):
    columns: list[str]
    method: Literal["standard", "minmax", "robust"]


class DataCleaningRequest(BaseModel):
    dataset_id: UUID
    imputation_steps: list[ImputationStep] = []
    outlier_steps: list[OutlierStep] = []
    encoding_steps: list[EncodingStep] = []
    scaling_steps: list[ScalingStep] = []
    version_description: str = "Cleaned and preprocessed dataset"


class DataCleaningResponse(BaseModel):
    dataset_id: UUID
    new_version_id: UUID
    version_number: int
    rows_remaining: int
    columns_count: int
    applied_transformations: dict[str, Any]
    xp_earned: int
