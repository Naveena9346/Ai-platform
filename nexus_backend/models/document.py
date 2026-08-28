from sqlalchemy import Column, String, Text, BigInteger, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from pgvector.sqlalchemy import Vector
from nexus_backend.core.base import BaseModel


class Document(BaseModel):
    """
    Uploaded Document entity for RAG processing & indexing.
    """
    __tablename__ = "documents"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)  # pdf, docx, csv, txt, md
    file_size_bytes = Column(BigInteger, nullable=False)
    storage_path = Column(Text, nullable=False)
    status = Column(String(30), default="processing", nullable=False)  # processing, completed, failed
    total_chunks = Column(Integer, default=0, nullable=False)

    # Relationships
    user = relationship("User", back_populates="documents")
    chunks = relationship("DocumentChunk", back_populates="document", cascade="all, delete-orphan")


class DocumentChunk(BaseModel):
    """
    Parsed text chunk with pgvector embedding storage.
    """
    __tablename__ = "document_chunks"

    document_id = Column(UUID(as_uuid=True), ForeignKey("documents.id", ondelete="CASCADE"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(Text, nullable=False)
    embedding = Column(Vector(1536), nullable=True)  # 1536-dimensional vector for OpenAI / standard RAG
    meta = Column(JSON, default={}, nullable=False)

    # Relationships
    document = relationship("Document", back_populates="chunks")
