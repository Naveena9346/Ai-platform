import pytest
from nexus_backend.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    decode_token,
    generate_api_key,
    hash_api_key
)


def test_password_hashing_and_verification():
    """
    Test 1: Verify Argon2/Bcrypt password hashing and validation.
    """
    plain_pass = "SuperSecurePassword123!"
    hashed = hash_password(plain_pass)

    assert hashed != plain_pass
    assert verify_password(plain_pass, hashed) is True
    assert verify_password("WrongPassword!", hashed) is False


def test_jwt_access_token_generation_and_decoding():
    """
    Test 2: Verify JWT access token encoding, payload claims, and decoding.
    """
    user_id = "test-uuid-12345"
    role = "admin"

    token = create_access_token(subject=user_id, role=role)
    assert isinstance(token, str)

    payload = decode_token(token)
    assert payload["sub"] == user_id
    assert payload["role"] == role
    assert payload["type"] == "access"


def test_api_key_generation_and_hashing():
    """
    Test 3: Verify API Key generation prefix and SHA-256 hash validation.
    """
    raw_key, key_hash = generate_api_key(prefix="nx_live")
    assert raw_key.startswith("nx_live_")
    assert hash_api_key(raw_key) == key_hash
