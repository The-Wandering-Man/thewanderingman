import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | The Wandering Man Geelong",
  description:
    "The Wandering Man is a men's mental health community born in Geelong, Victoria. Learn about our story, our mission, and how we show up for each other.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    heading: "No agenda. Just presence.",
    body: "We don't ask men to be fixed or to fix anyone else. We ask them to show up. That's it. The simple act of showing up for each other is where everything begins.",
  },
  {
    heading: "Real conversations.",
    body: "Not rehearsed. Not curated. We make space for men to say the thing they haven't been able to say anywhere else - and to be heard without judgment.",
  },
  {
    heading: "Community, not program.",
    body: "The Wandering Man isn't a course or a therapy group. It's a community. We look out for each other between events, not just during them.",
  },
  {
    heading: "Geelong-rooted.",
    body: "We exist in and for Geelong. Our walks are local, our faces are familiar, and our support is grounded in the reality of living and working in this city.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="The Wandering Man community"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(13,13,13,0.78)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: "#39E75F" }}
          >
            Our Story
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6"
            style={{ color: "#F8F7F4" }}
          >
            Built by men who needed it. Run by men who get it.
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(248,247,244,0.75)" }}>
            The Wandering Man started with a simple decision: get out of the house, go for a walk,
            and actually talk. What happened next surprised everyone involved.
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto">
          <div
            className="w-8 h-1 rounded-full mb-8"
            style={{ backgroundColor: "#39E75F" }}
          />
          <div
            className="prose prose-lg max-w-none"
            style={{ color: "#6B6B6B" }}
          >
            <p className="text-lg leading-relaxed mb-6" style={{ color: "#0D0D0D" }}>
              Men's mental health has long been one of the most underdiscussed crises in Australian
              communities. Men die by suicide at three times the rate of women. They are less likely
              to seek help. Less likely to name what they are feeling. Less likely to reach out.
            </p>
            <p className="leading-relaxed mb-6">
              The Wandering Man was founded on the belief that the solution isn't complicated - it's
              just hard. Getting men out of isolation and into genuine connection with other men is
              the most powerful thing we can do.
            </p>
            <p className="leading-relaxed mb-6">
              We started in Geelong with Saturday morning walks. A few blokes, some fresh air, and
              the kind of conversation that doesn't happen at the pub or in a waiting room. Word
              spread the way it does when something fills a need people didn't know how to name.
            </p>
            <p className="leading-relaxed">
              Today we run regular events across Geelong - walks, gatherings, mindfulness sessions -
              and we show up in workplaces to help organisations take men's mental health seriously.
              All of it traces back to that first walk and the decision to just show up.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-20 border-y"
        style={{ borderColor: "#E2E0DC" }}
      >
        <div className="max-w-5xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#39E75F" }}
          >
            What we believe
          </p>
          <h2
            className="text-3xl font-extrabold mb-14"
            style={{ color: "#0D0D0D" }}
          >
            How we show up
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {values.map((v) => (
              <div key={v.heading}>
                <div
                  className="w-6 h-1 rounded-full mb-4"
                  style={{ backgroundColor: "#39E75F" }}
                />
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#0D0D0D" }}
                >
                  {v.heading}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6B6B6B" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl font-extrabold mb-4"
            style={{ color: "#0D0D0D" }}
          >
            Ready to show up?
          </h2>
          <p className="text-base mb-10" style={{ color: "#6B6B6B" }}>
            You don't need to be in crisis to come along. You just need to be a man who's willing
            to show up. That's the only qualification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
            >
              See Upcoming Events
            </Link>
            <Link
              href="/resources"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium border transition-colors"
              style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}
            >
              Get Support Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
