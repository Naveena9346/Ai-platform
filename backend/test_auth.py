import asyncio
from app.core.database import AsyncSessionLocal, engine, Base
from app.services.auth_service import AuthService
from app.schemas.user import UserRegister, UserLogin
from app.db.init_db import init_db

async def run_test():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async with AsyncSessionLocal() as session:
        await init_db(session)
        print("INIT DB DONE")
        
        try:
            token = await AuthService.authenticate_user(
                session, 
                UserLogin(username="naveenadudekula01", password="password123")
            )
            print("AUTHENTICATE SUCCESS TOKEN:", token)
        except Exception as e:
            print("AUTHENTICATE FAILED:", type(e), e)

if __name__ == "__main__":
    asyncio.run(run_test())
