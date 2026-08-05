import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thewanderingman.com.au";

export const metadata: Metadata = {
  title: "Grovedale Meats - Family Butcher in Grovedale, Geelong | 10% Off",
  description:
    "Grovedale Meats is a family butcher at 13 Peter St, Grovedale - quality cuts, honest prices, and 10% off when you mention The Wandering Man. Gold sponsor of our Geelong men's mental health community.",
  alternates: { canonical: "/sponsors/grovedale-meats" },
  openGraph: {
    title: "Grovedale Meats - Family Butcher in Grovedale, Geelong",
    description:
      "Quality cuts, honest prices, and 10% off when you mention The Wandering Man at the counter.",
    url: `${SITE_URL}/sponsors/grovedale-meats`,
    images: [{ url: `${SITE_URL}/grovedale-bbq.jpg` }],
  },
};

const faqs = [
  {
    q: "Where is Grovedale Meats?",
    a: "13 Peter St, Grovedale - on Geelong's south side, an easy drive from Waurn Ponds, Belmont and Highton.",
  },
  {
    q: "How do I claim the 10% Wandering Man discount?",
    a: "Just mention The Wandering Man at the counter when you pay. No card, no code, no minimum spend - the discount comes off your order on the spot.",
  },
  {
    q: "Do I need to be a Wandering Man member?",
    a: "There's no membership card - The Wandering Man is a free community, not a club. If you know us, mention us. Every mention also shows Grovedale Meats their sponsorship is working.",
  },
  {
    q: "Why does The Wandering Man recommend Grovedale Meats?",
    a: "They donate the snags and burgers at every free community BBQ we run across Geelong. They back our community, so we back them.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Grovedale Meats",
    description:
      "Family butcher in Grovedale, Geelong. Quality cuts, honest prices. Gold sponsor of The Wandering Man men's mental health community.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "13 Peter St",
      addressLocality: "Grovedale",
      addressRegion: "VIC",
      addressCountry: "AU",
    },
    areaServed: "Geelong, Victoria",
    image: `${SITE_URL}/grovedale-bbq.jpg`,
    url: `${SITE_URL}/sponsors/grovedale-meats`,
    makesOffer: {
      "@type": "Offer",
      name: "10% off for The Wandering Man community",
      description:
        "Mention The Wandering Man at the counter for 10% off your order.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Sponsors", item: `${SITE_URL}/sponsors` },
      { "@type": "ListItem", position: 3, name: "Grovedale Meats", item: `${SITE_URL}/sponsors/grovedale-meats` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function GrovedaleMeatsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <header style={{ background: "#192821", padding: "56px 28px 64px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Link href="/sponsors" style={{ display: "inline-block", marginBottom: 24, color: "#87988A", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← All sponsors
          </Link>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, color: "#79A886", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", border: "1.5px solid #79A886", borderRadius: 99, padding: "6px 14px" }}>
                Gold sponsor of The Wandering Man
              </p>
              <h1 style={{ margin: "10px 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.08, color: "#F4F1EA" }}>
                Grovedale Meats
              </h1>
              <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 21, lineHeight: 1.4, color: "#CBD5CB" }}>
                Your local family butcher · 13 Peter St, Grovedale, Geelong
              </p>
              <div style={{ background: "#5D8A6C", borderRadius: 12, padding: "18px 22px", marginBottom: 24 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 21, lineHeight: 1.4, color: "#111C16" }}>
                  10% off when you mention The Wandering Man
                </p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href="https://maps.google.com/?q=13+Peter+St+Grovedale+VIC"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "#F4F1EA", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}
                >
                  Get directions
                </a>
                <Link
                  href="/events#bbqs"
                  style={{ border: "1.5px solid rgba(203,213,203,0.45)", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}
                >
                  See the BBQs they power
                </Link>
              </div>
            </div>
            <div style={{ background: "#1C1C1E", borderRadius: 16, padding: 40, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 220 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/grovedale-logo-wide.png" alt="Grovedale Meats - Quality Butcher, Grovedale Geelong" style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain" }} />
            </div>
          </div>
        </div>
      </header>

      {/* Story */}
      <section style={{ background: "#F4F1EA", padding: "84px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>Locals backing locals</p>
            <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>The butcher behind every Wandering Man BBQ</h2>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>
              At every free community BBQ we run - from Barrabool Hills to Eastern Beach to the footy at McDonald Reserve - the snags and burgers on that grill are donated by Grovedale Meats. No fanfare, no conditions. That&apos;s what backing your community looks like.
            </p>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>
              Quality cuts, honest prices, and a butcher who knows your name. If you&apos;re buying meat anywhere in Geelong, buy it here - and mention The Wandering Man at the counter for 10% off.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/grovedale-bbq.jpg" alt="Grovedale Meats snags on the grill at a Wandering Man community BBQ in Geelong" style={{ width: "100%", height: 340, objectFit: "cover", borderRadius: 16, display: "block" }} />
        </div>
      </section>

      {/* What you'll find */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 12px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>What you&apos;ll find at the counter</h2>
          <p style={{ margin: "0 0 32px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "62ch" }}>
            A proper local butcher shop - the kind where you get served by someone who knows the product and asks how you&apos;re cooking it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              ["Quality cuts", "Beef, lamb, pork and chicken, cut properly and priced honestly."],
              ["Snags & BBQ packs", "The same snags we serve at our community BBQs. Grabbing meat for a crowd? They'll sort you out."],
              ["Advice that's free", "Not sure what to throw on the grill or how much to get? Ask. That's the point of a real butcher."],
            ].map(([title, body]) => (
              <div key={title} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 12, padding: "24px 26px" }}>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 21, lineHeight: 1.25, color: "#24352B" }}>{title}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the discount works */}
      <section style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 32px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>How the 10% community discount works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              ["1", "Head to the shop", "13 Peter St, Grovedale - on Geelong's south side."],
              ["2", "Mention The Wandering Man", "At the counter, when you pay. That's the whole trick."],
              ["3", "10% off your order", "And every mention shows them the community has their back too."],
            ].map(([num, title, body]) => (
              <div key={num} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 12, padding: "24px 26px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#5D8A6C", color: "#111C16", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 14 }}>{num}</div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 21, lineHeight: 1.25, color: "#24352B" }}>{title}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "72px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 32px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>Visiting Grovedale Meats - common questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map((f) => (
              <div key={f.q} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 12, padding: "22px 26px" }}>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: "#24352B" }}>{f.q}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge back to community */}
      <section style={{ background: "#E6DECC", padding: "72px 28px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>Taste their work at the next BBQ</h2>
          <p style={{ margin: "0 auto 28px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "52ch" }}>
            Grovedale Meats helps keep our community BBQs free for every man in Geelong. Come along, have a feed, and see where the sponsorship goes.
          </p>
          <Link href="/events#bbqs" style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}>
            See what&apos;s on
          </Link>
        </div>
      </section>
    </>
  );
}
