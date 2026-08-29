import pandas as pd
from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.model import MLModel
from app.schemas.ml import PredictionSingleRequest, PredictionSingleResponse
from app.utils.model_serializers import load_trained_model_artifact
from app.core.exceptions import NotFoundError, DataProcessingError

router = APIRouter(prefix="/ml/predict", tags=["Inference & Prediction"])


@router.post("/single", response_model=PredictionSingleResponse)
async def predict_single(
    request: PredictionSingleRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    result = await db.execute(select(MLModel).where(MLModel.id == request.model_id, MLModel.user_id == current_user.id))
    model_obj = result.scalar_one_or_none()
    if not model_obj:
        raise NotFoundError("MLModel", request.model_id)

    try:
        model = load_trained_model_artifact(model_obj.model_artifact_path)
    except Exception as e:
        raise DataProcessingError(f"Failed to load model artifact: {str(e)}")

    feature_cols = model_obj.feature_columns.get("features", [])
    input_data = {col: [request.features.get(col, 0)] for col in feature_cols}
    input_df = pd.DataFrame(input_data)

    pred = model.predict(input_df)[0]

    prob_dict = None
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(input_df)[0]
        prob_dict = {f"class_{i}": float(round(p, 4)) for i, p in enumerate(probs)}

    return PredictionSingleResponse(
        model_id=model_obj.id,
        prediction=pred if isinstance(pred, (int, float, str)) else str(pred),
        prediction_probability=prob_dict,
        shap_local_attribution=None
    )
