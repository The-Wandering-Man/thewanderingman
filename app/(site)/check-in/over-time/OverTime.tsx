"use client";

import { useState } from "react";
import {
  BANDS,
  RATING_COLORS,
  groupByPeriod,
  mean,
  median,
  type Grouping,
  type Period,
} from "@/lib/checkin-stats";

const AVG_COLOR = "#1F6F43";
const MEDIAN_COLOR = "#7C3AED";

const GROUPINGS: { key: Grouping; label: string }[] = [
  { key: "day", label: "Each catch-up" },
  { key: "month", label: "By month" },
  { key: "season", label: "By season" },
];

function fmt(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

// Two lines (average + median) on one 1-10 scale, with a hover tooltip.
function TrendChart({ periods }: { periods: Period[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 800, H = 320;
  const pad = { l: 40, r: 90, t: 20, b: 40 };
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const n = periods.length;
  const x = (i: number) => pad.l + (n === 1 ? iw / 2 : (i / (n - 1)) * iw);
  const y = (v: number) => pad.t + ih - ((v - 1) / 9) * ih;
  const line = (key: "avg" | "median") =>
    periods.map((p, i) => `${i ? "L" : "M"} ${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(" ");
  const last = periods[n - 1];
  // Keep the two end labels from sitting on top of each other.
  let avgLabelY = y(last.avg), medLabelY = y(last.median);
  if (Math.abs(avgLabelY - medLabelY) < 18) {
    const mid = (avgLabelY + medLabelY) / 2;
    const up = last.avg >= last.median;
    avgLabelY = mid + (up ? -9 : 9);
    medLabelY = mid + (up ? 9 : -9);
  }
  const labelEvery = Math.ceil(n / 8);
  const hp = hover !== null ? periods[hover] : null;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img"
        aria-label="Average and median rating over time">
        {[1, 4, 7, 10].map((v) => (
          <g key={v}>
            <line x1={pad.l} x2={W - pad.r} y1={y(v)} y2={y(v)} stroke="#E2E0DC" strokeWidth="1" />
            <text x={pad.l - 10} y={y(v) + 5} textAnchor="end" fontSize="14" fill="#6B6B6B">{v}</text>
          </g>
        ))}
        {periods.map((p, i) =>
          i % labelEvery === 0 || i === n - 1 ? (
            <text key={p.key} x={x(i)} y={H - 12} textAnchor="middle" fontSize="13" fill="#6B6B6B">
              {p.label.replace(/^\w{3} /, "").replace(/ \d{4}$/, "")}
            </text>
          ) : null,
        )}
        {hover !== null && (
          <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + ih} stroke="#B8B6B1" strokeWidth="1" />
        )}
        {n > 1 && <path d={line("avg")} fill="none" stroke={AVG_COLOR} strokeWidth="2.5" />}
        {n > 1 && <path d={line("median")} fill="none" stroke={MEDIAN_COLOR} strokeWidth="2.5" strokeDasharray="6 4" />}
        {periods.map((p, i) => (
          <g key={p.key}>
            <circle cx={x(i)} cy={y(p.avg)} r={hover === i ? 6 : 4.5} fill={AVG_COLOR} stroke="#fff" strokeWidth="2" />
            <circle cx={x(i)} cy={y(p.median)} r={hover === i ? 6 : 4.5} fill={MEDIAN_COLOR} stroke="#fff" strokeWidth="2" />
          </g>
        ))}
        <text x={x(n - 1) + 12} y={avgLabelY + 5} fontSize="14" fontWeight="700" fill="#0D0D0D">Average</text>
        <text x={x(n - 1) + 12} y={medLabelY + 5} fontSize="14" fontWeight="700" fill="#0D0D0D">Median</text>
        {/* Hit targets: one full-height column per period */}
        {periods.map((p, i) => {
          const half = n === 1 ? iw / 2 : iw / (n - 1) / 2;
          return (
            <rect key={p.key} x={x(i) - half} y={pad.t} width={half * 2} height={ih}
              fill="transparent" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              onClick={() => setHover(i)} />
          );
        })}
      </svg>
      {hp && hover !== null && (
        <div
          className="absolute pointer-events-none rounded-xl px-4 py-3 text-base shadow-lg"
          style={{
            left: `${(x(hover) / W) * 100}%`,
            top: 0,
            transform: `translateX(${hover > n / 2 ? "-105%" : "5%"})`,
            backgroundColor: "#0D0D0D",
            color: "#F8F7F4",
            minWidth: 180,
          }}
        >
          <p className="font-bold mb-1">{hp.label}</p>
          <p><span style={{ color: "#6EE7A0" }}>●</span> Average {hp.avg.toFixed(1)}</p>
          <p><span style={{ color: "#C4B5FD" }}>●</span> Median {fmt(hp.median)}</p>
          <p style={{ color: "rgba(248,247,244,0.6)" }}>{hp.n} check-in{hp.n === 1 ? "" : "s"}</p>
        </div>
      )}
      <div className="flex flex-wrap gap-6 mt-3 text-base" style={{ color: "#0D0D0D" }}>
        <span className="flex items-center gap-2">
          <svg width="28" height="10" aria-hidden="true"><line x1="0" x2="28" y1="5" y2="5" stroke={AVG_COLOR} strokeWidth="3" /></svg>
          Average
        </span>
        <span className="flex items-center gap-2">
          <svg width="28" height="10" aria-hidden="true"><line x1="0" x2="28" y1="5" y2="5" stroke={MEDIAN_COLOR} strokeWidth="3" strokeDasharray="6 4" /></svg>
          Median
        </span>
      </div>
    </div>
  );
}

// One 100%-stacked bar per period: share doing it tough / getting by / going well.
function BandBars({ periods }: { periods: Period[] }) {
  return (
    <div>
      <div className="flex flex-wrap gap-6 mb-5 text-base" style={{ color: "#0D0D0D" }}>
        {BANDS.map((b) => (
          <span key={b.key} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: b.color }} aria-hidden="true" />
            {b.label}
          </span>
        ))}
      </div>
      <ul className="space-y-3">
        {[...periods].reverse().map((p) => (
          <li key={p.key} className="grid grid-cols-[8rem_1fr] sm:grid-cols-[12rem_1fr] items-center gap-3">
            <span className="text-base font-medium" style={{ color: "#0D0D0D" }}>
              {p.label}
              <span className="block text-sm" style={{ color: "#6B6B6B" }}>{p.n} check-in{p.n === 1 ? "" : "s"}</span>
            </span>
            <div className="flex h-9 gap-[2px] rounded-md overflow-hidden">
              {p.bands.map((c, i) =>
                c ? (
                  <div
                    key={i}
                    className="flex items-center justify-center text-sm font-bold text-white"
                    style={{ width: `${(c / p.n) * 100}%`, backgroundColor: BANDS[i].color }}
                    title={`${BANDS[i].label}: ${c} (${Math.round((c / p.n) * 100)}%)`}
                  >
                    {c / p.n >= 0.1 ? `${Math.round((c / p.n) * 100)}%` : ""}
                  </div>
                ) : null,
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CountsTable({ periods }: { periods: Period[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl" style={{ border: "2px solid #E2E0DC" }}>
      <table className="w-full text-base tabular-nums" style={{ color: "#0D0D0D" }}>
        <thead style={{ backgroundColor: "#F8F7F4" }}>
          <tr>
            <th className="text-left px-4 py-3 font-bold">Period</th>
            <th className="px-3 py-3 font-bold">People</th>
            <th className="px-3 py-3 font-bold">Avg</th>
            <th className="px-3 py-3 font-bold">Median</th>
            {RATING_COLORS.map((c, i) => (
              <th key={i} className="px-2 py-3 font-extrabold" style={{ color: c === "#EDD212" || c === "#CDDE14" ? "#8A7A00" : c }}>
                {i + 1}s
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...periods].reverse().map((p) => (
            <tr key={p.key} style={{ borderTop: "1px solid #E2E0DC" }}>
              <td className="text-left px-4 py-3 font-medium whitespace-nowrap">{p.label}</td>
              <td className="text-center px-3 py-3">{p.n}</td>
              <td className="text-center px-3 py-3 font-bold">{p.avg.toFixed(1)}</td>
              <td className="text-center px-3 py-3 font-bold">{fmt(p.median)}</td>
              {p.dist.map((c, i) => (
                <td key={i} className="text-center px-2 py-3" style={{ color: c ? "#0D0D0D" : "#C9C7C2" }}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function OverTime({ rows }: { rows: { rating: number; created_at: string }[] }) {
  const [grouping, setGrouping] = useState<Grouping>("day");

  if (rows.length === 0) {
    return (
      <div className="text-center py-24 px-6">
        <p className="text-3xl font-bold mb-4" style={{ color: "#0D0D0D" }}>No check-ins yet.</p>
        <p className="text-xl" style={{ color: "#6B6B6B" }}>Once people start checking in, the trend shows up here.</p>
      </div>
    );
  }

  const periods = groupByPeriod(rows, grouping);
  const all = rows.map((r) => r.rating);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#39E75F" }}>
        Community Trends
      </p>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-3" style={{ color: "#0D0D0D" }}>
        The group over time
      </h1>
      <p className="text-xl mb-8" style={{ color: "#6B6B6B" }}>
        Are we doing better, worse, or feeling the winter blues? {rows.length} check-ins so far,
        all-time average {mean(all).toFixed(1)}, median {fmt(median(all))}.
      </p>

      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Group results by">
        {GROUPINGS.map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setGrouping(g.key)}
            aria-pressed={grouping === g.key}
            className="rounded-xl px-5 py-2 text-lg font-bold transition-colors"
            style={{
              border: "2px solid #0D0D0D",
              backgroundColor: grouping === g.key ? "#0D0D0D" : "transparent",
              color: grouping === g.key ? "#39E75F" : "#0D0D0D",
            }}
          >
            {g.label}
          </button>
        ))}
      </div>

      <section className="mb-16" aria-label="Average and median over time">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#0D0D0D" }}>Average and median rating</h2>
        <p className="text-lg mb-6" style={{ color: "#6B6B6B" }}>
          If the average drops below the median, a few people are having a really hard time.
        </p>
        <TrendChart periods={periods} />
      </section>

      <section className="mb-16" aria-label="How the group is spread">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#0D0D0D" }}>How the group is spread</h2>
        <BandBars periods={periods} />
      </section>

      <section aria-label="Every rating, counted">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#0D0D0D" }}>Every rating, counted</h2>
        <CountsTable periods={periods} />
      </section>
    </div>
  );
}
