from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.models.gamification import GamificationProfile, Achievement, UserAchievement, Mission, UserMission
from nexus_backend.api.deps import get_current_user
from nexus_backend.gamification.missions import mission_service
from nexus_backend.gamification.leaderboards import leaderboard_service
from nexus_backend.gamification.streaks import streak_service

router = APIRouter(prefix="/gamification", tags=["Gamification Engine"])


@router.get("/summary")
async def get_gamification_summary(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get user XP, level progress, coins, and current streak.
    """
    # Record streak activity
    await streak_service.update_user_streak(db, str(current_user.id))

    res = await db.execute(
        select(GamificationProfile).where(GamificationProfile.user_id == current_user.id)
    )
    profile = res.scalars().first()
    if not profile:
        profile = GamificationProfile(user_id=current_user.id, xp_points=100, current_level=1)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)

    next_level_xp = ((profile.current_level) ** 2) * 100

    return {
        "xp_points": profile.xp_points,
        "current_level": profile.current_level,
        "reward_coins": profile.reward_coins,
        "current_streak_days": profile.current_streak_days,
        "max_streak_days": profile.max_streak_days,
        "next_level_xp": next_level_xp
    }


@router.get("/achievements")
async def list_achievements(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    List all badges and user unlock status.
    """
    await achievement_service.seed_default_achievements(db)

    res_all = await db.execute(select(Achievement))
    all_ach = res_all.scalars().all()

    res_prof = await db.execute(select(GamificationProfile).where(GamificationProfile.user_id == current_user.id))
    prof = res_prof.scalars().first()

    unlocked_ids = set()
    if prof:
        res_unlocked = await db.execute(select(UserAchievement.achievement_id).where(UserAchievement.gamification_profile_id == prof.id))
        unlocked_ids = set(res_unlocked.scalars().all())

    return [{
        "id": str(a.id),
        "code": a.code,
        "title": a.title,
        "description": a.description,
        "category": a.category,
        "icon_name": a.icon_name,
        "xp_reward": a.xp_reward,
        "coin_reward": a.coin_reward,
        "is_unlocked": a.id in unlocked_ids
    } for a in all_ach]


@router.get("/missions")
async def get_missions(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get Quest Board active missions and user progress.
    """
    await mission_service.seed_default_missions(db)

    res_m = await db.execute(select(Mission))
    missions = res_m.scalars().all()

    return [{
        "id": str(m.id),
        "title": m.title,
        "description": m.description,
        "mission_type": m.mission_type,
        "xp_reward": m.xp_reward,
        "coin_reward": m.coin_reward,
        "target_count": m.target_count
    } for m in missions]


@router.post("/missions/{mission_id}/claim")
async def claim_mission(
    mission_id: str,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Claim mission reward.
    """
    success, msg = await mission_service.claim_mission_reward(db, str(current_user.id), mission_id)
    if not success:
        raise HTTPException(status_code=400, detail=msg)
    return {"status": "success", "message": msg}


@router.get("/leaderboard")
async def get_leaderboard(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Get global leaderboard rankings.
    """
    rankings = await leaderboard_service.get_top_rankings(db, top_n=20)
    return {"rankings": rankings}
