import type { NextConfig } from "next";
import { wpRedirects } from "./lib/wp-redirects";

const nextConfig: NextConfig = {
  images: {
    // YouTube poster frames used by components/ui/YoutubeEmbed.tsx
    remotePatterns: [{ protocol: "https", hostname: "img.youtube.com" }, { protocol: "https", hostname: "i.ytimg.com" }],
  },
  async redirects() {
    return [
      {
        source: "/sponsors/grovedale-quality-meats",
        destination: "/sponsors/grovedale-meats",
        permanent: true,
      },
      ...wpRedirects,
    ];
  },
};

export default nextConfig;
