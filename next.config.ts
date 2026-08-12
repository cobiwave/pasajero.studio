import path from "path";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap", "@gsap/react"],
  },
  sassOptions: {
    // sass-loader runs Dart Sass's modern API here (compileStringAsync is
    // defined), which reads `loadPaths` — the legacy `includePaths` key is
    // silently ignored in that mode.
    loadPaths: [path.join(__dirname, "src/styles")],
  },
};

export default withPayload(nextConfig);
