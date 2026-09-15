const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verifyAuth = require("../middleware/verifyAuth");
const { callCoach } = require("../claude/coach");

// ────────────────────────────────────────────────────────────────────────────────
// POST /api/coach/ask
//
// Body: { question: string, stepId: string }
// Behavior:
//   1. Look up stepId in the caller's currentPath.steps to get skillName
//   2. Pull device / timePerDay / experienceLevel from their Firestore doc
//   3. Call Claude Haiku coach (plain text response)
//   4. Return { answer: string }
// ────────────────────────────────────────────────────────────────────────────────
router.post("/ask", verifyAuth, async (req, res) => {
  const { question, stepId } = req.body;

  if (!question || !stepId) {
    return res.status(400).json({ error: "Both 'question' and 'stepId' are required." });
  }

  try {
    // Fetch the user's profile from Firestore
    const userDoc = await db.collection("users").doc(req.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User profile not found." });
    }

    const userData = userDoc.data();
    const { device, timePerDay, experienceLevel, currentPath } = userData;

    // Find the step by stepId to get the skillName
    const steps = (currentPath && currentPath.steps) || [];
    const step = steps.find((s) => s.stepId === stepId);

    if (!step) {
      return res.status(404).json({ error: `Step '${stepId}' not found in your current path.` });
    }

    const skillName = step.skillName;

    // Call the Claude Haiku coach — returns plain text
    const answer = await callCoach(
      question,
      experienceLevel || "never_tried",
      device || "basic_laptop",
      timePerDay || "1_hour",
      skillName
    );

    return res.status(200).json({ answer });
  } catch (err) {
    console.error("POST /api/coach/ask error:", err.message);
    return res.status(500).json({ error: "Coach is unavailable right now. Please try again." });
  }
});

module.exports = router;
