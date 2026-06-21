import { ArrowLeft, Mail, Shield, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useDemoSession } from "../state/DemoSessionContext";

export function ProfilePage() {
  const navigate = useNavigate();
  const { session, signOut } = useDemoSession();

  return (
    <main className="mobile-page">
      <section className="phone-shell phone-wide">
        <header className="phone-header">
          <Link to="/dashboard" className="icon-button">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="eyebrow">Profile</p>
            <h1>Account</h1>
          </div>
        </header>

        <div className="page-content">
          <section className="content-card">
            <h2>Demo account details</h2>
            <div className="simple-card-list">
              <div className="list-card static-card">
                <div className="profile-row">
                  <User size={18} />
                  <div>
                    <strong>{session?.displayName}</strong>
                    <p>Display name</p>
                  </div>
                </div>
              </div>
              <div className="list-card static-card">
                <div className="profile-row">
                  <Mail size={18} />
                  <div>
                    <strong>{session?.email}</strong>
                    <p>Email address</p>
                  </div>
                </div>
              </div>
              <div className="list-card static-card">
                <div className="profile-row">
                  <Shield size={18} />
                  <div>
                    <strong>{session?.role === "admin" ? "Admin" : "Learner"}</strong>
                    <p>Demo role</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <button
            type="button"
            className="primary-button full-width danger-button"
            onClick={() => {
              signOut();
              navigate("/", { replace: true });
            }}
          >
            Sign out of demo
          </button>
        </div>
      </section>
    </main>
  );
}
