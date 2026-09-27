// Pure stats helpers for weekly check-in ratings (1-10).

const TZ = "Australia/Melbourne";

export function mean(ratings: number[]): number {
  return ratings.length ? ratings.reduce((a, r) => a + r, 0) / ratings.length : 0;
}

export function median(ratings: number[]): number {
  if (!ratings.length) return 0;
  const s = [...ratings].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

// counts[0] = number of 1s ... counts[9] = number of 10s
export function distribution(ratings: number[]): number[] {
  const counts = Array(10).fill(0);
  for (const r of ratings) if (r >= 1 && r <= 10) counts[r - 1]++;
  return counts;
}

// Bands used for "how many are doing it tough" style summaries.
export const BANDS = [
  { key: "low", label: "Doing it tough (1-4)", min: 1, max: 4, color: "#DC2626" },
  { key: "mid", label: "Getting by (5-6)", min: 5, max: 6, color: "#D97706" },
  { key: "high", label: "Going well (7-10)", min: 7, max: 10, color: "#15803D" },
] as const;

export function bandCounts(ratings: number[]): number[] {
  return BANDS.map((b) => ratings.filter((r) => r >= b.min && r <= b.max).length);
}

export type Grouping = "day" | "month" | "season";

export type Period = {
  key: string; // sortable
  label: string;
  n: number;
  avg: number;
  median: number;
  dist: number[];
  bands: number[];
};

// Southern hemisphere seasons.
function seasonOf(month: number, year: number): { key: string; label: string } {
  // month 1-12. December belongs to the summer that runs into next year.
  if (month === 12 || month <= 2) {
    const y = month === 12 ? year : year - 1;
    return { key: `${y}-4`, label: `Summer ${y}-${String((y + 1) % 100).padStart(2, "0")}` };
  }
  if (month <= 5) return { key: `${year}-1`, label: `Autumn ${year}` };
  if (month <= 8) return { key: `${year}-2`, label: `Winter ${year}` };
  return { key: `${year}-3`, label: `Spring ${year}` };
}

const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ });
const dayLabelFmt = new Intl.DateTimeFormat("en-AU", {
  timeZone: TZ,
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
});
const monthLabelFmt = new Intl.DateTimeFormat("en-AU", {
  timeZone: TZ,
  month: "long",
  year: "numeric",
});

function bucketOf(createdAt: string, grouping: Grouping): { key: string; label: string } {
  const d = new Date(createdAt);
  const ymd = dayFmt.format(d); // YYYY-MM-DD in Melbourne
  const [y, m] = ymd.split("-").map(Number);
  if (grouping === "day") return { key: ymd, label: dayLabelFmt.format(d) };
  if (grouping === "month") return { key: ymd.slice(0, 7), label: monthLabelFmt.format(d) };
  return seasonOf(m, y);
}

export function groupByPeriod(
  rows: { rating: number; created_at: string }[],
  grouping: Grouping,
): Period[] {
  const buckets = new Map<string, { label: string; ratings: number[] }>();
  for (const r of rows) {
    const { key, label } = bucketOf(r.created_at, grouping);
    const b = buckets.get(key) ?? { label, ratings: [] };
    b.ratings.push(r.rating);
    buckets.set(key, b);
  }
  return [...buckets.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, { label, ratings }]) => ({
      key,
      label,
      n: ratings.length,
      avg: mean(ratings),
      median: median(ratings),
      dist: distribution(ratings),
      bands: bandCounts(ratings),
    }));
}

// Same red -> green scale as the check-in form buttons, so a "3" looks the
// same everywhere.
export const RATING_COLORS = [
  "#DC2626", "#E55B20", "#F97316", "#F5A623", "#EDD212",
  "#CDDE14", "#7DCF26", "#35C05E", "#1DAA5A", "#15803D",
];
