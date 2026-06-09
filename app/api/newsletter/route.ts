import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, first_name } = body ?? {};

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabase = await createServiceClient();
  const { error } = await supabase
    .from("newsletter_signups")
    .insert({ email: email.toLowerCase().trim(), first_name: first_name ?? null });

  if (error) {
    if (error.code === "23505") {
      // Already subscribed — treat as success to avoid enumeration
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
