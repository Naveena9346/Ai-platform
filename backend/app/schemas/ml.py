from uuid import UUID
from datetime import datetime
from typing import Any, Literal
from pydantic import BaseModel, ConfigDict


class MLTrainRequest(BaseModel):
    dataset_version_id: UUID
    model_name: str
    problem_type: Literal["regression", "classification", "clustering"]
    algorithm: Literal[
        "linear_regression", "ridge", "lasso", "elasticnet",
        "logistic_regression", "decision_tree", "random_forest",
        "knn", "naive_bayes", "xgboost", "svm", "kmeans", "dbscan"
    ]
    target_column: str | None = None
    feature_columns: list[str]
    hyperparameters: dict[str, Any] = {}
    test_size: float = 0.2
    random_state: int = 42
    cross_validation_folds: int = 5
    run_optuna_tuning: bool = False
    optuna_trials: int = 20


class ModelEvaluationResponse(BaseModel):
    id: UUID
    model_id: UUID
    split_type: str
    metrics: dict[str, float]
    confusion_matrix: dict[str, Any] | None = None
    roc_curve_data: dict[str, Any] | None = None
    feature_importances: dict[str, float] | None = None
    shap_values_summary: dict[str, Any] | None = None
    evaluated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class MLModelResponse(BaseModel):
    id: UUID
    user_id: UUID
    dataset_version_id: UUID
    name: str
    algorithm: str
    problem_type: str
    target_column: str | None = None
    feature_columns: list[str]
    hyperparameters: dict[str, Any]
    created_at: datetime
    evaluations: list[ModelEvaluationResponse] = []

    model_config = ConfigDict(from_attributes=True)


class PredictionSingleRequest(BaseModel):
    model_id: UUID
    features: dict[str, Any]


class PredictionSingleResponse(BaseModel):
    model_id: UUID
    prediction: Any
    prediction_probability: dict[str, float] | None = None
    shap_local_attribution: dict[str, float] | None = None


class BatchPredictionRequest(BaseModel):
    model_id: UUID
    dataset_id: UUID


class ModelComparisonResponse(BaseModel):
    models: list[MLModelResponse]
    comparison_table: list[dict[str, Any]]
