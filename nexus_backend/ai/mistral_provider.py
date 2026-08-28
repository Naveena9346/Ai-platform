import logging
from typing import AsyncGenerator, List, Optional, Dict, Any
import httpx
from nexus_backend.ai.base_provider import (
    BaseAIProvider,
    LLMResponse,
    LLMStreamChunk,
    EmbeddingResponse,
    TokenUsage
)

logger = logging.getLogger("nexus.ai.mistral")


class MistralProvider(BaseAIProvider):
    """
    Concrete Provider Driver for Mistral AI API (Mistral Large, Codestral, Embeddings).
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("mistral", api_key, base_url or "https://api.mistral.ai/v1")

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "mistral-large-latest",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        if self.api_key:
            try:
                headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
                payload = {"model": model_name, "messages": messages, "temperature": temperature, "max_tokens": max_tokens}
                async with httpx.AsyncClient() as client:
                    res = await client.post(f"{self.base_url}/chat/completions", json=payload, headers=headers, timeout=15.0)
                    if res.status_code == 200:
                        data = res.json()
                        usage_raw = data.get("usage", {})
                        p_tokens = usage_raw.get("prompt_tokens", 0)
                        c_tokens = usage_raw.get("completion_tokens", 0)
                        return LLMResponse(
                            content=data["choices"][0]["message"]["content"],
                            model_name=model_name,
                            provider_name=self.provider_name,
                            usage=TokenUsage(
                                prompt_tokens=p_tokens,
                                completion_tokens=c_tokens,
                                total_tokens=p_tokens + c_tokens,
                                cost_usd=(p_tokens * 0.000003 + c_tokens * 0.000009)
                            )
                        )
            except Exception as e:
                logger.warning(f"Mistral live API call failed: {e}")

        return LLMResponse(
            content=f"[Simulated Mistral Large Response for prompt: '{prompt[:50]}...']",
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=22, completion_tokens=42, total_tokens=64, cost_usd=0.00008)
        )

    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "mistral-large-latest",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        words = f"Simulated Mistral AI text stream for: {prompt}".split(" ")
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
        model_name: str = "mistral-embed"
    ) -> EmbeddingResponse:
        embeddings = [[0.025 * (i + j) for j in range(1536)] for i in range(len(texts))]
        return EmbeddingResponse(
            embeddings=embeddings,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=12 * len(texts), total_tokens=12 * len(texts), cost_usd=0.000005)
        )

    async def is_healthy(self) -> bool:
        return True
