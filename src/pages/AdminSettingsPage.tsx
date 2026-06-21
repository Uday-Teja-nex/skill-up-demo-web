import { ArrowLeft, BellRing, Lock, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    alerts: true,
    approvalGate: true,
    auditMode: false
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof typeof settings) => {
    setSaved(false);
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/admin" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">Admin</p>
            <h1>Settings</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="simple-card-list">
            <button
              type="button"
              className="list-card interactive-card"
              onClick={() => toggle("alerts")}
            >
              <div className="profile-row">
                <BellRing size={18} />
                <div>
                  <strong>Admin alerts</strong>
                  <p>Toggle mock activity notifications for this demo workspace.</p>
                </div>
              </div>
              <span className={`status-badge ${settings.alerts ? "success-badge" : "neutral-badge"}`}>
                {settings.alerts ? "On" : "Off"}
              </span>
            </button>

            <button
              type="button"
              className="list-card interactive-card"
              onClick={() => toggle("approvalGate")}
            >
              <div className="profile-row">
                <Lock size={18} />
                <div>
                  <strong>Approval gate</strong>
                  <p>Simulate an approval check before course updates are published.</p>
                </div>
              </div>
              <span className={`status-badge ${settings.approvalGate ? "success-badge" : "neutral-badge"}`}>
                {settings.approvalGate ? "Enabled" : "Disabled"}
              </span>
            </button>

            <button
              type="button"
              className="list-card interactive-card"
              onClick={() => toggle("auditMode")}
            >
              <div className="profile-row">
                <ShieldCheck size={18} />
                <div>
                  <strong>Audit mode</strong>
                  <p>Show a mock secure-state toggle for future production hardening controls.</p>
                </div>
              </div>
              <span className={`status-badge ${settings.auditMode ? "info-badge" : "neutral-badge"}`}>
                {settings.auditMode ? "Active" : "Inactive"}
              </span>
            </button>
          </section>

          <button
            type="button"
            className="primary-button full-width"
            onClick={() => setSaved(true)}
          >
            <Save size={18} />
            Save demo settings
          </button>

          {saved ? (
            <div className="content-card">
              <p>Mock settings saved for the current session.</p>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
