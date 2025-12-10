import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes : {
      dynamic: 30,
      static: 30,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
