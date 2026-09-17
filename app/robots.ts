import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/program", "/register", "/speakers", "/sponsors", "/venue", "/staging"],
    },
    sitemap: `${siteConfig.canonicalUrl}/sitemap.xml`,
  };
}
