import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const port = Number(process.env.PORT || 3000);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".ics": "text/calendar; charset=utf-8" };
const notFound = readFileSync(resolve(root, "404.html"));

createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    return response.end();
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) throw new Error("Invalid path");
    if (statSync(file).isDirectory()) file = resolve(file, "index.html");
    const body = readFileSync(file);
    const headers = { "Content-Type": types[extname(file)] || "application/octet-stream" };
    if (extname(file) === ".ics") headers["Content-Disposition"] = 'attachment; filename="disaster-law-symposium-2026.ics"';
    response.writeHead(200, headers);
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : notFound);
  }
}).listen(port, "127.0.0.1", () => console.log(`Production preview: http://localhost:${port}`));
