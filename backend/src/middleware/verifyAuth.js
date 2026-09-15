const { admin } = require("../firebase");

/**
 * verifyAuth middleware
 *
 * Reads the `Authorization: Bearer <token>` header, verifies the Firebase ID
 * token, and attaches `req.uid` for downstream route handlers.
 * Rejects with 401 on any failure.
 */
async function verifyAuth(req, res, next) {
  if (!admin) {
    return res.status(503).json({
      error: "Firebase is not configured. Add FIREBASE_SERVICE_ACCOUNT_JSON to backend/.env",
    });
  }

  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or malformed Authorization header." });
  }

  const token = authHeader.slice(7); // strip "Bearer "
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;
    next();
  } catch (err) {
    console.error("verifyIdToken failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired auth token." });
  }
}

module.exports = verifyAuth;
