import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import {
  melbourneDate,
  melbourneDayRangeUTC,
} from "@/lib/melbourne-day";
import CheckInResults from "../../(site)/check-in/results/CheckInResults";
import DatePicker from "./DatePicker";

export const metadata: Metadata = {
  title: "Check-In History (Admin)",
  robots: { index: false, follow: false },
};

// Fresh on every request; we're reading historical rows on demand.
export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function shiftDate(date: string, days: number): string {
  // Anchor at noon UTC to stay clear of DST edges when adding days.
  return melbourneDate(days, new Date(`${date}T12:00:00Z`));
}

export default async function AdminCheckInsPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const params = await searchParams;
  const today = melbourneDate();
  const date =
    params.date && DATE_RE.test(params.date) ? params.date : today;

  const { start, end } = melbourneDayRangeUTC(date);

  const supabase = await createServiceClient();
  const { data: checkins } = await supabase
    .from("weekly_checkins")
    .select("rating, concern, gratitude")
    .gte("created_at", start)
    .lt("created_at", end)
    .order("created_at", { ascending: false });

  const isToday = date === today;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <Link
        href="/check-in/results"
        className="inline-flex items-center gap-2 text-lg font-medium transition-opacity hover:opacity-70"
        style={{ color: "#39E75F" }}
      >
        ← Live results
      </Link>

      <div className="mt-6 mb-2">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#39E75F" }}
        >
          Admin · History
        </p>
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-6"
          style={{ color: "#0D0D0D" }}
        >
          {isToday ? "Today" : date} · {(checkins ?? []).length} check-in
          {(checkins ?? []).length === 1 ? "" : "s"}
        </h1>
        <DatePicker
          date={date}
          prev={shiftDate(date, -1)}
          next={shiftDate(date, 1)}
          isToday={isToday}
        />
      </div>

      <CheckInResults checkins={checkins ?? []} />
    </div>
  );
}
