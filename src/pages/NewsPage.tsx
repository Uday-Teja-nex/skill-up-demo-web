import { ArrowLeft, Clock3, Newspaper } from "lucide-react";
import { Link } from "react-router-dom";

import { demoNews } from "../data/demoData";

export function NewsPage() {
  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/dashboard" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">Updates</p>
            <h1>News</h1>
          </div>
        </header>

        <div className="page-content">
          <div className="article-grid">
            {demoNews.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`} className="article-card interactive-card">
                <div className="section-title-row compact">
                  <span className="article-type">{item.category}</span>
                  <Newspaper size={14} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.excerpt}</p>
                <small>
                  <Clock3 size={12} />
                  {item.readTime}
                </small>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
