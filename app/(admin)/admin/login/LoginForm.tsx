"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMsg("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none";
  const inputStyle = {
    backgroundColor: "#1A1A1A",
    border: "1px solid #2A2A2A",
    color: "#F8F7F4",
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label
          className="block text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "#6B6B6B" }}
        >
          Email
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          className="block text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: "#6B6B6B" }}
        >
          Password
        </label>
        <input
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          style={inputStyle}
          placeholder="••••••••"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 rounded-full text-sm font-bold mt-2 transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
      >
        {status === "loading" ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
