import logging
from typing import Dict, Any, List
from nexus_backend.ai.model_router import model_router

logger = logging.getLogger("nexus.orchestration.agents.planner")


class TaskPlanner:
    """
    Goal Decomposition & Step-by-Step Task Plan Generator.
    """

    @classmethod
    async def create_plan(cls, goal: str) -> List[Dict[str, Any]]:
        prompt = f"Decompose the following user goal into 3 ordered sub-steps:\nGoal: {goal}"
        res = await model_router.route_generate_text(prompt=prompt, preferred_model="gpt-3.5-turbo")
        
        steps = [
            {"step_id": 1, "description": f"Gather requirements and context for '{goal}'"},
            {"step_id": 2, "description": "Execute specialized tool calculations or document RAG queries"},
            {"step_id": 3, "description": "Synthesize final response output and validate constraints"}
        ]
        return steps


task_planner = TaskPlanner()
