from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.models.prompt import PromptTemplate, PromptVersion
from nexus_backend.api.schemas import PromptCreateSchema, PromptExecuteSchema
from nexus_backend.api.deps import get_current_user
from nexus_backend.prompts.service import prompt_service
from nexus_backend.ai.model_router import model_router
from nexus_backend.gamification.xp_engine import xp_engine
from nexus_backend.gamification.achievements import achievement_service

router = APIRouter(prefix="/prompts", tags=["Prompt Management"])


@router.get("/")
async def list_prompt_templates(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    List user prompt templates.
    """
    res = await db.execute(
        select(PromptTemplate).where(PromptTemplate.user_id == current_user.id)
    )
    templates = res.scalars().all()
    return [{"id": str(t.id), "title": t.title, "category": t.category, "is_public": t.is_public} for t in templates]


@router.post("/")
async def create_prompt_template(
    payload: PromptCreateSchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new prompt template version 1 (triggers Gamification XP & Badge evaluation).
    """
    template = await prompt_service.create_prompt_template(
        db=db,
        user_id=str(current_user.id),
        title=payload.title,
        user_template=payload.user_template,
        system_message=payload.system_message,
        description=payload.description,
        category=payload.category,
        is_public=payload.is_public
    )

    # Award Gamification XP
    await xp_engine.add_xp(db, str(current_user.id), xp_amount=100, action_name="create_prompt")
    # Evaluate Achievements
    await achievement_service.evaluate_user_achievements(db, str(current_user.id), action_name="create_prompt")

    return {"id": str(template.id), "title": template.title, "status": "created"}


@router.post("/{template_id}/execute")
async def execute_prompt_template(
    template_id: str,
    payload: PromptExecuteSchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Render prompt variables and execute through AI Provider Model Router.
    """
    version = await prompt_service.get_latest_version(db, template_id)
    rendered_user_text = prompt_service.render_prompt(version.user_template, payload.variables)

    response = await model_router.route_generate_text(
        prompt=rendered_user_text,
        system_prompt=version.system_message,
        preferred_provider=payload.provider,
        preferred_model=payload.model
    )

    return {
        "template_id": template_id,
        "rendered_prompt": rendered_user_text,
        "response": response.content,
        "usage": response.usage.model_dump()
    }
