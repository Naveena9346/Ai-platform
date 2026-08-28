import logging
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from nexus_backend.models.analytics import ApiUsageLog, AuditLog

logger = logging.getLogger("nexus.analytics.service")


class AnalyticsService:
    """
    Financial Cost Aggregation, Token Usage Reporting, and Platform Governance Analytics.
    """

    async def log_api_usage(
        self,
        db: AsyncSession,
        user_id: Optional[str],
        endpoint: str,
        model_name: Optional[str],
        prompt_tokens: int,
        completion_tokens: int,
        cost_usd: float,
        response_time_ms: int,
        status_code: int = 200
    ) -> ApiUsageLog:
        """
        Record API usage entry with financial cost and response metrics.
        """
        log = ApiUsageLog(
            user_id=user_id,
            endpoint=endpoint,
            model_name=model_name,
            prompt_tokens=prompt_tokens,
            completion_tokens=completion_tokens,
            total_tokens=prompt_tokens + completion_tokens,
            cost_usd=cost_usd,
            response_time_ms=response_time_ms,
            status_code=status_code
        )
        db.add(log)
        await db.commit()
        return log

    async def get_overview_metrics(self, db: AsyncSession, user_id: Optional[str] = None) -> Dict[str, Any]:
        """
        Aggregate total requests, token counts, total cost, and avg latency.
        """
        stmt = select(
            func.count(ApiUsageLog.id).label("total_requests"),
            func.coalesce(func.sum(ApiUsageLog.prompt_tokens), 0).label("total_prompt_tokens"),
            func.coalesce(func.sum(ApiUsageLog.completion_tokens), 0).label("total_completion_tokens"),
            func.coalesce(func.sum(ApiUsageLog.total_tokens), 0).label("total_tokens"),
            func.coalesce(func.sum(ApiUsageLog.cost_usd), 0.0).label("total_cost_usd"),
            func.coalesce(func.avg(ApiUsageLog.response_time_ms), 0).label("avg_latency_ms")
        )

        if user_id:
            stmt = stmt.where(ApiUsageLog.user_id == user_id)

        res = await db.execute(stmt)
        row = res.first()

        return {
            "total_requests": row.total_requests if row else 0,
            "total_tokens": row.total_tokens if row else 0,
            "total_prompt_tokens": row.total_prompt_tokens if row else 0,
            "total_completion_tokens": row.total_completion_tokens if row else 0,
            "total_cost_usd": float(row.total_cost_usd) if row else 0.0,
            "avg_latency_ms": round(float(row.avg_latency_ms), 2) if row else 0.0
        }


analytics_service = AnalyticsService()
