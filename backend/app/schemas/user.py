from uuid import UUID
from datetime import datetime, date
from pydantic import BaseModel, EmailStr, ConfigDict


class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserProfileGamification(BaseModel):
    xp: int
    level: int
    points: int
    current_streak: int
    longest_streak: int
    last_activity_date: date | None = None
    equipped_title: str
    unlocked_titles: list[str]

    model_config = ConfigDict(from_attributes=True)


class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    role: str
    is_active: bool
    created_at: datetime
    gamification_profile: UserProfileGamification | None = None

    model_config = ConfigDict(from_attributes=True)


class UserProfileUpdate(BaseModel):
    equipped_title: str | None = None
