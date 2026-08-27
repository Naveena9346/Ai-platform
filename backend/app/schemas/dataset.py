from uuid import UUID
from datetime import datetime
from typing import Any
from pydantic import BaseModel, ConfigDict


class DatasetVersionResponse(BaseModel):
    id: UUID
    dataset_id: UUID
    version_number: int
    transformation_log: dict[str, Any]
    file_path: str
    row_count: int
    column_count: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class DatasetResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    description: str | None = None
    file_size_bytes: int
    file_format: str
    row_count: int
    column_count: int
    schema_metadata: dict[str, Any]
    created_at: datetime
    versions: list[DatasetVersionResponse] = []

    model_config = ConfigDict(from_attributes=True)


class DatasetPreviewResponse(BaseModel):
    id: UUID
    name: str
    row_count: int
    column_count: int
    columns: list[str]
    dtypes: dict[str, str]
    preview_rows: list[dict[str, Any]]
    summary_stats: dict[str, Any]
