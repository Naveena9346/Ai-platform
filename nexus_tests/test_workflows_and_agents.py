import pytest
from nexus_backend.orchestration.workflows import WorkflowEngine
from nexus_backend.orchestration.agents import AgentEngine
from nexus_backend.orchestration.tools import tool_registry


@pytest.mark.asyncio
async def test_workflow_dag_execution():
    """
    Test 12: Verify multi-node AI Workflow DAG topological graph execution.
    """
    engine = WorkflowEngine()
    dag_structure = {
        "nodes": [
            {"id": "node_1", "type": "input"},
            {"id": "node_2", "type": "prompt", "config": {"template": "Summarize {{ input }}", "provider": "openai", "model": "gpt-4o"}}
        ],
        "edges": [{"from": "node_1", "to": "node_2"}]
    }

    result = await engine.execute_dag(
        workflow_id="test_wf_1",
        dag_structure=dag_structure,
        initial_input={"text": "NexusAI Enterprise Platform"},
        user_id="user_123"
    )

    assert result["status"] == "completed"
    assert "node_outputs" in result
    assert "node_2" in result["node_outputs"]


@pytest.mark.asyncio
async def test_autonomous_agent_tool_execution():
    """
    Test 13: Verify ReAct Agent loop and calculator tool execution.
    """
    tool = tool_registry.get_tool("calculator")
    assert tool is not None

    res = await tool.run(expression="10 + 25 * 2")
    assert res == "60"

    engine = AgentEngine()
    agent_res = await engine.run_agent(goal="Calculate 5 + 5", max_iterations=2)
    assert agent_res["status"] in ["completed", "max_iterations_reached"]
