import { Link, useNavigate } from "react-router-dom";
import { DarkToggle, Logo } from "../components/AppShell";

function Glyph({ name, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {name === "palette" && (
        <>
          <path d="M12 3a9 9 0 1 0 .5 18H16a2.5 2.5 0 0 0 0-5h.5A9 9 0 0 0 12 3Z" />
          <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="10" cy="8" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="8" r="0.8" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "chart" && <path d="M4 19h16M7 16v-4M12 16V8M17 16v-7" />}
      {name === "code" && <path d="M8 8 4 12l4 4M16 8l4 4-4 4" />}
      {name === "megaphone" && <path d="M4 10v4h3l5 3V7L7 10H4ZM17 9a3 3 0 0 1 0 6" />}
      {name === "bolt" && <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />}
      {name === "briefcase" && <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 7h16v12H4Z" />}
      {name === "trend" && <path d="M4 16l6-6 4 4 6-7" />}
      {name === "idea" && <path d="M9 18h6M10 21h4M12 3a5 5 0 0 1 3 9c-.7.5-1 1.2-1 2H10c0-.8-.3-1.5-1-2A5 5 0 0 1 12 3Z" />}
    </svg>
  );
}

const PATHWAYS = [
  {
    tag: "Creative thinking",
    title: "UI/UX Design",
    blurb: "Turn everyday problems into simple, beautiful experiences.",
    weeks: "8 weeks",
    level: "Beginner",
    hours: "4 hrs/week",
    resources: 18,
    icon: "palette",
    goal: "Design",
  },
  {
    tag: "Make sense of data",
    title: "Data Analytics",
    blurb: "Ask better questions and find answers hiding in numbers.",
    weeks: "10 weeks",
    level: "Beginner",
    hours: "5 hrs/week",
    resources: 22,
    icon: "chart",
    goal: "Python/data",
  },
  {
    tag: "Build for the web",
    title: "Frontend Development",
    blurb: "Create responsive websites people love to use.",
    weeks: "12 weeks",
    level: "Beginner",
    hours: "6 hrs/week",
    resources: 26,
    icon: "code",
    goal: "Frontend developer",
  },
  {
    tag: "Grow ideas",
    title: "Digital Marketing",
    blurb: "Help meaningful brands find the right people online.",
    weeks: "6 weeks",
    level: "Beginner",
    hours: "3 hrs/week",
    resources: 16,
    icon: "megaphone",
    goal: "Not sure yet",
  },
  {
    tag: "Work smarter",
    title: "AI Tools",
    blurb: "Use practical AI tools to save time and think bigger.",
    weeks: "4 weeks",
    level: "All levels",
    hours: "2 hrs/week",
    resources: 14,
    icon: "bolt",
    goal: "AI/ML",
  },
];

const GOALS = [
  { id: "job", title: "Get a job", blurb: "Build skills recruiters notice", icon: "briefcase" },
  { id: "switch", title: "Switch careers", blurb: "Make a confident fresh start", icon: "trend" },
  { id: "freelance", title: "Freelance", blurb: "Turn skills into income", icon: "bolt" },
  { id: "project", title: "Build a project", blurb: "Bring your idea to life", icon: "idea" },
];

export default function Home() {
  const navigate = useNavigate();

  function start(goal) {
    if (goal) sessionStorage.setItem("pp-goal", goal);
    navigate("/intake");
  }

  return (
    <div className="min-h-screen bg-mist text-navy dark:bg-[#071422] dark:text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-navy/60 dark:text-white/70 md:flex">
          <a href="#pathways" className="hover:text-navy dark:hover:text-white">
            Explore pathways
          </a>
          <a href="#how" className="hover:text-navy dark:hover:text-white">
            How it works
          </a>
          <a href="#stories" className="hover:text-navy dark:hover:text-white">
            Learner stories
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden text-xs text-navy/40 dark:text-white/40 sm:block">Free to start →</span>
          <DarkToggle />
        </div>
      </header>

      <section className="relative mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-10 px-5 pb-16 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-4">
        <div>
          <p className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">
            <span className="h-1.5 w-1.5 rounded-full bg-lagoon" />
            Your next chapter starts here
          </p>
          <h1 className="max-w-xl text-[52px] font-extrabold leading-[1.05] tracking-tight text-navy dark:text-white sm:text-[64px]">
            Your next skill
            <br />
            should open a <span className="text-lagoon">real</span>
            <br />
            door.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-navy/55 dark:text-white/60">
            Tell us where you are today. We’ll build a practical path toward where you want to go.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button type="button" onClick={() => start()} className="btn-primary">
              Build my learning path
              <span aria-hidden>→</span>
            </button>
            <a href="#how" className="inline-flex items-center gap-2 text-sm font-medium text-navy/55 dark:text-white/60">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-navy/10 bg-white text-skybtn dark:border-white/10 dark:bg-white/5">
                ▶
              </span>
              See how it works
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-md">
          <div className="absolute inset-8 rounded-full bg-[#d9ecf7] dark:bg-lagoon/10" />
          <div className="absolute inset-16 rounded-full bg-[#cfe6f4] dark:bg-lagoon/20" />
          <article className="absolute left-8 top-16 w-[260px] rounded-3xl bg-white p-6 shadow-float dark:bg-[#10263c]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/40 dark:text-white/40">
              Your learning path
            </p>
            <h3 className="mt-3 text-2xl font-bold leading-tight">
              A little progress,
              <br />
              every week.
            </h3>
            <div className="mt-8 flex items-center justify-between text-xs text-navy/45 dark:text-white/45">
              <span>Week 03 of 08</span>
              <span>38%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-mist dark:bg-white/10">
              <div className="h-full w-[38%] rounded-full bg-lagoon" />
            </div>
          </article>
          <div className="absolute right-2 top-10 rounded-2xl bg-white px-3 py-2 text-xs shadow-card dark:bg-[#10263c]">
            <p className="flex items-center gap-2 font-semibold">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">
                ✓
              </span>
              Goal unlocked
            </p>
            <p className="pl-7 text-navy/45 dark:text-white/45">First portfolio piece</p>
          </div>
          <div className="absolute bottom-16 left-2 rounded-2xl bg-white px-3 py-2 text-xs shadow-card dark:bg-[#10263c]">
            <p className="flex items-center gap-2 font-medium">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-sky-50 text-skybtn">📄</span>
              18 resources
            </p>
            <p className="pl-8 text-navy/40 dark:text-white/40">picked for you</p>
          </div>
        </div>
      </section>

      <section id="pathways" className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight">Choose a direction.</h2>
          <button type="button" onClick={() => start()} className="hidden items-center gap-2 text-sm font-semibold text-navy/70 md:inline-flex">
            Find my path <span>→</span>
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => start(item.goal)}
              className="card group p-5 text-left transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-[#10263c]"
            >
              <div className="mb-5 flex items-start justify-between">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-lagoon">
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-sky-50 text-skybtn dark:bg-white/10">
                    <Glyph name={item.icon} />
                  </span>
                  {item.tag}
                </span>
                <span className="text-xs text-navy/40 group-hover:text-skybtn">View resources ↗</span>
              </div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy/50 dark:text-white/55">{item.blurb}</p>
              <p className="mt-5 flex flex-wrap gap-3 text-xs text-navy/45 dark:text-white/45">
                <span>◷ {item.weeks}</span>
                <span>◉ {item.level}</span>
                <span>▭ {item.hours}</span>
              </p>
              <p className="mt-4 flex items-center justify-between text-xs font-medium text-lagoon">
                <span>● {item.resources} curated resources</span>
                <span>→</span>
              </p>
            </button>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="text-4xl font-extrabold tracking-tight">Start with your goal.</h2>
          <p className="max-w-xs text-right text-sm text-navy/45 dark:text-white/45">
            There’s no wrong place to begin.
            <br />
            Pick what feels closest today.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GOALS.map((goal, i) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => start(goal.title)}
              className={`relative rounded-2xl border bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5 dark:bg-[#10263c] ${
                i === 0 ? "border-skybtn" : "border-transparent dark:border-white/10"
              }`}
            >
              {i === 0 && (
                <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-xs text-emerald-600">
                  ✓
                </span>
              )}
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-skybtn dark:bg-white/10">
                <Glyph name={goal.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-bold">{goal.title}</h3>
              <p className="mt-1 text-sm text-navy/45 dark:text-white/45">{goal.blurb}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-16 dark:bg-white/5">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy/35 dark:text-white/35">
            02 / Make it practical
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            A path you can actually follow.
          </h2>
          <p className="mt-4 text-navy/45 dark:text-white/45">No crowded syllabi or confusing jargon.</p>
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-[32px] bg-navy-deep px-8 py-16 text-center text-white shadow-float sm:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
            Ready when you are
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
            You don’t have to figure it
            <br />
            <span className="text-sky-300">all out alone.</span>
          </h2>
          <p className="mt-4 text-sm text-white/60">Start with one goal. We’ll help you find the next right step.</p>
          <button type="button" onClick={() => start()} className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy">
            Build my learning path →
          </button>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 pb-10 text-sm text-navy/45 dark:text-white/40">
        <Logo />
        <p>Practical learning for your next chapter.</p>
        <div className="flex gap-5">
          <a href="#pathways">Pathways</a>
          <a href="#how">How it works</a>
          <Link to="/login">Sign in</Link>
        </div>
      </footer>
    </div>
  );
}
