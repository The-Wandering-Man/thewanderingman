import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "Member Job Board - Geelong Men Looking for Work | The Wandering Man",
  description:
    "Geelong men helping each other find work. Browse profiles of experienced local workers - trades, hospitality, services and more - and reach out if you're hiring.",
  alternates: { canonical: "/community/jobs" },
};

export const revalidate = 1800;

interface MemberProfile {
  id: string;
  display_name: string;
  suburb: string | null;
  headline: string | null;
  skills: string[] | null;
  years_experience: number | null;
  looking_for: string | null;
  created_at: string;
}

const LOOKING_FOR_LABEL: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  casual: "Casual",
  "extra-hours": "A few hours a week",
  any: "Open to anything",
};

export default async function JobsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_profiles")
    .select(
      "id, display_name, suburb, headline, skills, years_experience, looking_for, created_at"
    )
    .eq("is_approved", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const profiles = (data ?? []) as MemberProfile[];

  return (
    <>
      {/* Hero */}
      <header style={{ background: "#192821", padding: "72px 28px 64px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>Community · Blokes helping blokes</p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.1, color: "#F4F1EA", maxWidth: "18ch" }}>Member Job Board</h1>
          <p style={{ margin: "0 0 28px", fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "58ch" }}>
            Solid, experienced Geelong men looking for their next opportunity. If you&apos;re hiring - or you know someone who is - reach out and we&apos;ll make the connection.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/community/jobs/join" style={{ background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}>
              Add your profile
            </Link>
            <a href="mailto:hello@thewanderingman.com.au?subject=Job board - my resume" style={{ border: "1.5px solid rgba(203,213,203,0.45)", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}>
              Or email us your resume
            </a>
          </div>
          <p style={{ margin: "18px 0 0", fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.5, color: "#87988A", maxWidth: "58ch" }}>
            Not one for forms? Send your resume to the committee and we&apos;ll build your card for you. We only ever show your first name and last initial.
          </p>
        </div>
      </header>

      {/* Listings */}
      <section style={{ background: "#F4F1EA", padding: "64px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {profiles.length === 0 ? (
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
              <p style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, color: "#24352B" }}>No profiles on the board yet</p>
              <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>Be the first - add your profile and we&apos;ll have you live within a day or two.</p>
              <Link href="/community/jobs/join" style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}>
                Add your profile
              </Link>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {profiles.map((p) => (
                <div key={p.id} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 16, padding: "28px 30px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 10 }}>
                    <div>
                      <h2 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, color: "#24352B" }}>{p.display_name}</h2>
                      {p.suburb && (
                        <p style={{ margin: "4px 0 0", fontFamily: "var(--font-body), sans-serif", fontSize: 16, color: "#5C6B60" }}>{p.suburb}, Geelong</p>
                      )}
                    </div>
                    {p.looking_for && (
                      <span style={{ background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, padding: "6px 14px", borderRadius: 99 }}>
                        {LOOKING_FOR_LABEL[p.looking_for] ?? p.looking_for}
                      </span>
                    )}
                  </div>
                  {p.headline && (
                    <p style={{ margin: "0 0 12px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 19, lineHeight: 1.5, color: "#24352B" }}>{p.headline}</p>
                  )}
                  {p.years_experience != null && (
                    <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontSize: 17, color: "#5C6B60" }}>{p.years_experience}+ years experience</p>
                  )}
                  {p.skills && p.skills.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {p.skills.map((skill) => (
                        <span key={skill} style={{ border: "1px solid #E5DCC9", background: "#FBF8F1", color: "#46534A", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 14, padding: "6px 12px", borderRadius: 99 }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid #E5DCC9" }}>
                    <a
                      href={`mailto:hello@thewanderingman.com.au?subject=Job board enquiry - ${encodeURIComponent(p.display_name)}`}
                      style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 16, color: "#3C6349", textDecoration: "none" }}
                    >
                      Interested in hiring {p.display_name.split(" ")[0]}? Get in touch →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: "#FBF8F1", borderTop: "1px solid #E5DCC9", padding: "64px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ margin: "0 0 28px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.2, color: "#24352B" }}>How the board works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              ["1", "Tell us about you", "Fill in the quick profile, or email your resume and the committee will write your card for you."],
              ["2", "We put you on the board", "First name and last initial only - your contact details stay private with the committee."],
              ["3", "Employers reach out to us", "When someone wants to hire you, we connect you directly. No middlemen, no fees."],
            ].map(([num, title, body]) => (
              <div key={num} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 12, padding: "24px 26px" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#5D8A6C", color: "#111C16", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 14 }}>{num}</div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: "#24352B" }}>{title}</h3>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.6, color: "#46534A" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InlineSponsorAd />
    </>
  );
}
