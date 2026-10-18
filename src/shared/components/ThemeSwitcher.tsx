'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const saved = window.localStorage.getItem('novastream-theme') as ThemeMode | null;
    const initialTheme: ThemeMode = saved === 'dark' ? 'dark' : 'light';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('novastream-theme', nextTheme);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      title={isDark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
      className="relative inline-flex h-8 w-14 shrink-0 items-center rounded-full p-1 bg-[var(--surface-pill)] border border-[var(--border-subtle)] hover:border-[var(--emerald-colombian)]/50 transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--emerald-vivid)]"
    >
      {/* Background Track Icons */}
      <span className="flex w-full items-center justify-between px-1 text-[var(--text-muted)]">
        {/* Sun Icon */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="w-3.5 h-3.5"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.7" />
          <path
            d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="w-3.5 h-3.5"
          aria-hidden="true"
        >
          <path
            d="M15.5 11.8A6 6 0 0 1 8.2 4.5a6 6 0 1 0 7.3 7.3Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Sliding Emerald Thumb with Active Icon */}
      <span
        aria-hidden="true"
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full emerald-cta-shine text-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
            <path
              d="M15.5 11.8A6 6 0 0 1 8.2 4.5a6 6 0 1 0 7.3 7.3Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
            <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
    </button>
  );
}

