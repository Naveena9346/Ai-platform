import os
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "DataQuest AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    # Security
    SECRET_KEY: str = "super_secret_jwt_key_for_dataquest_ai_enterprise_platform_2026"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    ALGORITHM: str = "HS256"

    # Database (Default to SQLite for standalone local run, PostgreSQL in Docker)
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./dataquest.db")


    # Cache
    REDIS_URL: str = "redis://localhost:6379/0"

    # File Storage
    STORAGE_DIR: Path = Path(os.getenv("STORAGE_DIR", Path(__file__).resolve().parent.parent.parent / "data" / "storage"))
    MAX_UPLOAD_SIZE_MB: int = 100

    # Gamification Tuning
    XP_BASE_INGESTION: int = 50
    XP_BASE_CLEANING: int = 100
    XP_BASE_EDA: int = 75
    XP_BASE_FEATURE_ENG: int = 125
    XP_BASE_ML_TRAIN: int = 150
    XP_BASE_HYPEROPT: int = 200

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )


settings = Settings()

# Ensure storage directories exist
settings.STORAGE_DIR.mkdir(parents=True, exist_ok=True)
(settings.STORAGE_DIR / "uploads").mkdir(exist_ok=True)
(settings.STORAGE_DIR / "cleaned").mkdir(exist_ok=True)
(settings.STORAGE_DIR / "models").mkdir(exist_ok=True)
