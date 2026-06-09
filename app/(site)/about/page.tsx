import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | The Wandering Man Geelong",
  description:
    "Learn about The Wandering Man - a men's mental health community born in Geelong, Victoria, built on real conversations and genuine connection.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>
        Our Story
      </p>
      <h1 className="text-4xl font-extrabold mb-6" style={{ color: "#0D0D0D" }}>
        About The Wandering Man
      </h1>
      <p className="text-lg leading-relaxed mb-6" style={{ color: "#6B6B6B" }}>
        The Wandering Man started with a simple idea: get men out of the house, into nature, and
        talking honestly about their lives. What began as a Saturday morning walk in Geelong grew
        into a community that now shows up for each other every week.
      </p>
      <p className="text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
        We believe men's mental health isn't a niche issue - it's central to the health of every
        family, workplace, and community. We're here to change that, one conversation at a time.
      </p>
    </div>
  );
}
