import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
