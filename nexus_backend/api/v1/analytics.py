from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.api.deps import get_current_user
from nexus_backend.analytics.service import analytics_service

router = APIRouter(prefix="/analytics", tags=["Analytics & Usage Tracking"])


@router.get("/overview")
async def get_analytics_overview(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get aggregated token counts, requests, financial cost, and average latency.
    """
    metrics = await analytics_service.get_overview_metrics(db, user_id=str(current_user.id))
    return metrics
