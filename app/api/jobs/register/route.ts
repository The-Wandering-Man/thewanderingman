import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      first_name,
      last_initial,
      suburb,
      headline,
      skills_raw,
      years_experience,
      work_history,
      achievements,
      looking_for,
      contact_email,
      contact_phone,
    } = body;

    if (!first_name || !contact_email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const display_name = last_initial
      ? `${first_name.trim()} ${last_initial.trim().toUpperCase()}.`
      : first_name.trim();

    const skills = skills_raw
      ? skills_raw
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

    const supabase = createServiceClient();
    const { error } = await supabase.from("member_profiles").insert({
      display_name,
      suburb: suburb || null,
      headline: headline || null,
      skills: skills.length ? skills : null,
      years_experience: years_experience ? parseInt(years_experience) : null,
      work_history: work_history || null,
      achievements: achievements || null,
      looking_for: looking_for || null,
      contact_email: contact_email.trim(),
      contact_phone: contact_phone || null,
      is_approved: false,
    });

    if (error) {
      console.error("member_profiles insert error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
