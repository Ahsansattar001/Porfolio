# Ahsan Sattar — Portfolio (Next.js)

Next.js 16 (App Router, React 19, TypeScript). Rebuilt from the original static
HTML/CSS site — same stylesheet, same fonts, same markup — with the contact
form now running on a serverless route with Resend instead of an Express server
you have to keep alive.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

`npm run build && npm start` for a production build.

> **Seeing an unstyled page?** You are probably opening a file from `.next/`
> directly. That folder holds build artifacts whose CSS and JS live at
> server-only `/_next/...` paths — opened from disk they resolve to nothing.
> Always view the site through `npm run dev` at http://localhost:3000.

## Make the contact form send email

1. Sign in at <https://resend.com> (free tier: 3,000 emails/month).
2. Create a key at <https://resend.com/api-keys>.
3. Paste it into `.env.local` as `RESEND_API_KEY=...` and restart.

`.env.local` already exists with the other values filled in. It is gitignored —
your key never reaches a commit. Do not paste it into chat or email.

**About the From address.** `.env.local` ships with
`onboarding@resend.dev`, which works instantly but which Resend will **only
deliver to the address that owns the Resend account**. That is fine for testing
your own inbox. For real visitors — and so the automatic confirmation actually
reaches *them* — verify a domain at <https://resend.com/domains> and set
`MAIL_FROM` to something like `Ahsan Sattar <hello@yourdomain.com>`.

While `RESEND_API_KEY` is empty the form still validates properly and returns a
clear "not configured yet" message rather than failing strangely.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx          Fonts, metadata, the no-flash theme script
│   ├── page.tsx            Homepage — composes the sections in order
│   ├── globals.css         The whole design system, ported unchanged
│   ├── contact/page.tsx    Contact page
│   ├── api/contact/route.ts  Validates and sends via Resend
│   ├── sitemap.ts          Switches on once SITE.url is set
│   └── robots.ts
├── components/
│   ├── sections/           The 13 page sections (server components)
│   ├── Nav, ThemeToggle, Preloader, Reveal, Counter, Marquee, ProjectTilt
│   ├── ContactForm.tsx     Client-side validation + submit
│   ├── IconSprite.tsx      The inline SVG symbol sprite
│   └── JsonLd.tsx          Person + ProfessionalService, and the FAQ schema
├── lib/
│   ├── site.ts             Name, contact details, socials, nav — edit here
│   ├── content.ts          Projects, services, tools, reviews, timeline
│   └── validation.ts       Form rules, shared by the client AND the server
└── fonts/                  Inter + Inter Tight (variable woff2)
```

### Where to edit things

| To change | Edit |
| --- | --- |
| Phone, email, social links | `src/lib/site.ts` |
| Projects, services, tools, reviews, timeline | `src/lib/content.ts` |
| Colours, spacing, type scale | the tokens at the top of `src/app/globals.css` |
| Which 4 stores appear in the hero | `COLUMN_A` / `COLUMN_B` in `src/components/sections/Hero.tsx` |
| Form fields or rules | `src/lib/validation.ts` (both sides follow it) |

Contact details used to be duplicated across two HTML files. They now live in
`site.ts` only — change a number once and every page follows.

---

## How it differs from the static version

**Fonts** are loaded by `next/font/local` rather than a hand-written
`@font-face` block. Same two variable woff2 files, but Next preloads them and
generates the CSS variables that `globals.css` consumes.

**Images** go through `next/image`, so the screenshots get resized and served
in modern formats per device instead of shipping one fixed file.

**The form** posts to `/api/contact`, a serverless route. No long-running
server, nothing to restart, and it deploys anywhere Next runs.

**Validation lives in one file.** `src/lib/validation.ts` is imported by both
the form and the route handler, so the client and server rules cannot drift
apart — which is exactly what they were free to do when they were two separate
files.

### Spam and abuse defences (all carried over)

- Honeypot `company` field — filled means silently discarded, 200 returned so
  bots learn nothing.
- Header-injection guard: newlines rejected in every single-line field.
- Link flood: more than 6 URLs in the message is dropped.
- Rate limit: 5 accepted messages per IP per 15 minutes.
- Every value is HTML-escaped before it reaches the email body.

The rate limiter is in-memory, so it is per-instance and resets on a cold
start. That is fine for a portfolio; a busy site would want Upstash or similar.

---

## Deploying

Vercel is the path of least resistance:

1. Push to GitHub (`git init` first — the scaffold did not create a repo).
2. Import the repo at <https://vercel.com/new>.
3. Add `RESEND_API_KEY`, `MAIL_TO` and `MAIL_FROM` as Environment Variables.
4. Deploy.

Anywhere that runs Node works too — `npm run build && npm start`.

**After you have a domain**, set `url` in `src/lib/site.ts`. That single change
switches on canonical URLs, absolute Open Graph image URLs and the sitemap.
They stay off until then on purpose: pointing them at a domain you do not own
can push your real site out of search results.
