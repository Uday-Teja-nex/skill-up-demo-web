import React, { createContext, useContext, useMemo, useState } from "react";

import { defaultOnboardingData } from "../data/demoData";
import type { DemoRole, DemoSession, OnboardingFormData } from "../types";

type DemoSessionContextValue = {
  session: DemoSession | null;
  onboardingDraft: OnboardingFormData;
  courseProgress: Record<string, number>;
  wishlist: string[];
  setOnboardingDraft: (draft: OnboardingFormData) => void;
  signInAs: (mode: DemoRole, email?: string) => void;
  completeOnboarding: (draft: OnboardingFormData) => void;
  markCourseOpened: (courseId: string) => void;
  markCourseCompleted: (courseId: string) => void;
  toggleWishlist: (courseId: string) => void;
  signOut: () => void;
  resetDemo: () => void;
};

const SESSION_KEY = "skillup-demo-session";
const DRAFT_KEY = "skillup-demo-draft";
const PROGRESS_KEY = "skillup-demo-progress";
const WISHLIST_KEY = "skillup-demo-wishlist";
const DEFAULT_PROGRESS: Record<string, number> = {
  "tailoring-foundations": 65,
  "tailoring-business": 0,
  "tailoring-advanced-finishing": 0,
  "spoken-english-service": 100
};
const DEFAULT_WISHLIST = ["tailoring-business"];

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null);

function readStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const storedValue = window.localStorage.getItem(key);
  if (!storedValue) {
    return fallback;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    return fallback;
  }
}

export function DemoSessionProvider({ children }: React.PropsWithChildren) {
  const [session, setSession] = useState<DemoSession | null>(() =>
    readStoredValue<DemoSession | null>(SESSION_KEY, null)
  );
  const [onboardingDraft, setOnboardingDraftState] = useState<OnboardingFormData>(() =>
    readStoredValue<OnboardingFormData>(DRAFT_KEY, defaultOnboardingData())
  );
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>(() =>
    readStoredValue<Record<string, number>>(PROGRESS_KEY, DEFAULT_PROGRESS)
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    readStoredValue<string[]>(WISHLIST_KEY, DEFAULT_WISHLIST)
  );

  const persistSession = (nextSession: DemoSession | null) => {
    setSession(nextSession);
    if (nextSession) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession));
      return;
    }
    window.localStorage.removeItem(SESSION_KEY);
  };

  const setOnboardingDraft = (draft: OnboardingFormData) => {
    setOnboardingDraftState(draft);
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  };

  const persistProgress = (nextProgress: Record<string, number>) => {
    setCourseProgress(nextProgress);
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(nextProgress));
  };

  const persistWishlist = (nextWishlist: string[]) => {
    setWishlist(nextWishlist);
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(nextWishlist));
  };

  const signInAs = (mode: DemoRole, email?: string) => {
    const loweredEmail = email?.trim().toLowerCase();
    if (mode === "admin") {
      persistSession({
        role: "admin",
        loginMode: "admin",
        displayName: "System Admin",
        email: "admin@skillup.org",
        onboardingComplete: true
      });
      return;
    }

    const nextEmail =
      loweredEmail ||
      (mode === "existing" ? "learner@example.org" : "new-learner@example.org");

    persistSession({
      role: "user",
      loginMode: mode,
      displayName: nextEmail.split("@")[0],
      email: nextEmail,
      onboardingComplete: mode === "existing"
    });
  };

  const completeOnboarding = (draft: OnboardingFormData) => {
    if (!session) return;

    persistSession({
      ...session,
      displayName: draft.fullName || session.displayName,
      onboardingComplete: true
    });
    setOnboardingDraftState(defaultOnboardingData());
    window.localStorage.removeItem(DRAFT_KEY);
  };

  const markCourseOpened = (courseId: string) => {
    const current = courseProgress[courseId] ?? 0;
    if (current >= 100) return;
    if (current > 0) return;
    persistProgress({
      ...courseProgress,
      [courseId]: 15
    });
  };

  const markCourseCompleted = (courseId: string) => {
    persistProgress({
      ...courseProgress,
      [courseId]: 100
    });
  };

  const toggleWishlist = (courseId: string) => {
    const nextWishlist = wishlist.includes(courseId)
      ? wishlist.filter((item) => item !== courseId)
      : [...wishlist, courseId];
    persistWishlist(nextWishlist);
  };

  const signOut = () => {
    persistSession(null);
  };

  const resetDemo = () => {
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(DRAFT_KEY);
    window.localStorage.removeItem(PROGRESS_KEY);
    window.localStorage.removeItem(WISHLIST_KEY);
    setOnboardingDraftState(defaultOnboardingData());
    setCourseProgress(DEFAULT_PROGRESS);
    setWishlist(DEFAULT_WISHLIST);
    setSession(null);
  };

  const value = useMemo(
    () => ({
      session,
      onboardingDraft,
      courseProgress,
      wishlist,
      setOnboardingDraft,
      signInAs,
      completeOnboarding,
      markCourseOpened,
      markCourseCompleted,
      toggleWishlist,
      signOut,
      resetDemo
    }),
    [session, onboardingDraft, courseProgress, wishlist]
  );

  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}

export function useDemoSession() {
  const context = useContext(DemoSessionContext);
  if (!context) {
    throw new Error("useDemoSession must be used within DemoSessionProvider");
  }
  return context;
}
