import type { ReactElement } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AdminCoursesPage } from "./pages/AdminCoursesPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminSettingsPage } from "./pages/AdminSettingsPage";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { ArticleDetailPage } from "./pages/ArticleDetailPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { HelpPage } from "./pages/HelpPage";
import { LearnerDashboardPage } from "./pages/LearnerDashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { NewsPage } from "./pages/NewsPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { ProfilePage } from "./pages/ProfilePage";
import { StoriesPage } from "./pages/StoriesPage";
import { SupportTopicPage } from "./pages/SupportTopicPage";
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
        path="/help/:topic"
        element={
          <RequireLearner>
            <SupportTopicPage />
          </RequireLearner>
        }
      />
      <Route
        path="/notifications"
        element={
          <RequireLearner>
            <NotificationsPage />
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
        path="/blogs/:articleId"
        element={
          <RequireLearner>
            <ArticleDetailPage kind="blogs" />
          </RequireLearner>
        }
      />
      <Route
        path="/news/:articleId"
        element={
          <RequireLearner>
            <ArticleDetailPage kind="news" />
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
      <Route
        path="/admin/users"
        element={
          <RequireAdmin>
            <AdminUsersPage />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <RequireAdmin>
            <AdminCoursesPage />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <RequireAdmin>
            <AdminSettingsPage />
          </RequireAdmin>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
