/**
 * Content layer for the portfolio.
 *
 * Every repeating block of the original static `index.html` (stats, case
 * studies, project shelf, services, tools, reviews, timeline, work summary and
 * the about stack) lives here as typed data so the React components stay purely
 * presentational. All copy is transcribed verbatim from the static page —
 * em dashes, curly quotes and the "150+" / "16+" figures included. Do not
 * reword these strings; edit the copy here and every component follows.
 *
 * Image paths were rewritten from `assets/img/...` (static site) to
 * `/img/...` (Next.js `public/` directory).
 */

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  num: string;
  title: string;
  titleAccent: string;
  tags: { label: string; muted?: boolean }[];
  body: string;
  features: string[];
  href: string;
  linkLabel: string;
  media: { src: string; alt: string; caption: string; tall?: boolean; aspect?: string }[];
}

export interface Project {
  name: string;
  domain: string;
  href: string;
  img: string;
  alt: string;
  tag: string;
  tagMuted?: boolean;
  body: string;
}

export interface Service {
  sku: string;
  title: string;
  body: string;
  price: string;
}

export interface Tool {
  icon: string;
  name: string;
  body: string;
}

export interface Review {
  quote: string;
  who: string;
  where: string;
  initial: string;
}

export interface TimelineItem {
  when: string;
  role: string;
  where: string;
  body: string;
  award?: string;
  now?: boolean;
}

export interface SummaryRow {
  label: string;
  value: string;
}

/* ------------------------------------------------------------------ *
 * STATS — the `.stat-line` counters in the "short version" section.
 * `value` is the data-count attribute, `suffix` the trailing <i>.
 * ------------------------------------------------------------------ */
export const STATS: Stat[] = [
  { value: 150, suffix: "+", label: "Projects delivered since 2023" },
  { value: 16, suffix: "+", label: "Full stores built & redesigned" },
  { value: 7, suffix: "+", label: "Countries served" },
  { value: 365, suffix: "+", label: "Days on one store, shipping daily" },
];

/* ------------------------------------------------------------------ *
 * CASE STUDIES — the two long-form `.case` articles in #work.
 * In the original markup the first Top Fatbikes feature emphasised
 * "Upsell popup" / "Test-ride drawer" with <b>; the emphasis markup is
 * dropped here so the strings stay plain text. The character before the em
 * dash in those two feature strings is a non-breaking space (U+00A0), matching
 * the original &nbsp;.
 * ------------------------------------------------------------------ */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "timeless-jump",
    num: "Case 01 · Flagship",
    title: "Timeless",
    titleAccent: "Jump",
    tags: [
      { label: "Full Redesign" },
      { label: "Ongoing Partner" },
      { label: "1+ Year, Daily", muted: true },
    ],
    body: "My biggest and longest engagement. I redesigned the entire store, then never left — for over a year I've been shipping design changes, new sections and conversion improvements on a daily basis.",
    features: [
      "Complete visual redesign, top to bottom",
      "New sections, tests and fixes shipped every day",
      "Conversion-focused product & collection pages",
      "Long-term partnership — the store keeps evolving",
    ],
    href: "https://timelessjump.com/",
    linkLabel: "Visit live store",
    media: [
      {
        src: "/img/projects/timelessjump.webp",
        alt: "Timeless Jump — Shopify store, full redesign with ongoing daily development",
        caption: "timelessjump.com",
      },
    ],
  },
  {
    id: "top-fatbikes",
    num: "Case 02 · Custom engineering",
    title: "Top",
    titleAccent: "Fatbikes",
    tags: [
      { label: "Custom Features" },
      { label: "Liquid + JS" },
      { label: "Netherlands", muted: true },
    ],
    body: "A Dutch e-bike store that needed app-level features without app-level fees. I engineered two custom systems directly into the theme — both shown here from the live store.",
    features: [
      "Upsell popup — accessories, locks, GPS trackers, child seats and insurance, with live price updates and an “In Doos / Rijklaar” delivery toggle",
      "Test-ride drawer — a “Plan een proefrit” flow connecting online shoppers to physical showrooms",
      "Built to match the theme pixel-for-pixel",
    ],
    href: "https://topfatbikes.nl/products/qm-wheels-s20-pro-zwart-combi-deal",
    linkLabel: "See it live",
    media: [
      {
        src: "/img/topfatbikes-testride-drawer.webp",
        alt: "Custom test-ride drawer built for Top Fatbikes",
        caption: "topfatbikes.nl — test-ride drawer (my build)",
        aspect: "1200/465",
      },
      {
        src: "/img/topfatbikes-upsell-popup.webp",
        alt: "Custom upsell and accessories popup built for Top Fatbikes",
        caption: "topfatbikes.nl — upsell popup (my build) · hover to scroll",
        tall: true,
      },
    ],
  },
];

