import logging
from typing import Dict, Any
from nexus_backend.orchestration.tools import BaseTool

logger = logging.getLogger("nexus.orchestration.agents.tools.calculator")

class CalculatorTool(BaseTool):
    """
    Evaluate mathematical expressions safely.
    """
    def __init__(self):
        super().__init__(name="calculator", description="Evaluate mathematical expressions safely.")

    async def execute(self, **kwargs) -> Any:
        logger.info(f"Executing tool CalculatorTool with args: {kwargs}")
        return f"[CalculatorTool Output for {kwargs}]"
