from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.models.workflow import AIWorkflow, WorkflowExecution
from nexus_backend.api.schemas import WorkflowCreateSchema, WorkflowExecuteSchema
from nexus_backend.api.deps import get_current_user
from nexus_backend.orchestration.workflows import workflow_engine
from nexus_backend.gamification.xp_engine import xp_engine
from nexus_backend.gamification.missions import mission_service
from nexus_backend.gamification.achievements import achievement_service

router = APIRouter(prefix="/workflows", tags=["AI Workflows (DAG Engine)"])


@router.get("/")
async def list_workflows(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    List user AI DAG Workflows.
    """
    res = await db.execute(
        select(AIWorkflow).where(AIWorkflow.user_id == current_user.id)
    )
    workflows = res.scalars().all()
    return [{"id": str(w.id), "name": w.name, "description": w.description} for w in workflows]


@router.post("/")
async def create_workflow(
    payload: WorkflowCreateSchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new AI Workflow DAG definition.
    """
    workflow = AIWorkflow(
        user_id=current_user.id,
        name=payload.name,
        description=payload.description,
        dag_structure=payload.dag_structure
    )
    db.add(workflow)
    await db.commit()
    await db.refresh(workflow)
    return {"id": str(workflow.id), "name": workflow.name, "status": "created"}


@router.post("/{workflow_id}/execute")
async def execute_workflow(
    workflow_id: str,
    payload: WorkflowExecuteSchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Execute AI DAG Workflow graph runner (awards Gamification XP & Quest progress).
    """
    res = await db.execute(select(AIWorkflow).where(AIWorkflow.id == workflow_id))
    workflow = res.scalars().first()
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")

    result = await workflow_engine.execute_dag(
        workflow_id=workflow_id,
        dag_structure=workflow.dag_structure,
        initial_input=payload.initial_input,
        user_id=str(current_user.id)
    )

    execution = WorkflowExecution(
        workflow_id=workflow.id,
        user_id=current_user.id,
        status="completed",
        execution_time_ms=result["execution_time_ms"],
        input_data=payload.initial_input,
        output_data=result["final_output"]
    )
    db.add(execution)
    await db.commit()

    # Award Gamification XP
    await xp_engine.add_xp(db, str(current_user.id), xp_amount=250, action_name="run_workflow")
    await mission_service.update_mission_progress(db, str(current_user.id), action_type="WORKFLOW_RUN")
    await achievement_service.evaluate_user_achievements(db, str(current_user.id), action_name="run_workflow")

    return result
