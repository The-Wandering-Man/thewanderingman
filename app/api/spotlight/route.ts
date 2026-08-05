import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Weighted random sponsor pick. Called client-side by the ad components so
// every page view rotates, even on ISR-cached pages.
export const dynamic = "force-dynamic";

const TIER_WEIGHT: Record<string, number> = {
  gold: 4,
  silver: 3,
  bronze: 2,
  community: 1,
};

interface Sponsor {
  org_name: string;
  slug: string;
  tier: string;
  tagline: string | null;
  logo_url: string | null;
  use_landing_page: boolean;
  external_url: string | null;
  lp_offer: string | null;
  suburb: string | null;
}

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sponsors")
    .select("org_name, slug, tier, tagline, logo_url, use_landing_page, external_url, lp_offer, suburb")
    .eq("is_active", true);

  const sponsors = (data ?? []) as Sponsor[];
  if (!sponsors.length) return NextResponse.json(null);

  const total = sponsors.reduce((acc, s) => acc + (TIER_WEIGHT[s.tier] ?? 1), 0);
  let rand = Math.random() * total;
  let pick = sponsors[0];
  for (const s of sponsors) {
    rand -= TIER_WEIGHT[s.tier] ?? 1;
    if (rand <= 0) {
      pick = s;
      break;
    }
  }

  const href = pick.use_landing_page ? `/sponsors/${pick.slug}` : (pick.external_url ?? "#");

  return NextResponse.json({
    org_name: pick.org_name,
    tier: pick.tier,
    tagline: pick.tagline,
    logo_url: pick.logo_url,
    lp_offer: pick.lp_offer,
    suburb: pick.suburb,
    href,
    isExternal: !href.startsWith("/") && !href.startsWith("#"),
  });
}
