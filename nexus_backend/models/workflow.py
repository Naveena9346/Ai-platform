from sqlalchemy import Column, String, Boolean, Text, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from nexus_backend.core.base import BaseModel, GUID


class AIWorkflow(BaseModel):
    """
    AI Workflow DAG Graph definition entity.
    """
    __tablename__ = "ai_workflows"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    dag_structure = Column(JSON, nullable=False)  # nodes & edges configuration
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    user = relationship("User", back_populates="workflows")
    executions = relationship("WorkflowExecution", back_populates="workflow", cascade="all, delete-orphan")


class WorkflowExecution(BaseModel):
    """
    Individual execution run of an AI Workflow DAG.
    """
    __tablename__ = "workflow_executions"

    workflow_id = Column(GUID(), ForeignKey("ai_workflows.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(GUID(), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    status = Column(String(30), default="pending", nullable=False)  # pending, running, completed, failed
    execution_time_ms = Column(Integer, nullable=True)
    input_data = Column(JSON, nullable=True)
    output_data = Column(JSON, nullable=True)
    error_log = Column(Text, nullable=True)

    # Relationships
    workflow = relationship("AIWorkflow", back_populates="executions")
