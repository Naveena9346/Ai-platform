import logging
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from nexus_backend.ai.model_router import model_router
from nexus_backend.ai.guardrails import guardrail_engine
from nexus_backend.ai.token_counter import TokenCounter
from nexus_backend.analytics.service import analytics_service
from nexus_backend.core.exceptions import AIProviderError

logger = logging.getLogger("nexus.services.ai")


class AIService:
    """
    Enterprise AI Orchestration, Guardrails Filtering, Multi-Provider Model Router & Token Analytics.
    """

    async def generate_response(
        self,
        db: AsyncSession,
        user_id: Optional[str],
        prompt: str,
        system_prompt: Optional[str] = None,
        preferred_provider: str = "openai",
        preferred_model: str = "gpt-4o",
        temperature: float = 0.7,
        max_tokens: int = 2048
    ) -> Dict[str, Any]:
        # 1. Guardrail Prompt Injection Scan
        has_injection, detected = guardrail_engine.detect_prompt_injection(prompt)
        if has_injection:
            logger.warning(f"Prompt injection detected for user {user_id}: {detected}")
            raise ValueError(f"Prompt flagged by security guardrails: Injection attempt detected ({', '.join(detected)})")

        # 2. Guardrail PII Redaction
        clean_prompt, redaction_meta = guardrail_engine.redact_pii(prompt)

        # 3. Route to Model Driver
        response = await model_router.route_generate_text(
            prompt=clean_prompt,
            preferred_provider=preferred_provider,
            preferred_model=preferred_model,
            system_prompt=system_prompt,
            temperature=temperature,
            max_tokens=max_tokens
        )

        # 4. Log Financial Cost & Usage Analytics
        if db:
            await analytics_service.log_api_usage(
                db=db,
                user_id=user_id,
                endpoint="/ai/generate",
                model_name=response.model_name,
                prompt_tokens=response.usage.prompt_tokens,
                completion_tokens=response.usage.completion_tokens,
                cost_usd=response.usage.cost_usd,
                response_time_ms=180,
                status_code=200
            )

        return {
            "content": response.content,
            "provider": response.provider_name,
            "model": response.model_name,
            "usage": response.usage.model_dump(),
            "pii_redacted": redaction_meta
        }


ai_service = AIService()
