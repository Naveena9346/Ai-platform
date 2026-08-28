import pytest
from nexus_backend.rag.service import RAGService


def test_recursive_character_chunker():
    """
    Test 9: Verify recursive text chunking and overlap boundaries.
    """
    long_text = "Paragraph 1 text content. " * 50
    chunks = RAGService.recursive_character_chunker(long_text, chunk_size=200, chunk_overlap=50)

    assert len(chunks) > 1
    assert all(len(c) <= 250 for c in chunks)
