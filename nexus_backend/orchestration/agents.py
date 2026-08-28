import json
import logging
from typing import AsyncGenerator, Dict, Any, List, Optional
from nexus_backend.ai.model_router import model_router
from nexus_backend.orchestration.tools import tool_registry

logger = logging.getLogger("nexus.orchestration.agents")


class AgentEngine:
    """
    Autonomous ReAct (Reasoning + Acting) Agent Engine.
    Executes loop: Thought -> Action -> Observation -> Final Answer.
    """

    async def run_agent(
        self,
        goal: str,
        max_iterations: int = 5,
        system_instruction: Optional[str] = None,
        provider: str = "openai",
        model: str = "gpt-4o"
    ) -> Dict[str, Any]:
        """
        Execute ReAct loop to solve goal autonomously using registered tools.
        """
        tools_list = tool_registry.list_tools()
        tools_desc = "\n".join([f"- {t['name']}: {t['description']}" for t in tools_list])

        system_prompt = system_instruction or f"""
You are an autonomous AI Agent solving complex user goals.
You have access to the following tools:
{tools_desc}

Use the ReAct format:
Thought: <reason about current step>
Action: <tool_name>
Action Input: <json object or string input>

When you reach the final answer:
Final Answer: <your final answer text>
"""

        conversation_history = f"Goal: {goal}\n"
        steps_log: List[Dict[str, Any]] = []

        for i in range(max_iterations):
            logger.info(f"Agent iteration {i+1}/{max_iterations} for goal: {goal}")
            
            prompt = f"{conversation_history}\nThought:"
            response = await model_router.route_generate_text(
                prompt=prompt,
                system_prompt=system_prompt,
                preferred_provider=provider,
                preferred_model=model
            )
            llm_text = response.content

            if "Final Answer:" in llm_text:
                final_answer = llm_text.split("Final Answer:")[1].strip()
                steps_log.append({"iteration": i+1, "thought": llm_text, "action": "Final Answer"})
                return {
                    "goal": goal,
                    "status": "completed",
                    "iterations": i+1,
                    "final_answer": final_answer,
                    "steps": steps_log
                }

            # Parse action and execute tool
            action_tool = "calculator"
            action_input = "2 + 2"
            if "Action:" in llm_text:
                lines = llm_text.split("\n")
                for line in lines:
                    if line.startswith("Action:"):
                        action_tool = line.replace("Action:", "").strip()
                    if line.startswith("Action Input:"):
                        action_input = line.replace("Action Input:", "").strip()

            tool = tool_registry.get_tool(action_tool)
            if tool:
                observation = await tool.run(expression=action_input, query=action_input, code=action_input, url=action_input)
            else:
                observation = f"Tool '{action_tool}' not found."

            steps_log.append({
                "iteration": i+1,
                "thought": llm_text,
                "action": action_tool,
                "action_input": action_input,
                "observation": observation
            })

            conversation_history += f"\nThought: {llm_text}\nObservation: {observation}"

        return {
            "goal": goal,
            "status": "max_iterations_reached",
            "iterations": max_iterations,
            "final_answer": f"Agent reached max iterations ({max_iterations}). Partial progress logged.",
            "steps": steps_log
        }


agent_engine = AgentEngine()
