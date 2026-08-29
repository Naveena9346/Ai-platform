import uuid
from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.core.config import settings
from app.api.deps import get_current_user
from app.models.user import User
from app.models.dataset import Dataset, DatasetVersion
from app.schemas.preprocessing import DataCleaningRequest, DataCleaningResponse
from app.services.data_cleaning_service import DataCleaningService
from app.services.gamification_engine import GamificationEngine
from app.core.exceptions import NotFoundError

router = APIRouter(prefix="/preprocessing", tags=["Preprocessing & Cleaning"])


@router.post("/clean", response_model=DataCleaningResponse)
async def clean_dataset(
    request: DataCleaningRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    result = await db.execute(select(Dataset).where(Dataset.id == request.dataset_id, Dataset.user_id == current_user.id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise NotFoundError("Dataset", request.dataset_id)

    # Calculate version count
    v_res = await db.execute(select(DatasetVersion).where(DatasetVersion.dataset_id == dataset.id))
    existing_versions = v_res.scalars().all()
    next_v = len(existing_versions) + 1

    cleaned_filename = f"cleaned_v{next_v}_{dataset.id}.parquet"
    output_path = settings.STORAGE_DIR / "cleaned" / cleaned_filename

    cleaning_result = DataCleaningService.execute_cleaning_pipeline(
        input_file_path=dataset.file_path,
        output_file_path=output_path,
        request=request
    )

    # Save version record
    new_version = DatasetVersion(
        dataset_id=dataset.id,
        version_number=next_v,
        transformation_log={"transformations": cleaning_result["applied_transformations"]},
        file_path=str(output_path),
        row_count=cleaning_result["rows_remaining"],
        column_count=cleaning_result["columns_count"]
    )
    db.add(new_version)
    await db.commit()

    # Award XP
    xp_earned = settings.XP_BASE_CLEANING
    await GamificationEngine.add_xp_and_update_profile(
        db, user_id=current_user.id, xp_to_add=xp_earned
    )

    return DataCleaningResponse(
        dataset_id=dataset.id,
        new_version_id=new_version.id,
        version_number=next_v,
        rows_remaining=cleaning_result["rows_remaining"],
        columns_count=cleaning_result["columns_count"],
        applied_transformations={"steps": cleaning_result["applied_transformations"]},
        xp_earned=xp_earned
    )
