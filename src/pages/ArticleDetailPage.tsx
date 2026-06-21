import { ArrowLeft, Clock3, Newspaper, Rss } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { demoBlogs, demoNews } from "../data/demoData";

type ArticleDetailPageProps = {
  kind: "blogs" | "news";
};

export function ArticleDetailPage({ kind }: ArticleDetailPageProps) {
  const { articleId } = useParams<{ articleId: string }>();
  const items = kind === "blogs" ? demoBlogs : demoNews;
  const article = items.find((item) => item.id === articleId);

  if (!article) {
    return <Navigate to={kind === "blogs" ? "/blogs" : "/news"} replace />;
  }

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to={kind === "blogs" ? "/blogs" : "/news"} className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">{kind === "blogs" ? "Blogs" : "News"}</p>
            <h1>{article.title}</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-panel detail-stack">
            {kind === "blogs" ? <Rss size={22} /> : <Newspaper size={22} />}
            <span className="article-type">{article.category}</span>
            <p>{article.excerpt}</p>
            <small>
              <Clock3 size={12} />
              {article.readTime}
            </small>
          </section>

          <section className="content-card">
            <h2>Demo article summary</h2>
            <div className="simple-card-list">
              <div className="list-card static-card">
                <p>
                  This page simulates a fuller reading surface so the content cards in the demo feel
                  complete when opened remotely.
                </p>
              </div>
              <div className="list-card static-card">
                <p>
                  The final product can swap this mock copy for CMS or backend-driven article
                  content without changing the visible flow.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
