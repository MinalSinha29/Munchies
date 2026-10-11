# Run with:  python -m pytest -q     (inside ai-service, venv active)
import pytest
from fastapi.testclient import TestClient

from app import main

client = TestClient(main.app)


def test_chat_returns_reply_from_model(monkeypatch):
    async def fake_ollama(messages):
        assert messages[0]["role"] == "system"      # system prompt is always first
        assert messages[-1] == {"role": "user", "content": "hi"}
        return "Hello! How can I help?"

    monkeypatch.setattr(main, "call_ollama", fake_ollama)
    r = client.post("/chat", json={"message": "hi"})
    assert r.status_code == 200
    body = r.json()
    assert body["reply"] == "Hello! How can I help?"
    assert body["model"] == main.OLLAMA_MODEL
    assert body["latency_ms"] >= 0


def test_chat_keeps_history_order(monkeypatch):
    seen = {}

    async def fake_ollama(messages):
        seen["roles"] = [m["role"] for m in messages]
        return "ok"

    monkeypatch.setattr(main, "call_ollama", fake_ollama)
    client.post("/chat", json={
        "message": "and veg?",
        "history": [{"role": "user", "content": "hi"}, {"role": "assistant", "content": "hello"}],
    })
    assert seen["roles"] == ["system", "user", "assistant", "user"]


@pytest.mark.parametrize("body", [
    {},                                  # missing message
    {"message": ""},                     # empty
    {"message": "x" * 501},              # too long
    {"message": "hi", "history": [{"role": "system", "content": "x"}]},  # bad role
])
def test_chat_rejects_bad_input(body):
    assert client.post("/chat", json=body).status_code == 422


def test_chat_gives_clear_error_when_ollama_is_down(monkeypatch):
    monkeypatch.setattr(main, "OLLAMA_URL", "http://127.0.0.1:1")  # nothing listens here
    r = client.post("/chat", json={"message": "hi"})
    assert r.status_code == 503
    assert "Ollama" in r.json()["detail"]


def test_health_reports_degraded_when_ollama_is_down(monkeypatch):
    monkeypatch.setattr(main, "OLLAMA_URL", "http://127.0.0.1:1")
    body = client.get("/health").json()
    assert body["status"] == "degraded"
    assert body["ollama"] is False
