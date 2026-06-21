import { ArrowLeft, Ban, RotateCcw, UserRoundCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { demoLearners } from "../data/demoData";

export function AdminUsersPage() {
  const [suspendedIds, setSuspendedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(demoLearners[0]?.id ?? null);

  const suspendedCount = suspendedIds.length;
  const activeCount = useMemo(
    () => demoLearners.length - suspendedCount,
    [suspendedCount]
  );

  const toggleSuspension = (learnerId: string) => {
    setSuspendedIds((current) =>
      current.includes(learnerId)
        ? current.filter((id) => id !== learnerId)
        : [...current, learnerId]
    );
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
            <h1>Manage Users</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="stats-grid mobile-stats-grid">
            <div className="stat-card stat-card-light">
              <div className="stat-icon metric-bg-green">
                <UserRoundCheck size={20} />
              </div>
              <strong>{activeCount}</strong>
              <span>Active Learners</span>
            </div>
            <div className="stat-card stat-card-light">
              <div className="stat-icon metric-bg-pink">
                <Ban size={20} />
              </div>
              <strong>{suspendedCount}</strong>
              <span>Suspended</span>
            </div>
          </section>

          <section className="simple-card-list">
            {demoLearners.map((learner) => {
              const expanded = expandedId === learner.id;
              const suspended = suspendedIds.includes(learner.id);

              return (
                <div key={learner.id} className="content-card">
                  <div className="section-title-row">
                    <div>
                      <strong>{learner.fullName}</strong>
                      <p>{learner.email}</p>
                    </div>
                    <span className={`status-badge ${suspended ? "danger-badge" : "success-badge"}`}>
                      {suspended ? "Suspended" : "Active"}
                    </span>
                  </div>

                  <div className="course-card-actions">
                    <button
                      type="button"
                      className="secondary-button small-button"
                      onClick={() => setExpandedId(expanded ? null : learner.id)}
                    >
                      {expanded ? "Hide details" : "View details"}
                    </button>
                    <button
                      type="button"
                      className={`small-button ${suspended ? "secondary-button" : "primary-button"}`}
                      onClick={() => toggleSuspension(learner.id)}
                    >
                      {suspended ? <RotateCcw size={14} /> : <Ban size={14} />}
                      {suspended ? "Restore" : "Suspend"}
                    </button>
                  </div>

                  {expanded ? (
                    <div className="admin-info-grid">
                      <div>
                        <span>Location</span>
                        <strong>{learner.location}</strong>
                      </div>
                      <div>
                        <span>Language</span>
                        <strong>{learner.preferredLanguage}</strong>
                      </div>
                      <div>
                        <span>Hours / Week</span>
                        <strong>{learner.hoursPerWeek}</strong>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </section>
        </div>
      </section>
    </main>
  );
}
