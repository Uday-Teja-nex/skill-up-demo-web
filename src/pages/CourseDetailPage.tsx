import { ArrowLeft, CheckCircle2, Clock3, Layers3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { demoCourses } from "../data/demoData";

export function CourseDetailPage() {
  const { courseId } = useParams();
  const course = demoCourses.find((item) => item.id === courseId) ?? demoCourses[0];

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
            <span className="course-pill">{course.category}</span>
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
                <span>{course.progress}% demo progress</span>
              </div>
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
