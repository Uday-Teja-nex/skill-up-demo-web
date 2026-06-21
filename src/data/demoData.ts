import type { Article, Course, DemoLearner, OnboardingFormData } from "../types";

export const demoCourses: Course[] = [
  {
    id: "tailoring-foundations",
    title: "Tailoring Foundations",
    category: "Tailoring",
    duration: "6 weeks",
    level: "Beginner",
    progress: 65,
    description:
      "A guided introduction to stitching, measurement, fabric handling, and safe machine basics.",
    modules: [
      "Welcome and measurement essentials",
      "Fabric, tools, and setup",
      "Basic stitches and finishing",
      "Simple garments and repair work"
    ],
    accent: "pink",
    status: "ongoing"
  },
  {
    id: "tailoring-business",
    title: "Tailoring for Small Business",
    category: "Tailoring",
    duration: "4 weeks",
    level: "Intermediate",
    progress: 0,
    description:
      "Learn pricing, customer handling, order tracking, and how to package tailoring as a service.",
    modules: [
      "Setting prices",
      "Managing customer requests",
      "Daily production planning",
      "Promotion and word-of-mouth growth"
    ],
    accent: "violet",
    status: "catalog"
  },
  {
    id: "spoken-english-service",
    title: "Spoken English for Service Work",
    category: "Spoken English",
    duration: "5 weeks",
    level: "Beginner",
    progress: 100,
    description:
      "Short practical lessons focused on greetings, customer support, confidence, and workplace communication.",
    modules: [
      "Introductions and confidence building",
      "Daily service vocabulary",
      "Handling questions",
      "Polite follow-ups"
    ],
    accent: "blue",
    status: "completed"
  }
];

export const demoBlogs: Article[] = [
  {
    id: "b1",
    title: "How community-led skill programs improve learner retention",
    excerpt:
      "A quick look at mentoring rhythms, small cohort structure, and confidence-based milestones.",
    category: "Blogs",
    readTime: "4 min"
  },
  {
    id: "b2",
    title: "Why tailoring remains a strong early-income pathway",
    excerpt:
      "Tailoring can start with low capital, local demand, and immediate visible output for learners.",
    category: "Blogs",
    readTime: "3 min"
  }
];

export const demoNews: Article[] = [
  {
    id: "n1",
    title: "Skill Up launches new tailoring cohort in Dhaka",
    excerpt:
      "The next learner batch will focus on tailoring fundamentals and home-based income readiness.",
    category: "News",
    readTime: "2 min"
  },
  {
    id: "n2",
    title: "Admin dashboard now surfaces course activity snapshots",
    excerpt:
      "The demo experience includes learner progress summaries and a quick admin review surface.",
    category: "News",
    readTime: "2 min"
  }
];

export const demoLearners: DemoLearner[] = [
  {
    id: "l1",
    fullName: "Ayesha Rahman",
    email: "ayesha@example.org",
    joined: "14 Jun 2026",
    onboardingComplete: true,
    location: "Dhaka",
    preferredLanguage: "Bangla",
    educationLevel: "Secondary",
    skills: ["Tailoring", "Spoken English"],
    currentSkillLevel: "Beginner",
    hoursPerWeek: "8 hours",
    barriers: "Limited evening electricity",
    courseProgress: [
      { courseTitle: "Tailoring Foundations", status: "ongoing", completion: 65 },
      { courseTitle: "Spoken English for Service Work", status: "completed", completion: 100 }
    ]
  },
  {
    id: "l2",
    fullName: "Nusrat Jahan",
    email: "nusrat@example.org",
    joined: "10 Jun 2026",
    onboardingComplete: true,
    location: "Chattogram",
    preferredLanguage: "English",
    educationLevel: "Higher Secondary",
    skills: ["Graphic Design"],
    currentSkillLevel: "Intermediate",
    hoursPerWeek: "10 hours",
    barriers: "Shared device at home",
    courseProgress: [
      { courseTitle: "Tailoring for Small Business", status: "wishlisted", completion: 0 }
    ]
  },
  {
    id: "l3",
    fullName: "Rupa Das",
    email: "rupa@example.org",
    joined: "03 Jun 2026",
    onboardingComplete: false,
    location: "Khulna",
    preferredLanguage: "Bangla",
    educationLevel: "Primary",
    skills: ["Tailoring"],
    currentSkillLevel: "Beginner",
    hoursPerWeek: "6 hours",
    barriers: "Family care responsibilities",
    courseProgress: []
  }
];

export const defaultOnboardingData = (): OnboardingFormData => ({
  fullName: "",
  mobile: "",
  age: "",
  gender: "Prefer not to say",
  location: "",
  preferredLanguage: "English",
  educationLevel: "None",
  vocationalTraining: "",
  skills: [],
  careerGoal: "",
  currentSkillLevel: "Beginner",
  smartphone: "Yes",
  laptop: "No",
  internet: "Yes",
  frequency: "Daily",
  offlineNeed: "Yes",
  time: "",
  hoursPerWeek: "",
  family: "",
  work: "",
  barriers: "",
  accessibility: ""
});
