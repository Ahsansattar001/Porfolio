'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type Ref,
} from 'react';

type RevealProps = HTMLAttributes<HTMLElement> & {
  /** Rendered tag — `section`, `article`, `figure`, `div`… */
  as?: ElementType;
  /** Stagger, in seconds. Becomes the `--d` custom property the CSS reads. */
  delay?: number;
};

/**
 * Port of initReveal() from assets/js/main.js.
 *
 * The CSS does the actual work (`.js .reveal` → hidden, `.reveal.in` → shown);
 * this only decides when the `in` class lands. Without JS the `.js` guard in
 * globals.css means the content is visible from the start, so nothing is ever
 * trapped behind an observer that never fires.
 *
 * `in` is added straight to the node rather than through state: the className
 * this component renders is derived purely from props, so React never rewrites
 * the attribute and the class survives — and a hero full of Reveals does not
 * re-render on every scroll.
 */
export default function Reveal({ as, delay, className, style, children, ...rest }: RevealProps) {
  const Tag: ElementType = as ?? 'div';
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduceMotion) {
      el.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const merged = className ? `reveal ${className}` : 'reveal';
  const mergedStyle: CSSProperties | undefined =
    delay === undefined ? style : ({ ...style, '--d': `${delay}s` } as CSSProperties);

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={merged} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
