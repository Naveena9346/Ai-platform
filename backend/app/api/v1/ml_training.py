import uuid
from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.config import settings
from app.api.deps import get_current_user
from app.models.user import User
from app.models.dataset import DatasetVersion
from app.models.model import MLModel, ModelEvaluation
from app.schemas.ml import MLTrainRequest, MLModelResponse
from app.services.ml_trainer_service import MLTrainerService
from app.services.gamification_engine import GamificationEngine
from app.core.exceptions import NotFoundError

router = APIRouter(prefix="/ml", tags=["Machine Learning Training"])


@router.post("/train", response_model=MLModelResponse, status_code=201)
async def train_model(
    request: MLTrainRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    ds_ver_id = request.dataset_version_id
    if isinstance(ds_ver_id, str):
        try:
            ds_ver_id = uuid.UUID(ds_ver_id)
        except ValueError:
            pass

    v_res = await db.execute(
        select(DatasetVersion).where(
            (DatasetVersion.id == ds_ver_id) | (DatasetVersion.dataset_id == ds_ver_id)
        )
    )
    version = v_res.scalars().first()
    if not version:
        raise NotFoundError("DatasetVersion", request.dataset_version_id)

    model_id = uuid.uuid4()
    artifact_filename = f"{model_id}_{request.algorithm}.joblib"
    artifact_path = settings.STORAGE_DIR / "models" / artifact_filename

    eval_result = MLTrainerService.train_model(
        file_path=version.file_path,
        artifact_save_path=artifact_path,
        request=request
    )

    user_id = current_user.id
    if isinstance(user_id, str):
        try:
            user_id = uuid.UUID(user_id)
        except ValueError:
            pass

    new_model = MLModel(
        id=model_id,
        user_id=user_id,
        dataset_version_id=version.id,
        name=request.model_name,
        algorithm=request.algorithm,
        problem_type=request.problem_type,
        target_column=request.target_column,
        feature_columns={"features": request.feature_columns},
        hyperparameters=request.hyperparameters,
        model_artifact_path=str(artifact_path)
    )
    db.add(new_model)
    await db.flush()

    new_eval = ModelEvaluation(
        model_id=new_model.id,
        split_type="test",
        metrics=eval_result["metrics"],
        confusion_matrix=eval_result["confusion_matrix"],
        roc_curve_data=eval_result["roc_curve_data"],
        feature_importances=eval_result["feature_importances"],
        shap_values_summary=eval_result["shap_values_summary"]
    )
    db.add(new_eval)
    await db.commit()

    # Award XP
    xp_to_award = settings.XP_BASE_ML_TRAIN
    if request.run_optuna_tuning:
        xp_to_award += settings.XP_BASE_HYPEROPT

    await GamificationEngine.add_xp_and_update_profile(
        db, user_id=user_id, xp_to_add=xp_to_award
    )

    result = await db.execute(
        select(MLModel).options(selectinload(MLModel.evaluations)).where(MLModel.id == new_model.id)
    )
    return result.scalar_one()


@router.get("/models", response_model=list[MLModelResponse])
async def list_user_models(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    user_id = current_user.id
    if isinstance(user_id, str):
        try:
            user_id = uuid.UUID(user_id)
        except ValueError:
            pass

    result = await db.execute(
        select(MLModel).options(selectinload(MLModel.evaluations)).where(MLModel.user_id == user_id)
    )
    return result.scalars().all()
