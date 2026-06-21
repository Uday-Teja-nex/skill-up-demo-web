import { ArrowLeft, Bell, CheckCheck, CircleDot } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialNotifications = [
  {
    id: "notice-1",
    title: "Tailoring Foundations resumed",
    body: "Your last opened course is ready to continue from the previous module.",
    read: false
  },
  {
    id: "notice-2",
    title: "New blog added to learner feed",
    body: "A new success-story article has been added for community-led learning inspiration.",
    read: false
  },
  {
    id: "notice-3",
    title: "Weekly progress snapshot",
    body: "You completed one module this week and kept your learning streak active.",
    read: true
  }
];

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  const markAllRead = () => {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((items) =>
      items.map((item) => (item.id === id ? { ...item, read: !item.read } : item))
    );
  };

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/dashboard" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">Inbox</p>
            <h1>Notifications</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="hero-panel">
            <div className="section-title-row">
              <div className="profile-row">
                <Bell size={20} />
                <div>
                  <h2>Demo alerts</h2>
                  <p>{unreadCount} unread updates in this mock inbox.</p>
                </div>
              </div>
              <button type="button" className="secondary-button small-button" onClick={markAllRead}>
                <CheckCheck size={16} />
                Mark all read
              </button>
            </div>
          </section>

          <section className="simple-card-list">
            {notifications.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`list-card interactive-card notification-card ${item.read ? "" : "notification-unread"}`}
                onClick={() => toggleRead(item.id)}
              >
                <div className="notification-copy">
                  <div className="section-title-row compact">
                    <strong>{item.title}</strong>
                    {!item.read ? (
                      <span className="status-badge info-badge">
                        <CircleDot size={12} />
                        New
                      </span>
                    ) : null}
                  </div>
                  <p>{item.body}</p>
                </div>
              </button>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
