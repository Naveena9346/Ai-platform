import secrets
import hashlib
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional, Union
from jose import JWTError, jwt
from passlib.context import CryptContext
from nexus_backend.core.config import settings

# Password Hashing Context using bcrypt & argon2
pwd_context = CryptContext(schemes=["bcrypt", "argon2"], deprecated="auto")


def hash_password(password: str) -> str:
    """
    Hash plain text password using passlib context.
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify plain text password against stored hash.
    """
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(
    subject: Union[str, Any],
    role: str = "user",
    expires_delta: Optional[timedelta] = None
) -> str:
    """
    Generate signed JWT Access Token.
    """
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "role": role,
        "type": "access"
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def create_refresh_token(
    subject: Union[str, Any],
    expires_delta: Optional[timedelta] = None
) -> str:
    """
    Generate signed JWT Refresh Token.
    """
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "type": "refresh"
    }
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def decode_token(token: str) -> Dict[str, Any]:
    """
    Decode and validate JWT token signature and expiration.
    """
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError as e:
        raise ValueError(f"Invalid token signature or expired token: {str(e)}")


def generate_api_key(prefix: str = "nx") -> tuple[str, str]:
    """
    Generate a secure random API key and its SHA-256 hash.
    Returns (raw_key, hashed_key).
    """
    random_bytes = secrets.token_hex(24)
    raw_key = f"{prefix}_{random_bytes}"
    hashed_key = hashlib.sha256(raw_key.encode("utf-8")).hexdigest()
    return raw_key, hashed_key


def hash_api_key(raw_key: str) -> str:
    """
    Hash an API key string using SHA-256.
    """
    return hashlib.sha256(raw_key.encode("utf-8")).hexdigest()
