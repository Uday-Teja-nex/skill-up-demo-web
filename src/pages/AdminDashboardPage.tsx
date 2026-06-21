import {
  Activity,
  ArrowRight,
  BookOpen,
  GraduationCap,
  LogOut,
  Settings,
  Shield,
  Users
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { demoCourses, demoLearners } from "../data/demoData";
import { useDemoSession } from "../state/DemoSessionContext";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { signOut } = useDemoSession();
  const [expandedLearner, setExpandedLearner] = useState<string | null>(demoLearners[0].id);

  const stats = useMemo(
    () => [
      {
        title: "Total Learners",
        value: String(demoLearners.length),
        icon: <Users size={18} />,
        tone: "blue"
      },
      {
        title: "Active Courses",
        value: String(demoCourses.length),
        icon: <BookOpen size={18} />,
        tone: "violet"
      },
      {
        title: "Completions",
        value: String(demoLearners.filter((learner) => learner.onboardingComplete).length),
        icon: <GraduationCap size={18} />,
        tone: "green"
      },
      {
        title: "In Review",
        value: String(demoLearners.filter((learner) => !learner.onboardingComplete).length),
        icon: <Activity size={18} />,
        tone: "amber"
      }
    ],
    []
  );

  return (
    <main className="admin-page">
      <section className="admin-shell">
        <header className="admin-header">
          <div className="brand-lockup">
            <div className="brand-icon admin-icon">
              <Shield size={18} />
            </div>
            <div>
              <p className="eyebrow">Skill Up</p>
              <h1>Superadmin dashboard demo</h1>
            </div>
          </div>

          <div className="admin-actions">
            <button type="button" className="secondary-button">
              <Settings size={16} />
              Settings
            </button>
            <button
              type="button"
              className="secondary-button danger-outline"
              onClick={() => {
                signOut();
                navigate("/", { replace: true });
              }}
            >
              <LogOut size={16} />
              Exit demo
            </button>
          </div>
        </header>

        <section className="admin-hero">
          <div>
            <p className="eyebrow">Admin review surface</p>
            <h2>Live-style metrics, learner snapshots, and course overview</h2>
            <p>
              This static demo recreates the administrative view for client walkthroughs
              without requiring backend connectivity.
            </p>
          </div>
        </section>

        <section className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.title} className={`stat-card tone-${stat.tone}`}>
              <div className="stat-icon">{stat.icon}</div>
              <span>{stat.title}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </section>

        <section className="admin-section">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Actions</p>
              <h3>Quick admin surfaces</h3>
            </div>
          </div>
          <div className="admin-action-grid">
            <div className="admin-action-card">
              <Users size={18} />
              <h4>Manage learners</h4>
              <p>Review learner status, onboarding completeness, and current skills.</p>
              <span>
                Open learner records
                <ArrowRight size={14} />
              </span>
            </div>
            <div className="admin-action-card">
              <BookOpen size={18} />
              <h4>Curriculum review</h4>
              <p>Inspect how catalog items and progress snapshots appear to administrators.</p>
              <span>
                Review course catalog
                <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <div className="section-title-row">
            <div>
              <p className="eyebrow">Learners</p>
              <h3>Expandable learner cards</h3>
            </div>
          </div>
          <div className="learner-stack">
            {demoLearners.map((learner) => {
              const expanded = expandedLearner === learner.id;
              return (
                <article key={learner.id} className="learner-card">
                  <button
                    type="button"
                    className="learner-card-top"
                    onClick={() => setExpandedLearner(expanded ? null : learner.id)}
                  >
                    <div>
                      <span className="course-pill">
                        {learner.onboardingComplete ? "Onboarded" : "Pending"}
                      </span>
                      <h4>{learner.fullName}</h4>
                      <p>{learner.email}</p>
                    </div>
                    <strong>{learner.joined}</strong>
                  </button>

                  {expanded ? (
                    <div className="learner-card-body">
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
                          <span>Education</span>
                          <strong>{learner.educationLevel}</strong>
                        </div>
                        <div>
                          <span>Skill level</span>
                          <strong>{learner.currentSkillLevel}</strong>
                        </div>
                        <div>
                          <span>Weekly time</span>
                          <strong>{learner.hoursPerWeek}</strong>
                        </div>
                        <div>
                          <span>Barrier</span>
                          <strong>{learner.barriers}</strong>
                        </div>
                      </div>
                      <div className="tag-row">
                        {learner.skills.map((skill) => (
                          <span key={skill} className="mini-tag muted-tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="simple-card-list">
                        {learner.courseProgress.length === 0 ? (
                          <div className="list-card static-card">
                            <p>No courses yet</p>
                          </div>
                        ) : (
                          learner.courseProgress.map((progress) => (
                            <div key={progress.courseTitle} className="list-card static-card">
                              <div>
                                <span className="course-pill">{progress.status}</span>
                                <h4>{progress.courseTitle}</h4>
                              </div>
                              <strong>{progress.completion}%</strong>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
