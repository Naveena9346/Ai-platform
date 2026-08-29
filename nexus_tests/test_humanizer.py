import pytest
from fastapi.testclient import TestClient
from nexus_backend.main import app
from nexus_backend.ai.humanizer import text_humanizer

client = TestClient(app)


def test_text_humanizer_engine():
    sample_text = (
        "Furthermore, it is worth noting that artificial intelligence plays a pivotal role "
        "in navigating the complexities of modern software development. Consequently, delving into "
        "its tapestry of features is a testament to technological progress."
    )

    # Test estimate_ai_detection_score
    orig_score = text_humanizer.estimate_ai_detection_score(sample_text)
    assert orig_score > 50.0  # Robotic text should have high AI detection likelihood

    # Test humanization anti_ai_bypass
    res = text_humanizer.humanize(sample_text, mode="anti_ai_bypass")
    assert res.humanized_ai_score < 15.0
    assert res.words_changed > 0
    assert "Furthermore" not in res.humanized_text
    assert "pivotal role" not in res.humanized_text
    assert "delving into" not in res.humanized_text
    assert res.xp_gained >= 100


def test_humanizer_api_modes():
    response = client.get("/api/v1/humanizer/modes")
    assert response.status_code == 200
    data = response.json()
    assert "modes" in data
    assert len(data["modes"]) >= 5
    mode_ids = [m["id"] for m in data["modes"]]
    assert "anti_ai_bypass" in mode_ids
    assert "academic" in mode_ids
    assert "casual" in mode_ids


def test_humanizer_api_process():
    payload = {
        "text": "Furthermore, utilizing this tool plays a key role in seamlessly achieving results.",
        "mode": "anti_ai_bypass",
        "readability": "balanced",
        "bypass_ai_detectors": True
    }
    response = client.post("/api/v1/humanizer/process", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["mode"] == "anti_ai_bypass"
    assert data["humanized_ai_score"] < 15.0
    assert len(data["humanized_text"]) > 0
    assert len(data["improvements"]) > 0
