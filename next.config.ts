import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  images: {
    // /uploads/... is local (public/uploads), no config required for that.
    // These are only for *external* URLs like Vercel Blob or your domain.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "edschool.pk",
      },
      {
        protocol: "http",
        hostname: "194.163.173.45",
      },
    ],
  },
};

export default nextConfig;
