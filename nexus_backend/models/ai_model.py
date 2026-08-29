from sqlalchemy import Column, String, Boolean, Text, Numeric, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from nexus_backend.core.base import BaseModel, GUID


class AIProvider(BaseModel):
    """
    AI Provider Driver registration entity (OpenAI, Gemini, Anthropic, Ollama, HuggingFace).
    """
    __tablename__ = "ai_providers"

    name = Column(String(100), unique=True, nullable=False)
    provider_type = Column(String(50), nullable=False)  # openai, gemini, anthropic, ollama, huggingface
    base_url = Column(Text, nullable=True)
    is_enabled = Column(Boolean, default=True, nullable=False)
    config = Column(JSON, default={}, nullable=False)

    # Relationships
    models = relationship("AIModel", back_populates="provider", cascade="all, delete-orphan")


class AIModel(BaseModel):
    """
    AI Model Metadata, context window sizes, cost estimation rates, and capabilities.
    """
    __tablename__ = "ai_models"

    provider_id = Column(GUID(), ForeignKey("ai_providers.id", ondelete="CASCADE"), nullable=False)
    model_name = Column(String(100), nullable=False, index=True)  # gpt-4o, gemini-1.5-flash, claude-3-5-sonnet
    display_name = Column(String(100), nullable=False)
    context_window = Column(Integer, default=8192, nullable=False)
    input_cost_per_1k_tokens = Column(Numeric(10, 6), default=0.001500, nullable=False)
    output_cost_per_1k_tokens = Column(Numeric(10, 6), default=0.002000, nullable=False)
    supports_vision = Column(Boolean, default=False, nullable=False)
    supports_streaming = Column(Boolean, default=True, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    # Relationships
    provider = relationship("AIProvider", back_populates="models")
    conversations = relationship("Conversation", back_populates="ai_model")
