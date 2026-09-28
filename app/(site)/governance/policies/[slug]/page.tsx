import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPolicy, policies } from "@/lib/policies";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = getPolicy(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} | The Wandering Man Geelong`,
    description: doc.summary,
    alternates: { canonical: `/governance/policies/${doc.slug}` },
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const doc = getPolicy(slug);
  if (!doc) notFound();

  const siblings = policies.filter((p) => p.group === doc.group && p.slug !== doc.slug);

  return (
    <>
      <header style={{ background: "#192821", padding: "72px 28px 56px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Link href="/governance/policies" style={{ display: "inline-block", marginBottom: 24, color: "#87988A", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
            ← All policies &amp; statements
          </Link>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            {doc.group === "policy" ? "Policy document" : "Statement"} · Adopted {doc.adopted}
          </p>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(32px, 4.6vw, 50px)", lineHeight: 1.1, color: "#F4F1EA" }}>{doc.title}</h1>
        </div>
      </header>

      <section style={{ background: "#F4F1EA", padding: "56px 28px 92px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 }}>
          <article style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 14, padding: "36px 34px" }}>
            <div className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
          </article>

          <div style={{ background: "#E6DECC", borderRadius: 14, padding: "26px 30px" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.6, color: "#5C4F3A" }}>
              Questions about this document, or want a signed copy? Email{" "}
              <a href={`mailto:hello@thewanderingman.com.au?subject=${encodeURIComponent(doc.title)}`} style={{ color: "#3C6349", fontWeight: 600 }}>
                hello@thewanderingman.com.au
              </a>
              .
            </p>
          </div>

          {siblings.length > 0 && (
            <nav aria-label={doc.group === "policy" ? "Other policies" : "Other statements"}>
              <p style={{ margin: "8px 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {doc.group === "policy" ? "Other policies" : "Other statements"}
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
                {siblings.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/governance/policies/${p.slug}`} style={{ display: "inline-block", background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 999, padding: "8px 16px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#24352B", textDecoration: "none" }}>
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
