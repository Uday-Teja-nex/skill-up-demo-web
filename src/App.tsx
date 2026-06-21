import type { ReactElement } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { HelpPage } from "./pages/HelpPage";
import { LearnerDashboardPage } from "./pages/LearnerDashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { NewsPage } from "./pages/NewsPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { StoriesPage } from "./pages/StoriesPage";
import { useDemoSession } from "./state/DemoSessionContext";

function RequireLearner({ children }: { children: ReactElement }) {
  const { session } = useDemoSession();
  if (!session) return <Navigate to="/" replace />;
  if (session.role === "admin") return <Navigate to="/admin" replace />;
  if (!session.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return children;
}

function RequireOnboarding({ children }: { children: ReactElement }) {
  const { session } = useDemoSession();
  if (!session) return <Navigate to="/" replace />;
  if (session.role === "admin") return <Navigate to="/admin" replace />;
  if (session.onboardingComplete) return <Navigate to="/dashboard" replace />;
  return children;
}

function RequireAdmin({ children }: { children: ReactElement }) {
  const { session } = useDemoSession();
  if (!session) return <Navigate to="/" replace />;
  if (session.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

function LandingRedirect() {
  const { session } = useDemoSession();
  const location = useLocation();

  if (location.pathname !== "/") return null;
  if (!session) return <LoginPage />;
  if (session.role === "admin") return <Navigate to="/admin" replace />;
  if (!session.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return <Navigate to="/dashboard" replace />;
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingRedirect />} />
      <Route
        path="/onboarding"
        element={
          <RequireOnboarding>
            <OnboardingPage />
          </RequireOnboarding>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireLearner>
            <LearnerDashboardPage />
          </RequireLearner>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <RequireLearner>
            <CourseDetailPage />
          </RequireLearner>
        }
      />
      <Route
        path="/blogs"
        element={
          <RequireLearner>
            <StoriesPage type="blogs" />
          </RequireLearner>
        }
      />
      <Route
        path="/news"
        element={
          <RequireLearner>
            <NewsPage />
          </RequireLearner>
        }
      />
      <Route
        path="/help"
        element={
          <RequireLearner>
            <HelpPage />
          </RequireLearner>
        }
      />
      <Route
        path="/profile"
        element={
          <RequireLearner>
            <ProfilePage />
          </RequireLearner>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminDashboardPage />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
