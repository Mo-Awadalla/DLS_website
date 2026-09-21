import type { MetadataRoute } from "next";
import { overview } from "@/data/overview";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/program", "/register", "/speakers", "/sponsors", "/venue", "/staging"],
    },
    sitemap: `${overview.canonicalUrl}/sitemap.xml`,
  };
}
