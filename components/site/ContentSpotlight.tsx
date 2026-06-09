import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";

export interface SpotlightPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  content_type: string;
  category: string | null;
  published_at: string | null;
  is_featured: boolean;
  spotlight_order: number | null;
  author: { name: string; slug: string; photo_url: string | null } | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function HeroCard({ post }: { post: SpotlightPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col justify-end overflow-hidden rounded-2xl"
      style={{ minHeight: 420 }}
    >
      {post.featured_image_url ? (
        <Image
          src={post.featured_image_url}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 55vw"
          priority
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: "#0D0D0D" }} />
      )}
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.4) 50%, transparent 100%)",
        }}
      />
      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center gap-2 mb-3">
          <Badge type={post.content_type} />
          {post.category && (
            <span className="text-xs" style={{ color: "rgba(248,247,244,0.6)" }}>
              {post.category}
            </span>
          )}
        </div>
        <h3
          className="text-xl sm:text-2xl font-extrabold leading-snug mb-2 group-hover:underline underline-offset-4"
          style={{ color: "#F8F7F4" }}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p
            className="text-sm leading-relaxed line-clamp-2 mb-3"
            style={{ color: "rgba(248,247,244,0.7)" }}
          >
            {post.excerpt}
          </p>
        )}
        <p className="text-xs" style={{ color: "rgba(248,247,244,0.5)" }}>
          {post.author?.name ?? "The Wandering Man"}
          {post.published_at && <> &middot; {formatDate(post.published_at)}</>}
        </p>
      </div>
    </Link>
  );
}

function SidebarCard({ post }: { post: SpotlightPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-4 items-start p-4 rounded-xl transition-colors hover:bg-gray-50"
    >
      {post.featured_image_url ? (
        <div
          className="relative shrink-0 rounded-lg overflow-hidden"
          style={{ width: 80, height: 72 }}
        >
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      ) : (
        <div
          className="shrink-0 rounded-lg"
          style={{ width: 80, height: 72, backgroundColor: "#E2E0DC" }}
        />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge type={post.content_type} />
        </div>
        <h4
          className="text-sm font-bold leading-snug line-clamp-2 group-hover:underline underline-offset-2"
          style={{ color: "#0D0D0D" }}
        >
          {post.title}
        </h4>
        {post.published_at && (
          <p className="text-xs mt-1" style={{ color: "#6B6B6B" }}>
            {formatDate(post.published_at)}
          </p>
        )}
      </div>
    </Link>
  );
}

interface Props {
  hero: SpotlightPost;
  sidebar: SpotlightPost[];
}

export default function ContentSpotlight({ hero, sidebar }: Props) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "#39E75F" }}
            >
              Latest &amp; Spotlighted
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0D0D0D" }}>
              From the community
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium underline underline-offset-4 hover:opacity-70 transition-opacity"
            style={{ color: "#0D0D0D" }}
          >
            All stories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Hero card - 3 cols */}
          <div className="lg:col-span-3">
            <HeroCard post={hero} />
          </div>

          {/* Sidebar - 2 cols */}
          <div
            className="lg:col-span-2 flex flex-col divide-y rounded-2xl border overflow-hidden"
            style={{ borderColor: "#E2E0DC" }}
          >
            {sidebar.map((post) => (
              <SidebarCard key={post.id} post={post} />
            ))}
            {sidebar.length === 0 && (
              <div className="p-6 text-sm" style={{ color: "#6B6B6B" }}>
                More stories coming soon.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
