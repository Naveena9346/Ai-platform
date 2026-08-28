import json
import logging
from typing import Any, Optional
import redis.asyncio as aioredis
from nexus_backend.core.config import settings

logger = logging.getLogger("nexus.redis")


class RedisManager:
    """
    Async Redis Manager providing caching, locks, and PubSub functionality.
    """
    def __init__(self):
        self.redis_client: Optional[aioredis.Redis] = None

    async def connect(self):
        """
        Establish connection pool to Redis server.
        """
        if not self.redis_client:
            self.redis_client = aioredis.from_url(
                settings.REDIS_URL,
                encoding="utf-8",
                decode_responses=True,
                max_connections=20
            )
            logger.info("Async Redis client connected successfully.")

    async def disconnect(self):
        """
        Close Redis connection pool.
        """
        if self.redis_client:
            await self.redis_client.close()
            logger.info("Redis client connection closed.")

    async def get(self, key: str) -> Optional[Any]:
        """
        Fetch deserialized value from Redis cache by key.
        """
        if not self.redis_client:
            await self.connect()
        val = await self.redis_client.get(key)
        if val:
            try:
                return json.loads(val)
            except Exception:
                return val
        return None

    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """
        Set serialized value in Redis with optional TTL (seconds).
        """
        if not self.redis_client:
            await self.connect()
        serialized = json.dumps(value) if isinstance(value, (dict, list)) else str(value)
        effective_ttl = ttl if ttl is not None else settings.REDIS_TTL_DEFAULT_SECONDS
        return await self.redis_client.set(key, serialized, ex=effective_ttl)

    async def delete(self, key: str) -> bool:
        """
        Delete key from Redis cache.
        """
        if not self.redis_client:
            await self.connect()
        return bool(await self.redis_client.delete(key))

    async def zadd(self, name: str, mapping: dict[str, float]):
        """
        Add members to Redis Sorted Set for Leaderboard rankings.
        """
        if not self.redis_client:
            await self.connect()
        return await self.redis_client.zadd(name, mapping)

    async def zrevrange_withscores(self, name: str, start: int = 0, end: int = -1):
        """
        Retrieve top ranked entries with scores from Redis Sorted Set.
        """
        if not self.redis_client:
            await self.connect()
        return await self.redis_client.zrevrange(name, start, end, withscores=True)

    async def zincrby(self, name: str, amount: float, value: str):
        """
        Increment score of member in Redis Sorted Set.
        """
        if not self.redis_client:
            await self.connect()
        return await self.redis_client.zincrby(name, amount, value)


# Singleton Redis instance
redis_manager = RedisManager()
