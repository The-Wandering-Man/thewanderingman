import Link from "next/link";
import Image from "next/image";

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  content_type: string;
  category: string | null;
  published_at: string | null;
  author: {
    name: string;
    slug: string;
    photo_url: string | null;
  } | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });
}

export default function PostCard({ post }: { post: Post }) {
  const label = [post.content_type, post.category].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-250 hover:-translate-y-1"
      style={{ background: "#FFFFFF", border: "1px solid #E5DCC9", textDecoration: "none", boxShadow: "0 1px 4px rgba(36,53,43,0.04)" }}
    >
      {post.featured_image_url && (
        <div className="relative w-full" style={{ height: 190 }}>
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}

      <div className="flex flex-col gap-2 p-6 flex-1">
        {label && (
          <span style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, fontSize: "13px", color: "#48745A", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {label}
          </span>
        )}

        <h3 style={{ margin: 0, fontFamily: "var(--font-display), sans-serif", fontWeight: 700, fontSize: "22px", lineHeight: 1.25, color: "#24352B" }}>
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="line-clamp-3 flex-1" style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: "17px", lineHeight: 1.55, color: "#5C6B60" }}>
            {post.excerpt}
          </p>
        )}

        <p style={{ margin: "4px 0 0", fontFamily: "var(--font-body), sans-serif", fontWeight: 600, fontSize: "15px", color: "#87988A" }}>
          {post.author?.name ?? "The Wandering Man"}
          {post.published_at && <> · {formatDate(post.published_at)}</>}
        </p>
      </div>
    </Link>
  );
}
