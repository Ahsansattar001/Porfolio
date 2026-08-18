import Reveal from '@/components/Reveal';
import { SITE, mailto } from '@/lib/site';

/**
 * ContactCta — the lead-in that sits directly above the contact form.
 *
 * The `id="contact"` anchor moved to <Contact> when the form came onto the
 * homepage, so the buttons here scroll down to it rather than to a second page.
 * The stylesheet targets `.contact > .wrap > .reveal > p`, so the paragraph has
 * to stay a direct child of the revealed wrapper.
 */
export default function ContactCta() {
  return (
    <section className="sec contact">
      <div className="orbit" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <p className="overline">Next project</p>
          <h2>
            Let&apos;s build a store your customers can&apos;t <i>ignore.</i>
          </h2>
          <p>
            Tell me what you&apos;re selling and where it hurts — I&apos;ll tell you exactly how
            I&apos;d fix it. Complete build, redesign, or one stubborn custom feature: I&apos;ve
            probably already built it for someone else.
          </p>
          <div className="contact-cta">
            {/* scrolls to the form further down, rather than to a second page */}
            <a className="btn" href="#contact">
              Open the contact form <span className="arr">↓</span>
            </a>
            <a
              className="btn btn-ghost"
              href={SITE.socials.whatsapp}
              target="_blank"
              rel="noopener"
            >
              WhatsApp me <span className="arr">↗</span>
            </a>
          </div>
          <p className="contact-mini">
            Or reach me directly at <a href={mailto}>{SITE.email}</a> — replies within a few hours,
            most days.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
