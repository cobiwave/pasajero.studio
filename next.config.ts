import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react"],
  },
};

export default withPayload(nextConfig);
