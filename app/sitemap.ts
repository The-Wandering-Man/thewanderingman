import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thewanderingman.com.au";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  const [{ data: posts }, { data: events }] = await Promise.all([
    supabase
      .from("posts")
      .select("slug, updated_at")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase
      .from("events")
      .select("slug, created_at")
      .eq("is_active", true),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/events`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/calendar`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/community/jobs`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/community/businesses`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/resources`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/speaking`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/sponsors`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/sponsors/grovedale-meats`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/for-professionals`, lastModified: new Date(), priority: 0.7 },
    { url: `${siteUrl}/governance`, lastModified: new Date(), priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    priority: 0.7,
  }));

  const eventRoutes: MetadataRoute.Sitemap = (events ?? []).map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.created_at),
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes, ...eventRoutes];
}
