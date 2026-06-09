import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Admin Login | The Wandering Man" };

export default function AdminLoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <div className="w-full max-w-sm">
        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
          The Wandering Man
        </p>
        <h1 className="text-3xl font-extrabold mb-8" style={{ color: "#F8F7F4" }}>
          Admin
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
