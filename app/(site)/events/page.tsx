import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import EventCard, { type Event } from "@/components/site/EventCard";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "Events | The Wandering Man Geelong",
  description:
    "Join us at an upcoming men's mental health event in Geelong. Weekly walks, monthly gatherings, mindfulness sessions and more. Free and open to all men.",
  alternates: { canonical: "/events" },
};

export const revalidate = 3600;

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .gte("starts_at", new Date().toISOString())
    .order("starts_at", { ascending: true });

  const recurring = events?.filter((e) => e.is_recurring) ?? [];
  const oneOff = events?.filter((e) => !e.is_recurring) ?? [];

  return (
    <>
      {/* Hero */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-20"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: "#39E75F" }}
          >
            What's On in Geelong
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5"
            style={{ color: "#F8F7F4" }}
          >
            Show up. That's all we ask.
          </h1>
          <p className="text-lg" style={{ color: "#6B6B6B" }}>
            All events are free, informal, and open to any man who wants to be there. No experience
            required.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {!events || events.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-bold mb-2" style={{ color: "#0D0D0D" }}>
                No upcoming events listed yet.
              </p>
              <p className="text-sm mb-8" style={{ color: "#6B6B6B" }}>
                Check back soon, or reach out directly.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold"
                style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
              >
                Get in Touch
              </Link>
            </div>
          ) : (
            <>
              {recurring.length > 0 && (
                <div className="mb-14">
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#0D0D0D" }}>
                    Regular Events
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recurring.map((event) => (
                      <EventCard key={event.id} event={event as Event} />
                    ))}
                  </div>
                </div>
              )}

              {oneOff.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#0D0D0D" }}>
                    Upcoming Special Events
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {oneOff.map((event) => (
                      <EventCard key={event.id} event={event as Event} />
                    ))}
                  </div>
                </div>
              )}

              <InlineSponsorAd />
            </>
          )}
        </div>
      </section>
    </>
  );
}