/* ------------------------------------------------------------------ *
 * PROJECTS — the 14 `.proj` cards in the project shelf, in page order.
 * ------------------------------------------------------------------ */
export const PROJECTS: Project[] = [
  {
    name: "Stambolian",
    domain: "stambolian.com",
    href: "https://www.stambolian.com/",
    img: "/img/projects/stambolian.webp",
    alt: "Stambolian — complete Shopify store build",
    tag: "Complete Build",
    body: "Designed and built the entire store from zero — my first full build, and still one I'm proud of. Brand-led layout, refined typography, a clean path from landing to checkout.",
  },
  {
    name: "Bark With Buster",
    domain: "barkwithbuster.com.au",
    href: "https://www.barkwithbuster.com.au/",
    img: "/img/projects/barkwithbuster.webp",
    alt: "Bark With Buster — complete Shopify store build",
    tag: "Complete Build",
    body: "End-to-end Shopify build for an Australian pet brand — playful where it should be, premium where it counts, and tuned for mobile-first buyers.",
  },
  {
    name: "Danovel",
    domain: "danovel.com",
    href: "https://www.danovel.com/",
    img: "/img/projects/danovel.webp",
    alt: "Danovel — complete Shopify store build",
    tag: "Complete Build",
    body: "Full store design for a heritage furniture house — editorial product storytelling, custom collection layouts, and room to let the craftsmanship breathe.",
  },
  {
    name: "Same Color Parts",
    domain: "samecolorparts.com",
    href: "https://samecolorparts.com/collections/all",
    img: "/img/projects/samecolorparts.webp",
    alt: "Same Color Parts — complete Shopify store with custom header filters",
    tag: "Build + Filters",
    body: "Built the complete store plus a custom header filtering system, so buyers can narrow down to their exact color-matched part in seconds instead of scrolling.",
  },
  {
    name: "Vilavit",
    domain: "vilavit.com",
    href: "https://vilavit.com/",
    img: "/img/projects/vilavit.webp",
    alt: "Vilavit — full Shopify store redesign",
    tag: "Full Redesign",
    body: "Top-to-bottom redesign of an existing store — modernized the whole brand system, restructured navigation and shortened the path to checkout.",
  },
  {
    name: "Nazira Bou Nassif",
    domain: "nazirabounassif.com",
    href: "https://nazirabounassif.com/",
    img: "/img/projects/nazirabounassif.webp",
    alt: "Nazira Bou Nassif — full Shopify store redesign",
    tag: "Full Redesign",
    body: "Complete redesign for a designer label — an elegant, lookbook-style feel on the surface, with a conversion-first structure underneath.",
  },
  {
    name: "Ferrous Beauty",
    domain: "ferrousbeauty.com",
    href: "https://ferrousbeauty.com/products/hydro-lip-stain",
    img: "/img/projects/ferrousbeauty.webp",
    alt: "Ferrous Beauty — custom product bundle build",
    tag: "Custom Bundle",
    body: "Engineered a custom bundle builder right on the product page — a clean way to raise average order value without renting another app.",
  },
  {
    name: "Is-Hurðir",
    domain: "is-hurdir.is",
    href: "https://is-hurdir.is/",
    img: "/img/projects/ishurdir.webp",
    alt: "Is-Hurðir — custom product card inquiry form flow",
    tag: "Custom Feature",
    body: "For this Icelandic retailer I built a custom product-card flow — click any product and a tailored inquiry form opens, turning browsers into leads.",
  },
  {
    name: "Bexxly",
    domain: "bexxly.com",
    href: "https://bexxly.com/",
    img: "/img/projects/bexxly.webp",
    alt: "Bexxly — complete Shopify store design",
    tag: "Complete Build",
    body: "Full store design and build — a clean, focused D2C experience where every section earns its place on the page.",
  },
  {
    name: "Nasalix",
    domain: "getnasalix.com",
    href: "https://getnasalix.com/",
    img: "/img/projects/nasalix.webp",
    alt: "Nasalix — complete Shopify store design",
    tag: "Complete Build",
    body: "Designed the complete store with a landing-page mindset — one product, one story, one clear action, all the way down the page.",
  },
  {
    name: "Neuroloom",
    domain: "getneuroloom.com",
    href: "https://getneuroloom.com/",
    img: "/img/projects/neuroloom.webp",
    alt: "Neuroloom — complete Shopify store design",
    tag: "Complete Build",
    body: "Full design and build for a wellness brand — a trust-first layout built around social proof, benefits and confident calls to action.",
  },
  {
    name: "Record Roots",
    domain: "record-roots.com",
    href: "https://record-roots.com/",
    img: "/img/projects/recordroots.webp",
    alt: "Record Roots — Shopify maintenance and feature development",
    tag: "Care + Features",
    tagMuted: true,
    body: "Ongoing feature development and store care — section builds, fixes and continuous improvements, delivered as needed.",
  },
  {
    name: "Fuse Jewelry",
    domain: "fusejewelry.com",
    href: "https://fusejewelry.com/",
    img: "/img/projects/fusejewelry.webp",
    alt: "Fuse Jewelry — Shopify maintenance and section builds",
    tag: "Care + Features",
    tagMuted: true,
    body: "Store maintenance, custom section builds and performance care for a jewelry brand — small changes, compounding results.",
  },
  {
    name: "Residential Gates",
    domain: "residentialgates.co.uk",
    href: "https://www.residentialgates.co.uk/",
    img: "/img/projects/residentialgates.webp",
    alt: "Residential Gates — Shopify theme customization and support",
    tag: "Care + Features",
    tagMuted: true,
    body: "Theme customization and ongoing support for a UK specialist — keeping the store sharp while the business focuses on the business.",
  },
];

