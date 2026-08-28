import logging
from typing import Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from nexus_backend.models.analytics import AuditLog

logger = logging.getLogger("nexus.analytics.audit")


class AuditService:
    """
    SOC2 Compliance Security Audit Logger.
    """

    async def log_security_event(
        self,
        db: AsyncSession,
        user_id: Optional[str],
        action: str,
        resource_type: str,
        resource_id: Optional[str] = None,
        ip_address: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None
    ) -> AuditLog:
        """
        Record security event entry into immutable audit trail.
        """
        audit_entry = AuditLog(
            user_id=user_id,
            action=action,
            resource_type=resource_type,
            resource_id=resource_id,
            ip_address=ip_address,
            details=details or {}
        )
        db.add(audit_entry)
        await db.commit()
        logger.info(f"Audit log recorded: [{action}] on {resource_type}:{resource_id} by User {user_id}")
        return audit_entry


audit_service = AuditService()
