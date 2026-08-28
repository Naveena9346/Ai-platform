import uuid
from datetime import datetime, timezone
from typing import Any, Dict
from sqlalchemy import DateTime, Column
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_mixin
from nexus_backend.core.database import Base


@declarative_mixin
class TimestampMixin:
    """
    Mixin adding automatic created_at and updated_at timestamps.
    """
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False
    )


@declarative_mixin
class UUIDPrimaryKeyMixin:
    """
    Mixin adding UUID primary key `id`.
    """
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        nullable=False
    )


class BaseModel(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """
    Abstract Base Model combining UUID Primary Key and Timestamps.
    """
    __abstract__ = True

    def to_dict(self) -> Dict[str, Any]:
        """
        Convert SQLAlchemy model instance to dictionary representation.
        """
        res = {}
        for col in self.__table__.columns:
            val = getattr(self, col.name)
            if isinstance(val, (datetime, uuid.UUID)):
                val = str(val)
            res[col.name] = val
        return res
