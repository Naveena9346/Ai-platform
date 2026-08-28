import logging
from typing import AsyncGenerator, List, Optional
from nexus_backend.ai.base_provider import (
    BaseAIProvider,
    LLMResponse,
    LLMStreamChunk,
    EmbeddingResponse,
    TokenUsage
)

logger = logging.getLogger("nexus.ai.huggingface")


class HuggingFaceProvider(BaseAIProvider):
    """
    Concrete Provider Driver for HuggingFace Inference API endpoints.
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("huggingface", api_key, base_url)

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "mistralai/Mistral-7B-Instruct-v0.2",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        return LLMResponse(
            content=f"[Simulated HuggingFace Response for prompt: '{prompt[:50]}...']",
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=20, completion_tokens=40, total_tokens=60, cost_usd=0.00001)
        )

    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "mistralai/Mistral-7B-Instruct-v0.2",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        words = f"Simulated HuggingFace stream for: {prompt}".split(" ")
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
        model_name: str = "BAAI/bge-large-en-v1.5"
    ) -> EmbeddingResponse:
        embeddings = [[0.05 * (i + j) for j in range(1536)] for i in range(len(texts))]
        return EmbeddingResponse(
            embeddings=embeddings,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=10 * len(texts), total_tokens=10 * len(texts), cost_usd=0.0)
        )

    async def is_healthy(self) -> bool:
        return True
