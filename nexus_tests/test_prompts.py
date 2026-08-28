import pytest
from nexus_backend.prompts.service import PromptService


def test_prompt_variable_extraction():
    """
    Test 7: Extract mustache/jinja variable placeholders from prompt template string.
    """
    template_str = "Write a {{ tone }} essay about {{ topic }} for {{ audience }}."
    variables = PromptService.extract_variables(template_str)

    assert set(variables) == {"tone", "topic", "audience"}


def test_prompt_rendering():
    """
    Test 8: Render variable values into prompt template string.
    """
    template_str = "Summarize {{ text }} in {{ word_count }} words."
    rendered = PromptService.render_prompt(
        template_str,
        {"text": "NexusAI Enterprise Platform Architecture", "word_count": 50}
    )

    assert "Summarize NexusAI Enterprise Platform Architecture in 50 words." in rendered
