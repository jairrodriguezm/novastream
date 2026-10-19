import { ThemeSwitcher } from './ThemeSwitcher';

export function AppleEmeraldNavbar() {
  return (
    <header className="fixed top-16 inset-x-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
      <nav
        aria-label="Navegación principal"
        className="pointer-events-auto apple-glass rounded-full px-4 py-2.5 md:px-6 flex items-center justify-between gap-6 md:gap-10 max-w-5xl w-full transition-all duration-300"
      >
        {/* Brand Logo with Colombian Emerald Faceted Gem */}
        <a
          href="#"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-xl emerald-cta-shine transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-4 h-4 text-white drop-shadow"
              aria-hidden="true"
            >
              <path
                d="M6 3h12l4 6-10 12L2 9l4-6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 9h20M12 21 8 9l4-6 4 6-4 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-sm md:text-base font-semibold tracking-tight text-[var(--text-primary)] flex items-center gap-1.5">
              NovaStream
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--emerald-vivid)] shadow-[0_0_8px_var(--emerald-vivid)]" />
            </span>
          </div>
        </a>

        {/* Apple TV+ Pill Navigation Links */}
        <div className="hidden sm:flex items-center gap-1 bg-[var(--surface-pill)] p-1 rounded-full border border-[var(--border-subtle)]">
          <a
            href="#inicio"
            className="px-3.5 py-1 text-xs font-semibold rounded-full bg-[var(--emerald-colombian)]/18 text-[var(--emerald-badge-text)] border border-[var(--emerald-colombian)]/30 transition"
          >
            Explorar
          </a>
          <a
            href="#tendencias"
            className="px-3.5 py-1 text-xs font-medium rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-pill)] transition"
          >
            Originales
          </a>
          <a
            href="#drm"
            className="px-3.5 py-1 text-xs font-medium rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-pill)] transition"
          >
            En Vivo 4K
          </a>
        </div>

        {/* Right Controls: Theme Switcher & Profile Pill */}
        <div className="flex items-center gap-2.5">
          <ThemeSwitcher />
          <div
            aria-label="Perfil de usuario"
            className="h-8 w-8 rounded-full emerald-cta-shine flex items-center justify-center text-xs font-semibold text-white"
          >
            NS
          </div>
        </div>
      </nav>
    </header>
  );
}

