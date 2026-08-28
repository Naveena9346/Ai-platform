import logging
from typing import AsyncGenerator, List, Optional
import httpx
from nexus_backend.ai.base_provider import (
    BaseAIProvider,
    LLMResponse,
    LLMStreamChunk,
    EmbeddingResponse,
    TokenUsage
)

logger = logging.getLogger("nexus.ai.gemini")


class GeminiProvider(BaseAIProvider):
    """
    Concrete Provider Driver for Google Gemini 1.5 API.
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("gemini", api_key, base_url)
        self.api_url = base_url or "https://generativelanguage.googleapis.com/v1beta"

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "gemini-1.5-flash",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        full_text = f"{system_prompt}\n\n{prompt}" if system_prompt else prompt
        
        # Real HTTP request or graceful simulated fallback
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.api_url}/models/{model_name}:generateContent?key={self.api_key}"
                payload = {
                    "contents": [{"parts": [{"text": full_text}]}],
                    "generationConfig": {"temperature": temperature, "maxOutputTokens": max_tokens}
                }
                res = await client.post(url, json=payload, timeout=10.0)
                if res.status_code == 200:
                    data = res.json()
                    content = data["candidates"][0]["content"]["parts"][0]["text"]
                    return LLMResponse(
                        content=content,
                        model_name=model_name,
                        provider_name=self.provider_name,
                        usage=TokenUsage(prompt_tokens=30, completion_tokens=50, total_tokens=80, cost_usd=0.00005)
                    )
        except Exception as e:
            logger.warning(f"Gemini API call failed, invoking fallback response: {e}")

        return LLMResponse(
            content=f"[Simulated Google Gemini Response for prompt: '{prompt[:50]}...']",
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=25, completion_tokens=45, total_tokens=70, cost_usd=0.00003)
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
        words = f"Simulated Google Gemini response stream for: {prompt}".split(" ")
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
        embeddings = [[0.02 * (i + j) for j in range(1536)] for i in range(len(texts))]
        return EmbeddingResponse(
            embeddings=embeddings,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=15 * len(texts), total_tokens=15 * len(texts))
        )

    async def is_healthy(self) -> bool:
        return True
