import Reveal from '@/components/Reveal';
import { SITE, mailto } from '@/lib/site';

/**
 * Connect — port of `<section class="sec" id="connect">`, the five `.social`
 * cards. Every destination comes from site.ts; only the labels are markup.
 */

type SocialCard = {
  href: string;
  icon: string;
  name: string;
  detail: string;
  go: string;
  /** mailto: opens in the mail client, so it keeps no target/rel. */
  external?: boolean;
};

const CARDS: SocialCard[] = [
  {
    href: SITE.socials.whatsapp,
    icon: 'i-whatsapp',
    name: 'WhatsApp',
    detail: SITE.phoneDisplay,
    go: 'Message me ↗',
    external: true,
  },
  {
    href: mailto,
    icon: 'i-mail',
    name: 'Email',
    detail: SITE.email,
    go: 'Send an email ↗',
  },
  {
    href: SITE.socials.linkedin,
    icon: 'i-linkedin',
    name: 'LinkedIn',
    detail: 'Experience & recommendations',
    go: 'Connect ↗',
    external: true,
  },
  {
    href: SITE.socials.instagram,
    icon: 'i-instagram',
    name: 'Instagram',
    detail: 'Build shots & behind the scenes',
    go: 'Follow ↗',
    external: true,
  },
  {
    href: SITE.socials.facebook,
    icon: 'i-facebook',
    name: 'Facebook',
    detail: 'Updates & client news',
    go: 'Follow ↗',
    external: true,
  },
];

export default function Connect() {
  return (
    <section className="sec" id="connect">
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <p className="overline">Find me</p>
            <h2 className="big">
              Wherever you prefer <i>to talk.</i>
            </h2>
          </div>
          <p className="sec-note">
            WhatsApp is fastest. Email works for briefs and files. Everything else is where I post
            the work.
          </p>
        </Reveal>

        <Reveal className="connect-grid">
          {CARDS.map((card) => (
            <a
              className="social"
              href={card.href}
              key={card.name}
              target={card.external ? '_blank' : undefined}
              rel={card.external ? 'noopener' : undefined}
            >
              <span className="social-ico">
                <svg aria-hidden="true">
                  <use href={'#' + card.icon} />
                </svg>
              </span>
              <span className="social-txt">
                <b>{card.name}</b>
                <span>{card.detail}</span>
              </span>
              <span className="go">{card.go}</span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
