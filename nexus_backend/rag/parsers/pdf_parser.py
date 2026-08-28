import io
import re
import logging
from typing import Dict, Any, List, Optional

logger = logging.getLogger("nexus.rag.parsers.pdf")


class PDFParser:
    """
    PDF Document Parsing, Page Extraction & Text Cleaning.
    """

    @classmethod
    def parse_pdf_bytes(cls, content_bytes: bytes) -> Dict[str, Any]:
        """
        Extract text, pages, and metadata from PDF bytes.
        """
        text_pages = []
        full_text = ""

        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(content_bytes))
            for idx, page in enumerate(reader.pages):
                page_text = page.extract_text() or ""
                clean_text = cls.clean_pdf_text(page_text)
                text_pages.append({"page_number": idx + 1, "text": clean_text})
                full_text += clean_text + "\n\n"
        except Exception as e:
            logger.warning(f"PyPDF extraction fallback used: {e}")
            raw_str = content_bytes.decode("utf-8", errors="ignore")
            clean_str = cls.clean_pdf_text(raw_str)
            text_pages.append({"page_number": 1, "text": clean_str})
            full_text = clean_str

        return {
            "total_pages": len(text_pages),
            "full_text": full_text.strip(),
            "pages": text_pages
        }

    @staticmethod
    def clean_pdf_text(text: str) -> str:
        """
        Clean PDF extraction artifacts (hyphenated line breaks, extra whitespace).
        """
        # Remove hyphenated line breaks e.g. "com-\nputer" -> "computer"
        text = re.sub(r"(\w+)-\n(\w+)", r"\1\2", text)
        # Normalize multiple newlines
        text = re.sub(r"\n{3,}", "\n\n", text)
        # Normalize whitespace
        text = re.sub(r"[ \t]+", " ", text)
        return text.strip()


pdf_parser = PDFParser()
