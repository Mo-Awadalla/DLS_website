import type { MetadataRoute } from "next";
import { overview } from "@/data/overview";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: overview.canonicalUrl, changeFrequency: "monthly", priority: 1 }];
}
