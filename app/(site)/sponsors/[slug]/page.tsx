import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

interface Sponsor {
  id: string;
  org_name: string;
  slug: string;
  tier: string;
  tagline: string | null;
  logo_url: string | null;
  lp_hero_headline: string | null;
  lp_hero_subheading: string | null;
  lp_about: string | null;
  lp_offer: string | null;
  lp_offer_cta_text: string | null;
  lp_offer_cta_url: string | null;
  lp_services: string[] | null;
  lp_color_primary: string | null;
  address: string | null;
  suburb: string | null;
  phone: string | null;
  website_url: string | null;
  opening_hours: string | null;
}

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("sponsors")
    .select("org_name, tagline, suburb")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!data) return {};

  const title = `${data.org_name} | The Wandering Man`;
  const description =
    data.tagline ??
    `${data.org_name} in ${data.suburb ?? "Geelong"} - proudly supporting The Wandering Man men's mental health community.`;

  return {
    title,
    description,
    alternates: { canonical: `/sponsors/${slug}` },
  };
}

function jsonLd(s: Sponsor) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: s.org_name,
    description: s.tagline ?? undefined,
    telephone: s.phone ?? undefined,
    address: s.address
      ? {
          "@type": "PostalAddress",
          streetAddress: s.address,
          addressLocality: s.suburb ?? "Geelong",
          addressRegion: "VIC",
          addressCountry: "AU",
        }
      : undefined,
    url: s.website_url ?? `https://www.thewanderingman.com.au/sponsors/${s.slug}`,
    openingHours: s.opening_hours ?? undefined,
  };
}

const TIER_LABEL: Record<string, string> = {
  gold: "Gold Partner",
  silver: "Silver Partner",
  bronze: "Bronze Partner",
  community: "Community Partner",
};

