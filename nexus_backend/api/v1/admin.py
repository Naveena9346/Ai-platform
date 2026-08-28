from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.core.database import get_db_session
from nexus_backend.models.user import User
from nexus_backend.api.deps import get_current_admin

router = APIRouter(prefix="/admin", tags=["Admin Portal & Platform Governance"])


@router.get("/users")
async def list_all_users(
    db: AsyncSession = Depends(get_db_session),
    admin: User = Depends(get_current_admin)
):
    """
    Admin user listing.
    """
    res = await db.execute(select(User))
    users = res.scalars().all()
    return [{"id": str(u.id), "email": u.email, "role": u.role, "is_active": u.is_active} for u in users]
