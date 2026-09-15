require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body parsing ───────────────────────────────────────────────────────────────
app.use(express.json());

// ── Health check (deploy-early "hello" endpoint) ───────────────────────────────
app.get("/", (_req, res) => {
  res.json({ status: "ok", service: "PathPilot API", timestamp: new Date().toISOString() });
});

// ── Detailed health check — useful for verifying frontend↔backend connection ──
app.get("/api/health", (_req, res) => {
  const { db } = require("./firebase");
  res.json({
    status: "ok",
    firebase: db ? "connected" : "NOT configured — add FIREBASE_SERVICE_ACCOUNT_JSON to .env",
    anthropic: process.env.ANTHROPIC_API_KEY ? "key present" : "NOT configured — add ANTHROPIC_API_KEY to .env",
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use("/api/path", require("./routes/path"));
app.use("/api/coach", require("./routes/coach"));

// ── 404 fallback ───────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ── Start ──────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`PathPilot API listening on port ${PORT}`);
});
