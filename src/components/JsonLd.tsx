import { SITE } from '@/lib/site';

/**
 * Structured data. The homepage graph tells Google who Ahsan is and what he
 * sells; the contact page's FAQ block can surface answers directly in results.
 *
 * Server component — this renders to a plain <script> tag in the HTML, which
 * is what crawlers read. It never runs in the browser.
 */

function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is authored here, not user input, so there is nothing to escape.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': '#ahsan',
            name: SITE.name,
            jobTitle: SITE.role,
            description:
              'Shopify expert and frontend developer specialising in custom store design, full redesigns, Liquid theme development and conversion optimisation.',
            email: `mailto:${SITE.email}`,
            telephone: '+92-327-7352875',
            image: '/img/ahsan-sattar-portrait.webp',
            award: 'Employee of the Year 2026 — Devjour Technologies',
            worksFor: { '@type': 'Organization', name: 'Devjour Technologies' },
            knowsAbout: [
              'Shopify',
              'Shopify theme development',
              'Liquid',
              'JavaScript',
              'CSS',
              'HTML',
              'E-commerce',
              'Conversion Rate Optimization',
              'Shopify store design',
              'Shopify redesign',
            ],
            sameAs: [SITE.socials.linkedin, SITE.socials.instagram, SITE.socials.facebook],
          },
          {
            '@type': 'ProfessionalService',
            name: 'Ahsan Sattar — Shopify Development',
            description:
              'Custom Shopify store design and development: complete builds, full redesigns, Liquid theme customisation, upsell and bundle features, landing pages and CRO.',
            founder: { '@id': '#ahsan' },
            areaServed: [
              'Australia',
              'United Kingdom',
              'Netherlands',
              'Singapore',
              'Iceland',
              'United States',
            ].map((name) => ({ '@type': 'Country', name })),
            availableLanguage: ['English', 'Urdu'],
            priceRange: '$$',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Shopify services',
              itemListElement: [
                'Complete Shopify store design and build',
                'Full Shopify store redesign',
                'Custom Shopify features and app replacement',
                'Shopify theme customisation in Liquid',
                'Landing pages and conversion rate optimisation',
                'Ongoing Shopify maintenance and support',
              ].map((name) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name },
              })),
            },
          },
        ],
      }}
    />
  );
}

export const FAQS = [
  {
    q: 'How fast do you reply?',
    a: 'Within a few hours on most days. WhatsApp is the fastest route.',
  },
  {
    q: 'Do you take small Shopify jobs?',
    a: 'Yes — a single custom section or one stubborn bug is a fine place to start.',
  },
  {
    q: 'Can you work on a live Shopify store?',
    a: 'Always. I build on a duplicate theme and publish only when you approve it, so there is zero downtime and no lost sales.',
  },
  {
    q: 'What do you need from me to quote a project?',
    a: 'Your store URL, what you want changed, and any reference sites you like. That is enough for me to quote.',
  },
] as const;

export function FaqJsonLd() {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      }}
    />
  );
}
