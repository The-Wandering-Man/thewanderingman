import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import PostCard, { type Post } from "@/components/site/PostCard";
import InlineSponsorAd from "@/components/site/InlineSponsorAd";

export const metadata: Metadata = {
  title: "Stories | The Wandering Man Geelong",
  description:
    "Articles, interviews, and community stories from The Wandering Man. Real conversations about men's mental health in Geelong.",
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

export default async function BlogPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, featured_image_url, content_type, category, published_at, author:authors(name, slug, photo_url)"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (type) query = query.eq("content_type", type);

  const { data: posts } = await query;

  return (
    <>
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
        <Image src="/hero.jpg" alt="The Wandering Man community" fill className="object-cover" style={{ objectPosition: "center 30%" }} priority sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,13,13,0.75)" }} />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#39E75F" }}>
            Stories
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4" style={{ color: "#F8F7F4" }}>
            From the community
          </h1>
          <p className="text-lg" style={{ color: "rgba(248,247,244,0.7)" }}>
            Real stories, expert insight, and honest conversations about men's mental health.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-5xl mx-auto">
          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-10">
            {CONTENT_TYPES.map(({ value, label }) => {
              const active = (type ?? "") === value;
              return (
                <a
                  key={value}
                  href={value ? `/blog?type=${value}` : "/blog"}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={
                    active
                      ? { backgroundColor: "#0D0D0D", color: "#F8F7F4" }
                      : {
                          backgroundColor: "#F0EFEC",
                          color: "#6B6B6B",
                        }
                  }
                >
                  {label}
                </a>
              );
            })}
          </div>

          {!posts || posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-bold mb-2" style={{ color: "#0D0D0D" }}>
                No stories published yet.
              </p>
              <p className="text-sm" style={{ color: "#6B6B6B" }}>
                Check back soon.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(0, 3).map((post) => (
                  <PostCard
                    key={post.id}
                    post={{
                      ...post,
                      author: Array.isArray(post.author) ? post.author[0] ?? null : post.author,
                    } as Post}
                  />
                ))}
              </div>

              {posts.length > 3 && (
                <>
                  <InlineSponsorAd />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(3).map((post) => (
                      <PostCard
                        key={post.id}
                        post={{
                          ...post,
                          author: Array.isArray(post.author) ? post.author[0] ?? null : post.author,
                        } as Post}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
