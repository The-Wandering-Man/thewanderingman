"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Pick {
  org_name: string;
  tier: string;
  tagline: string | null;
  logo_url: string | null;
  href: string;
  isExternal: boolean;
}

const TIER_LABEL: Record<string, string> = {
  gold: "Gold Partner",
  silver: "Silver Partner",
  bronze: "Bronze Partner",
  community: "Community Partner",
};

export default function SponsorBanner() {
  const [pick, setPick] = useState<Pick | null | undefined>(undefined);

  useEffect(() => {
    fetch("/api/sponsor/pick")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setPick(data))
      .catch(() => setPick(null));
  }, []);

  // Reserve the row height while loading so the page doesn't jump.
  if (pick === null) return null;

  return (
    <aside
      className="px-4 sm:px-6 lg:px-8 border-b flex items-center"
      style={{ borderColor: "#E5DCC9", backgroundColor: "#FBF8F1", minHeight: 52 }}
      aria-label="Sponsor"
    >
      {pick && (
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 flex-wrap py-2">
          <div className="flex items-center gap-3 min-w-0" style={{ fontFamily: "var(--font-body), sans-serif" }}>
            <span
              className="text-xs font-bold uppercase tracking-widest shrink-0"
              style={{ color: "#87988A" }}
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
              <span className="font-bold text-sm truncate" style={{ color: "#24352B" }}>
                {pick.org_name}
              </span>
            )}
            {pick.tagline && (
              <span
                className="text-sm hidden sm:inline truncate"
                style={{ color: "#5C6B60" }}
              >
                {pick.tagline}
              </span>
            )}
          </div>
          <Link
            href={pick.href}
            className="shrink-0 text-xs font-bold underline underline-offset-2 hover:opacity-70 transition-opacity"
            style={{ color: "#3C6349", fontFamily: "var(--font-body), sans-serif" }}
            target={pick.isExternal ? "_blank" : undefined}
            rel={pick.isExternal ? "noopener noreferrer" : undefined}
          >
            Learn more &rarr;
          </Link>
        </div>
      )}
    </aside>
  );
}
