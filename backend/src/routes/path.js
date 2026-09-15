const express = require("express");
const router = express.Router();
const { db } = require("../firebase");
const verifyAuth = require("../middleware/verifyAuth");
const { callPlanner } = require("../claude/planner");
const admin = require("firebase-admin");

// ── Helper: fetch all skills and resources from Firestore ─────────────────────
async function fetchCatalogue() {
  const [skillsSnap, resourcesSnap] = await Promise.all([
    db.collection("skills").get(),
    db.collection("resources").get(),
  ]);

  const skills = skillsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const resources = resourcesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { skills, resources };
}

// ── Helper: add completed:false to every step after parsing ───────────────────
function addCompletedFlag(steps) {
  return steps.map((step) => ({ ...step, completed: false }));
}

// ────────────────────────────────────────────────────────────────────────────────
// POST /api/path/generate
//
// Called once, right after the learner submits the intake form.
// Body: { goal, experienceLevel, device, timePerDay, internet }
// Behavior:
//   1. Fetch all skills + resources docs
//   2. Call Claude planner (with one retry on failure — handled in planner.js)
//   3. Write learnerState + currentPath to users/{uid}
//   4. Return the generated path object
// ────────────────────────────────────────────────────────────────────────────────
router.post("/generate", verifyAuth, async (req, res) => {
  const { goal, experienceLevel, device, timePerDay, internet } = req.body;

  if (!goal || !experienceLevel || !device || !timePerDay || !internet) {
    return res.status(400).json({ error: "All five intake fields are required." });
  }

  try {
    const { skills, resources } = await fetchCatalogue();

    const intake = { goal, experienceLevel, device, timePerDay, internet };
    const plannerResult = await callPlanner(intake, skills, resources);

    // Add completed: false to every step (not relying on the model to do this)
    const steps = addCompletedFlag(plannerResult.steps);

    const learnerState = { knownSkills: plannerResult.knownSkills || [] };
    const currentPath = { pathTitle: plannerResult.pathTitle, steps };

    // Write to Firestore — merge so we don't overwrite other user fields
    await db
      .collection("users")
      .doc(req.uid)
      .set(
        {
          learnerState,
          currentPath,
          goal,
          experienceLevel,
          device,
          timePerDay,
          internet,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    return res.status(200).json({
      pathTitle: currentPath.pathTitle,
      knownSkills: learnerState.knownSkills,
      steps,
    });
  } catch (err) {
    console.error("POST /api/path/generate error:", err.message);
    console.error("Full error:", err.stack || err);
    return res.status(502).json({ error: "Could not generate a path, please try again.", detail: err.message });
  }
});

// ────────────────────────────────────────────────────────────────────────────────
// POST /api/path/regenerate
//
// No request body.
// Reads the caller's current intake data from their Firestore doc, calls Claude
// again, overwrites currentPath. Same response shape as /generate.
// ────────────────────────────────────────────────────────────────────────────────
router.post("/regenerate", verifyAuth, async (req, res) => {
  try {
    // Read the user's current profile from Firestore
    const userDoc = await db.collection("users").doc(req.uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User profile not found. Please complete intake first." });
    }

    const userData = userDoc.data();
    const { goal, experienceLevel, device, timePerDay, internet } = userData;

    if (!goal || !experienceLevel || !device || !timePerDay || !internet) {
      return res
        .status(400)
        .json({ error: "Incomplete profile — please complete the intake form first." });
    }

    const { skills, resources } = await fetchCatalogue();

    const intake = { goal, experienceLevel, device, timePerDay, internet };
    const plannerResult = await callPlanner(intake, skills, resources);

    const steps = addCompletedFlag(plannerResult.steps);

    const learnerState = { knownSkills: plannerResult.knownSkills || [] };
    const currentPath = { pathTitle: plannerResult.pathTitle, steps };

    // Overwrite currentPath in Firestore
    await db
      .collection("users")
      .doc(req.uid)
      .set(
        {
          learnerState,
          currentPath,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

    return res.status(200).json({
      pathTitle: currentPath.pathTitle,
      knownSkills: learnerState.knownSkills,
      steps,
    });
  } catch (err) {
    console.error("POST /api/path/regenerate error:", err.message);
    return res.status(502).json({ error: "Could not generate a path, please try again." });
  }
});

module.exports = router;
