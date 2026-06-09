import Link from "next/link";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface MemberProfile {
  id: string;
  display_name: string;
  headline: string | null;
  suburb: string | null;
  contact_email: string;
  is_approved: boolean;
  created_at: string;
}

interface MemberBusiness {
  id: string;
  business_name: string;
  owner_display_name: string | null;
  category: string | null;
  email: string;
  is_approved: boolean;
  created_at: string;
}

export default async function AdminCommunityPage() {
  const supabase = createServiceClient();

  const [{ data: profilesData }, { data: bizData }] = await Promise.all([
    supabase
      .from("member_profiles")
      .select("id, display_name, headline, suburb, contact_email, is_approved, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("member_businesses")
      .select("id, business_name, owner_display_name, category, email, is_approved, created_at")
      .order("created_at", { ascending: false }),
  ]);

  const profiles = (profilesData ?? []) as MemberProfile[];
  const businesses = (bizData ?? []) as MemberBusiness[];
  const pendingProfiles = profiles.filter((p) => !p.is_approved);
  const pendingBiz = businesses.filter((b) => !b.is_approved);

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: "#0D0D0D" }}>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/admin/dashboard"
          className="text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 mb-3 inline-block"
          style={{ color: "#F8F7F4" }}
        >
          &larr; Dashboard
        </Link>
        <h1 className="text-2xl font-extrabold mb-8" style={{ color: "#F8F7F4" }}>
          Community
        </h1>

        {/* Pending badges */}
        {(pendingProfiles.length > 0 || pendingBiz.length > 0) && (
          <div
            className="rounded-xl border p-4 mb-8 flex gap-6 flex-wrap"
            style={{ borderColor: "#F59E0B44", backgroundColor: "#F59E0B11" }}
          >
            <p className="text-sm font-bold" style={{ color: "#F59E0B" }}>
              Needs approval:
            </p>
            {pendingProfiles.length > 0 && (
              <span className="text-sm" style={{ color: "#F8F7F4" }}>
                {pendingProfiles.length} job profile{pendingProfiles.length !== 1 ? "s" : ""}
              </span>
            )}
            {pendingBiz.length > 0 && (
              <span className="text-sm" style={{ color: "#F8F7F4" }}>
                {pendingBiz.length} business listing{pendingBiz.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        )}

        {/* Job Profiles */}
        <section className="mb-12">
          <h2 className="text-base font-extrabold mb-4" style={{ color: "#F8F7F4" }}>
            Job Profiles
          </h2>
          {profiles.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(248,247,244,0.4)" }}>
              No profiles submitted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {profiles.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-4 rounded-xl border p-5"
                  style={{ borderColor: "rgba(248,247,244,0.1)" }}
                >
                  <div className="min-w-0">
                    <p className="font-bold" style={{ color: "#F8F7F4" }}>
                      {p.display_name}
                    </p>
                    {p.headline && (
                      <p className="text-sm truncate" style={{ color: "rgba(248,247,244,0.6)" }}>
                        {p.headline}
                      </p>
                    )}
                    <p className="text-xs mt-1" style={{ color: "rgba(248,247,244,0.3)" }}>
                      {p.contact_email}
                      {p.suburb ? ` · ${p.suburb}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: p.is_approved ? "#39E75F22" : "#F59E0B22",
                        color: p.is_approved ? "#39E75F" : "#F59E0B",
                      }}
                    >
                      {p.is_approved ? "Live" : "Pending"}
                    </span>
                    <Link
                      href={`/admin/community/profiles/${p.id}`}
                      className="text-xs font-bold underline underline-offset-2 hover:opacity-70"
                      style={{ color: "#F8F7F4" }}
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Businesses */}
        <section>
          <h2 className="text-base font-extrabold mb-4" style={{ color: "#F8F7F4" }}>
            Member Businesses
          </h2>
          {businesses.length === 0 ? (
            <p className="text-sm" style={{ color: "rgba(248,247,244,0.4)" }}>
              No businesses submitted yet.
            </p>
          ) : (
            <div className="space-y-3">
              {businesses.map((b) => (
                <div
                  key={b.id}
                  className="flex items-start justify-between gap-4 rounded-xl border p-5"
                  style={{ borderColor: "rgba(248,247,244,0.1)" }}
                >
                  <div className="min-w-0">
                    <p className="font-bold" style={{ color: "#F8F7F4" }}>
                      {b.business_name}
                    </p>
                    {b.owner_display_name && (
                      <p className="text-sm" style={{ color: "rgba(248,247,244,0.6)" }}>
                        {b.owner_display_name}
                        {b.category ? ` · ${b.category}` : ""}
                      </p>
                    )}
                    <p className="text-xs mt-1" style={{ color: "rgba(248,247,244,0.3)" }}>
                      {b.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: b.is_approved ? "#39E75F22" : "#F59E0B22",
                        color: b.is_approved ? "#39E75F" : "#F59E0B",
                      }}
                    >
                      {b.is_approved ? "Live" : "Pending"}
                    </span>
                    <Link
                      href={`/admin/community/businesses/${b.id}`}
                      className="text-xs font-bold underline underline-offset-2 hover:opacity-70"
                      style={{ color: "#F8F7F4" }}
                    >
                      Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
