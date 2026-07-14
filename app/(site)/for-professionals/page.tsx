import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For Professionals - Referral Information | The Wandering Man Geelong",
  description:
    "Is it appropriate to refer someone to The Wandering Man? Straight answer: we're a peer community, not a clinical service. Right for emotionally stable men ready to take a step toward connection.",
  alternates: { canonical: "/for-professionals" },
};

export default function ForProfessionalsPage() {
  return (
    <>
      {/* Header */}
      <header style={{ background: "#F4F1EA", borderBottom: "1px solid #E5DCC9", padding: "72px 28px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#48745A", letterSpacing: "0.16em", textTransform: "uppercase" }}>For professionals · Referral information</p>
          <h1 style={{ margin: "0 0 20px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.6vw, 50px)", lineHeight: 1.12, color: "#24352B", maxWidth: "22ch" }}>
            Is it appropriate to refer someone to us? Here&apos;s the straight answer.
          </h1>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 20, lineHeight: 1.6, color: "#46534A", maxWidth: "62ch" }}>
            <strong style={{ color: "#24352B" }}>The Wandering Man is a peer community, not a clinical or therapy service.</strong> We are men supporting men through shared experience - regular, low-barrier social connection with an explicit wellbeing purpose. We are a registered incorporated association (ABN 707 257 545 13), run by volunteers, not clinicians.
          </p>
        </div>
      </header>

      {/* Scope */}
      <section style={{ background: "#FBF8F1", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 22, marginBottom: 40 }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderTop: "4px solid #4E7A5E", borderRadius: 14, padding: "30px 32px" }}>
              <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: "#24352B" }}>A good fit for men who are</h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Emotionally stable and ready to take a step toward connection",
                  "Socially isolated, lonely, or lacking a support network",
                  "Recovering from a rough patch and needing somewhere to belong alongside (or after) clinical care",
                  "Unlikely to engage with formal services, but open to a coffee or a swim with other blokes",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.55, color: "#46534A" }}>
                    <span style={{ color: "#4E7A5E", fontWeight: 700, flex: "none" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderTop: "4px solid #A4553F", borderRadius: 14, padding: "30px 32px" }}>
              <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: "#24352B" }}>Not resourced for men who are</h2>
              <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "In acute crisis or actively suicidal",
                  "Not yet able to regulate aggression toward others",
                  "Needing clinical treatment, case management, or supervision",
                ].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.55, color: "#46534A" }}>
                    <span style={{ color: "#A4553F", fontWeight: 700, flex: "none" }}> - </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#5C6B60" }}>
                Peer support isn&apos;t the safe container for that stage - for the man himself or for our untrained volunteer members. For acute presentations: Lifeline 13 11 14, the Suicide Call Back Service 1300 659 467, or emergency services.
              </p>
            </div>
          </div>
          <div style={{ background: "#24352B", borderRadius: 14, padding: "32px 36px" }}>
            <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.25, color: "#F4F1EA" }}>The handshake</h2>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "66ch" }}>
              We welcome referrals once someone has taken that first step toward stability - we catch men <em>after</em> the acute stage, and we&apos;re built to hold them for the long haul: weekly rhythm, familiar faces, and a community that notices when someone stops showing up. We treat this boundary as responsible scope, not exclusion.
            </p>
          </div>
        </div>
      </section>

      {/* What he walks into */}
      <section style={{ background: "#F4F1EA", borderTop: "1px solid #E5DCC9", padding: "72px 28px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>
            What a referred man actually walks into
          </h2>
          <p style={{ margin: "0 0 32px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "62ch" }}>
            So you can describe it accurately: no intake, no forms, no disclosure expected. He turns up, someone greets him, and he participates as much or as little as he wants.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              {
                title: "Coffee Catch-Up",
                body: "Wednesdays 12:00–1:30pm, Orchid & Co, East Geelong. Hosted, informal, coffee provided - the lowest barrier and the usual first referral.",
              },
              {
                title: "The Man Walk (partner)",
                body: "A weekly walk run by a separate organisation; many of our members and leadership attend. Activity-based, shoulder-to-shoulder connection.",
              },
              {
                title: "Community BBQs",
                body: "Larger gatherings through the year, plus an \"Orphan Christmas\" lunch for men with no one to spend the day with.",
              },
            ].map((item) => (
              <div key={item.title} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 12, padding: "22px 24px" }}>
                <p style={{ margin: "0 0 4px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: "#24352B" }}>{item.title}</p>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.55, color: "#5C6B60" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#E6DECC", padding: "72px 28px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 36px)", lineHeight: 1.2, color: "#24352B" }}>Talk to us before you refer</h2>
          <p style={{ margin: "0 0 28px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "54ch", marginLeft: "auto", marginRight: "auto" }}>
            Happy to take a call or email about whether we&apos;re the right fit for a particular man, and to make sure someone&apos;s expecting him at his first event.
          </p>
          <a
            href="mailto:hello@thewanderingman.com.au?subject=Referral enquiry"
            style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}
          >
            hello@thewanderingman.com.au
          </a>
        </div>
      </section>
    </>
  );
}
