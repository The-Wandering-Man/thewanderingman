"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first_name: firstName }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium" style={{ color: "#39E75F" }}>
        You're in. Welcome to the community.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="flex-1 px-4 py-3 rounded-full text-sm border focus:outline-none"
        style={{ borderColor: "#E2E0DC", backgroundColor: "#fff" }}
      />
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-full text-sm border focus:outline-none"
        style={{ borderColor: "#E2E0DC", backgroundColor: "#fff" }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-80 disabled:opacity-50 whitespace-nowrap"
        style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
      >
        {status === "loading" ? "Joining..." : "Join the community"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600 mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
