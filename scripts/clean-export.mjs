import { rmSync } from "node:fs";

// Only generated build output is removed. A failed build cannot leave an old release.
for (const directory of ["../.next/", "../out/"]) {
  rmSync(new URL(directory, import.meta.url), { recursive: true, force: true });
}
