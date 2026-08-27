import json
from typing import Any
import redis.asyncio as aioredis
from app.core.config import settings

redis_client: aioredis.Redis | None = None


async def get_redis() -> aioredis.Redis:
    global redis_client
    if redis_client is None:
        redis_client = aioredis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True
        )
    return redis_client


async def close_redis() -> None:
    global redis_client
    if redis_client is not None:
        await redis_client.close()
        redis_client = None


class RedisLeaderboardService:
    @staticmethod
    async def update_user_xp(user_id: str, username: str, total_xp: int) -> None:
        redis = await get_redis()
        member_data = json.dumps({"user_id": user_id, "username": username})
        await redis.zadd("leaderboard:global", {member_data: total_xp})

    @staticmethod
    async def get_top_leaderboard(limit: int = 50) -> list[dict[str, Any]]:
        redis = await get_redis()
        # Returns list of tuples (member, score)
        results = await redis.zrevrange("leaderboard:global", 0, limit - 1, withscores=True)
        leaderboard = []
        rank = 1
        for member_json, score in results:
            try:
                data = json.loads(member_json)
                leaderboard.append({
                    "rank": rank,
                    "user_id": data["user_id"],
                    "username": data["username"],
                    "xp": int(score)
                })
                rank += 1
            except Exception:
                continue
        return leaderboard
