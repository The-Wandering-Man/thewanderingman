import { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thewanderingman.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/events`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/resources`, lastModified: new Date(), priority: 0.8 },
    { url: `${siteUrl}/speaking`, lastModified: new Date(), priority: 0.7 },
  ];

  // Dynamic post/event routes will be added once Supabase is connected

  return staticRoutes;
}
