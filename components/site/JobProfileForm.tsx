"use client";

import { useState } from "react";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface FormData {
  first_name: string;
  last_initial: string;
  suburb: string;
  headline: string;
  skills_raw: string;
  years_experience: string;
  work_history: string;
  achievements: string;
  looking_for: string;
  contact_email: string;
  contact_phone: string;
}

const EMPTY: FormData = {
  first_name: "",
  last_initial: "",
  suburb: "",
  headline: "",
  skills_raw: "",
  years_experience: "",
  work_history: "",
  achievements: "",
  looking_for: "",
  contact_email: "",
  contact_phone: "",
};

const LOOKING_FOR_OPTIONS = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "casual", label: "Casual" },
  { value: "any", label: "Open to anything" },
];

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <label
        className="block text-base font-bold mb-1"
        style={{ color: "#0D0D0D" }}
      >
        {label}
      </label>
      {hint && (
        <p className="text-sm mb-3" style={{ color: "#6B6B6B" }}>
          {hint}
        </p>
      )}
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-offset-1";
const inputStyle = { borderColor: "#E2E0DC", color: "#0D0D0D" };

export default function JobProfileForm() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/jobs/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div
        className="rounded-2xl border p-10 text-center"
        style={{ borderColor: "#E2E0DC" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
          style={{ backgroundColor: "#39E75F" }}
        >
          ✓
        </div>
        <h2 className="text-xl font-extrabold mb-3" style={{ color: "#0D0D0D" }}>
          Profile submitted
        </h2>
        <p className="text-sm" style={{ color: "#6B6B6B" }}>
          Thanks {form.first_name}. We'll review it and have you live within 24
          hours. Check back on the job board soon.
        </p>
      </div>
    );
  }

  const totalSteps = 5;
  const progress = Math.round(((step - 1) / totalSteps) * 100);

  return (
    <div>
      {/* Progress bar */}
      <div
        className="w-full h-1.5 rounded-full mb-8"
        style={{ backgroundColor: "#E2E0DC" }}
      >
        <div
          className="h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, backgroundColor: "#39E75F" }}
        />
      </div>

      {step === 1 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>
            Step 1 of {totalSteps} — About you
          </p>
          <Field label="What's your first name?">
            <input
              className={inputClass}
              style={inputStyle}
              value={form.first_name}
              onChange={(e) => set("first_name", e.target.value)}
              placeholder="Tony"
              autoFocus
            />
          </Field>
          <Field
            label="Last initial"
            hint='We only show your last initial on the board, e.g. "Tony S." — keeps it private.'
          >
            <input
              className={inputClass}
              style={inputStyle}
              value={form.last_initial}
              onChange={(e) => set("last_initial", e.target.value.slice(0, 1).toUpperCase())}
              placeholder="S"
              maxLength={1}
            />
          </Field>
          <Field label="What suburb are you in?">
            <input
              className={inputClass}
              style={inputStyle}
              value={form.suburb}
              onChange={(e) => set("suburb", e.target.value)}
              placeholder="Geelong West"
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>
            Step 2 of {totalSteps} — Your skills
          </p>
          <Field
            label="What type of work are you looking for?"
            hint="Write a short sentence that describes what you do and what you're after."
          >
            <input
              className={inputClass}
              style={inputStyle}
              value={form.headline}
              onChange={(e) => set("headline", e.target.value)}
              placeholder="Experienced plumber looking for full-time work in Geelong"
              autoFocus
            />
          </Field>
          <Field
            label="What are your main skills?"
            hint="Separate each one with a comma. Keep it practical - what would an employer search for?"
          >
            <input
              className={inputClass}
              style={inputStyle}
              value={form.skills_raw}
              onChange={(e) => set("skills_raw", e.target.value)}
              placeholder="Plumbing, pipe fitting, drainage, hot water systems"
            />
          </Field>
          <Field label="How many years of experience do you have?">
            <input
              className={inputClass}
              style={inputStyle}
              type="number"
              min={0}
              max={60}
              value={form.years_experience}
              onChange={(e) => set("years_experience", e.target.value)}
              placeholder="20"
            />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>
            Step 3 of {totalSteps} — Your history
          </p>
          <Field
            label="Where have you worked and what did you do?"
            hint="No need to be formal. Just tell us who you worked for and what you were doing. 2-3 sentences is fine."
          >
            <textarea
              className={inputClass}
              style={{ ...inputStyle, resize: "vertical" }}
              rows={5}
              value={form.work_history}
              onChange={(e) => set("work_history", e.target.value)}
              placeholder="Worked at ABC Plumbing for 12 years doing commercial fit-outs. Before that spent 8 years at a building company handling all the wet areas on new homes."
              autoFocus
            />
          </Field>
          <Field
            label="What's something you're proud of in your career?"
            hint="Could be a big project, something you built, a team you led - anything."
          >
            <textarea
              className={inputClass}
              style={{ ...inputStyle, resize: "vertical" }}
              rows={4}
              value={form.achievements}
              onChange={(e) => set("achievements", e.target.value)}
              placeholder="Led the plumbing on a 40-unit apartment complex in Newtown - biggest job I'd ever done and we finished ahead of schedule."
            />
          </Field>
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>
            Step 4 of {totalSteps} — What you're after
          </p>
          <Field label="What type of work are you open to?">
            <div className="grid grid-cols-2 gap-3">
              {LOOKING_FOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set("looking_for", opt.value)}
                  className="rounded-xl border px-4 py-4 text-sm font-bold text-left transition-all"
                  style={{
                    borderColor:
                      form.looking_for === opt.value ? "#0D0D0D" : "#E2E0DC",
                    backgroundColor:
                      form.looking_for === opt.value ? "#0D0D0D" : "transparent",
                    color:
                      form.looking_for === opt.value ? "#39E75F" : "#0D0D0D",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}

      {step === 5 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>
            Step 5 of {totalSteps} — How to reach you
          </p>
          <p className="text-sm mb-6" style={{ color: "#6B6B6B" }}>
            Your contact details are private. We only share them if an employer
            specifically asks, and only with your permission.
          </p>
          <Field label="Email address">
            <input
              className={inputClass}
              style={inputStyle}
              type="email"
              value={form.contact_email}
              onChange={(e) => set("contact_email", e.target.value)}
              placeholder="tony@example.com"
              autoFocus
            />
          </Field>
          <Field label="Phone number (optional)">
            <input
              className={inputClass}
              style={inputStyle}
              type="tel"
              value={form.contact_phone}
              onChange={(e) => set("contact_phone", e.target.value)}
              placeholder="04xx xxx xxx"
            />
          </Field>
          {error && (
            <p className="text-sm text-red-600 mb-4">{error}</p>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="text-sm font-medium underline underline-offset-2 hover:opacity-70"
            style={{ color: "#6B6B6B" }}
          >
            Back
          </button>
        ) : (
          <span />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) as Step)}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0D0D0D", color: "#39E75F" }}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
          >
            {submitting ? "Submitting..." : "Submit my profile"}
          </button>
        )}
      </div>
    </div>
  );
}
