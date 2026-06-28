"use client";

import React from "react";

const CHART_COLORS = [
  "#39E75F", // brand green
  "#3A6B4A", // forest green
  "#0891B2", // cyan
  "#7C3AED", // purple
  "#EA580C", // orange
  "#DB2777", // pink
  "#0D9488", // teal
  "#D97706", // amber
  "#4F46E5", // indigo
  "#16A34A", // green-600
  "#DC2626", // red
];

type Slice = { label: string; value: number; color: string };

function buildSlices(counts: Record<string, number>): Slice[] {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value], i) => ({
      label,
      value,
      color: CHART_COLORS[i % CHART_COLORS.length],
    }));
}

function PieChart({ slices }: { slices: Slice[] }) {
  const cx = 150, cy = 150, r = 130;
  const total = slices.reduce((a, s) => a + s.value, 0);

  if (slices.length === 1) {
    return (
      <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto" aria-hidden="true">
        <circle cx={cx} cy={cy} r={r} fill={slices[0].color} />
      </svg>
    );
  }

  const paths: React.ReactElement[] = [];
  let angle = -Math.PI / 2;

  for (const s of slices) {
    const sweep = (s.value / total) * 2 * Math.PI;
    const end = angle + sweep;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = sweep > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;
    paths.push(
      <path key={s.label} d={d} fill={s.color} stroke="#F8F7F4" strokeWidth="2" />
    );
    angle = end;
  }

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto" aria-hidden="true">
      {paths}
    </svg>
  );
}

function Legend({ slices, total }: { slices: Slice[]; total: number }) {
  return (
    <ul className="mt-6 space-y-3">
      {slices.map((s) => (
        <li key={s.label} className="flex items-center gap-3">
          <span
            className="w-5 h-5 rounded-full shrink-0"
            style={{ backgroundColor: s.color }}
            aria-hidden="true"
          />
          <span className="text-lg font-medium flex-1" style={{ color: "#0D0D0D" }}>
            {s.label}
          </span>
          <span className="text-base tabular-nums" style={{ color: "#6B6B6B" }}>
            {s.value} ({Math.round((s.value / total) * 100)}%)
          </span>
        </li>
      ))}
    </ul>
  );
}

type CheckIn = {
  rating: number;
  concern: string;
  gratitude: string;
};

export default function CheckInResults({ checkins }: { checkins: CheckIn[] }) {
  if (checkins.length === 0) {
    return (
      <div className="text-center py-24 px-6">
        <p className="text-3xl font-bold mb-4" style={{ color: "#0D0D0D" }}>
          No check-ins yet.
        </p>
        <p className="text-xl" style={{ color: "#6B6B6B" }}>
          Be the first to check in this week.
        </p>
      </div>
    );
  }

  const avgRating = checkins.reduce((a, c) => a + c.rating, 0) / checkins.length;

  const concernCounts: Record<string, number> = {};
  const gratitudeCounts: Record<string, number> = {};
  for (const c of checkins) {
    concernCounts[c.concern] = (concernCounts[c.concern] ?? 0) + 1;
    gratitudeCounts[c.gratitude] = (gratitudeCounts[c.gratitude] ?? 0) + 1;
  }

  const concernSlices = buildSlices(concernCounts);
  const gratitudeSlices = buildSlices(gratitudeCounts);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "#39E75F" }}
      >
        Community Snapshot
      </p>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: "#0D0D0D" }}>
        Check-In Results
      </h1>
      <p className="text-xl mb-12" style={{ color: "#6B6B6B" }}>
        A snapshot of how our community is feeling.
      </p>

      {/* Big numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        <div className="p-8 rounded-3xl" style={{ backgroundColor: "#0D0D0D" }}>
          <p className="text-7xl font-extrabold mb-2" style={{ color: "#39E75F" }}>
            {avgRating.toFixed(1)}
          </p>
          <p className="text-2xl font-bold mb-1" style={{ color: "#F8F7F4" }}>
            Average rating
          </p>
          <p className="text-lg" style={{ color: "rgba(248,247,244,0.6)" }}>
            out of 10
          </p>
        </div>
        <div
          className="p-8 rounded-3xl"
          style={{ border: "2px solid #E2E0DC", backgroundColor: "#F8F7F4" }}
        >
          <p className="text-7xl font-extrabold mb-2" style={{ color: "#0D0D0D" }}>
            {checkins.length}
          </p>
          <p className="text-2xl font-bold mb-1" style={{ color: "#0D0D0D" }}>
            Total check-ins
          </p>
          <p className="text-lg" style={{ color: "#6B6B6B" }}>
            and counting
          </p>
        </div>
      </div>

      {/* Pie charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <section aria-label="What's been on people's minds">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0D0D0D" }}>
            What&rsquo;s been on people&rsquo;s minds
          </h2>
          <PieChart slices={concernSlices} />
          <Legend slices={concernSlices} total={checkins.length} />
        </section>

        <section aria-label="What people are thankful for">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#0D0D0D" }}>
            What people are thankful for
          </h2>
          <PieChart slices={gratitudeSlices} />
          <Legend slices={gratitudeSlices} total={checkins.length} />
        </section>
      </div>
    </div>
  );
}
