"use client";

import { useRouter } from "next/navigation";

// Simple day navigator for the admin history view. Pushes ?date=YYYY-MM-DD.
export default function DatePicker({
  date,
  prev,
  next,
  isToday,
}: {
  date: string;
  prev: string;
  next: string;
  isToday: boolean;
}) {
  const router = useRouter();

  function go(d: string) {
    router.push(`/admin/check-ins?date=${d}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => go(prev)}
        className="rounded-xl px-4 py-2 text-lg font-bold transition-opacity hover:opacity-70"
        style={{ border: "2px solid #E2E0DC", color: "#0D0D0D" }}
      >
        ← Previous day
      </button>

      <input
        type="date"
        value={date}
        onChange={(e) => e.target.value && go(e.target.value)}
        className="rounded-xl px-4 py-2 text-lg font-medium focus:outline-none focus:ring-4 focus:ring-green-400"
        style={{ border: "2px solid #E2E0DC", color: "#0D0D0D" }}
      />

      <button
        type="button"
        onClick={() => go(next)}
        disabled={isToday}
        className="rounded-xl px-4 py-2 text-lg font-bold transition-opacity hover:opacity-70 disabled:opacity-30"
        style={{ border: "2px solid #E2E0DC", color: "#0D0D0D" }}
      >
        Next day →
      </button>
    </div>
  );
}
