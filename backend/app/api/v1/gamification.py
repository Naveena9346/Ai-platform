from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.core.redis import RedisLeaderboardService
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.gamification import GamificationOverviewResponse, AchievementResponse, LeaderboardEntry
from app.services.gamification_engine import GamificationEngine

router = APIRouter(prefix="/gamification", tags=["Gamification Hub"])


@router.get("/overview", response_model=GamificationOverviewResponse)
async def get_overview(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    result = await db.execute(
        select(User).options(selectinload(User.gamification_profile)).where(User.id == current_user.id)
    )
    user = result.scalar_one()
    profile = user.gamification_profile

    req_xp = GamificationEngine.xp_required_for_level(profile.level + 1)
    curr_level_base = GamificationEngine.xp_required_for_level(profile.level)
    xp_in_level = profile.xp - curr_level_base
    xp_needed_in_level = req_xp - curr_level_base

    progress_pct = round((xp_in_level / max(xp_needed_in_level, 1)) * 100, 2)

    return GamificationOverviewResponse(
        user_id=user.id,
        username=user.username,
        xp=profile.xp,
        level=profile.level,
        xp_for_next_level=req_xp,
        xp_progress_percentage=progress_pct,
        points=profile.points,
        current_streak=profile.current_streak,
        longest_streak=profile.longest_streak,
        equipped_title=profile.equipped_title,
        unlocked_titles=profile.unlocked_titles,
        recent_achievements=[]
    )


@router.get("/leaderboard", response_model=list[LeaderboardEntry])
async def get_leaderboard(
    limit: int = 50,
    current_user: Annotated[User, Depends(get_current_user)] = None
):
    results = await RedisLeaderboardService.get_top_leaderboard(limit=limit)
    entries = []
    for r in results:
        level = GamificationEngine.calculate_level_from_xp(r["xp"])
        entries.append(LeaderboardEntry(
            rank=r["rank"],
            user_id=r["user_id"],
            username=r["username"],
            xp=r["xp"],
            level=level,
            equipped_title="Data Novice"
        ))
    return entries
