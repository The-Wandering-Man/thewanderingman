import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Badge from "@/components/ui/Badge";
import YoutubeEmbed from "@/components/ui/YoutubeEmbed";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("title, seo_title, seo_description, excerpt, featured_image_url, published_at")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Not Found" };

  return {
    title: data.seo_title ?? `${data.title} | The Wandering Man`,
    description: data.seo_description ?? data.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: data.published_at ?? undefined,
      images: data.featured_image_url ? [data.featured_image_url] : [],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select(
      "*, author:authors(name, slug, bio, title, credentials, photo_url)"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) notFound();

  const author = Array.isArray(post.author) ? post.author[0] : post.author;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    image: post.featured_image_url,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: `https://www.thewanderingman.com.au/authors/${author.slug}`,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "The Wandering Man",
      url: "https://www.thewanderingman.com.au",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-14 pb-10 overflow-hidden">
        <Image src="/hero.jpg" alt="The Wandering Man community" fill className="object-cover" style={{ objectPosition: "center 30%" }} priority sizes="100vw" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(13,13,13,0.80)" }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Badge type={post.content_type} />
            {post.category && (
              <span className="text-xs" style={{ color: "#6B6B6B" }}>
                {post.category}
              </span>
            )}
          </div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold leading-tight mb-5"
            style={{ color: "#F8F7F4" }}
          >
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg leading-relaxed mb-8" style={{ color: "#6B6B6B" }}>
              {post.excerpt}
            </p>
          )}

          {/* Author byline */}
          {author && (
            <div className="flex items-center gap-3">
              {author.photo_url && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={author.photo_url}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              )}
              <div>
                <Link
                  href={`/authors/${author.slug}`}
                  className="text-sm font-bold hover:underline"
                  style={{ color: "#F8F7F4" }}
                >
                  {author.name}
                </Link>
                {author.title && (
                  <p className="text-xs" style={{ color: "#6B6B6B" }}>
                    {author.title}
                    {author.credentials && `, ${author.credentials}`}
                  </p>
                )}
              </div>
              {post.published_at && (
                <span
                  className="text-xs ml-auto"
                  style={{ color: "#6B6B6B" }}
                >
                  {formatDate(post.published_at)}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured image */}
      {post.featured_image_url && !post.youtube_embed_id && (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-0">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </div>
      )}

      {/* YouTube embed */}
      {post.youtube_embed_id && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <YoutubeEmbed id={post.youtube_embed_id} title={post.title} />
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {post.content ? (
          <div
            className="prose prose-lg max-w-none"
            style={{ color: "#0D0D0D" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p style={{ color: "#6B6B6B" }}>Content coming soon.</p>
        )}
      </article>

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-t pt-8" style={{ borderColor: "#E2E0DC" }}>
        <Link
          href="/blog"
          className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
          style={{ color: "#6B6B6B" }}
        >
          &larr; All stories
        </Link>
      </div>
    </>
  );
}
