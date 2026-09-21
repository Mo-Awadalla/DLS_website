import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { getBasePath, getCanonicalUrl, releaseManifest } from "./release-manifest.mjs";

const root = fileURLToPath(new URL(`../${releaseManifest.exportDirectory}/`, import.meta.url));
function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}
const files = filesIn(root);
const paths = files.map((path) => relative(root, path));
const routeOutput = (route) => {
  if (route === "/") return "index.html";
  const path = route.replace(/^\//, "");
  return path.endsWith("/") ? `${path}index.html` : path;
};
const expectedRoutes = releaseManifest.routes.public.map(routeOutput);
const allowedFiles = new Set([
  ...expectedRoutes,
  ...releaseManifest.staticExport.frameworkFiles,
  ...releaseManifest.publicAssets.map((asset) => asset.replace(/^\//, "")),
]);
const unexpectedFiles = paths.filter((path) => !allowedFiles.has(path) && !releaseManifest.staticExport.generatedDirectories.some((directory) => path.startsWith(directory)));
assert.deepEqual(unexpectedFiles, [], "Only manifest-listed routes, assets, and framework output may ship");
for (const route of releaseManifest.routes.retired) {
  const path = route.replace(/^\//, "").replace(/\/$/, "");
  assert(!existsSync(resolve(root, path)), `Unpublished route exported: ${route}`);
}
assert.deepEqual(paths.filter((path) => path.startsWith("assets/")).sort(), releaseManifest.publicAssets.map((asset) => asset.replace(/^\//, "")).sort());
assert(!paths.some((path) => /\.(pdf|map)$/i.test(path)), "Private PDFs or source maps were exported");
for (const file of files.filter((path) => /\.(html|txt|js|css|json)$/i.test(path))) {
  assert(!/Jeh Johnson|Keynote Address|editorial draft|Request updates by email|CLE approval|Cybersecurity, Privacy, and Data Protection credits|redesign-staging|urban-signal-date/.test(readFileSync(file, "utf8")), `Unpublished content in ${relative(root, file)}`);
}
const home = readFileSync(resolve(root, "index.html"), "utf8");
const basePath = getBasePath();
const canonicalUrl = getCanonicalUrl();
assert(!home.includes("Stay tuned for the 2026 Symposium"), "The placeholder must not ship");
for (const path of ["/assets/nyc-skyline.jpg", "/assets/nycem-logo-transparent.png", "/disaster-law-symposium-2026.ics"]) {
  assert(home.includes(`"${basePath}${path}"`), `Missing deployment prefix for ${path}`);
}
const renderedCanonical = home.match(/rel="canonical" href="([^"]+)"/)?.[1];
assert.equal(renderedCanonical?.replace(/\/$/, ""), canonicalUrl.replace(/\/$/, ""));
for (const [, url] of home.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
  assert(url.startsWith(`${basePath}/`), `Unprefixed local URL: ${url}`);
  const path = url.slice(basePath.length).split(/[?#]/)[0];
  assert(existsSync(resolve(root, `.${path}`)), `Missing public resource: ${url}`);
}
for (const fact of ["October 29, 2026", "John Jay College of Criminal Justice", "AI governance", "Rights and equity", "Continuity of legal representation", "Cascading disaster risks", "Save the date"]) assert(home.includes(fact), `Missing overview content: ${fact}`);
for (const id of ["overview", "topics", "main-content"]) assert(home.includes(`id="${id}"`));
assert(!home.includes('id="venue"'), "The standalone venue section was removed");
assert(!home.includes("Staging comparison"), "Staging controls must not ship");
assert(home.includes('href="mailto:disasterlawsymposium@oem.nyc.gov"'));
assert(home.includes('name="twitter:description"'));
assert(readFileSync(resolve(root, "404.html"), "utf8").includes("Go to the homepage"));
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [canonicalUrl]);
const calendar = readFileSync(resolve(root, "disaster-law-symposium-2026.ics"), "utf8");
assert(!/(?<!\r)\n/.test(calendar), "Calendar must use CRLF");
assert(calendar.split("\r\n").every((line) => Buffer.byteLength(line) <= 75), "Calendar line exceeds 75 octets");
const unfolded = calendar.replace(/\r\n /g, "");
assert(unfolded.includes("DTSTART;VALUE=DATE:20261029\r\n"));
assert(unfolded.includes("DTEND;VALUE=DATE:20261030\r\n"));
assert(unfolded.includes("SUMMARY:Disaster Law Symposium 2026: Law at the Crossroads"));
assert(unfolded.includes("LOCATION:John Jay College of Criminal Justice\\, New York City"));
assert(unfolded.includes("Timing and registration details will follow."));
assert(!unfolded.includes("TZID"), "All-day calendar dates must be timezone-independent");
console.log("Phase 1 export verified: overview only, approved assets, metadata, 404, sitemap, and all-day calendar.");
