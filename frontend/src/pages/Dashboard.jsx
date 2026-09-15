import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import StepList from "../components/StepList";

export default function Dashboard() {
  const { profile, profileReady, localPath } = useAuth();

  if (!profileReady) {
    return <p className="px-5 py-16 text-center text-sm text-navy/50">Loading your path…</p>;
  }

  const path = profile?.currentPath || localPath;

  if (!path) {
    return <Navigate to="/intake" replace />;
  }
  const steps = path.steps || [];
  const done = steps.filter((s) => s.completed).length;
  const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[1fr_320px]">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">Your learning path</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-navy dark:text-white">
          {path.pathTitle || "A little progress, every week."}
        </h1>
        <p className="mt-3 text-navy/50 dark:text-white/55">Tick a step when you’re done. Open any step for resources and the coach.</p>
        <div className="mt-8">
          <StepList steps={steps} />
        </div>
      </div>
      <aside className="space-y-4">
        <div className="card p-6 dark:border-white/10 dark:bg-[#10263c]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/40">Progress</p>
          <p className="mt-3 text-3xl font-extrabold">{pct}%</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-mist dark:bg-white/10">
            <div className="h-full rounded-full bg-lagoon" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 text-sm text-navy/45">
            {done} of {steps.length} steps complete
          </p>
        </div>
        {!!path.knownSkills?.length && (
          <div className="card p-6 dark:border-white/10 dark:bg-[#10263c]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/40">Already in your kit</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {path.knownSkills.map((skill) => (
                <span key={skill} className="rounded-full bg-mist px-3 py-1 text-xs font-medium dark:bg-white/10">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        <Link to="/profile" className="btn-ghost w-full justify-center">
          Edit profile / regenerate
        </Link>
      </aside>
    </div>
  );
}
