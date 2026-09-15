import { useState } from "react";
import { askCoach } from "../lib/api";

export default function CoachBox({ stepId }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (!question.trim()) return;
    setBusy(true);
    setError("");
    try {
      const data = await askCoach({ question: question.trim(), stepId });
      setAnswer(data.answer || "");
    } catch {
      setError("Coach is unavailable. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="card mt-6 p-6 dark:border-white/10 dark:bg-[#10263c]">
      <h2 className="text-lg font-bold">Ask the coach</h2>
      <p className="mt-1 text-sm text-navy/45 dark:text-white/45">Stuck on this step? Ask one focused question.</p>
      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <textarea
          className="text-input min-h-[110px] dark:border-white/10 dark:bg-white/5 dark:text-white"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What should I do if I get stuck installing this?"
        />
        <button className="btn-primary" disabled={busy} type="submit">
          {busy ? "Asking…" : "Ask"}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
      {answer && (
        <div className="mt-4 rounded-2xl bg-mist p-4 text-sm leading-relaxed dark:bg-white/5">{answer}</div>
      )}
    </section>
  );
}
