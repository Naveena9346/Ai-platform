"""
NexusAI Database Models Package.
"""

from nexus_backend.models.user import User, UserProfile
from nexus_backend.models.ai_model import AIProvider, AIModel
from nexus_backend.models.prompt import PromptTemplate, PromptVersion
from nexus_backend.models.chat import Conversation, ChatMessage
from nexus_backend.models.document import Document, DocumentChunk
from nexus_backend.models.workflow import AIWorkflow, WorkflowExecution
from nexus_backend.models.gamification import (
    GamificationProfile,
    Achievement,
    UserAchievement,
    Mission,
    UserMission
)
from nexus_backend.models.analytics import ApiUsageLog, AuditLog, Notification

__all__ = [
    "User",
    "UserProfile",
    "AIProvider",
    "AIModel",
    "PromptTemplate",
    "PromptVersion",
    "Conversation",
    "ChatMessage",
    "Document",
    "DocumentChunk",
    "AIWorkflow",
    "WorkflowExecution",
    "GamificationProfile",
    "Achievement",
    "UserAchievement",
    "Mission",
    "UserMission",
    "ApiUsageLog",
    "AuditLog",
    "Notification"
]
