import pytest
from nexus_backend.ai.model_router import ModelRouter
from nexus_backend.ai.token_counter import TokenCounter
from nexus_backend.ai.openai_provider import OpenAIProvider
from nexus_backend.ai.gemini_provider import GeminiProvider


@pytest.mark.asyncio
async def test_openai_provider_generation():
    """
    Test 4: Verify OpenAI Provider text generation contract.
    """
    provider = OpenAIProvider(api_key=None)
    res = await provider.generate_text(prompt="What is AI?", model_name="gpt-4o")

    assert res.content is not None
    assert len(res.content) > 0
    assert res.provider_name == "openai"
    assert res.usage.total_tokens > 0


@pytest.mark.asyncio
async def test_model_router_failover_execution():
    """
    Test 5: Verify ModelRouter fallback routing mechanism across providers.
    """
    router = ModelRouter()
    res = await router.route_generate_text(
        prompt="Explain quantum computing",
        preferred_provider="openai",
        preferred_model="gpt-4o"
    )

    assert res.content is not None
    assert res.provider_name in ["openai", "gemini", "anthropic", "ollama", "huggingface"]


def test_token_counter_and_cost_calculation():
    """
    Test 6: Verify tiktoken count and financial cost calculation.
    """
    text = "NexusAI Platform delivers production-grade enterprise LLM multi-provider orchestration."
    count = TokenCounter.count_tokens(text, model_name="gpt-4o")
    assert count > 0

    cost = TokenCounter.calculate_cost(prompt_tokens=1000, completion_tokens=500, model_name="gpt-4o")
    assert cost == 0.0125  # (1000/1000 * 0.0050) + (500/1000 * 0.0150)
