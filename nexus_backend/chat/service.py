import logging
from typing import List, Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.chat import Conversation, ChatMessage
from nexus_backend.ai.model_router import model_router
from nexus_backend.ai.token_counter import TokenCounter
from nexus_backend.core.exceptions import ResourceNotFoundError

logger = logging.getLogger("nexus.chat.service")


class ChatService:
    """
    Chat Thread Persistence, Context Sliding Memory Manager, and Conversation Service.
    """

    async def create_conversation(
        self,
        db: AsyncSession,
        user_id: str,
        title: str = "New Chat",
        model_id: Optional[str] = None,
        system_prompt: Optional[str] = None
    ) -> Conversation:
        conversation = Conversation(
            user_id=user_id,
            model_id=model_id,
            title=title,
            system_prompt=system_prompt
        )
        db.add(conversation)
        await db.commit()
        await db.refresh(conversation)
        return conversation

    async def add_message(
        self,
        db: AsyncSession,
        conversation_id: str,
        sender: str,
        content: str,
        tokens_used: int = 0,
        cost: float = 0.0,
        meta: Optional[Dict[str, Any]] = None
    ) -> ChatMessage:
        message = ChatMessage(
            conversation_id=conversation_id,
            sender=sender,
            content=content,
            tokens_used=tokens_used,
            cost=cost,
            meta=meta or {}
        )
        db.add(message)
        await db.commit()
        await db.refresh(message)
        return message

    async def get_recent_messages(
        self,
        db: AsyncSession,
        conversation_id: str,
        limit: int = 10
    ) -> List[ChatMessage]:
        """
        Fetch sliding window of recent conversation messages.
        """
        result = await db.execute(
            select(ChatMessage)
            .where(ChatMessage.conversation_id == conversation_id)
            .order_by(ChatMessage.created_at.desc())
            .limit(limit)
        )
        messages = list(result.scalars().all())
        messages.reverse()
        return messages

    async def send_message_and_get_reply(
        self,
        db: AsyncSession,
        conversation_id: str,
        user_message_text: str,
        preferred_provider: str = "openai",
        preferred_model: str = "gpt-4o"
    ) -> ChatMessage:
        """
        Store user message, call AI Model Router, store assistant reply, and track tokens.
        """
        conv_res = await db.execute(select(Conversation).where(Conversation.id == conversation_id))
        conv = conv_res.scalars().first()
        if not conv:
            raise ResourceNotFoundError("Conversation", conversation_id)

        # 1. Store User Message
        user_tokens = TokenCounter.count_tokens(user_message_text, preferred_model)
        await self.add_message(
            db=db,
            conversation_id=conversation_id,
            sender="user",
            content=user_message_text,
            tokens_used=user_tokens
        )

        # 2. Get AI Model Response
        response = await model_router.route_generate_text(
            prompt=user_message_text,
            preferred_provider=preferred_provider,
            preferred_model=preferred_model,
            system_prompt=conv.system_prompt
        )

        # 3. Store Assistant Message
        assistant_msg = await self.add_message(
            db=db,
            conversation_id=conversation_id,
            sender="assistant",
            content=response.content,
            tokens_used=response.usage.total_tokens,
            cost=response.usage.cost_usd,
            meta={"provider": response.provider_name, "model": response.model_name}
        )

        return assistant_msg


chat_service = ChatService()
