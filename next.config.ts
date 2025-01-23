import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 'picsum.photos', 'unsplash.com'],
  },
};

export default nextConfig;
