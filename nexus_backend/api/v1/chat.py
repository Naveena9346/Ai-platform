from fastapi import APIRouter, Depends, HTTPException
from sse_starlette.sse import EventSourceResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.models.chat import Conversation, ChatMessage
from nexus_backend.api.schemas import ConversationCreateSchema, ChatSendSchema
from nexus_backend.api.deps import get_current_user
from nexus_backend.chat.service import chat_service
from nexus_backend.ai.model_router import model_router
from nexus_backend.gamification.xp_engine import xp_engine
from nexus_backend.gamification.missions import mission_service

router = APIRouter(prefix="/chat", tags=["AI Chat & Assistants"])


@router.get("/conversations")
async def list_conversations(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    List user conversation threads.
    """
    res = await db.execute(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
    )
    convs = res.scalars().all()
    return [{"id": str(c.id), "title": c.title, "created_at": str(c.created_at)} for c in convs]


@router.post("/conversations")
async def create_conversation(
    payload: ConversationCreateSchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new conversation session.
    """
    conv = await chat_service.create_conversation(
        db=db,
        user_id=str(current_user.id),
        title=payload.title,
        system_prompt=payload.system_prompt
    )
    return {"id": str(conv.id), "title": conv.title}


@router.get("/conversations/{conversation_id}/messages")
async def get_messages(
    conversation_id: str,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Fetch message history for conversation thread.
    """
    messages = await chat_service.get_recent_messages(db, conversation_id, limit=50)
    return [{"id": str(m.id), "sender": m.sender, "content": m.content, "tokens": m.tokens_used} for m in messages]


@router.post("/conversations/{conversation_id}/send")
async def send_chat_message(
    conversation_id: str,
    payload: ChatSendSchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Send user message to AI model, get response, and award Gamification XP.
    """
    reply = await chat_service.send_message_and_get_reply(
        db=db,
        conversation_id=conversation_id,
        user_message_text=payload.message,
        preferred_provider=payload.preferred_provider,
        preferred_model=payload.preferred_model
    )

    # Award Gamification XP & Update Missions
    await xp_engine.add_xp(db, str(current_user.id), xp_amount=20, action_name="chat_sent")
    await mission_service.update_mission_progress(db, str(current_user.id), action_type="CHAT_SENT")

    return {
        "conversation_id": conversation_id,
        "reply": reply.content,
        "tokens_used": reply.tokens_used,
        "cost": float(reply.cost)
    }
