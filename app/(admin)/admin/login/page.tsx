import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Login | The Wandering Man" };

export default function AdminLoginPage() {
  return (
    <div className="max-w-sm mx-auto px-4 py-24">
      <h1 className="text-2xl font-extrabold mb-8" style={{ color: "#0D0D0D" }}>
        Admin Login
      </h1>
      <p style={{ color: "#6B6B6B" }}>Supabase Auth login — coming soon.</p>
    </div>
  );
}
