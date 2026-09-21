import type { MetadataRoute } from "next";
import { publishedEvent } from "@/data/published-event";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: publishedEvent.canonicalUrl, changeFrequency: "monthly", priority: 1 }];
}
