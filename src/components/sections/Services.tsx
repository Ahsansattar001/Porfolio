import Reveal from '@/components/Reveal';
import { SERVICES } from '@/lib/content';

/** Services — port of `<section class="sec" id="services">`, a soft-background band. */
export default function Services() {
  return (
    <section
      className="sec"
      id="services"
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <p className="overline">What I do</p>
            <h2 className="big">
              One developer. <i>Every</i> Shopify problem.
            </h2>
          </div>
          <p className="sec-note">
            Design eye plus real frontend depth — I don&apos;t stack apps on your store, I open the
            code editor.
          </p>
        </Reveal>

        <Reveal className="svc-grid">
          {SERVICES.map((service) => (
            <div className="svc" key={service.sku}>
              <span className="sku">{service.sku}</span>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <span className="price">{service.price}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
