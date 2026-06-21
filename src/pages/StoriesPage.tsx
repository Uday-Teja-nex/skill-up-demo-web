import { ArrowLeft, Clock3, Rss } from "lucide-react";
import { Link } from "react-router-dom";

import { demoBlogs } from "../data/demoData";

export function StoriesPage({ type }: { type: "blogs" }) {
  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/dashboard" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">Insight feed</p>
            <h1>{type === "blogs" ? "Blogs" : "Stories"}</h1>
          </div>
        </header>

        <div className="page-content">
          <div className="article-grid">
            {demoBlogs.map((item) => (
              <Link key={item.id} to={`/blogs/${item.id}`} className="article-card interactive-card">
                <div className="section-title-row compact">
                  <span className="article-type">{item.category}</span>
                  <Rss size={14} />
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
