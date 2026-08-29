from uuid import UUID
from datetime import datetime
from typing import Any
from pydantic import BaseModel, ConfigDict


class AchievementResponse(BaseModel):
    id: UUID
    key: str
    name: str
    description: str
    icon_name: str
    category: str
    xp_reward: int
    unlocked: bool = False
    unlocked_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class LeaderboardEntry(BaseModel):
    rank: int
    user_id: str
    username: str
    xp: int
    level: int
    equipped_title: str


class GamificationOverviewResponse(BaseModel):
    user_id: UUID
    username: str
    xp: int
    level: int
    xp_for_next_level: int
    xp_progress_percentage: float
    points: int
    current_streak: int
    longest_streak: int
    equipped_title: str
    unlocked_titles: list[str]
    recent_achievements: list[AchievementResponse]
