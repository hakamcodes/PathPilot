import { Link } from "react-router-dom";

export default function StepList({ steps = [] }) {
  if (!steps.length) {
    return <p className="text-sm text-navy/50">No steps yet. Generate a path to see them here.</p>;
  }

  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={step.id || index}>
          <Link
            to={`/dashboard/step/${step.id || index}`}
            className="card flex items-center gap-4 p-4 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-[#10263c]"
          >
            <span
              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold ${
                step.completed ? "bg-emerald-100 text-emerald-700" : "bg-sky-50 text-skybtn"
              }`}
            >
              {step.completed ? "✓" : String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-navy dark:text-white">{step.skillName || step.title || `Step ${index + 1}`}</p>
              {step.whyNow && (
                <p className="truncate text-sm text-navy/45 dark:text-white/45">{step.whyNow}</p>
              )}
            </div>
            <span className="text-xs font-medium text-navy/40">{step.completed ? "Done" : "Open"} →</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
