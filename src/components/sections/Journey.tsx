import Reveal from '@/components/Reveal';
import { TIMELINE } from '@/lib/content';

/** Journey — port of `<section class="sec" id="journey">` and its `.tl` timeline. */
export default function Journey() {
  return (
    <section
      className="sec"
      id="journey"
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap journey-grid">
        <Reveal className="journey-head">
          <p className="overline">The journey</p>
          <h3 className="journey-title">
            From first commit to <i>Employee of the Year.</i>
          </h3>
          <p>
            Three stops so far — an internship that taught me discipline, a role that made me a
            Shopify expert, and a trophy with my name on it. The next line on this timeline is
            reserved for your project.
          </p>
          <a className="case-link" href="#contact">
            Start yours <span aria-hidden="true">↓</span>
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tl">
            {TIMELINE.map((item) => (
              <div className={item.now ? 'tl-item now' : 'tl-item'} key={item.role}>
                <span className="when">{item.when}</span>
                <h4>{item.role}</h4>
                <div className="where">{item.where}</div>
                <p>{item.body}</p>
                {item.award ? <p className="tl-award">{item.award}</p> : null}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
