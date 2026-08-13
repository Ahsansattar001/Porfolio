/**
 * Single source of truth for identity and contact details.
 *
 * These used to be duplicated across index.html and contact.html, which meant
 * changing a phone number was a four-file edit. Everything now reads from here.
 */

export const SITE = {
  name: 'Ahsan Sattar',
  role: 'Shopify Expert & Frontend Developer',

  email: 'ahsansattar8586@gmail.com',
  /** International format, digits only — what wa.me expects. */
  whatsappNumber: '923277352875',
  /** Human-readable, for display. */
  phoneDisplay: '+92 327 7352875',

  socials: {
    whatsapp: 'https://wa.me/923277352875',
    linkedin: 'https://www.linkedin.com/in/ahsan-sattar-70980031a/',
    instagram: 'https://www.instagram.com/ahsan_developer/',
    facebook: 'https://www.facebook.com/profile.php?id=61564959346174',
  },

  /**
   * Set this once you own a domain — it switches on canonical URLs, absolute
   * OG image URLs and the sitemap. Left empty, those are simply omitted,
   * which is safer than pointing them at a domain you do not control.
   */
  url: '',
} as const;

export const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#tools', label: 'Tools' },
  { href: '/#about', label: 'About' },
  { href: '/#reviews', label: 'Reviews' },
] as const;

export const mailto = `mailto:${SITE.email}`;

/** The scrolling band under the hero. `accent` is the part painted in --ink. */
export const MARQUEE_ITEMS = [
  { text: 'Complete', accent: 'store builds' },
  { text: 'Full', accent: 'redesigns' },
  { text: 'Custom', accent: 'upsell systems' },
  { text: 'Bundle', accent: 'builders' },
  { text: 'Liquid · JS ·', accent: 'CSS' },
  { text: 'CRO &', accent: 'landing pages' },
  { text: 'Ongoing', accent: 'care' },
] as const;
