import { Link, Outlet } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export function Layout() {
  return (
    <div className="min-h-screen texture-paper">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-paper)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-display text-lg font-medium tracking-tight text-[var(--color-ink)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] transition group-hover:border-[var(--color-accent)]">
              <BookOpen size={16} className="text-[var(--color-accent)]" />
            </span>
            Emergence
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              to="/#parts"
              className="hidden text-[var(--color-slate)] transition hover:text-[var(--color-ink)] sm:inline"
            >
              Contents
            </Link>
            <Link
              to="/support"
              className="hidden text-[var(--color-slate)] transition hover:text-[var(--color-accent)] sm:inline"
            >
              Support
            </Link>
            <Link
              to="/chapter/1/p/0"
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5 font-medium text-[var(--color-ink)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Begin Reading
            </Link>
            <a
              href="https://github.com/cismankit/The-Age-of-Emergent-Intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-muted)] transition hover:text-[var(--color-ink)]"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-lg font-medium text-[var(--color-ink)]">
              The Age of Emergent Intelligence
            </p>
            <p className="mt-1 text-sm text-[var(--color-muted)]">
              A visual field guide to multi-agent AI · ProjectX
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--color-slate)]">
            <Link to="/chapter/1/p/0" className="link-subtle">
              Chapter 1
            </Link>
            <Link to="/#parts" className="link-subtle">
              All Parts
            </Link>
            <Link to="/support" className="link-subtle">
              Support
            </Link>
            <span className="text-[var(--color-muted)]">25 chapters · 6 parts</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
