import re
import logging
from typing import Dict, Any, List

logger = logging.getLogger("nexus.rag.parsers.code")


class CodeParser:
    """
    Code AST & Function Structure Parser (Python, JS, TS, Go, Java).
    """

    @classmethod
    def parse_code_file(cls, code_str: str, language: str = "python") -> Dict[str, Any]:
        """
        Extract class and function signatures from code file.
        """
        symbols = []

        if language in ["python", "py"]:
            func_pattern = r"def\s+([a-zA-Z0-9_]+)\s*\((.*?)\):"
            class_pattern = r"class\s+([a-zA-Z0-9_]+)\s*(\(.*?\))?:"
            for match in re.finditer(func_pattern, code_str):
                symbols.append({"type": "function", "name": match.group(1), "args": match.group(2)})
            for match in re.finditer(class_pattern, code_str):
                symbols.append({"type": "class", "name": match.group(1)})
        elif language in ["typescript", "ts", "javascript", "js"]:
            func_pattern = r"function\s+([a-zA-Z0-9_]+)\s*\((.*?)\)"
            arrow_pattern = r"const\s+([a-zA-Z0-9_]+)\s*=\s*\((.*?)\)\s*=>"
            for match in re.finditer(func_pattern, code_str):
                symbols.append({"type": "function", "name": match.group(1), "args": match.group(2)})
            for match in re.finditer(arrow_pattern, code_str):
                symbols.append({"type": "arrow_function", "name": match.group(1), "args": match.group(2)})

        return {
            "language": language,
            "total_symbols": len(symbols),
            "symbols": symbols,
            "full_code": code_str
        }


code_parser = CodeParser()
