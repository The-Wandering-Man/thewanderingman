"use client";

import { useState } from "react";
import type { SignInEvent } from "@/lib/signin-events";

// Same check the route handler runs. Loose on purpose - catch typos, not
// exotic-but-valid addresses. Only applied when an email is entered.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const labelClass = "block text-xs font-bold uppercase tracking-widest mb-2";
const labelStyle = { color: "#87988A" };

// py-4 + 16px text keeps every target well over 44px and stops iOS zooming
// the page when a field takes focus.
const inputClass = "w-full px-4 py-4 rounded-2xl focus:outline-none";
const inputStyle = {
  fontSize: "16px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5DCC9",
  color: "#24352B",
};

export default function SignInForm({
  event = "bbq",
  doneText = "You're signed in. Grab a plate and pull up a seat.",
}: {
  event?: SignInEvent;
  doneText?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    // Nothing is required, but a half-typed email is worth catching.
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      setErrorMsg("That email doesn't look right. Fix it or leave it blank.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/bbq/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, event }),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // Values stay in state, so the form comes back filled in.
        setStatus("idle");
        setErrorMsg(data?.error ?? "Could not sign you in. Try again.");
        return;
      }

      setStatus("done");
    } catch {
      setStatus("idle");
      setErrorMsg("No connection. Check your signal and try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="mt-6 w-full flex flex-col items-center text-center">
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: 56, height: 56, backgroundColor: "#39E75F" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 13l4 4L19 7"
              stroke="#0D1512"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: 1.35,
            color: "#F4F1EA",
          }}
        >
          {doneText}
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="mt-3 text-center" style={{ fontSize: "16px", color: "#87988A" }}>
        Sign in so we know you're here. Nothing's compulsory, but it helps
        us look after everyone (and keeps our insurance happy).
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-7 w-full flex flex-col gap-4">
        <div>
          <label htmlFor="bbq-name" className={labelClass} style={labelStyle}>
            Full name
          </label>
          <input
            id="bbq-name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="bbq-email" className={labelClass} style={labelStyle}>
            Email
          </label>
          <input
            id="bbq-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="bbq-phone" className={labelClass} style={labelStyle}>
            Phone
          </label>
          <input
            id="bbq-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="done"
            placeholder="04xx xxx xxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            style={inputStyle}
          />
        </div>

        {errorMsg && (
          <p role="alert" style={{ fontSize: "14px", color: "#FCA5A5" }}>
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full mt-1 py-4 rounded-full font-bold transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ fontSize: "17px", backgroundColor: "#39E75F", color: "#0D0D0D" }}
        >
          {status === "loading" ? "Signing you in..." : "Sign in"}
        </button>
      </form>
    </>
  );
}
