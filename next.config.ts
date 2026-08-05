import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/sponsors/grovedale-quality-meats",
        destination: "/sponsors/grovedale-meats",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
