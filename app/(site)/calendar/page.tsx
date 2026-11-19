import type { Metadata } from "next";
import Link from "next/link";
import WeekCalendar from "@/components/site/WeekCalendar";

export const metadata: Metadata = {
  title: "This Week at The Wandering Man - Geelong Men's Events Calendar",
  description:
    "What's on this week at The Wandering Man - coffee catch-ups, river walks, BBQs and more. Free men's events in Geelong. No bookings, just show up.",
  alternates: { canonical: "/calendar" },
};

// The week must roll over at Melbourne midnight without a redeploy.
export const dynamic = "force-dynamic";

// How many weeks ahead people can page to (about a month).
const MAX_WEEKS_AHEAD = 4;

function parseWeek(week: string | undefined): number {
  if (week === "next") return 1; // old shared links
  const n = Number.parseInt(week ?? "0", 10);
  if (!Number.isFinite(n)) return 0;
  return Math.min(Math.max(n, 0), MAX_WEEKS_AHEAD);
}

function heading(offset: number): string {
  if (offset === 0) return "This week's calendar";
  if (offset === 1) return "Next week's calendar";
  return `In ${offset} weeks`;
}

function weekHref(offset: number): string {
  return offset === 0 ? "/calendar" : `/calendar?week=${offset}`;
}

const navButton = {
  fontFamily: "var(--font-body), sans-serif",
  fontWeight: 700,
  fontSize: 15,
  textDecoration: "none",
  padding: "10px 16px",
  borderRadius: 8,
  border: "1.5px solid #24352B",
} as const;

export default async function CalendarPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const { week } = await searchParams;
  const offset = parseWeek(week);
  const hasPrev = offset > 0;
  const hasNext = offset < MAX_WEEKS_AHEAD;

  return (
    <section style={{ background: "#F4F1EA", padding: "56px 20px 72px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Week navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3.6vw, 34px)", lineHeight: 1.15, color: "#24352B" }}>
            {heading(offset)}
          </h1>
          <div style={{ display: "flex", gap: 8 }}>
            {hasPrev ? (
              <Link href={weekHref(offset - 1)} style={{ ...navButton, background: "transparent", color: "#24352B" }}>
                ← Previous week
              </Link>
            ) : (
              <span aria-disabled="true" style={{ ...navButton, background: "transparent", color: "#24352B", opacity: 0.35 }}>
                ← Previous week
              </span>
            )}
            {hasNext ? (
              <Link href={weekHref(offset + 1)} style={{ ...navButton, background: "#24352B", color: "#F4F1EA" }}>
                Next week →
              </Link>
            ) : (
              <span aria-disabled="true" style={{ ...navButton, background: "#24352B", color: "#F4F1EA", opacity: 0.35 }}>
                Next week →
              </span>
            )}
          </div>
        </div>

        <WeekCalendar weekOffset={offset} />

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
