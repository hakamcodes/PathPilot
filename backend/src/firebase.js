const admin = require("firebase-admin");

// Parse the service account from the environment variable (one-line JSON string).
// This avoids storing a key file on Render's free tier (ephemeral filesystem).
let serviceAccount;
try {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "";
  if (!raw.trim()) throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is empty");
  serviceAccount = JSON.parse(raw);
} catch (err) {
  console.error(
    "\n⚠️  FIREBASE_SERVICE_ACCOUNT_JSON is missing or not valid JSON.\n" +
    "   Go to Firebase Console → Project Settings → Service Accounts → Generate new private key,\n" +
    "   download the JSON, and paste the entire content on ONE line in backend/.env\n" +
    "   Error:", err.message, "\n"
  );
  // Export null so the server still boots; routes will return a 500 with a clear message.
  module.exports = { admin: null, db: null };
  return;
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
