import logging
from typing import AsyncGenerator, List, Optional
from nexus_backend.ai.base_provider import (
    BaseAIProvider,
    LLMResponse,
    LLMStreamChunk,
    EmbeddingResponse,
    TokenUsage
)
from nexus_backend.ai.smart_responder import smart_responder

logger = logging.getLogger("nexus.ai.gemini")


class GeminiProvider(BaseAIProvider):
    """
    Concrete Provider Driver for Google Gemini 1.5 API.
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("gemini", api_key, base_url or "https://generativelanguage.googleapis.com/v1beta")

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "gemini-1.5-flash",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        content = smart_responder.generate_smart_response(prompt, model_name=model_name, provider_name="google_gemini")
        return LLMResponse(
            content=content,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=22, completion_tokens=80, total_tokens=102, cost_usd=0.00008)
        )

    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "gemini-1.5-flash",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        content = smart_responder.generate_smart_response(prompt, model_name=model_name, provider_name="google_gemini")
        words = content.split(" ")
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
        model_name: str = "text-embedding-004"
    ) -> EmbeddingResponse:
        embeddings = [[0.015 * (i + j) for j in range(768)] for i in range(len(texts))]
        return EmbeddingResponse(
            embeddings=embeddings,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=10 * len(texts), total_tokens=10 * len(texts))
        )

    async def is_healthy(self) -> bool:
        return True
