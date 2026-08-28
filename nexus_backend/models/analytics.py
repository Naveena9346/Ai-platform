from sqlalchemy import Column, String, Boolean, Text, Numeric, Integer, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from nexus_backend.core.base import BaseModel


class ApiUsageLog(BaseModel):
    """
    Financial cost and token usage tracking log per API request.
    """
    __tablename__ = "api_usage_logs"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    endpoint = Column(String(255), nullable=False)
    model_name = Column(String(100), nullable=True)
    prompt_tokens = Column(Integer, default=0, nullable=False)
    completion_tokens = Column(Integer, default=0, nullable=False)
    total_tokens = Column(Integer, default=0, nullable=False)
    cost_usd = Column(Numeric(10, 6), default=0.000000, nullable=False)
    response_time_ms = Column(Integer, nullable=False)
    status_code = Column(Integer, nullable=False)


class AuditLog(BaseModel):
    """
    System governance & security audit log.
    """
    __tablename__ = "audit_logs"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(100), nullable=False)  # USER_LOGIN, MODEL_CREATED, PROMPT_DELETED
    resource_type = Column(String(50), nullable=False)
    resource_id = Column(String(100), nullable=True)
    ip_address = Column(String(45), nullable=True)
    details = Column(JSON, default={}, nullable=False)


class Notification(BaseModel):
    """
    User notification entity for gamification alerts & system updates.
    """
    __tablename__ = "notifications"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String(50), default="info", nullable=False)  # info, level_up, achievement, mission
    is_read = Column(Boolean, default=False, nullable=False)
