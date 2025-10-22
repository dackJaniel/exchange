import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: "out",
  serverExternalPackages: [],
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
