import re
from typing import Dict, Any
from dataclasses import dataclass

@dataclass
class LanguageDetectionResult:
    language: str  # "english", "telugu", "tanglish"
    script: str    # "latin", "telugu"
    confidence: float


class LanguageDetectorService:
    """
    Service for identifying user language: English, Telugu Script, or Romanized Telugu (Tanglish).
    """

    # Common Romanized Telugu (Tanglish) vocabulary patterns
    TANGLISH_PATTERNS = [
        r"\bnaku\b", r"\bnaaku\b", r"\bmeeru\b", r"\bmeku\b", r"\bmaku\b",
        r"\bcheyyali\b", r"\bchey\b", r"\bcheyyi\b", r"\bcheppandi\b", r"\bcheppu\b",
        r"\bela\b", r"\belaa\b", r"\bunnavu\b", r"\bunnaru\b", r"\beeroju\b",
        r"\benti\b", r"\bendi\b", r"\bem\b", r"\bepudu\b", r"\bekkada\b",
        r"\bkavali\b", r"\bkaavali\b", r"\bkaadhu\b", r"\bkadhu\b", r"\bavunu\b",
        r"\bagundhi\b", r"\bbagundhi\b", r"\bbagunnara\b", r"\bbagullanu\b",
        r"\bnamaskaram\b", r"\bnamaste\b", r"\bchoodu\b", r"\bchustunnanu\b",
        r"\bchustunnavu\b", r"\bgurinchi\b", r"\bthoti\b", r"\bleka\b",
        r"\bchesanu\b", r"\bchestanu\b", r"\bivvandi\b", r"\biyyi\b", r"\bivvu\b"
    ]

    def detect_language(self, text: str) -> LanguageDetectionResult:
        if not text or not text.strip():
            return LanguageDetectionResult(language="english", script="latin", confidence=1.0)

        # 1. Check for Telugu Script (Unicode range 0C00-0C7F)
        telugu_script_chars = len(re.findall(r"[\u0C00-\u0C7F]", text))
        total_chars = len(re.findall(r"\w", text))

        if telugu_script_chars > 0 and total_chars > 0:
            if telugu_script_chars / total_chars > 0.15 or telugu_script_chars >= 3:
                return LanguageDetectionResult(language="telugu", script="telugu", confidence=0.95)

        # 2. Check for Romanized Telugu (Tanglish)
        text_lower = text.lower()
        tanglish_matches = 0
        for pattern in self.TANGLISH_PATTERNS:
            if re.search(pattern, text_lower):
                tanglish_matches += 1

        if tanglish_matches >= 1:
            confidence = min(0.99, 0.70 + (tanglish_matches * 0.10))
            return LanguageDetectionResult(language="tanglish", script="latin", confidence=confidence)

        # 3. Default to English
        return LanguageDetectionResult(language="english", script="latin", confidence=0.90)


language_detector = LanguageDetectorService()
