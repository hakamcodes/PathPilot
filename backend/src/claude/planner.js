const anthropic = require("./client");

// ── System prompt (exact from backend-plan.md §6) ─────────────────────────────
const PLANNER_SYSTEM_PROMPT = `You are the planning engine for PathPilot, a learning-navigation tool for
self-directed learners. You will receive a learner's intake answers and the
full catalogue of available skills and resources. Do two things:

1. Infer which skills from the catalogue the learner most likely already
   knows, based only on their stated experience level and goal. Be
   conservative — only include a skill if there is real evidence for it.
2. Produce an ordered learning path of 5 to 8 steps toward the learner's
   goal. Respect each skill's prerequisites as given in the skill graph.
   Use ONLY resourceIds that appear in the provided resource catalogue —
   never invent a resource, title, or URL. Prefer resources whose format
   and duration fit the learner's device, time per day, and internet
   quality. For each step, write one short, beginner-friendly sentence
   explaining why that skill comes at that point in the sequence.

Respond with ONLY a single JSON object, no other text, no markdown fences,
matching exactly this shape:
{
  "pathTitle": string,
  "knownSkills": string[],
  "steps": [
    {
      "stepId": string,
      "skillId": string,
      "skillName": string,
      "whyNow": string,
      "estimatedMinutes": number,
      "resourceIds": string[]
    }
  ]
}`;

/**
 * Builds the user message for the planner prompt.
 * @param {object} intake  - { goal, experienceLevel, device, timePerDay, internet }
 * @param {Array}  skills  - array of skill docs from Firestore
 * @param {Array}  resources - array of resource docs from Firestore
 */
function buildPlannerPrompt(intake, skills, resources) {
  return (
    `Learner intake:\n${JSON.stringify(intake, null, 2)}\n\n` +
    `Available skills catalogue:\n${JSON.stringify(skills, null, 2)}\n\n` +
    `Available resources catalogue:\n${JSON.stringify(resources, null, 2)}`
  );
}

/**
 * Calls the Claude planner once. Returns parsed JSON or throws.
 */
async function callPlannerOnce(userMessage) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5",
    max_tokens: 2000,
    system: PLANNER_SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  let raw = response.content[0].text;

  // Strip markdown code fences if Claude wraps the JSON (e.g. ```json ... ```)
  raw = raw.trim();
  if (raw.startsWith("```")) {
    raw = raw.replace(/^```[a-z]*\n?/i, "").replace(/\n?```$/i, "").trim();
  }

  const parsed = JSON.parse(raw); // throws if still malformed

  if (!parsed.steps || parsed.steps.length === 0) {
    throw new Error("Claude returned a path with no steps.");
  }

  return parsed;
}

/**
 * Calls the planner with one automatic retry on parse failure, as specified
 * in backend-plan.md §6 ("retry the call once before returning a 502").
 */
async function callPlanner(intake, skills, resources) {
  const userMessage = buildPlannerPrompt(intake, skills, resources);

  try {
    return await callPlannerOnce(userMessage);
  } catch (firstErr) {
    console.warn("First planner call failed, retrying once:", firstErr.message);
    // Retry once — no additional retry logic beyond this
    return await callPlannerOnce(userMessage);
  }
}

module.exports = { callPlanner };
