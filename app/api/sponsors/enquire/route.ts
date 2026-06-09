import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { org_name, contact_name, contact_email, contact_phone, tier_interest, message } =
      body;

    if (!org_name || !contact_name || !contact_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const { error } = await supabase.from("sponsor_enquiries").insert({
      org_name: org_name.trim(),
      contact_name: contact_name.trim(),
      contact_email: contact_email.trim(),
      contact_phone: contact_phone || null,
      tier_interest: tier_interest || null,
      message: message || null,
    });

    if (error) {
      console.error("sponsor_enquiries insert error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
