/**
 * POST /api/contact
 *
 * Validates an enquiry, filters the obvious spam, then emails it via Resend and
 * sends the visitor an auto-reply. Ported from the old Express backend
 * (server/server.js) — same rules, same branded email, no nodemailer.
 *
 * Configuration lives in `.env.local` (copy `.env.local.example`).
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';
import { SITE } from '@/lib/site';
import { validate } from '@/lib/validation';
import type { ContactPayload } from '@/lib/validation';

// Resend and the rate-limit map both need real Node APIs and module state.
export const runtime = 'nodejs';

/* --------------------------------------------------------------------------
   Rate limiting — in-memory, per IP, counting only *accepted* messages so
   somebody fixing three typos in a row never gets locked out.

   Caveat worth knowing before you rely on it: this Map lives in one server
   instance's memory. It resets on every cold start and is not shared between
   instances, so on a serverless host a determined sender can slip past it by
   hitting a fresh instance. That is an acceptable trade for a portfolio
   contact form — it stops casual bots and accidental double-sends. If you ever
   need a real limit, put it in Redis/Upstash and key it the same way.
   -------------------------------------------------------------------------- */
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const ACCEPTED_MAX = 5; // delivered messages per window per IP

const accepted = new Map<string, number[]>();

function overLimit(ip: string): boolean {
  const now = Date.now();

  // Opportunistic sweep — keeps the Map from growing forever without a timer.
  for (const [key, stamps] of accepted) {
    const fresh = stamps.filter((t) => now - t < RATE_WINDOW_MS);
    if (fresh.length) accepted.set(key, fresh);
    else accepted.delete(key);
  }

  const stamps = accepted.get(ip) ?? [];
  if (stamps.length >= ACCEPTED_MAX) return true;

  stamps.push(now);
  accepted.set(ip, stamps);
  return false;
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

/** Crude but effective link-spam check on the message body. */
function looksLikeSpam(message: string): boolean {
  return (message.match(/https?:\/\//gi) ?? []).length > 6;
}

/* --------------------------------------------------------------------------
   Email bodies

   Every interpolated value below is visitor-supplied, so it goes through
   escapeHtml first. Skipping this turns the enquiry inbox into an injection
   target: a name of `<img src=x onerror=...>` would otherwise render as markup
   in whatever mail client opens it.
   -------------------------------------------------------------------------- */
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value: string): string {
  return String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] ?? c);
}

function buildEmail(d: ContactPayload, meta: { when: string; ip: string }) {
  const rows: [string, string][] = [
    ['Name', d.name],
    ['Email', d.email],
    ['Phone / WhatsApp', d.phone || '—'],
    ['Store URL', d.website || '—'],
    ['Service', d.service],
    ['Budget', d.budget || 'Not specified'],
    ['Received', meta.when],
    ['IP', meta.ip],
  ];

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\n---- Message ----\n\n${d.message}\n`;

  const html = `
<div style="font-family:Inter,-apple-system,Segoe UI,sans-serif;background:#f6f8fc;padding:28px;color:#0b1220">
  <div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #e5eaf2;border-radius:14px;overflow:hidden">
    <div style="background:#1d4ed8;color:#fff;padding:20px 26px">
      <div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;opacity:.8">New project enquiry</div>
      <div style="font-size:21px;font-weight:600;margin-top:4px">${escapeHtml(d.name)} — ${escapeHtml(d.service)}</div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) => `
      <tr>
        <td style="padding:11px 26px;color:#566275;border-bottom:1px solid #eef2f8;width:38%">${escapeHtml(k)}</td>
        <td style="padding:11px 26px;color:#0b1220;font-weight:500;border-bottom:1px solid #eef2f8">${escapeHtml(v)}</td>
      </tr>`,
        )
        .join('')}
    </table>
    <div style="padding:22px 26px">
      <div style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#7d8798;margin-bottom:8px">Message</div>
      <div style="font-size:15px;line-height:1.7;white-space:pre-wrap">${escapeHtml(d.message)}</div>
    </div>
    <div style="padding:16px 26px;background:#f6f8fc;border-top:1px solid #e5eaf2;font-size:13px;color:#566275">
      Reply straight to this email — it goes back to ${escapeHtml(d.email)}.
    </div>
  </div>
