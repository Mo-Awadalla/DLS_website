import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/program", "/speakers", "/venue", "/sponsors", "/register"].map((path) => ({ url: `${siteConfig.canonicalUrl}${path}`, changeFrequency: "monthly", priority: path === "" ? 1 : 0.7 }));
}
