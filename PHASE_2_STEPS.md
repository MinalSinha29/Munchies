# Phase 2: FastAPI service + Ollama (step by step)

Goal: a message goes  Express -> FastAPI -> Ollama (local LLM)  and a reply comes back.
Nothing here costs money. The assistant can NOT see the menu yet (that is Phase 3).

## Part A: Install Ollama and a small model

0. Free some memory first: close Edge, WhatsApp, Teams and extra Chrome tabs.
1. Download Ollama for Windows from https://ollama.com/download and run OllamaSetup.exe.
   It runs in the background (tray icon) and listens on http://localhost:11434
2. Open a NEW PowerShell window and check:
       ollama --version
3. Download the model (about 2 GB, needs internet once):
       ollama pull llama3.2:3b
       ollama list                 (you should see llama3.2:3b)
4. Chat with it in the terminal to see how fast your laptop is:
       ollama run llama3.2:3b
   Type "hello". The FIRST answer is slow (the model loads into memory); later ones are faster.
   Type /bye to exit.
   - If answers take more than about 30 seconds, or it says "not enough memory":
     use a smaller model:  ollama pull llama3.2:1b   (then set OLLAMA_MODEL=llama3.2:1b later)
     The 1B model is less smart and worse at tools, so use it only if the 3B does not run.
5. Check that the API works:
       Invoke-RestMethod http://localhost:11434/api/tags

## Part B: Add this zip to your project

6. Unzip Munchies_Phase2.zip somewhere (e.g. Desktop), then copy its contents into
   C:\Users\Minal Sinha\Munchies  (the folder with .git and 2d4427f in git log).
   Choose "Replace" when asked (it replaces backend\server.js and backend\.env.example).
   New: ai-service\ folder, backend\routes\assistantRoutes.js, backend\tests\assistant.test.js
   Your real backend\.env is NOT in the zip, so it is untouched.
7. Check Node is new enough (needs 18 or newer):   node --version

## Part C: Run the Python service

8. In PowerShell:
       cd "C:\Users\Minal Sinha\Munchies\ai-service"
       python -m venv .venv
       .\.venv\Scripts\Activate.ps1
   (venv = a private folder of Python packages just for this project.)
   If PowerShell says "running scripts is disabled":
       Set-ExecutionPolicy -Scope CurrentUser RemoteSigned      (answer Y)
   then run the Activate line again. The prompt should start with (.venv).
9. Install the packages and create your settings file:
       pip install -r requirements.txt
       copy .env.example .env
10. Run the tests (Ollama is not needed for these):
       python -m pytest -q
    Expected: 8 passed.
11. Start the service:
       python -m uvicorn app.main:app --reload --port 8000
12. In your browser open  http://127.0.0.1:8000/health
    Expected: {"status":"ok","ollama":true,"model":"llama3.2:3b","model_available":true}
13. Open  http://127.0.0.1:8000/docs  -> click POST /chat -> Try it out -> body:
       {"message": "Hello, who are you?"}
    -> Execute. Wait (first call is slow). You get "reply", "model", "latency_ms".
    Keep this terminal open. Open a NEW PowerShell for the next steps.

## Part D: Connect Express

14. Make sure the backend and MongoDB are running:
       cd "C:\Users\Minal Sinha\Munchies\backend"
       npm test              (expected: 11 passed)
       npm run dev
    (Optional: add this line to backend\.env:  AI_SERVICE_URL=http://127.0.0.1:8000 )
15. In another PowerShell:
       Invoke-RestMethod http://localhost:5000/api/assistant/health
       Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/assistant/chat -ContentType "application/json" -Body '{"message":"Hi, who are you?"}'
    Expected: an object with reply, model, latencyMs.
    DONE WHEN: step 15 returns a reply.

## Part E: Save your work
       cd "C:\Users\Minal Sinha\Munchies"
       git add .
       git commit -m "Phase 2: FastAPI AI service with Ollama and Express assistant route"
       git push
(.venv and .env are ignored by git, so no secrets or big folders are uploaded.)

## If something goes wrong
| What you see                                   | What it means / fix                                                        |
|------------------------------------------------|----------------------------------------------------------------------------|
| "Cannot reach Ollama" (503)                    | Ollama is not running. Open the Ollama app, run `ollama list`.             |
| "Model 'llama3.2:3b' is not downloaded"        | Run `ollama pull llama3.2:3b`.                                             |
| "The model took too long" (504)                | Close apps to free RAM, or use llama3.2:1b.                                |
| "The assistant is not available" (Express 503) | The Python service is not running on port 8000. Redo step 11.              |
| /health shows "degraded"                       | Python service is up but cannot see Ollama. Check OLLAMA_URL in .env.      |
| `python` not found in the venv                 | Activate the venv again (step 8). Prompt must start with (.venv).          |
| Port 8000 already in use                       | Close the old terminal, or use --port 8001 and set AI_SERVICE_URL.         |

## What you should be able to explain (interview)
1. Why the browser talks to Express and Express talks to Python, not the browser to Ollama
   (one public API, no model address exposed, easy to add login/limits later).
2. What Ollama is: a local server that runs open-source models on your laptop; no API key, no cost.
3. What FastAPI does here: /chat takes {message, history}, adds a system prompt, calls Ollama's /api/chat.
4. Why history is limited to 10 messages and message length is capped (memory and speed on a CPU).
5. How errors are handled: Ollama down, model missing, and timeouts each give a clear message.

## Resume status after Phase 2
True now: "FastAPI" and "local LLM (Ollama)".
NOT true yet: RAG, "grounded in menu data", the LangGraph agent. The assistant cannot see the menu
until Phase 3, so do not demo it as a menu assistant yet.
