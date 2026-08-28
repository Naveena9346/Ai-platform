import logging
from typing import Dict
import tiktoken

logger = logging.getLogger("nexus.ai.token_counter")


class TokenCounter:
    """
    Unified Token Count Calculation & Cost Estimator.
    """
    _encoders: Dict[str, tiktoken.Encoding] = {}

    @classmethod
    def count_tokens(cls, text: str, model_name: str = "gpt-4o") -> int:
        """
        Accurately count tokens using tiktoken encoder with fallback character approximation.
        """
        if not text:
            return 0
        try:
            if model_name not in cls._encoders:
                try:
                    cls._encoders[model_name] = tiktoken.encoding_for_model(model_name)
                except Exception:
                    cls._encoders[model_name] = tiktoken.get_encoding("cl100k_base")
            return len(cls._encoders[model_name].encode(text))
        except Exception as e:
            logger.warning(f"Tiktoken count error, falling back to heuristic token count: {e}")
            return max(1, len(text) // 4)

    @classmethod
    def calculate_cost(
        cls,
        prompt_tokens: int,
        completion_tokens: int,
        model_name: str = "gpt-4o"
    ) -> float:
        """
        Calculate estimated financial cost (USD) based on model pricing matrix.
        """
        # Price per 1K tokens
        rates = {
            "gpt-4o": (0.0050, 0.0150),
            "gpt-3.5-turbo": (0.0005, 0.0015),
            "gemini-1.5-flash": (0.00035, 0.00105),
            "gemini-1.5-pro": (0.0035, 0.0105),
            "claude-3-5-sonnet-20240620": (0.0030, 0.0150),
            "llama3:latest": (0.0000, 0.0000)
        }
        input_rate, output_rate = rates.get(model_name, (0.0015, 0.0020))
        cost = (prompt_tokens / 1000.0 * input_rate) + (completion_tokens / 1000.0 * output_rate)
        return round(cost, 6)
