// backend/routes/assistantRoutes.js
// Phase 2: the browser talks to Express, and Express forwards to the Python AI service.
// (The browser never talks to the AI service or Ollama directly.)
import express from "express";

const router = express.Router();

const AI_SERVICE_URL = () => process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";
const AI_TIMEOUT_MS = 190_000; // a bit more than the AI service's own timeout (180s)

/**
 * POST /api/assistant/chat
 * body: { message: string, history?: [{ role: "user"|"assistant", content: string }] }
 */
router.post("/chat", async (req, res) => {
  const { message, history = [] } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ message: "Please type a message" });
  }
  if (message.length > 500) {
    return res.status(400).json({ message: "Message is too long (max 500 characters)" });
  }

  try {
    const aiResponse = await fetch(`${AI_SERVICE_URL()}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.trim(), history: Array.isArray(history) ? history.slice(-10) : [] }),
      signal: AbortSignal.timeout(AI_TIMEOUT_MS),
    });

    const data = await aiResponse.json().catch(() => ({}));

    if (!aiResponse.ok) {
      // pass the AI service's clear error message on to the browser
      return res
        .status(aiResponse.status === 422 ? 400 : 502)
        .json({ message: data.detail && typeof data.detail === "string" ? data.detail : "The assistant had a problem" });
    }

    res.json({ reply: data.reply, model: data.model, latencyMs: data.latency_ms });
  } catch (err) {
    console.error("💥 AI service error:", err.message);
    res.status(503).json({
      message: "The assistant is not available right now. Make sure the AI service and Ollama are running.",
    });
  }
});

/**
 * GET /api/assistant/health
 * Quick check that Express can reach the AI service (and that it can reach Ollama).
 */
router.get("/health", async (req, res) => {
  try {
    const r = await fetch(`${AI_SERVICE_URL()}/health`, { signal: AbortSignal.timeout(5000) });
    res.json(await r.json());
  } catch {
    res.status(503).json({ status: "down", message: "AI service is not reachable" });
  }
});

export default router;
