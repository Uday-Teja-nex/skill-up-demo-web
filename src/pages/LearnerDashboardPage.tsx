import {
  Bell,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Folder,
  HelpCircle,
  Home,
  LogOut,
  Newspaper,
  PlayCircle,
  Plus,
  Rss,
  Star,
  Trophy,
  User,
  X
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { demoCourses } from "../data/demoData";
import { useDemoSession } from "../state/DemoSessionContext";

const TABS = ["All", "Tailoring"] as const;

export function LearnerDashboardPage() {
  const navigate = useNavigate();
  const {
    session,
    signOut,
    courseProgress,
    wishlist,
    toggleWishlist,
    markCourseOpened
  } = useDemoSession();
  const [menuVisible, setMenuVisible] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");

  const tailoringCourses = useMemo(
    () =>
      demoCourses.filter(
        (course) => course.primarySkill === "Tailoring" || course.category === "Tailoring"
      ),
    []
  );

  const inProgressIds = useMemo(
    () =>
      Object.entries(courseProgress)
        .filter(([, value]) => value > 0 && value < 100)
        .map(([key]) => key),
    [courseProgress]
  );

  const completedCourseIds = useMemo(
    () =>
      Object.entries(courseProgress)
        .filter(([, value]) => value >= 100)
        .map(([key]) => key),
    [courseProgress]
  );

  const filteredCatalog = useMemo(() => {
    const source = activeTab === "All"
      ? tailoringCourses
      : tailoringCourses.filter((course) => course.primarySkill === activeTab);
    return source.filter((course) => !completedCourseIds.includes(course.id));
  }, [activeTab, completedCourseIds, tailoringCourses]);

  const ongoingCourses = tailoringCourses.filter((course) => inProgressIds.includes(course.id));
  const wishlistedCourses = tailoringCourses.filter(
    (course) => wishlist.includes(course.id) && !completedCourseIds.includes(course.id)
  );
  const completedCourses = demoCourses.filter((course) => completedCourseIds.includes(course.id));

  const goToCourse = (courseId: string) => {
    markCourseOpened(courseId);
    navigate(`/course/${courseId}`);
  };

  const handleLogout = () => {
    signOut();
    navigate("/", { replace: true });
  };

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="dashboard-topbar">
          <div className="logo-row">
            <button
              type="button"
              className="brand-icon small-brand-icon"
              onClick={() => setMenuVisible(true)}
            >
              <BookOpen size={18} />
            </button>
            <strong className="app-title">Skill Up</strong>
          </div>
          <button type="button" className="logout-icon" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </header>

        {menuVisible ? (
          <div className="menu-overlay">
            <button
              type="button"
              className="menu-close-area"
              onClick={() => setMenuVisible(false)}
            />
            <aside className="side-menu">
              <div className="menu-header">
                <div className="logo-row">
                  <div className="brand-icon small-brand-icon">
                    <BookOpen size={18} />
                  </div>
                  <strong className="app-title">Skill Up</strong>
                </div>
                <button type="button" className="ghost-icon-button" onClick={() => setMenuVisible(false)}>
                  <X size={18} />
                </button>
              </div>

              <nav className="menu-nav">
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => {
                    setMenuVisible(false);
                    navigate("/dashboard");
                  }}
                >
                  <Home size={18} />
                  <span>Home</span>
                </button>
                <Link to="/blogs" className="menu-item" onClick={() => setMenuVisible(false)}>
                  <Rss size={18} />
                  <span>Blogs</span>
                </Link>
                <Link to="/news" className="menu-item" onClick={() => setMenuVisible(false)}>
                  <Newspaper size={18} />
                  <span>News</span>
                </Link>
                <button
                  type="button"
                  className="menu-item"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                >
                  <User size={18} />
                  <span>Profile</span>
                  <span className="menu-grow" />
                  {profileMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {profileMenuOpen ? (
                  <div className="submenu">
                    <Link to="/profile" className="submenu-item" onClick={() => setMenuVisible(false)}>
                      <User size={16} />
                      <span>Account</span>
                    </Link>
                    <Link to="/help" className="submenu-item" onClick={() => setMenuVisible(false)}>
                      <HelpCircle size={16} />
                      <span>Help Page</span>
                    </Link>
                    <button
                      type="button"
                      className="submenu-item"
                      onClick={() => {
                        setMenuVisible(false);
                        navigate("/notifications");
                      }}
                    >
                      <Bell size={16} />
                      <span>Notifications</span>
                    </button>
                  </div>
                ) : null}
              </nav>
            </aside>
          </div>
        ) : null}

        <div className="page-content">
          <section className="welcome-section">
            <h2>Ready to learn? ✨</h2>
            <p>Explore our curriculum and continue your progress.</p>
            <div className="tag-row">
              <Link to="/blogs" className="mini-tag">
                <Rss size={14} />
                Blogs
              </Link>
              <Link to="/news" className="mini-tag">
                <Newspaper size={14} />
                News
              </Link>
            </div>
            <p className="welcome-user">Signed in as {session?.displayName ?? "Learner"}</p>
          </section>

          {ongoingCourses.length > 0 ? (
            <section className="dashboard-section">
              <div className="dashboard-section-header">
                <div className="section-icon-bg">
                  <PlayCircle size={18} />
                </div>
                <h3>Ongoing Courses</h3>
              </div>
              <div className="card-scroll-grid">
                {ongoingCourses.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    className="course-card learner-card-surface"
                    onClick={() => goToCourse(course.id)}
                  >
                    <span className="course-pill">{course.primarySkill}</span>
                    <h4>{course.title}</h4>
                    <p>{course.description}</p>
                    <div className="course-meta">
                      <span>{course.duration}</span>
                      <span>{course.level}</span>
                    </div>
                    <div className="progress-line">
                      <span style={{ width: `${courseProgress[course.id] ?? course.progress}%` }} />
                    </div>
                    <strong>{courseProgress[course.id] ?? course.progress}% complete</strong>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {wishlistedCourses.length > 0 ? (
            <section className="dashboard-section">
              <div className="dashboard-section-header">
                <div className="section-icon-bg wish-bg">
                  <Star size={18} />
                </div>
                <h3>Wishlisted Courses</h3>
              </div>
              <div className="card-scroll-grid">
                {wishlistedCourses.map((course) => (
                  <div key={course.id} className="course-card learner-card-surface">
                    <div className="course-card-header">
                      <span className="course-pill">{course.primarySkill}</span>
                      <button
                        type="button"
                        className="wishlist-button active"
                        onClick={() => toggleWishlist(course.id)}
                      >
                        <Star size={16} />
                      </button>
                    </div>
                    <h4>{course.title}</h4>
                    <p>{course.description}</p>
                    <div className="course-card-actions">
                      <button
                        type="button"
                        className="secondary-button small-button"
                        onClick={() => goToCourse(course.id)}
                      >
                        Open
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="dashboard-section">
            <div className="dashboard-section-header">
              <div className="section-icon-bg folder-bg">
                <Folder size={18} />
              </div>
              <h3>Explore Curriculum</h3>
            </div>

            <div className="tabs-row">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="catalog-grid">
              {filteredCatalog.map((course) => (
                <div key={course.id} className="course-card learner-card-surface">
                  <div className="course-card-header">
                    <span className="course-pill">{course.primarySkill}</span>
                    <button
                      type="button"
                      className={`wishlist-button ${wishlist.includes(course.id) ? "active" : ""}`}
                      onClick={() => toggleWishlist(course.id)}
                    >
                      <Star size={16} />
                    </button>
                  </div>
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <div className="course-meta">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                    <span>{course.rating} ★</span>
                  </div>
                  <div className="course-card-actions">
                    <button
                      type="button"
                      className="primary-button small-button"
                      onClick={() => goToCourse(course.id)}
                    >
                      <Plus size={14} />
                      Open course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {completedCourses.length > 0 ? (
            <section className="dashboard-section">
              <div className="dashboard-section-header">
                <div className="section-icon-bg complete-bg">
                  <Trophy size={18} />
                </div>
                <h3>Completed Courses</h3>
              </div>
              <div className="card-scroll-grid">
                {completedCourses.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    className="course-card learner-card-surface"
                    onClick={() => goToCourse(course.id)}
                  >
                    <span className="course-pill">{course.primarySkill}</span>
                    <h4>{course.title}</h4>
                    <p>Completed successfully</p>
                    <strong>100% complete</strong>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <div className="dashboard-spacer" />
        </div>

        <Link to="/help" className="floating-help-button">
          <HelpCircle size={18} />
          <span>Help</span>
        </Link>
      </section>
    </main>
  );
}
