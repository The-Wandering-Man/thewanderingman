import type { Metadata } from "next";
import Link from "next/link";
import { policies } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Policies & Statements | The Wandering Man Geelong",
  description:
    "The full text of The Wandering Man Inc. policies and statements - privacy, child safety, whistleblower, conflict of interest, work health and safety, social media, and our mission, values and strategy.",
  alternates: { canonical: "/governance/policies" },
};

const groups: { key: "statement" | "policy"; title: string; blurb: string }[] = [
  {
    key: "statement",
    title: "Who we are",
    blurb: "The mission, values and two pillar strategy the association was founded on.",
  },
  {
    key: "policy",
    title: "Policies",
    blurb: "The documents that govern how we handle your information, keep people safe and hold ourselves to account.",
  },
];

export default function PoliciesIndexPage() {
  return (
    <>
      <header style={{ background: "#192821", padding: "72px 28px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/governance" style={{ display: "inline-block", marginBottom: 24, color: "#87988A", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← Governance &amp; Policies
          </Link>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>Full documents</p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.6vw, 50px)", lineHeight: 1.1, color: "#F4F1EA" }}>Policies &amp; Statements</h1>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "62ch" }}>
            The complete policy documents of The Wandering Man Inc., as adopted by the committee. For the plain-English version, head back to the governance overview.
          </p>
        </div>
      </header>

      <section style={{ background: "#F4F1EA", padding: "64px 28px 92px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
          {groups.map((g) => {
            const docs = policies.filter((p) => p.group === g.key);
            return (
              <div key={g.key}>
                <h2 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 28, lineHeight: 1.2, color: "#24352B" }}>{g.title}</h2>
                <p style={{ margin: "0 0 22px", fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#5C6B60", maxWidth: "62ch" }}>{g.blurb}</p>
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  {docs.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/governance/policies/${p.slug}`}
                        className="transition-shadow hover:shadow-md"
                        style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%", background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "22px 24px", textDecoration: "none" }}
                      >
                        <span style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: "#24352B" }}>{p.title}</span>
                        <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 15, lineHeight: 1.55, color: "#5C6B60" }}>{p.summary}</span>
                        <span style={{ marginTop: "auto", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 13, color: "#87988A", letterSpacing: "0.08em", textTransform: "uppercase" }}>Adopted {p.adopted}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div style={{ background: "#E6DECC", borderRadius: 14, padding: "26px 30px" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.6, color: "#5C4F3A" }}>
              Want a signed copy, or have a question about any of these documents? Email{" "}
              <a href="mailto:hello@thewanderingman.com.au?subject=Policy request" style={{ color: "#3C6349", fontWeight: 600 }}>
                hello@thewanderingman.com.au
              </a>
              . Our{" "}
              <Link href="/governance/rules" style={{ color: "#3C6349", fontWeight: 600 }}>
                rules of association
              </Link>{" "}
              are published separately.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
