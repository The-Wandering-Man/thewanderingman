import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | The Wandering Man Geelong",
  description:
    "The Wandering Man is a men's mental health community born in Geelong, Victoria. Learn about our story, our mission, and the people who keep it running.",
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

// Org chart data — update names/roles/photos as needed
const ORG: {
  tier: string;
  members: { name: string; role: string; initials: string; bio?: string }[];
}[] = [
  {
    tier: "Leadership",
    members: [
      {
        name: "Jamie",
        role: "Founder & Community Lead",
        initials: "J",
        bio: "Jamie started The Wandering Man because he needed it. He's been showing up for Geelong men ever since — in parks, on walking tracks, in workplaces, and wherever the conversation needs to happen.",
      },
    ],
  },
  {
    tier: "Core Team",
    members: [
      {
        name: "Team Member",
        role: "Events Coordinator",
        initials: "?",
      },
      {
        name: "Team Member",
        role: "Community Support",
        initials: "?",
      },
      {
        name: "Team Member",
        role: "Communications",
        initials: "?",
      },
    ],
  },
  {
    tier: "Volunteers",
    members: [
      {
        name: "Volunteer",
        role: "Walk Leader",
        initials: "?",
      },
      {
        name: "Volunteer",
        role: "Walk Leader",
        initials: "?",
      },
      {
        name: "Volunteer",
        role: "Event Support",
        initials: "?",
      },
      {
        name: "Volunteer",
        role: "Event Support",
        initials: "?",
      },
    ],
  },
];

function TeamCard({
  name,
  role,
  initials,
  bio,
  large = false,
}: {
  name: string;
  role: string;
  initials: string;
  bio?: string;
  large?: boolean;
}) {
  const isPlaceholder = initials === "?";
  return (
    <div
      className={`flex flex-col items-center text-center rounded-2xl border p-6 ${large ? "p-8" : ""}`}
      style={{ borderColor: "#E2E0DC" }}
    >
      {/* Avatar */}
      <div
        className={`rounded-full flex items-center justify-center mb-4 font-extrabold ${large ? "w-24 h-24 text-2xl" : "w-16 h-16 text-lg"}`}
        style={{
          backgroundColor: isPlaceholder ? "#E2E0DC" : "#0D0D0D",
          color: isPlaceholder ? "#6B6B6B" : "#39E75F",
          border: isPlaceholder ? "2px dashed #C5C3BF" : "none",
        }}
      >
        {isPlaceholder ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="#9CA3AF" strokeWidth="1.5" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          initials
        )}
      </div>
      <p
        className={`font-extrabold ${large ? "text-xl" : "text-base"}`}
        style={{ color: isPlaceholder ? "#9CA3AF" : "#0D0D0D" }}
      >
        {isPlaceholder ? "Coming soon" : name}
      </p>
      <p
        className="text-xs font-bold uppercase tracking-widest mt-1"
        style={{ color: isPlaceholder ? "#C5C3BF" : "#39E75F" }}
      >
        {role}
      </p>
      {bio && !isPlaceholder && (
        <p className="text-sm leading-relaxed mt-4 max-w-xs" style={{ color: "#6B6B6B" }}>
          {bio}
        </p>
      )}
    </div>
  );
}

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
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,13,13,0.78)" }} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#39E75F" }}>
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6" style={{ color: "#F8F7F4" }}>
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
          <div className="w-8 h-1 rounded-full mb-8" style={{ backgroundColor: "#39E75F" }} />
          <div className="space-y-6">
            <p className="text-lg leading-relaxed" style={{ color: "#0D0D0D" }}>
              Men's mental health has long been one of the most underdiscussed crises in Australian
              communities. Men die by suicide at three times the rate of women. They are less likely
              to seek help. Less likely to name what they are feeling. Less likely to reach out.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
              The Wandering Man was founded on the belief that the solution isn't complicated - it's
              just hard. Getting men out of isolation and into genuine connection with other men is
              the most powerful thing we can do.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
              We started in Geelong with Saturday morning walks. A few blokes, some fresh air, and
              the kind of conversation that doesn't happen at the pub or in a waiting room. Word
              spread the way it does when something fills a need people didn't know how to name.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
              Today we run regular events across Geelong - walks, gatherings, mindfulness sessions -
              and we show up in workplaces to help organisations take men's mental health seriously.
              All of it traces back to that first walk and the decision to just show up.
            </p>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 border-y" style={{ borderColor: "#E2E0DC", backgroundColor: "#F8F7F4" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { stat: "3x", label: "Men die by suicide at 3 times the rate of women" },
            { stat: "100+", label: "Geelong men in our community" },
            { stat: "50+", label: "Events held across Geelong" },
            { stat: "0", label: "Barriers to joining - everyone welcome" },
          ].map((item) => (
            <div key={item.stat}>
              <p className="text-4xl font-extrabold mb-2" style={{ color: "#0D0D0D" }}>
                {item.stat}
              </p>
              <p className="text-xs leading-snug" style={{ color: "#6B6B6B" }}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-b" style={{ borderColor: "#E2E0DC" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
            What we believe
          </p>
          <h2 className="text-3xl font-extrabold mb-14" style={{ color: "#0D0D0D" }}>
            How we show up
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {values.map((v) => (
              <div key={v.heading}>
                <div className="w-6 h-1 rounded-full mb-4" style={{ backgroundColor: "#39E75F" }} />
                <h3 className="text-lg font-bold mb-2" style={{ color: "#0D0D0D" }}>
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

      {/* Team / Org chart */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-b" style={{ borderColor: "#E2E0DC" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
            The people
          </p>
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
            Meet the team
          </h2>
          <p className="text-base mb-14 max-w-xl" style={{ color: "#6B6B6B" }}>
            The Wandering Man is volunteer-powered. Every event, every walk, every conversation
            exists because these people choose to show up.
          </p>

          {ORG.map((tier, ti) => (
            <div key={tier.tier} className={ti < ORG.length - 1 ? "mb-14" : ""}>
              {/* Tier label */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: "#6B6B6B" }}
                >
                  {tier.tier}
                </span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#E2E0DC" }} />
              </div>

              {/* Connector line from leadership to core */}
              {ti === 0 && (
                <div className="flex justify-center mb-0">
                  <div className="w-px h-8" style={{ backgroundColor: "#E2E0DC" }} />
                </div>
              )}

              <div
                className={`grid gap-5 ${
                  tier.members.length === 1
                    ? "grid-cols-1 max-w-xs mx-auto"
                    : tier.members.length <= 3
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-4"
                }`}
              >
                {tier.members.map((m, i) => (
                  <TeamCard
                    key={i}
                    name={m.name}
                    role={m.role}
                    initials={m.initials}
                    bio={m.bio}
                    large={tier.tier === "Leadership"}
                  />
                ))}
              </div>

              {/* Connector from leadership */}
              {ti === 0 && (
                <div className="flex justify-center mt-0">
                  <div className="w-px h-8" style={{ backgroundColor: "#E2E0DC" }} />
                </div>
              )}
            </div>
          ))}

          <div
            className="rounded-2xl border border-dashed p-8 text-center mt-6"
            style={{ borderColor: "#C5C3BF" }}
          >
            <p className="text-base font-bold mb-2" style={{ color: "#0D0D0D" }}>
              Want to get involved?
            </p>
            <p className="text-sm mb-5" style={{ color: "#6B6B6B" }}>
              We're always looking for good men to help run events, lead walks, and keep the
              community going. No experience needed. Just willingness.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
            >
              Come to an event first
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4" style={{ color: "#0D0D0D" }}>
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
