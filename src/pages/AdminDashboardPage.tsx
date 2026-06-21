import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  LogOut,
  Settings,
  Users
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { demoCourses, demoLearners } from "../data/demoData";
import { useDemoSession } from "../state/DemoSessionContext";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { signOut } = useDemoSession();

  const stats = [
    {
      id: "1",
      title: "Total Learners",
      value: String(demoLearners.length),
      icon: <Users size={22} color="#275df5" />,
      bgClass: "metric-bg-blue"
    },
    {
      id: "2",
      title: "Active Courses",
      value: String(demoCourses.length),
      icon: <BookOpen size={22} color="#8b5cf6" />,
      bgClass: "metric-bg-violet"
    },
    {
      id: "3",
      title: "Completions",
      value: String(demoLearners.filter((learner) => learner.onboardingComplete).length),
      icon: <GraduationCap size={22} color="#11a654" />,
      bgClass: "metric-bg-green"
    }
  ];

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="admin-light-header">
          <div>
            <h1>Admin Control</h1>
            <p>Overview of platform activity</p>
          </div>
          <button
            type="button"
            className="ghost-icon-button"
            onClick={() => navigate("/admin/settings")}
          >
            <Settings size={20} />
          </button>
        </header>

        <div className="page-content">
          <section className="stats-grid mobile-stats-grid">
            {stats.map((stat) => (
              <div key={stat.id} className="stat-card stat-card-light">
                <div className={`stat-icon ${stat.bgClass}`}>{stat.icon}</div>
                <strong>{stat.value}</strong>
                <span>{stat.title}</span>
              </div>
            ))}
          </section>

          <section className="dashboard-section">
            <h3>Quick Actions</h3>
            <div className="simple-card-list">
              <Link to="/admin/users" className="list-card interactive-card">
                <div className="profile-row">
                  <div className="metric-icon-inline metric-bg-green">
                    <Users size={16} />
                  </div>
                  <div>
                    <strong>Manage Users</strong>
                    <p>View, edit, or remove learners</p>
                  </div>
                </div>
                <ArrowRight size={18} />
              </Link>
              <Link to="/admin/courses" className="list-card interactive-card">
                <div className="profile-row">
                  <div className="metric-icon-inline metric-bg-pink">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <strong>Course Catalog</strong>
                    <p>Add or update curriculum</p>
                  </div>
                </div>
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>

          <section className="dashboard-section">
            <h3>Recent Registrations</h3>
            <div className="content-card admin-activity-card">
              {demoLearners.map((learner, index) => (
                <button
                  key={learner.id}
                  type="button"
                  onClick={() => navigate("/admin/users")}
                  className={`activity-row ${index !== demoLearners.length - 1 ? "activity-row-border" : ""}`}
                >
                  <div className="avatar-placeholder">
                    {learner.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="activity-copy">
                    <strong>{learner.fullName}</strong>
                    <p>{learner.email}</p>
                  </div>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </section>

          <button
            type="button"
            className="primary-button full-width danger-button"
            onClick={() => {
              signOut();
              navigate("/", { replace: true });
            }}
          >
            <LogOut size={18} />
            Exit admin demo
          </button>
        </div>
      </section>
    </main>
  );
}
