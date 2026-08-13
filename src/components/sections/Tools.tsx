import Reveal from '@/components/Reveal';
import { TOOLS } from '@/lib/content';

/**
 * Tools — port of `<section class="sec" id="tools">`. The icons come from the
 * sprite rendered once per page by IconSprite, referenced here with `<use>`.
 */
export default function Tools() {
  return (
    <section className="sec" id="tools">
      <div className="wrap">
        <Reveal className="sec-head">
          <div>
            <p className="overline">Tools I use</p>
            <h2 className="big">
              The stack behind <i>every build.</i>
            </h2>
          </div>
          <p className="sec-note">
            No mystery, no magic — just the tools I actually open every day, and what each one does
            on a project.
          </p>
        </Reveal>

        <Reveal className="tools-grid">
          {TOOLS.map((tool) => (
            <div className="tool" key={tool.name}>
              <span className="tool-ico">
                <svg aria-hidden="true">
                  <use href={'#' + tool.icon} />
                </svg>
              </span>
              <span className="tool-txt">
                <b>{tool.name}</b>
                <span>{tool.body}</span>
              </span>
            </div>
          ))}
        </Reveal>

        <Reveal as="p" className="tools-note">
          <b>How I pick them:</b> if a feature can be coded cleanly into your theme, it gets coded —
          not installed. Fewer apps means a faster store, a smaller monthly bill, and one person who
          knows exactly where every line lives.
        </Reveal>
      </div>
    </section>
  );
}
