import math
from datetime import date, timedelta
from typing import Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.gamification import UserGamificationProfile, Achievement, UserAchievement
from app.core.redis import RedisLeaderboardService
from app.models.user import User


class GamificationEngine:
    @staticmethod
    def calculate_level_from_xp(xp: int) -> int:
        if xp <= 0:
            return 1
        return int(math.floor(1 + math.sqrt(xp / 100)))

    @staticmethod
    def xp_required_for_level(level: int) -> int:
        if level <= 1:
            return 0
        return int(100 * ((level - 1) ** 2))

    @classmethod
    async def add_xp_and_update_profile(
        cls,
        db: AsyncSession,
        user_id: Any,
        xp_to_add: int,
        points_to_add: int = 0
    ) -> dict[str, Any]:
        result = await db.execute(
            select(UserGamificationProfile).where(UserGamificationProfile.user_id == user_id)
        )
        profile = result.scalar_one_or_none()
        if not profile:
            return {"xp_added": 0, "level_up": False, "new_level": 1}

        old_level = profile.level
        profile.xp += xp_to_add
        profile.points += points_to_add
        new_level = cls.calculate_level_from_xp(profile.xp)

        level_up = new_level > old_level
        if level_up:
            profile.level = new_level
            # Check title unlocks
            new_titles = []
            if new_level >= 5 and "Data Analyst" not in profile.unlocked_titles:
                new_titles.append("Data Analyst")
            if new_level >= 10 and "Feature Engineer" not in profile.unlocked_titles:
                new_titles.append("Feature Engineer")
            if new_level >= 20 and "ML Architect" not in profile.unlocked_titles:
                new_titles.append("ML Architect")
            if new_level >= 50 and "Data Science Legend" not in profile.unlocked_titles:
                new_titles.append("Data Science Legend")
            
            if new_titles:
                profile.unlocked_titles = list(set(profile.unlocked_titles + new_titles))

        # Update streak
        today = date.today()
        if profile.last_activity_date is None:
            profile.current_streak = 1
            profile.longest_streak = 1
        elif profile.last_activity_date == today - timedelta(days=1):
            profile.current_streak += 1
            profile.longest_streak = max(profile.longest_streak, profile.current_streak)
        elif profile.last_activity_date < today - timedelta(days=1):
            profile.current_streak = 1

        profile.last_activity_date = today
        await db.commit()
        await db.refresh(profile)

        # Sync to Redis Leaderboard
        user_res = await db.execute(select(User).where(User.id == user_id))
        user_obj = user_res.scalar_one_or_none()
        if user_obj:
            await RedisLeaderboardService.update_user_xp(
                user_id=str(user_id),
                username=user_obj.username,
                total_xp=profile.xp
            )

        return {
            "xp_added": xp_to_add,
            "total_xp": profile.xp,
            "level_up": level_up,
            "old_level": old_level,
            "new_level": new_level
        }

    @classmethod
    async def evaluate_and_unlock_achievements(cls, db: AsyncSession, user_id: Any) -> list[str]:
        # Fetch user achievements
        unlocked_res = await db.execute(
            select(UserAchievement.achievement_id).where(UserAchievement.user_id == user_id)
        )
        unlocked_ids = set(unlocked_res.scalars().all())

        all_achievements_res = await db.execute(select(Achievement))
        all_achievements = all_achievements_res.scalars().all()

        newly_unlocked = []
        for ach in all_achievements:
            if ach.id not in unlocked_ids:
                # Add default achievement unlock logic
                new_ua = UserAchievement(user_id=user_id, achievement_id=ach.id)
                db.add(new_ua)
                newly_unlocked.append(ach.name)

        if newly_unlocked:
            await db.commit()

        return newly_unlocked