export default async function SponsorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("sponsors")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (!data) notFound();

  const s = data as Sponsor;
  const accent = s.lp_color_primary ?? "#0D0D0D";
  const aboutParagraphs = s.lp_about?.split("\n\n").filter(Boolean) ?? [];
  const hours = s.opening_hours?.split(" · ") ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(s)) }}
      />

      {/* Back nav */}
      <div
        className="px-4 sm:px-6 lg:px-8 py-4 border-b"
        style={{ borderColor: "#E2E0DC" }}
      >
        <div className="max-w-6xl mx-auto">
          <Link
            href="/sponsors"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: "#0D0D0D" }}
          >
            <span>&larr;</span> Community Partners
          </Link>
        </div>
      </div>

      {/* Hero — full bleed with brand colour */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-24 md:py-36"
        style={{ backgroundColor: accent }}
      >
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest"
              style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}
            >
              {TIER_LABEL[s.tier] ?? "Sponsor"}
            </span>
            {s.suburb && (
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.suburb}, VIC
              </span>
            )}
          </div>

          {s.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.logo_url}
              alt={s.org_name}
              className="h-16 w-auto object-contain mb-10 brightness-0 invert opacity-90"
            />
          )}

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 max-w-4xl"
            style={{ color: "#F8F7F4" }}
          >
            {s.lp_hero_headline ?? s.org_name}
          </h1>

          {s.lp_hero_subheading && (
            <p
              className="text-xl sm:text-2xl max-w-2xl leading-relaxed"
              style={{ color: "rgba(248,247,244,0.7)" }}
            >
              {s.lp_hero_subheading}
            </p>
          )}

          {/* Quick contact strip */}
          <div className="flex flex-wrap items-center gap-6 mt-12 pt-10 border-t" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
            {s.phone && (
              <a
                href={`tel:${s.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-sm font-bold hover:opacity-80 transition-opacity"
                style={{ color: "#F8F7F4" }}
              >
                <span className="text-base">📞</span> {s.phone}
              </a>
            )}
            {s.address && (
              <span className="flex items-center gap-2 text-sm" style={{ color: "rgba(248,247,244,0.65)" }}>
                <span>📍</span> {s.address}
              </span>
            )}
            {hours[0] && (
              <span className="text-sm" style={{ color: "rgba(248,247,244,0.65)" }}>
                🕐 {hours[0]}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Member offer — high contrast band */}
      {s.lp_offer && (
        <section style={{ backgroundColor: "#39E75F" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest mb-1" style={{ color: "rgba(13,13,13,0.5)" }}>
                Exclusive member offer
              </p>
              <p className="text-xl sm:text-2xl font-extrabold" style={{ color: "#0D0D0D" }}>
                {s.lp_offer}
              </p>
            </div>
            {s.lp_offer_cta_text && s.lp_offer_cta_url && (
              <Link
                href={s.lp_offer_cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-extrabold transition-all hover:scale-105"
                style={{ backgroundColor: "#0D0D0D", color: "#F8F7F4" }}
              >
                {s.lp_offer_cta_text} &rarr;
              </Link>
            )}
          </div>
        </section>
      )}

      {/* Main content — about + contact sidebar */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 border-b" style={{ borderColor: "#E2E0DC" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* About copy */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#39E75F" }}>
              About {s.org_name}
            </p>
            <div className="space-y-6">
              {aboutParagraphs.map((para, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${i === 0 ? "text-xl font-medium" : "text-base"}`}
                  style={{ color: i === 0 ? "#0D0D0D" : "#6B6B6B" }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-1">
            <div
              className="rounded-2xl p-7 sticky top-8"
              style={{ backgroundColor: "#0D0D0D" }}
            >
              <p className="text-xs font-extrabold uppercase tracking-widest mb-6" style={{ color: "#39E75F" }}>
                Find us
              </p>

              {s.address && (
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "rgba(248,247,244,0.4)" }}>
                    Address
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#F8F7F4" }}>{s.address}</p>
                </div>
              )}

              {s.phone && (
                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: "rgba(248,247,244,0.4)" }}>
                    Phone
                  </p>
                  <a
                    href={`tel:${s.phone.replace(/\s/g, "")}`}
                    className="text-sm font-bold hover:underline"
                    style={{ color: "#39E75F" }}
                  >
                    {s.phone}
                  </a>
                </div>
              )}

              {hours.length > 0 && (
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(248,247,244,0.4)" }}>
                    Opening hours
                  </p>
                  <div className="space-y-1.5">
                    {hours.map((h, i) => (
                      <p key={i} className="text-sm" style={{ color: "#F8F7F4" }}>{h}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {s.address && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
                  >
                    Get directions
                  </a>
                )}
                {s.website_url && (
                  <a
                    href={s.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full text-sm font-bold border transition-colors hover:bg-white hover:text-black"
                    style={{ borderColor: "rgba(248,247,244,0.2)", color: "#F8F7F4" }}
                  >
                    Visit website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid */}
      {s.lp_services && s.lp_services.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-20 border-b" style={{ borderColor: "#E2E0DC" }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
              What they do
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-12" style={{ color: "#0D0D0D" }}>
              Products &amp; Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {s.lp_services.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border p-6"
                  style={{ borderColor: "#E2E0DC" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-extrabold mt-0.5"
                    style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-sm font-medium leading-snug pt-1.5" style={{ color: "#0D0D0D" }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TWM connection CTA */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-20"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>
              Why they sponsor us
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight" style={{ color: "#F8F7F4" }}>
              {s.org_name} believes in what we're doing.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(248,247,244,0.6)" }}>
              When you choose a business that backs The Wandering Man, you're part of something
              bigger. You're supporting a local community that's quietly changing how men in
              Geelong think about their mental health - one walk, one coffee, one conversation
              at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full text-sm font-extrabold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
              >
                Come to an event
              </Link>
              <Link
                href="/sponsors"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full text-sm font-medium border transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "rgba(248,247,244,0.25)", color: "#F8F7F4" }}
              >
                Become a sponsor
              </Link>
            </div>
          </div>
          <div
            className="rounded-2xl p-8 border"
            style={{ borderColor: "rgba(248,247,244,0.1)" }}
          >
            <p className="text-4xl font-extrabold mb-2" style={{ color: "#39E75F" }}>3x</p>
            <p className="text-sm mb-8" style={{ color: "rgba(248,247,244,0.5)" }}>
              Men die by suicide at three times the rate of women in Australia
            </p>
            <p className="text-4xl font-extrabold mb-2" style={{ color: "#F8F7F4" }}>100+</p>
            <p className="text-sm mb-8" style={{ color: "rgba(248,247,244,0.5)" }}>
              Men in Geelong coming together through The Wandering Man
            </p>
            <p className="text-4xl font-extrabold mb-2" style={{ color: "#F8F7F4" }}>0</p>
            <p className="text-sm" style={{ color: "rgba(248,247,244,0.5)" }}>
              Barriers to joining. You just have to show up.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
