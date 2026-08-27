from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.user import User
from app.models.gamification import UserGamificationProfile
from app.schemas.user import UserRegister, UserLogin
from app.core.security import get_password_hash, verify_password, create_access_token
from app.core.exceptions import AuthenticationError, DataProcessingError


class AuthService:
    @staticmethod
    async def register_user(db: AsyncSession, register_data: UserRegister) -> User:
        existing = await db.execute(
            select(User).where((User.username == register_data.username) | (User.email == register_data.email))
        )
        if existing.scalar_one_or_none():
            raise DataProcessingError("Username or email already exists")

        new_user = User(
            username=register_data.username,
            email=register_data.email,
            hashed_password=get_password_hash(register_data.password)
        )
        db.add(new_user)
        await db.flush()

        # Initialize Gamification Profile
        gamification_profile = UserGamificationProfile(
            user_id=new_user.id,
            xp=0,
            level=1,
            points=0,
            current_streak=1,
            longest_streak=1,
            unlocked_titles=["Data Novice"],
            equipped_title="Data Novice"
        )
        db.add(gamification_profile)
        await db.commit()
        await db.refresh(new_user)
        return new_user

    @staticmethod
    async def authenticate_user(db: AsyncSession, login_data: UserLogin) -> str:
        result = await db.execute(
            select(User).where((User.username == login_data.username) | (User.email == login_data.username))
        )
        user = result.scalar_one_or_none()
        if not user or not verify_password(login_data.password, user.hashed_password):
            raise AuthenticationError("Invalid username or password")
        if not user.is_active:
            raise AuthenticationError("User account is inactive")

        return create_access_token(subject=str(user.id))
