import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "About | The Wandering Man Geelong - Our Story, Mission & People",
  description:
    "The Wandering Man is a men's mental health peer community born in Geelong, Victoria. Built by men who needed it. Run by men who get it.",
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
    body: "We exist in and for Geelong. Our events are local, our faces are familiar, and our support is grounded in the reality of living and working in this city.",
  },
];

const committee: { initial: string; name: string; role: string; bio?: string }[] = [
  {
    initial: "JH",
    name: "Jamie Hobbs",
    role: "Founder & Community Lead",
    bio: "Jamie started The Wandering Man because he needed it. He's been showing up for Geelong men ever since - in parks, on walking tracks, in workplaces, and wherever the conversation needs to happen.",
  },
  {
    initial: "MH",
    name: "Micheal Hoff",
    role: "Coffee Catch-Up Host",
    bio: "Hoffy is the first face you'll see at the Wednesday Coffee Catch-Up. He makes sure no bloke stands at the door wondering if he's in the right place.",
  },
  { initial: "NP", name: "Neill Price", role: "Committee Member" },
  { initial: "CL", name: "Chris Link", role: "Committee Member" },
  { initial: "RP", name: "Robyn Parmenter", role: "Committee Member" },
  { initial: "MM", name: "Mark Melnyk", role: "Committee Member" },
  { initial: "RB", name: "Ray Booth", role: "Committee Member" },
  { initial: "AE", name: "Abby Ellery", role: "Committee Member" },
  { initial: "AF", name: "Alex Fernandez", role: "Committee Member" },
];

const openRoles = ["Events Coordinator", "Community Support", "Communications", "Event Support"];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <header style={{ background: "#111C16", padding: "72px 28px 80px" }}>
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>Our story</p>
            <h1
              style={{
                margin: "0 0 22px",
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                lineHeight: 1.08,
                color: "#F4F1EA",
                maxWidth: "16ch",
              }}
            >
              Built by men who needed it. Run by men who get it.
            </h1>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "52ch" }}>
              The Wandering Man started with a simple decision: get out of the house, show up, and actually talk. What happened next surprised everyone involved.
            </p>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <Image
              src="/about-hero.png"
              alt="A Wandering Man gathering - men seated in a circle"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              priority
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
        </div>
      </header>

      {/* Why we exist */}
      <section style={{ background: "#F4F1EA", padding: "92px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 20px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Why we exist</h2>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 20, lineHeight: 1.65, color: "#46534A" }}>
            Men&apos;s mental health has long been one of the most underdiscussed crises in Australian communities. Men die by suicide at three times the rate of women. They&apos;re less likely to seek help, less likely to name what they&apos;re feeling, less likely to reach out.
          </p>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 20, lineHeight: 1.65, color: "#46534A" }}>
            The Wandering Man was founded on the belief that the solution isn&apos;t complicated - it&apos;s just hard. Getting men out of isolation and into genuine connection with other men is the most powerful thing we can do.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 20, lineHeight: 1.65, color: "#46534A" }}>
            We started in Geelong with a handful of blokes and the kind of conversation that doesn&apos;t happen at the pub or in a waiting room. Word spread the way it does when something fills a need people didn&apos;t know how to name. Today there&apos;s a rhythm to every week - coffee on Wednesday, a swim on Saturday, a river stroll every other Sunday, BBQs, yoga nights and guest speakers through the year - and we show up in workplaces to help organisations take men&apos;s mental health seriously.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#192821", padding: "72px 28px" }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {[
            { stat: "3x", label: "Men die by suicide at three times the rate of women" },
            { stat: "100+", label: "Geelong men in our community" },
            { stat: "50+", label: "Events held across Geelong" },
            { stat: "0", label: "Barriers to joining - everyone welcome" },
          ].map((item) => (
            <div key={item.stat} style={{ textAlign: "center", padding: "24px 16px" }}>
              <p style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(44px, 5vw, 64px)", lineHeight: 1, color: "#79A886" }}>{item.stat}</p>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.5, color: "#CBD5CB" }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we believe */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "92px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>What we believe</p>
          <h2 style={{ margin: "0 0 44px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>How we show up</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {values.map((v) => (
              <div key={v.heading} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "30px 32px" }}>
                <h3 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.25, color: "#24352B" }}>{v.heading}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The people */}
      <section style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "92px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>The people</p>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Meet the team</h2>
          <p style={{ margin: "0 0 44px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "62ch" }}>The Wandering Man is volunteer-powered. Every event, every walk, every conversation exists because these people choose to show up.</p>

          <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Volunteer Committee</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 44 }}>
            {committee.map((m) => (
              <div key={m.name} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "30px 32px" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#24352B",
                    color: "#79A886",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 700,
                    fontSize: 24,
                    marginBottom: 16,
                  }}
                >
                  {m.initial}
                </div>
                <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.25, color: "#24352B" }}>{m.name}</h3>
                <p style={{ margin: m.bio ? "0 0 10px" : 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.4, color: "#48745A" }}>{m.role}</p>
                {m.bio && <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.55, color: "#5C6B60" }}>{m.bio}</p>}
              </div>
            ))}
          </div>

          <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase" }}>Core team &amp; volunteers</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 44 }}>
            {openRoles.map((role) => (
              <div key={role} style={{ background: "#EDE7D8", border: "1px dashed #C9BC9F", borderRadius: 14, padding: "24px 26px" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#DCD3BE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display), sans-serif",
                    fontWeight: 700,
                    fontSize: 22,
                    color: "#8A7F68",
                    marginBottom: 12,
                  }}
                >
                  ?
                </div>
                <h3 style={{ margin: "0 0 4px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.3, color: "#24352B" }}>Coming soon</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, lineHeight: 1.4, color: "#8A7F68" }}>{role}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#24352B", borderRadius: 14, padding: "34px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: "#F4F1EA" }}>Want to get involved?</h3>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.55, color: "#CBD5CB", maxWidth: "56ch" }}>We&apos;re always looking for good men to help run events and keep the community going. Some of our best volunteers are men who came for themselves and stayed to walk with others. No experience needed. Just willingness.</p>
            </div>
            <Link
              href="/events"
              style={{ background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10, flexShrink: 0 }}
            >
              Come to an event first
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#E6DECC", padding: "80px 28px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>Ready to show up?</h2>
          <p style={{ margin: "0 0 30px auto", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "52ch" }}>You don&apos;t need to be in crisis to come along. You just need to be a man who&apos;s willing to show up. That&apos;s the only qualification.</p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/events" style={{ background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "17px 28px", borderRadius: 10 }}>See upcoming events</Link>
            <Link href="/resources" style={{ border: "1.5px solid #24352B", color: "#24352B", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "17px 28px", borderRadius: 10 }}>Get support now</Link>
          </div>
        </div>
      </section>

      <InlineSponsorAd />
    </>
  );
}
