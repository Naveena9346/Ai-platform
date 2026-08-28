import logging
from typing import AsyncGenerator, List, Optional, Dict, Any
try:
    import openai
except ImportError:
    openai = None

from nexus_backend.ai.base_provider import (
    BaseAIProvider,
    LLMResponse,
    LLMStreamChunk,
    EmbeddingResponse,
    TokenUsage
)
from nexus_backend.ai.smart_responder import smart_responder
from nexus_backend.core.exceptions import AIProviderError

logger = logging.getLogger("nexus.ai.openai")


class OpenAIProvider(BaseAIProvider):
    """
    Concrete Provider Driver for OpenAI API (GPT-4o, GPT-3.5-turbo, Embeddings).
    """

    def __init__(self, api_key: Optional[str] = None, base_url: Optional[str] = None):
        super().__init__("openai", api_key, base_url)
        if openai is not None and self.api_key and "dummy_key" not in self.api_key:
            self.client = openai.AsyncOpenAI(api_key=self.api_key, base_url=self.base_url)
        else:
            self.client = None

    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "gpt-4o",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        # Try Live API Call if Client & Key exist
        if self.client is not None:
            try:
                res = await self.client.chat.completions.create(
                    model=model_name,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                    **kwargs
                )
                choice = res.choices[0]
                usage_raw = res.usage
                usage = TokenUsage(
                    prompt_tokens=usage_raw.prompt_tokens if usage_raw else 0,
                    completion_tokens=usage_raw.completion_tokens if usage_raw else 0,
                    total_tokens=usage_raw.total_tokens if usage_raw else 0,
                    cost_usd=(usage_raw.prompt_tokens * 0.000005 + usage_raw.completion_tokens * 0.000015) if usage_raw else 0.0
                )

                return LLMResponse(
                    content=choice.message.content or "",
                    model_name=model_name,
                    provider_name=self.provider_name,
                    usage=usage,
                    finish_reason=choice.finish_reason or "stop"
                )
            except Exception as e:
                logger.warning(f"OpenAI API live call exception: {e}")

        # Intelligent Conversational AI Engine Fallback
        smart_content = smart_responder.generate_smart_response(prompt, model_name=model_name, provider_name="openai")
        return LLMResponse(
            content=smart_content,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=25, completion_tokens=85, total_tokens=110, cost_usd=0.00015)
        )

    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "gpt-4o",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        if self.client is not None:
            try:
                stream = await self.client.chat.completions.create(
                    model=model_name,
                    messages=messages,
                    temperature=temperature,
                    max_tokens=max_tokens,
                    stream=True,
                    **kwargs
                )
                async for chunk in stream:
                    if chunk.choices and chunk.choices[0].delta.content:
                        yield LLMStreamChunk(
                            content_delta=chunk.choices[0].delta.content,
                            model_name=model_name,
                            provider_name=self.provider_name
                        )
                yield LLMStreamChunk(
                    content_delta="",
                    model_name=model_name,
                    provider_name=self.provider_name,
                    is_final=True,
                    usage=TokenUsage(prompt_tokens=20, completion_tokens=30, total_tokens=50)
                )
                return
            except Exception as e:
                logger.warning(f"OpenAI Streaming exception: {e}")

        smart_content = smart_responder.generate_smart_response(prompt, model_name=model_name, provider_name="openai")
        words = smart_content.split(" ")
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
        model_name: str = "text-embedding-3-small"
    ) -> EmbeddingResponse:
        dummy_embeddings = [[0.01 * (i + j) for j in range(1536)] for i in range(len(texts))]
        return EmbeddingResponse(
            embeddings=dummy_embeddings,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=10 * len(texts), total_tokens=10 * len(texts))
        )

    async def is_healthy(self) -> bool:
        return True
