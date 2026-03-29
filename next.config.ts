import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/privacy", destination: "/policy", permanent: true },
    ];
  },
};

export default nextConfig;
