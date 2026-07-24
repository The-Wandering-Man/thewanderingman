// Compute day boundaries in Australia/Melbourne time, returned as UTC ISO
// strings suitable for filtering a timestamptz column.
//
// Melbourne observes daylight saving (AEST +10 / AEDT +11), so we can't
// hardcode an offset. Instead we ask Intl what wall-clock time Melbourne
// reads at a candidate UTC instant and pick the offset that lands on 00:00.

const TZ = "Australia/Melbourne";

// The calendar date (YYYY-MM-DD) that it currently is in Melbourne,
// optionally shifted by `dayOffset` days (e.g. -1 = yesterday).
export function melbourneDate(dayOffset = 0, from: Date = new Date()): string {
  const base = new Date(from.getTime() + dayOffset * 86_400_000);
  // en-CA formats as YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(base);
}

// Given a Melbourne calendar date (YYYY-MM-DD), return the UTC instant of
// that day's 00:00:00 in Melbourne, as an ISO string.
export function melbourneMidnightUTC(melbDate: string): string {
  // Candidate 1: assume AEDT (+11). If Melbourne reads 00:00 at that instant,
  // daylight saving is in effect and this is correct.
  const aedt = new Date(`${melbDate}T00:00:00+11:00`);
  const wall = new Intl.DateTimeFormat("en-AU", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(aedt);

  if (wall === "00:00") return aedt.toISOString();

  // Otherwise standard time (AEST +10).
  return new Date(`${melbDate}T00:00:00+10:00`).toISOString();
}

// Convenience: [startUTC, endUTC) covering a single Melbourne day.
export function melbourneDayRangeUTC(melbDate: string): {
  start: string;
  end: string;
} {
  const start = melbourneMidnightUTC(melbDate);
  // Next calendar day's midnight is the exclusive upper bound.
  const next = melbourneDate(1, new Date(`${melbDate}T12:00:00Z`));
  const end = melbourneMidnightUTC(next);
  return { start, end };
}
