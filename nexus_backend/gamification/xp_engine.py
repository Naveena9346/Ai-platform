import math
import logging
from typing import Dict, Any, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.gamification import GamificationProfile
from nexus_backend.models.analytics import Notification
from nexus_backend.core.config import settings

logger = logging.getLogger("nexus.gamification.xp")


class XPEngine:
    """
    Mathematical XP Progression Engine & Level Evaluator.
    Level Formula: Level = floor( sqrt( XP / 100 ) ) + 1
    """

    @staticmethod
    def calculate_level(xp_points: int) -> int:
        """
        Calculate level number from accumulated total XP points.
        """
        if xp_points <= 0:
            return 1
        return int(math.floor(math.sqrt(xp_points / 100.0))) + 1

    @staticmethod
    def xp_for_level(level: int) -> int:
        """
        Calculate total XP required to reach a specific level.
        """
        if level <= 1:
            return 0
        return int(((level - 1) ** 2) * 100)

    async def add_xp(
        self,
        db: AsyncSession,
        user_id: str,
        xp_amount: int,
        action_name: str
    ) -> Tuple[GamificationProfile, bool]:
        """
        Award XP to user, evaluate level ups, trigger notifications, and save profile.
        Returns (profile, leveled_up_flag).
        """
        result = await db.execute(
            select(GamificationProfile).where(GamificationProfile.user_id == user_id)
        )
        profile = result.scalars().first()

        if not profile:
            profile = GamificationProfile(
                user_id=user_id,
                xp_points=0,
                current_level=1,
                reward_coins=0
            )
            db.add(profile)
            await db.flush()

        old_level = profile.current_level
        profile.xp_points += xp_amount
        new_level = self.calculate_level(profile.xp_points)

        leveled_up = new_level > old_level
        if leveled_up:
            profile.current_level = new_level
            profile.reward_coins += (new_level - old_level) * 100  # Bonus coins per level up
            
            # Send Level Up Notification
            notif = Notification(
                user_id=user_id,
                title=f"🎉 Level Up! You reached Level {new_level}!",
                message=f"Congratulations! You unlocked Level {new_level} and earned {(new_level - old_level) * 100} bonus coins!",
                type="level_up"
            )
            db.add(notif)
            logger.info(f"User {user_id} LEVELED UP to Level {new_level} via action '{action_name}'.")

        await db.commit()
        await db.refresh(profile)
        return profile, leveled_up


xp_engine = XPEngine()
