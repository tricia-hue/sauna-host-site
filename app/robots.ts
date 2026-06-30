import type { MetadataRoute } from "next";

const base = "https://thesaunahost.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep utility/gated/API routes out of the index.
      disallow: ["/api/", "/welcome", "/workbook"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
