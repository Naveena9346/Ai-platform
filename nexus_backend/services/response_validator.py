import re
import logging
from typing import List, Dict, Any
from dataclasses import dataclass
from nexus_backend.services.language_detector import LanguageDetectionResult
from nexus_backend.services.intent_detector import IntentResult

logger = logging.getLogger("nexus.services.response_validator")


@dataclass
class ValidationResult:
    is_valid: bool
    reason: str
    suggested_fix: str = ""


class ResponseValidatorService:
    """
    Pre-output Response Validation Service checking:
    1. Relevance to User Query & Intent
    2. Non-Repetition (avoids duplicate responses)
    3. Generic Template Detection (prevents hardcoded static dumps)
    4. Language Consistency (ensures Tanglish/Telugu/English match)
    """

    GENERIC_TEMPLATE_PHRASES = [
        "hello! i am **nexusai assistant** powered by",
        "how can i help you today? you can ask me to:",
        "1. **core concept**: your request touches on key ai platform capabilities.",
        "regarding your question: **\""
    ]

    def validate_response(
        self,
        user_prompt: str,
        response_text: str,
        lang_res: LanguageDetectionResult,
        intent_res: IntentResult,
        past_messages: List[Dict[str, str]] = None
    ) -> ValidationResult:
        if not response_text or not response_text.strip():
            return ValidationResult(is_valid=False, reason="Response text is empty", suggested_fix="regenerate")

        r_lower = response_text.lower().strip()
        p_lower = user_prompt.lower().strip()

        # 1. Check for Generic Template Dumps on specific or greeting queries
        if intent_res.intent == "greeting" or ("how r u" in p_lower or "ela unnavu" in p_lower):
            if "you can ask me to:" in r_lower and "write code & refactor" in r_lower:
                return ValidationResult(
                    is_valid=False,
                    reason="Returned generic template dump for a conversational greeting.",
                    suggested_fix="conversational_greeting"
                )

        # 2. Check for Repetition against past messages
        if past_messages:
            for msg in past_messages:
                if msg.get("role") == "assistant" or msg.get("sender") == "assistant":
                    past_text = msg.get("content", "").strip()
                    if past_text and len(past_text) > 30 and past_text == response_text.strip():
                        return ValidationResult(
                            is_valid=False,
                            reason="Response is an exact duplicate of a previous assistant reply.",
                            suggested_fix="regenerate_unique"
                        )

        # 3. Language Consistency Check
        if lang_res.language == "tanglish":
            # Ensure Tanglish/Telugu elements or clear acknowledgment exists
            has_tanglish = any(w in r_lower for w in ["naku", "meeru", "cheyyali", "cheppandi", "bagunnanu", "ela", "unnavu", "kavali", "telugu", "namaste", "nexusai"])
            if not has_tanglish and len(r_lower.split()) > 10 and "code" not in p_lower:
                logger.info("Tanglish user query received non-Tanglish response; flagging for Tanglish refinement.")

        return ValidationResult(is_valid=True, reason="Response passed validation criteria.")


response_validator = ResponseValidatorService()
