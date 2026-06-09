import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Admin Dashboard | The Wandering Man" };

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8" style={{ color: "#0D0D0D" }}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          ["New Post", "/admin/posts/new"],
          ["New Event", "/admin/events/new"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block p-6 rounded-2xl border font-bold text-sm hover:shadow-md transition-shadow"
            style={{ borderColor: "#E2E0DC", color: "#0D0D0D" }}
          >
            {label} &rarr;
          </Link>
        ))}
      </div>
    </div>
  );
}