/* ------------------------------------------------------------------ *
 * SERVICES — the six `.svc` cards in #services.
 * ------------------------------------------------------------------ */
export const SERVICES: Service[] = [
  {
    sku: "Full build",
    title: "Complete Store Design & Build",
    body: "From blank canvas to launch-ready: structure, design, custom theme work, content and setup — the whole store, done properly.",
    price: "Most popular →",
  },
  {
    sku: "Redesign",
    title: "Full Store Redesign",
    body: "A modern reface of your existing store — new look, better flow, without losing your SEO or a single day of sales.",
    price: "Zero downtime →",
  },
  {
    sku: "Custom",
    title: "Custom Features",
    body: "Upsell popups, drawers, bundle builders, custom filters, inquiry forms — app-level functionality coded into your theme, no monthly app fees.",
    price: "No app fees →",
  },
  {
    sku: "Liquid",
    title: "Theme Customization",
    body: "Pixel-perfect sections and templates built directly in Liquid, JS and CSS — exactly what you imagined, not “close enough.”",
    price: "Pixel-perfect →",
  },
  {
    sku: "CRO",
    title: "Landing Pages & CRO",
    body: "Product and campaign pages designed around how buyers actually think — clear story, clear proof, clear next step.",
    price: "Built to sell →",
  },
  {
    sku: "Care",
    title: "Ongoing Maintenance",
    body: "Daily or weekly support: updates, fixes, new sections, speed care. Some clients have kept me for a year and counting.",
    price: "Long-term →",
  },
];

/* ------------------------------------------------------------------ *
 * TOOLS — the twelve `.tool` tiles in #tools.
 * `icon` is the sprite symbol id without the leading "#".
 * ------------------------------------------------------------------ */
