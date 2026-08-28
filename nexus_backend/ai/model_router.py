import logging
import time
from typing import Dict, List, Optional, Type
from nexus_backend.core.config import settings
from nexus_backend.core.exceptions import AIProviderError
from nexus_backend.ai.base_provider import BaseAIProvider, LLMResponse, EmbeddingResponse
from nexus_backend.ai.openai_provider import OpenAIProvider
from nexus_backend.ai.gemini_provider import GeminiProvider
from nexus_backend.ai.anthropic_provider import AnthropicProvider
from nexus_backend.ai.ollama_provider import OllamaProvider
from nexus_backend.ai.huggingface_provider import HuggingFaceProvider

logger = logging.getLogger("nexus.ai.router")


class ModelRouter:
    """
    Dynamic AI Model Router with Provider Failover, Circuit Breaking, and Cost Optimization.
    """

    def __init__(self):
        self.providers: Dict[str, BaseAIProvider] = {}
        self.circuit_breaker_tripped: Dict[str, float] = {}  # provider_name -> reset_timestamp
        self.circuit_cooldown_seconds: float = 60.0
        self._initialize_providers()

    def _initialize_providers(self):
        """
        Instantiate concrete provider drivers.
        """
        self.providers["openai"] = OpenAIProvider(api_key=settings.OPENAI_API_KEY)
        self.providers["gemini"] = GeminiProvider(api_key=settings.GEMINI_API_KEY)
        self.providers["anthropic"] = AnthropicProvider(api_key=settings.ANTHROPIC_API_KEY)
        self.providers["ollama"] = OllamaProvider(base_url=settings.OLLAMA_BASE_URL)
        self.providers["huggingface"] = HuggingFaceProvider(api_key=settings.HUGGINGFACE_API_KEY)

    def register_provider(self, name: str, provider: BaseAIProvider):
        """
        Register a custom dynamic provider.
        """
        self.providers[name] = provider
        logger.info(f"Custom AI provider '{name}' registered in ModelRouter.")

    def _is_circuit_open(self, provider_name: str) -> bool:
        """
        Check if circuit breaker is tripped for a provider.
        """
        if provider_name in self.circuit_breaker_tripped:
            reset_time = self.circuit_breaker_tripped[provider_name]
            if time.time() < reset_time:
                logger.warning(f"Circuit open for provider '{provider_name}'. Skipping.")
                return True
            else:
                del self.circuit_breaker_tripped[provider_name]  # Half-open reset
        return False

    def _trip_circuit(self, provider_name: str):
        """
        Trip circuit breaker for a provider on repeated HTTP 429/500 failures.
        """
        self.circuit_breaker_tripped[provider_name] = time.time() + self.circuit_cooldown_seconds
        logger.error(f"Circuit breaker TRIPPED for provider '{provider_name}' for {self.circuit_cooldown_seconds}s.")

    async def route_generate_text(
        self,
        prompt: str,
        preferred_provider: str = "openai",
        preferred_model: str = "gpt-4o",
        system_prompt: Optional[str] = None,
        fallback_providers: Optional[List[str]] = None,
        **kwargs
    ) -> LLMResponse:
        """
        Execute LLM generation with automatic provider fallback routing.
        """
        fallbacks = fallback_providers or ["openai", "gemini", "anthropic", "ollama", "huggingface"]
        
        # Ensure preferred provider is first in trial order
        order = [preferred_provider] + [p for p in fallbacks if p != preferred_provider]

        last_error = None

        for provider_name in order:
            if provider_name not in self.providers:
                continue
            if self._is_circuit_open(provider_name):
                continue

            provider = self.providers[provider_name]
            try:
                logger.info(f"Routing LLM request to provider '{provider_name}' (model: {preferred_model})")
                response = await provider.generate_text(
                    prompt=prompt,
                    system_prompt=system_prompt,
                    model_name=preferred_model,
                    **kwargs
                )
                return response
            except Exception as e:
                logger.error(f"Provider '{provider_name}' failed during generation: {e}")
                self._trip_circuit(provider_name)
                last_error = e

        raise AIProviderError("router", f"All AI providers failed in fallback chain. Last error: {last_error}")

    async def route_generate_embeddings(
        self,
        texts: List[str],
        preferred_provider: str = "openai",
        preferred_model: str = "text-embedding-3-small"
    ) -> EmbeddingResponse:
        """
        Route embedding generation to provider with fallback.
        """
        order = [preferred_provider, "openai", "gemini", "ollama"]
        for provider_name in order:
            if provider_name in self.providers and not self._is_circuit_open(provider_name):
                try:
                    return await self.providers[provider_name].generate_embeddings(texts, model_name=preferred_model)
                except Exception as e:
                    logger.error(f"Embedding provider '{provider_name}' failed: {e}")
                    self._trip_circuit(provider_name)

        # Fallback to OpenAI default mock/embedded float arrays
        return await self.providers["openai"].generate_embeddings(texts, model_name=preferred_model)


# Singleton Router Instance
model_router = ModelRouter()
