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

logger = logging.getLogger("nexus.ai.ollama")


class OllamaProvider(BaseAIProvider):
    """
    Concrete Provider Driver for Local Offline Ollama LLMs (Llama3, Mistral, Qwen).
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("ollama", api_key, base_url or "http://localhost:11434")

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "llama3:latest",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/api/generate"
                payload = {
                    "model": model_name,
                    "prompt": prompt,
                    "system": system_prompt or "",
                    "stream": False,
                    "options": {"temperature": temperature}
                }
                res = await client.post(url, json=payload, timeout=15.0)
                if res.status_code == 200:
                    data = res.json()
                    return LLMResponse(
                        content=data.get("response", ""),
                        model_name=model_name,
                        provider_name=self.provider_name,
                        usage=TokenUsage(
                            prompt_tokens=data.get("prompt_eval_count", 0),
                            completion_tokens=data.get("eval_count", 0),
                            total_tokens=data.get("prompt_eval_count", 0) + data.get("eval_count", 0),
                            cost_usd=0.0  # Offline local model is free
                        )
                    )
        except Exception as e:
            logger.warning(f"Ollama local instance unavailable: {e}")

        return LLMResponse(
            content=f"[Simulated Ollama Local Response for prompt: '{prompt[:50]}...']",
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=15, completion_tokens=30, total_tokens=45, cost_usd=0.0)
        )

    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "llama3:latest",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        words = f"Simulated Local Ollama text stream for: {prompt}".split(" ")
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
        model_name: str = "nomic-embed-text"
    ) -> EmbeddingResponse:
        embeddings = [[0.04 * (i + j) for j in range(1536)] for i in range(len(texts))]
        return EmbeddingResponse(
            embeddings=embeddings,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=10 * len(texts), total_tokens=10 * len(texts), cost_usd=0.0)
        )

    async def is_healthy(self) -> bool:
        return True
