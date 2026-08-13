import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { STACK } from '@/lib/content';

/**
 * About — port of `<section class="sec" id="about">` from index.html.
 * The prose keeps its inline <b> emphasis, so it stays here as markup; the
 * chips underneath come from STACK.
 */
export default function About() {
  
  return (
    <section className="sec" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-copy">
          <p className="overline">About me</p>
          <p className="lede">
            From a three-month internship to the developer that brands <i>keep for years.</i>
          </p>
          <p>
            I started where most developers start — a frontend internship at{' '}
            <b>Softileo, Sargodha</b>, learning to care about every pixel. Three months later I knew
            exactly where I wanted that skill to live: e-commerce.
          </p>
          <p>
            At <b>DevJour Technologies</b> in Chowk Azam, Layyah, I became a full Shopify expert —
            and over the last 3+ years I&apos;ve delivered <b>150+ projects</b> — including{' '}
            <b>16+ complete store builds and redesigns</b> — for brands in Australia, the UK, the
            Netherlands, Singapore, Iceland and beyond.
          </p>
          <p>
            What makes me different is the combination: I <b>design</b> like it&apos;s a luxury brand
            and I <b>code</b> like a frontend engineer. When a client asks for something their theme
            “can&apos;t do,” that&apos;s usually where I start.
          </p>
          <div className="stack">
            {STACK.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </Reveal>

        <Reveal className="portrait-col" delay={0.12}>
          <figure className="portrait">
            <Image
              src="/img/ahsan-sattar-portrait.webp"
              alt="Portrait of Ahsan Sattar, Shopify expert and frontend developer"
              /* the file's real dimensions — under-declaring these caps the
                 srcset below what a retina screen can use */
              width={600}
              height={750}
              sizes="(max-width: 1020px) 90vw, 420px"
            />
            <figcaption className="imgcap">
              <b>Ahsan Sattar</b>
              <span>Shopify Expert · Est. 2023</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
