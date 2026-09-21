import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { releaseManifest } from "./release-manifest.mjs";

const manifest = releaseManifest;
const { environment, routes, staticExport } = manifest;
const routeList = [...routes.public, ...routes.retired];

assert.equal(typeof manifest.exportDirectory, "string");
assert.match(manifest.exportDirectory, /^[A-Za-z0-9._-]+$/);
assert.match(environment.basePath, /^[A-Z][A-Z0-9_]+$/);
assert.match(environment.canonicalUrl, /^[A-Z][A-Z0-9_]+$/);
assert.match(environment.canonicalUrlFallback, /^[A-Z][A-Z0-9_]+$/);
assert.equal(new Set(routeList).size, routeList.length, "Manifest routes must be unique");
assert(routes.public.includes("/"), "Manifest must publish the homepage");
assert(routes.public.includes(routes.calendar), "Calendar route must be public");
assert(routes.public.every((route) => route.startsWith("/")), "Public routes must be URL paths");
assert(routes.retired.every((route) => route.startsWith("/")), "Retired routes must be URL paths");
assert(routes.retired.every((route) => !routes.public.includes(route)), "A route cannot be both public and retired");
assert(manifest.publicAssets.every((asset) => asset.startsWith("/")), "Public assets must be URL paths");
assert.equal(staticExport.output, "export");
assert.equal(staticExport.trailingSlash, true);
assert.equal(staticExport.imagesUnoptimized, true);

const netlify = readFileSync(resolve("netlify.toml"), "utf8");
assert.match(netlify, new RegExp(`publish\\s*=\\s*["']${manifest.exportDirectory}["']`));
assert.match(netlify, /command\s*=\s*["']npm run release:check && npm run build["']/);
assert.match(netlify, new RegExp(`${environment.basePath}\\s*=`));
assert.match(netlify, new RegExp(`for\\s*=\\s*["']${routes.calendar}["']`));

console.log(`Release manifest verified: ${manifest.exportDirectory}/, ${routes.public.length} public routes, ${manifest.publicAssets.length} public assets.`);
