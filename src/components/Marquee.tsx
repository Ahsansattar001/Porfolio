export type MarqueeItem = {
  /** Muted leading copy, e.g. "Complete". */
  text: string;
  /** The part painted in --ink, e.g. "store builds". */
  accent: string;
};

type MarqueeProps = {
  items: readonly MarqueeItem[];
};

/**
 * The scrolling band under the hero.
 *
 * initMarquee() in main.js cloned the track's innerHTML at runtime so the
 * `translateX(-50%)` keyframe loops seamlessly. Rendering the list twice in
 * the markup gets the same result with no JS at all — which also means the
 * band animates for visitors whose JS never loads.
 */
export default function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="marquee-wrap">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track" id="mq">
          {doubled.map((item, i) => (
            <span className="mq-item" key={`${item.text}-${i}`}>
              {item.text} <i>{item.accent}</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
