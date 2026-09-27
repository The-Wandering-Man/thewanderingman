import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { melbourneDate } from "@/lib/melbourne-day";

// Matches the client-side check in SignInForm. Deliberately loose: the point
// is to catch typos at the door, not to police valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Every field is optional. Blank strings are stored as null so a head count
// with no details is still a row.
function clean(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t || null;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 });
  }

  const raw = (body ?? {}) as { name?: unknown; email?: unknown; phone?: unknown };
  const name = clean(raw.name, 200);
  const email = clean(raw.email, 320)?.toLowerCase() ?? null;
  const phone = clean(raw.phone, 40);

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right. Fix it or leave it blank." },
      { status: 400 }
    );
  }

  const supabase = await createServiceClient();
  // Send event_date explicitly rather than leaning on the column default, so
  // the day is decided in Melbourne time on our side either way.
  const row = { name, email, phone, event_date: melbourneDate() };
  // With an email, a second scan on the same day updates the existing row.
  // Without one there's nothing to match on, so it's a plain insert.
  const { error } = email
    ? await supabase.from("bbq_signins").upsert(row, { onConflict: "email,event_date" })
    : await supabase.from("bbq_signins").insert(row);

  if (error) {
    console.error("bbq_signins write error:", error);
    return NextResponse.json(
      { error: "Could not sign you in. Try again, or grab someone on the door." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
