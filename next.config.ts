import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react"],
  },
};

export default nextConfig;
