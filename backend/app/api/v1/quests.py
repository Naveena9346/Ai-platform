import uuid
from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.models.quest import Quest, QuestSubmission
from app.schemas.quest import QuestResponse, QuestSubmitRequest, QuestSubmissionResponse
from app.services.quest_verifier_service import QuestVerifierService

router = APIRouter(prefix="/quests", tags=["Data Quests"])


@router.get("", response_model=list[QuestResponse])
async def list_quests(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    result = await db.execute(select(Quest).where(Quest.is_active == True))
    quests = result.scalars().all()

    # Check user submissions
    sub_res = await db.execute(select(QuestSubmission).where(QuestSubmission.user_id == current_user.id))
    submissions = {s.quest_id: s.status for s in sub_res.scalars().all()}

    output = []
    for q in quests:
        status = submissions.get(q.id, "not_started")
        output.append(QuestResponse(
            id=q.id,
            title=q.title,
            description=q.description,
            category=q.category,
            difficulty=q.difficulty,
            xp_reward=q.xp_reward,
            points_reward=q.points_reward,
            requirements_config=q.requirements_config,
            dataset_id=q.dataset_id,
            is_active=q.is_active,
            user_status=status
        ))
    return output


@router.post("/{quest_id}/submit", response_model=QuestSubmissionResponse)
async def submit_quest(
    quest_id: uuid.UUID,
    submit_data: QuestSubmitRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)]
):
    return await QuestVerifierService.evaluate_submission(
        db,
        user_id=current_user.id,
        quest_id=quest_id,
        model_id=submit_data.model_id
    )
