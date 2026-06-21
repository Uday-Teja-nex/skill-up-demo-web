import { ArrowLeft, BookPlus, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { demoCourses } from "../data/demoData";

export function AdminCoursesPage() {
  const [featuredIds, setFeaturedIds] = useState<string[]>(["tailoring-foundations"]);
  const [expandedId, setExpandedId] = useState<string | null>(demoCourses[0]?.id ?? null);

  const toggleFeatured = (courseId: string) => {
    setFeaturedIds((current) =>
      current.includes(courseId)
        ? current.filter((id) => id !== courseId)
        : [...current, courseId]
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
            <h1>Course Catalog</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-panel">
            <h2>Mock curriculum controls</h2>
            <p>
              These actions are demo-only, but they let the client open outlines and feature courses
              as if the admin dashboard were live.
            </p>
          </section>

          <section className="simple-card-list">
            {demoCourses.map((course) => {
              const expanded = expandedId === course.id;
              const featured = featuredIds.includes(course.id);

              return (
                <div key={course.id} className="content-card">
                  <div className="section-title-row">
                    <div>
                      <strong>{course.title}</strong>
                      <p>
                        {course.primarySkill} · {course.level}
                      </p>
                    </div>
                    <span className={`status-badge ${featured ? "info-badge" : "neutral-badge"}`}>
                      {featured ? "Featured" : "Standard"}
                    </span>
                  </div>

                  <div className="course-card-actions">
                    <button
                      type="button"
                      className="secondary-button small-button"
                      onClick={() => setExpandedId(expanded ? null : course.id)}
                    >
                      <BookPlus size={14} />
                      {expanded ? "Hide outline" : "Open outline"}
                    </button>
                    <button
                      type="button"
                      className={`small-button ${featured ? "secondary-button" : "primary-button"}`}
                      onClick={() => toggleFeatured(course.id)}
                    >
                      <Sparkles size={14} />
                      {featured ? "Remove feature" : "Feature course"}
                    </button>
                  </div>

                  {expanded ? (
                    <div className="simple-card-list">
                      {course.modules.map((module) => (
                        <div key={module} className="list-card static-card">
                          <p>{module}</p>
                        </div>
                      ))}
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
