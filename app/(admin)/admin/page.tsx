import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = { title: "Dashboard | TWM Admin" };

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ data: recentPosts }, { data: drafts }, { data: upcomingEvents }] =
    await Promise.all([
      supabase
        .from("posts")
        .select("id, title, slug, content_type, published_at, status")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(5),
      supabase
        .from("posts")
        .select("id, title, content_type, updated_at")
        .eq("status", "draft")
        .order("updated_at", { ascending: false })
        .limit(5),
      supabase
        .from("events")
        .select("id, title, starts_at, event_type, location_name")
        .eq("is_active", true)
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(5),
    ]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F7F4" }}>
      <AdminNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-extrabold mb-10" style={{ color: "#0D0D0D" }}>
          Dashboard
        </h1>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { label: "New Post", href: "/admin/posts/new", accent: true },
            { label: "New Event", href: "/admin/events/new", accent: false },
            { label: "View Site", href: "/", accent: false },
            { label: "View Events", href: "/events", accent: false },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              target={a.href.startsWith("/") && !a.href.startsWith("/admin") ? "_blank" : undefined}
              className="block text-center py-3 px-4 rounded-xl text-sm font-bold transition-opacity hover:opacity-80"
              style={
                a.accent
                  ? { backgroundColor: "#39E75F", color: "#0D0D0D" }
                  : { backgroundColor: "#0D0D0D", color: "#F8F7F4" }
              }
            >
              {a.label}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recent published */}
          <div
            className="md:col-span-1 rounded-2xl border p-5"
            style={{ borderColor: "#E2E0DC" }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6B6B6B" }}>
              Recently Published
            </h2>
            {!recentPosts?.length ? (
              <p className="text-sm" style={{ color: "#6B6B6B" }}>No published posts yet.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {recentPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-sm font-medium hover:underline block truncate"
                      style={{ color: "#0D0D0D" }}
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs" style={{ color: "#6B6B6B" }}>
                      {post.content_type} &middot;{" "}
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString("en-AU")
                        : "—"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Drafts */}
          <div
            className="md:col-span-1 rounded-2xl border p-5"
            style={{ borderColor: "#E2E0DC" }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6B6B6B" }}>
              Drafts
            </h2>
            {!drafts?.length ? (
              <p className="text-sm" style={{ color: "#6B6B6B" }}>No drafts.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {drafts.map((post) => (
                  <li key={post.id}>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-sm font-medium hover:underline block truncate"
                      style={{ color: "#0D0D0D" }}
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs" style={{ color: "#6B6B6B" }}>
                      {post.content_type} &middot; updated{" "}
                      {new Date(post.updated_at).toLocaleDateString("en-AU")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Upcoming events */}
          <div
            className="md:col-span-1 rounded-2xl border p-5"
            style={{ borderColor: "#E2E0DC" }}
          >
            <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#6B6B6B" }}>
              Upcoming Events
            </h2>
            {!upcomingEvents?.length ? (
              <p className="text-sm" style={{ color: "#6B6B6B" }}>No upcoming events.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-sm font-medium hover:underline block truncate"
                      style={{ color: "#0D0D0D" }}
                    >
                      {event.title}
                    </Link>
                    <p className="text-xs" style={{ color: "#6B6B6B" }}>
                      {new Date(event.starts_at).toLocaleDateString("en-AU", {
                        day: "numeric",
                        month: "short",
                      })}{" "}
                      &middot; {event.location_name ?? "—"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
