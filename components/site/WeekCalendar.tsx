import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { melbourneDate, melbourneMidnightUTC } from "@/lib/melbourne-day";

const TZ = "Australia/Melbourne";

// A Sunday The Wandering Man river walk is on. Fortnight parity is computed
// from this date - if the group walks the "other" Sunday, change it here.
const SUNDAY_WALK_ANCHOR = "2026-08-09";

// One-off dates the committee has locked in (YYYY-MM-DD).
const ONE_OFFS: { date: string; time: string; title: string; location: string }[] = [
  { date: "2026-08-07", time: "All day", title: "Bunnings BBQ Fundraiser", location: "Bunnings - grab a snag, back the cause" },
  { date: "2026-08-14", time: "All day", title: "Bunnings Sausage Sizzle Fundraiser", location: "Bunnings - grab a snag, back the cause" },
  { date: "2026-09-03", time: "All day", title: "Bunnings Sausage Sizzle Fundraiser", location: "Bunnings - grab a snag, back the cause" },
  { date: "2026-10-08", time: "All day", title: "Bunnings Sausage Sizzle Fundraiser", location: "Bunnings - grab a snag, back the cause" },
  { date: "2026-11-06", time: "All day", title: "Bunnings Sausage Sizzle Fundraiser", location: "Bunnings - grab a snag, back the cause" },
  { date: "2026-12-25", time: "12:00pm-3:00pm", title: "Orphan Christmas BBQ Lunch", location: "For any man with nowhere to be on Christmas Day" },
];

interface Entry {
  time: string;
  sort: string;
  title: string;
  location: string;
}

function addDays(dateStr: string, n: number): string {
  return new Date(new Date(`${dateStr}T12:00:00Z`).getTime() + n * 86_400_000)
    .toISOString()
    .slice(0, 10);
}

function dayOfWeek(dateStr: string): number {
  return new Date(`${dateStr}T12:00:00Z`).getUTCDay(); // 0 = Sunday
}

function diffDays(a: string, b: string): number {
  return Math.round(
    (new Date(`${b}T12:00:00Z`).getTime() - new Date(`${a}T12:00:00Z`).getTime()) / 86_400_000
  );
}

function formatDay(dateStr: string) {
  const d = new Date(`${dateStr}T12:00:00Z`);
  return {
    dow: new Intl.DateTimeFormat("en-AU", { weekday: "short", timeZone: "UTC" }).format(d).toUpperCase(),
    dom: new Intl.DateTimeFormat("en-AU", { day: "numeric", timeZone: "UTC" }).format(d),
  };
}

function formatRange(monday: string, sunday: string): string {
  const fmt = (s: string, withMonth: boolean) =>
    new Intl.DateTimeFormat("en-AU", {
      day: "numeric",
      ...(withMonth ? { month: "long" } : {}),
      timeZone: "UTC",
    }).format(new Date(`${s}T12:00:00Z`));
  const sameMonth = monday.slice(0, 7) === sunday.slice(0, 7);
  return sameMonth
    ? `${fmt(monday, false)} - ${fmt(sunday, true)}`
    : `${fmt(monday, true)} - ${fmt(sunday, true)}`;
}

