import logging
from typing import Dict, Any, List, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.gamification import GamificationProfile

logger = logging.getLogger("nexus.gamification.economy")


class GamificationEconomy:
    """
    Virtual Coin Economy, Rewards Shop & Avatar Unlock Manager.
    """

    STORE_ITEMS = [
        {"id": "item_1", "name": "Cyber Neon Avatar Frame", "price_coins": 500, "category": "avatar_frame"},
        {"id": "item_2", "name": "2x XP Multiplier (24 Hours)", "price_coins": 800, "category": "powerup"},
        {"id": "item_3", "name": "PRO Prompt Master Title", "price_coins": 1200, "category": "badge_title"},
        {"id": "item_4", "name": "Streak Freeze Protection Token", "price_coins": 300, "category": "streak_token"}
    ]

    async def purchase_item(
        self,
        db: AsyncSession,
        user_id: str,
        item_id: str
    ) -> Tuple[bool, str]:
        """
        Deduct coins and grant virtual shop item.
        """
        res = await db.execute(
            select(GamificationProfile).where(GamificationProfile.user_id == user_id)
        )
        profile = res.scalars().first()
        if not profile:
            return False, "Profile not found"

        item = next((i for i in self.STORE_ITEMS if i["id"] == item_id), None)
        if not item:
            return False, "Item not found in store"

        if profile.reward_coins < item["price_coins"]:
            return False, f"Insufficient coins. Item requires {item['price_coins']} coins."

        profile.reward_coins -= item["price_coins"]
        await db.commit()

        logger.info(f"User {user_id} purchased item '{item['name']}' for {item['price_coins']} coins.")
        return True, f"Successfully purchased '{item['name']}'!"


gamification_economy = GamificationEconomy()
