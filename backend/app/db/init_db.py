from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.models.user import User
from app.models.gamification import UserGamificationProfile
from app.models.quest import Quest
from app.core.security import get_password_hash
from app.db.seed_datasets import seed_user_datasets


async def init_db(db: AsyncSession) -> None:
    # Check if default user exists
    result = await db.execute(select(User).where(User.username == "naveenadudekula01"))
    user = result.scalar_one_or_none()

    if not user:
        # Create default demo user
        user = User(
            username="naveenadudekula01",
            email="naveenadudekula01@gmail.com",
            hashed_password=get_password_hash("password123")
        )
        db.add(user)
        await db.flush()

        profile = UserGamificationProfile(
            user_id=user.id,
            xp=250,
            level=2,
            points=100,
            current_streak=3,
            longest_streak=5,
            unlocked_titles=["Data Novice", "ML Apprentice"],
            equipped_title="ML Apprentice"
        )
        db.add(profile)
        await db.commit()

    # Seed sample datasets for demo user
    await seed_user_datasets(db, user.id)

    # Check if quests exist
    quest_result = await db.execute(select(Quest))
    quests = quest_result.scalars().all()

    if not quests:
        demo_quests = [
          Quest(
            title="Classification Benchmark",
            description="Train a Random Forest or XGBoost model with Accuracy >= 0.85",
            category="Supervised Learning",
            difficulty="medium",
            xp_reward=150,
            points_reward=50,
            requirements_config={"metric": "accuracy", "threshold": 0.85}
          ),
          Quest(
            title="Regression Precision Quest",
            description="Achieve R2 Score >= 0.80 on house pricing dataset",
            category="Regression",
            difficulty="hard",
            xp_reward=300,
            points_reward=100,
            requirements_config={"metric": "r2", "threshold": 0.80}
          ),
          Quest(
            title="Data Cleaning Master",
            description="Execute data cleaning pipeline with missing value imputation",
            category="Data Engineering",
            difficulty="easy",
            xp_reward=100,
            points_reward=30,
            requirements_config={"metric": "completeness", "threshold": 0.95}
          )
        ]
        for q in demo_quests:
            db.add(q)

    await db.commit()
