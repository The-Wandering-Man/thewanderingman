import { createServiceClient } from "@/lib/supabase/server";
import { melbourneDate } from "@/lib/melbourne-day";
import { isSignInEvent } from "@/lib/signin-events";

// CSV of one day's door sign-ins. Lives under /admin so proxy.ts requires a
// logged-in committee member.
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function csvCell(v: string | null): string {
  const s = v ?? "";
  // Quote everything; neutralise leading =+-@ so Excel won't run it as a formula.
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const param = params.get("date") ?? "";
  const date = DATE_RE.test(param) ? param : melbourneDate();
  const eventParam = params.get("event");
  const event = isSignInEvent(eventParam) ? eventParam : null;

  const supabase = await createServiceClient();
  let query = supabase
    .from("bbq_signins")
    .select("name, email, phone, event, created_at")
    .eq("event_date", date)
    .order("created_at", { ascending: true });
  if (event) query = query.eq("event", event);
  const { data, error } = await query;

  if (error) return new Response("Could not load sign-ins", { status: 500 });

  const lines = [
    "date,event,name,email,phone,signed_in_at",
    ...(data ?? []).map((r) =>
      [date, r.event, r.name, r.email, r.phone, r.created_at].map(csvCell).join(",")
    ),
  ];

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="twm-sign-ins-${event ? `${event}-` : ""}${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
