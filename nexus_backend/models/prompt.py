from sqlalchemy import Column, String, Boolean, Text, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from nexus_backend.core.base import BaseModel, GUID


class PromptTemplate(BaseModel):
    """
    Prompt Template metadata entity.
    """
    __tablename__ = "prompt_templates"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(50), default="general", nullable=False)  # coding, writing, analysis, agent
    is_public = Column(Boolean, default=False, nullable=False)

    # Relationships
    user = relationship("User", back_populates="prompt_templates")
    versions = relationship("PromptVersion", back_populates="template", cascade="all, delete-orphan")


class PromptVersion(BaseModel):
    """
    Prompt Template Versioning entity storing system & user prompt templates.
    """
    __tablename__ = "prompt_versions"

    template_id = Column(GUID(), ForeignKey("prompt_templates.id", ondelete="CASCADE"), nullable=False)
    version_number = Column(Integer, nullable=False)
    system_message = Column(Text, nullable=True)
    user_template = Column(Text, nullable=False)
    input_variables = Column(JSON, default=[], nullable=False)  # list of variable names e.g. ["topic", "tone"]

    # Relationships
    template = relationship("PromptTemplate", back_populates="versions")
