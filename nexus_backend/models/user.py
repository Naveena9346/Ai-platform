from sqlalchemy import Column, String, Boolean, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from nexus_backend.core.base import BaseModel


class User(BaseModel):
    """
    Core User entity for Authentication, Authorization & Roles.
    """
    __tablename__ = "users"

    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100), nullable=True)
    role = Column(String(50), default="user", nullable=False)  # admin, user, pro
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)

    # Relationships
    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    gamification_profile = relationship("GamificationProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="user", cascade="all, delete-orphan")
    workflows = relationship("AIWorkflow", back_populates="user", cascade="all, delete-orphan")
    prompt_templates = relationship("PromptTemplate", back_populates="user", cascade="all, delete-orphan")


class UserProfile(BaseModel):
    """
    User Profile preferences, avatar, and API keys.
    """
    __tablename__ = "user_profiles"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    avatar_url = Column(Text, nullable=True)
    bio = Column(Text, nullable=True)
    theme_preference = Column(String(20), default="dark", nullable=False)
    preferences = Column(JSON, default={}, nullable=False)
    api_key_hash = Column(String(255), nullable=True, index=True)

    # Relationships
    user = relationship("User", back_populates="profile")
