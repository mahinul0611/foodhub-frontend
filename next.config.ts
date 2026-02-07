import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats:["image/avif","image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.bigfootdigital.co.uk',
        
      },
       {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        
      },
    ],
  },
};

export default nextConfig;
