import type { Metadata } from "next";
import Link from "next/link";
import WeekCalendar from "@/components/site/WeekCalendar";

export const metadata: Metadata = {
  title: "This Week at The Wandering Man - Geelong Men's Events Calendar",
  description:
    "What's on this week at The Wandering Man - coffee catch-ups, the Saturday swim, river walks, BBQs and more. Free men's events in Geelong. No bookings, just show up.",
  alternates: { canonical: "/calendar" },
};

// The week must roll over at Melbourne midnight without a redeploy.
export const dynamic = "force-dynamic";

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const { week } = await searchParams;
  const isNextWeek = week === "next";

  return (
    <section style={{ background: "#F4F1EA", padding: "56px 20px 72px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Week toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.6vw, 34px)", lineHeight: 1.15, color: "#24352B" }}>
            {isNextWeek ? "Next week's calendar" : "This week's calendar"}
          </h1>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/calendar" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none", padding: "10px 16px", borderRadius: 8, background: isNextWeek ? "transparent" : "#24352B", color: isNextWeek ? "#24352B" : "#F4F1EA", border: "1.5px solid #24352B" }}>
              This week
            </Link>
            <Link href="/calendar?week=next" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, textDecoration: "none", padding: "10px 16px", borderRadius: 8, background: isNextWeek ? "#24352B" : "transparent", color: isNextWeek ? "#F4F1EA" : "#24352B", border: "1.5px solid #24352B" }}>
              Next week
            </Link>
          </div>
        </div>

        <WeekCalendar weekOffset={isNextWeek ? 1 : 0} />

        {/* Under-card notes */}
        <p style={{ margin: "22px 0 0", fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.6, color: "#5C6B60", textAlign: "center" }}>
          Screenshot it, share it, stick it on the fridge - that&apos;s what it&apos;s for.{" "}
          <Link href="/events" style={{ color: "#3C6349", fontWeight: 700 }}>
            Full event details →
          </Link>
        </p>
      </div>
    </section>
  );
}
