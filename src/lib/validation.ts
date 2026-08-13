/**
 * Contact-form validation — the single copy of the rules.
 *
 * The old site had these written twice: once in assets/js/contact.js for fast
 * feedback in the browser, and once in server/server.js because the browser
 * can never be trusted. Two copies drift. This module is imported by both
 * `ContactForm.tsx` and `app/api/contact/route.ts`, so they cannot.
 *
 * The client still gets instant feedback and the server still re-checks
 * everything — they just agree on what "valid" means.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
  /** Honeypot — hidden from humans, so a non-empty value means a bot. */
  company: string;
}

/* --------------------------------------------------------------------------
   Patterns — carried over verbatim from the reviewed original.

   EMAIL_RE is deliberately loose: the only authoritative test of an address is
   sending mail to it, and every "strict" RFC regex rejects real addresses.
   -------------------------------------------------------------------------- */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_RE = /^[+()\d][\d\s\-().]{5,24}$/;
const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;

/** Must stay character-for-character identical to the `<select id="service">` options. */
export const SERVICES: readonly string[] = [
  'Complete store build',
  'Full store redesign',
  'Custom feature (upsell, bundle, drawer…)',
  'Theme customization',
  'Landing page / CRO',
  'Ongoing maintenance',
  'Something else',
];

/** Budget is optional, so the empty "Prefer not to say" choice is not listed here. */
export const BUDGETS: readonly string[] = [
  'Under $500',
  '$500 – $1,000',
  '$1,000 – $3,000',
  '$3,000+',
  'Monthly retainer',
];

export const MESSAGE_MAX = 3000;

/** Fields that must never contain a newline — see the header-injection guard below. */
const SINGLE_LINE_FIELDS = ['name', 'email', 'phone', 'website', 'service', 'budget'] as const;

/** Anything that is not a string becomes '' — a bot posting `{name: []}` gets no special path. */
function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Validate a submission.
 *
 * Returns the cleaned data *and* the errors, so the caller can use the trimmed
 * values without re-trimming. `errors` is empty when the payload is good.
 * Keys of `errors` are field names, values are the messages shown to visitors.
 */
export function validate(payload: Partial<ContactPayload>): {
  data: ContactPayload;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // `consent` arrives as a real boolean from our own form, but a bot or a plain
  // HTML post may send the string "true". Read it as unknown so both compile.
  const rawConsent: unknown = payload.consent;

  const data: ContactPayload = {
    name: str(payload.name),
    email: str(payload.email),
    phone: str(payload.phone),
    website: str(payload.website),
    service: str(payload.service),
    budget: str(payload.budget),
    message: str(payload.message),
    consent: rawConsent === true || rawConsent === 'true',
    company: str(payload.company),
  };

  if (!data.name) errors.name = 'Please tell me your name.';
  else if (data.name.length < 2) errors.name = 'That looks a little short.';
  else if (data.name.length > 80) errors.name = 'Please keep this under 80 characters.';

  if (!data.email) errors.email = 'I need an email address to reply to.';
  else if (!EMAIL_RE.test(data.email)) errors.email = 'That doesn’t look like a valid email address.';
  else if (data.email.length > 150) errors.email = 'That email address is too long.';

  // Phone and store URL are optional — only checked once something is typed.
  if (data.phone && !PHONE_RE.test(data.phone)) {
    errors.phone = 'Use digits, spaces and + only — or leave it empty.';
  }
  if (data.website && !URL_RE.test(data.website)) {
    errors.website = 'Enter a domain like yourstore.com — or leave it empty.';
  }

  if (!data.service) errors.service = 'Pick the closest option so I know what I’m quoting.';
  else if (!SERVICES.includes(data.service)) errors.service = 'Please pick one of the listed services.';

  if (!data.message) errors.message = 'Tell me a little about the project.';
  else if (data.message.length < 20) errors.message = 'A few more words, please — at least 20 characters.';
  else if (data.message.length > MESSAGE_MAX) errors.message = 'Please keep this under 3000 characters.';

  if (!data.consent) errors.consent = 'Please tick this so I’m allowed to reply.';

  // Header-injection guard: a newline in a single-line field is how a spammer
  // smuggles extra headers (Bcc:, Reply-To:) into an outgoing email.
  for (const key of SINGLE_LINE_FIELDS) {
    if (/[\r\n]/.test(data[key])) errors[key] = 'Invalid characters.';
  }

  return { data, errors };
}
