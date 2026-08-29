from typing import Any
from pydantic import BaseModel


class DescriptiveStatsResponse(BaseModel):
    mean: float | None = None
    median: float | None = None
    std: float | None = None
    min: float | None = None
    max: float | None = None
    skewness: float | None = None
    kurtosis: float | None = None
    q25: float | None = None
    q75: float | None = None
    missing_count: int
    missing_percentage: float
    unique_count: int


class CorrelationMatrixResponse(BaseModel):
    method: str
    columns: list[str]
    matrix: list[list[float]]


class DistributionResponse(BaseModel):
    column: str
    is_numeric: bool
    histogram_bins: list[float] = []
    histogram_counts: list[int] = []
    category_counts: dict[str, int] = {}
    shapiro_p_value: float | None = None
    is_normal: bool | None = None


class EDASummaryResponse(BaseModel):
    dataset_id: str
    total_rows: int
    total_columns: int
    numerical_columns: list[str]
    categorical_columns: list[str]
    missing_data_summary: dict[str, int]
    stats: dict[str, DescriptiveStatsResponse]
    correlations: CorrelationMatrixResponse
