import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Sponsors - Grovedale Meats & more | The Wandering Man, Geelong",
  description:
    "Local sponsors who keep our community events free for every man in Geelong. Back them the way they back us.",
  alternates: { canonical: "/sponsors" },
};

export default function SponsorsPage() {
  return (
    <>
      {/* Header */}
      <header style={{ background: "#192821", padding: "72px 28px 64px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>Our sponsors · Locals backing locals</p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.1, color: "#F4F1EA", maxWidth: "20ch" }}>Every free swim, coffee and BBQ has a local business behind it.</h1>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "58ch" }}>Our sponsors keep community events free for every man in Geelong. Back them the way they back us - and mention The Wandering Man when you do.</p>
        </div>
      </header>

      {/* Grovedale Meats - Gold */}
      <section id="grovedale-meats" style={{ background: "#F4F1EA", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center", marginBottom: 28 }}>
            <div>
              <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", border: "1.5px solid #79A886", borderRadius: 99, padding: "6px 14px" }}>Gold sponsor</p>
              <h2 style={{ margin: "10px 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.4vw, 46px)", lineHeight: 1.12, color: "#24352B" }}>Grovedale Meats</h2>
              <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 20, lineHeight: 1.4, color: "#41604F" }}>Your local family butcher · 13 Peter St, Grovedale</p>
              <div style={{ background: "#5D8A6C", borderRadius: 12, padding: "18px 22px", marginBottom: 18 }}>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.4, color: "#111C16" }}>10% off when you mention The Wandering Man</p>
              </div>
              <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}><strong style={{ color: "#24352B" }}>Why they back us:</strong> at every community BBQ we run, Grovedale Meats donates the snags and burgers on that grill. No fanfare, no conditions. That&apos;s what backing your community looks like.</p>
              <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}>Quality cuts, honest prices, and a butcher who knows your name. If you&apos;re buying meat in Geelong, buy it here.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                <a href="https://maps.google.com/?q=13+Peter+St+Grovedale+VIC" target="_blank" rel="noopener noreferrer" style={{ background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}>Get directions</a>
                <Link href="/events#bbqs" style={{ border: "1.5px solid #24352B", color: "#24352B", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}>See the BBQs they power</Link>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ height: 200, borderRadius: 16, background: "#1C1C1E", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/grovedale-logo-wide.png" alt="Grovedale Meats - Quality Butcher" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/grovedale-bbq.jpg" alt="Grovedale Meats snags on the grill at a Wandering Man BBQ" style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16, display: "block" }} />
            </div>
          </div>
        </div>
      </section>

      {/* APCO Foundation - Gold */}
      <section id="apco-foundation" style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", border: "1.5px solid #79A886", borderRadius: 99, padding: "6px 14px" }}>Gold sponsor</p>
            <h2 style={{ margin: "10px 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>APCO Foundation</h2>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 20, lineHeight: 1.4, color: "#41604F" }}>Fuel for a Cause · Geelong</p>
            <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}><strong style={{ color: "#24352B" }}>Why they back us:</strong> the APCO Foundation channels support into local causes across the Geelong region - and men&apos;s wellbeing is one of them. Their backing helps keep every coffee, BBQ and community day free.</p>
            <a href="https://www.apcofoundation.org.au" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}>Visit the APCO Foundation</a>
          </div>
          <div style={{ height: 280, borderRadius: 16, background: "#FFFFFF", border: "1px solid #E5DCC9", display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/apco-logo.png" alt="APCO Foundation - Fuel for a Cause" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
        </div>
      </section>

      {/* MC Labour - Silver */}
      <section id="mc-labour" style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "84px 28px", scrollMarginTop: 70 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 44, alignItems: "center" }}>
          <div style={{ height: 280, borderRadius: 16, background: "#FFFFFF", border: "1px solid #E5DCC9", display: "flex", alignItems: "center", justifyContent: "center", padding: 32, order: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mclabour-logo.png" alt="MC Labour" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, color: "#87988A", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", border: "1.5px solid #ABB9AE", borderRadius: 99, padding: "6px 14px" }}>Silver sponsor</p>
            <h2 style={{ margin: "10px 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.15, color: "#24352B" }}>MC Labour</h2>
            <p style={{ margin: "0 0 18px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 20, lineHeight: 1.4, color: "#41604F" }}>Labour hire &amp; workforce solutions · Victoria</p>
            <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#46534A", maxWidth: "56ch" }}><strong style={{ color: "#24352B" }}>Why they back us:</strong> MC Labour puts blokes on the tools every day - and they know the industries where men do it toughest. Backing The Wandering Man is how they back the ones doing it tough off the clock too.</p>
            <a href="https://www.mclabour.com.au" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}>Visit MC Labour</a>
          </div>
        </div>
      </section>

      {/* indie lime */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "84px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div id="indie-lime" style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 16, padding: "32px 34px", scrollMarginTop: 70, maxWidth: 560 }}>
            <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 13, color: "#8A7F68", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", border: "1.5px solid #C9BC9F", borderRadius: 99, padding: "5px 12px" }}>Sponsor</p>
            <h2 style={{ margin: "8px 0 6px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: "#24352B" }}>indie lime</h2>
            <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 18, lineHeight: 1.4, color: "#41604F" }}>Design &amp; print · Geelong</p>
            <p style={{ margin: "0 0 16px", fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A" }}>Designs and prints the flyers and banners that get blokes through the door - including the ones that probably got you here.</p>
          </div>
        </div>
      </section>

      {/* Become a sponsor */}
      <section style={{ background: "#24352B", padding: "84px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#F4F1EA" }}>Sponsorship that actually sells for you</h2>
          <p style={{ margin: "0 0 40px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "62ch" }}>
            Not a logo on a banner. Every sponsor gets a fast, search-optimised landing page on our site, rotating placements across the site weighted by tier, and a report of the impressions and clicks we send you.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18, marginBottom: 36 }}>
            {[
              { tier: "Gold", desc: "Top rotation weight, premium placements, full landing page with your offer, story and photos.", borderColor: "#79A886", labelColor: "#79A886" },
              { tier: "Silver", desc: "Regular rotation, standard placements, landing page with your story and link.", borderColor: "#ABB9AE", labelColor: "#CBD5CB" },
              { tier: "Bronze", desc: "Entry rotation and a listing here - a genuine, affordable way to back the community.", borderColor: "#8A6E4B", labelColor: "#D9B48A" },
            ].map((item) => (
              <div key={item.tier} style={{ background: "#2E4136", border: `1.5px solid ${item.borderColor}`, borderRadius: 14, padding: "26px 28px" }}>
                <p style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.2, color: item.labelColor }}>{item.tier}</p>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#CBD5CB" }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <a
            href="mailto:hello@thewanderingman.com.au?subject=Sponsorship enquiry"
            style={{ display: "inline-block", background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "17px 28px", borderRadius: 10 }}
          >
            Become a sponsor
          </a>
        </div>
      </section>
    </>
  );
}
