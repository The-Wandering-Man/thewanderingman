"use client";

import { useState } from "react";

export default function SpeakingForm({ initialMessage }: { initialMessage?: string }) {
  const [form, setForm] = useState({
    organisation: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    message: initialMessage ? `${initialMessage}: ` : "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/speaking-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="p-8 rounded-2xl text-center"
        style={{ backgroundColor: "#E8F5E9" }}
      >
        <p className="text-lg font-bold mb-2" style={{ color: "#2E7D32" }}>
          Enquiry received.
        </p>
        <p className="text-sm" style={{ color: "#388E3C" }}>
          We'll be in touch within two business days.
        </p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm border focus:outline-none";
  const inputStyle = { borderColor: "#E2E0DC", backgroundColor: "#fff" };
  const labelStyle = {
    display: "block" as const,
    fontSize: "0.75rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "0.375rem",
    color: "#6B6B6B",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label style={labelStyle}>Organisation *</label>
        <input
          required
          type="text"
          value={form.organisation}
          onChange={(e) => update("organisation", e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="Acme Co."
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input
            required
            type="text"
            value={form.contact_name}
            onChange={(e) => update("contact_name", e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            required
            type="email"
            value={form.contact_email}
            onChange={(e) => update("contact_email", e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="jane@acme.com"
          />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Phone (optional)</label>
        <input
          type="tel"
          value={form.contact_phone}
          onChange={(e) => update("contact_phone", e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="0400 000 000"
        />
      </div>
      <div>
        <label style={labelStyle}>Tell us about your organisation and what you're looking for</label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={inputClass}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="We're a team of 50 in Geelong and we'd love..."
        />
      </div>
      {status === "error" && (
        <p className="text-xs text-red-600">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#3A6B4A", color: "#F8F7F4" }}
      >
        {status === "loading" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
