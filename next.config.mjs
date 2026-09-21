import { releaseManifest } from "./scripts/release-manifest.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env[releaseManifest.environment.basePath] || "",
  output: releaseManifest.staticExport.output,
  trailingSlash: releaseManifest.staticExport.trailingSlash,
  images: {
    unoptimized: releaseManifest.staticExport.imagesUnoptimized,
  },
};

export default nextConfig;
