import logging
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

# Create Async Engine for PostgreSQL
engine: AsyncEngine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DB_ECHO,
    pool_size=settings.DB_POOL_SIZE,
    max_overflow=settings.DB_MAX_OVERFLOW,
    future=True,
)

# Async Session Factory
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
    Initialize database schema tables asynchronously (useful for development/testing).
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables initialized successfully.")


async def close_db_engine():
    """
    Dispose connection pool on application shutdown.
    """
    await engine.dispose()
    logger.info("Database engine connections closed.")
