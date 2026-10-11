# ai-service

Small FastAPI service that talks to a local LLM through Ollama.
Express (the Node backend) is its only client. Phases 3 and 4 add RAG and the agent here.

    cd ai-service
    python -m venv .venv
    .\.venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    copy .env.example .env
    python -m pytest -q
    python -m uvicorn app.main:app --reload --port 8000

Endpoints
- GET  /health   is the service up? can it see Ollama and the model?
- POST /chat     { "message": "...", "history": [ {"role":"user","content":"..."} ] }
- GET  /docs     automatic interactive API page
