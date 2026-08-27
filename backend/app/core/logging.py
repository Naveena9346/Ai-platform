import sys
from loguru import logger
from app.core.config import settings


def setup_logging() -> None:
    logger.remove()
    log_format = (
        "<green>{time:YYYY-MM-DD HH:mm:ss}</green> | "
        "<level>{level: <8}</level> | "
        "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - "
        "<level>{message}</level>"
    )

    logger.add(
        sys.stdout,
        format=log_format,
        level="DEBUG" if settings.DEBUG else "INFO",
        colorize=True
    )

    logger.add(
        settings.STORAGE_DIR / "app.log",
        rotation="10 MB",
        retention="10 days",
        format=log_format,
        level="INFO"
    )


setup_logging()
