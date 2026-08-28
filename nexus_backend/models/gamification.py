from sqlalchemy import Column, String, Boolean, Text, BigInteger, Integer, Date, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from nexus_backend.core.base import BaseModel


class GamificationProfile(BaseModel):
    """
    User XP, Level, Reward Coins, and Streak Tracking Profile.
    """
    __tablename__ = "gamification_profiles"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    xp_points = Column(BigInteger, default=0, nullable=False)
    current_level = Column(Integer, default=1, nullable=False)
    reward_coins = Column(Integer, default=0, nullable=False)
    current_streak_days = Column(Integer, default=0, nullable=False)
    max_streak_days = Column(Integer, default=0, nullable=False)
    last_activity_date = Column(Date, nullable=True)

    # Relationships
    user = relationship("User", back_populates="gamification_profile")
    user_achievements = relationship("UserAchievement", back_populates="gamification_profile", cascade="all, delete-orphan")
    user_missions = relationship("UserMission", back_populates="gamification_profile", cascade="all, delete-orphan")


class Achievement(BaseModel):
    """
    Global Badges & Achievements Matrix.
    """
    __tablename__ = "achievements"

    code = Column(String(100), unique=True, nullable=False, index=True)  # e.g., PROMPT_MASTER, RAG_WIZARD
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)  # prompts, rag, workflows, agents, streak
    icon_name = Column(String(50), nullable=False)
    xp_reward = Column(Integer, default=100, nullable=False)
    coin_reward = Column(Integer, default=50, nullable=False)
    criteria = Column(JSON, nullable=False)  # e.g. {"action": "create_prompt", "target_count": 10}

    # Relationships
    user_achievements = relationship("UserAchievement", back_populates="achievement", cascade="all, delete-orphan")


class UserAchievement(BaseModel):
    """
    User Achievement Unlock History.
    """
    __tablename__ = "user_achievements"

    gamification_profile_id = Column(UUID(as_uuid=True), ForeignKey("gamification_profiles.id", ondelete="CASCADE"), nullable=False)
    achievement_id = Column(UUID(as_uuid=True), ForeignKey("achievements.id", ondelete="CASCADE"), nullable=False)
    unlocked_at = Column(Text, nullable=True)

    # Relationships
    gamification_profile = relationship("GamificationProfile", back_populates="user_achievements")
    achievement = relationship("Achievement", back_populates="user_achievements")


class Mission(BaseModel):
    """
    Daily & Weekly Quest Board Missions.
    """
    __tablename__ = "missions"

    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=False)
    mission_type = Column(String(20), default="daily", nullable=False)  # daily, weekly, special
    xp_reward = Column(Integer, default=150, nullable=False)
    coin_reward = Column(Integer, default=75, nullable=False)
    target_count = Column(Integer, default=1, nullable=False)
    action_type = Column(String(100), nullable=False)  # e.g., CHAT_SENT, WORKFLOW_RUN

    # Relationships
    user_missions = relationship("UserMission", back_populates="mission", cascade="all, delete-orphan")


class UserMission(BaseModel):
    """
    User active mission progress and claim state.
    """
    __tablename__ = "user_missions"

    gamification_profile_id = Column(UUID(as_uuid=True), ForeignKey("gamification_profiles.id", ondelete="CASCADE"), nullable=False)
    mission_id = Column(UUID(as_uuid=True), ForeignKey("missions.id", ondelete="CASCADE"), nullable=False)
    current_progress = Column(Integer, default=0, nullable=False)
    is_completed = Column(Boolean, default=False, nullable=False)
    claimed_at = Column(Text, nullable=True)

    # Relationships
    gamification_profile = relationship("GamificationProfile", back_populates="user_missions")
    mission = relationship("Mission", back_populates="user_missions")