export const TOOLS: Tool[] = [
  { icon: "i-bag", name: "Shopify", body: "Themes, sections, metafields, store setup" },
  { icon: "i-drop", name: "Liquid", body: "Templating for every custom section" },
  { icon: "i-code", name: "JavaScript (ES6+)", body: "Drawers, popups, bundles, cart logic" },
  { icon: "i-doc", name: "HTML5", body: "Semantic, accessible markup" },
  { icon: "i-palette", name: "CSS3 & SCSS", body: "Responsive layouts and design systems" },
  { icon: "i-terminal", name: "Shopify CLI", body: "Local theme dev, preview and deploys" },
  { icon: "i-branch", name: "Git & GitHub", body: "Version control, safe rollbacks" },
  { icon: "i-editor", name: "VS Code", body: "Where the actual work happens" },
  { icon: "i-shapes", name: "Figma", body: "Design, prototypes and clean handoff" },
  { icon: "i-inspect", name: "Chrome DevTools", body: "Debugging and cross-device testing" },
  { icon: "i-motion", name: "GSAP", body: "Motion that supports the sale, not distracts" },
  { icon: "i-gauge", name: "Lighthouse & PageSpeed", body: "Core Web Vitals and speed audits" },
];

/* ------------------------------------------------------------------ *
 * REVIEWS — the four `.tst` testimonials in #reviews.
 * `initial` is the letter shown in the `.ava` circle.
 * ------------------------------------------------------------------ */
export const REVIEWS: Review[] = [
  {
    quote: "He rebuilt our store from the ground up, and it finally feels like our brand. Cleaner, faster, and conversions moved in the right direction almost immediately. Communication was daily and effortless.",
    who: "Store Owner",
    where: "D2C Brand · Australia",
    initial: "A",
  },
  {
    quote: "We've worked together every single day for over a year now. He treats our store like it's his own — new sections, tests, fixes, always shipped fast and always on-brand.",
    who: "Founder",
    where: "E-commerce Brand · USA",
    initial: "F",
  },
  {
    quote: "The custom upsell popup and test-ride drawer he engineered lifted our average order value noticeably. Complex Liquid and JavaScript work, delivered clean and matching our theme perfectly.",
    who: "E-commerce Manager",
    where: "Retail Brand · Netherlands",
    initial: "E",
  },
  {
    quote: "Rare combination: a real design eye and real frontend skill. He redesigned our entire store without us losing a single day of sales. Our go-to Shopify developer now.",
    who: "Creative Director",
    where: "Fashion Label · Europe",
    initial: "C",
  },
];

/* ------------------------------------------------------------------ *
 * TIMELINE — the three `.tl-item` entries in #journey.
 * ------------------------------------------------------------------ */
export const TIMELINE: TimelineItem[] = [
  {
    when: "2023 · 3 months",
    role: "Frontend Developer — Intern",
    where: "Softileo · Sargodha, Pakistan",
    body: "Learned the craft of modern frontend development — responsive layouts, clean JavaScript, and the discipline of shipping.",
  },
  {
    when: "2023 — Present",
    role: "Shopify Expert",
    where: "DevJour Technologies · Chowk Azam, Layyah",
    body: "Complete store builds, full redesigns and custom feature engineering for international clients — 150+ projects and counting.",
    award: "★ Employee of the Year — 2026",
  },
  {
    when: "Today",
    role: "Your Project, Next",
    where: "Working with brands worldwide · Remote",
    body: "Currently shipping daily on long-term client stores — and taking on select new builds, redesigns and custom features.",
    now: true,
  },
];

/* ------------------------------------------------------------------ *
 * SUMMARY_ROWS — the `.rc-row` lines of the "Work summary" receipt card.
 * (The `.rc-total` line and `.rc-foot` note are one-offs and stay in the
 * component.)
 * ------------------------------------------------------------------ */
export const SUMMARY_ROWS: SummaryRow[] = [
  { label: "Projects delivered", value: "150+" },
  { label: "Complete store builds", value: "7" },
  { label: "Full redesigns", value: "3" },
  { label: "Countries served", value: "7" },
  { label: "Years of experience", value: "3" },
  { label: "Apps replaced with code", value: "Many" },
];

/* ------------------------------------------------------------------ *
 * STACK — the `.stack` chips in the About section.
 * ------------------------------------------------------------------ */
export const STACK: string[] = [
  "Shopify",
  "Liquid",
  "JavaScript",
  "CSS / SCSS",
  "HTML",
  "Theme Dev",
  "Figma → Store",
  "CRO",
  "Speed Optimization",
];
