from fastapi import APIRouter

from nexus_backend.api.v1.auth import router as auth_router
from nexus_backend.api.v1.prompts import router as prompts_router
from nexus_backend.api.v1.chat import router as chat_router
from nexus_backend.api.v1.documents import router as docs_router
from nexus_backend.api.v1.workflows import router as workflows_router
from nexus_backend.api.v1.agents import router as agents_router
from nexus_backend.api.v1.gamification import router as gamification_router
from nexus_backend.api.v1.analytics import router as analytics_router
from nexus_backend.api.v1.admin import router as admin_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router)
api_v1_router.include_router(prompts_router)
api_v1_router.include_router(chat_router)
api_v1_router.include_router(docs_router)
api_v1_router.include_router(workflows_router)
api_v1_router.include_router(agents_router)
api_v1_router.include_router(gamification_router)
api_v1_router.include_router(analytics_router)
api_v1_router.include_router(admin_router)
