import time
import uuid
import logging
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
from nexus_backend.core.exceptions import NexusException

logger = logging.getLogger("nexus.middleware")


class AuditLoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware injecting unique Request IDs and logging request duration.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        start_time = time.time()

        logger.info(f"[{request_id}] START {request.method} {request.url.path}")

        try:
            response = await call_next(request)
            duration_ms = round((time.time() - start_time) * 1000, 2)
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Process-Time-MS"] = str(duration_ms)
            logger.info(f"[{request_id}] END {request.method} {request.url.path} - Status: {response.status_code} ({duration_ms}ms)")
            return response
        except Exception as exc:
            duration_ms = round((time.time() - start_time) * 1000, 2)
            logger.error(f"[{request_id}] UNHANDLED ERROR {request.method} {request.url.path} ({duration_ms}ms): {exc}")
            raise exc


async def nexus_exception_handler(request: Request, exc: NexusException) -> JSONResponse:
    """
    Global exception handler for NexusException hierarchy.
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                "details": exc.details,
                "request_id": getattr(request.state, "request_id", None)
            }
        }
    )
