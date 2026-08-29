import logging
from typing import List, Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.chat import Conversation, ChatMessage
from nexus_backend.ai.model_router import model_router
from nexus_backend.ai.token_counter import TokenCounter
from nexus_backend.core.exceptions import ResourceNotFoundError

logger = logging.getLogger("nexus.chat.service")


from nexus_backend.services.language_detector import language_detector
from nexus_backend.services.intent_detector import intent_detector
from nexus_backend.services.context_manager import context_manager
from nexus_backend.services.response_validator import response_validator


class ChatService:
    """
    Chat Thread Persistence, Context Memory Pipeline Manager, and Conversation Service.
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
        Execute Pipeline: Language Detect -> Intent Detect -> History Fetch -> LLM Route -> Response Validate -> Save DB.
        """
        conv_res = await db.execute(select(Conversation).where(Conversation.id == conversation_id))
        conv = conv_res.scalars().first()
        if not conv:
            raise ResourceNotFoundError("Conversation", conversation_id)

        # 1. Fetch Past Messages History (Conversation Memory)
        recent_db_messages = await self.get_recent_messages(db, conversation_id, limit=10)
        messages_history = [{"role": "user" if m.sender == "user" else "assistant", "content": m.content} for m in recent_db_messages]

        # 2. Language & Intent Detection
        lang_res = language_detector.detect_language(user_message_text)
        intent_res = intent_detector.detect_intent(user_message_text, past_messages=messages_history)

        # 3. Store User Message
        user_tokens = TokenCounter.count_tokens(user_message_text, preferred_model)
        await self.add_message(
            db=db,
            conversation_id=conversation_id,
            sender="user",
            content=user_message_text,
            tokens_used=user_tokens,
            meta={"language": lang_res.language, "intent": intent_res.intent}
        )

        # 4. Build Context System Prompt
        system_instruction = context_manager.build_system_instruction(
            lang_res=lang_res,
            intent_res=intent_res,
            custom_system_prompt=conv.system_prompt
        )

        # 5. Route LLM Generation with Full History Memory
        response = await model_router.route_generate_text(
            prompt=user_message_text,
            preferred_provider=preferred_provider,
            preferred_model=preferred_model,
            system_prompt=system_instruction,
            messages_history=messages_history
        )

        # 6. Response Validation Check
        val_res = response_validator.validate_response(
            user_prompt=user_message_text,
            response_text=response.content,
            lang_res=lang_res,
            intent_res=intent_res,
            past_messages=messages_history
        )

        final_content = response.content
        if not val_res.is_valid and val_res.suggested_fix == "conversational_greeting":
            from nexus_backend.ai.smart_responder import smart_responder
            final_content = smart_responder.generate_smart_response(
                prompt=user_message_text,
                messages_history=messages_history,
                model_name=preferred_model,
                provider_name=preferred_provider,
                lang_res=lang_res,
                intent_res=intent_res
            )

        # 7. Store Assistant Response Message
        assistant_msg = await self.add_message(
            db=db,
            conversation_id=conversation_id,
            sender="assistant",
            content=final_content,
            tokens_used=response.usage.total_tokens,
            cost=response.usage.cost_usd,
            meta={
                "provider": response.provider_name,
                "model": response.model_name,
                "is_live_api": getattr(response, "is_live_api", False),
                "language": lang_res.language,
                "intent": intent_res.intent,
                "validation_passed": val_res.is_valid
            }
        )

        return assistant_msg


chat_service = ChatService()
