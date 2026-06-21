import type { ReactElement } from "react";
import { ArrowLeft, Check, Laptop, MonitorOff, Smartphone, Wifi, WifiOff } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { defaultOnboardingData } from "../data/demoData";
import { useDemoSession } from "../state/DemoSessionContext";
import type { OnboardingFormData } from "../types";

const steps = [
  "Basic Info",
  "Education",
  "Interests",
  "Connectivity",
  "Preferences",
  "Constraints"
];

const skillOptions = ["Tailoring", "Graphic Design", "Spoken English", "IT / Computers"];

type ErrorMap = Record<string, string>;

function ToggleButton({
  label,
  selected,
  onClick,
  icon
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactElement;
}) {
  return (
    <button
      type="button"
      className={`choice-card ${selected ? "active" : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon}
    </button>
  );
}

function OnboardingShell({
  step,
  title,
  children,
  onBack,
  onNext,
  isFinal
}: {
  step: number;
  title: string;
  children: ReactElement;
  onBack: () => void;
  onNext: () => void;
  isFinal: boolean;
}) {
  return (
    <main className="mobile-page">
      <section className="phone-shell">
        <header className="phone-header">
          <button type="button" className="icon-button" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <p className="eyebrow">Step {step} / {steps.length}</p>
            <h1>{title}</h1>
          </div>
        </header>

        <div className="progress-track">
          <span style={{ width: `${(step / steps.length) * 100}%` }} />
        </div>

        <div className="page-content">
          {children}
        </div>

        <footer className="page-footer">
          <button type="button" className="primary-button full-width" onClick={onNext}>
            {isFinal ? "Finish profile" : "Next"}
            {isFinal ? <Check size={18} /> : null}
          </button>
        </footer>
      </section>
    </main>
  );
}

export function OnboardingPage() {
  const navigate = useNavigate();
  const { onboardingDraft, setOnboardingDraft, completeOnboarding, session } = useDemoSession();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<ErrorMap>({});

  const data = onboardingDraft;

  const update = (field: keyof OnboardingFormData, value: string | string[]) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setOnboardingDraft({
      ...data,
      [field]: value
    });
  };

  const toggleSkill = (skill: string) => {
    const nextSkills = data.skills.includes(skill)
      ? data.skills.filter((item) => item !== skill)
      : [...data.skills, skill];
    update("skills", nextSkills);
  };

  const validate = (currentStep: number) => {
    const nextErrors: ErrorMap = {};
    const required = "This field is required";

    if (currentStep === 1) {
      if (!data.fullName.trim()) nextErrors.fullName = required;
      if (!data.mobile.trim()) nextErrors.mobile = required;
      if (!data.age.trim()) nextErrors.age = required;
      if (!data.location.trim()) nextErrors.location = required;
    }
    if (currentStep === 2) {
      if (!data.vocationalTraining.trim()) nextErrors.vocationalTraining = required;
    }
    if (currentStep === 3) {
      if (data.skills.length === 0) nextErrors.skills = required;
      if (!data.careerGoal.trim()) nextErrors.careerGoal = required;
    }
    if (currentStep === 5) {
      if (!data.time.trim()) nextErrors.time = required;
      if (!data.hoursPerWeek.trim()) nextErrors.hoursPerWeek = required;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onBack = () => {
    if (step === 1) {
      navigate("/", { replace: true });
      return;
    }
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    if (!validate(step)) return;
    if (step < steps.length) {
      setStep((prev) => prev + 1);
      return;
    }
    completeOnboarding(data);
    navigate("/dashboard", { replace: true });
  };

  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div className="content-card">
            <h2>Let's get to know you</h2>
            <label className="field">
              <span>Full name *</span>
              <input
                value={data.fullName}
                onChange={(event) => update("fullName", event.target.value)}
                placeholder="e.g. Rahim Uddin"
              />
              {errors.fullName ? <small>{errors.fullName}</small> : null}
            </label>
            <label className="field">
              <span>Mobile number *</span>
              <input
                value={data.mobile}
                onChange={(event) => update("mobile", event.target.value)}
                placeholder="01712345678"
              />
              {errors.mobile ? <small>{errors.mobile}</small> : null}
            </label>
            <div className="field-row">
              <label className="field">
                <span>Age *</span>
                <input
                  value={data.age}
                  onChange={(event) => update("age", event.target.value)}
                  placeholder="25"
                />
                {errors.age ? <small>{errors.age}</small> : null}
              </label>
              <label className="field">
                <span>Location *</span>
                <input
                  value={data.location}
                  onChange={(event) => update("location", event.target.value)}
                  placeholder="Dhaka"
                />
                {errors.location ? <small>{errors.location}</small> : null}
              </label>
            </div>
            <div className="section-stack">
              <span className="field-label">Gender</span>
              <div className="choice-grid two-col">
                {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.gender === option}
                    onClick={() => update("gender", option)}
                  />
                ))}
              </div>
            </div>
            <div className="section-stack">
              <span className="field-label">Preferred language</span>
              <div className="choice-grid two-col">
                {["English", "Bangla"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.preferredLanguage === option}
                    onClick={() => update("preferredLanguage", option)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="content-card">
            <h2>Education background</h2>
            <div className="section-stack">
              <span className="field-label">Current education level</span>
              <div className="choice-grid full-width">
                {["None", "Primary", "Secondary", "Higher Secondary", "Graduate"].map(
                  (option) => (
                    <ToggleButton
                      key={option}
                      label={option}
                      selected={data.educationLevel === option}
                      onClick={() => update("educationLevel", option)}
                    />
                  )
                )}
              </div>
            </div>
            <label className="field">
              <span>Any prior vocational training? *</span>
              <input
                value={data.vocationalTraining}
                onChange={(event) => update("vocationalTraining", event.target.value)}
                placeholder="e.g. Sewing course, none"
              />
              {errors.vocationalTraining ? <small>{errors.vocationalTraining}</small> : null}
            </label>
          </div>
        );
      case 3:
        return (
          <div className="content-card">
            <h2>Learning interests</h2>
            <div className="section-stack">
              <span className="field-label">Skills you want to learn *</span>
              <div className="choice-grid two-col">
                {skillOptions.map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.skills.includes(option)}
                    onClick={() => toggleSkill(option)}
                  />
                ))}
              </div>
              {errors.skills ? <small>{errors.skills}</small> : null}
            </div>
            <label className="field">
              <span>Career goal *</span>
              <input
                value={data.careerGoal}
                onChange={(event) => update("careerGoal", event.target.value)}
                placeholder="Start my own tailoring shop"
              />
              {errors.careerGoal ? <small>{errors.careerGoal}</small> : null}
            </label>
            <div className="section-stack">
              <span className="field-label">Current skill level</span>
              <div className="choice-grid full-width">
                {["Beginner", "Intermediate", "Advanced"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.currentSkillLevel === option}
                    onClick={() => update("currentSkillLevel", option)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="content-card">
            <h2>Device and internet access</h2>
            <div className="section-stack">
              <span className="field-label">Access to a smartphone?</span>
              <div className="choice-grid two-col">
                {["Yes", "No"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.smartphone === option}
                    onClick={() => update("smartphone", option)}
                    icon={
                      option === "Yes" ? <Smartphone size={16} /> : <MonitorOff size={16} />
                    }
                  />
                ))}
              </div>
            </div>
            <div className="section-stack">
              <span className="field-label">Access to a laptop/computer?</span>
              <div className="choice-grid two-col">
                {["Yes", "No"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.laptop === option}
                    onClick={() => update("laptop", option)}
                    icon={<Laptop size={16} />}
                  />
                ))}
              </div>
            </div>
            <div className="section-stack">
              <span className="field-label">Internet access?</span>
              <div className="choice-grid two-col">
                {["Yes", "No"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.internet === option}
                    onClick={() => update("internet", option)}
                    icon={option === "Yes" ? <Wifi size={16} /> : <WifiOff size={16} />}
                  />
                ))}
              </div>
            </div>
            <div className="section-stack">
              <span className="field-label">Internet access frequency</span>
              <div className="choice-grid full-width">
                {["Daily", "Intermittent", "Rarely"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.frequency === option}
                    onClick={() => update("frequency", option)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="content-card">
            <h2>Learning preferences</h2>
            <label className="field">
              <span>Available learning time *</span>
              <input
                value={data.time}
                onChange={(event) => update("time", event.target.value)}
                placeholder="Evenings"
              />
              {errors.time ? <small>{errors.time}</small> : null}
            </label>
            <label className="field">
              <span>Hours per week *</span>
              <input
                value={data.hoursPerWeek}
                onChange={(event) => update("hoursPerWeek", event.target.value)}
                placeholder="8 hours"
              />
              {errors.hoursPerWeek ? <small>{errors.hoursPerWeek}</small> : null}
            </label>
            <div className="section-stack">
              <span className="field-label">Need for offline learning?</span>
              <div className="choice-grid two-col">
                {["Yes", "No"].map((option) => (
                  <ToggleButton
                    key={option}
                    label={option}
                    selected={data.offlineNeed === option}
                    onClick={() => update("offlineNeed", option)}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="content-card">
            <h2>Constraints</h2>
            <label className="field">
              <span>Family responsibilities</span>
              <textarea
                value={data.family}
                onChange={(event) => update("family", event.target.value)}
                placeholder="Caring for younger siblings"
              />
            </label>
            <label className="field">
              <span>Work responsibilities</span>
              <textarea
                value={data.work}
                onChange={(event) => update("work", event.target.value)}
                placeholder="Part-time work at home"
              />
            </label>
            <label className="field">
              <span>Barriers to regular learning</span>
              <textarea
                value={data.barriers}
                onChange={(event) => update("barriers", event.target.value)}
                placeholder="Unstable electricity"
              />
            </label>
            <label className="field">
              <span>Accessibility needs</span>
              <textarea
                value={data.accessibility}
                onChange={(event) => update("accessibility", event.target.value)}
                placeholder="Large text required"
              />
            </label>
          </div>
        );
    }
  }, [data, errors, step]);

  if (!session) {
    return null;
  }

  return (
    <OnboardingShell
      step={step}
      title={steps[step - 1]}
      onBack={onBack}
      onNext={onNext}
      isFinal={step === steps.length}
    >
      {renderStep}
    </OnboardingShell>
  );
}
