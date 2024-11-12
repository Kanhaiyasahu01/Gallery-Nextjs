import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental:{
    serverActions:{
      bodySizeLimit:'20mb'
    },
    
  },
  images: {
    domains: ['res.cloudinary.com', 'example.com'],
  },
  
  /* config options here */
};

export default nextConfig;
