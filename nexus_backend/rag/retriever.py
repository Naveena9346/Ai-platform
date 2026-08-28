import logging
from typing import Dict, Any, List, Optional
from nexus_backend.ai.model_router import model_router

logger = logging.getLogger("nexus.rag.retriever")


class HybridRAGRetriever:
    """
    Advanced RAG Retriever with HyDE Query Expansion, Reciprocal Rank Fusion (RRF), and Context Compression.
    """

    @classmethod
    async def generate_hypothetical_document(cls, query: str) -> str:
        """
        Generate Hypothetical Document Embeddings (HyDE) to improve vector retrieval.
        """
        prompt = f"Write a brief hypothetical passage answering the query: '{query}'"
        res = await model_router.route_generate_text(prompt=prompt, preferred_model="gpt-3.5-turbo")
        return res.content

    @classmethod
    def reciprocal_rank_fusion(
        cls,
        dense_results: List[Dict[str, Any]],
        keyword_results: List[Dict[str, Any]],
        k: int = 60
    ) -> List[Dict[str, Any]]:
        """
        RRF algorithm combining dense vector search and BM25 sparse keyword search ranks.
        """
        rrf_scores: Dict[str, float] = {}
        doc_map: Dict[str, Dict[str, Any]] = {}

        for rank, item in enumerate(dense_results):
            doc_id = item["chunk_id"]
            doc_map[doc_id] = item
            rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))

        for rank, item in enumerate(keyword_results):
            doc_id = item["chunk_id"]
            if doc_id not in doc_map:
                doc_map[doc_id] = item
            rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + (1.0 / (k + rank + 1))

        sorted_docs = sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)
        final_results = []

        for doc_id, score in sorted_docs:
            entry = doc_map[doc_id]
            entry["rrf_score"] = round(score, 4)
            final_results.append(entry)

        return final_results


hybrid_retriever = HybridRAGRetriever()
