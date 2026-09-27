import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import OverTime from "./OverTime";

export const metadata: Metadata = {
  title: "The Group Over Time",
  description: "How our Geelong community has been feeling across weeks, months and seasons.",
  alternates: { canonical: "/check-in/over-time" },
};

export const dynamic = "force-dynamic";

const PAGE = 1000;

export default async function OverTimePage() {
  const supabase = await createServiceClient();
  // Supabase caps a single select at 1000 rows, so page through everything.
  const rows: { rating: number; created_at: string }[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data } = await supabase
      .from("weekly_checkins")
      .select("rating, created_at")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (!data?.length) break;
    rows.push(...data);
    if (data.length < PAGE) break;
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/check-in/results"
            className="inline-flex items-center gap-2 text-lg font-medium transition-opacity hover:opacity-70"
            style={{ color: "#39E75F" }}
          >
            ← Today&rsquo;s results
          </Link>
        </div>
      </div>
      <OverTime rows={rows} />
    </>
  );
}
