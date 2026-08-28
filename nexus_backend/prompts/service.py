import re
import logging
from typing import Dict, List, Any, Optional
from jinja2 import Template
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from nexus_backend.models.prompt import PromptTemplate, PromptVersion
from nexus_backend.core.exceptions import ResourceNotFoundError

logger = logging.getLogger("nexus.prompts.service")


class PromptService:
    """
    Prompt Template Parser, Versioning Manager, and Variable Rendering Engine.
    """

    @staticmethod
    def extract_variables(template_str: str) -> List[str]:
        """
        Extract Mustache/Jinja variable placeholders e.g. {{ variable_name }}.
        """
        pattern = r"\{\{\s*([a-zA-Z0-9_]+)\s*\}\}"
        matches = re.findall(pattern, template_str)
        return list(set(matches))

    @staticmethod
    def render_prompt(template_str: str, variables: Dict[str, Any]) -> str:
        """
        Render variable interpolation into template string using Jinja2.
        """
        try:
            jinja_template = Template(template_str)
            return jinja_template.render(**variables)
        except Exception as e:
            logger.error(f"Failed to render prompt template: {e}")
            # Fallback simple string format
            result = template_str
            for key, val in variables.items():
                result = result.replace(f"{{{{{key}}}}}", str(val))
                result = result.replace(f"{{{{ {key} }}}}", str(val))
            return result

    async def create_prompt_template(
        self,
        db: AsyncSession,
        user_id: str,
        title: str,
        user_template: str,
        system_message: Optional[str] = None,
        description: Optional[str] = None,
        category: str = "general",
        is_public: bool = False
    ) -> PromptTemplate:
        """
        Create a new Prompt Template and version 1 record.
        """
        template = PromptTemplate(
            user_id=user_id,
            title=title,
            description=description,
            category=category,
            is_public=is_public
        )
        db.add(template)
        await db.flush()

        variables = self.extract_variables(user_template)
        version = PromptVersion(
            template_id=template.id,
            version_number=1,
            system_message=system_message,
            user_template=user_template,
            input_variables=variables
        )
        db.add(version)
        await db.commit()
        await db.refresh(template)
        return template

    async def get_latest_version(
        self,
        db: AsyncSession,
        template_id: str
    ) -> PromptVersion:
        """
        Get latest active version for a given template ID.
        """
        result = await db.execute(
            select(PromptVersion)
            .where(PromptVersion.template_id == template_id)
            .order_by(PromptVersion.version_number.desc())
        )
        version = result.scalars().first()
        if not version:
            raise ResourceNotFoundError("PromptVersion for template", template_id)
        return version


prompt_service = PromptService()
