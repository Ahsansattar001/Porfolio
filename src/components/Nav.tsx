'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export type NavItem = { href: string; label: string };

type NavProps = {
  links: readonly NavItem[];
  /** href of the page the visitor is on, e.g. "/contact". */
  current?: string;
};

/** true for links that leave the app (or the document) entirely. */
function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}

/**
 * "#work" and "/#work" both point at a section on the homepage; "/contact"
 * does not. Returns the element id for the former, null for the latter.
 */
function sectionIdOf(href: string): string | null {
  const hash = href.indexOf('#');
  if (hash < 0) return null;
  const before = href.slice(0, hash);
  if (before !== '' && before !== '/') return null;
  return href.slice(hash + 1) || null;
}

/**
 * Port of initNav() + initMenu() + initScrollSpy() from assets/js/main.js,
 * plus the <header class="nav"> / <nav class="menu"> markup from index.html.
 */
export default function Nav({ links, current }: NavProps) {
  // contact.html shipped `class="nav scrolled"` so a sub-page nav has its
  // background from the very first frame instead of sitting transparent over
  // the page header. Any real scroll event takes over from here.
  const [scrolled, setScrolled] = useState<boolean>(() => Boolean(current && !sectionIdOf(current)));
  const [hide, setHide] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);

  /* --- sticky nav: compact on scroll, hide when scrolling down ----------- */
  useEffect(() => {
    let last = 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHide(y > 480 && y > last);
        last = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --- mobile menu: body scroll lock + Escape to close ------------------- */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  /* --- scroll spy: highlight the section currently in view --------------- */
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const targets = links
      .map((link) => {
        const id = sectionIdOf(link.href);
        const el = id ? document.getElementById(id) : null;
        return el ? { href: link.href, el } : null;
      })
      .filter((entry): entry is { href: string; el: HTMLElement } => entry !== null);

    // Nothing to spy on (e.g. the contact page) — leave `current` alone.
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const match = targets.find((t) => t.el === entry.target);
          if (match) setActiveHash(match.href);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    targets.forEach((t) => io.observe(t.el));
    return () => io.disconnect();
  }, [links]);

  const close = useCallback(() => setOpen(false), []);

  const isCurrent = (href: string): boolean =>
    activeHash !== null ? activeHash === href : current === href;

  /* The mobile menu repeats the primary links and always ends on Contact —
     unless the caller already passes a link that goes there. */
  const menuItems: NavItem[] = links.some((l) => l.href === '#contact')
    ? [...links]
    : [...links, { href: '#contact', label: 'Contact' }];

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}${hide ? ' hide' : ''}`} id="nav">
        {/* The bar itself stays full-bleed so its background and bottom border
            reach both screen edges — but the contents sit in the same 1200px
            container every section uses, so the logo lines up with the copy
            below it instead of hugging the viewport. */}
        <div className="nav-inner">
        {/* Two files, swapped by CSS on [data-theme] — the dark-mode artwork is
            white and would vanish on a light header. Both are `priority` because
            the logo is above the fold; only one is ever visible. */}
        <Link href="/" className="logo" aria-label="Ahsan Sattar — home">
          <Image
            src="/img/logo-light.webp"
            alt="Ahsan Sattar — Shopify Expert and Frontend Developer"
            width={752}
            height={160}
            className="logo-img logo-light"
            priority
          />
          <Image
            src="/img/logo-dark.webp"
            alt=""
            aria-hidden="true"
            width={736}
            height={160}
            className="logo-img logo-dark"
            priority
          />
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                {isExternal(link.href) ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-right">
          <ThemeToggle />
          <a className="nav-cta" href="#contact">
            Start a project
          </a>
          <button
            className={`burger${open ? ' open' : ''}`}
            id="burger"
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        </div>
      </header>

      <nav className={`menu${open ? ' open' : ''}`} id="menu" aria-label="Mobile">
        {/* The drawer sits above the header (z-index 1100 vs 1000), so the
            burger that opened it is covered and cannot be used to close it.
            This gives the drawer its own way out, alongside Escape. */}
        <button className="menu-close" type="button" aria-label="Close menu" onClick={close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {menuItems.map((link, i) => {
          // Staggered entrance, exactly the delays main.js wrote inline.
          const style = { transitionDelay: `${(0.05 + i * 0.05).toFixed(2)}s` };
          const num = String(i + 1).padStart(2, '0');

          return isExternal(link.href) ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener"
              style={style}
              onClick={close}
            >
              <em>{num}</em>
              {link.label}
            </a>
          ) : (
            <Link key={link.href} href={link.href} style={style} onClick={close}>
              <em>{num}</em>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
