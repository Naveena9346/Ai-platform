from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.core.database import get_db_session
from nexus_backend.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token
)
from nexus_backend.models.user import User, UserProfile
from nexus_backend.models.gamification import GamificationProfile
from nexus_backend.api.schemas import (
    UserRegisterSchema,
    UserLoginSchema,
    TokenResponseSchema,
    UserResponseSchema
)
from nexus_backend.api.deps import get_current_user
from nexus_backend.core.exceptions import AuthenticationError

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponseSchema, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserRegisterSchema, db: AsyncSession = Depends(get_db_session)):
    """
    Register a new user, initialize user profile and gamification profile.
    """
    res = await db.execute(select(User).where(User.email == payload.email))
    if res.scalars().first():
        raise HTTPException(status_code=400, detail="Email is already registered.")

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        role="user"
    )
    db.add(user)
    await db.flush()

    profile = UserProfile(user_id=user.id)
    gam_profile = GamificationProfile(user_id=user.id, xp_points=100, current_level=1)
    db.add(profile)
    db.add(gam_profile)

    await db.commit()
    await db.refresh(user)
    return UserResponseSchema(
        id=str(user.id),
        email=user.email,
        full_name=user.full_name,
        role=user.role,
        is_active=user.is_active
    )


@router.post("/login", response_model=TokenResponseSchema)
async def login_user(payload: UserLoginSchema, db: AsyncSession = Depends(get_db_session)):
    """
    Authenticate user credentials and issue signed JWT access & refresh tokens.
    """
    res = await db.execute(select(User).where(User.email == payload.email))
    user = res.scalars().first()

    if not user or not verify_password(payload.password, user.hashed_password):
        raise AuthenticationError("Invalid email or password credentials.")

    access_token = create_access_token(subject=str(user.id), role=user.role)
    refresh_token = create_refresh_token(subject=str(user.id))

    return TokenResponseSchema(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=1800
    )


@router.get("/me", response_model=UserResponseSchema)
async def get_me(current_user: User = Depends(get_current_user)):
    """
    Retrieve currently authenticated user details.
    """
    return UserResponseSchema(
        id=str(current_user.id),
        email=current_user.email,
        full_name=current_user.full_name,
        role=current_user.role,
        is_active=current_user.is_active
    )
