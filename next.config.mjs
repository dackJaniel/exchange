/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect old waehrungsrechner URLs to the main German page
      {
        source: "/waehrungsrechner/:path*",
        destination: "/de",
        permanent: true,
      },
      // Redirect old currency-converter URLs to convert
      {
        source: "/currency-converter/:path*",
        destination: "/convert",
        permanent: true,
      },
    ];
  },

  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // PWA and performance optimizations
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
