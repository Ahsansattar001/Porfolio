import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing secret here, but there is no reason to index the mail endpoint.
      disallow: '/api/',
    },
    // Only advertise a sitemap once a real domain is configured in lib/site.ts.
    ...(SITE.url ? { sitemap: `${SITE.url}/sitemap.xml` } : {}),
  };
}
