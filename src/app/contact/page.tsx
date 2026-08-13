import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import IconSprite from '@/components/IconSprite';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/sections/Footer';
import { FaqJsonLd, FAQS } from '@/components/JsonLd';
import { NAV_LINKS, SITE, mailto } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Hire a Shopify Developer — Contact',
  description:
    'Hire a Shopify expert for a custom store build, full redesign or theme customisation. Tell me about your store and budget — I reply within a few hours on most days.',
  openGraph: {
    title: 'Hire a Shopify Developer — Contact Ahsan Sattar',
    description:
      'Custom Shopify store builds, redesigns and theme work. Tell me about your store and I will tell you how I would fix it.',
  },
};

const SIDE_LINKS = [
  { icon: 'i-whatsapp', label: 'WhatsApp', sub: SITE.phoneDisplay, href: SITE.socials.whatsapp, external: true },
  { icon: 'i-mail', label: 'Email', sub: SITE.email, href: mailto, external: false },
  { icon: 'i-linkedin', label: 'LinkedIn', sub: 'Experience & recommendations', href: SITE.socials.linkedin, external: true },
  { icon: 'i-instagram', label: 'Instagram', sub: 'Build shots & behind the scenes', href: SITE.socials.instagram, external: true },
  { icon: 'i-facebook', label: 'Facebook', sub: 'Updates & client news', href: SITE.socials.facebook, external: true },
];

export default function ContactPage() {
  return (
    <>
      <IconSprite />
      <FaqJsonLd />
      <Nav links={NAV_LINKS} current="/contact" />

      <main id="main">
        <section className="page-head">
          <div className="wrap">
            <p className="overline">Start a project</p>
            <h1>
              Tell me about your store, and I&apos;ll tell you <i>how I&apos;d fix it.</i>
            </h1>
            <p>
              The more detail you give me, the more useful my first reply is. Fill this in properly and
              you&apos;ll get a real answer — not a sales pitch.
            </p>
          </div>
        </section>

        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap form-layout">
            <ContactForm />

            <aside className="side">
              <div className="side-card">
                <h2>Reach me directly</h2>
                <p>Prefer to skip the form? Any of these lands in the same inbox.</p>
                <ul className="side-list">
                  {SIDE_LINKS.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}
                      >
                        <span className="si">
                          <svg aria-hidden="true">
                            <use href={`#${l.icon}`} />
                          </svg>
                        </span>
                        <span>
                          <b>{l.label}</b>
                          <em>{l.sub}</em>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="side-card">
                <h2>Before you write</h2>
                {FAQS.map((f) => (
                  <div className="faq-item" key={f.q}>
                    <b>{f.q}</b>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 13, color: 'var(--dim)', marginTop: 18, textAlign: 'center' }}>
                <Link href="/">← Back to the work</Link>
              </p>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
