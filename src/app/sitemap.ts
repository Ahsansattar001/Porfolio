import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

/**
 * Sitemaps require absolute URLs, so this stays empty until a domain is set in
 * lib/site.ts. Submitting a sitemap full of the wrong origin is worse than
 * submitting none at all.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE.url) return [];

  /* Single landing page — the contact form lives at /#contact, not on a
     route of its own, so there is nothing else to list. */
  return [
    { url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
  ];
}
