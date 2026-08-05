"use client";

import { useState } from "react";

interface FormData {
  business_name: string;
  owner_first_name: string;
  owner_last_initial: string;
  category: string;
  description: string;
  suburb: string;
  phone: string;
  email: string;
  website_url: string;
}

const EMPTY: FormData = {
  business_name: "",
  owner_first_name: "",
  owner_last_initial: "",
  category: "",
  description: "",
  suburb: "",
  phone: "",
  email: "",
  website_url: "",
};

const CATEGORIES = [
  { value: "trades", label: "Trades" },
  { value: "services", label: "Services" },
  { value: "retail", label: "Retail" },
  { value: "food", label: "Food & Hospitality" },
  { value: "health", label: "Health & Wellbeing" },
  { value: "other", label: "Other" },
];

const inputClass =
  "w-full rounded-xl border px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-offset-1";
const inputStyle = { borderColor: "#E5DCC9", color: "#24352B", backgroundColor: "#FFFFFF" };

export default function BusinessListForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/businesses/register", {
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
        style={{ borderColor: "#E5DCC9", backgroundColor: "#FFFFFF" }}
      >
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
          style={{ backgroundColor: "#5D8A6C", color: "#111C16" }}
        >
          ✓
        </div>
        <h2 className="text-xl font-extrabold mb-3" style={{ color: "#24352B" }}>
          Business submitted
        </h2>
        <p className="text-sm" style={{ color: "#5C6B60" }}>
          Thanks {form.owner_first_name}. We'll have a look and get{" "}
          {form.business_name} live in the directory within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
          Business name
        </label>
        <input
          required
          className={inputClass}
          style={inputStyle}
          value={form.business_name}
          onChange={(e) => set("business_name", e.target.value)}
          placeholder="ABC Plumbing"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
            Your first name
          </label>
          <input
            required
            className={inputClass}
            style={inputStyle}
            value={form.owner_first_name}
            onChange={(e) => set("owner_first_name", e.target.value)}
            placeholder="Tony"
          />
        </div>
        <div>
          <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
            Last initial
          </label>
          <input
            required
            className={inputClass}
            style={inputStyle}
            value={form.owner_last_initial}
            onChange={(e) => set("owner_last_initial", e.target.value.slice(0, 1).toUpperCase())}
            placeholder="S"
            maxLength={1}
          />
        </div>
      </div>

      <div>
        <label className="block text-base font-bold mb-2" style={{ color: "#24352B" }}>
          Category
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => set("category", cat.value)}
              className="rounded-xl border px-4 py-3 text-sm font-bold text-left transition-all"
              style={{
                borderColor: form.category === cat.value ? "#24352B" : "#E5DCC9",
                backgroundColor: form.category === cat.value ? "#24352B" : "transparent",
                color: form.category === cat.value ? "#F4F1EA" : "#24352B",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
          Suburb
        </label>
        <input
          className={inputClass}
          style={inputStyle}
          value={form.suburb}
          onChange={(e) => set("suburb", e.target.value)}
          placeholder="Geelong West"
        />
      </div>

      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
          Tell us about your business
        </label>
        <p className="text-sm mb-2" style={{ color: "#5C6B60" }}>
          What do you do? Who do you help? Keep it honest and straightforward.
        </p>
        <textarea
          required
          className={inputClass}
          style={{ ...inputStyle, resize: "vertical" }}
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="We do residential and commercial plumbing across Geelong. Family-run, been at it for 15 years."
        />
      </div>

      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
          Phone
        </label>
        <input
          className={inputClass}
          style={inputStyle}
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
          placeholder="04xx xxx xxx"
        />
      </div>

      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
          Email
        </label>
        <input
          required
          className={inputClass}
          style={inputStyle}
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="tony@example.com"
        />
      </div>

      <div>
        <label className="block text-base font-bold mb-1" style={{ color: "#24352B" }}>
          Website (optional)
        </label>
        <input
          className={inputClass}
          style={inputStyle}
          type="url"
          value={form.website_url}
          onChange={(e) => set("website_url", e.target.value)}
          placeholder="https://abcplumbing.com.au"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#5D8A6C", color: "#111C16" }}
      >
        {submitting ? "Submitting..." : "Submit my business"}
      </button>
    </form>
  );
}
