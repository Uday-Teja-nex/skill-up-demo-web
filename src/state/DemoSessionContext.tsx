import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import { defaultOnboardingData } from "../data/demoData";
import type { DemoRole, DemoSession, OnboardingFormData } from "../types";

type DemoSessionContextValue = {
  session: DemoSession | null;
  onboardingDraft: OnboardingFormData;
  setOnboardingDraft: (draft: OnboardingFormData) => void;
  signInAs: (mode: DemoRole, email?: string) => void;
  completeOnboarding: (draft: OnboardingFormData) => void;
  signOut: () => void;
  resetDemo: () => void;
};

const SESSION_KEY = "skillup-demo-session";
const DRAFT_KEY = "skillup-demo-draft";

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null);

export function DemoSessionProvider({ children }: React.PropsWithChildren) {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [onboardingDraft, setOnboardingDraftState] = useState<OnboardingFormData>(
    defaultOnboardingData()
  );

  useEffect(() => {
    const storedSession = window.localStorage.getItem(SESSION_KEY);
    const storedDraft = window.localStorage.getItem(DRAFT_KEY);

    if (storedSession) {
      setSession(JSON.parse(storedSession) as DemoSession);
    }
    if (storedDraft) {
      setOnboardingDraftState(JSON.parse(storedDraft) as OnboardingFormData);
    }
  }, []);

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

  const signOut = () => {
    persistSession(null);
  };

  const resetDemo = () => {
    window.localStorage.removeItem(SESSION_KEY);
    window.localStorage.removeItem(DRAFT_KEY);
    setOnboardingDraftState(defaultOnboardingData());
    setSession(null);
  };

  const value = useMemo(
    () => ({
      session,
      onboardingDraft,
      setOnboardingDraft,
      signInAs,
      completeOnboarding,
      signOut,
      resetDemo
    }),
    [session, onboardingDraft]
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
