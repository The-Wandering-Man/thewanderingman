import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface Sponsor {
  id: string;
  org_name: string;
  slug: string;
  tier: string;
  tagline: string | null;
  logo_url: string | null;
  use_landing_page: boolean;
  external_url: string | null;
}

// Weighted random pick favouring higher tiers
const TIER_WEIGHT: Record<string, number> = {
  gold: 4,
  silver: 3,
  bronze: 2,
  community: 1,
};

function weightedRandom(sponsors: Sponsor[]): Sponsor | null {
  if (!sponsors.length) return null;
  const total = sponsors.reduce((acc, s) => acc + (TIER_WEIGHT[s.tier] ?? 1), 0);
  let rand = Math.random() * total;
  for (const s of sponsors) {
    rand -= TIER_WEIGHT[s.tier] ?? 1;
    if (rand <= 0) return s;
  }
  return sponsors[0];
}

const TIER_LABEL: Record<string, string> = {
  gold: "Gold Partner",
  silver: "Silver Partner",
  bronze: "Bronze Partner",
  community: "Community Partner",
};

export default async function SponsorBanner() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sponsors")
    .select("id, org_name, slug, tier, tagline, logo_url, use_landing_page, external_url")
    .eq("is_active", true);

  const sponsors = (data ?? []) as Sponsor[];
  const pick = weightedRandom(sponsors);
  if (!pick) return null;

  const href = pick.use_landing_page
    ? `/sponsors/${pick.slug}`
    : (pick.external_url ?? "#");

  return (
    <aside
      className="px-4 sm:px-6 lg:px-8 py-4 border-b"
      style={{ borderColor: "#E2E0DC", backgroundColor: "#F8F7F4" }}
      aria-label="Sponsor"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <span
            className="text-xs font-bold uppercase tracking-widest shrink-0"
            style={{ color: "#6B6B6B" }}
          >
            {TIER_LABEL[pick.tier] ?? "Sponsor"}
          </span>
          {pick.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pick.logo_url}
              alt={pick.org_name}
              className="h-7 w-auto object-contain"
            />
          ) : (
            <span className="font-bold text-sm truncate" style={{ color: "#0D0D0D" }}>
              {pick.org_name}
            </span>
          )}
          {pick.tagline && (
            <span
              className="text-sm hidden sm:inline truncate"
              style={{ color: "#6B6B6B" }}
            >
              {pick.tagline}
            </span>
          )}
        </div>
        <Link
          href={href}
          className="shrink-0 text-xs font-bold underline underline-offset-2 hover:opacity-70 transition-opacity"
          style={{ color: "#0D0D0D" }}
          target={pick.use_landing_page ? undefined : "_blank"}
          rel={pick.use_landing_page ? undefined : "noopener noreferrer"}
        >
          Learn more &rarr;
        </Link>
      </div>
    </aside>
  );
}
