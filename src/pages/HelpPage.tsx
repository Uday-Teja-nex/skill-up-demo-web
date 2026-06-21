import { ArrowLeft, CircleHelp, MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";

export function HelpPage() {
  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/dashboard" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">Support</p>
            <h1>Help</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-panel">
            <CircleHelp size={22} />
            <h2>Need guidance?</h2>
            <p>
              This demo page shows the support surface for learners. In the production
              app, this area can point to FAQs, live chat, or mentor support.
            </p>
          </section>
          <section className="content-card">
            <h2>Demo support actions</h2>
            <div className="simple-card-list">
              <div className="list-card static-card">
                <div>
                  <span className="course-pill">FAQ</span>
                  <h4>Course access and navigation help</h4>
                </div>
                <MessageCircleMore size={18} />
              </div>
              <div className="list-card static-card">
                <div>
                  <span className="course-pill">Support</span>
                  <h4>Contact training coordinator</h4>
                </div>
                <MessageCircleMore size={18} />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
