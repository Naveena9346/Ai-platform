import logging
import sys
from app.core.config import settings

try:
    from loguru import logger
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
except ImportError:
    def setup_logging() -> None:
        logging.basicConfig(
            level=logging.DEBUG if settings.DEBUG else logging.INFO,
            format="%(asctime)s | %(levelname)-8s | %(name)s:%(funcName)s:%(lineno)d - %(message)s"
        )



setup_logging()
