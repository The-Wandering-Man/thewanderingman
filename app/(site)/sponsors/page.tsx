import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import SponsorEnquiryForm from "@/components/site/SponsorEnquiryForm";

export const metadata: Metadata = {
  title: "Sponsor The Wandering Man | Men's Mental Health Geelong",
  description:
    "Partner with The Wandering Man and reach Geelong's most engaged community of men. Sponsorship packages from Community to Gold tier.",
  alternates: { canonical: "/sponsors" },
};

export const revalidate = 3600;

const TIERS = [
  {
    key: "gold",
    label: "Gold",
    price: "POA",
    tagline: "Maximum visibility. Primary partner status.",
    perks: [
      "4x banner impressions per page load",
      "Dedicated landing page on TWM website",
      "Logo on all event collateral",
      "Social media shoutouts",
      "Named at every event",
      "First right of renewal",
    ],
    highlight: true,
  },
  {
    key: "silver",
    label: "Silver",
    price: "POA",
    tagline: "Strong presence throughout the site and events.",
    perks: [
      "3x banner impressions per page load",
      "Sponsor listing page with logo",
      "Logo on major event collateral",
      "Quarterly social media mention",
    ],
    highlight: false,
  },
  {
    key: "bronze",
    label: "Bronze",
    price: "POA",
    tagline: "Solid community presence. Great for local businesses.",
    perks: [
      "2x banner impressions per page load",
      "Sponsor listing page with logo",
      "Name on event signage",
    ],
    highlight: false,
  },
  {
    key: "community",
    label: "Community",
    price: "POA",
    tagline: "Show your support. Perfect for sole traders.",
    perks: [
      "1x banner impression per page load",
      "Name on sponsors page",
    ],
    highlight: false,
  },
];

interface Sponsor {
  id: string;
  org_name: string;
  slug: string;
  tier: string;
  tagline: string | null;
  logo_url: string | null;
  use_landing_page: boolean;
  external_url: string | null;
  suburb: string | null;
}

export default async function SponsorsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sponsors")
    .select("id, org_name, slug, tier, tagline, logo_url, use_landing_page, external_url, suburb")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  const sponsors = (data ?? []) as Sponsor[];
  const tierOrder = ["gold", "silver", "bronze", "community"];
  const byTier = tierOrder.map((t) => ({
    tier: t,
    items: sponsors.filter((s) => s.tier === t),
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-28 overflow-hidden border-b" style={{ borderColor: "#E2E0DC" }}>
        <Image src="/hero.jpg" alt="The Wandering Man community" fill className="object-cover" style={{ objectPosition: "center 30%" }} priority sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,13,13,0.75)" }} />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>
            Community Partners
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6" style={{ color: "#F8F7F4" }}>
            Sponsor The Wandering Man
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "rgba(248,247,244,0.7)" }}>
            The Wandering Man is Geelong's home for men's mental health. Back our community and get in front of hundreds of local men who care about where they spend their money.
          </p>
        </div>
      </section>

      {/* Current sponsors */}
      {sponsors.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: "#E2E0DC" }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
              Thank you
            </p>
            <h2 className="text-2xl font-bold mb-10" style={{ color: "#0D0D0D" }}>
              Our current sponsors
            </h2>
            <div className="space-y-10">
              {byTier.map(({ tier, items }) =>
                items.length === 0 ? null : (
                  <div key={tier}>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-4"
                      style={{ color: "#6B6B6B" }}
                    >
                      {tier.charAt(0).toUpperCase() + tier.slice(1)} Partners
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((s) => {
                        const href = s.use_landing_page
                          ? `/sponsors/${s.slug}`
                          : (s.external_url ?? "#");
                        return (
                          <Link
                            key={s.id}
                            href={href}
                            target={s.use_landing_page ? undefined : "_blank"}
                            rel={s.use_landing_page ? undefined : "noopener noreferrer"}
                            className="flex items-start gap-4 p-5 rounded-2xl border transition-shadow hover:shadow-md"
                            style={{ borderColor: "#E2E0DC" }}
                          >
                            {s.logo_url ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={s.logo_url}
                                alt={s.org_name}
                                className="h-10 w-10 object-contain rounded shrink-0"
                              />
                            ) : (
                              <div
                                className="h-10 w-10 rounded flex items-center justify-center shrink-0 text-sm font-extrabold"
                                style={{ backgroundColor: "#0D0D0D", color: "#39E75F" }}
                              >
                                {s.org_name[0]}
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-bold text-sm truncate" style={{ color: "#0D0D0D" }}>
                                {s.org_name}
                              </p>
                              {s.suburb && (
                                <p className="text-xs" style={{ color: "#6B6B6B" }}>
                                  {s.suburb}
                                </p>
                              )}
                              {s.tagline && (
                                <p className="text-xs mt-1 line-clamp-2" style={{ color: "#6B6B6B" }}>
                                  {s.tagline}
                                </p>
                              )}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* Tier breakdown */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: "#E2E0DC" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
            Partnership tiers
          </p>
          <h2 className="text-2xl font-bold mb-10" style={{ color: "#0D0D0D" }}>
            Find your level
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map((tier) => (
              <div
                key={tier.key}
                className="rounded-2xl border p-6 flex flex-col"
                style={{
                  borderColor: tier.highlight ? "#39E75F" : "#E2E0DC",
                  backgroundColor: tier.highlight ? "#F8F7F4" : "transparent",
                }}
              >
                {tier.highlight && (
                  <span
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: "#39E75F" }}
                  >
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-extrabold mb-1" style={{ color: "#0D0D0D" }}>
                  {tier.label}
                </h3>
                <p className="text-sm mb-5" style={{ color: "#6B6B6B" }}>
                  {tier.tagline}
                </p>
                <ul className="space-y-2 flex-1 mb-6">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "#0D0D0D" }}>
                      <span className="mt-0.5 text-xs" style={{ color: "#39E75F" }}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#enquire"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-bold border transition-colors hover:bg-black hover:text-white hover:border-black"
                  style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}
                >
                  Enquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquire" className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
            Get in touch
          </p>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#0D0D0D" }}>
            Become a sponsor
          </h2>
          <p className="text-sm mb-10" style={{ color: "#6B6B6B" }}>
            Tell us about your business and we'll be in touch within a couple of days.
          </p>
          <SponsorEnquiryForm />
        </div>
      </section>
    </>
  );
}
