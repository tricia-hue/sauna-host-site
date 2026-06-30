import type { MetadataRoute } from "next";

const base = "https://thesaunahost.com";

/**
 * Public, indexable pages only.
 * Gated lessons (2–5), /welcome, and /workbook are intentionally excluded —
 * they show a locked state to non-subscribers and shouldn't be indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/lesson-1`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
