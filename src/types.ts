export type DemoRole = "new" | "existing" | "admin";

export type SessionRole = "user" | "admin";

export type DemoSession = {
  role: SessionRole;
  loginMode: DemoRole;
  displayName: string;
  email: string;
  onboardingComplete: boolean;
};

export type Course = {
  id: string;
  title: string;
  category: string;
  primarySkill: string;
  duration: string;
  level: string;
  progress: number;
  description: string;
  modules: string[];
  accent: "blue" | "pink" | "green" | "violet";
  rating: string;
  status: "catalog" | "ongoing" | "completed";
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
};

export type DemoLearner = {
  id: string;
  fullName: string;
  email: string;
  joined: string;
  onboardingComplete: boolean;
  location: string;
  preferredLanguage: string;
  educationLevel: string;
  skills: string[];
  currentSkillLevel: string;
  hoursPerWeek: string;
  barriers: string;
  courseProgress: Array<{
    courseTitle: string;
    status: "ongoing" | "completed" | "wishlisted";
    completion: number;
  }>;
};

export type OnboardingFormData = {
  fullName: string;
  mobile: string;
  age: string;
  gender: string;
  location: string;
  preferredLanguage: string;
  educationLevel: string;
  vocationalTraining: string;
  skills: string[];
  careerGoal: string;
  currentSkillLevel: string;
  smartphone: string;
  laptop: string;
  internet: string;
  frequency: string;
  offlineNeed: string;
  time: string;
  hoursPerWeek: string;
  family: string;
  work: string;
  barriers: string;
  accessibility: string;
};
