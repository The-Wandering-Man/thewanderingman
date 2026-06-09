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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(s)) }}
      />

      {/* Hero */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-20 md:py-28"
        style={{ backgroundColor: accent }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/sponsors"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "#F8F7F4" }}
          >
            &larr; Our sponsors
          </Link>
          {s.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.logo_url}
              alt={s.org_name}
              className="h-14 w-auto object-contain mb-8 brightness-0 invert"
            />
          )}
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "rgba(248,247,244,0.55)" }}
          >
            TWM Community Partner &middot; {s.suburb ?? "Geelong"}
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            style={{ color: "#F8F7F4" }}
          >
            {s.lp_hero_headline ?? s.org_name}
          </h1>
          {s.lp_hero_subheading && (
            <p
              className="text-lg sm:text-xl max-w-2xl"
              style={{ color: "rgba(248,247,244,0.75)" }}
            >
              {s.lp_hero_subheading}
            </p>
          )}
        </div>
      </section>

      {/* Offer highlight */}
      {s.lp_offer && (
        <section
          className="px-4 sm:px-6 lg:px-8 py-10"
          style={{ backgroundColor: "#39E75F" }}
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#0D0D0D" }}>
                Member Offer
              </p>
              <p className="text-lg font-extrabold" style={{ color: "#0D0D0D" }}>
                {s.lp_offer}
              </p>
            </div>
            {s.lp_offer_cta_text && s.lp_offer_cta_url && (
              <Link
                href={s.lp_offer_cta_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#0D0D0D", color: "#F8F7F4" }}
              >
                {s.lp_offer_cta_text}
              </Link>
            )}
          </div>
        </section>
      )}

      {/* About */}
      {aboutParagraphs.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: "#E2E0DC" }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-5">
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>
                About {s.org_name}
              </p>
              {aboutParagraphs.map((para, i) => (
                <p key={i} className="text-base leading-relaxed" style={{ color: "#0D0D0D" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Contact sidebar */}
            <div
              className="rounded-2xl border p-6 h-fit"
              style={{ borderColor: "#E2E0DC" }}
            >
              <h2 className="text-sm font-extrabold mb-5" style={{ color: "#0D0D0D" }}>
                Visit {s.org_name}
              </h2>
              {s.address && (
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#6B6B6B" }}>
                    Address
                  </p>
                  <p className="text-sm" style={{ color: "#0D0D0D" }}>{s.address}</p>
                </div>
              )}
              {s.phone && (
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#6B6B6B" }}>
                    Phone
                  </p>
                  <a
                    href={`tel:${s.phone.replace(/\s/g, "")}`}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#0D0D0D" }}
                  >
                    {s.phone}
                  </a>
                </div>
              )}
              {s.opening_hours && (
                <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#6B6B6B" }}>
                    Hours
                  </p>
                  <p className="text-sm whitespace-pre-line" style={{ color: "#0D0D0D" }}>
                    {s.opening_hours.split(" · ").join("\n")}
                  </p>
                </div>
              )}
              {s.website_url && (
                <a
                  href={s.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold underline underline-offset-2 hover:opacity-70 transition-opacity"
                  style={{ color: "#0D0D0D" }}
                >
                  Visit website &rarr;
                </a>
              )}
              {s.address && (
                <div className="mt-4">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center px-5 py-3 rounded-full text-sm font-bold border transition-colors hover:bg-black hover:text-white hover:border-black"
                    style={{ borderColor: "#0D0D0D", color: "#0D0D0D" }}
                  >
                    Get directions
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      {s.lp_services && s.lp_services.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: "#E2E0DC" }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#39E75F" }}>
              What they offer
            </p>
            <h2 className="text-2xl font-bold mb-8" style={{ color: "#0D0D0D" }}>
              Products &amp; Services
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {s.lp_services.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: "#0D0D0D" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* TWM connection / CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-2xl p-8 md:p-12"
            style={{ backgroundColor: "#0D0D0D" }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#39E75F" }}
            >
              Supporting men's mental health
            </p>
            <h2
              className="text-2xl sm:text-3xl font-extrabold mb-4"
              style={{ color: "#F8F7F4" }}
            >
              {s.org_name} supports The Wandering Man
            </h2>
            <p
              className="text-base mb-8 max-w-2xl"
              style={{ color: "rgba(248,247,244,0.65)" }}
            >
              By choosing {s.org_name}, you're backing a local business that backs our
              community. The Wandering Man brings men together across Geelong to talk,
              connect, and support each other through life's challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
              >
                Join us at an event
              </Link>
              <Link
                href="/sponsors"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-medium border transition-colors hover:bg-white hover:text-black"
                style={{ borderColor: "#F8F7F4", color: "#F8F7F4" }}
              >
                Become a sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
