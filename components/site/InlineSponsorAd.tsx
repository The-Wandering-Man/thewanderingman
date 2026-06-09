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
  lp_offer: string | null;
  suburb: string | null;
}

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

export default async function InlineSponsorAd() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sponsors")
    .select("id, org_name, slug, tier, tagline, logo_url, use_landing_page, external_url, lp_offer, suburb")
    .eq("is_active", true);

  const sponsors = (data ?? []) as Sponsor[];
  const pick = weightedRandom(sponsors);
  if (!pick) return null;

  const href = pick.use_landing_page
    ? `/sponsors/${pick.slug}`
    : (pick.external_url ?? "#");

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href={href}
          target={pick.use_landing_page ? undefined : "_blank"}
          rel={pick.use_landing_page ? undefined : "noopener noreferrer"}
          className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border p-6 transition-shadow hover:shadow-md"
          style={{ borderColor: "#E2E0DC", backgroundColor: "#F8F7F4" }}
        >
          {/* Logo / initial */}
          {pick.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pick.logo_url}
              alt={pick.org_name}
              className="h-12 w-12 object-contain rounded-lg shrink-0"
            />
          ) : (
            <div
              className="h-12 w-12 rounded-lg flex items-center justify-center shrink-0 text-lg font-extrabold"
              style={{ backgroundColor: "#0D0D0D", color: "#39E75F" }}
            >
              {pick.org_name[0]}
            </div>
          )}

          {/* Copy */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "#6B6B6B" }}
              >
                {TIER_LABEL[pick.tier] ?? "Sponsor"}
              </span>
              {pick.suburb && (
                <span className="text-xs" style={{ color: "#6B6B6B" }}>
                  · {pick.suburb}
                </span>
              )}
            </div>
            <p className="font-extrabold text-base" style={{ color: "#0D0D0D" }}>
              {pick.org_name}
            </p>
            {(pick.lp_offer ?? pick.tagline) && (
              <p className="text-sm mt-0.5 truncate" style={{ color: "#6B6B6B" }}>
                {pick.lp_offer ?? pick.tagline}
              </p>
            )}
          </div>

          {/* CTA */}
          <span
            className="shrink-0 text-sm font-bold underline underline-offset-2 group-hover:opacity-70 transition-opacity"
            style={{ color: "#0D0D0D" }}
          >
            Learn more →
          </span>
        </Link>
        <p className="text-right text-xs mt-1.5" style={{ color: "#C5C3BF" }}>
          Community partner
        </p>
      </div>
    </div>
  );
}
