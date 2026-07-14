import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Help Now | The Wandering Man Geelong",
  description:
    "Crisis lines and mental health resources for men in Geelong and across Australia. If you need help right now, reach out.",
  alternates: { canonical: "/resources" },
};

const resources = [
  { name: "Lifeline", number: "13 11 14", tel: "131114", what: "24/7 crisis support for anyone" },
  { name: "Suicide Call Back Service", number: "1300 659 467", tel: "1300659467", what: "24/7 counselling if you or someone you know is at risk" },
  { name: "MensLine Australia", number: "1300 78 99 78", tel: "1300789978", what: "24/7 support for men, by counsellors who get men" },
  { name: "Beyond Blue", number: "1300 22 4636", tel: "1300224636", what: "24/7 support for anxiety and depression" },
  { name: "StandBy", number: "1300 727 247", tel: "1300727247", what: "Support after losing someone to suicide" },
  { name: "SANE Australia", number: "1800 187 263", tel: "1800187263", what: "Complex mental health support, weekdays 10am–8pm" },
  { name: "Headspace", number: "1800 650 890", tel: "1800650890", what: "Support for young men aged 12–25" },
  { name: "Kids Helpline", number: "1800 55 1800", tel: "1800551800", what: "24/7 for kids and young people 5–25" },
  { name: "ADIS", number: "1800 250 015", tel: "1800250015", what: "24/7 alcohol and other drug support" },
  { name: "QLife", number: "1800 184 527", tel: "1800184527", what: "LGBTIQ+ peer support, 3pm–midnight" },
  { name: "Black Dog Institute", number: "blackdoginstitute.org.au", tel: null, href: "https://www.blackdoginstitute.org.au", what: "Evidence-based tools and self-help resources" },
];

