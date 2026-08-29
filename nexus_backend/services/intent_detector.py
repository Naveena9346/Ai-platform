import re
from typing import Dict, Any, List
from dataclasses import dataclass

@dataclass
class IntentResult:
    intent: str  # "greeting", "explanation", "code_request", "appointment_booking", "follow_up", "math_logic", "general"
    topic: str
    requires_clarification: bool
    confidence: float


class IntentDetectorService:
    """
    Service for identifying user intent, topic, and whether query requires clarification or follow-up memory.
    """

    def detect_intent(self, text: str, past_messages: List[Dict[str, Any]] = None) -> IntentResult:
        if not text or not text.strip():
            return IntentResult(intent="general", topic="general", requires_clarification=True, confidence=1.0)

        p_lower = text.lower().strip()

        # 1. Follow-up detection (e.g. "give me an example", "how to fix it", "show code", "cheppandi", "malli cheppu")
        is_short_followup = len(p_lower.split()) <= 4 and any(
            w in p_lower for w in ["example", "more", "fix", "code", "why", "how", "another", "udaharana", "malli", "dani", "adi"]
        )
        if is_short_followup and past_messages and len(past_messages) > 0:
            # Extract topic from recent conversation history
            last_assistant_msg = ""
            for m in reversed(past_messages):
                if m.get("sender") == "assistant" or m.get("role") == "assistant":
                    last_assistant_msg = m.get("content", "")
                    break

            topic = "previous_context"
            if "react" in last_assistant_msg.lower():
                topic = "react"
            elif "python" in last_assistant_msg.lower():
                topic = "python"
            elif "rag" in last_assistant_msg.lower() or "document" in last_assistant_msg.lower():
                topic = "rag"

            return IntentResult(intent="follow_up", topic=topic, requires_clarification=False, confidence=0.92)

        # 2. Greeting intent
        greeting_words = ["hi", "hello", "hey", "namaste", "namaskaram", "ela unnavu", "ela unnaru", "how are you", "good morning", "good evening"]
        # Exact match or short greeting phrase
        if any(w == p_lower or p_lower.startswith(w + " ") or p_lower.startswith(w + "!") or p_lower.startswith(w + ",") for w in greeting_words):
            return IntentResult(intent="greeting", topic="greeting", requires_clarification=False, confidence=0.98)

        # 3. Appointment / Booking intent
        booking_words = ["appointment", "book", "schedule", "slot", "meeting", "booing", "cheyyali", "kavali"]
        if "appointment" in p_lower or "book" in p_lower or ("meeting" in p_lower and "schedule" in p_lower):
            return IntentResult(intent="appointment_booking", topic="booking", requires_clarification=False, confidence=0.95)

        # 4. Code & Technical Implementation Request
        code_words = ["code", "python", "javascript", "typescript", "react", "fastapi", "sql", "function", "script", "component", "refactor", "bug"]
        if any(w in p_lower for w in code_words):
            topic = "software_development"
            if "react" in p_lower:
                topic = "react"
            elif "python" in p_lower:
                topic = "python"
            return IntentResult(intent="code_request", topic=topic, requires_clarification=False, confidence=0.90)

        # 5. Conceptual Explanation Request
        explain_words = ["explain", "what is", "how does", "tell me about", "gurinchi", "yokka", "vivarinchu", "cheppandi", "overview"]
        if any(w in p_lower for w in explain_words):
            return IntentResult(intent="explanation", topic="concept_explanation", requires_clarification=False, confidence=0.88)

        # 6. Math & Logic
        math_words = ["calculate", "math", "sum", "multiply", "*", "/", "+", "="]
        if any(w in p_lower for w in math_words) and any(char.isdigit() for char in p_lower):
            return IntentResult(intent="math_logic", topic="math", requires_clarification=False, confidence=0.90)

        # 7. Unclear or Extremely Truncated Input
        if len(p_lower) < 2:
            return IntentResult(intent="general", topic="general", requires_clarification=True, confidence=0.50)

        return IntentResult(intent="general", topic="general_inquiry", requires_clarification=False, confidence=0.80)


intent_detector = IntentDetectorService()
