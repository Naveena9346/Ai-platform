import os
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    """
    NexusAI System Configuration loaded from Environment Variables.
    """
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # General Project Info
    PROJECT_NAME: str = "NexusAI Enterprise Platform"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_STR: str = "/api/v1"

    # Security & JWT Tokens
    SECRET_KEY: str = "nexus_ai_super_secret_enterprise_jwt_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000"
    ]

    # Database Configuration (PostgreSQL + pgvector)
    POSTGRES_USER: str = "nexus_admin"
    POSTGRES_PASSWORD: str = "nexus_password_123"
    POSTGRES_DB: str = "nexus_ai_db"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    DATABASE_URL: str = "postgresql+asyncpg://nexus_admin:nexus_password_123@localhost:5432/nexus_ai_db"
    DB_POOL_SIZE: int = 20
    DB_MAX_OVERFLOW: int = 10
    DB_ECHO: bool = False

    # Redis Configuration
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    REDIS_URL: str = "redis://localhost:6379/0"
    REDIS_TTL_DEFAULT_SECONDS: int = 3600

    # AI Provider Credentials
    OPENAI_API_KEY: Optional[str] = Field(default=None)
    GEMINI_API_KEY: Optional[str] = Field(default=None)
    ANTHROPIC_API_KEY: Optional[str] = Field(default=None)
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    HUGGINGFACE_API_KEY: Optional[str] = Field(default=None)

    # Document & Vector RAG Settings
    STORAGE_TYPE: str = "local"
    UPLOAD_DIR: str = "./storage/uploads"
    MAX_UPLOAD_SIZE_MB: int = 50
    DEFAULT_CHUNK_SIZE: int = 1000
    DEFAULT_CHUNK_OVERLAP: int = 200
    VECTOR_EMBEDDING_DIMENSION: int = 1536

    # Gamification Settings
    DEFAULT_XP_MULTIPLIER: float = 1.0
    STREAK_BONUS_MULTIPLIER: float = 1.5
    DAILY_LOGIN_XP: int = 50
    PROMPT_CREATION_XP: int = 100
    WORKFLOW_CREATION_XP: int = 250
    AGENT_RUN_XP: int = 150
    DOC_ANALYSIS_XP: int = 120

    # Rate Limiting Controls
    RATE_LIMIT_STANDARD_REQ_PER_MIN: int = 60
    RATE_LIMIT_PRO_REQ_PER_MIN: int = 300


# Singleton settings instance
settings = Settings()
