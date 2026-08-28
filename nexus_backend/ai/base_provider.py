from abc import ABC, abstractmethod
from typing import AsyncGenerator, Dict, List, Optional, Any, Union
from pydantic import BaseModel, Field


class TokenUsage(BaseModel):
    """
    Standardized Token Usage per request.
    """
    prompt_tokens: int = 0
    completion_tokens: int = 0
    total_tokens: int = 0
    cost_usd: float = 0.0


class LLMResponse(BaseModel):
    """
    Standardized Unified LLM Text Generation Response.
    """
    content: str
    model_name: str
    provider_name: str
    usage: TokenUsage
    finish_reason: str = "stop"
    raw_response: Optional[Dict[str, Any]] = None


class LLMStreamChunk(BaseModel):
    """
    Standardized Chunk for Server-Sent Events (SSE) Streaming.
    """
    content_delta: str
    model_name: str
    provider_name: str
    is_final: bool = False
    usage: Optional[TokenUsage] = None


class EmbeddingResponse(BaseModel):
    """
    Standardized Vector Embeddings Response.
    """
    embeddings: List[List[float]]
    model_name: str
    provider_name: str
    usage: TokenUsage


class BaseAIProvider(ABC):
    """
    Abstract Base Adapter defining strict contracts for all AI/ML model providers.
    """

    def __init__(self, provider_name: str, api_key: Optional[str] = None, base_url: Optional[str] = None):
        self.provider_name = provider_name
        self.api_key = api_key
        self.base_url = base_url

    @abstractmethod
    async def generate_text(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "default",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> LLMResponse:
        """
        Generate synchronous or async complete text response.
        """
        pass

    @abstractmethod
    async def generate_stream(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        model_name: str = "default",
        temperature: float = 0.7,
        max_tokens: int = 2048,
        **kwargs
    ) -> AsyncGenerator[LLMStreamChunk, None]:
        """
        Stream partial text response tokens as AsyncGenerator.
        """
        pass

    @abstractmethod
    async def generate_embeddings(
        self,
        texts: List[str],
        model_name: str = "text-embedding-3-small"
    ) -> EmbeddingResponse:
        """
        Generate vector embedding float arrays for list of text chunks.
        """
        pass

    @abstractmethod
    async def is_healthy(self) -> bool:
        """
        Check connectivity and active health status of provider endpoint.
        """
        pass
