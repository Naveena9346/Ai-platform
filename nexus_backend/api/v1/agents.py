from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.api.schemas import AgentRunSchema
from nexus_backend.api.deps import get_current_user
from nexus_backend.orchestration.agents import agent_engine
from nexus_backend.orchestration.tools import tool_registry
from nexus_backend.gamification.xp_engine import xp_engine

router = APIRouter(prefix="/agents", tags=["Autonomous Agents"])


@router.get("/tools")
async def list_agent_tools():
    """
    List available tools bound to autonomous agents.
    """
    return {"tools": tool_registry.list_tools()}


@router.post("/run")
async def run_agent_task(
    payload: AgentRunSchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Run autonomous ReAct Agent to solve goal prompt.
    """
    result = await agent_engine.run_agent(
        goal=payload.goal,
        max_iterations=payload.max_iterations,
        system_instruction=payload.system_instruction,
        provider=payload.provider,
        model=payload.model
    )

    # Award Gamification XP
    await xp_engine.add_xp(db, str(current_user.id), xp_amount=150, action_name="run_agent")

    return result
