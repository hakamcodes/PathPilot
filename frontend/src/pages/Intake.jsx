import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../lib/AuthContext";
import { db } from "../firebase";
import { generatePath } from "../lib/api";
import { INTAKE_DEFAULTS, IntakeFields } from "../components/IntakeForm";

export default function Intake() {
  const { user, profile, profileReady, localPath, setLocalPath } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(INTAKE_DEFAULTS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const preset = sessionStorage.getItem("pp-goal");
    if (preset) {
      setValues((v) => ({ ...v, goal: preset }));
      sessionStorage.removeItem("pp-goal");
    }
  }, []);

  useEffect(() => {
    if (!profile) return;
    setValues((v) => ({
      ...v,
      goal: profile.goal || v.goal,
      experienceLevel: profile.experienceLevel || v.experienceLevel,
      device: profile.device || v.device,
      timePerDay: profile.timePerDay || v.timePerDay,
      internet: profile.internet || v.internet,
    }));
  }, [profile]);

  if (profileReady && (profile?.currentPath || localPath)) {
    return <Navigate to="/dashboard" replace />;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      // Best-effort: save intake fields to Firestore client-side (db may be null if Firebase isn't configured)
      if (db && user) {
        await setDoc(doc(db, "users", user.uid), values, { merge: true });
      }
      const path = await generatePath(values);
      setLocalPath(path);
      navigate("/dashboard");
    } catch (err) {
      setError(err.status === 502 ? "Couldn't build your path, try again" : "Couldn't build your path, try again");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">One page. Five answers.</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy dark:text-white">
        Start with your goal.
      </h1>
      <p className="mt-3 text-navy/50 dark:text-white/55">There’s no wrong place to begin. Pick what feels closest today.</p>

      <form onSubmit={onSubmit} className="card mt-8 p-6 dark:border-white/10 dark:bg-[#10263c] sm:p-8">
        <IntakeFields values={values} onChange={setValues} />
        {error && (
          <div className="mt-6 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
            <button type="submit" className="ml-3 font-semibold underline">
              Retry
            </button>
          </div>
        )}
        <button disabled={busy || !values.goal} className="btn-primary mt-8" type="submit">
          {busy ? "Building your path…" : "Build my learning path →"}
        </button>
      </form>
    </div>
  );
}
