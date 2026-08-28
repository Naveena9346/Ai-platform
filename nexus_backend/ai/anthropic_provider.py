import logging
from typing import AsyncGenerator, List, Optional
from nexus_backend.ai.base_provider import (
    BaseAIProvider,
    LLMResponse,
    LLMStreamChunk,
    EmbeddingResponse,
    TokenUsage
)

logger = logging.getLogger("nexus.ai.anthropic")


class AnthropicProvider(BaseAIProvider):
    """
    Concrete Provider Driver for Anthropic Claude 3.5 Sonnet / Haiku.
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("anthropic", api_key, base_url)

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "claude-3-5-sonnet-20240620",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        return LLMResponse(
            content=f"[Simulated Anthropic Claude 3.5 Response for prompt: '{prompt[:50]}...']",
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=30, completion_tokens=50, total_tokens=80, cost_usd=0.00015)
        )

    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "claude-3-5-sonnet-20240620",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        words = f"Simulated Anthropic Claude response stream for: {prompt}".split(" ")
        for w in words:
            yield LLMStreamChunk(
                content_delta=w + " ",
                model_name=model_name,
                provider_name=self.provider_name
            )
        yield LLMStreamChunk(
            content_delta="",
            model_name=model_name,
            provider_name=self.provider_name,
            is_final=True
        )

    async def generate_embeddings(
        self,
        texts: List[str],
        model_name: str = "claude-embedding-v1"
    ) -> EmbeddingResponse:
        embeddings = [[0.03 * (i + j) for j in range(1536)] for i in range(len(texts))]
        return EmbeddingResponse(
            embeddings=embeddings,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=20 * len(texts), total_tokens=20 * len(texts))
        )

    async def is_healthy(self) -> bool:
        return True
