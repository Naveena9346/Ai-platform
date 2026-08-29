import uuid
from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.core.config import settings
from app.api.deps import get_current_user
from app.models.user import User
from app.models.dataset import Dataset
from app.schemas.eda import EDASummaryResponse
from app.services.eda_service import EDAService
from app.services.gamification_engine import GamificationEngine
from app.core.exceptions import NotFoundError

router = APIRouter(prefix="/eda", tags=["Exploratory Data Analysis"])


@router.get("/{dataset_id}/summary", response_model=EDASummaryResponse)
async def get_eda_summary(
    dataset_id: uuid.UUID,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    user_id = current_user.id
    if isinstance(user_id, str):
        try:
            user_id = uuid.UUID(user_id)
        except ValueError:
            pass

    result = await db.execute(select(Dataset).where(Dataset.id == dataset_id, Dataset.user_id == user_id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise NotFoundError("Dataset", dataset_id)

    eda_report = EDAService.generate_full_eda_report(dataset.file_path)

    # Award XP for generating EDA
    await GamificationEngine.add_xp_and_update_profile(
        db, user_id=current_user.id, xp_to_add=settings.XP_BASE_EDA
    )

    return EDASummaryResponse(
        dataset_id=str(dataset.id),
        total_rows=eda_report["total_rows"],
        total_columns=eda_report["total_columns"],
        numerical_columns=eda_report["numerical_columns"],
        categorical_columns=eda_report["categorical_columns"],
        missing_data_summary=eda_report["missing_data_summary"],
        stats=eda_report["stats"],
        correlations=eda_report["correlations"]
    )
