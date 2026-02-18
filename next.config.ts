import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vehicles',
        permanent: true, // Use permanent: true for a permanent, cacheable redirect
      },
    ];
  },
};

export default nextConfig;
