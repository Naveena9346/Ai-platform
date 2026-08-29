from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.users import router as users_router
from app.api.v1.datasets import router as datasets_router
from app.api.v1.preprocessing import router as preprocessing_router
from app.api.v1.eda import router as eda_router
from app.api.v1.ml_training import router as ml_router
from app.api.v1.inference import router as inference_router
from app.api.v1.gamification import router as gamification_router
from app.api.v1.quests import router as quests_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router)
api_v1_router.include_router(users_router)
api_v1_router.include_router(datasets_router)
api_v1_router.include_router(preprocessing_router)
api_v1_router.include_router(eda_router)
api_v1_router.include_router(ml_router)
api_v1_router.include_router(inference_router)
api_v1_router.include_router(gamification_router)
api_v1_router.include_router(quests_router)
