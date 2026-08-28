import logging
from typing import Optional, List, Dict, Any, Tuple
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from nexus_backend.models.user import User, UserProfile
from nexus_backend.core.security import hash_password, verify_password, create_access_token, create_refresh_token
from nexus_backend.core.exceptions import AuthenticationError, PermissionDeniedError, ResourceNotFoundError

logger = logging.getLogger("nexus.services.user")


class UserService:
    """
    Enterprise Identity, User Registration, RBAC Authorization & Account Management Service.
    """

    async def register_user(
        self,
        db: AsyncSession,
        email: str,
        password: str,
        full_name: Optional[str] = None,
        role: str = "user"
    ) -> User:
        res = await db.execute(select(User).where(User.email == email))
        if res.scalars().first():
            raise ValueError(f"User with email '{email}' already exists.")

        user = User(
            email=email,
            hashed_password=hash_password(password),
            full_name=full_name,
            role=role,
            is_active=True,
            is_verified=True
        )
        db.add(user)
        await db.flush()

        profile = UserProfile(user_id=user.id)
        db.add(profile)

        await db.commit()
        await db.refresh(user)
        logger.info(f"User '{email}' registered successfully with role '{role}'.")
        return user

    async def authenticate_user(
        self,
        db: AsyncSession,
        email: str,
        password: str
    ) -> Tuple[User, str, str]:
        res = await db.execute(select(User).where(User.email == email))
        user = res.scalars().first()

        if not user or not verify_password(password, user.hashed_password):
            raise AuthenticationError("Invalid email or password credentials.")

        if not user.is_active:
            raise AuthenticationError("User account is deactivated.")

        access_token = create_access_token(subject=str(user.id), role=user.role)
        refresh_token = create_refresh_token(subject=str(user.id))

        logger.info(f"User '{email}' authenticated successfully.")
        return user, access_token, refresh_token

    async def get_user_by_id(self, db: AsyncSession, user_id: str) -> User:
        res = await db.execute(select(User).where(User.id == user_id))
        user = res.scalars().first()
        if not user:
            raise ResourceNotFoundError("User", user_id)
        return user

    async def update_profile(
        self,
        db: AsyncSession,
        user_id: str,
        avatar_url: Optional[str] = None,
        bio: Optional[str] = None,
        theme_preference: Optional[str] = None
    ) -> UserProfile:
        res = await db.execute(select(UserProfile).where(UserProfile.user_id == user_id))
        profile = res.scalars().first()

        if not profile:
            profile = UserProfile(user_id=user_id)
            db.add(profile)

        if avatar_url is not None:
            profile.avatar_url = avatar_url
        if bio is not None:
            profile.bio = bio
        if theme_preference is not None:
            profile.theme_preference = theme_preference

        await db.commit()
        await db.refresh(profile)
        return profile


user_service = UserService()
