import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const VALID_CONCERNS = new Set([
  "My health",
  "Money or bills",
  "Work or employment",
  "Family",
  "Feeling lonely",
  "A friend or neighbour",
  "Getting around",
  "The house or garden",
  "Sleep",
  "The weather or the cold",
  "Something else",
]);

const VALID_GRATITUDES = new Set([
  "My family",
  "A good friend",
  "My health",
  "My work",
  "A nice meal",
  "The garden or nature",
  "A visit or phone call",
  "My pet",
  "A bit of good news",
  "Having a roof over my head",
  "A quiet peaceful day",
]);

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { rating, concern, gratitude, note } = body ?? {};

  if (
    typeof rating !== "number" ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 10 ||
    !VALID_CONCERNS.has(concern) ||
    !VALID_GRATITUDES.has(gratitude)
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { error } = await supabase.from("weekly_checkins").insert({
    rating,
    concern,
    gratitude,
    note: typeof note === "string" && note.trim() ? note.trim() : null,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
