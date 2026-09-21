import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../out/", import.meta.url));
function filesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? filesIn(path) : [path];
  });
}
const files = filesIn(root);
const paths = files.map((path) => relative(root, path));
assert.deepEqual(paths.filter((path) => path.endsWith(".html")).sort(), ["404.html", "404/index.html", "index.html"], "Only overview and framework 404 pages may ship");
for (const route of ["program", "speakers", "register", "sponsors", "venue", "staging"]) {
  assert(!existsSync(resolve(root, route)), `Unpublished route exported: ${route}`);
}
assert.deepEqual(paths.filter((path) => path.startsWith("assets/")).sort(), ["assets/nyc-skyline.jpg", "assets/nycem-logo-transparent.png"]);
assert(!paths.some((path) => /\.(pdf|map)$/i.test(path)), "Private PDFs or source maps were exported");
for (const file of files.filter((path) => /\.(html|txt|js|css|json)$/i.test(path))) {
  assert(!/Jeh Johnson|Keynote Address|editorial draft|Request updates by email|CLE approval|Cybersecurity, Privacy, and Data Protection credits|redesign-staging|urban-signal-date/.test(readFileSync(file, "utf8")), `Unpublished content in ${relative(root, file)}`);
}
const home = readFileSync(resolve(root, "index.html"), "utf8");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mo-awadalla.github.io/DLS_website";
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
