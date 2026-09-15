/**
 * seed.js — Run once with: node src/data/seed.js
 *
 * Populates the Firestore `skills` and `resources` collections with the
 * Frontend/Web Development track seed data from backend-plan.md §8.
 *
 * Usage:
 *   1. Make sure your .env file has FIREBASE_SERVICE_ACCOUNT_JSON set.
 *   2. Run: node src/data/seed.js
 */

require("dotenv").config();
const { db } = require("../firebase");

// ── Skills (19 entries — Frontend/Web Development track) ─────────────────────
const skills = [
  { id: "computer_basics",   name: "Computer Basics",        level: "beginner",     prerequisites: [] },
  { id: "browser_basics",    name: "Browser Basics",         level: "beginner",     prerequisites: ["computer_basics"] },
  { id: "files_folders",     name: "Files & Folders",        level: "beginner",     prerequisites: ["computer_basics"] },
  { id: "html_basic",        name: "HTML Basics",            level: "beginner",     prerequisites: ["browser_basics"] },
  { id: "css_basic",         name: "CSS Basics",             level: "beginner",     prerequisites: ["html_basic"] },
  { id: "css_layout",        name: "CSS Layout",             level: "beginner",     prerequisites: ["css_basic"] },
  { id: "responsive_design", name: "Responsive Design",      level: "beginner",     prerequisites: ["css_layout"] },
  { id: "js_syntax",         name: "JavaScript Syntax",      level: "beginner",     prerequisites: ["html_basic"] },
  { id: "js_variables",      name: "JS Variables",           level: "beginner",     prerequisites: ["js_syntax"] },
  { id: "js_functions",      name: "JS Functions",           level: "beginner",     prerequisites: ["js_variables"] },
  { id: "js_arrays",         name: "JS Arrays",              level: "beginner",     prerequisites: ["js_functions"] },
  { id: "js_objects",        name: "JS Objects",             level: "beginner",     prerequisites: ["js_functions"] },
  { id: "dom_basics",        name: "DOM Basics",             level: "beginner",     prerequisites: ["js_arrays", "js_objects"] },
  { id: "events",            name: "DOM Events",             level: "beginner",     prerequisites: ["dom_basics"] },
  { id: "api_basics",        name: "Calling APIs",           level: "beginner",     prerequisites: ["events"] },
  { id: "git_basics",        name: "Git Basics",             level: "beginner",     prerequisites: [] },
  { id: "github_basics",     name: "GitHub Basics",          level: "beginner",     prerequisites: ["git_basics"] },
  { id: "react_basics",      name: "React Basics",           level: "intermediate", prerequisites: ["api_basics", "github_basics"] },
  { id: "frontend_project",  name: "Frontend Project",       level: "intermediate", prerequisites: ["react_basics", "responsive_design"] },
];

// ── Resources (15 entries — real, stable URLs from backend-plan.md §8) ────────
const resources = [
  {
    id: "res_html_01",
    title: "HTML Basics",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    skillIds: ["html_basic"],
    format: "article",
    level: "beginner",
    durationMinutes: 45,
    free: true,
  },
  {
    id: "res_css_01",
    title: "CSS Basics",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    skillIds: ["css_basic"],
    format: "article",
    level: "beginner",
    durationMinutes: 45,
    free: true,
  },
  {
    id: "res_css_layout_01",
    title: "CSS Layout Guide",
    url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout",
    skillIds: ["css_layout"],
    format: "article",
    level: "beginner",
    durationMinutes: 60,
    free: true,
  },
  {
    id: "res_responsive_01",
    title: "Responsive Design",
    url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
    skillIds: ["responsive_design"],
    format: "article",
    level: "beginner",
    durationMinutes: 40,
    free: true,
  },
  {
    id: "res_js_syntax_01",
    title: "JavaScript Basics",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    skillIds: ["js_syntax"],
    format: "article",
    level: "beginner",
    durationMinutes: 45,
    free: true,
  },
  {
    id: "res_js_var_01",
    title: "JS Variables",
    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables",
    skillIds: ["js_variables"],
    format: "article",
    level: "beginner",
    durationMinutes: 30,
    free: true,
  },
  {
    id: "res_js_func_01",
    title: "JS Functions",
    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions",
    skillIds: ["js_functions"],
    format: "article",
    level: "beginner",
    durationMinutes: 40,
    free: true,
  },
  {
    id: "res_js_arrays_01",
    title: "JS Arrays",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections",
    skillIds: ["js_arrays"],
    format: "article",
    level: "beginner",
    durationMinutes: 35,
    free: true,
  },
  {
    id: "res_js_objects_01",
    title: "JS Objects",
    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects",
    skillIds: ["js_objects"],
    format: "article",
    level: "beginner",
    durationMinutes: 35,
    free: true,
  },
  {
    id: "res_dom_01",
    title: "DOM Basics",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
    skillIds: ["dom_basics"],
    format: "article",
    level: "beginner",
    durationMinutes: 40,
    free: true,
  },
  {
    id: "res_events_01",
    title: "DOM Events",
    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events",
    skillIds: ["events"],
    format: "article",
    level: "beginner",
    durationMinutes: 30,
    free: true,
  },
  {
    id: "res_api_01",
    title: "Fetching Data (APIs)",
    url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Fetching_data",
    skillIds: ["api_basics"],
    format: "article",
    level: "beginner",
    durationMinutes: 45,
    free: true,
  },
  {
    id: "res_git_01",
    title: "Git Handbook",
    url: "https://git-scm.com/doc",
    skillIds: ["git_basics"],
    format: "article",
    level: "beginner",
    durationMinutes: 40,
    free: true,
  },
  {
    id: "res_github_01",
    title: "GitHub Get Started",
    url: "https://docs.github.com/en/get-started",
    skillIds: ["github_basics"],
    format: "article",
    level: "beginner",
    durationMinutes: 30,
    free: true,
  },
  {
    id: "res_react_01",
    title: "React — Learn",
    url: "https://react.dev/learn",
    skillIds: ["react_basics"],
    format: "interactive",
    level: "intermediate",
    durationMinutes: 90,
    free: true,
  },
];

// ── Seed function ─────────────────────────────────────────────────────────────
async function seed() {
  console.log("Seeding skills...");
  const skillBatch = db.batch();
  for (const skill of skills) {
    const { id, ...data } = skill;
    skillBatch.set(db.collection("skills").doc(id), data);
  }
  await skillBatch.commit();
  console.log(`✅ ${skills.length} skills written.`);

  console.log("Seeding resources...");
  const resourceBatch = db.batch();
  for (const resource of resources) {
    const { id, ...data } = resource;
    resourceBatch.set(db.collection("resources").doc(id), data);
  }
  await resourceBatch.commit();
  console.log(`✅ ${resources.length} resources written.`);

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