</div>`;

  return { text, html };
}

function buildAutoReply(d: ContactPayload) {
  const text =
    `Hi ${d.name},\n\n` +
    `Thanks for getting in touch about "${d.service}". Your message reached me and I'll reply personally — usually within a few hours.\n\n` +
    `If it's urgent, WhatsApp me on ${SITE.phoneDisplay}.\n\n` +
    `Here's what you sent:\n\n${d.message}\n\n` +
    `— ${SITE.name}\n${SITE.role}\n${SITE.email}`;

  const html = `
<div style="font-family:Inter,-apple-system,Segoe UI,sans-serif;background:#f6f8fc;padding:28px;color:#0b1220">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5eaf2;border-radius:14px;padding:30px">
    <p style="font-size:19px;font-weight:600;margin:0 0 14px">Thanks, ${escapeHtml(d.name)} — your message arrived.</p>
    <p style="font-size:15px;line-height:1.7;color:#566275;margin:0 0 14px">
      I've received your enquiry about <b style="color:#0b1220">${escapeHtml(d.service)}</b> and I'll reply personally,
      usually within a few hours. If it's urgent, WhatsApp me on
      <a href="${SITE.socials.whatsapp}" style="color:#1d4ed8">${escapeHtml(SITE.phoneDisplay)}</a>.
    </p>
    <div style="border-left:3px solid #1d4ed8;padding:4px 0 4px 16px;margin:20px 0;font-size:14px;line-height:1.7;color:#566275;white-space:pre-wrap">${escapeHtml(d.message)}</div>
    <p style="font-size:14px;color:#0b1220;margin:24px 0 0">
      — ${escapeHtml(SITE.name)}<br>
      <span style="color:#7d8798">${escapeHtml(SITE.role)}</span>
    </p>
  </div>
</div>`;

  return { text, html };
}

/* --------------------------------------------------------------------------
   Handler
   -------------------------------------------------------------------------- */
export async function POST(req: NextRequest) {
  const ip = clientIp(req);

  let body: Partial<ContactPayload>;
  try {
    body = (await req.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ ok: false, message: 'Malformed request body.' }, { status: 400 });
  }

  // Honeypot — a real visitor never sees, let alone fills, this field.
  // Answer 200 so the bot logs a success and learns nothing about the filter.
  if (typeof body.company === 'string' && body.company.trim()) {
    console.warn('[spam] honeypot triggered from', ip);
    return NextResponse.json({ ok: true });
  }

  // Never trust the client: the same rules run again here.
  const { data, errors } = validate(body);
  if (Object.keys(errors).length) {
    return NextResponse.json(
      { ok: false, message: 'Some fields need fixing.', errors },
      { status: 422 },
    );
  }

  if (looksLikeSpam(data.message)) {
    console.warn('[spam] link flood from', ip);
    return NextResponse.json({ ok: true });
  }

  if (overLimit(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Too many messages from this connection. Please try again later.' },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Never throw at module scope for this — a missing key must not break the
    // build or the rest of the site, only this endpoint.
    console.error('[mail] RESEND_API_KEY is not set — the enquiry was validated but NOT emailed.');
    console.error('[contact] (not emailed)', JSON.stringify(data, null, 2));
    return NextResponse.json(
      {
        ok: false,
        message:
          `Email delivery is not configured yet. Set RESEND_API_KEY in .env.local ` +
          `(get one at https://resend.com/api-keys), or email ${SITE.email} directly.`,
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  // `onboarding@resend.dev` works with a brand-new key and no DNS setup, but
  // Resend will only deliver from it to the address that owns the account.
  // To reach anyone else — including a client — verify a domain at
  // https://resend.com/domains and set MAIL_FROM to an address on it.
  const from = process.env.MAIL_FROM ?? 'Portfolio Contact Form <onboarding@resend.dev>';
  const to = process.env.MAIL_TO ?? SITE.email;

  try {
    const mail = buildEmail(data, { ip, when: new Date().toUTCString() });

    const sent = await resend.emails.send({
      from,
      to,
      // Hitting Reply in the inbox answers the client, not the form.
      replyTo: data.email,
      subject: `New enquiry — ${data.service} — ${data.name}`,
      text: mail.text,
      html: mail.html,
    });

    // Resend reports failures in the response rather than throwing.
    if (sent.error) throw new Error(sent.error.message);

    // Auto-reply is a courtesy, not part of the contract: the enquiry is
    // already safe in the inbox, so a failure here must not fail the request.
    try {
      const reply = buildAutoReply(data);
      const replySent = await resend.emails.send({
        from,
        to: data.email,
        replyTo: to,
        subject: `Thanks — your message reached ${SITE.name}`,
        text: reply.text,
        html: reply.html,
      });
      if (replySent.error) console.error('[mail] auto-reply failed:', replySent.error.message);
    } catch (err) {
      console.error('[mail] auto-reply failed:', err);
    }

    console.log(`[contact] ${data.name} <${data.email}> — ${data.service}`);
    return NextResponse.json({ ok: true, message: 'Message sent.' });
  } catch (err) {
    console.error('[mail] send failed:', err);
    return NextResponse.json(
      {
        ok: false,
        message: `The message could not be sent right now. Please email ${SITE.email} directly.`,
      },
      { status: 502 },
    );
  }
}
