import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories | The Wandering Man Geelong",
  description:
    "Articles, interviews, and community stories from The Wandering Man - men's mental health in Geelong.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>
        Stories
      </p>
      <h1 className="text-4xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
        From the community
      </h1>
      <p className="text-base" style={{ color: "#6B6B6B" }}>
        Articles, interviews and community updates will appear here once the database is connected.
      </p>
    </div>
  );
}
