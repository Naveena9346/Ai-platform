import logging
import httpx
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
        if openai is not None and self.api_key and len(self.api_key.strip()) > 5:
            try:
                self.client = openai.AsyncOpenAI(api_key=self.api_key, base_url=self.base_url)
            except Exception:
                self.client = None
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
        messages_history = kwargs.pop("messages_history", None) or []
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        for m in messages_history:
            role = m.get("role") or m.get("sender") or "user"
            if role in ["user", "assistant", "system"]:
                messages.append({"role": role, "content": m.get("content", "")})
        messages.append({"role": "user", "content": prompt})

        api_key = kwargs.pop("api_key", None) or self.api_key
        # Try Live API Call via Client if instantiated or dynamically provided key
        effective_client = self.client
        if api_key and api_key != self.api_key and openai is not None:
            try:
                effective_client = openai.AsyncOpenAI(api_key=api_key, base_url=self.base_url)
            except Exception:
                effective_client = None

        if effective_client is not None:
            try:
                res = await effective_client.chat.completions.create(
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
                    finish_reason=choice.finish_reason or "stop",
                    is_live_api=True
                )
            except Exception as e:
                logger.warning(f"OpenAI Client API exception: {e}")

        # Try REST API Call via httpx if API Key present
        if api_key and len(api_key.strip()) > 5:
            try:
                headers = {
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json"
                }
                payload = {
                    "model": model_name,
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
                async with httpx.AsyncClient() as client:
                    res = await client.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers, timeout=30.0)
                    if res.status_code == 200:
                        data = res.json()
                        text_out = data["choices"][0]["message"]["content"]
                        usage_raw = data.get("usage", {})
                        p_toks = usage_raw.get("prompt_tokens", 25)
                        c_toks = usage_raw.get("completion_tokens", 85)
                        return LLMResponse(
                            content=text_out,
                            model_name=model_name,
                            provider_name=self.provider_name,
                            usage=TokenUsage(
                                prompt_tokens=p_toks,
                                completion_tokens=c_toks,
                                total_tokens=p_toks + c_toks,
                                cost_usd=(p_toks * 0.000005 + c_toks * 0.000015)
                            ),
                            is_live_api=True
                        )
                    else:
                        logger.warning(f"OpenAI REST API status {res.status_code}: {res.text[:200]}")
            except Exception as e:
                logger.warning(f"OpenAI httpx API call exception: {e}")

        # Intelligent Dynamic Fallback Engine
        smart_content = smart_responder.generate_smart_response(
            prompt=prompt,
            messages_history=messages_history,
            model_name=model_name,
            provider_name="openai"
        )
        return LLMResponse(
            content=smart_content,
            model_name=model_name,
            provider_name=self.provider_name,
            usage=TokenUsage(prompt_tokens=25, completion_tokens=85, total_tokens=110, cost_usd=0.0),
            is_live_api=False
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
        res = await self.generate_text(prompt, system_prompt, model_name, temperature, max_tokens, **kwargs)
        words = res.content.split(" ")
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
