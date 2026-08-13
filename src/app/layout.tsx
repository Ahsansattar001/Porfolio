import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { SITE } from '@/lib/site';
import './globals.css';

/* The same woff2 files the static site shipped, now handled by next/font:
   self-hosted, preloaded, and exposed as CSS variables that globals.css
   consumes through --font-body / --font-head. Both are variable fonts, so a
   single file covers the whole 100–900 weight axis. */
const inter = localFont({
  src: '../fonts/inter-variable.woff2',
  variable: '--font-inter',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

const interTight = localFont({
  src: '../fonts/inter-tight-variable.woff2',
  variable: '--font-inter-tight',
  weight: '100 900',
  display: 'swap',
  preload: true,
});

/* Absolute URLs for OG/Twitter images. Uses your domain once one is set in
   lib/site.ts, otherwise the deployment URL Vercel injects. Left undefined
   locally, which is what the "metadataBase is not set" build note refers to —
   harmless, since social scrapers never see localhost. */
const metadataBase = SITE.url
  ? new URL(SITE.url)
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: 'Shopify Expert & Frontend Developer | Ahsan Sattar',
    template: '%s | Ahsan Sattar',
  },
  description:
    'Shopify expert and frontend developer with 3+ years and 150+ projects delivered. Custom Shopify store design, full redesigns, Liquid theme development and CRO. Available to hire.',
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Ahsan Sattar — Shopify Expert',
    title: 'Shopify Expert & Frontend Developer | Ahsan Sattar',
    description:
      '150+ projects delivered across 7+ countries. Custom Shopify store design, redesigns and conversion features coded into your theme.',
    images: [{ url: '/img/og-cover.webp', width: 1200, height: 630, alt: 'Ahsan Sattar — Shopify Expert' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Expert & Frontend Developer | Ahsan Sattar',
    description: '150+ projects delivered across 7+ countries. Custom Shopify store design and development.',
    images: ['/img/og-cover.webp'],
  },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%231d4ed8'/%3E%3Ctext x='32' y='43' font-family='Inter,Arial' font-size='34' font-weight='700' fill='%23ffffff' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#05070e' },
  ],
};

/* Runs before first paint so the correct theme is already stamped on <html>.
   Without it the page flashes light before hydration. It also adds `js`, which
   the CSS uses to decide whether the intro animations should run at all. */
const themeScript = `
(function () {
  try {
    var root = document.documentElement;
    root.classList.add('js');
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);
  } catch (e) {}

  // Failsafe. The CSS hides the hero copy until <body> gets .loaded, and that
  // class normally arrives from the Preloader component — which only runs if
  // React hydrates. This timer does not depend on hydration, so a broken or
  // blocked bundle can never leave the hero permanently blank. The static site
  // shipped the same guard after exactly that bug.
  setTimeout(function () {
    if (document.body) document.body.classList.add('loaded');
  }, 2500);
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* suppressHydrationWarning: the inline script above and <Preloader/> both
          add `loaded` to <body> before React hydrates, so the server HTML and
          the client DOM legitimately differ on this one attribute. Without
          this, React logs a hydration mismatch on every page load. Same reason
          it is set on <html> for `data-theme`. */}
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
