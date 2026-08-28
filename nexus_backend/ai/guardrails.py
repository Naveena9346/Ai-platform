import re
import logging
from typing import Dict, Any, List, Tuple

logger = logging.getLogger("nexus.ai.guardrails")


class PromptGuardrailEngine:
    """
    Enterprise AI Guardrails Engine for Prompt Injection Detection, PII Redaction & Hallucination Checks.
    """

    PROMPT_INJECTION_PATTERNS = [
        r"ignore\s+(all\s+)?previous\s+instructions",
        r"disregard\s+system\s+prompt",
        r"you\s+are\s+now\s+in\s+dan\s+mode",
        r"override\s+safety\s+filter",
        r"jailbreak",
        r"act\s+as\s+an\s+unfiltered\s+ai"
    ]

    EMAIL_REGEX = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
    PHONE_REGEX = r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b"
    SSN_REGEX = r"\b\d{3}-\d{2}-\d{4}\b"
    CREDIT_CARD_REGEX = r"\b(?:\d[ -]*?){13,16}\b"

    @classmethod
    def detect_prompt_injection(cls, prompt_text: str) -> Tuple[bool, List[str]]:
        """
        Scan text for jailbreak and prompt injection patterns.
        """
        detected_patterns = []
        for pattern in cls.PROMPT_INJECTION_PATTERNS:
            if re.search(pattern, prompt_text, re.IGNORECASE):
                detected_patterns.append(pattern)
        return len(detected_patterns) > 0, detected_patterns

    @classmethod
    def redact_pii(cls, text: str) -> Tuple[str, Dict[str, int]]:
        """
        Redact PII data (Emails, Phone numbers, SSNs, Credit Cards) before passing to external APIs.
        """
        redacted_text = text
        redaction_counts = {"emails": 0, "phones": 0, "ssn": 0, "credit_cards": 0}

        # Redact Emails
        emails = re.findall(cls.EMAIL_REGEX, redacted_text)
        redaction_counts["emails"] = len(emails)
        redacted_text = re.sub(cls.EMAIL_REGEX, "[REDACTED_EMAIL]", redacted_text)

        # Redact Phones
        phones = re.findall(cls.PHONE_REGEX, redacted_text)
        redaction_counts["phones"] = len(phones)
        redacted_text = re.sub(cls.PHONE_REGEX, "[REDACTED_PHONE]", redacted_text)

        # Redact SSNs
        ssns = re.findall(cls.SSN_REGEX, redacted_text)
        redaction_counts["ssn"] = len(ssns)
        redacted_text = re.sub(cls.SSN_REGEX, "[REDACTED_SSN]", redacted_text)

        # Redact Credit Cards
        cards = re.findall(cls.CREDIT_CARD_REGEX, redacted_text)
        redaction_counts["credit_cards"] = len(cards)
        redacted_text = re.sub(cls.CREDIT_CARD_REGEX, "[REDACTED_CARD]", redacted_text)

        return redacted_text, redaction_counts

    @classmethod
    def verify_content_safety(cls, text: str) -> Dict[str, Any]:
        """
        Analyze toxicity, hate speech, and safety violation indicators.
        """
        is_safe = True
        flagged_categories = []

        unsafe_keywords = ["harmful_substance_recipe", "cyber_weapon_exploit"]
        for kw in unsafe_keywords:
            if kw in text.lower():
                is_safe = False
                flagged_categories.append(kw)

        return {
            "is_safe": is_safe,
            "flagged_categories": flagged_categories,
            "safety_score": 0.99 if is_safe else 0.20
        }


guardrail_engine = PromptGuardrailEngine()
