import Image from 'next/image';
import { Fragment } from 'react';
import Reveal from '@/components/Reveal';
import { CASE_STUDIES } from '@/lib/content';

/**
 * Work — port of `<section class="sec" id="work">`, the two long-form case
 * studies. `padding-top:0` is inline in the original because the marquee band
 * above already supplies the spacing.
 */

/**
 * Intrinsic pixel sizes of the case screenshots. next/image needs explicit
 * dimensions (using `fill` would inject wrapper styles that break `.shot-img`),
 * and the aspect ratios differ per shot — the store screenshots are 1400×910,
 * the two Top Fatbikes feature captures are not.
 */
const MEDIA_SIZE: Record<string, { width: number; height: number }> = {
  '/img/projects/timelessjump.webp': { width: 1400, height: 910 },
  '/img/topfatbikes-testride-drawer.webp': { width: 1200, height: 465 },
  '/img/topfatbikes-upsell-popup.webp': { width: 820, height: 1401 },
};

const DEFAULT_SIZE = { width: 1400, height: 910 };

/**
 * In the original markup the lead-in of a feature line was bolded:
 * `<b>Upsell popup</b>&nbsp;— accessories, …`. content.ts keeps the string
 * plain, with the non-breaking space (U+00A0) before the em dash intact, so
 * that separator is what tells the two emphasised lines apart from ordinary
 * ones like "Long-term partnership — the store keeps evolving".
 */
const NBSP_DASH = '\u00A0— ';

function Feature({ text }: { text: string }) {
  const parts = text.split(NBSP_DASH);
  if (parts.length !== 2) return <>{text}</>;
  return (
    <>
      <b>{parts[0]}</b>&nbsp;— {parts[1]}
    </>
  );
}

export default function Work() {
  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <p className="overline">Selected work — 16 of 150+ projects</p>
            <h2 className="big">
              Proof, not <i>promises.</i>
            </h2>
          </div>
          <p className="sec-note">
            A selection from 150+ delivered projects. Every screenshot below is a real store
            I&apos;ve built, rebuilt or engineered features for — click any of them, they&apos;re all
            online right now.
          </p>
        </Reveal>

        {CASE_STUDIES.map((study, index) => {
          // The flagship case shows the live store itself, so its single frame
          // links out (and carries the initial-letter fallback tile). The
          // engineering case shows feature captures, which link nowhere.
          const linkFrame = study.media.length === 1;

          return (
            <Reveal
              as="article"
              // Cases alternate sides: the second one gets `.flip`.
              className={index % 2 === 1 ? 'case flip' : 'case'}
              key={study.id}
            >
              <div>
                <span className="case-num">{study.num}</span>
                <div className="case-tag">
                  {study.tags.map((tag) => (
                    <span className={tag.muted ? 'tag mut' : 'tag'} key={tag.label}>
                      {tag.label}
                    </span>
                  ))}
                </div>
                <h3>
                  {study.title} <i>{study.titleAccent}</i>
                </h3>
                <p>{study.body}</p>
                <ul className="feat">
                  {study.features.map((feature) => (
                    <li key={feature}>
                      <Feature text={feature} />
                    </li>
                  ))}
                </ul>
                <a className="case-link" href={study.href} target="_blank" rel="noopener">
                  {study.linkLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="case-media">
                {study.media.map((shot) => {
                  const size = MEDIA_SIZE[shot.src] ?? DEFAULT_SIZE;

                  const bar = (
                    <div className="frame-bar">
                      <s />
                      <s />
                      <s />
                      <em>{shot.caption}</em>
                    </div>
                  );

                  const picture = (
                    <div
                      className="shot-img"
                      style={shot.aspect ? { aspectRatio: shot.aspect } : undefined}
                    >
                      <Image
                        className="ok"
                        src={shot.src}
                        alt={shot.alt}
                        width={size.width}
                        height={size.height}
                      />
                      {linkFrame ? (
                        <div className="shot-fb">
                          <b>{study.title.charAt(0)}</b>
                        </div>
                      ) : null}
                    </div>
                  );

                  return (
                    <Fragment key={shot.src}>
                      {linkFrame ? (
                        <a className="frame" href={study.href} target="_blank" rel="noopener">
                          {bar}
                          {picture}
                        </a>
                      ) : (
                        <div className={shot.tall ? 'frame tall' : 'frame'}>
                          {bar}
                          {picture}
                        </div>
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
