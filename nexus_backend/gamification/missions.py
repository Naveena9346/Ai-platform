import logging
from datetime import datetime, timezone
from typing import List, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.gamification import GamificationProfile, Mission, UserMission
from nexus_backend.models.analytics import Notification

logger = logging.getLogger("nexus.gamification.missions")


class MissionService:
    """
    Daily and Weekly Quest Board Generator and Reward Claim Handler.
    """

    DEFAULT_MISSIONS = [
        {
            "title": "Daily AI Explorer",
            "description": "Send 3 messages in AI Chat Playground.",
            "mission_type": "daily",
            "xp_reward": 150,
            "coin_reward": 50,
            "target_count": 3,
            "action_type": "CHAT_SENT"
        },
        {
            "title": "Prompt Crafting Quest",
            "description": "Create 1 new prompt template.",
            "mission_type": "daily",
            "xp_reward": 200,
            "coin_reward": 100,
            "target_count": 1,
            "action_type": "PROMPT_CREATED"
        },
        {
            "title": "Weekly Workflow Hero",
            "description": "Execute 5 AI DAG Workflows.",
            "mission_type": "weekly",
            "xp_reward": 750,
            "coin_reward": 350,
            "target_count": 5,
            "action_type": "WORKFLOW_RUN"
        }
    ]

    async def seed_default_missions(self, db: AsyncSession):
        """
        Seed initial daily & weekly missions.
        """
        for item in self.DEFAULT_MISSIONS:
            res = await db.execute(select(Mission).where(Mission.title == item["title"]))
            if not res.scalars().first():
                m = Mission(**item)
                db.add(m)
        await db.commit()

    async def update_mission_progress(
        self,
        db: AsyncSession,
        user_id: str,
        action_type: str,
        amount: int = 1
    ):
        """
        Increment mission progress for given action type.
        """
        res_profile = await db.execute(
            select(GamificationProfile).where(GamificationProfile.user_id == user_id)
        )
        profile = res_profile.scalars().first()
        if not profile:
            return

        res_missions = await db.execute(
            select(Mission).where(Mission.action_type == action_type)
        )
        active_missions = res_missions.scalars().all()

        for mission in active_missions:
            res_um = await db.execute(
                select(UserMission).where(
                    UserMission.gamification_profile_id == profile.id,
                    UserMission.mission_id == mission.id
                )
            )
            um = res_um.scalars().first()
            if not um:
                um = UserMission(
                    gamification_profile_id=profile.id,
                    mission_id=mission.id,
                    current_progress=0
                )
                db.add(um)

            if not um.is_completed:
                um.current_progress += amount
                if um.current_progress >= mission.target_count:
                    um.is_completed = True
                    logger.info(f"User {user_id} COMPLETED Mission '{mission.title}'.")

        await db.commit()

    async def claim_mission_reward(
        self,
        db: AsyncSession,
        user_id: str,
        mission_id: str
    ) -> Tuple[bool, str]:
        """
        Claim XP & coin reward for completed quest.
        """
        res_profile = await db.execute(
            select(GamificationProfile).where(GamificationProfile.user_id == user_id)
        )
        profile = res_profile.scalars().first()
        if not profile:
            return False, "Profile not found"

        res_um = await db.execute(
            select(UserMission, Mission)
            .join(Mission)
            .where(
                UserMission.gamification_profile_id == profile.id,
                UserMission.mission_id == mission_id
            )
        )
        row = res_um.first()
        if not row:
            return False, "Mission progress record not found"

        um, mission = row
        if not um.is_completed:
            return False, "Mission not yet completed"
        if um.claimed_at:
            return False, "Reward already claimed"

        um.claimed_at = datetime.now(timezone.utc).isoformat()
        profile.xp_points += mission.xp_reward
        profile.reward_coins += mission.coin_reward

        notif = Notification(
            user_id=user_id,
            title=f"🎁 Quest Reward Claimed!",
            message=f"You claimed {mission.xp_reward} XP & {mission.coin_reward} coins for '{mission.title}'!",
            type="mission"
        )
        db.add(notif)
        await db.commit()
        return True, "Reward claimed successfully!"


mission_service = MissionService()
