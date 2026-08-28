import math
import logging
from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
from nexus_backend.ai.model_router import model_router

logger = logging.getLogger("nexus.orchestration.workflows.nodes")


class BaseNode(ABC):
    """
    Abstract Base class for all Workflow DAG execution nodes.
    """
    def __init__(self, node_id: str, node_type: str, config: Optional[Dict[str, Any]] = None):
        self.node_id = node_id
        self.node_type = node_type
        self.config = config or {}

    @abstractmethod
    async def execute(self, inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        pass


class PromptNode(BaseNode):
    def __init__(self, node_id: str, config: Optional[Dict[str, Any]] = None):
        super().__init__(node_id, "prompt", config)

    async def execute(self, inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        template = self.config.get("template", "{{ input }}")
        user_text = inputs.get("text", "")
        prompt = template.replace("{{ input }}", str(user_text))

        provider = self.config.get("provider", "openai")
        model = self.config.get("model", "gpt-4o")

        res = await model_router.route_generate_text(
            prompt=prompt,
            preferred_provider=provider,
            preferred_model=model
        )
        return {"content": res.content, "usage": res.usage.model_dump()}


class PythonCodeNode(BaseNode):
    def __init__(self, node_id: str, config: Optional[Dict[str, Any]] = None):
        super().__init__(node_id, "python_code", config)

    async def execute(self, inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        code_str = self.config.get("code", "result = input_data")
        local_scope = {"input_data": inputs, "math": math}
        try:
            exec(code_str, {"__builtins__": None}, local_scope)
            res = local_scope.get("result", inputs)
            return {"result": res, "status": "success"}
        except Exception as e:
            return {"error": str(e), "status": "error"}


class TransformNode(BaseNode):
    def __init__(self, node_id: str, config: Optional[Dict[str, Any]] = None):
        super().__init__(node_id, "transform", config)

    async def execute(self, inputs: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        operation = self.config.get("operation", "uppercase")
        text = str(inputs.get("content", inputs.get("text", "")))

        if operation == "uppercase":
            transformed = text.upper()
        elif operation == "lowercase":
            transformed = text.lower()
        elif operation == "strip":
            transformed = text.strip()
        else:
            transformed = text

        return {"transformed_text": transformed}


class NodeRegistry:
    def __init__(self):
        self.node_classes = {
            "prompt": PromptNode,
            "python_code": PythonCodeNode,
            "transform": TransformNode
        }

    def create_node(self, node_id: str, node_type: str, config: Dict[str, Any]) -> BaseNode:
        cls = self.node_classes.get(node_type, PromptNode)
        return cls(node_id, config)


node_registry = NodeRegistry()
