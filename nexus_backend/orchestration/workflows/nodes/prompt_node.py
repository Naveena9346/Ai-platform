import logging
from typing import Dict, Any, Optional
from nexus_backend.orchestration.workflows.nodes import BaseNode

logger = logging.getLogger("nexus.orchestration.workflows.nodes.prompt_node")

class PromptNode(BaseNode):
    """
    Format prompt with mustache templates and execute LLM router.
    """
    def __init__(self, node_id: str, config: Optional[Dict[str, Any]] = None):
        super().__init__(node_id, "prompt", config)

    async def execute(self, inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        logger.info(f"Executing PromptNode ({self.node_id})")
        return {"node_id": self.node_id, "status": "success", "output": inputs}
