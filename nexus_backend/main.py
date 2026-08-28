import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from nexus_backend.core.config import settings
from nexus_backend.core.database import init_db_schema, close_db_engine
from nexus_backend.core.redis import redis_manager
from nexus_backend.core.exceptions import NexusException
from nexus_backend.core.middleware import AuditLoggingMiddleware, nexus_exception_handler
from nexus_backend.api.v1 import api_v1_router

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nexus.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifecycle Context Manager handling startup DB initialization & Redis pool.
    """
    logger.info("Initializing NexusAI Platform services...")
    try:
        await init_db_schema()
    except Exception as e:
        logger.warning(f"Database schema init skipped/deferred: {e}")
    await redis_manager.connect()
    yield
    logger.info("Shutting down NexusAI Platform services...")
    await redis_manager.disconnect()
    await close_db_engine()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request ID & Audit Logging Middleware
app.add_middleware(AuditLoggingMiddleware)

# Custom Exception Handler
app.add_exception_handler(NexusException, nexus_exception_handler)

# Include API Routers
app.include_router(api_v1_router, prefix=settings.API_V1_STR)


@app.get("/health", tags=["Health Check"])
async def health_check():
    """
    Service Liveness Probe.
    """
    return {
        "status": "online",
        "platform": settings.PROJECT_NAME,
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("nexus_backend.main:app", host="0.0.0.0", port=8000, reload=True)
