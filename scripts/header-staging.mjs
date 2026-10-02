import { createServer } from "node:http";
import { readFileSync, statSync } from "node:fs";
import { resolve, dirname, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const staging = resolve(project, "staging/header");
const source = ts.createSourceFile("published-event.ts", readFileSync(resolve(project, "data/published-event.ts"), "utf8"), ts.ScriptTarget.Latest, true);
const declaration = source.statements.filter(ts.isVariableStatement).flatMap(statement => [...statement.declarationList.declarations]).find(item => item.name.getText(source) === "publishedEvent");
function unwrap(expression) {
  while (ts.isAsExpression(expression) || ts.isSatisfiesExpression(expression)) expression = expression.expression;
  return expression;
}
function literal(expression) {
  expression = unwrap(expression);
  if (ts.isStringLiteral(expression)) return expression.text;
  if (ts.isArrayLiteralExpression(expression)) return expression.elements.map(literal);
  if (ts.isObjectLiteralExpression(expression)) return Object.fromEntries(expression.properties.map(property => [property.name.getText(source), literal(property.initializer)]));
  throw new Error(`Expected literal event content: ${expression.getText(source)}`);
}
if (!declaration?.initializer) throw new Error("Published event data is missing");
const fields = new Set(["title", "themeDisplay", "tagline", "date", "venue", "hotel", "organization", "registrationUrl"]);
const event = Object.fromEntries(unwrap(declaration.initializer).properties.filter(property => fields.has(property.name.getText(source))).map(property => [property.name.getText(source), literal(property.initializer)]));
const eventJson = JSON.stringify(event);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg" };
const assets = new Set(["/assets/nycem-logo-transparent.png", "/assets/nyc-skyline.jpg"]);
const port = Number(process.env.PORT || 3110);

createServer((request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" });
    return response.end();
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let body, type;
    if (pathname === "/event.json") {
      body = eventJson;
      type = "application/json; charset=utf-8";
    } else {
      let file;
      if (assets.has(pathname)) file = resolve(project, "public", `.${pathname}`);
      else {
        const relative = pathname === "/" || pathname === "/preview/" ? "index.html" : `.${pathname}`;
        file = resolve(staging, relative);
        if (!file.startsWith(staging + sep)) throw new Error("Invalid path");
      }
      if (!statSync(file).isFile()) throw new Error("Not a file");
      body = readFileSync(file);
      if (pathname === "/preview/") body = body.toString("utf8").replace(/<main id="board"[\s\S]*?<\/main>/, '<main id="preview-root"></main>');
      type = types[extname(file)] || "application/octet-stream";
    }
    response.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : "Staging resource not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Header staging: http://localhost:${port}`));
