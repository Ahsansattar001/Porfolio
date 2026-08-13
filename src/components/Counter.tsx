'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/* useLayoutEffect warns during SSR, so fall back to useEffect on the server.
   On the client the layout variant matters: it resets the number to 0 before
   the browser paints, so there is no flash of the final value. */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type CounterProps = {
  /** The number to count up to. */
  value: number;
};

/**
 * Port of initCounters() from assets/js/main.js.
 *
 * Server-renders the finished number so the markup is meaningful without JS
 * (and hydration matches); the client rewinds it to 0 and runs the 1200ms
 * cubic ease-out once the element scrolls into view.
 */
export default function Counter({ value }: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduceMotion) {
      setDisplay(value);
      return;
    }

    setDisplay(0);

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);

          let start: number | null = null;
          const step = (ts: number) => {
            if (start === null) start = ts;
            const p = Math.min((ts - start) / 1200, 1);
            if (p < 1) {
              setDisplay(Math.floor(value * (1 - Math.pow(1 - p, 3))));
              raf = window.requestAnimationFrame(step);
            } else {
              setDisplay(value);
            }
          };
          raf = window.requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 },
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span className="count" data-count={value} ref={ref}>
      {display}
    </span>
  );
}
