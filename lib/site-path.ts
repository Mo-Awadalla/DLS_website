/** Public URLs must include the project prefix when hosted on GitHub Pages. */
export function sitePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
