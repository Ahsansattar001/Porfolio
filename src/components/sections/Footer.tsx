import Link from 'next/link';
import { SITE, mailto } from '@/lib/site';

/**
 * Footer — port of the `<footer>` block in index.html.
 *
 * The static page carried a hardcoded 2026 with a `data-year` hook that main.js
 * refreshed on load; rendering on the server means the year is simply correct.
 */

const LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
  { href: '/#tools', label: 'Tools' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

const SOCIALS = [
  { href: SITE.socials.whatsapp, icon: 'i-whatsapp', label: 'WhatsApp', external: true },
  { href: mailto, icon: 'i-mail', label: 'Email' },
  { href: SITE.socials.linkedin, icon: 'i-linkedin', label: 'LinkedIn', external: true },
  { href: SITE.socials.instagram, icon: 'i-instagram', label: 'Instagram', external: true },
  { href: SITE.socials.facebook, icon: 'i-facebook', label: 'Facebook', external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <small>
            © <span data-year="">{year}</span> {SITE.name} — Shopify Expert
          </small>

          <div className="foot-links">
            {LINKS.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="foot-social">
            {SOCIALS.map((social) => (
              <a
                href={social.href}
                key={social.label}
                aria-label={social.label}
                target={social.external ? '_blank' : undefined}
                rel={social.external ? 'noopener' : undefined}
              >
                <svg aria-hidden="true">
                  <use href={'#' + social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <p className="foot-line">
          Designed &amp; coded by {SITE.name} © {year}
        </p>
      </div>
    </footer>
  );
}
