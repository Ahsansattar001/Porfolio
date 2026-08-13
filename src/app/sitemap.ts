import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Sitemaps require absolute URLs, so this stays empty until a domain is set in
 * lib/site.ts. Submitting a sitemap full of the wrong origin is worse than
 * submitting none at all.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.url) return [];

  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ];
}
