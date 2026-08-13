'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Port of initPreloader() from assets/js/main.js, plus the 2500ms failsafe the
 * inline head script in index.html used to own.
 *
 * `loaded` on <body> is what un-hides the hero copy, so it MUST end up there
 * no matter what — hence the failsafe timer. The overlay itself only shows at
 * all when the `js` class is on <html> (see `.js .preloader` in globals.css),
 * so a no-JS visitor never sees a blank screen.
 */
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const nRef = useRef(0);

  useEffect(() => {
    nRef.current = 0;

    let interval: number | undefined;
    let settle: number | undefined;
    let hide: number | undefined;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      if (interval !== undefined) window.clearInterval(interval);
      setPct(100);
      setDone(true);
      document.body.classList.add('loaded');
      // Matches the .5s opacity transition, then takes the layer out entirely.
      hide = window.setTimeout(() => setHidden(true), 600);
    };

    // Failsafe: whatever happens above, the page is usable after 2.5s.
    const failsafe = window.setTimeout(finish, 2500);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      finish();
    } else {
      interval = window.setInterval(() => {
        nRef.current = Math.min(100, nRef.current + Math.floor(Math.random() * 13) + 6);
        setPct(nRef.current);
        if (nRef.current >= 100) {
          if (interval !== undefined) window.clearInterval(interval);
          settle = window.setTimeout(finish, 220);
        }
      }, 85);
    }

    return () => {
      window.clearTimeout(failsafe);
      if (interval !== undefined) window.clearInterval(interval);
      if (settle !== undefined) window.clearTimeout(settle);
      if (hide !== undefined) window.clearTimeout(hide);
    };
  }, []);

  return (
    <div
      className={`preloader${done ? ' done' : ''}`}
      id="pre"
      aria-hidden="true"
      style={hidden ? { display: 'none' } : undefined}
    >
      <div className="pre-word">
        Ahsan <em>Sattar</em>
      </div>
      <div className="pre-bar">
        <i id="preBar" style={{ width: `${pct}%` }} />
      </div>
      <div className="pre-count" id="preCount">
        {String(pct).padStart(2, '0')}
      </div>
    </div>
  );
}
