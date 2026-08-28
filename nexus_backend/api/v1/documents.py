from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.models.document import Document
from nexus_backend.api.schemas import RAGQuerySchema
from nexus_backend.api.deps import get_current_user
from nexus_backend.rag.service import rag_service
from nexus_backend.gamification.xp_engine import xp_engine
from nexus_backend.gamification.achievements import achievement_service

router = APIRouter(prefix="/documents", tags=["Document Analysis & RAG"])


@router.get("/")
async def list_documents(
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    List user documents uploaded for RAG indexing.
    """
    res = await db.execute(
        select(Document).where(Document.user_id == current_user.id)
    )
    docs = res.scalars().all()
    return [{
        "id": str(d.id),
        "filename": d.filename,
        "file_type": d.file_type,
        "status": d.status,
        "chunks": d.total_chunks
    } for d in docs]


@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Upload document file, chunk text, generate vector embeddings, store in pgvector, and award Gamification XP.
    """
    content = await file.read()
    file_type = file.filename.split(".")[-1].lower() if "." in file.filename else "txt"

    doc = await rag_service.ingest_document(
        db=db,
        user_id=str(current_user.id),
        filename=file.filename,
        file_content=content,
        file_type=file_type
    )

    # Gamification XP award
    await xp_engine.add_xp(db, str(current_user.id), xp_amount=150, action_name="upload_doc")
    await achievement_service.evaluate_user_achievements(db, str(current_user.id), action_name="upload_doc")

    return {
        "id": str(doc.id),
        "filename": doc.filename,
        "status": doc.status,
        "chunks_indexed": doc.total_chunks
    }


@router.post("/query")
async def query_documents(
    payload: RAGQuerySchema,
    db: AsyncSession = Depends(get_db_session),
    current_user: User = Depends(get_current_user)
):
    """
    Perform hybrid vector RAG query across document knowledge base.
    """
    results = await rag_service.hybrid_search(
        db=db,
        user_id=str(current_user.id),
        query=payload.query,
        top_k=payload.top_k
    )
    return {"query": payload.query, "matched_chunks": results}
