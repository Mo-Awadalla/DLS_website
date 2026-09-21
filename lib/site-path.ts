import manifest from "@/release-manifest.json";

/** Optional path prefix for hosts that publish beneath a subdirectory. */
export function sitePath(path: string) {
  return `${process.env[manifest.environment.basePath] || ""}${path}`;
}

export function canonicalUrl() {
  return (
    process.env[manifest.environment.canonicalUrl] ||
    process.env[manifest.environment.canonicalUrlFallback] ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}
