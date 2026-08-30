import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { melbourneDate } from "@/lib/melbourne-day";

// Matches the client-side check in SignInForm. Deliberately loose: the point
// is to catch typos at the door, not to police valid addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 400 });
  }

  const { name: rawName, email: rawEmail } = (body ?? {}) as {
    name?: unknown;
    email?: unknown;
  };

  const name = typeof rawName === "string" ? rawName.trim() : "";
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (!name) {
    return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const supabase = await createServiceClient();
  // Send event_date explicitly rather than leaning on the column default, so
  // the day is decided in Melbourne time on our side either way.
  const { error } = await supabase
    .from("bbq_signins")
    .upsert(
      { name, email, event_date: melbourneDate() },
      { onConflict: "email,event_date" }
    );

  if (error) {
    console.error("bbq_signins upsert error:", error);
    return NextResponse.json(
      { error: "Could not sign you in. Try again, or grab someone on the door." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
