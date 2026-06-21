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

      <section className="auth-card auth-card-narrow">
        <div className="auth-hero">
          <div className="hero-icon">
            <LogIn size={30} />
          </div>
          <p className="eyebrow">Client demo frontend</p>
          <h1>Welcome Back</h1>
          <p className="subtle-copy">
            Unlock your potential with Skill Up. This demo mirrors the app look,
            key UI surfaces, and role-based user flow without backend dependencies.
          </p>
        </div>

        <div className="demo-banner compact-banner">
          <p><strong>Demo mode:</strong> choose a role below to inspect the onboarding, learner dashboard, or admin view.</p>
          <button type="button" className="text-button" onClick={resetDemo}>
            Reset saved demo state
          </button>
        </div>

        <div className="dev-toggle-panel">
          <p className="dev-toggle-title">Developer Role Selection</p>
          <div className="dev-toggle-row">
            {roleCards.map(({ mode, label }) => (
              <button
                key={mode}
                type="button"
                className={`dev-toggle-button ${role === mode ? "active" : ""}`}
                onClick={() => setRole(mode)}
              >
                {label}
              </button>
            ))}
          </div>
          {role !== "admin" ? (
            <label className="field compact-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  role === "new"
                    ? "Enter unique email (e.g. tester2@test.com)"
                    : "Enter the email used when you registered"
                }
              />
            </label>
          ) : null}
        </div>

        <div className="role-grid compact-role-grid">
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

        <div className="auth-form auth-form-single">
          <div className="form-heading">
            <h3>{activeCard.label} demo</h3>
            <p>{activeCard.summary}</p>
          </div>

          <button type="button" className="primary-button" onClick={handleContinue}>
            Continue with Demo
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
