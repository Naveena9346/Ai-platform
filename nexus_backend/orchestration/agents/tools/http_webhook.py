import logging
from typing import Dict, Any
from nexus_backend.orchestration.tools import BaseTool

logger = logging.getLogger("nexus.orchestration.agents.tools.http_webhook")

class HTTPWebhookTool(BaseTool):
    """
    Make HTTP GET/POST requests to REST APIs.
    """
    def __init__(self):
        super().__init__(name="http_webhook", description="Make HTTP GET/POST requests to REST APIs.")

    async def execute(self, **kwargs) -> Any:
        logger.info(f"Executing tool HTTPWebhookTool with args: {kwargs}")
        return f"[HTTPWebhookTool Output for {kwargs}]"
