import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "Member Businesses - Shop Local in Geelong | The Wandering Man",
  description:
    "Shop local and back the community. Browse businesses owned and run by Wandering Man members across Geelong - trades, services, food and more.",
  alternates: { canonical: "/community/businesses" },
};

export const revalidate = 1800;

interface MemberBusiness {
  id: string;
  business_name: string;
  owner_display_name: string | null;
  category: string | null;
  description: string | null;
  suburb: string | null;
  website_url: string | null;
  phone: string | null;
}

const CATEGORY_LABEL: Record<string, string> = {
  trades: "Trades",
  services: "Services",
  retail: "Retail",
  food: "Food & Hospitality",
  health: "Health & Wellbeing",
  other: "Other",
};

export default async function BusinessesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_businesses")
    .select(
      "id, business_name, owner_display_name, category, description, suburb, website_url, phone"
    )
    .eq("is_approved", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const businesses = (data ?? []) as MemberBusiness[];

  return (
    <>
      {/* Hero */}
      <header style={{ background: "#192821", padding: "72px 28px 64px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>Community · Shop local</p>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(34px, 5vw, 56px)", lineHeight: 1.1, color: "#F4F1EA", maxWidth: "18ch" }}>Member Businesses</h1>
          <p style={{ margin: "0 0 28px", fontFamily: "var(--font-body), sans-serif", fontSize: "clamp(19px, 2.2vw, 22px)", lineHeight: 1.55, color: "#CBD5CB", maxWidth: "58ch" }}>
            These businesses are owned and run by Wandering Man members. When you use them, you&apos;re backing a Geelong bloke and the community around him - directly.
          </p>
          <Link href="/community/businesses/list" style={{ display: "inline-block", background: "#5D8A6C", color: "#111C16", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}>
            List your business
          </Link>
        </div>
      </header>

      {/* Listings */}
      <section style={{ background: "#F4F1EA", padding: "64px 28px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          {businesses.length === 0 ? (
            <div style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
              <p style={{ margin: "0 0 8px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, color: "#24352B" }}>No businesses listed yet</p>
              <p style={{ margin: "0 0 24px", fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>Run a business? Be the first on the board - it&apos;s free for members.</p>
              <Link href="/community/businesses/list" style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 17, textDecoration: "none", padding: "15px 24px", borderRadius: 10 }}>
                List your business
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 18 }}>
              {businesses.map((b) => (
                <div key={b.id} style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 16, padding: "26px 28px", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                    <h2 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 21, lineHeight: 1.25, color: "#24352B" }}>{b.business_name}</h2>
                    {b.category && (
                      <span style={{ flexShrink: 0, background: "#FBF8F1", border: "1px solid #E5DCC9", color: "#48745A", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 13, padding: "4px 10px", borderRadius: 99 }}>
                        {CATEGORY_LABEL[b.category] ?? b.category}
                      </span>
                    )}
                  </div>
                  {(b.owner_display_name || b.suburb) && (
                    <p style={{ margin: "0 0 10px", fontFamily: "var(--font-body), sans-serif", fontSize: 15, color: "#87988A" }}>
                      {[b.owner_display_name, b.suburb].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  {b.description && (
                    <p style={{ margin: "0 0 16px", fontFamily: "var(--font-body), sans-serif", fontSize: 17, lineHeight: 1.55, color: "#46534A", flex: 1 }}>{b.description}</p>
                  )}
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid #E5DCC9" }}>
                    {b.phone && (
                      <a href={`tel:${b.phone.replace(/\s/g, "")}`} style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#3C6349", textDecoration: "none" }}>
                        {b.phone}
                      </a>
                    )}
                    {b.website_url && (
                      <a href={b.website_url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#3C6349", textDecoration: "none" }}>
                        Visit website →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <InlineSponsorAd />
    </>
  );
}
