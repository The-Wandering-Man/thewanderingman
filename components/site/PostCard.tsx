import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

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
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border overflow-hidden hover:shadow-md transition-shadow"
      style={{ borderColor: "#E2E0DC" }}
    >
      {post.featured_image_url && (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      )}

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-2">
          <Badge type={post.content_type} />
          {post.category && (
            <span className="text-xs" style={{ color: "#6B6B6B" }}>
              {post.category}
            </span>
          )}
        </div>

        <h3
          className="text-base font-bold leading-snug group-hover:underline underline-offset-2"
          style={{ color: "#0D0D0D" }}
        >
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "#6B6B6B" }}>
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 mt-auto pt-2">
          {post.author?.photo_url && (
            <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
              <Image
                src={post.author.photo_url}
                alt={post.author.name}
                fill
                className="object-cover"
                sizes="24px"
              />
            </div>
          )}
          <span className="text-xs" style={{ color: "#6B6B6B" }}>
            {post.author?.name ?? "The Wandering Man"}
            {post.published_at && (
              <> &middot; {formatDate(post.published_at)}</>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
}
