import {
  Bell,
  BookOpen,
  ChevronRight,
  CircleHelp,
  LogOut,
  Newspaper,
  Rss,
  Sparkles,
  Trophy,
  User
} from "lucide-react";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { demoBlogs, demoCourses, demoNews } from "../data/demoData";
import { useDemoSession } from "../state/DemoSessionContext";

const accentClass: Record<string, string> = {
  blue: "accent-blue",
  pink: "accent-pink",
  green: "accent-green",
  violet: "accent-violet"
};

export function LearnerDashboardPage() {
  const navigate = useNavigate();
  const { session, signOut } = useDemoSession();

  const ongoingCourses = useMemo(
    () => demoCourses.filter((course) => course.status === "ongoing"),
    []
  );
  const catalogCourses = useMemo(
    () => demoCourses.filter((course) => course.status !== "completed"),
    []
  );
  const completedCourses = useMemo(
    () => demoCourses.filter((course) => course.status === "completed"),
    []
  );

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="dashboard-header">
          <div className="brand-lockup">
            <div className="brand-icon">
              <BookOpen size={18} />
            </div>
            <div>
              <p className="eyebrow">Skill Up</p>
              <h1>Learner dashboard</h1>
            </div>
          </div>
          <button
            type="button"
            className="ghost-icon-button"
            onClick={() => {
              signOut();
              navigate("/", { replace: true });
            }}
          >
            <LogOut size={18} />
          </button>
        </header>

        <div className="page-content">
          <section className="hero-panel">
            <div>
              <p className="eyebrow">Welcome back</p>
              <h2>{session?.displayName ?? "Learner"}</h2>
              <p>
                Explore the learner experience, browse curriculum, and review the
                overall look and feel of the mobile-first dashboard.
              </p>
            </div>
            <div className="tag-row">
              <Link to="/blogs" className="mini-tag">
                <Rss size={14} />
                Blogs
              </Link>
              <Link to="/news" className="mini-tag">
                <Newspaper size={14} />
                News
              </Link>
              <Link to="/help" className="mini-tag">
                <CircleHelp size={14} />
                Help
              </Link>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">In progress</p>
                <h3>Ongoing courses</h3>
              </div>
              <Trophy size={18} />
            </div>
            <div className="card-scroll-grid">
              {ongoingCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className={`course-card ${accentClass[course.accent]}`}
                >
                  <span className="course-pill">{course.category}</span>
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="progress-line">
                    <span style={{ width: `${course.progress}%` }} />
                  </div>
                  <strong>{course.progress}% complete</strong>
                </Link>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Catalog</p>
                <h3>Explore courses</h3>
              </div>
              <Sparkles size={18} />
            </div>
            <div className="simple-card-list">
              {catalogCourses.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`} className="list-card">
                  <div>
                    <span className="course-pill">{course.category}</span>
                    <h4>{course.title}</h4>
                    <p>{course.duration} • {course.level}</p>
                  </div>
                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Completed</p>
                <h3>Achievements</h3>
              </div>
              <Trophy size={18} />
            </div>
            <div className="simple-card-list">
              {completedCourses.map((course) => (
                <div key={course.id} className="list-card static-card">
                  <div>
                    <span className="course-pill">{course.category}</span>
                    <h4>{course.title}</h4>
                    <p>Completed successfully</p>
                  </div>
                  <strong>100%</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Content</p>
                <h3>Blogs and news</h3>
              </div>
              <Bell size={18} />
            </div>
            <div className="article-grid">
              {[...demoBlogs, ...demoNews].map((item) => (
                <div key={item.id} className="article-card">
                  <span className="article-type">{item.category}</span>
                  <h4>{item.title}</h4>
                  <p>{item.excerpt}</p>
                  <small>{item.readTime}</small>
                </div>
              ))}
            </div>
          </section>
        </div>

        <nav className="bottom-nav">
          <Link to="/dashboard" className="nav-item active">
            <BookOpen size={16} />
            Learn
          </Link>
          <Link to="/blogs" className="nav-item">
            <Rss size={16} />
            Blogs
          </Link>
          <Link to="/news" className="nav-item">
            <Newspaper size={16} />
            News
          </Link>
          <Link to="/profile" className="nav-item">
            <User size={16} />
            Profile
          </Link>
        </nav>
      </section>
    </main>
  );
}
