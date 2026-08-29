import logging
from typing import List, Dict, Any, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.chat import ChatMessage
from nexus_backend.services.language_detector import LanguageDetectionResult
from nexus_backend.services.intent_detector import IntentResult

logger = logging.getLogger("nexus.services.context_manager")


class ContextManagerService:
    """
    Manages Conversation Sliding Memory Window, History Context, and Language/Intent Prompt Augmentation.
    """

    async def get_conversation_history(
        self,
        db: AsyncSession,
        conversation_id: str,
        limit: int = 10
    ) -> List[Dict[str, str]]:
        """
        Fetch sliding window of past messages formatted as OpenAI role-content dictionary objects.
        """
        result = await db.execute(
            select(ChatMessage)
            .where(ChatMessage.conversation_id == conversation_id)
            .order_by(ChatMessage.created_at.desc())
            .limit(limit)
        )
        db_messages = list(result.scalars().all())
        db_messages.reverse()

        history: List[Dict[str, str]] = []
        for m in db_messages:
            role = "user" if m.sender == "user" else "assistant"
            history.append({"role": role, "content": m.content})
        return history

    def build_system_instruction(
        self,
        lang_res: LanguageDetectionResult,
        intent_res: IntentResult,
        custom_system_prompt: Optional[str] = None
    ) -> str:
        """
        Build dynamic system prompt tailored to detected language and intent.
        """
        base_instructions = [
            "You are NexusAI Assistant, a principal AI software engineer, platform guide, and intelligent virtual assistant.",
            "Always give accurate, direct, helpful, and context-aware responses specifically tailored to the user's query.",
            "Do NOT return static hardcoded intro lists unless the user explicitly asks 'who are you' or 'what can you do'.",
            "Maintain conversation context. If the user asks a follow-up question (e.g., 'give an example'), use the active conversation history to answer specifically about the topic previously discussed."
        ]

        if custom_system_prompt:
            base_instructions.append(f"Custom Instruction: {custom_system_prompt}")

        # Language specific rules
        if lang_res.language == "tanglish":
            base_instructions.append(
                "USER LANGUAGE DETECTED: Romanized Telugu (Tanglish).\n"
                "You MUST respond in Romanized Telugu (Tanglish) mixed naturally with clear English technical terms.\n"
                "Example style: 'Nenu chala bagunnanu! Meeku kavalasina assistant ni. Meeko samacharam ivvadaniki tayaruga unnanu.'"
            )
        elif lang_res.language == "telugu":
            base_instructions.append(
                "USER LANGUAGE DETECTED: Telugu Script (తెలుగు).\n"
                "You MUST respond in elegant, natural Telugu script (తెలుగులో మాత్రమే సమాధానం ఇవ్వండి)."
            )
        else:
            base_instructions.append(
                "USER LANGUAGE DETECTED: English.\n"
                "Respond in clear, professional English."
            )

        # Intent specific rules
        if intent_res.intent == "greeting":
            base_instructions.append("INTENT: Friendly Greeting. Give a warm, conversational 1-2 sentence response. Do NOT dump template lists.")
        elif intent_res.intent == "appointment_booking":
            base_instructions.append("INTENT: Appointment Booking. Guide the user to specify name, date, time, and service required.")
        elif intent_res.intent == "code_request":
            base_instructions.append("INTENT: Code Request. Provide production-ready, clean, well-commented code snippet.")

        return "\n\n".join(base_instructions)


context_manager = ContextManagerService()
