"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Pick {
  org_name: string;
  tier: string;
  tagline: string | null;
  logo_url: string | null;
  lp_offer: string | null;
  suburb: string | null;
  href: string;
  isExternal: boolean;
}

const TIER_LABEL: Record<string, string> = {
  gold: "Gold Partner",
  silver: "Silver Partner",
  bronze: "Bronze Partner",
  community: "Community Partner",
};

export default function InlineSponsorAd() {
  const [pick, setPick] = useState<Pick | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/spotlight")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setPick(data))
      .catch(() => setPick(null));
  }, []);

  if (pick === null) return null;

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8" style={{ fontFamily: "var(--font-body), sans-serif" }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ minHeight: 118 }}>
          {pick && (
            <Link
              href={pick.href}
              target={pick.isExternal ? "_blank" : undefined}
              rel={pick.isExternal ? "noopener noreferrer" : undefined}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-2xl border p-6 transition-shadow hover:shadow-md"
              style={{ borderColor: "#E5DCC9", backgroundColor: "#FFFFFF" }}
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
                  style={{ backgroundColor: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-display), sans-serif" }}
                >
                  {pick.org_name[0]}
                </div>
              )}

              {/* Copy */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "#87988A" }}
                  >
                    {TIER_LABEL[pick.tier] ?? "Sponsor"}
                  </span>
                  {pick.suburb && (
                    <span className="text-xs" style={{ color: "#87988A" }}>
                      · {pick.suburb}
                    </span>
                  )}
                </div>
                <p className="font-extrabold text-base" style={{ color: "#24352B", fontFamily: "var(--font-display), sans-serif" }}>
                  {pick.org_name}
                </p>
                {(pick.lp_offer ?? pick.tagline) && (
                  <p className="text-sm mt-0.5 truncate" style={{ color: "#5C6B60" }}>
                    {pick.lp_offer ?? pick.tagline}
                  </p>
                )}
              </div>

              {/* CTA */}
              <span
                className="shrink-0 text-sm font-bold underline underline-offset-2 group-hover:opacity-70 transition-opacity"
                style={{ color: "#3C6349" }}
              >
                Learn more →
              </span>
            </Link>
          )}
        </div>
        {pick && (
          <p className="text-right text-xs mt-1.5" style={{ color: "#87988A" }}>
            Sponsored · they keep our events free
          </p>
        )}
      </div>
    </div>
  );
}
