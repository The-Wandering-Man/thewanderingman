import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TABLES = ["member_profiles", "member_businesses"] as const;
type AllowedTable = (typeof ALLOWED_TABLES)[number];

export async function POST(req: NextRequest) {
  // Verify admin session
  const authClient = await createClient();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, table, approve } = await req.json();
    if (!id || !table || typeof approve !== "boolean") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
      return NextResponse.json({ error: "Invalid table" }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { error } = await supabase
      .from(table as AllowedTable)
      .update({ is_approved: approve })
      .eq("id", id);

    if (error) {
      console.error("approve error:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
