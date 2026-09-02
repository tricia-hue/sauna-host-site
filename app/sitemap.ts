import type { MetadataRoute } from "next";
import { hostThemes } from "@/content/themes";

const base = "https://thesaunahost.com";

/**
 * Public, indexable pages only.
 * Gated lessons (2–5), /welcome, and /workbook are intentionally excluded —
 * they show a locked state to non-subscribers and shouldn't be indexed.
 *
 * The /host theme pages ARE indexable: they're teaser-then-gate, with the
 * flow, three prompts, and the playlist public, and only the scripts and the
 * full prompt set behind the email form.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const themePages: MetadataRoute.Sitemap = hostThemes.map((t) => ({
    url: `${base}/host/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/host`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...themePages,
    { url: `${base}/lesson-1`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
