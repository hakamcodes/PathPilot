import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../components/AppShell";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
  const { user, signIn, signUp, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) {
    const to = location.state?.from || "/dashboard";
    return <Navigate to={to} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signin") await signIn(email, password);
      else await signUp(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message?.replace("Firebase: ", "") || "Could not sign in");
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    setError("");
    setBusy(true);
    try {
      await signInGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message?.replace("Firebase: ", "") || "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-mist px-5 py-10 dark:bg-[#071422]">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Logo />
        <Link to="/" className="text-sm text-navy/50 hover:text-navy dark:text-white/50">
          Back home
        </Link>
      </div>
      <div className="mx-auto mt-16 grid max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lagoon">Welcome back</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-navy dark:text-white">
            Pick up where
            <br />
            you left off.
          </h1>
          <p className="mt-4 max-w-sm text-navy/50 dark:text-white/55">
            Sign in to generate a path, tick off steps, and ask the coach when you get stuck.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="card p-8 dark:border-white/10 dark:bg-[#10263c]">
          <div className="mb-6 flex rounded-full bg-mist p-1 text-sm font-semibold dark:bg-white/5">
            {["signin", "signup"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className={`flex-1 rounded-full py-2 ${mode === id ? "bg-white text-navy shadow-sm dark:bg-navy dark:text-white" : "text-navy/45 dark:text-white/45"}`}
              >
                {id === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>
          <label className="field-label dark:text-white">Email</label>
          <input
            className="text-input mb-4 dark:border-white/10 dark:bg-white/5 dark:text-white"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <label className="field-label dark:text-white">Password</label>
          <input
            className="text-input dark:border-white/10 dark:bg-white/5 dark:text-white"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
          />
          {error && <p className="mt-4 text-sm text-rose-600">{error}</p>}
          <button disabled={busy} className="btn-primary mt-6 w-full" type="submit">
            {busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="mt-3 w-full rounded-full border border-navy/10 bg-white py-3 text-sm font-semibold text-navy dark:border-white/10 dark:bg-transparent dark:text-white"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
}
