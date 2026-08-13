/**
 * The inline SVG sprite that used to sit at the top of <body> in index.html
 * and contact.html. Every icon on the site is a <use href="#i-…"> pointing at
 * one of these symbols, so this has to be rendered once per page — put it at
 * the very top of the layout/page tree.
 *
 * Server component on purpose: it is pure markup, so it costs zero JS.
 */
export default function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      {/* theme */}
      <symbol
        id="i-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.3M12 19.7V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.3M19.7 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
      </symbol>
      <symbol
        id="i-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.3 14.4A8.4 8.4 0 0 1 9.6 3.7a8.5 8.5 0 1 0 10.7 10.7Z" />
      </symbol>

      {/* social */}
      <symbol
        id="i-whatsapp"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.6Z" />
        <path d="M9.6 8.3c.4-.5 1-.4 1.2.1l.6 1.3c.1.3 0 .6-.2.8l-.5.4c.5 1.1 1.4 2 2.5 2.5l.4-.5c.2-.2.5-.3.8-.2l1.3.6c.5.2.6.8.1 1.2-.6.5-1.4.7-2.2.4a8.3 8.3 0 0 1-4.5-4.5c-.3-.8-.1-1.6.5-2.1Z" />
      </symbol>
      <symbol
        id="i-mail"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2.8" y="5" width="18.4" height="14" rx="2.6" />
        <path d="m3.6 7.2 7.3 5.1c.7.5 1.5.5 2.2 0l7.3-5.1" />
      </symbol>
      <symbol
        id="i-linkedin"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="4.2" />
        <path d="M7.6 10.6v6.1" />
        <circle cx="7.6" cy="7.7" r=".95" fill="currentColor" stroke="none" />
        <path d="M11.4 16.7v-6.1M11.4 13.4a2.6 2.6 0 0 1 5.2 0v3.3" />
      </symbol>
      <symbol
        id="i-instagram"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="5.2" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.1" cy="6.9" r="1.05" fill="currentColor" stroke="none" />
      </symbol>
      <symbol
        id="i-facebook"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="4.2" />
        <path d="M15.1 8.1h-1.5c-1.1 0-1.9.9-1.9 1.9v8.9M9.7 12.6h4.9" />
      </symbol>

      {/* tools */}
      <symbol
        id="i-bag"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.6 7.8h12.8l1 12.4H4.6l1-12.4Z" />
        <path d="M9 10.4V7a3 3 0 0 1 6 0v3.4" />
      </symbol>
      <symbol
        id="i-drop"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3.2s5.7 5.5 5.7 9.3A5.7 5.7 0 1 1 6.3 12.5C6.3 8.7 12 3.2 12 3.2Z" />
      </symbol>
      <symbol
        id="i-code"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8.4 8.4-4 3.6 4 3.6M15.6 8.4l4 3.6-4 3.6M13.6 5.4l-3.2 13.2" />
      </symbol>
      <symbol
        id="i-doc"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.2" y="3.6" width="17.6" height="16.8" rx="2.6" />
        <path d="M3.2 8.4h17.6" />
        <path d="m9.6 12.6-1.8 1.8 1.8 1.8M14.4 12.6l1.8 1.8-1.8 1.8" />
      </symbol>
      <symbol
        id="i-palette"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3.2a8.8 8.8 0 0 0 0 17.6 2 2 0 0 0 1.6-3.3 2 2 0 0 1 1.5-3.3h2.2a3.5 3.5 0 0 0 3.5-3.5c0-4-3.9-7.5-8.8-7.5Z" />
        <circle cx="7.9" cy="11.4" r="1" fill="currentColor" stroke="none" />
        <circle cx="10.5" cy="7.6" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="8.4" r="1" fill="currentColor" stroke="none" />
      </symbol>
      <symbol
        id="i-terminal"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.2" y="4" width="17.6" height="16" rx="2.6" />
        <path d="m7.6 10 2.6 2.3-2.6 2.3M13.2 14.7h3.8" />
      </symbol>
      <symbol
        id="i-branch"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="7" cy="6" r="2.2" />
        <circle cx="7" cy="18" r="2.2" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M7 8.2v7.6M16.8 11.2c-.2 3-2.6 4.2-5.6 4.6" />
      </symbol>
      <symbol
        id="i-editor"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.2" y="4" width="17.6" height="16" rx="2.6" />
        <path d="M8.4 4v16" />
        <path d="M11.8 9.6h5.6M11.8 13.2h3.8" />
      </symbol>
      <symbol
        id="i-shapes"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.6" y="3.6" width="7" height="7" rx="1.6" />
        <circle cx="17" cy="7.1" r="3.5" />
        <rect x="3.6" y="13.4" width="7" height="7" rx="3.5" />
      </symbol>
      <symbol
        id="i-inspect"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10.8" cy="10.8" r="6.6" />
        <path d="m15.6 15.6 4.6 4.6" />
        <path d="m9.4 9.2-1.4 1.6 1.4 1.6M12.4 9.2l1.4 1.6-1.4 1.6" />
      </symbol>
      <symbol
        id="i-motion"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.8 17.6c4-9.2 8.6-11.2 12-7.7 3.4 3.5 3.5 10.4 6.4-1.5" />
        <circle cx="2.8" cy="17.6" r="1.3" fill="currentColor" stroke="none" />
      </symbol>
      <symbol
        id="i-gauge"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.6 17.4a8.8 8.8 0 1 1 16.8 0" />
        <path d="m12 13.6 3.8-4" />
        <circle cx="12" cy="17.4" r="1.4" fill="currentColor" stroke="none" />
      </symbol>

      {/* form feedback (contact page) */}
      <symbol
        id="i-check"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.2 2.7 2.7L16 9.6" />
      </symbol>
      <symbol
        id="i-alert"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.6v5" />
        <path d="M12 16.2h.01" />
      </symbol>
    </svg>
  );
}
