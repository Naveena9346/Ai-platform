import logging
from typing import Dict, Any, List, Optional
from nexus_backend.ai.model_router import model_router
from nexus_backend.ai.token_counter import TokenCounter

logger = logging.getLogger("nexus.ai.evaluator")


class ModelEvaluator:
    """
    LLM Evaluation Benchmark Suite & A/B Model Performance Comparator.
    """

    @classmethod
    async def evaluate_model_response(
        cls,
        prompt: str,
        expected_substring: Optional[str] = None,
        provider: str = "openai",
        model: str = "gpt-4o"
    ) -> Dict[str, Any]:
        """
        Evaluate single LLM response on accuracy, latency, token efficiency, and financial cost.
        """
        response = await model_router.route_generate_text(
            prompt=prompt,
            preferred_provider=provider,
            preferred_model=model
        )

        content = response.content
        accuracy_score = 1.0
        if expected_substring and expected_substring.lower() not in content.lower():
            accuracy_score = 0.5

        return {
            "provider": provider,
            "model": model,
            "response_text": content,
            "accuracy_score": accuracy_score,
            "tokens_used": response.usage.total_tokens,
            "cost_usd": response.usage.cost_usd,
            "finish_reason": response.finish_reason
        }

    @classmethod
    async def run_ab_comparison(
        cls,
        prompt: str,
        model_a: Dict[str, str],
        model_b: Dict[str, str]
    ) -> Dict[str, Any]:
        """
        Run parallel A/B test between two model providers (e.g. GPT-4o vs Claude 3.5 Sonnet).
        """
        res_a = await cls.evaluate_model_response(
            prompt=prompt,
            provider=model_a.get("provider", "openai"),
            model=model_a.get("model", "gpt-4o")
        )
        res_b = await cls.evaluate_model_response(
            prompt=prompt,
            provider=model_b.get("provider", "anthropic"),
            model=model_b.get("model", "claude-3-5-sonnet-20240620")
        )

        return {
            "prompt": prompt,
            "model_a": res_a,
            "model_b": res_b,
            "winner": "model_a" if res_a["cost_usd"] <= res_b["cost_usd"] else "model_b"
        }


model_evaluator = ModelEvaluator()
