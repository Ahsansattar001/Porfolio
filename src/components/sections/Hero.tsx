import Image from 'next/image';
import Link from 'next/link';

/**
 * Hero — port of `<section class="hero" id="top">` from index.html.
 *
 * The four screenshots are a staggered gallery wall: two drifting columns
 * (.hv-col-a rides high, .hv-col-b rides low) so no card lines up with its
 * neighbour and every store stays fully visible.
 *
 * These four cards are the only place the stores are shown with "built by
 * Ahsan Sattar" alt text and a bare domain caption, so the strings live here
 * rather than in content.ts (PROJECTS carries different alt copy).
 */

type HeroCard = { src: string; alt: string; caption: string };

const COLUMN_A: HeroCard[] = [
  {
    src: '/img/projects/timelessjump.webp',
    alt: 'Timeless Jump — Shopify store redesigned by Ahsan Sattar',
    caption: 'timelessjump.com',
  },
  {
    src: '/img/projects/nasalix.webp',
    alt: 'Nasalix — complete Shopify store built by Ahsan Sattar',
    caption: 'getnasalix.com',
  },
];

const COLUMN_B: HeroCard[] = [
  {
    src: '/img/projects/stambolian.webp',
    alt: 'Stambolian — complete Shopify store built by Ahsan Sattar',
    caption: 'stambolian.com',
  },
  {
    src: '/img/projects/bexxly.webp',
    alt: 'Bexxly — complete Shopify store built by Ahsan Sattar',
    caption: 'bexxly.com',
  },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow two" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="hero-over">
            Shopify Expert <span className="sep" aria-hidden="true" />
            Frontend Developer <span className="sep" aria-hidden="true" />
            3+ Years of Experience <b>★ Employee of the Year 2026</b>
          </p>

          <h1>
            <span className="ln">
              <span>Stores that feel</span>
            </span>
            <span className="ln">
              <span>
                <i>expensive.</i>
              </span>
            </span>
            <span className="ln">
              <span>
                Results that feel <i>inevitable.</i>
              </span>
            </span>
          </h1>

          <p className="hero-sub">
            I&apos;m a <strong>Shopify expert and frontend developer</strong> with{' '}
            <strong>150+ projects</strong> delivered for brands in 7+ countries — complete store
            builds, full redesigns, and the custom conversion features most developers tell you
            “need an app.”
          </p>

          <div className="hero-cta">
            <Link href="/#work" className="btn">
              View selected work <span className="arr">↓</span>
            </Link>
            <a href="#contact" className="btn btn-ghost">
              Start a project <span className="arr">↓</span>
            </a>
          </div>

          <div className="hero-meta">
            <span className="avail">
              <span className="pulse" aria-hidden="true" /> Available for new projects
            </span>
            <span aria-hidden="true">·</span>
            <span>Replies within a few hours, most days</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Shopify stores built by Ahsan Sattar">
          <span className="hv-glow" aria-hidden="true" />

          <div className="hv-col hv-col-a">
            {COLUMN_A.map((card, i) => (
              <figure className="hv-card" key={card.src}>
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={1400}
                  height={910}
                  /* The first card is the hero's LCP candidate. `priority` was
                     deprecated in Next 16 in favour of `preload`. */
                  preload={i === 0}
                  loading="eager"
                />
                <figcaption>{card.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="hv-col hv-col-b">
            {COLUMN_B.map((card) => (
              <figure className="hv-card" key={card.src}>
                {/* eager, not lazy: all four cards sit above the fold. Left to
                    default lazy loading the bottom card intermittently never
                    fired its intersection callback and rendered as an empty
                    white panel. */}
                <Image src={card.src} alt={card.alt} width={1400} height={910} loading="eager" />
                <figcaption>{card.caption}</figcaption>
              </figure>
            ))}
          </div>

          <span className="hv-badge">
            <b>150+</b> projects shipped
          </span>
        </div>
      </div>
    </section>
  );
}
