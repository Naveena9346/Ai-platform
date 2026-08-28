from typing import Any, Dict, Optional


class NexusException(Exception):
    """
    Base Exception class for all NexusAI domain errors.
    """
    def __init__(
        self,
        message: str,
        code: str = "INTERNAL_SERVER_ERROR",
        status_code: int = 500,
        details: Optional[Dict[str, Any]] = None
    ):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code
        self.details = details or {}


class AuthenticationError(NexusException):
    def __init__(self, message: str = "Invalid credentials or token", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, code="UNAUTHENTICATED", status_code=401, details=details)


class PermissionDeniedError(NexusException):
    def __init__(self, message: str = "Permission denied for this operation", details: Optional[Dict[str, Any]] = None):
        super().__init__(message=message, code="PERMISSION_DENIED", status_code=403, details=details)


class ResourceNotFoundError(NexusException):
    def __init__(self, resource: str, resource_id: Any):
        message = f"{resource} with identifier '{resource_id}' was not found."
        super().__init__(message=message, code="RESOURCE_NOT_FOUND", status_code=404)


class RateLimitExceededError(NexusException):
    def __init__(self, message: str = "Rate limit exceeded. Please try again later.", retry_after_seconds: int = 60):
        super().__init__(
            message=message,
            code="RATE_LIMIT_EXCEEDED",
            status_code=429,
            details={"retry_after_seconds": retry_after_seconds}
        )


class AIProviderError(NexusException):
    def __init__(self, provider: str, message: str, raw_error: Optional[str] = None):
        super().__init__(
            message=f"AI Provider '{provider}' failed: {message}",
            code="AI_PROVIDER_ERROR",
            status_code=502,
            details={"provider": provider, "raw_error": raw_error}
        )


class WorkflowExecutionError(NexusException):
    def __init__(self, workflow_id: str, node_id: str, message: str):
        super().__init__(
            message=f"Workflow '{workflow_id}' failed at node '{node_id}': {message}",
            code="WORKFLOW_EXECUTION_ERROR",
            status_code=422,
            details={"workflow_id": workflow_id, "node_id": node_id}
        )


class GamificationError(NexusException):
    def __init__(self, message: str, code: str = "GAMIFICATION_ERROR"):
        super().__init__(message=message, code=code, status_code=400)
