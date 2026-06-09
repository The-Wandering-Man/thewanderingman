"use client";

import { useState } from "react";

const TIERS = [
  { value: "gold", label: "Gold - Maximum visibility" },
  { value: "silver", label: "Silver - Strong presence" },
  { value: "bronze", label: "Bronze - Community presence" },
  { value: "community", label: "Community - Show support" },
  { value: "unsure", label: "Not sure yet" },
];

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-offset-1";
const inputStyle = { borderColor: "#E2E0DC", color: "#0D0D0D" };

export default function SponsorEnquiryForm() {
  const [form, setForm] = useState({
    org_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    tier_interest: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/sponsors/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
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
          Enquiry sent
        </h2>
        <p className="text-sm" style={{ color: "#6B6B6B" }}>
          Thanks {form.contact_name}. We'll be in touch with {form.org_name}{" "}
          within a couple of days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#0D0D0D" }}>
          Business name
        </label>
        <input
          required
          className={inputClass}
          style={inputStyle}
          value={form.org_name}
          onChange={(e) => set("org_name", e.target.value)}
          placeholder="Acme Pty Ltd"
        />
      </div>
      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#0D0D0D" }}>
          Your name
        </label>
        <input
          required
          className={inputClass}
          style={inputStyle}
          value={form.contact_name}
          onChange={(e) => set("contact_name", e.target.value)}
          placeholder="Jane Smith"
        />
      </div>
      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#0D0D0D" }}>
          Email
        </label>
        <input
          required
          className={inputClass}
          style={inputStyle}
          type="email"
          value={form.contact_email}
          onChange={(e) => set("contact_email", e.target.value)}
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#0D0D0D" }}>
          Phone (optional)
        </label>
        <input
          className={inputClass}
          style={inputStyle}
          type="tel"
          value={form.contact_phone}
          onChange={(e) => set("contact_phone", e.target.value)}
          placeholder="04xx xxx xxx"
        />
      </div>
      <div>
        <label className="block text-base font-bold mb-2" style={{ color: "#0D0D0D" }}>
          Tier you're interested in
        </label>
        <div className="space-y-2">
          {TIERS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => set("tier_interest", t.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm font-bold text-left transition-all"
              style={{
                borderColor: form.tier_interest === t.value ? "#0D0D0D" : "#E2E0DC",
                backgroundColor: form.tier_interest === t.value ? "#0D0D0D" : "transparent",
                color: form.tier_interest === t.value ? "#39E75F" : "#0D0D0D",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#0D0D0D" }}>
          Anything else you'd like us to know? (optional)
        </label>
        <textarea
          className={inputClass}
          style={{ ...inputStyle, resize: "vertical" }}
          rows={4}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your business and what you'd like to get out of the partnership."
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
      >
        {submitting ? "Sending..." : "Send enquiry"}
      </button>
    </form>
  );
}
