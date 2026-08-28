import logging
from typing import Dict, Any
from nexus_backend.orchestration.tools import BaseTool

logger = logging.getLogger("nexus.orchestration.agents.tools.bash_tool")

class BashTool(BaseTool):
    """
    Execute shell CLI commands in sandbox.
    """
    def __init__(self):
        super().__init__(name="bash_tool", description="Execute shell CLI commands in sandbox.")

    async def execute(self, **kwargs) -> Any:
        logger.info(f"Executing tool BashTool with args: {kwargs}")
        return f"[BashTool Output for {kwargs}]"
