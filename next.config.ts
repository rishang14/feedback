import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["media0.giphy.com"], 
  }, 
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
  experimental:{
    nodeMiddleware:true
  }
};

export default nextConfig;
