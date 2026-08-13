import IconSprite from '@/components/IconSprite';
import Preloader from '@/components/Preloader';
import Nav from '@/components/Nav';
import Marquee from '@/components/Marquee';
import ProjectTilt from '@/components/ProjectTilt';
import { PersonJsonLd } from '@/components/JsonLd';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Stats from '@/components/sections/Stats';
import Work from '@/components/sections/Work';
import Shelf from '@/components/sections/Shelf';
import Services from '@/components/sections/Services';
import Tools from '@/components/sections/Tools';
import Journey from '@/components/sections/Journey';
import Award from '@/components/sections/Award';
import Reviews from '@/components/sections/Reviews';
import Connect from '@/components/sections/Connect';
import ContactCta from '@/components/sections/ContactCta';
import Footer from '@/components/sections/Footer';

import { NAV_LINKS, MARQUEE_ITEMS } from '@/lib/site';

/**
 * Section order is deliberate: a visitor meets Ahsan (About) before the
 * numbers, and the numbers before the proof. Changing the order here changes
 * the whole argument the page makes.
 */
export default function HomePage() {
  return (
    <>
      <IconSprite />
      <PersonJsonLd />
      <Preloader />
      <Nav links={NAV_LINKS} />

      <main id="main">
        <Hero />
        <Marquee items={MARQUEE_ITEMS} />
        <About />
        <Stats />
        <Work />
        <Shelf />
        <Services />
        <Tools />
        <Journey />
        <Award />
        <Reviews />
        <Connect />
        <ContactCta />
      </main>

      <Footer />
      <ProjectTilt />
    </>
  );
}
