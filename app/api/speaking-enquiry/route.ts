import { createServiceClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { organisation, contact_name, contact_email, contact_phone, message } =
    body ?? {};

  if (!organisation || !contact_name || !contact_email) {
    return NextResponse.json(
      { error: "Organisation, name and email are required" },
      { status: 400 }
    );
  }

  const supabase = await createServiceClient();
  const { error } = await supabase.from("speaking_enquiries").insert({
    organisation,
    contact_name,
    contact_email,
    contact_phone: contact_phone ?? null,
    message: message ?? null,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
