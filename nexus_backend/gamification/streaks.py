import logging
from datetime import date, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.gamification import GamificationProfile
from nexus_backend.models.analytics import Notification

logger = logging.getLogger("nexus.gamification.streaks")


class StreakService:
    """
    Daily Activity Streak Tracking & Multiplier Calculator.
    """

    async def update_user_streak(self, db: AsyncSession, user_id: str) -> int:
        """
        Record daily activity and update active streak counters.
        """
        res = await db.execute(
            select(GamificationProfile).where(GamificationProfile.user_id == user_id)
        )
        profile = res.scalars().first()
        if not profile:
            return 0

        today = date.today()
        if profile.last_activity_date == today:
            return profile.current_streak_days

        if profile.last_activity_date == today - timedelta(days=1):
            profile.current_streak_days += 1
        else:
            profile.current_streak_days = 1  # Streak reset

        if profile.current_streak_days > profile.max_streak_days:
            profile.max_streak_days = profile.current_streak_days

        profile.last_activity_date = today

        # Streak Milestone Notification
        if profile.current_streak_days in [3, 7, 14, 30]:
            notif = Notification(
                user_id=user_id,
                title=f"🔥 {profile.current_streak_days}-Day Streak Milestone!",
                message=f"You have maintained an active daily streak for {profile.current_streak_days} days! Keep it up for bonus multipliers!",
                type="info"
            )
            db.add(notif)

        await db.commit()
        await db.refresh(profile)
        return profile.current_streak_days


streak_service = StreakService()
