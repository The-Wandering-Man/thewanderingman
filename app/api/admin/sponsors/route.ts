import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  // Verify admin session
  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, ...fields } = await req.json();
    const supabase = await createServiceClient();

    if (id) {
      const { error } = await supabase.from("sponsors").update(fields).eq("id", id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("sponsors").insert(fields);
      if (error) throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("sponsor save error:", e);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
