# Going live

## Read this first — Namecheap hosting will not run this site

Namecheap's shared hosting (Stellar / Stellar Plus) is built for PHP and
WordPress. This site is **Next.js**, which needs a Node.js server for:

- `/api/contact` — the route that sends your email through Resend
- server-rendering the pages

Some Namecheap cPanel plans do have a "Setup Node.js App" tool, so it is not
strictly impossible — but it runs an old Passenger setup, you would be
configuring it by hand, and it will be slower than the free option below. It is
not worth paying for.

**Do this instead:**

| What | Where | Cost |
| --- | --- | --- |
| Domain | Namecheap | ~$10–15/year |
| Hosting | **Vercel** | **Free** |

Vercel is built by the team that makes Next.js. Free tier gives you HTTPS, a
global CDN, automatic deploys on every push, and the serverless function your
contact form needs. Buy **only the domain** at Namecheap — skip their hosting.

---

## Step 1 — Code on GitHub ✅ DONE

Already pushed to <https://github.com/Ahsansattar001/Porfolio> on the `master`
branch. `.env.local` is excluded, so your Resend key is not on GitHub.

For future changes:

```bash
git add -A
git commit -m "what you changed"
git push
```

Every push redeploys the live site automatically once Step 2 is done.

## Step 2 — Deploy on Vercel

1. Sign in at <https://vercel.com/signup> **with your GitHub account**.
2. Click **Add New → Project**, pick your `portfolio` repo, click **Import**.
3. Leave every build setting alone — Vercel detects Next.js by itself.
4. Before clicking Deploy, open **Environment Variables** and add:

   | Name | Value |
   | --- | --- |
   | `RESEND_API_KEY` | your key from <https://resend.com/api-keys> |
   | `MAIL_TO` | `ahsansattar8586@gmail.com` |
   | `MAIL_FROM` | `Portfolio Contact Form <onboarding@resend.dev>` |

5. Click **Deploy**. About a minute later you get a live URL like
   `portfolio-xxxx.vercel.app`.

**Test the contact form on that URL before going further.**

## Step 3 — Connect your Namecheap domain

In Vercel: **Project → Settings → Domains → Add**, type your domain. Vercel
shows you the DNS records it wants.

In Namecheap: **Domain List → Manage → Advanced DNS**, and add what Vercel
asked for — normally:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Delete Namecheap's default "parking" records or they will fight yours.

DNS takes anywhere from 10 minutes to a few hours. Vercel issues the HTTPS
certificate automatically once it resolves.

## Step 4 — Switch on the SEO bits

Open `src/lib/site.ts` and set your real domain:

```ts
url: 'https://yourdomain.com',
```

Commit and push — Vercel redeploys automatically. That one line turns on
canonical URLs, absolute Open Graph image URLs, and fills in `sitemap.xml`
(which is deliberately empty until then, because a sitemap full of the wrong
origin is worse than none).

Then submit the site at
<https://search.google.com/search-console> so Google starts indexing it.

---

## About the email sender

`MAIL_FROM` starts as `onboarding@resend.dev`. That works immediately but
Resend will **only deliver it to the address that owns the Resend account** —
fine for testing, useless for real visitors.

Once your domain is live, verify it at <https://resend.com/domains> (Resend
gives you DNS records to paste into Namecheap, same place as Step 3), then set:

```
MAIL_FROM=Ahsan Sattar <hello@yourdomain.com>
```

Until you do that, the automatic "thanks for your message" reply will not reach
the people who contact you.

---

## Afterwards

Every `git push` redeploys automatically. To change content:

- contact details → `src/lib/site.ts`
- projects, services, tools, reviews → `src/lib/content.ts`
- colours and type → the tokens at the top of `src/app/globals.css`

Then `git add -A && git commit -m "update" && git push`.
