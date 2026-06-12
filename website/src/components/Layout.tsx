import { Link, Outlet } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

export function Layout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 font-display text-lg font-semibold">
            <img
              src={`${BASE}covers/cover.png`}
              alt=""
              className="h-9 w-9 rounded object-cover"
            />
            Emergence
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/chapter/1" className="text-[var(--color-slate)] hover:text-[var(--color-ink)]">
              Read
            </Link>
            <Link to="/chapter/25" className="text-[var(--color-slate)] hover:text-[var(--color-ink)]">
              ProjectX
            </Link>
            <a
              href="https://github.com/cismankit/The-Age-of-Emergent-Intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-slate)] hover:text-[var(--color-ink)]"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border)] bg-white px-6 py-8 text-center text-sm text-[var(--color-slate)]">
        <img
          src={`${BASE}covers/cover.png`}
          alt="Emergence"
          className="mx-auto mb-3 h-16 w-16 rounded-lg shadow"
        />
        <p className="font-display text-base text-[var(--color-ink)]">The Age of Emergent Intelligence</p>
        <p className="mt-1">A Visual Field Guide to Multi-Agent AI · 25 Chapters · ProjectX</p>
      </footer>
    </div>
  );
}
