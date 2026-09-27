"use client";

import { useState } from "react";
import { RATING_COLORS } from "@/lib/checkin-stats";

const CONCERNS = [
  "My health",
  "Money or bills",
  "Work or employment",
  "Family",
  "Feeling lonely",
  "A friend or neighbour",
  "Getting around",
  "The house or garden",
  "Sleep",
  "The weather or the cold",
  "Something else",
];

const GRATITUDES = [
  "My family",
  "A good friend",
  "My health",
  "My work",
  "A nice meal",
  "The garden or nature",
  "A visit or phone call",
  "My pet",
  "A bit of good news",
  "Having a roof over my head",
  "A quiet peaceful day",
];

type Status = "idle" | "loading" | "success" | "error";

export default function CheckInForm() {
  const [rating, setRating] = useState<number | null>(null);
  const [concern, setConcern] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === null || !concern || !gratitude) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, concern, gratitude, note: note || null }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16 px-6 max-w-2xl mx-auto">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-8"
          style={{ backgroundColor: "#E8F5E9" }}
          aria-hidden="true"
        >
          🌿
        </div>
        <h2 className="text-4xl font-extrabold mb-6" style={{ color: "#0D0D0D" }}>
          Thank you for checking in.
        </h2>
        <p className="text-2xl leading-relaxed" style={{ color: "#6B6B6B" }}>
          It means a lot that you took a moment to reflect on your week.
          We hope next week brings you peace and connection.
        </p>
        <div
          className="mt-10 w-16 h-1 rounded-full mx-auto"
          style={{ backgroundColor: "#39E75F" }}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-14">
      {/* Header */}
      <div>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#39E75F" }}
        >
          Weekly Check-In
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: "#0D0D0D" }}>
          How are you going?
        </h1>
        <p className="text-xl" style={{ color: "#6B6B6B" }}>
          Three simple questions. Takes about a minute.
        </p>
      </div>

      {/* Q1 — Rating */}
      <fieldset>
        <legend className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: "#0D0D0D" }}>
          How was your week?
        </legend>
        <p className="text-lg mb-6" style={{ color: "#6B6B6B" }}>
          1 = very hard &nbsp;·&nbsp; 10 = wonderful
        </p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
            const isSelected = rating === n;
            const color = RATING_COLORS[n - 1];
            return (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                aria-pressed={isSelected}
                aria-label={`Rating ${n} out of 10`}
                className="rounded-2xl font-extrabold transition-all focus:outline-none focus:ring-4 focus:ring-offset-2"
                style={{
                  minHeight: "64px",
                  fontSize: "1.5rem",
                  backgroundColor: isSelected ? color : "#F8F7F4",
                  color: isSelected ? "#fff" : color,
                  border: `3px solid ${color}`,
                  boxShadow: isSelected ? `0 0 0 4px ${color}33` : undefined,
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Q2 — Concern */}
      <div>
        <label
          htmlFor="concern"
          className="block text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "#0D0D0D" }}
        >
          What was on your mind most this week?
        </label>
        <select
          id="concern"
          required
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          className="w-full rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-green-400"
          style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            padding: "1.25rem 1.5rem",
            border: "2px solid #E2E0DC",
            backgroundColor: "#fff",
            color: concern ? "#0D0D0D" : "#9CA3AF",
          }}
        >
          <option value="">Choose one…</option>
          {CONCERNS.map((c) => (
            <option key={c} value={c} style={{ color: "#0D0D0D" }}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Q3 — Gratitude */}
      <div>
        <label
          htmlFor="gratitude"
          className="block text-2xl sm:text-3xl font-bold mb-4"
          style={{ color: "#0D0D0D" }}
        >
          What are you thankful for this week?
        </label>
        <select
          id="gratitude"
          required
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          className="w-full rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-green-400"
          style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            padding: "1.25rem 1.5rem",
            border: "2px solid #E2E0DC",
            backgroundColor: "#fff",
            color: gratitude ? "#0D0D0D" : "#9CA3AF",
          }}
        >
          <option value="">Choose one…</option>
          {GRATITUDES.map((g) => (
            <option key={g} value={g} style={{ color: "#0D0D0D" }}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Optional note */}
      <div>
        <label
          htmlFor="note"
          className="block text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: "#0D0D0D" }}
        >
          Anything else you&rsquo;d like to share?
        </label>
        <p className="text-lg mb-4" style={{ color: "#6B6B6B" }}>
          Optional — whatever&rsquo;s on your mind.
        </p>
        <textarea
          id="note"
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write anything here…"
          className="w-full rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-400 resize-none"
          style={{
            fontSize: "1.25rem",
            padding: "1.25rem 1.5rem",
            border: "2px solid #E2E0DC",
            backgroundColor: "#fff",
            color: "#0D0D0D",
          }}
        />
      </div>

      {status === "error" && (
        <p className="text-xl font-medium" style={{ color: "#DC2626" }}>
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={rating === null || !concern || !gratitude || status === "loading"}
        className="w-full rounded-2xl text-2xl font-extrabold transition-opacity hover:opacity-90 disabled:opacity-40"
        style={{
          backgroundColor: "#39E75F",
          color: "#0D0D0D",
          padding: "1.5rem",
          minHeight: "72px",
        }}
      >
        {status === "loading" ? "Sending…" : "Submit my check-in"}
      </button>
    </form>
  );
}
