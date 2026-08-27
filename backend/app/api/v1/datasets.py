import uuid
from typing import Annotated
from pathlib import Path
from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.config import settings
from app.api.deps import get_current_user
from app.models.user import User
from app.models.dataset import Dataset, DatasetVersion
from app.schemas.dataset import DatasetResponse, DatasetPreviewResponse
from app.utils.pandas_helpers import read_dataset_file, infer_schema_metadata, save_dataset_file
from app.services.gamification_engine import GamificationEngine
from app.core.exceptions import NotFoundError, DataProcessingError

router = APIRouter(prefix="/datasets", tags=["Datasets"])


@router.post("/upload", response_model=DatasetResponse, status_code=201)
async def upload_dataset(
    file: UploadFile = File(...),
    current_user: Annotated[User, Depends(get_current_user)] = None,
    db: Annotated[AsyncSession, Depends(get_db)] = None
):
    if not file.filename:
        raise DataProcessingError("File name is required")

    ext = Path(file.filename).suffix.lower()
    if ext not in [".csv", ".json", ".parquet", ".xlsx", ".tsv"]:
        raise DataProcessingError(f"Unsupported format: {ext}")

    file_id = uuid.uuid4()
    saved_filename = f"{file_id}{ext}"
    target_path = settings.STORAGE_DIR / "uploads" / saved_filename

    content = await file.read()
    with open(target_path, "wb") as f:
        f.write(content)

    try:
        df = read_dataset_file(target_path)
    except Exception as e:
        raise DataProcessingError(f"Could not parse uploaded file: {str(e)}")

    schema = infer_schema_metadata(df)

    new_dataset = Dataset(
        id=file_id,
        user_id=current_user.id,
        name=Path(file.filename).stem,
        file_path=str(target_path),
        file_size_bytes=len(content),
        file_format=ext.replace(".", ""),
        row_count=len(df),
        column_count=len(df.columns),
        schema_metadata=schema
    )
    db.add(new_dataset)
    await db.flush()

    # Initial Version 1
    v1 = DatasetVersion(
        dataset_id=new_dataset.id,
        version_number=1,
        transformation_log={"action": "initial_upload", "filename": file.filename},
        file_path=str(target_path),
        row_count=len(df),
        column_count=len(df.columns)
    )
    db.add(v1)
    await db.commit()

    # Award XP for dataset upload
    await GamificationEngine.add_xp_and_update_profile(
        db, user_id=current_user.id, xp_to_add=settings.XP_BASE_INGESTION
    )

    result = await db.execute(
        select(Dataset).options(selectinload(Dataset.versions)).where(Dataset.id == new_dataset.id)
    )
    return result.scalar_one()


@router.get("", response_model=list[DatasetResponse])
async def list_datasets(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    result = await db.execute(
        select(Dataset).options(selectinload(Dataset.versions)).where(Dataset.user_id == current_user.id)
    )
    return result.scalars().all()


@router.get("/{dataset_id}", response_model=DatasetPreviewResponse)
async def preview_dataset(
    dataset_id: uuid.UUID,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    result = await db.execute(select(Dataset).where(Dataset.id == dataset_id, Dataset.user_id == current_user.id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise NotFoundError("Dataset", dataset_id)

    df = read_dataset_file(dataset.file_path, nrows=50)

    preview_rows = df.head(10).to_dict(orient="records")
    dtypes_dict = {col: str(dtype) for col, dtype in df.dtypes.items()}

    return DatasetPreviewResponse(
        id=dataset.id,
        name=dataset.name,
        row_count=dataset.row_count,
        column_count=dataset.column_count,
        columns=list(df.columns),
        dtypes=dtypes_dict,
        preview_rows=preview_rows,
        summary_stats=dataset.schema_metadata
    )
