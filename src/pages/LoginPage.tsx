import { ArrowRight, LogIn, ShieldCheck, Sparkles, UserCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDemoSession } from "../state/DemoSessionContext";
import type { DemoRole } from "../types";

const roleCards: Array<{
  mode: DemoRole;
  label: string;
  title: string;
  summary: string;
  icon: typeof UserCircle2;
}> = [
  {
    mode: "new",
    label: "New User",
    title: "Review the onboarding flow",
    summary: "Start from a fresh learner account and walk through the full form journey.",
    icon: Sparkles
  },
  {
    mode: "existing",
    label: "Existing User",
    title: "Open the learner dashboard",
    summary: "Jump directly into the post-onboarding learner experience and course catalog.",
    icon: UserCircle2
  },
  {
    mode: "admin",
    label: "Admin",
    title: "Open the admin dashboard",
    summary: "View KPIs, learner cards, and administrative snapshots for review.",
    icon: ShieldCheck
  }
];

export function LoginPage() {
  const navigate = useNavigate();
  const { signInAs, resetDemo } = useDemoSession();
  const [role, setRole] = useState<DemoRole>("new");
  const [email, setEmail] = useState("");

  const activeCard = useMemo(
    () => roleCards.find((card) => card.mode === role)!,
    [role]
  );

  const handleContinue = () => {
    signInAs(role, email);
    if (role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }
    navigate(role === "existing" ? "/dashboard" : "/onboarding", { replace: true });
  };

  return (
    <main className="auth-shell">
      <div className="auth-blur auth-blur-left" />
      <div className="auth-blur auth-blur-right" />

      <section className="auth-card">
        <div className="auth-hero">
          <div className="hero-icon">
            <LogIn size={30} />
          </div>
          <p className="eyebrow">Client demo frontend</p>
          <h1>Skill Up demo access</h1>
          <p className="subtle-copy">
            This standalone web experience mirrors the app look and user flow without
            any backend, database, or authentication dependency.
          </p>
        </div>

        <div className="demo-banner">
          <p>
            <strong>How to review:</strong> choose a path below to inspect the new
            learner onboarding, existing learner dashboard, or the admin view.
          </p>
          <button type="button" className="text-button" onClick={resetDemo}>
            Reset saved demo state
          </button>
        </div>

        <div className="role-grid">
          {roleCards.map(({ mode, label, title, summary, icon: Icon }) => (
            <button
              key={mode}
              type="button"
              className={`role-card ${role === mode ? "active" : ""}`}
              onClick={() => setRole(mode)}
            >
              <div className="role-card-top">
                <span className="role-pill">{label}</span>
                <Icon size={20} />
              </div>
              <h2>{title}</h2>
              <p>{summary}</p>
            </button>
          ))}
        </div>

        <div className="auth-form">
          <div className="form-heading">
            <h3>{activeCard.label} demo</h3>
            <p>{activeCard.summary}</p>
          </div>

          {role !== "admin" && (
            <label className="field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  role === "new"
                    ? "new-learner@example.org"
                    : "learner@example.org"
                }
              />
            </label>
          )}

          <button type="button" className="primary-button" onClick={handleContinue}>
            Continue to demo
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
