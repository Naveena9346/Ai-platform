import logging
from datetime import datetime, timezone
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.gamification import GamificationProfile, Achievement, UserAchievement
from nexus_backend.models.analytics import Notification

logger = logging.getLogger("nexus.gamification.achievements")


class AchievementService:
    """
    Badge & Achievement Event Evaluator.
    """

    DEFAULT_ACHIEVEMENTS = [
        {
            "code": "PROMPT_MASTER",
            "title": "Prompt Master",
            "description": "Create 5 or more custom prompt templates.",
            "category": "prompts",
            "icon_name": "sparkles",
            "xp_reward": 500,
            "coin_reward": 250,
            "criteria": {"action": "create_prompt", "target": 5}
        },
        {
            "code": "RAG_WIZARD",
            "title": "RAG Wizard",
            "description": "Ingest and analyze 3 document knowledge bases.",
            "category": "rag",
            "icon_name": "file-text",
            "xp_reward": 600,
            "coin_reward": 300,
            "criteria": {"action": "upload_doc", "target": 3}
        },
        {
            "code": "WORKFLOW_ARCHITECT",
            "title": "Workflow Architect",
            "description": "Build and execute an AI DAG Workflow.",
            "category": "workflows",
            "icon_name": "git-branch",
            "xp_reward": 800,
            "coin_reward": 400,
            "criteria": {"action": "run_workflow", "target": 1}
        },
        {
            "code": "STREAK_7_DAYS",
            "title": "Unstoppable Force",
            "description": "Maintain a 7-day daily activity streak.",
            "category": "streak",
            "icon_name": "flame",
            "xp_reward": 1000,
            "coin_reward": 500,
            "criteria": {"action": "streak_days", "target": 7}
        }
    ]

    async def seed_default_achievements(self, db: AsyncSession):
        """
        Seed default badge matrix into database.
        """
        for item in self.DEFAULT_ACHIEVEMENTS:
            res = await db.execute(select(Achievement).where(Achievement.code == item["code"]))
            if not res.scalars().first():
                ach = Achievement(**item)
                db.add(ach)
        await db.commit()

    async def evaluate_user_achievements(
        self,
        db: AsyncSession,
        user_id: str,
        action_name: str,
        count_value: int = 1
    ) -> List[Achievement]:
        """
        Check if user unlocked any new badges based on event criteria.
        """
        res_profile = await db.execute(
            select(GamificationProfile).where(GamificationProfile.user_id == user_id)
        )
        profile = res_profile.scalars().first()
        if not profile:
            return []

        # Get achievements already unlocked
        unlocked_res = await db.execute(
            select(UserAchievement.achievement_id)
            .where(UserAchievement.gamification_profile_id == profile.id)
        )
        unlocked_ids = set(unlocked_res.scalars().all())

        all_ach_res = await db.execute(select(Achievement))
        all_achievements = all_ach_res.scalars().all()

        newly_unlocked = []

        for ach in all_achievements:
            if ach.id in unlocked_ids:
                continue

            criteria = ach.criteria
            if criteria.get("action") == action_name and count_value >= criteria.get("target", 1):
                # Unlock Badge!
                user_ach = UserAchievement(
                    gamification_profile_id=profile.id,
                    achievement_id=ach.id,
                    unlocked_at=datetime.now(timezone.utc).isoformat()
                )
                db.add(user_ach)

                profile.xp_points += ach.xp_reward
                profile.reward_coins += ach.coin_reward

                notif = Notification(
                    user_id=user_id,
                    title=f"🏆 Badge Unlocked: {ach.title}!",
                    message=f"You unlocked '{ach.title}' and earned {ach.xp_reward} XP & {ach.coin_reward} coins!",
                    type="achievement"
                )
                db.add(notif)
                newly_unlocked.append(ach)

        if newly_unlocked:
            await db.commit()

        return newly_unlocked


achievement_service = AchievementService()
