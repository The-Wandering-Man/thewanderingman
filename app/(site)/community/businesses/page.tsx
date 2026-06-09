import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Member Businesses | The Wandering Man Geelong",
  description:
    "Shop local. Browse businesses owned and run by Wandering Man members across Geelong.",
  alternates: { canonical: "/community/businesses" },
};

export const revalidate = 1800;

interface MemberBusiness {
  id: string;
  business_name: string;
  owner_display_name: string | null;
  category: string | null;
  description: string | null;
  suburb: string | null;
  website_url: string | null;
  phone: string | null;
}

const CATEGORY_COLOURS: Record<string, { bg: string; text: string }> = {
  trades: { bg: "#FFF3E0", text: "#E65100" },
  services: { bg: "#E3F2FD", text: "#1565C0" },
  retail: { bg: "#F3E5F5", text: "#6A1B9A" },
  food: { bg: "#E8F5E9", text: "#2E7D32" },
  health: { bg: "#FCE4EC", text: "#880E4F" },
};

export default async function BusinessesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("member_businesses")
    .select(
      "id, business_name, owner_display_name, category, description, suburb, website_url, phone"
    )
    .eq("is_approved", true)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const businesses = (data ?? []) as MemberBusiness[];

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
            Member Businesses
          </h1>
          <p className="text-lg mb-8 max-w-2xl" style={{ color: "#6B6B6B" }}>
            Shop local. These businesses are owned and run by Wandering Man members.
            When you use them, you're supporting the community directly.
          </p>
          <Link
            href="/community/businesses/list"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-bold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#0D0D0D", color: "#39E75F" }}
          >
            List your business
          </Link>
        </div>
      </section>

      {/* Listings */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {businesses.length === 0 ? (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ borderColor: "#E2E0DC" }}
            >
              <p className="text-lg font-bold mb-2" style={{ color: "#0D0D0D" }}>
                No businesses listed yet
              </p>
              <p className="text-sm mb-6" style={{ color: "#6B6B6B" }}>
                Be the first to list your business.
              </p>
              <Link
                href="/community/businesses/list"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#39E75F", color: "#0D0D0D" }}
              >
                List your business
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {businesses.map((b) => {
                const colours = b.category
                  ? (CATEGORY_COLOURS[b.category] ?? { bg: "#F8F7F4", text: "#6B6B6B" })
                  : { bg: "#F8F7F4", text: "#6B6B6B" };
                return (
                  <div
                    key={b.id}
                    className="rounded-2xl border p-6 flex flex-col"
                    style={{ borderColor: "#E2E0DC" }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h2 className="text-base font-extrabold" style={{ color: "#0D0D0D" }}>
                        {b.business_name}
                      </h2>
                      {b.category && (
                        <span
                          className="shrink-0 px-2.5 py-0.5 rounded-full text-xs font-bold capitalize"
                          style={{ backgroundColor: colours.bg, color: colours.text }}
                        >
                          {b.category}
                        </span>
                      )}
                    </div>
                    {b.owner_display_name && (
                      <p className="text-xs mb-2" style={{ color: "#6B6B6B" }}>
                        Run by {b.owner_display_name}
                        {b.suburb ? ` · ${b.suburb}` : ""}
                      </p>
                    )}
                    {b.description && (
                      <p
                        className="text-sm leading-relaxed flex-1 mb-4 line-clamp-3"
                        style={{ color: "#0D0D0D" }}
                      >
                        {b.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-auto">
                      {b.phone && (
                        <a
                          href={`tel:${b.phone.replace(/\s/g, "")}`}
                          className="text-xs font-medium underline underline-offset-2"
                          style={{ color: "#0D0D0D" }}
                        >
                          {b.phone}
                        </a>
                      )}
                      {b.website_url && (
                        <a
                          href={b.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium underline underline-offset-2"
                          style={{ color: "#0D0D0D" }}
                        >
                          Website &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
