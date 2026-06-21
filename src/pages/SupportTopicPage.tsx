import { ArrowLeft, CircleHelp, Mail, MessageCircleMore } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

const TOPIC_CONTENT = {
  faq: {
    eyebrow: "Support article",
    title: "Course Access and Navigation Help",
    icon: <CircleHelp size={22} />,
    points: [
      "Use the dashboard cards to resume ongoing courses or open new mock courses.",
      "The wishlist star keeps selected items pinned in the learner view during the session.",
      "Blogs, news, notifications, and profile pages are all wired as demo-only navigation surfaces."
    ]
  },
  contact: {
    eyebrow: "Support contact",
    title: "Contact Training Coordinator",
    icon: <Mail size={22} />,
    points: [
      "In production this entry would connect to an email, ticket, or coordinator chat flow.",
      "For the demo, it explains how learner support would route for help with onboarding or course issues.",
      "This can later be replaced with live support integration without changing the visible user flow."
    ]
  }
} as const;

export function SupportTopicPage() {
  const { topic } = useParams<{ topic: string }>();

  if (!topic || !(topic in TOPIC_CONTENT)) {
    return <Navigate to="/help" replace />;
  }

  const content = TOPIC_CONTENT[topic as keyof typeof TOPIC_CONTENT];

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/help" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-panel detail-stack">
            {content.icon}
            <p>
              This screen is intentionally mock-only, but it behaves like a real support branch in
              the learner experience.
            </p>
          </section>

          <section className="content-card">
            <h2>What this action does</h2>
            <div className="simple-card-list">
              {content.points.map((point) => (
                <div key={point} className="list-card static-card">
                  <div className="profile-row">
                    <MessageCircleMore size={18} />
                    <p>{point}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="course-card-actions">
            <Link to="/help" className="secondary-button">
              Back to help
            </Link>
            <Link to="/dashboard" className="primary-button">
              Return to dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
