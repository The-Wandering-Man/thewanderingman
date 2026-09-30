import type { Metadata } from "next";
import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";
import { melbourneDate } from "@/lib/melbourne-day";
import DatePicker from "../check-ins/DatePicker";
import { SIGNIN_EVENTS, isSignInEvent } from "@/lib/signin-events";

export const metadata: Metadata = {
  title: "Door Sign-Ins (Admin)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function shiftDate(date: string, days: number): string {
  return melbourneDate(days, new Date(`${date}T12:00:00Z`));
}

const timeFmt = new Intl.DateTimeFormat("en-AU", {
  timeZone: "Australia/Melbourne",
  hour: "numeric",
  minute: "2-digit",
});

// Attendance record for insurance. Totally separate from the emotional
// check-in: different table, no link between the two.
export default async function AdminSignInsPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; event?: string }>;
}) {
  const params = await searchParams;
  const today = melbourneDate();
  const date = params.date && DATE_RE.test(params.date) ? params.date : today;
  // No event param = everyone who signed in anywhere that day.
  const event = isSignInEvent(params.event) ? params.event : null;

  const supabase = await createServiceClient();
  let query = supabase
    .from("bbq_signins")
    .select("name, email, phone, event, created_at")
    .eq("event_date", date)
    .order("created_at", { ascending: true });
  if (event) query = query.eq("event", event);
  const { data } = await query;
  const rows = data ?? [];
  const qs = (e: string | null) => `?date=${date}${e ? `&event=${e}` : ""}`;

  const isToday = date === today;
  const cell = "px-4 py-3 text-left";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
        Admin · Door sign-ins
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6" style={{ color: "#0D0D0D" }}>
        {isToday ? "Today" : date} · {rows.length} {rows.length === 1 ? "person" : "people"}
      </h1>

      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter by event">
        {[null, ...Object.keys(SIGNIN_EVENTS)].map((e) => {
          const active = e === event;
          return (
            <Link
              key={e ?? "all"}
              href={`/admin/sign-ins${qs(e)}`}
              aria-current={active ? "page" : undefined}
              className="rounded-xl px-4 py-2 text-lg font-bold"
              style={{
                border: "2px solid #0D0D0D",
                backgroundColor: active ? "#0D0D0D" : "transparent",
                color: active ? "#39E75F" : "#0D0D0D",
              }}
            >
              {e ? SIGNIN_EVENTS[e as keyof typeof SIGNIN_EVENTS].label : "All events"}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <DatePicker
          date={date}
          prev={shiftDate(date, -1)}
          next={shiftDate(date, 1)}
          isToday={isToday}
          basePath="/admin/sign-ins"
        />
        {rows.length > 0 && (
          <a
            href={`/admin/sign-ins/export${qs(event)}`}
            className="rounded-xl px-4 py-2 text-lg font-bold transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
          >
            Download CSV
          </a>
        )}
      </div>

      {rows.length === 0 ? (
        <p className="text-xl" style={{ color: "#6B6B6B" }}>
          No one signed in on this day.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl" style={{ border: "2px solid #E2E0DC" }}>
          <table className="w-full text-base" style={{ color: "#0D0D0D" }}>
            <thead style={{ backgroundColor: "#F8F7F4" }}>
              <tr>
                <th className={cell}>#</th>
                <th className={cell}>Name</th>
                <th className={cell}>Email</th>
                <th className={cell}>Phone</th>
                <th className={cell}>Event</th>
                <th className={cell}>Time</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderTop: "1px solid #E2E0DC" }}>
                  <td className={cell} style={{ color: "#6B6B6B" }}>{i + 1}</td>
                  <td className={cell}>{r.name ?? <Blank />}</td>
                  <td className={cell}>{r.email ?? <Blank />}</td>
                  <td className={cell}>{r.phone ?? <Blank />}</td>
                  <td className={cell}>
                    {isSignInEvent(r.event) ? SIGNIN_EVENTS[r.event].label : r.event}
                  </td>
                  <td className={`${cell} whitespace-nowrap`} style={{ color: "#6B6B6B" }}>
                    {timeFmt.format(new Date(r.created_at))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-8 text-base" style={{ color: "#6B6B6B" }}>
        Sign-in pages:{" "}
        <Link href="/bbq/signin" className="underline">/bbq/signin</Link> ·{" "}
        <Link href="/coffee/signin" className="underline">/coffee/signin</Link>
      </p>
    </div>
  );
}

function Blank() {
  return <span style={{ color: "#B8B6B1" }}>-</span>;
}
