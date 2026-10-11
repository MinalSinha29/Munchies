// Run with: npm test   (inside the backend folder)
import test from "node:test";
import assert from "node:assert/strict";
import express from "express";
import assistantRoutes from "../routes/assistantRoutes.js";

// A tiny Express app that uses only the assistant routes
const app = express();
app.use(express.json());
app.use("/api/assistant", assistantRoutes);

let server, base;
test.before(async () => {
  await new Promise((resolve) => { server = app.listen(0, resolve); });
  base = `http://127.0.0.1:${server.address().port}/api/assistant`;
});
test.after(() => server.close());

const post = (path, body) =>
  fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });

// Replace fetch only for calls to the fake AI service
function mockAiService(handler) {
  const realFetch = globalThis.fetch;
  globalThis.fetch = (url, opts) =>
    String(url).startsWith("http://127.0.0.1:8000") ? handler(url, opts) : realFetch(url, opts);
  return () => { globalThis.fetch = realFetch; };
}

test("rejects an empty or too long message", async () => {
  assert.equal((await post("/chat", {})).status, 400);
  assert.equal((await post("/chat", { message: "   " })).status, 400);
  assert.equal((await post("/chat", { message: "x".repeat(501) })).status, 400);
});

test("forwards the message to the AI service and returns the reply", async () => {
  let sent;
  const restore = mockAiService(async (url, opts) => {
    sent = { url, body: JSON.parse(opts.body) };
    return new Response(JSON.stringify({ reply: "Hello!", model: "llama3.2:3b", latency_ms: 1234 }), { status: 200 });
  });
  try {
    const res = await post("/chat", { message: "  hi  " });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { reply: "Hello!", model: "llama3.2:3b", latencyMs: 1234 });
    assert.equal(sent.url, "http://127.0.0.1:8000/chat");
    assert.equal(sent.body.message, "hi"); // trimmed
  } finally { restore(); }
});

test("only the last 10 history messages are forwarded", async () => {
  let sent;
  const restore = mockAiService(async (url, opts) => {
    sent = JSON.parse(opts.body);
    return new Response(JSON.stringify({ reply: "ok", model: "m", latency_ms: 1 }), { status: 200 });
  });
  try {
    const history = Array.from({ length: 15 }, (_, i) => ({ role: "user", content: `m${i}` }));
    await post("/chat", { message: "hi", history });
    assert.equal(sent.history.length, 10);
    assert.equal(sent.history[0].content, "m5");
  } finally { restore(); }
});

test("passes on the AI service's error message", async () => {
  const restore = mockAiService(async () =>
    new Response(JSON.stringify({ detail: "Cannot reach Ollama. Is it running? Try: ollama list" }), { status: 503 }));
  try {
    const res = await post("/chat", { message: "hi" });
    assert.equal(res.status, 502);
    assert.match((await res.json()).message, /Ollama/);
  } finally { restore(); }
});

test("returns 503 with a friendly message when the AI service is down", async () => {
  const restore = mockAiService(async () => { throw new Error("ECONNREFUSED"); });
  try {
    const res = await post("/chat", { message: "hi" });
    assert.equal(res.status, 503);
    assert.match((await res.json()).message, /not available/);
  } finally { restore(); }
});
