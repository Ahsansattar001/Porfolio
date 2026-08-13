'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

function label(theme: Theme): string {
  return theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
}

/* `data-theme` on <html> is the single source of truth — it is stamped there
   by the inline script in layout.tsx before first paint. Subscribing to it
   instead of mirroring it in state means the button can never disagree with
   the page, whoever changed the attribute. */
function subscribe(onStoreChange: () => void): () => void {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

/* The server cannot know the visitor's theme, so it renders the neutral markup
   from index.html and the real labels arrive right after hydration. Reading
   the attribute during render would be a guaranteed hydration mismatch. */
function getServerSnapshot(): null {
  return null;
}

/** Port of initTheme() from assets/js/main.js. */
export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    // Follow the OS, but only while the visitor has never chosen explicitly.
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('theme');
      } catch {
        /* storage blocked — treat as "never chosen" */
      }
      if (stored) return;
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    };

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* private mode — the choice just does not persist */
    }
  }, []);

  return (
    <button
      className="theme-toggle"
      data-theme-toggle
      type="button"
      onClick={toggle}
      aria-label={theme ? label(theme) : 'Switch theme'}
      title={theme ? label(theme) : undefined}
      aria-pressed={theme ? theme === 'dark' : undefined}
    >
      <svg className="i-sun" aria-hidden="true">
        <use href="#i-sun" />
      </svg>
      <svg className="i-moon" aria-hidden="true">
        <use href="#i-moon" />
      </svg>
    </button>
  );
}
