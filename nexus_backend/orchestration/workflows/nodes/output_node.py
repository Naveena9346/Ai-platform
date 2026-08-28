import logging
from typing import Dict, Any, Optional
from nexus_backend.orchestration.workflows.nodes import BaseNode

logger = logging.getLogger("nexus.orchestration.workflows.nodes.output_node")

class OutputNode(BaseNode):
    """
    Synthesize final workflow response payload.
    """
    def __init__(self, node_id: str, config: Optional[Dict[str, Any]] = None):
        super().__init__(node_id, "output", config)

    async def execute(self, inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        logger.info(f"Executing OutputNode ({self.node_id})")
        return {"node_id": self.node_id, "status": "success", "output": inputs}
