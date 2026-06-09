import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Member Job Board | The Wandering Man Geelong",
  description:
    "Geelong men helping each other find work. Browse member profiles and connect with experienced local workers.",
  alternates: { canonical: "/community/jobs" },
};

export const revalidate = 1800;

interface MemberProfile {
  id: string;
  display_name: string;
  suburb: string | null;
  headline: string | null;
  skills: string[] | null;
  years_experience: number | null;
  looking_for: string | null;
  created_at: string;
}

const LOOKING_FOR_LABEL: Record<string, string> = {
  "full-time": "Full-time",
  "part-time": "Part-time",
  casual: "Casual",
  any: "Open to anything",
};

export default async function JobsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_profiles")
    .select(
      "id, display_name, suburb, headline, skills, years_experience, looking_for, created_at"
    )
    .eq("is_approved", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const profiles = (data ?? []) as MemberProfile[];

  return (
    <>
      {/* Hero */}
      <section
        className="px-4 sm:px-6 lg:px-8 py-16 border-b"
        style={{ borderColor: "#E2E0DC" }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#39E75F" }}
          >
            Community
          </p>
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-5"
            style={{ color: "#0D0D0D" }}
          >
            Member Job Board
          </h1>
          <p className="text-lg mb-8 max-w-2xl" style={{ color: "#6B6B6B" }}>
            Blokes helping blokes find work. Browse profiles of Wandering Man
            members who are looking for their next opportunity - and if you need
            someone, reach out.
          </p>
          <Link
            href="/community/jobs/join"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0D0D0D", color: "#39E75F" }}
          >
            Add your profile
          </Link>
        </div>
      </section>

      {/* Listings */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {profiles.length === 0 ? (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ borderColor: "#E2E0DC" }}
            >
              <p className="text-lg font-bold mb-2" style={{ color: "#0D0D0D" }}>
                No profiles yet
              </p>
              <p className="text-sm mb-6" style={{ color: "#6B6B6B" }}>
                Be the first to add your profile to the board.
              </p>
              <Link
                href="/community/jobs/join"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
              >
                Add your profile
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {profiles.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border p-6"
                  style={{ borderColor: "#E2E0DC" }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div>
                      <h2 className="text-xl font-extrabold" style={{ color: "#0D0D0D" }}>
                        {p.display_name}
                      </h2>
                      {p.suburb && (
                        <p className="text-sm" style={{ color: "#6B6B6B" }}>
                          {p.suburb}, Geelong
                        </p>
                      )}
                    </div>
                    {p.looking_for && (
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
                      >
                        {LOOKING_FOR_LABEL[p.looking_for] ?? p.looking_for}
                      </span>
                    )}
                  </div>
                  {p.headline && (
                    <p className="text-base mb-4" style={{ color: "#0D0D0D" }}>
                      {p.headline}
                    </p>
                  )}
                  {p.years_experience != null && (
                    <p className="text-sm mb-3" style={{ color: "#6B6B6B" }}>
                      {p.years_experience}+ years experience
                    </p>
                  )}
                  {p.skills && p.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {p.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-medium border"
                          style={{ borderColor: "#E2E0DC", color: "#0D0D0D" }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
