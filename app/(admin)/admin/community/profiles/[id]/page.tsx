import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import ApproveButton from "@/components/admin/ApproveButton";

export const dynamic = "force-dynamic";

export default async function ReviewProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("member_profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();
  const p = data;

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/admin/community"
          className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 mb-6 inline-block"
          style={{ color: "#F8F7F4" }}
        >
          &larr; Community
        </Link>
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <h1 className="text-xl font-extrabold" style={{ color: "#F8F7F4" }}>
            {p.display_name}
          </h1>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{
              backgroundColor: p.is_approved ? "#39E75F22" : "#F59E0B22",
              color: p.is_approved ? "#39E75F" : "#F59E0B",
            }}
          >
            {p.is_approved ? "Live" : "Pending approval"}
          </span>
        </div>

        <div
          className="rounded-2xl border divide-y mb-8"
          style={{ borderColor: "rgba(248,247,244,0.1)" }}
        >
          {[
            { label: "Headline", value: p.headline },
            { label: "Suburb", value: p.suburb },
            { label: "Skills", value: p.skills?.join(", ") },
            { label: "Years experience", value: p.years_experience },
            { label: "Looking for", value: p.looking_for },
            { label: "Work history", value: p.work_history },
            { label: "Achievements", value: p.achievements },
            { label: "Email (private)", value: p.contact_email },
            { label: "Phone (private)", value: p.contact_phone },
          ].map(({ label, value }) =>
            value ? (
              <div
                key={label}
                className="p-4"
                style={{ borderColor: "rgba(248,247,244,0.08)" }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: "rgba(248,247,244,0.4)" }}
                >
                  {label}
                </p>
                <p className="text-sm whitespace-pre-wrap" style={{ color: "#F8F7F4" }}>
                  {String(value)}
                </p>
              </div>
            ) : null
          )}
        </div>

        <div className="flex gap-3">
          <ApproveButton
            id={id}
            table="member_profiles"
            currentState={p.is_approved}
          />
        </div>
      </div>
    </div>
  );
}
