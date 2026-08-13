import Image from 'next/image';
import Reveal from '@/components/Reveal';

/**
 * Award — port of `<section class="sec" id="award">`. One-off copy, so nothing
 * here comes from content.ts. The trophy render is 640×629 in `public/img`.
 */
export default function Award() {
  return (
    <section className="sec" id="award">
      <div className="wrap award-grid">
        <Reveal>
          <p className="overline">Recognition — 2026</p>
          <h2 className="big">
            Employee of the <i>Year.</i>
          </h2>
          <p className="aw-p">
            In 2026, Devjour Technologies picked one person from the whole team to put a name on
            this medallion. The inscription says everything I want a client to know about working
            with me:
          </p>
          <blockquote className="award-quote">
            “Outstanding dedication, exceptional results.”
          </blockquote>
          <div className="award-facts">
            <div>
              <b>Award</b>
              <span>Employee of the Year</span>
            </div>
            <div>
              <b>Presented by</b>
              <span>Devjour Technologies</span>
            </div>
            <div>
              <b>Year</b>
              <span>2026</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="trophy-wrap">
            <div className="trophy-glow" aria-hidden="true" />
            <div className="trophy">
              <div className="trophy-stage">
                <Image
                  src="/img/employee-of-the-year-trophy.webp"
                  alt="Employee of the Year 2026 award from Devjour Technologies"
                  width={640}
                  height={629}
                />
              </div>
              <div className="imgcap">
                <b>★ Employee of the Year</b>
                <span>Devjour · 2026</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
