import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export function Logo({ compact = false }) {
  return (
    <Link to="/" className="flex items-center gap-2 text-navy dark:text-white">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy text-white dark:bg-lagoon">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          <rect x="4" y="14" width="3.2" height="6" rx="0.6" />
          <rect x="10.4" y="9" width="3.2" height="11" rx="0.6" />
          <rect x="16.8" y="4" width="3.2" height="16" rx="0.6" />
        </svg>
      </span>
      {!compact && (
        <span className="text-[17px] font-semibold tracking-tight">
          path<span className="font-extrabold">pilot</span>
        </span>
      )}
    </Link>
  );
}

export function DarkToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  useEffect(() => {
    const stored = localStorage.getItem("pp-theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("pp-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-3 py-1.5 text-sm font-medium text-navy shadow-sm transition hover:border-navy/20 dark:border-white/10 dark:bg-navy-deep dark:text-white"
    >
      <span className="grid h-5 w-5 place-items-center rounded-full bg-mist dark:bg-white/10">
        {dark ? "☾" : "☀"}
      </span>
      {dark ? "Light" : "Dark"}
    </button>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-full px-3 py-1.5 text-sm font-medium transition ${
          isActive ? "bg-white text-navy shadow-sm dark:bg-white/10 dark:text-white" : "text-navy/65 hover:text-navy dark:text-white/70 dark:hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function AppShell({ marketing = false }) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-mist dark:bg-[#071422]">
      <header className="sticky top-0 z-30 border-b border-transparent bg-mist/80 backdrop-blur-md dark:bg-[#071422]/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Logo />
          {marketing || isHome ? (
            <nav className="hidden items-center gap-6 text-sm font-medium text-navy/65 dark:text-white/70 md:flex">
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
          ) : (
            <nav className="hidden items-center gap-1 md:flex">
              <NavItem to="/dashboard">Path</NavItem>
              <NavItem to="/catalogue">Catalogue</NavItem>
              <NavItem to="/profile">Profile</NavItem>
            </nav>
          )}
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium text-navy/45 dark:text-white/40 sm:block">
              Free to start →
            </span>
            <DarkToggle />
            {user ? (
              <button type="button" onClick={signOut} className="btn-ghost text-xs">
                Sign out
              </button>
            ) : (
              <Link to="/login" className="btn-primary !px-4 !py-2 text-xs">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>
      {marketing ? null : <Outlet />}
    </div>
  );
}
