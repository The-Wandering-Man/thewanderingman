import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface Sponsor {
  id: string;
  org_name: string;
  slug: string;
  tier: string;
  is_active: boolean;
  renewal_date: string | null;
  contact_email: string | null;
  created_at: string;
}

const TIER_COLOURS: Record<string, string> = {
  gold: "#F59E0B",
  silver: "#6B7280",
  bronze: "#92400E",
  community: "#3B82F6",
};

export default async function AdminSponsorsPage() {
  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("sponsors")
    .select("id, org_name, slug, tier, is_active, renewal_date, contact_email, created_at")
    .order("created_at", { ascending: false });

  const sponsors = (data ?? []) as Sponsor[];

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <Link
              href="/admin/dashboard"
              className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 mb-3 inline-block"
              style={{ color: "#F8F7F4" }}
            >
              &larr; Dashboard
            </Link>
            <h1 className="text-2xl font-extrabold" style={{ color: "#F8F7F4" }}>
              Sponsors
            </h1>
          </div>
          <Link
            href="/admin/sponsors/new"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-bold"
            style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
          >
            + Add sponsor
          </Link>
        </div>

        {sponsors.length === 0 ? (
          <p className="text-sm" style={{ color: "rgba(248,247,244,0.5)" }}>
            No sponsors yet.
          </p>
        ) : (
          <div className="space-y-3">
            {sponsors.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between gap-4 rounded-xl border p-5"
                style={{ borderColor: "rgba(248,247,244,0.1)" }}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className="text-xs font-extrabold uppercase px-2 py-1 rounded"
                    style={{
                      backgroundColor: TIER_COLOURS[s.tier] + "22",
                      color: TIER_COLOURS[s.tier] ?? "#F8F7F4",
                    }}
                  >
                    {s.tier}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold truncate" style={{ color: "#F8F7F4" }}>
                      {s.org_name}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(248,247,244,0.4)" }}>
                      /sponsors/{s.slug}
                      {s.renewal_date ? ` · Renews ${s.renewal_date}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: s.is_active ? "#39E75F22" : "rgba(248,247,244,0.08)",
                      color: s.is_active ? "#39E75F" : "rgba(248,247,244,0.4)",
                    }}
                  >
                    {s.is_active ? "Active" : "Inactive"}
                  </span>
                  <Link
                    href={`/admin/sponsors/${s.id}/edit`}
                    className="text-xs font-bold underline underline-offset-2 hover:opacity-70"
                    style={{ color: "#F8F7F4" }}
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/sponsors/${s.slug}`}
                    target="_blank"
                    className="text-xs font-bold underline underline-offset-2 hover:opacity-70"
                    style={{ color: "#39E75F" }}
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
