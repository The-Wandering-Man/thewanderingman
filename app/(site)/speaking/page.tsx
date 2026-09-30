import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SpeakingForm from "./SpeakingForm";

export const metadata: Metadata = {
  title: "Book a Talk - Workplace Men's Mental Health | The Wandering Man Geelong",
  description:
    "Powerful, practical workplace talks on men's mental health. Real men, real stories, practical tools. Every booking funds free community events in Geelong.",
  alternates: { canonical: "/speaking" },
};

export default function SpeakingPage() {
  return (
    <>
      {/* Header */}
      <header style={{ background: "#192821", padding: "80px 28px 72px" }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 44,
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>For organisations · Workplace talks</p>
            <h1
              style={{
                margin: "0 0 20px",
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(34px, 5vw, 54px)",
                lineHeight: 1.1,
                color: "#F4F1EA",
                maxWidth: "18ch",
              }}
            >
              The talk your blokes will still be talking about at smoko.
            </h1>
            <p style={{ margin: "0 0 32px", fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "54ch" }}>
              Real men, real stories, practical tools - not a slideshow of statistics. We come to your workplace and start the conversation your team hasn&apos;t been having. Every booking funds our free community work in Geelong.
            </p>

            <a
              href="mailto:hello@thewanderingman.com.au?subject=Book a talk"
              style={{ display: "inline-block", background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 19, textDecoration: "none", padding: "18px 28px", borderRadius: 10 }}
            >
              Enquire about a booking
            </a>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 360, boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <Image src="/speaking-hero.jpg" alt="A Wandering Man speaker addressing a room of men" fill className="object-cover" style={{ objectPosition: "center 30%" }} sizes="(max-width: 768px) 100vw, 520px" />
          </div>
        </div>
      </header>

      {/* What it delivers */}
      <section style={{ background: "#F4F1EA", padding: "84px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 40px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B", maxWidth: "24ch" }}>What your team walks away with</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              {
                num: "01",
                heading: "Permission to talk",
                body: "A lived-experience story that lands with men who'd never book a seminar on \"wellbeing.\" When one bloke opens up on stage, the room follows.",
              },
              {
                num: "02",
                heading: "Practical tools",
                body: "How to check in on a workmate, what to say when someone's not right, and where the real help lines are - skills your team uses on site, not just at the session.",
              },
              {
                num: "03",
                heading: "A door that stays open",
                body: "Every attendee leaves knowing there's a free weekly community - the coffee, the walks, the BBQs - waiting for them or their mates, long after the talk ends.",
              },
            ].map((item) => (
              <div key={item.num} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "28px 30px" }}>
                <p style={{ margin: "0 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 34, lineHeight: 1, color: "#48745A" }}>{item.num}</p>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.25, color: "#24352B" }}>{item.heading}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "84px 28px" }}>
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 44,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>In good company</h2>
            <p style={{ margin: "0 0 20px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>Our community events have featured speakers who know how to hold a room of men:</p>
            <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                ["Charlie Bezzina", "former homicide detective"],
                ["Steve Hall", "\"The Game Changer\""],
                ["Mark Smith · Damian Bourke", null],
                ["Chill Breathe Revive", "breathwork & cold exposure"],
              ].map(([name, desc]) => (
                <li key={name as string} style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 19, lineHeight: 1.4, color: "#24352B" }}>
                  {name as string}{desc && <span style={{ fontWeight: 400, color: "#5C6B60" }}> - {desc as string}</span>}
                </li>
              ))}
            </ul>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>50+ men at our last community BBQ. A growing, engaged Geelong community your organisation is directly supporting when you book.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: 220 }}>
              <Image src="/10720.jpg" alt="Wandering Man members at a community event" fill className="object-cover" style={{ objectPosition: "center 30%" }} sizes="(max-width: 768px) 100vw, 500px" />
            </div>
            <div style={{ background: "#24352B", borderRadius: 14, padding: "24px 26px" }}>
              <p style={{ margin: "0 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.3, color: "#F4F1EA" }}>How booking works</p>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.55, color: "#CBD5CB" }}>Email us with your team size, industry and preferred dates. We&apos;ll match the right speaker and format - toolbox talk, lunch-and-learn, or event keynote - and quote from there.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#E6DECC", padding: "80px 28px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>Serious about your people? Let&apos;s talk.</h2>
          <p style={{ margin: "0 0 30px auto", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "50ch" }}>One email starts it. And every dollar goes back into free coffees, walks and BBQs for the men of Geelong.</p>
          <a
            href="mailto:hello@thewanderingman.com.au?subject=Book a talk"
            style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 19, textDecoration: "none", padding: "18px 30px", borderRadius: 10 }}
          >
            hello@thewanderingman.com.au
          </a>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquire" style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "84px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>Prefer a form?</p>
          <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>Send us the details</h2>
          <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>Fill in the form and we&apos;ll be in touch within two business days.</p>
          <SpeakingForm />
        </div>
      </section>
    </>
  );
}
