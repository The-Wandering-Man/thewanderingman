import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("title, description")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Event Not Found" };

  return {
    title: `${data.title} | The Wandering Man Geelong`,
    description: data.description ?? undefined,
    alternates: { canonical: `/events/${slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!event) notFound();

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.starts_at,
    endDate: event.ends_at,
    location: {
      "@type": "Place",
      name: event.location_name,
      address: event.location_address,
    },
    organizer: {
      "@type": "Organization",
      name: "The Wandering Man",
      url: "https://www.thewanderingman.com.au",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <section className="relative px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
        <Image src="/hero.jpg" alt="The Wandering Man community" fill className="object-cover" style={{ objectPosition: "center 30%" }} priority sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,13,13,0.75)" }} />
        <div className="relative max-w-3xl mx-auto">
          {event.event_type && (
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#39E75F" }}
            >
              {event.event_type} event
            </p>
          )}
          <h1
            className="text-4xl font-extrabold mb-4"
            style={{ color: "#F8F7F4" }}
          >
            {event.title}
          </h1>
          {event.is_recurring && event.recurrence_label && (
            <p className="text-base" style={{ color: "#6B6B6B" }}>
              {event.recurrence_label}
            </p>
          )}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Details sidebar */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div
              className="p-5 rounded-2xl border flex flex-col gap-4"
              style={{ borderColor: "#E2E0DC" }}
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "#6B6B6B" }}
                >
                  When
                </p>
                <p className="text-sm font-medium" style={{ color: "#0D0D0D" }}>
                  {formatDate(event.starts_at)}
                </p>
                <p className="text-sm" style={{ color: "#6B6B6B" }}>
                  {formatTime(event.starts_at)}
                  {event.ends_at && <> - {formatTime(event.ends_at)}</>}
                </p>
              </div>

              {event.location_name && (
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: "#6B6B6B" }}
                  >
                    Where
                  </p>
                  <p className="text-sm font-medium" style={{ color: "#0D0D0D" }}>
                    {event.location_name}
                  </p>
                  {event.location_address && (
                    <p className="text-sm" style={{ color: "#6B6B6B" }}>
                      {event.location_address}
                    </p>
                  )}
                </div>
              )}

              {event.rsvp_url ? (
                <a
                  href={event.rsvp_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
                >
                  RSVP
                </a>
              ) : (
                <p className="text-xs" style={{ color: "#6B6B6B" }}>
                  No RSVP needed - just show up.
                </p>
              )}
            </div>

            <Link
              href="/events"
              className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
              style={{ color: "#6B6B6B" }}
            >
              &larr; All events
            </Link>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            {event.description ? (
              <p
                className="text-base leading-relaxed whitespace-pre-line"
                style={{ color: "#0D0D0D" }}
              >
                {event.description}
              </p>
            ) : (
              <p style={{ color: "#6B6B6B" }}>More details coming soon.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
