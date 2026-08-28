import logging
from typing import AsyncGenerator, List, Optional
from nexus_backend.ai.base_provider import BaseAIProvider, LLMResponse, LLMStreamChunk, EmbeddingResponse, TokenUsage

logger = logging.getLogger("nexus.ai.deepseek")

class DeepSeekProvider(BaseAIProvider):
    """
    Concrete Provider Driver for DeepSeek Coder & Chat Models.
    """
    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("deepseek", api_key, base_url or "https://api.deepseek.com/v1")

    async def generate_text(
        self, prompt: str, system_prompt: Optional[str] = None, model_name: str = "deepseek-coder",
        temperature: float = 0.7, max_tokens: int = 2048, **kwargs
    ) -> LLMResponse:
        return LLMResponse(
            content=f"[Simulated DeepSeek Coder Response for: '{prompt[:50]}...']",
            model_name=model_name, provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=25, completion_tokens=45, total_tokens=70, cost_usd=0.00003)
        )

    async def generate_stream(
        self, prompt: str, system_prompt: Optional[str] = None, model_name: str = "deepseek-coder",
        temperature: float = 0.7, max_tokens: int = 2048, **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        for w in f"Simulated DeepSeek Coder stream for: {prompt}".split(" "):
            yield LLMStreamChunk(content_delta=w + " ", model_name=model_name, provider_name=self.provider_name)
        yield LLMStreamChunk(content_delta="", model_name=model_name, provider_name=self.provider_name, is_final=True)

    async def generate_embeddings(self, texts: List[str], model_name: str = "deepseek-embed") -> EmbeddingResponse:
        return EmbeddingResponse(embeddings=[[0.02 * (i+j) for j in range(1536)] for i in range(len(texts))], model_name=model_name, provider_name=self.provider_name, usage=TokenUsage(prompt_tokens=10*len(texts), total_tokens=10*len(texts)))

    async def is_healthy(self) -> bool:
        return True
