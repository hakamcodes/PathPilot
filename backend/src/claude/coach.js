const anthropic = require("./client");

/**
 * Builds the system prompt for the beginner coach.
 * Placeholders filled from the caller's stored Firestore data.
 * Exact from backend-plan.md §6.
 *
 * @param {string} experienceLevel
 * @param {string} device
 * @param {string} timePerDay
 * @param {string} skillName
 */
function buildCoachSystemPrompt(experienceLevel, device, timePerDay, skillName) {
  return (
    `You are a friendly, patient coach talking to a beginner learner. They ` +
    `describe their experience as "${experienceLevel}", use a "${device}", and have ` +
    `"${timePerDay}" available per day. They are currently working on the skill ` +
    `"${skillName}". Answer their question in plain, simple language, 2–4 ` +
    `sentences, no unexplained jargon. Return plain text only, no JSON, no markdown.`
  );
}

/**
 * Calls the Claude Haiku coach model and returns the plain-text answer.
 *
 * @param {string} question        - The learner's question
 * @param {string} experienceLevel
 * @param {string} device
 * @param {string} timePerDay
 * @param {string} skillName
 */
async function callCoach(question, experienceLevel, device, timePerDay, skillName) {
  const response = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: buildCoachSystemPrompt(experienceLevel, device, timePerDay, skillName),
    messages: [{ role: "user", content: question }],
  });

  // Return plain text directly — not JSON (as per plan §6)
  return response.content[0].text;
}

module.exports = { callCoach };
