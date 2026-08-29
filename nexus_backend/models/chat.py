from sqlalchemy import Column, String, Text, Numeric, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from nexus_backend.core.base import BaseModel, GUID


class Conversation(BaseModel):
    """
    Chat Conversation session container.
    """
    __tablename__ = "conversations"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    model_id = Column(GUID(), ForeignKey("ai_models.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(200), default="New Conversation", nullable=False)
    system_prompt = Column(Text, nullable=True)
    summary = Column(Text, nullable=True)

    # Relationships
    user = relationship("User", back_populates="conversations")
    ai_model = relationship("AIModel", back_populates="conversations")
    messages = relationship("ChatMessage", back_populates="conversation", cascade="all, delete-orphan", order_by="ChatMessage.created_at")


class ChatMessage(BaseModel):
    """
    Individual Chat Message thread message entity.
    """
    __tablename__ = "chat_messages"

    conversation_id = Column(GUID(), ForeignKey("conversations.id", ondelete="CASCADE"), nullable=False)
    sender = Column(String(20), nullable=False)  # user, assistant, system, tool
    content = Column(Text, nullable=False)
    tokens_used = Column(Integer, default=0, nullable=False)
    cost = Column(Numeric(10, 6), default=0.000000, nullable=False)
    meta = Column(JSON, default={}, nullable=False)

    # Relationships
    conversation = relationship("Conversation", back_populates="messages")
