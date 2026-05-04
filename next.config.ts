import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/ABC-site" : undefined,
  assetPrefix: isGitHubPages ? "/ABC-site/" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
