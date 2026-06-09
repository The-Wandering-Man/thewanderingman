import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Events | The Wandering Man Geelong",
  description:
    "Join us at an upcoming men's mental health event in Geelong. Weekly walks, monthly gatherings, and more.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>
        What's On
      </p>
      <h1 className="text-4xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
        Events in Geelong
      </h1>
      <p className="text-base mb-12" style={{ color: "#6B6B6B" }}>
        All events are free and open to any man who wants to show up. No experience required.
      </p>
      <p className="text-sm" style={{ color: "#6B6B6B" }}>
        Events will appear here once the database is connected. In the meantime,{" "}
        <Link href="/resources" className="underline" style={{ color: "#0D0D0D" }}>
          reach out to us
        </Link>
        .
      </p>
    </div>
  );
}
