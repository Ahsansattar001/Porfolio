'use client';

/**
 * Contact form — client-side validation + submit.
 *
 * The rules live in `@/lib/validation` and are enforced again by the API route;
 * this layer only exists to give people fast, readable feedback.
 *
 * Two behaviours are worth keeping if you edit this:
 *   · Errors appear only *after* the first submit attempt. Scolding someone
 *     mid-typing is the fastest way to lose an enquiry.
 *   · If delivery fails the visitor still gets a pre-filled mailto: link, so a
 *     backend outage never costs you the enquiry.
 */

import { useRef, useState } from 'react';
import type { FormEvent, RefObject } from 'react';
import { SITE } from '@/lib/site';
import { SERVICES, BUDGETS, MESSAGE_MAX, validate } from '@/lib/validation';
import type { ContactPayload } from '@/lib/validation';

const EMPTY: ContactPayload = {
  name: '',
  email: '',
  phone: '',
  website: '',
  service: '',
  budget: '',
  message: '',
  consent: false,
  company: '',
};

/** Focus order for the first invalid field — matches the visual order of the form. */
const FIELD_ORDER = ['name', 'email', 'phone', 'website', 'service', 'message', 'consent'] as const;
type FieldName = (typeof FIELD_ORDER)[number];

/** `action` is the escape hatch that turns a dead end into a working route. */
type StatusAction = { href: string; label: string };
type Status = { type: 'ok' | 'bad'; title: string; body: string; action?: StatusAction } | null;

