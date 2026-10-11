# ai-service/app/main.py
# Phase 2: a small FastAPI service that talks to a local LLM served by Ollama.
# Express (the Node backend) is the only client of this service.
import os
import time
from typing import List, Literal

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

load_dotenv()

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434").rstrip("/")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
REQUEST_TIMEOUT = float(os.getenv("OLLAMA_TIMEOUT_SECONDS", "180"))

# Phase 2 only: the assistant cannot see the menu yet (that is Phase 3, RAG).
SYSTEM_PROMPT = (
    "You are the M&M Munchies food-ordering assistant. "
    "Keep answers short and friendly. "
    "You cannot see the restaurant menus yet, so if someone asks about specific "
    "dishes, prices or ingredients, say you can't look that up yet."
)

app = FastAPI(title="Munchies AI Service", version="0.2.0")


# ---------- request / response shapes ----------
class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=500)
    history: List[ChatMessage] = Field(default_factory=list, max_length=10)


class ChatResponse(BaseModel):
    reply: str
    model: str
    latency_ms: int


# ---------- talking to Ollama ----------
async def call_ollama(messages: list) -> str:
    """Send the conversation to Ollama and return the reply text."""
    payload = {
        "model": OLLAMA_MODEL,
        "messages": messages,
        "stream": False,
        "keep_alive": "10m",  # keep the model in memory between questions
        "options": {"temperature": 0.2},
    }
    try:
        async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
            resp = await client.post(f"{OLLAMA_URL}/api/chat", json=payload)
            resp.raise_for_status()
            return resp.json()["message"]["content"].strip()
    except httpx.ConnectError:
        raise HTTPException(
            status_code=503,
            detail="Cannot reach Ollama. Is it running? Try: ollama list",
        )
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="The model took too long to answer. Close other apps or try a smaller model.",
        )
    except httpx.HTTPStatusError as err:
        if err.response.status_code == 404:
            raise HTTPException(
                status_code=503,
                detail=f"Model '{OLLAMA_MODEL}' is not downloaded. Run: ollama pull {OLLAMA_MODEL}",
            )
        raise HTTPException(status_code=502, detail="Ollama returned an error.")


# ---------- endpoints ----------
@app.get("/health")
async def health():
    """Is the service up, and can it see Ollama and the model?"""
    try:
        async with httpx.AsyncClient(timeout=3) as client:
            resp = await client.get(f"{OLLAMA_URL}/api/tags")
            resp.raise_for_status()
            names = [m.get("name", "") for m in resp.json().get("models", [])]
        # Ollama lists names with a tag, e.g. "llama3.2:3b"
        available = any(n == OLLAMA_MODEL or n.split(":")[0] == OLLAMA_MODEL for n in names)
        return {"status": "ok", "ollama": True, "model": OLLAMA_MODEL, "model_available": available}
    except httpx.HTTPError:
        return {"status": "degraded", "ollama": False, "model": OLLAMA_MODEL, "model_available": False}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += [m.model_dump() for m in req.history]
    messages.append({"role": "user", "content": req.message})

    start = time.perf_counter()
    reply = await call_ollama(messages)
    latency_ms = int((time.perf_counter() - start) * 1000)
    return ChatResponse(reply=reply, model=OLLAMA_MODEL, latency_ms=latency_ms)
