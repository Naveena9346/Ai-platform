import logging
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.core.redis import redis_manager
from nexus_backend.models.gamification import GamificationProfile
from nexus_backend.models.user import User

logger = logging.getLogger("nexus.gamification.leaderboards")


class LeaderboardService:
    """
    Redis `ZSET`-Backed Real-Time Leaderboards.
    """
    LEADERBOARD_KEY_GLOBAL = "leaderboard:global_xp"
    LEADERBOARD_KEY_WEEKLY = "leaderboard:weekly_xp"

    async def update_score(self, user_id: str, email: str, total_xp: int):
        """
        Push or update user XP score in Redis Sorted Sets.
        """
        member_id = f"{user_id}:{email}"
        await redis_manager.zadd(self.LEADERBOARD_KEY_GLOBAL, {member_id: float(total_xp)})

    async def get_top_rankings(self, db: AsyncSession, top_n: int = 10) -> List[Dict[str, Any]]:
        """
        Retrieve top ranked users sorted by total XP.
        """
        redis_rankings = await redis_manager.zrevrange_withscores(self.LEADERBOARD_KEY_GLOBAL, start=0, end=top_n - 1)
        
        results = []
        if redis_rankings:
            for rank, (member, score) in enumerate(redis_rankings, start=1):
                parts = member.split(":")
                user_id = parts[0]
                email = parts[1] if len(parts) > 1 else "user@nexus.ai"
                results.append({
                    "rank": rank,
                    "user_id": user_id,
                    "email": email,
                    "xp_points": int(score),
                    "level": int((int(score) / 100.0) ** 0.5) + 1
                })
            return results

        # Fallback database query if Redis cache empty
        res = await db.execute(
            select(GamificationProfile, User)
            .join(User)
            .order_by(GamificationProfile.xp_points.desc())
            .limit(top_n)
        )
        rows = res.all()

        for rank, (profile, user) in enumerate(rows, start=1):
            results.append({
                "rank": rank,
                "user_id": str(user.id),
                "email": user.email,
                "xp_points": profile.xp_points,
                "level": profile.current_level
            })
            # Sync back to Redis
            await self.update_score(str(user.id), user.email, profile.xp_points)

        return results


leaderboard_service = LeaderboardService()
