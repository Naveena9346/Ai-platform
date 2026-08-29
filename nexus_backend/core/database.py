import logging
import os
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine
)
from sqlalchemy.orm import DeclarativeBase
from nexus_backend.core.config import settings

logger = logging.getLogger("nexus.database")

# Default to SQLite local DB if PostgreSQL is not locally listening
SQLITE_URL = "sqlite+aiosqlite:///./nexus_local.db"

# Create Engine
engine: AsyncEngine = create_async_engine(
    SQLITE_URL if "sqlite" in settings.DATABASE_URL.lower() else settings.DATABASE_URL,
    echo=False,
    future=True,
)

async_session_factory = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)


class Base(DeclarativeBase):
    """
    SQLAlchemy Base Class for all declarative ORM models.
    """
    pass


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """
    FastAPI Dependency yielding async database session within transaction boundary.
    """
    global async_session_factory
    async with async_session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception as e:
            await session.rollback()
            logger.error(f"Database session error, rolling back transaction: {e}")
            raise e
        finally:
            await session.close()


async def init_db_schema():
    """
    Initialize database schema tables asynchronously with SQLite fallback if PostgreSQL is unavailable.
    """
    global engine, async_session_factory
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("Database tables initialized successfully.")
    except Exception as e:
        logger.warning(f"Primary database connection unavailable ({e}). Re-initializing SQLite local database...")
        engine = create_async_engine(SQLITE_URL, echo=False, future=True)
        async_session_factory = async_sessionmaker(
            bind=engine,
            class_=AsyncSession,
            expire_on_commit=False,
            autoflush=False,
            autocommit=False,
        )
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        logger.info("SQLite local database initialized successfully.")


async def close_db_engine():
    """
    Dispose connection pool on application shutdown.
    """
    await engine.dispose()
    logger.info("Database engine connections closed.")