/** A mailto: with everything the visitor already typed. */
function mailtoFallback(p: ContactPayload): StatusAction {
  const body =
    `Name: ${p.name}\n` +
    `Email: ${p.email}\n` +
    `Phone: ${p.phone || '—'}\n` +
    `Store URL: ${p.website || '—'}\n` +
    `Service: ${p.service}\n` +
    `Budget: ${p.budget || 'Not specified'}\n\n` +
    `${p.message}\n`;

  return {
    href:
      `mailto:${SITE.email}` +
      `?subject=${encodeURIComponent(`Project enquiry — ${p.service} — ${p.name}`)}` +
      `&body=${encodeURIComponent(body)}`,
    label: 'Send it as an email instead →',
  };
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  /* Becomes true on the first submit attempt; until then the form stays quiet. */
  const [submitted, setSubmitted] = useState(false);

  /* One ref per field so the first invalid one can be focused and scrolled to.
     Separate refs rather than a callback-populated map — the React compiler's
     lint rules (rightly) object to writing into a ref during render. */
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const serviceRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  /** Re-check one field, but only once the visitor has tried to submit. */
  function recheck(name: FieldName, next: ContactPayload) {
    if (!submitted) return;
    const message = validate(next).errors[name] ?? '';
    setErrors((prev) => {
      if ((prev[name] ?? '') === message) return prev;
      const copy = { ...prev };
      if (message) copy[name] = message;
      else delete copy[name];
      return copy;
    });
  }

  function update<K extends keyof ContactPayload>(name: K, value: ContactPayload[K]) {
    const next = { ...values, [name]: value };
    setValues(next);
    if ((FIELD_ORDER as readonly string[]).includes(name)) recheck(name as FieldName, next);
  }

  const onBlur = (name: FieldName) => () => recheck(name, values);

  function describedBy(name: FieldName) {
    return errors[name] ? `err-${name}` : undefined;
  }
  function invalid(name: FieldName) {
    return errors[name] ? true : undefined;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setStatus(null);

    const { data, errors: found } = validate(values);
    setErrors(found);

    const firstBad = FIELD_ORDER.find((name) => found[name]);
    if (firstBad) {
      setStatus({
        type: 'bad',
        title: 'Check the highlighted fields',
        body: 'A few details are missing or look incorrect.',
      });
      const refs: Record<FieldName, RefObject<HTMLElement | null>> = {
        name: nameRef,
        email: emailRef,
        phone: phoneRef,
        website: websiteRef,
        service: serviceRef,
        message: messageRef,
        consent: consentRef,
      };
      const el = refs[firstBad].current;
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSending(true);
    // Declared outside the try so the catch can tell "server said 503" apart
    // from "the request never got there at all".
    let httpStatus = 0;
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      httpStatus = res.status;

      // A missing or broken API answers with an HTML error page, not JSON.
      const isJson = (res.headers.get('content-type') ?? '').includes('application/json');
      const payload: { message?: string; errors?: Record<string, string> } = isJson
        ? await res.json().catch(() => ({}))
        : {};

      if (res.ok) {
        setValues(EMPTY);
        setErrors({});
        setSubmitted(false);
        setStatus({
          type: 'ok',
          title: 'Message sent',
          body:
            'Thanks — it landed in my inbox. I usually reply within a few hours. ' +
            `If it is urgent, WhatsApp me on ${SITE.phoneDisplay}.`,
        });
        statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      if (res.status === 422) {
        // The server disagreed with us about the data — show it field by field.
        if (payload.errors) setErrors(payload.errors);
        setStatus({
          type: 'bad',
          title: 'Check the highlighted fields',
          body: payload.message ?? 'A few details need fixing.',
        });
        return;
      }

      if (res.status === 429) {
        setStatus({
          type: 'bad',
          title: 'Too many messages',
          body:
            'You have sent a few already. Please wait a little while, or reach me on WhatsApp at ' +
            `${SITE.phoneDisplay}.`,
          action: mailtoFallback(data),
        });
        return;
      }

      throw new Error(payload.message ?? `HTTP ${res.status}`);
    } catch (err) {
      /* console.warn, not console.error: Next's dev overlay promotes
         console.error to a full-screen red "Console Error" panel, which made
         the expected "no RESEND_API_KEY yet" setup state look like a crash.
         This branch is a handled outcome — the visitor already gets a clear
         message and a working mailto fallback — so it warns rather than
         shouts. Genuine faults still surface via the server logs. */
      console.warn('[contact form] delivery failed:', err);

      /* 503 means the server is fine but has no mail provider configured yet.
         That is a developer setup step, not something the visitor did wrong,
         so it gets its own wording. */
      const notConfigured = httpStatus === 503;

      setStatus({
        type: 'bad',
        title: notConfigured ? 'Not sent — email is not set up yet' : 'Message could not be sent',
        body: notConfigured
          ? `This form is not connected to an email provider yet. In the meantime, email ${SITE.email} ` +
            `or WhatsApp ${SITE.phoneDisplay} and I will pick it up straight away.`
          : `The contact service is not responding right now. Email ${SITE.email} or WhatsApp ` +
            `${SITE.phoneDisplay} and I will pick it up straight away.`,
        action: mailtoFallback(data),
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="form-card">
      <form id="contactForm" noValidate onSubmit={onSubmit}>
        <div className="form-grid">

          <div className="field">
            <label htmlFor="name">
              Your name <span className="req">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              /* An example name here read as if the field were pre-filled with
                 Ahsan's own details. An instruction is clearer to a visitor. */
              placeholder="Write your name"
              maxLength={80}
              required
              value={values.name}
              ref={nameRef}
              onChange={(e) => update('name', e.target.value)}
              onBlur={onBlur('name')}
              aria-invalid={invalid('name')}
              aria-describedby={describedBy('name')}
            />
            <p className={errors.name ? 'err show' : 'err'} id="err-name">
              {errors.name ?? ''}
            </p>
          </div>

          <div className="field">
            <label htmlFor="email">
              Email address <span className="req">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              maxLength={150}
              required
              value={values.email}
              ref={emailRef}
              onChange={(e) => update('email', e.target.value)}
              onBlur={onBlur('email')}
              aria-invalid={invalid('email')}
              aria-describedby={describedBy('email')}
            />
            <p className={errors.email ? 'err show' : 'err'} id="err-email">
              {errors.email ?? ''}
            </p>
          </div>

          <div className="field">
            <label htmlFor="phone">
              Phone / WhatsApp <span className="hint">(optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              /* Kept short — the label already says "Phone / WhatsApp", and a
                 longer string clips inside the half-width field. */
              placeholder="Your number"
              maxLength={30}
              value={values.phone}
              ref={phoneRef}
              onChange={(e) => update('phone', e.target.value)}
              onBlur={onBlur('phone')}
              aria-invalid={invalid('phone')}
              aria-describedby={describedBy('phone')}
            />
            <p className={errors.phone ? 'err show' : 'err'} id="err-phone">
              {errors.phone ?? ''}
            </p>
          </div>

          <div className="field">
            <label htmlFor="website">
              Store URL <span className="hint">(optional)</span>
            </label>
            <input
              type="text"
              id="website"
              name="website"
              autoComplete="url"
              inputMode="url"
              placeholder="yourstore.com"
              maxLength={150}
              value={values.website}
              ref={websiteRef}
              onChange={(e) => update('website', e.target.value)}
              onBlur={onBlur('website')}
              aria-invalid={invalid('website')}
              aria-describedby={describedBy('website')}
            />
            <p className={errors.website ? 'err show' : 'err'} id="err-website">
              {errors.website ?? ''}
            </p>
          </div>

          <div className="field">
            <label htmlFor="service">
              What do you need? <span className="req">*</span>
            </label>
            <select
              id="service"
              name="service"
              required
              value={values.service}
              ref={serviceRef}
              onChange={(e) => update('service', e.target.value)}
              onBlur={onBlur('service')}
              aria-invalid={invalid('service')}
              aria-describedby={describedBy('service')}
            >
              <option value="">Choose a service…</option>
              {SERVICES.map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
            <p className={errors.service ? 'err show' : 'err'} id="err-service">
              {errors.service ?? ''}
            </p>
          </div>

          <div className="field">
            <label htmlFor="budget">
              Budget range <span className="hint">(optional)</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={values.budget}
              onChange={(e) => update('budget', e.target.value)}
            >
              <option value="">Prefer not to say</option>
              {BUDGETS.map((budget) => (
                <option key={budget}>{budget}</option>
              ))}
            </select>
          </div>

          <div className="field full">
            <label htmlFor="message">
              Project details <span className="req">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="What are you selling, what's broken or missing, and when do you need it live? Links to references help."
              maxLength={MESSAGE_MAX}
              required
              value={values.message}
              ref={messageRef}
              onChange={(e) => update('message', e.target.value)}
              onBlur={onBlur('message')}
              aria-invalid={invalid('message')}
              aria-describedby={describedBy('message')}
            />
            <div className="counter">
              <span id="msgCount">{values.message.length}</span> / {MESSAGE_MAX}
            </div>
            <p className={errors.message ? 'err show' : 'err'} id="err-message">
              {errors.message ?? ''}
            </p>
          </div>

          {/* honeypot: hidden from humans, irresistible to bots */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="company">Company (leave this empty)</label>
            <input
              type="text"
              id="company"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              value={values.company}
              onChange={(e) => update('company', e.target.value)}
            />
          </div>

          <div className="field-check">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              required
              checked={values.consent}
              ref={consentRef}
              onChange={(e) => update('consent', e.target.checked)}
              onBlur={onBlur('consent')}
              aria-invalid={invalid('consent')}
              aria-describedby={describedBy('consent')}
            />
            <label htmlFor="consent">
              I agree to be contacted about this enquiry by email or WhatsApp.{' '}
              <span className="req">*</span>
            </label>
          </div>
          <p
            className={errors.consent ? 'err show' : 'err'}
            id="err-consent"
            style={{ gridColumn: '1/-1', marginTop: '-8px' }}
          >
            {errors.consent ?? ''}
          </p>

        </div>

        <div className="form-actions">
          <button
            type="submit"
            className={sending ? 'btn is-sending' : 'btn'}
            id="submitBtn"
            disabled={sending}
          >
            <span className="btn-label">{sending ? 'Sending…' : 'Send message'}</span>
            <span className="spinner" aria-hidden="true"></span>
            <span className="arr">↗</span>
          </button>
          <span className="note">Usually answered within a few hours.</span>
        </div>

        <div
          className={status ? `form-status show ${status.type}` : 'form-status'}
          id="formStatus"
          role="status"
          aria-live="polite"
          ref={statusRef}
        >
          {status && (
            <>
              <svg aria-hidden="true">
                <use href={status.type === 'ok' ? '#i-check' : '#i-alert'} />
              </svg>
              <span>
                <b>{status.title}</b>
                <span className="body">{status.body}</span>
                {status.action && (
                  <a className="status-link" href={status.action.href} target="_blank" rel="noopener noreferrer">
                    {status.action.label}
                  </a>
                )}
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
