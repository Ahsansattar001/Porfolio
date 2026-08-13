'use client';

import { useEffect } from 'react';

/**
 * The subtle pointer-tracking tilt on project cards (initTilt in main.js).
 *
 * Renders nothing — it just attaches listeners to the `.proj .frame` anchors
 * the Shelf section outputs. Doing it here rather than inside Shelf keeps that
 * section a server component, so the fourteen cards still render as static HTML
 * and only this tiny effect ships to the browser.
 *
 * Skipped entirely on touch devices and when the visitor prefers reduced motion.
 */
export default function ProjectTilt() {
  useEffect(() => {
    if (
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const cards = Array.from(document.querySelectorAll<HTMLElement>('.proj .frame'));
    if (!cards.length) return;

    const cleanups = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(1000px) rotateY(${x * 3.2}deg) rotateX(${-y * 3.2}deg) translateY(-3px)`;
      };
      const onLeave = () => {
        card.style.transform = '';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
        card.style.transform = '';
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
