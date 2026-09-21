import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const manifestUrl = new URL("../release-manifest.json", import.meta.url);
export const releaseManifest = JSON.parse(readFileSync(fileURLToPath(manifestUrl), "utf8"));

export function getBasePath() {
  return process.env[releaseManifest.environment.basePath] || "";
}

export function getCanonicalUrl() {
  return (
    process.env[releaseManifest.environment.canonicalUrl] ||
    process.env[releaseManifest.environment.canonicalUrlFallback] ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}
