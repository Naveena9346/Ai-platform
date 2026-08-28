import logging
from typing import List, Dict, Any

logger = logging.getLogger("nexus.rag.chunkers.sentence_chunker")

class SentenceChunker:
    """
    Split text into natural sentence groups.
    """
    @classmethod
    def chunk_text(cls, text: str, chunk_size: int = 512, chunk_overlap: int = 64) -> List[Dict[str, Any]]:
        words = text.split(" ")
        chunks = []
        for i in range(0, len(words), chunk_size - chunk_overlap):
            chunk_str = " ".join(words[i:i + chunk_size])
            if chunk_str:
                chunks.append({"chunk_index": len(chunks), "text": chunk_str, "token_count": len(chunk_str.split())})
        return chunks

sentence_chunker = SentenceChunker()
