import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import PostCard, { type Post } from "@/components/site/PostCard";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "Stories | The Wandering Man Geelong",
  description:
    "What actually happens when Geelong blokes show up for each other - event wraps, member yarns, and honest words on men's mental health.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 3600;

const CONTENT_TYPES = [
  { value: "", label: "All" },
  { value: "article", label: "Articles" },
  { value: "interview", label: "Interviews" },
  { value: "talk", label: "Talks" },
  { value: "update", label: "Updates" },
];

type Props = { searchParams: Promise<{ type?: string }> };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", { month: "long", year: "numeric" });
}

export default async function BlogPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, featured_image_url, content_type, category, published_at, is_featured, author:authors(name, slug, photo_url)"
    )
    .eq("status", "published")
    .order("is_featured", { ascending: false })
    .order("published_at", { ascending: false });

  if (type) query = query.eq("content_type", type);

  const { data: posts } = await query;

  const allPosts = (posts ?? []).map((p) => ({
    ...p,
    author: Array.isArray(p.author) ? p.author[0] ?? null : p.author,
  })) as (Post & { is_featured?: boolean })[];

  const featuredPost = !type ? (allPosts.find((p) => p.is_featured) ?? allPosts[0] ?? null) : null;
  const gridPosts = featuredPost ? allPosts.filter((p) => p.id !== featuredPost.id) : allPosts;

  return (
    <>
      {/* Hero */}
      <header style={{ background: "#192821", padding: "72px 28px 64px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 15, color: "#79A886", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            From the community
          </p>
          <h1 style={{ margin: "0 0 20px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.1, color: "#F4F1EA", maxWidth: "18ch" }}>
            Stories worth telling.
          </h1>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 20, lineHeight: 1.6, color: "#CBD5CB", maxWidth: "56ch" }}>
            What actually happens when Geelong blokes show up for each other — event wraps, member yarns, and honest words on men's mental health.
          </p>
        </div>
      </header>

      {/* Featured story */}
      {featuredPost && (
        <section style={{ background: "#F4F1EA", padding: "64px 28px 0" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Link
              href={`/blog/${featuredPost.slug}`}
              style={{ textDecoration: "none" }}
            >
              <article
                style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", borderRadius: 18, overflow: "hidden", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "stretch" }}
              >
                {featuredPost.featured_image_url ? (
                  <div className="relative" style={{ minHeight: 320 }}>
                    <Image
                      src={featuredPost.featured_image_url}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 560px"
                      priority
                    />
                  </div>
                ) : (
                  <div style={{ minHeight: 320, background: "#192821" }} />
                )}
                <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
                  <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 14, color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    Featured{featuredPost.category ? ` · ${featuredPost.category}` : ""}
                  </p>
                  <h2 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(26px, 3vw, 36px)", lineHeight: 1.15, color: "#24352B" }}>
                    {featuredPost.title}
                  </h2>
                  {featuredPost.excerpt && (
                    <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 18, lineHeight: 1.6, color: "#5C6B60" }}>
                      {featuredPost.excerpt}
                    </p>
                  )}
                  <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: 16, color: "#87988A" }}>
                    {featuredPost.published_at ? formatDate(featuredPost.published_at) : ""}
                    {featuredPost.author?.name ? ` · ${featuredPost.author.name}` : " · The Wandering Man crew"}
                  </p>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Filter tabs + grid */}
      <section style={{ background: "#F4F1EA", padding: "40px 28px 72px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {CONTENT_TYPES.map(({ value, label }) => {
              const active = (type ?? "") === value;
              return (
                <a
                  key={value}
                  href={value ? `/blog?type=${value}` : "/blog"}
                  className="rounded-full text-sm transition-colors"
                  style={{
                    padding: "8px 18px",
                    fontFamily: "var(--font-body), sans-serif",
                    fontWeight: 600,
                    textDecoration: "none",
                    ...(active
                      ? { background: "#24352B", color: "#F4F1EA" }
                      : { background: "#E6DECC", color: "#5C6B60" }),
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {gridPosts.length === 0 && !featuredPost ? (
            <div className="py-20 text-center">
              <p style={{ fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: 20, color: "#24352B", marginBottom: 8 }}>
                No stories published yet.
              </p>
              <p style={{ fontFamily: "var(--font-body), sans-serif", color: "#5C6B60" }}>Check back soon.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.slice(0, 3).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {gridPosts.length > 3 && (
                <>
                  <InlineSponsorAd />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.slice(3).map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          <p style={{ margin: "28px 0 0", fontFamily: "var(--font-body), sans-serif", fontSize: 15, lineHeight: 1.6, color: "#8A7F68" }}>
            The committee reviews each story, and members always approve their own words and photos before anything is published.
          </p>
        </div>
      </section>

      {/* Share your story CTA */}
      <section style={{ background: "#E6DECC", padding: "72px 28px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 40px)", lineHeight: 1.15, color: "#24352B" }}>
            Got a story? Tell it.
          </h2>
          <p style={{ margin: "0 0 28px", fontFamily: "var(--font-body), sans-serif", fontSize: 19, lineHeight: 1.6, color: "#5C6B60", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Your story might be the reason another bloke walks through the door. Share as much or as little as you like — first name only is fine, anonymous is fine too.
          </p>
          <a
            href="mailto:hello@thewanderingman.com.au?subject=My story"
            style={{ display: "inline-block", background: "#24352B", color: "#F4F1EA", fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: 18, textDecoration: "none", padding: "16px 26px", borderRadius: 10 }}
          >
            Share your story
          </a>
        </div>
      </section>
    </>
  );
}
