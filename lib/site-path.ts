/** Optional path prefix for hosts that publish beneath a subdirectory. */
export function sitePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
