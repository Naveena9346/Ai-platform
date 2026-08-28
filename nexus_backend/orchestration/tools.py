import math
import logging
from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
import httpx

logger = logging.getLogger("nexus.orchestration.tools")


class BaseTool(ABC):
    """
    Abstract Base class for all Autonomous Agent tools.
    """
    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    @abstractmethod
    async def run(self, **kwargs) -> Any:
        pass


class WebSearchTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="web_search",
            description="Search the web for up-to-date real-time news, facts, and documentation."
        )

    async def run(self, query: str, **kwargs) -> str:
        logger.info(f"WebSearchTool executing query: {query}")
        return f"SearchResults for '{query}': [1] NexusAI is an enterprise platform. [2] Next.js 14 & FastAPI deliver ultra-fast AI performance."


class PythonREPLTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="python_repl",
            description="Execute safe Python code for data analysis, math computations, and algorithm execution."
        )

    async def run(self, code: str, **kwargs) -> str:
        logger.info(f"PythonREPLTool executing code block...")
        try:
            # Safe sandboxed scope
            local_scope = {"math": math}
            exec(code, {"__builtins__": None}, local_scope)
            result = local_scope.get("result", "Code executed successfully without explicit 'result' variable.")
            return str(result)
        except Exception as e:
            return f"Python Execution Error: {str(e)}"


class CalculatorTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="calculator",
            description="Perform exact mathematical and statistical calculations."
        )

    async def run(self, expression: str, **kwargs) -> str:
        try:
            safe_dict = {"abs": abs, "round": round, "min": min, "max": max, "pow": pow, "math": math}
            res = eval(expression, {"__builtins__": None}, safe_dict)
            return str(res)
        except Exception as e:
            return f"Calculator error: {str(e)}"


class DocumentSearchTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="document_search",
            description="Perform semantic vector RAG search across uploaded user documents."
        )

    async def run(self, query: str, **kwargs) -> str:
        return f"Retrieved Document Context for '{query}': Chunk 1 - Enterprise security protocols state encrypted JWTs with Argon2 password hashing."


class HTTPWebhookTool(BaseTool):
    def __init__(self):
        super().__init__(
            name="http_webhook",
            description="Trigger external HTTP REST webhooks and APIs."
        )

    async def run(self, url: str, method: str = "GET", payload: Optional[Dict[str, Any]] = None, **kwargs) -> str:
        try:
            async with httpx.AsyncClient() as client:
                res = await client.request(method=method, url=url, json=payload, timeout=5.0)
                return f"HTTP {res.status_code}: {res.text[:200]}"
        except Exception as e:
            return f"Webhook failed: {str(e)}"


class ToolRegistry:
    """
    Extensible Tool Registry for ReAct Agent orchestration.
    """
    def __init__(self):
        self.tools: Dict[str, BaseTool] = {}
        self._register_default_tools()

    def _register_default_tools(self):
        self.register(WebSearchTool())
        self.register(PythonREPLTool())
        self.register(CalculatorTool())
        self.register(DocumentSearchTool())
        self.register(HTTPWebhookTool())

    def register(self, tool: BaseTool):
        self.tools[tool.name] = tool
        logger.info(f"Tool '{tool.name}' registered successfully.")

    def get_tool(self, name: str) -> Optional[BaseTool]:
        return self.tools.get(name)

    def list_tools(self) -> List[Dict[str, str]]:
        return [{"name": t.name, "description": t.description} for t in self.tools.values()]


tool_registry = ToolRegistry()
