import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../lib/AuthContext";
import { db } from "../firebase";
import { regeneratePath } from "../lib/api";
import { INTAKE_DEFAULTS, IntakeFields } from "../components/IntakeForm";

export default function Profile() {
  const { user, profile, setLocalPath } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(INTAKE_DEFAULTS);
  const [busy, setBusy] = useState(false);
  const [regenBusy, setRegenBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!profile) return;
    setValues({
      goal: profile.goal || "",
      experienceLevel: profile.experienceLevel || INTAKE_DEFAULTS.experienceLevel,
      device: profile.device || INTAKE_DEFAULTS.device,
      timePerDay: profile.timePerDay || INTAKE_DEFAULTS.timePerDay,
      internet: profile.internet || INTAKE_DEFAULTS.internet,
    });
  }, [profile]);

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      await setDoc(doc(db, "users", user.uid), values, { merge: true });
      setMessage("Saved.");
    } finally {
      setBusy(false);
    }
  }

  async function regenerate() {
    setError("");
    setRegenBusy(true);
    try {
      const path = await regeneratePath();
      setLocalPath(path);
      navigate("/dashboard");
    } catch {
      setError("Couldn't build your path, try again");
    } finally {
      setRegenBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">Your profile</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Edit what we know about you.</h1>
      <form onSubmit={save} className="card mt-8 p-6 dark:border-white/10 dark:bg-[#10263c] sm:p-8">
        <IntakeFields values={values} onChange={setValues} />
        {message && <p className="mt-4 text-sm text-emerald-600">{message}</p>}
        <button className="btn-primary mt-8" disabled={busy} type="submit">
          {busy ? "Saving…" : "Save profile"}
        </button>
      </form>

      <div className="card mt-6 p-6 dark:border-white/10 dark:bg-[#10263c]">
        <h2 className="text-lg font-bold">Regenerate my path</h2>
        <p className="mt-1 text-sm text-navy/50 dark:text-white/50">
          Uses your latest answers. The previous path is replaced.
        </p>
        {error && (
          <p className="mt-3 text-sm text-rose-600">
            {error}{" "}
            <button type="button" className="font-semibold underline" onClick={regenerate}>
              Retry
            </button>
          </p>
        )}
        <button type="button" onClick={regenerate} disabled={regenBusy} className="btn-primary mt-5 bg-navy">
          {regenBusy ? "Rebuilding…" : "Regenerate my path"}
        </button>
      </div>
    </div>
  );
}
