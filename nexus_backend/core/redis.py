import json
import logging
from typing import Any, Optional, Dict
import redis.asyncio as aioredis
from nexus_backend.core.config import settings

logger = logging.getLogger("nexus.redis")


class RedisManager:
    """
    Async Redis Manager with in-memory fallback if Redis daemon is offline.
    """
    def __init__(self):
        self.redis_client: Optional[aioredis.Redis] = None
        self._in_memory_cache: Dict[str, Any] = {}
        self._in_memory_zsets: Dict[str, Dict[str, float]] = {}

    async def connect(self):
        """
        Establish connection pool to Redis server.
        """
        if not self.redis_client:
            try:
                self.redis_client = aioredis.from_url(
                    settings.REDIS_URL,
                    encoding="utf-8",
                    decode_responses=True,
                    max_connections=20,
                    socket_timeout=2.0
                )
                await self.redis_client.ping()
                logger.info("Async Redis client connected successfully.")
            except Exception as e:
                logger.warning(f"Redis server connection skipped ({e}). Using in-memory cache/leaderboard fallback.")
                self.redis_client = None

    async def disconnect(self):
        """
        Close Redis connection pool.
        """
        if self.redis_client:
            try:
                await self.redis_client.close()
            except Exception:
                pass
            logger.info("Redis client connection closed.")

    async def get(self, key: str) -> Optional[Any]:
        """
        Fetch deserialized value from Redis cache by key.
        """
        if self.redis_client:
            try:
                val = await self.redis_client.get(key)
                if val:
                    try:
                        return json.loads(val)
                    except Exception:
                        return val
                return None
            except Exception:
                pass
        val = self._in_memory_cache.get(key)
        if val and isinstance(val, str):
            try:
                return json.loads(val)
            except Exception:
                return val
        return val

    async def set(self, key: str, value: Any, ttl: Optional[int] = None) -> bool:
        """
        Set serialized value in Redis with optional TTL (seconds).
        """
        serialized = json.dumps(value) if isinstance(value, (dict, list)) else str(value)
        if self.redis_client:
            try:
                effective_ttl = ttl if ttl is not None else settings.REDIS_TTL_DEFAULT_SECONDS
                return await self.redis_client.set(key, serialized, ex=effective_ttl)
            except Exception:
                pass
        self._in_memory_cache[key] = serialized
        return True

    async def delete(self, key: str) -> bool:
        """
        Delete key from Redis cache.
        """
        if self.redis_client:
            try:
                return bool(await self.redis_client.delete(key))
            except Exception:
                pass
        return bool(self._in_memory_cache.pop(key, None))

    async def zadd(self, name: str, mapping: dict[str, float]):
        """
        Add members to Redis Sorted Set for Leaderboard rankings.
        """
        if self.redis_client:
            try:
                return await self.redis_client.zadd(name, mapping)
            except Exception:
                pass
        if name not in self._in_memory_zsets:
            self._in_memory_zsets[name] = {}
        self._in_memory_zsets[name].update(mapping)
        return len(mapping)

    async def zrevrange_withscores(self, name: str, start: int = 0, end: int = -1):
        """
        Retrieve top ranked entries with scores from Redis Sorted Set.
        """
        if self.redis_client:
            try:
                return await self.redis_client.zrevrange(name, start, end, withscores=True)
            except Exception:
                pass
        zset = self._in_memory_zsets.get(name, {})
        sorted_items = sorted(zset.items(), key=lambda item: item[1], reverse=True)
        if end == -1:
            return sorted_items[start:]
        return sorted_items[start:end + 1]

    async def zincrby(self, name: str, amount: float, value: str):
        """
        Increment score of member in Redis Sorted Set.
        """
        if self.redis_client:
            try:
                return await self.redis_client.zincrby(name, amount, value)
            except Exception:
                pass
        if name not in self._in_memory_zsets:
            self._in_memory_zsets[name] = {}
        curr = self._in_memory_zsets[name].get(value, 0.0)
        new_score = curr + amount
        self._in_memory_zsets[name][value] = new_score
        return new_score


# Singleton Redis instance
redis_manager = RedisManager()

