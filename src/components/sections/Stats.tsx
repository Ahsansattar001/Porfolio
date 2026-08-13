import Counter from '@/components/Counter';
import Reveal from '@/components/Reveal';
import { STATS, SUMMARY_ROWS } from '@/lib/content';

/**
 * Stats — the SUMMARY / STATS band from index.html. It has no id; the inline
 * background/borders are what separate it from the sections either side.
 */
export default function Stats() {
  return (
    <section
      className="sec"
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap receipt-zone">
        <Reveal>
          <p className="overline">The short version</p>
          <h2 className="big">
            Three years. 150+ projects. <i>Zero</i> templates.
          </h2>
          <div className="stat-lines">
            {STATS.map((stat) => (
              <div className="stat-line" key={stat.label}>
                <span className="num">
                  <Counter value={stat.value} />
                  <i>{stat.suffix}</i>
                </span>
                <span className="lbl">{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="receipt" aria-label="Career summary">
            <div className="rc-head">
              <b>Work summary</b>
              <small>Shopify Expert · Est. 2023</small>
            </div>
            {SUMMARY_ROWS.map((row) => (
              <div className="rc-row" key={row.label}>
                <span>{row.label}</span>
                <b>{row.value}</b>
              </div>
            ))}
            <div className="rc-total">
              <span>Custom features shipped</span>
              <span>Countless</span>
            </div>
            <p className="rc-foot">
              Most clients stay. The longest one is on day 365 and counting.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
