import type { MetadataRoute } from "next";
import { publishedEvent } from "@/data/published-event";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: publishedEvent.canonicalUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${publishedEvent.canonicalUrl}/venue`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
