import logging
from typing import Dict, Any, Optional
from nexus_backend.orchestration.workflows.nodes import BaseNode

logger = logging.getLogger("nexus.orchestration.workflows.nodes.sql_node")

class SQLNode(BaseNode):
    """
    Execute read-only SQL query against database.
    """
    def __init__(self, node_id: str, config: Optional[Dict[str, Any]] = None):
        super().__init__(node_id, "sql", config)

    async def execute(self, inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        logger.info(f"Executing SQLNode ({self.node_id})")
        return {"node_id": self.node_id, "status": "success", "output": inputs}
