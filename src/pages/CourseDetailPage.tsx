import { ArrowLeft, CheckCircle2, Clock3, Layers3, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { demoCourses } from "../data/demoData";
import { useDemoSession } from "../state/DemoSessionContext";

export function CourseDetailPage() {
  const { courseId } = useParams();
  const { courseProgress, markCourseOpened, markCourseCompleted, wishlist, toggleWishlist } =
    useDemoSession();
  const course = demoCourses.find((item) => item.id === courseId) ?? demoCourses[0];
  const progress = courseProgress[course.id] ?? course.progress;

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/dashboard" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">Course detail</p>
            <h1>{course.title}</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-panel">
            <div className="course-detail-top">
              <span className="course-pill">{course.primarySkill}</span>
              <button
                type="button"
                className={`wishlist-button ${wishlist.includes(course.id) ? "active" : ""}`}
                onClick={() => toggleWishlist(course.id)}
              >
                <Star size={16} />
              </button>
            </div>
            <h2>{course.description}</h2>
            <div className="detail-metrics">
              <div>
                <Clock3 size={16} />
                <span>{course.duration}</span>
              </div>
              <div>
                <Layers3 size={16} />
                <span>{course.level}</span>
              </div>
              <div>
                <CheckCircle2 size={16} />
                <span>{progress}% progress</span>
              </div>
            </div>
            <div className="progress-line">
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className="course-card-actions">
              <button
                type="button"
                className="secondary-button small-button"
                onClick={() => markCourseOpened(course.id)}
              >
                Start / Resume
              </button>
              <button
                type="button"
                className="primary-button small-button"
                onClick={() => markCourseCompleted(course.id)}
              >
                Mark complete
              </button>
            </div>
          </section>

          <section className="content-card">
            <h2>Learning modules</h2>
            <div className="simple-card-list">
              {course.modules.map((module, index) => (
                <div key={module} className="list-card static-card">
                  <div>
                    <span className="course-pill">Module {index + 1}</span>
                    <h4>{module}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
