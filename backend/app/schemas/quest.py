from uuid import UUID
from datetime import datetime
from typing import Any
from pydantic import BaseModel, ConfigDict


class QuestResponse(BaseModel):
    id: UUID
    title: str
    description: str
    category: str
    difficulty: str
    xp_reward: int
    points_reward: int
    requirements_config: dict[str, Any]
    dataset_id: UUID | None = None
    is_active: bool
    user_status: str = "not_started"  # not_started, passed, failed

    model_config = ConfigDict(from_attributes=True)


class QuestSubmitRequest(BaseModel):
    model_id: UUID


class QuestSubmissionResponse(BaseModel):
    submission_id: UUID
    quest_id: UUID
    status: str  # passed, failed
    achieved_score: dict[str, Any]
    xp_earned: int
    points_earned: int
    unlocked_achievement: bool
    submitted_at: datetime

    model_config = ConfigDict(from_attributes=True)
