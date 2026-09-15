import { Link, Navigate, useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../lib/AuthContext";
import { db } from "../firebase";
import CoachBox from "../components/CoachBox";

export default function StepDetail() {
  const { stepId } = useParams();
  const { user, profile, profileReady, localPath } = useAuth();

  if (!profileReady) return <p className="px-5 py-16 text-center text-sm text-navy/50">Loading step…</p>;
  const currentPath = profile?.currentPath || localPath;
  if (!currentPath) return <Navigate to="/intake" replace />;

  const steps = currentPath.steps || [];
  const index = steps.findIndex((s, i) => String(s.id ?? i) === String(stepId));
  const step = index >= 0 ? steps[index] : null;

  if (!step) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <p>That step isn’t on your path.</p>
        <Link to="/dashboard" className="btn-ghost mt-4">
          Back to path
        </Link>
      </div>
    );
  }

  async function toggleComplete() {
    const nextSteps = steps.map((s, i) =>
      i === index ? { ...s, completed: !s.completed } : s
    );
    await setDoc(
      doc(db, "users", user.uid),
      { currentPath: { ...currentPath, steps: nextSteps } },
      { merge: true }
    );
  }

  const resources = step.resources || (step.resourceUrl ? [{ title: step.resourceTitle || "Open resource", url: step.resourceUrl }] : []);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <Link to="/dashboard" className="text-sm font-medium text-navy/45 hover:text-navy dark:text-white/45">
        ← Back to path
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">Step {index + 1}</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">{step.skillName || step.title}</h1>
        </div>
        <button
          type="button"
          onClick={toggleComplete}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            step.completed ? "bg-emerald-100 text-emerald-700" : "bg-white text-navy shadow-sm ring-1 ring-navy/10"
          }`}
        >
          {step.completed ? "Completed" : "Mark complete"}
        </button>
      </div>

      {step.whyNow && (
        <section className="card mt-8 p-6 dark:border-white/10 dark:bg-[#10263c]">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-navy/40">Why now</h2>
          <p className="mt-3 leading-relaxed text-navy/70 dark:text-white/70">{step.whyNow}</p>
        </section>
      )}

      <section className="card mt-4 p-6 dark:border-white/10 dark:bg-[#10263c]">
        <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-navy/40">Resources</h2>
        {resources.length ? (
          <ul className="mt-3 space-y-2">
            {resources.map((res) => (
              <li key={res.url || res.title}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-skybtn hover:underline"
                >
                  {res.title || res.url} ↗
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-navy/45">No resource linked for this step yet.</p>
        )}
      </section>

      <CoachBox stepId={step.id ?? stepId} />
    </div>
  );
}
