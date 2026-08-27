from typing import Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.quest import Quest, QuestSubmission
from app.models.model import MLModel, ModelEvaluation
from app.services.gamification_engine import GamificationEngine


class QuestVerifierService:
    @classmethod
    async def evaluate_submission(
        cls,
        db: AsyncSession,
        user_id: Any,
        quest_id: Any,
        model_id: Any
    ) -> dict[str, Any]:
        quest_res = await db.execute(select(Quest).where(Quest.id == quest_id))
        quest = quest_res.scalar_one_or_none()
        if not quest:
            return {"status": "failed", "reason": "Quest not found"}

        model_res = await db.execute(select(MLModel).where(MLModel.id == model_id))
        model = model_res.scalar_one_or_none()
        if not model:
            return {"status": "failed", "reason": "Model not found"}

        eval_res = await db.execute(
            select(ModelEvaluation).where(ModelEvaluation.model_id == model_id)
        )
        eval_obj = eval_res.scalars().first()
        if not eval_obj:
            return {"status": "failed", "reason": "Model has not been evaluated"}

        reqs = quest.requirements_config
        target_metric = reqs.get("metric", "f1_score")
        min_threshold = float(reqs.get("threshold", 0.70))

        actual_score = float(eval_obj.metrics.get(target_metric, 0.0))
        passed = actual_score >= min_threshold

        submission_status = "passed" if passed else "failed"

        # Record submission
        submission = QuestSubmission(
            quest_id=quest.id,
            user_id=user_id,
            model_id=model.id,
            status=submission_status,
            achieved_score={"metric": target_metric, "score": actual_score, "threshold": min_threshold}
        )
        db.add(submission)
        await db.commit()

        xp_earned = 0
        points_earned = 0
        if passed:
            xp_earned = quest.xp_reward
            points_earned = quest.points_reward
            await GamificationEngine.add_xp_and_update_profile(
                db, user_id=user_id, xp_to_add=xp_earned, points_to_add=points_earned
            )

        return {
            "submission_id": submission.id,
            "quest_id": quest.id,
            "status": submission_status,
            "achieved_score": submission.achieved_score,
            "xp_earned": xp_earned,
            "points_earned": points_earned,
            "unlocked_achievement": False,
            "submitted_at": submission.submitted_at
        }