export default function ResourcesPage() {
  return (
    <>
      {/* Immediate help header */}
      <header style={{ background: "#192821", padding: "72px 28px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5vw, 54px)", lineHeight: 1.1, color: "#F4F1EA" }}>
            You&apos;re not alone. Help is one call away.
          </h1>
          <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "56ch" }}>
            These lines are free, confidential, and answered by people who talk men through hard nights every single day. You don&apos;t need the right words - they&apos;ll carry the conversation.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 16 }}>
            <a
              href="tel:131114"
              style={{ textDecoration: "none", background: "#5D8A6C", borderRadius: 14, padding: "26px 28px", display: "flex", flexDirection: "column", gap: 6 }}
            >
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 16, color: "#0F241A", letterSpacing: "0.08em", textTransform: "uppercase" }}>Lifeline · 24/7</span>
              <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 34, lineHeight: 1.1, color: "#111C16" }}>13 11 14</span>
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.4, color: "#0F241A" }}>Anyone, any time, about anything</span>
            </a>
            <a
              href="tel:1300789978"
              style={{ textDecoration: "none", background: "#24352B", border: "1.5px solid #41604F", borderRadius: 14, padding: "26px 28px", display: "flex", flexDirection: "column", gap: 6 }}
            >
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 16, color: "#87988A", letterSpacing: "0.08em", textTransform: "uppercase" }}>MensLine · 24/7</span>
              <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 34, lineHeight: 1.1, color: "#F4F1EA" }}>1300 78 99 78</span>
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.4, color: "#CBD5CB" }}>Counsellors who specialise in men</span>
            </a>
            <a
              href="tel:000"
              style={{ textDecoration: "none", background: "#24352B", border: "1.5px solid #41604F", borderRadius: 14, padding: "26px 28px", display: "flex", flexDirection: "column", gap: 6 }}
            >
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 16, color: "#87988A", letterSpacing: "0.08em", textTransform: "uppercase" }}>Emergency</span>
              <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 34, lineHeight: 1.1, color: "#F4F1EA" }}>000</span>
              <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1.4, color: "#CBD5CB" }}>If a life is in danger right now</span>
            </a>
          </div>
        </div>
      </header>

      {/* What to expect when you call */}
      <section style={{ background: "#F4F1EA", padding: "84px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>What actually happens when you call</h2>
          <p style={{ margin: "0 0 40px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "60ch" }}>Most blokes put this call off because they don&apos;t know what&apos;s on the other end. Here it is, plainly.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {[
              { num: "1", strong: "A real person answers", rest: " - usually within a minute or two. No menus, no bots. They'll ask how you're going, and it's fine if the answer is \"not great\" or nothing at all." },
              { num: "2", strong: "They listen, then help you sort the next step", rest: " - tonight, tomorrow, this week. Nothing happens without your say-so. It's confidential, and you can hang up any time." },
              { num: "3", strong: "You'll feel lighter than you expect.", rest: " Saying it out loud to someone trained to hear it is the whole trick. Thousands of men do it every night. Tonight it can be you." },
            ].map((item) => (
              <div key={item.num} style={{ display: "flex", gap: 20, background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "24px 26px" }}>
                <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, color: "#48745A", flexShrink: 0, paddingTop: 2 }}>{item.num}</span>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A" }}>
                  <strong style={{ color: "#24352B" }}>{item.strong}</strong>{item.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full resources */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "84px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>The right line for the right moment</h2>
          <p style={{ margin: "0 0 40px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "60ch" }}>All free. Most are 24/7. Save one to your phone now - future-you will be glad.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {resources.map((r) => {
              const href = r.tel ? `tel:${r.tel}` : (r as { href?: string }).href ?? "#";
              return (
                <a
                  key={r.name}
                  href={href}
                  target={!r.tel ? "_blank" : undefined}
                  rel={!r.tel ? "noopener noreferrer" : undefined}
                  style={{ textDecoration: "none", background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 12, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 4 }}
                  className="transition-shadow hover:shadow-md"
                >
                  <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: "#24352B" }}>{r.name}</span>
                  <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.3, color: "#48745A" }}>{r.number}</span>
                  <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.5, color: "#5C6B60" }}>{r.what}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Worried about someone */}
      <section id="worried" style={{ background: "#192821", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>For partners, mums &amp; mates</p>
          <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#F4F1EA" }}>Worried about a man in your life?</h2>
          <p style={{ margin: "0 0 36px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "60ch" }}>You don&apos;t have to fix him, and you don&apos;t need the perfect words. You just need to open a door he can walk through.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginBottom: 36 }}>
            {[
              {
                heading: "Start sideways, not head-on",
                body: "Shoulder-to-shoulder beats face-to-face. In the car, on a walk, over a job. \"You haven't seemed yourself lately - what's going on?\" Then let the silence sit.",
              },
              {
                heading: "Don't push. Invite.",
                body: "\"Come to a coffee with me Wednesday\" lands better than \"you should get help.\" Our Coffee Catch-Up exists exactly for this - bring him along, we'll do the rest.",
              },
              {
                heading: "If you're scared for him",
                body: "Ask directly: \"Are you thinking about suicide?\" Asking doesn't plant the idea - it lifts a weight. If yes, stay with him and call Lifeline 13 11 14 together, or 000 if there's immediate danger.",
              },
            ].map((item) => (
              <div key={item.heading} style={{ background: "#24352B", borderRadius: 14, padding: "24px 26px" }}>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: "#F4F1EA" }}>{item.heading}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.55, color: "#CBD5CB" }}>{item.body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/events#coffee-catchup"
            style={{ display: "inline-block", background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}
          >
            Bring him to a coffee →
          </Link>
        </div>
      </section>

      {/* Soft bridge */}
      <section style={{ background: "#E6DECC", padding: "72px 28px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>And when you&apos;re ready - no rush -</h2>
          <p style={{ margin: "0 0 28px auto", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "52ch" }}>
            there&apos;s a coffee on Wednesday (coffee&apos;s on us), a swim on Saturday morning, and a river stroll on Sunday - all with blokes who&apos;ve made calls like that themselves. No sign-up, no story required. Just show up.
          </p>
          <Link
            href="/events"
            style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}
          >
            See what&apos;s on
          </Link>
        </div>
      </section>
    </>
  );
}
