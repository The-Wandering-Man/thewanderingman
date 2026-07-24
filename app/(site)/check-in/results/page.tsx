import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { melbourneDate, melbourneMidnightUTC } from "@/lib/melbourne-day";
import CheckInResults from "./CheckInResults";

export const metadata: Metadata = {
  title: "Check-In Results",
  description: "How our Geelong community is feeling week to week.",
  alternates: { canonical: "/check-in/results" },
};

// Render fresh on every request so the Melbourne midnight rollover to zero
// shows up without a redeploy. (No ISR caching.)
export const dynamic = "force-dynamic";

export default async function CheckInResultsPage() {
  const supabase = await createServiceClient();
  // Only today's check-ins, where "today" is the current calendar day in
  // Australia/Melbourne. Historical rows stay in the table untouched.
  const todayStart = melbourneMidnightUTC(melbourneDate());
  const { data: checkins } = await supabase
    .from("weekly_checkins")
    .select("rating, concern, gratitude")
    .gte("created_at", todayStart)
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/check-in"
            className="inline-flex items-center gap-2 text-lg font-medium transition-opacity hover:opacity-70"
            style={{ color: "#39E75F" }}
          >
            ← Back to check-in
          </Link>
        </div>
      </div>
      <CheckInResults checkins={checkins ?? []} />
    </>
  );
}
