from typing import List, Optional, Dict, Any
from pydantic import BaseModel, EmailStr, Field


# Auth Schemas
class UserRegisterSchema(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)
    full_name: Optional[str] = None


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class TokenResponseSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class UserResponseSchema(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    role: str
    is_active: bool


# Prompt Schemas
class PromptCreateSchema(BaseModel):
    title: str
    user_template: str
    system_message: Optional[str] = None
    description: Optional[str] = None
    category: str = "general"
    is_public: bool = False


class PromptExecuteSchema(BaseModel):
    variables: Dict[str, Any] = Field(default_factory=dict)
    provider: str = "openai"
    model: str = "gpt-4o"


# Chat Schemas
class ConversationCreateSchema(BaseModel):
    title: str = "New Conversation"
    system_prompt: Optional[str] = None
    model_id: Optional[str] = None


class ChatSendSchema(BaseModel):
    message: str
    preferred_provider: str = "openai"
    preferred_model: str = "gpt-4o"


# Document Schemas
class RAGQuerySchema(BaseModel):
    query: str
    top_k: int = 5


# Workflow Schemas
class WorkflowCreateSchema(BaseModel):
    name: str
    description: Optional[str] = None
    dag_structure: Dict[str, Any]  # nodes & edges


class WorkflowExecuteSchema(BaseModel):
    initial_input: Dict[str, Any]


# Agent Schemas
class AgentRunSchema(BaseModel):
    goal: str
    max_iterations: int = 5
    system_instruction: Optional[str] = None
    provider: str = "openai"
    model: str = "gpt-4o"
