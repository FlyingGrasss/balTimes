import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.sanity.io/images/odbd6odh/production/**')],
  },
};

export default nextConfig;
