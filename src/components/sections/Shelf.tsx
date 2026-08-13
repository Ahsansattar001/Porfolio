import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { PROJECTS } from '@/lib/content';

/**
 * Shelf — the PROJECT SHELF band from index.html: fourteen `.proj` cards, two
 * per row, each one a live store. Like #work it sits flush against the section
 * above, hence the inline `padding-top:0`.
 */

/**
 * Letter shown in `.shot-fb`, the tile revealed only when a screenshot fails to
 * load. It is the first letter of the store name everywhere except Is-Hurðir,
 * which used "H" in the original markup.
 */
const FALLBACK_INITIAL: Record<string, string> = {
  'Is-Hurðir': 'H',
};

export default function Shelf() {
  return (
    <section className="sec" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <p className="overline">More selected work</p>
            <h2 className="big">
              Fourteen more, <i>all live.</i>
            </h2>
          </div>
        </Reveal>

        <div className="shelf">
          {PROJECTS.map((project, i) => (
            <Reveal
              as="article"
              className="proj"
              // The original staggered every second card with `--d:.08s`.
              delay={i % 2 === 1 ? 0.08 : undefined}
              key={project.href}
            >
              <a className="frame" href={project.href} target="_blank" rel="noopener">
                <div className="frame-bar">
                  <s />
                  <s />
                  <s />
                  <em>{project.domain}</em>
                </div>
                <div className="shot-img">
                  <Image
                    className="ok"
                    src={project.img}
                    alt={project.alt}
                    width={1400}
                    height={910}
                  />
                  <div className="shot-fb">
                    <b>{FALLBACK_INITIAL[project.name] ?? project.name.charAt(0)}</b>
                  </div>
                </div>
              </a>

              <div className="proj-meta">
                <div className="proj-top">
                  <h3>{project.name}</h3>
                  <span className={project.tagMuted ? 'tag mut' : 'tag'}>{project.tag}</span>
                </div>
                <p>{project.body}</p>
                <a className="proj-link" href={project.href} target="_blank" rel="noopener">
                  Visit live <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Reveal>
          ))}

          <div className="shelf-more">
            <Link href="/contact" className="btn btn-ghost">
              Your store could be no. 17 <span className="arr">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
