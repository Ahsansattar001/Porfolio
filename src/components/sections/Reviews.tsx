import Reveal from '@/components/Reveal';
import { REVIEWS } from '@/lib/content';

/** Reviews — port of `<section class="sec" id="reviews">`, the four `.tst` cards. */
export default function Reviews() {
  return (
    <section
      className="sec"
      id="reviews"
      style={{
        background: 'var(--bg-soft)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <p className="overline">Client words</p>
            <h2 className="big">
              They stayed. That&apos;s the <i>real review.</i>
            </h2>
          </div>
          <p className="sec-note">
            Most of my work comes from clients who keep coming back — some for over a year of daily
            collaboration.
          </p>
        </Reveal>

        <div className="tst-grid">
          {REVIEWS.map((review, i) => (
            <Reveal
              as="figure"
              className="tst"
              // Every second card was staggered with `--d:.08s` in the original.
              delay={i % 2 === 1 ? 0.08 : undefined}
              key={review.quote}
            >
              <div className="stars" aria-label="5 out of 5">
                ★★★★★
              </div>
              <q>{review.quote}</q>
              <figcaption className="who">
                <div className="ava" aria-hidden="true">
                  {review.initial}
                </div>
                <div>
                  <b>{review.who}</b>
                  <span>{review.where}</span>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