// Server component: the shareable week card. weekOffset 0 = this week, 1 = next.
export default async function WeekCalendar({ weekOffset = 0 }: { weekOffset?: number }) {
  const today = melbourneDate();
  const thisMonday = addDays(today, -((dayOfWeek(today) + 6) % 7));
  const monday = addDays(thisMonday, weekOffset * 7);
  const sunday = addDays(monday, 6);

  // Build the week's entries, keyed by date
  const byDate = new Map<string, Entry[]>();
  const push = (date: string, e: Entry) => {
    if (!byDate.has(date)) byDate.set(date, []);
    byDate.get(date)!.push(e);
  };

  // Weekly rhythm
  const wednesday = addDays(monday, 2);
  const saturday = addDays(monday, 5);
  push(wednesday, {
    time: "12:00pm-1:30pm",
    sort: "12:00",
    title: "Wednesday Coffee Catch-Up",
    location: "Orchid & Co, 26 Garden St, East Geelong - coffee's on us",
  });
  push(saturday, {
    time: "7:00am",
    sort: "07:00",
    title: "The Wandering Swim",
    location: "The Tower, Eastern Beach - swimming optional, yarns guaranteed",
  });

  // Fortnightly Sunday river walk
  if (diffDays(SUNDAY_WALK_ANCHOR, sunday) % 14 === 0) {
    push(sunday, {
      time: "9:00am",
      sort: "09:00",
      title: "Sunday River Walk & Coffee",
      location: "Along the Barwon - coffee at Barwon Edge after",
    });
  }

  // One-off fixtures
  for (const o of ONE_OFFS) {
    if (o.date >= monday && o.date <= sunday) {
      push(o.date, {
        time: o.time,
        sort: o.time === "All day" ? "00:00" : "09:00",
        title: o.title,
        location: o.location,
      });
    }
  }

  // Dated events from the database
  const supabase = await createClient();
  const { data: dbEvents } = await supabase
    .from("events")
    .select("title, location_name, starts_at")
    .eq("is_active", true)
    .gte("starts_at", melbourneMidnightUTC(monday))
    .lt("starts_at", melbourneMidnightUTC(addDays(sunday, 1)));

  for (const ev of dbEvents ?? []) {
    const date = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date(ev.starts_at));
    const time = new Intl.DateTimeFormat("en-AU", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: TZ })
      .format(new Date(ev.starts_at))
      .replace(/\s/g, "")
      .toLowerCase();
    const sort = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TZ }).format(new Date(ev.starts_at));
    push(date, {
      time,
      sort,
      title: ev.title,
      location: ev.location_name ?? "Details on our socials",
    });
  }

  const days = [...byDate.entries()]
    .filter(([date]) => date >= monday && date <= sunday)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, entries]) => ({
      date,
      entries: entries.sort((a, b) => a.sort.localeCompare(b.sort)),
    }));

  return (
    <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #E5DCC9", boxShadow: "0 2px 16px rgba(13,21,18,0.08)" }}>
      {/* Card header */}
      <div style={{ background: "#192821", padding: "26px 30px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: "50%", overflow: "hidden", background: "#24352B", flexShrink: 0 }}>
          <Image src="/twm-logo-green.png" alt="The Wandering Man" width={52} height={52} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.2, color: "#F4F1EA" }}>The Wandering Man</p>
          <p style={{ margin: "2px 0 0", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "#87988A" }}>
            What&apos;s on · {formatRange(monday, sunday)}
          </p>
        </div>
      </div>

      {/* Day rows */}
      <div style={{ background: "#FBF8F1" }}>
        {days.length === 0 ? (
          <div style={{ padding: "40px 30px", textAlign: "center" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, color: "#5C6B60" }}>
              Nothing locked in yet - check our socials, or come back soon.
            </p>
          </div>
        ) : (
          days.map(({ date, entries }, i) => {
            const d = formatDay(date);
            return (
              <div key={date} style={{ display: "flex", gap: 20, padding: "22px 30px", borderTop: i === 0 ? "none" : "1px solid #E5DCC9" }}>
                <div style={{ flexShrink: 0, width: 54, textAlign: "center" }}>
                  <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", color: "#48745A" }}>{d.dow}</p>
                  <p style={{ margin: "2px 0 0", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 28, lineHeight: 1, color: "#24352B" }}>{d.dom}</p>
                </div>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  {entries.map((e) => (
                    <div key={`${e.title}-${e.time}`}>
                      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#48745A" }}>{e.time}</p>
                      <p style={{ margin: "2px 0 2px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: "#24352B" }}>{e.title}</p>
                      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 16, lineHeight: 1.45, color: "#5C6B60" }}>{e.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Card footer */}
      <div style={{ background: "#0D1512", padding: "16px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 15, color: "#79A886" }}>
          thewanderingman.com.au
        </p>
        <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: "#87988A" }}>
          Free · No bookings · Every man welcome
        </p>
      </div>
    </div>
  );
}
