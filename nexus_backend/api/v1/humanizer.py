from typing import List, Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field

from nexus_backend.ai.humanizer import text_humanizer, HumanizationResult
from nexus_backend.gamification.xp_engine import xp_engine
from nexus_backend.api.deps import get_current_user

humanizer_router = APIRouter(prefix="/humanizer", tags=["AI Text Humanizer"])


class HumanizeRequest(BaseModel):
    text: str = Field(..., description="The AI-generated text to humanize", min_length=1)
    mode: str = Field(default="anti_ai_bypass", description="Profile mode: anti_ai_bypass, standard, academic, casual, creative")
    readability: str = Field(default="balanced", description="Target readability style: balanced, elementary, professional")
    bypass_ai_detectors: bool = Field(default=True, description="Enforce low AI detection probability threshold")


@humanizer_router.post("/process", response_model=HumanizationResult)
async def process_humanize_text(
    payload: HumanizeRequest,
    user=Depends(get_current_user)
):
    """
    Process AI text transformation into natural, humanized output bypassing AI detection algorithms.
    """
    try:
        result = text_humanizer.humanize(
            text=payload.text,
            mode=payload.mode,
            readability=payload.readability,
            bypass_ai_detectors=payload.bypass_ai_detectors
        )

        # Award Gamification XP if user is authenticated
        if user and hasattr(user, "id"):
            try:
                await xp_engine.award_xp(
                    user_id=str(user.id),
                    amount=result.xp_gained,
                    reason=f"Humanized text ({len(payload.text.split())} words) via {payload.mode} mode"
                )
            except Exception:
                pass

        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Humanization service failure: {str(e)}")


@humanizer_router.get("/modes")
async def get_humanization_modes():
    """
    Retrieve list of available humanization modes and capabilities.
    """
    return {
        "modes": [
            {
                "id": "anti_ai_bypass",
                "name": "Anti-AI Detector Bypass",
                "badge": "Recommended",
                "description": "Optimized to bypass Turnitin, GPTZero, CopyLeaks, and ZeroGPT by boosting burstiness and stripping robotic syntax signatures."
            },
            {
                "id": "standard",
                "name": "Standard Natural",
                "badge": "Balanced",
                "description": "Natural everyday phrasing with smooth transitions and polished grammar."
            },
            {
                "id": "academic",
                "name": "Academic & Scholarly",
                "badge": "Formal",
                "description": "Formal academic vocabulary, scholarly sentence construction, and high perplexity index."
            },
            {
                "id": "casual",
                "name": "Casual & Conversational",
                "badge": "Relatable",
                "description": "Relaxed, direct tone with friendly vocabulary suitable for blogs, emails, and social media."
            },
            {
                "id": "creative",
                "name": "Creative & Expressive",
                "badge": "Artistic",
                "description": "Expressive metaphors, vivid imagery, and dynamic sentence rhythm."
            }
        ]
    }
