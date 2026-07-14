import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance & Policies | The Wandering Man Geelong",
  description:
    "The Wandering Man is a volunteer-run incorporated association. Here's how we keep the community safe, honest and well run.",
  alternates: { canonical: "/governance" },
};

const policies = [
  {
    id: "core-values",
    title: "Core Values",
    body: (
      <>
        <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A", maxWidth: "68ch" }}>
          Show Up. Step Up. Stay Connected. We&apos;re a peer community, not a clinical service - we don&apos;t diagnose, treat or counsel. What we offer is presence, honesty and mateship, and we&apos;re upfront about where our role ends and professional help begins.
        </p>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            "Every man is welcome, wherever he's at. Talking is optional; listening counts.",
            "What's shared at an event stays at the event.",
            "No judgment, no fixing, no pressure - and no alcohol at our events.",
          ].map((item) => (
            <li key={item} style={{ display: "flex", gap: 10, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.5, color: "#46534A" }}>
              <span style={{ color: "#48745A", fontWeight: 700, flex: "none" }}>·</span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A", maxWidth: "68ch" }}>
        We collect the minimum we need - your name and email if you join the newsletter, nothing more. We never sell or share your details, we don&apos;t track you around the web, and photos from events are only published with the permission of the men in them. Want your details or a photo removed? Email us and it&apos;s done.
      </p>
    ),
  },
  {
    id: "child-safety",
    title: "Child Safety & Wellbeing",
    body: (
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A", maxWidth: "68ch" }}>
        Kids are welcome at our family-friendly events like community BBQs, and their safety comes first. We are committed to the Victorian Child Safe Standards: committee members and regular volunteers hold Working with Children Checks, and any concern about a child&apos;s safety is acted on immediately.
      </p>
    ),
  },
  {
    id: "whs",
    title: "Workplace Health & Safety",
    body: (
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A", maxWidth: "68ch" }}>
        Our events are run with care: risk assessments for BBQs and fundraisers, food-safety practice on the grill, and clear expectations for volunteers. Water-based activities like the Wandering Swim are always optional, at your own assessment, and never run alone.
      </p>
    ),
  },
  {
    id: "whistleblower",
    title: "Whistleblower",
    body: (
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A", maxWidth: "68ch" }}>
        If something&apos;s not right - conduct, money, safety - we want to know, and raising it will never cost you your place in the community. Concerns can be raised with any committee member or in writing to{" "}
        <a href="mailto:hello@thewanderingman.com.au?subject=Confidential" style={{ color: "#3C6349", fontWeight: 600 }}>
          hello@thewanderingman.com.au
        </a>
        , and will be handled confidentially.
      </p>
    ),
  },
  {
    id: "governing-rules",
    title: "Governing Rules",
    body: (
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#46534A", maxWidth: "68ch" }}>
        The Wandering Man Inc. is an incorporated association governed by a volunteer committee under our rules of association, with an annual general meeting open to members. Sponsorship funds go to community events - coffees, BBQs, fundraising costs - and the books are presented to members each year.
      </p>
    ),
  },
];

export default function GovernancePage() {
  return (
    <>
      {/* Hero */}
      <header style={{ background: "#192821", padding: "72px 28px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>How we run things</p>
          <h1 style={{ margin: "0 0 20px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1, color: "#F4F1EA" }}>Governance &amp; Policies</h1>
          <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontSize: 20, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "58ch" }}>
            The Wandering Man is a volunteer-run incorporated association. We take the trust men place in us seriously - here&apos;s how we keep the community safe, honest and well run.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#87988A" }}>
            The Wandering Man Inc. · ABN 707 257 545 13 · Geelong, Victoria
          </p>
        </div>
      </header>

      {/* Policies */}
      <section style={{ background: "#F4F1EA", padding: "72px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          {policies.map((policy) => (
            <div
              key={policy.id}
              id={policy.id}
              style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "32px 34px", scrollMarginTop: 80 }}
            >
              <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.2, color: "#24352B" }}>{policy.title}</h2>
              {policy.body}
            </div>
          ))}

          <div style={{ background: "#E6DECC", borderRadius: 14, padding: "26px 30px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#5C4F3A", maxWidth: "58ch" }}>
              These are plain-English summaries. Full policy documents are being migrated from our current site - email us for a copy of any policy in the meantime.
            </p>
            <a
              href="mailto:hello@thewanderingman.com.au?subject=Policy request"
              style={{ background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10, flexShrink: 0 }}
            >
              Request a policy
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
