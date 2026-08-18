/**
 * Contact — the form and the direct-contact details, on the homepage.
 *
 * This replaces two things that used to be separate: the "Find me" grid of
 * social cards, and the standalone /contact page. Everything now lives here so
 * a visitor never leaves the landing page to get in touch — the social links
 * survive as the sidebar list rather than a five-card row.
 */

import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { FAQS } from '@/components/JsonLd';
import { SITE, mailto } from '@/lib/site';

const SIDE_LINKS = [
  { icon: 'i-whatsapp', label: 'WhatsApp', sub: SITE.phoneDisplay, href: SITE.socials.whatsapp, external: true },
  { icon: 'i-mail', label: 'Email', sub: SITE.email, href: mailto, external: false },
  { icon: 'i-linkedin', label: 'LinkedIn', sub: 'Experience & recommendations', href: SITE.socials.linkedin, external: true },
  { icon: 'i-instagram', label: 'Instagram', sub: 'Build shots & behind the scenes', href: SITE.socials.instagram, external: true },
  { icon: 'i-facebook', label: 'Facebook', sub: 'Updates & client news', href: SITE.socials.facebook, external: true },
];

export default function Contact() {
  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <p className="overline">Start a project</p>
            <h2 className="big">
              Tell me about your store, and I&apos;ll tell you <i>how I&apos;d fix it.</i>
            </h2>
          </div>
          <p className="sec-note">
            The more detail you give me, the more useful my first reply is. Fill this in properly and
            you&apos;ll get a real answer — not a sales pitch.
          </p>
        </Reveal>

        <div className="form-layout">
          <ContactForm />

          <aside className="side">
            <div className="side-card">
              <h3>Reach me directly</h3>
              <p>Prefer to skip the form? Any of these lands in the same inbox.</p>
              <ul className="side-list">
                {SIDE_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener' } : {})}>
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
              <h3>Before you write</h3>
              {FAQS.map((f) => (
                <div className="faq-item" key={f.q}>
                  <b>{f.q}</b>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
