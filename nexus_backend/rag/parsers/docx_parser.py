import io
import logging
from typing import Dict, Any, List

logger = logging.getLogger("nexus.rag.parsers.docx")


class DOCXParser:
    """
    Microsoft Word (DOCX) Document Parser with Heading Hierarchy Extraction.
    """

    @classmethod
    def parse_docx_bytes(cls, content_bytes: bytes) -> Dict[str, Any]:
        paragraphs = []
        full_text = ""

        try:
            import docx
            doc = docx.Document(io.BytesIO(content_bytes))
            for p in doc.paragraphs:
                text = p.text.strip()
                if text:
                    style_name = p.style.name if p.style else "Normal"
                    paragraphs.append({"style": style_name, "text": text})
                    full_text += text + "\n"
        except Exception as e:
            logger.warning(f"DOCX extraction fallback used: {e}")
            raw_text = content_bytes.decode("utf-8", errors="ignore")
            full_text = raw_text
            paragraphs.append({"style": "Normal", "text": raw_text})

        return {
            "total_paragraphs": len(paragraphs),
            "full_text": full_text.strip(),
            "paragraphs": paragraphs
        }


docx_parser = DOCXParser()
