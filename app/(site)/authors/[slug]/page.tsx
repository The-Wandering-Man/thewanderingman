import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import PostCard, { type Post } from "@/components/site/PostCard";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("authors")
    .select("name, bio, title")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Author Not Found" };

  return {
    title: `${data.name} | The Wandering Man`,
    description: data.bio ?? `Stories and articles by ${data.name}.`,
    alternates: { canonical: `/authors/${slug}` },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const [{ data: author }, { data: posts }] = await Promise.all([
    supabase
      .from("authors")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single(),
    supabase
      .from("posts")
      .select(
        "id, title, slug, excerpt, featured_image_url, content_type, category, published_at, author:authors(name, slug, photo_url)"
      )
      .eq("status", "published")
      .order("published_at", { ascending: false }),
  ]);

  if (!author) notFound();

  // Filter posts by author after fetch (join on author_id)
  const { data: authorPosts } = await supabase
    .from("posts")
    .select(
      "id, title, slug, excerpt, featured_image_url, content_type, category, published_at, author:authors(name, slug, photo_url)"
    )
    .eq("author_id", author.id)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.bio,
    jobTitle: author.title,
    url: `https://www.thewanderingman.com.au/authors/${author.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <section
        className="px-4 sm:px-6 lg:px-8 py-16"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="max-w-3xl mx-auto flex items-start gap-6">
          {author.photo_url && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
              <Image
                src={author.photo_url}
                alt={author.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#F8F7F4" }}>
              {author.name}
            </h1>
            {author.title && (
              <p className="text-sm mb-3" style={{ color: "#39E75F" }}>
                {author.title}
                {author.credentials && `, ${author.credentials}`}
              </p>
            )}
            {author.bio && (
              <p className="text-base leading-relaxed" style={{ color: "#6B6B6B" }}>
                {author.bio}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-8" style={{ color: "#0D0D0D" }}>
            Stories by {author.name}
          </h2>
          {!authorPosts || authorPosts.length === 0 ? (
            <p style={{ color: "#6B6B6B" }}>No published stories yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={{
                    ...post,
                    author: Array.isArray(post.author) ? post.author[0] ?? null : post.author,
                  } as Post}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
