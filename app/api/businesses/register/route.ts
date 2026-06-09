import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      business_name,
      owner_first_name,
      owner_last_initial,
      category,
      description,
      suburb,
      phone,
      email,
      website_url,
    } = body;

    if (!business_name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const owner_display_name =
      owner_first_name && owner_last_initial
        ? `${owner_first_name.trim()} ${owner_last_initial.trim().toUpperCase()}.`
        : owner_first_name?.trim() || null;

    const supabase = createServiceClient();
    const { error } = await supabase.from("member_businesses").insert({
      business_name: business_name.trim(),
      owner_display_name,
      category: category || null,
      description: description || null,
      suburb: suburb || null,
      phone: phone || null,
      email: email.trim(),
      website_url: website_url || null,
      is_approved: false,
    });

    if (error) {
      console.error("member_businesses insert error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
