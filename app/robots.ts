import type { MetadataRoute } from "next";
import manifest from "@/release-manifest.json";
import { publishedEvent } from "@/data/published-event";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: manifest.routes.retired.map((route) => route.replace(/\/$/, "")),
    },
    sitemap: `${publishedEvent.canonicalUrl}/sitemap.xml`,
  };
}
