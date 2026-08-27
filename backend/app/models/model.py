import uuid
from datetime import datetime, timezone
from typing import Any
from sqlalchemy import String, DateTime, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship


from app.core.database import Base


class MLModel(Base):
    __tablename__ = "ml_models"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    dataset_version_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("dataset_versions.id", ondelete="CASCADE"), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    algorithm: Mapped[str] = mapped_column(String(50), nullable=False)
    problem_type: Mapped[str] = mapped_column(String(30), nullable=False)
    target_column: Mapped[str | None] = mapped_column(String(255), nullable=True)
    feature_columns: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    hyperparameters: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    model_artifact_path: Mapped[str] = mapped_column(String(512), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    user = relationship("User", back_populates="ml_models")
    dataset_version = relationship("DatasetVersion", back_populates="ml_models")
    evaluations = relationship("ModelEvaluation", back_populates="ml_model", cascade="all, delete-orphan")


class ModelEvaluation(Base):
    __tablename__ = "model_evaluations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    model_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("ml_models.id", ondelete="CASCADE"), nullable=False)
    split_type: Mapped[str] = mapped_column(String(20), nullable=False)
    metrics: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False)
    confusion_matrix: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    roc_curve_data: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    feature_importances: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    shap_values_summary: Mapped[dict[str, Any] | None] = mapped_column(JSON, nullable=True)
    evaluated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    ml_model = relationship("MLModel", back_populates="evaluations")
