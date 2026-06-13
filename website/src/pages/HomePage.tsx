import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Layers,
  Brain,
  Users,
  Hammer,
  ArrowRight,
  GitBranch,
  Lightbulb,
  PenLine,
  Play,
  Bookmark,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserCircle,
} from 'lucide-react';
import { chapters, getChapter } from '../data/chapters';
import { parts } from '../data/parts';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { getBookPercent } from '../lib/bookProgress';
import { getPartTheme } from '../lib/partThemes';
import { EmergenceField } from '../components/visual/EmergenceField';
import { FlowScene } from '../components/visual/FlowScene';
import { Logo } from '../components/Logo';
import { EmergenceBlueprint } from '../components/EmergenceBlueprint';

const KIT_LINKS = {
  experienceKit: '/kits/experience',
  exoBotKit: '/kits/exo-bot',
};

const partIcons = [BookOpen, Layers, Brain, Users, Hammer, ArrowRight];

const chapterElements = [
  { icon: BookOpen, label: 'Scenario', desc: 'A story you will recognize from your own work' },
  { icon: GitBranch, label: 'Architecture', desc: 'The system drawn so you can build it' },
  { icon: Lightbulb, label: 'Framework', desc: 'A decision tool you can use the same day' },
  { icon: Play, label: 'Simulation', desc: 'Touch the system — watch behavior emerge' },
  { icon: PenLine, label: 'Reflection', desc: 'Turn the idea into your own practice' },
];

const SECTIONS = ['Emergence', 'Inside', 'Why', 'Contents', 'Blueprint', 'Begin'];

export function HomePage() {
  const { progress } = useReadingProgress();
  const resumeChapter = progress ? getChapter(progress.chapterId) : null;
  const shellRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const sections = Array.from(shell.querySelectorAll<HTMLElement>('.snap-section'));
    const revealed = Array.from(shell.querySelectorAll<HTMLElement>('[data-reveal]'));

    const revealObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add('is-visible');
        }
      },
      { root: shell, threshold: 0.2 },
    );
    revealed.forEach((el) => revealObs.observe(el));

    const sectionObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveSection(sections.indexOf(e.target as HTMLElement));
          }
        }
      },
      { root: shell, threshold: 0.55 },
    );
    sections.forEach((el) => sectionObs.observe(el));

    return () => {
      revealObs.disconnect();
      sectionObs.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    shellRef.current
      ?.querySelectorAll('.snap-section')
      [index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const nudgeCarousel = (dir: number) => {
    carouselRef.current?.scrollBy({ left: dir * 400, behavior: 'smooth' });
  };

  return (
    <div ref={shellRef} className="snap-shell texture-paper bg-[var(--color-paper)]">
      {/* Floating glass nav */}
      <nav className="glass-nav">
        <Link to="/" className="px-2 py-1" aria-label="Emergence home">
          <Logo size={26} />
        </Link>
        <button onClick={() => scrollToSection(3)} className="glass-nav-link hidden sm:block">
          Contents
        </button>
        <Link to="/about" className="glass-nav-link hidden sm:block">
          About
        </Link>
        <Link to="/support" className="glass-nav-link hidden sm:block">
          Support
        </Link>
        <Link
          to={progress ? `/chapter/${progress.chapterId}/p/${progress.pageIndex}` : '/chapter/1/p/0'}
          className="ml-1 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-amber-50"
        >
          {progress ? 'Continue' : 'Read'}
        </Link>
      </nav>

      {/* Dot rail */}
      <div className={`dot-rail ${activeSection === 1 || activeSection === 3 ? 'on-light' : ''}`}>
        {SECTIONS.map((label, i) => (
          <button
            key={label}
            className={i === activeSection ? 'active' : ''}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${label}`}
          />
        ))}
      </div>

      {/* ── Panel 1: Hero ── */}
      <section className="snap-section gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-40" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <EmergenceField density={0.6} speed={0.24} linkDist={130} />

        <div className="relative mx-auto w-full max-w-5xl px-6 pt-16">
          {/* Identity badge — answers "what is this?" in one line */}
          <div
            data-reveal
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5"
          >
            <span className="font-mono text-[0.625rem] uppercase tracking-wider text-amber-400/90">Free</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="font-mono text-[0.625rem] uppercase tracking-wider text-white/60">
              Visual Field Guide · Multi-Agent AI · 25 Chapters
            </span>
          </div>
          <h1
            data-reveal
            style={{ '--reveal-delay': '0.08s' } as React.CSSProperties}
            className="font-display max-w-3xl text-[clamp(2.5rem,8vw,5.5rem)] font-medium leading-[1.04] tracking-tight"
          >
            Intelligence is a<br />
            <span className="text-amber-400">relationship,</span> not a thing.
          </h1>
          <p
            data-reveal
            style={{ '--reveal-delay': '0.16s' } as React.CSSProperties}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
          >
            <em>Emergence</em> is a free visual field guide for builders, students, and founders
            learning to conduct many AI agents — not just prompt one. 25 chapters, live
            simulations, practical frameworks.
          </p>

          <div
            data-reveal
            style={{ '--reveal-delay': '0.24s' } as React.CSSProperties}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {progress && resumeChapter ? (
              <Link
                to={`/chapter/${progress.chapterId}/p/${progress.pageIndex}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:scale-[1.03] hover:bg-amber-50"
              >
                <Bookmark size={16} />
                Continue · {getBookPercent(progress.chapterId, progress.pageIndex)}% read
              </Link>
            ) : (
              <Link
                to="/chapter/1/p/0"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:scale-[1.03] hover:bg-amber-50"
              >
                Start Reading
                <ArrowRight size={16} />
              </Link>
            )}
            <button
              onClick={() => scrollToSection(3)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5"
            >
              Browse Contents
            </button>
          </div>

          <dl
            data-reveal
            style={{ '--reveal-delay': '0.32s' } as React.CSSProperties}
            className="mt-12 grid grid-cols-4 gap-4 border-t border-white/10 pt-8"
          >
            {[
              { value: '25', label: 'Chapters' },
              { value: '25', label: 'Simulations' },
              { value: '6', label: 'Parts' },
              { value: 'Free', label: 'Always' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-2xl font-medium text-white md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-mono text-[0.625rem] uppercase tracking-wider text-white/40 md:text-xs">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          {/* Kit teasers */}
          <div
            data-reveal
            style={{ '--reveal-delay': '0.42s' } as React.CSSProperties}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to={KIT_LINKS.experienceKit}
              className="inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/8 px-4 py-2 text-xs font-medium text-amber-300/80 transition hover:border-amber-400/45 hover:text-amber-300"
            >
              <Sparkles size={12} />
              Experience Kit — coming soon
            </Link>
            <Link
              to={KIT_LINKS.exoBotKit}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/8 px-4 py-2 text-xs font-medium text-violet-300/80 transition hover:border-violet-400/45 hover:text-violet-300"
            >
              <Hammer size={12} />
              Exo Bot Kit — coming soon
            </Link>
          </div>
        </div>

        <button
          onClick={() => scrollToSection(1)}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 transition hover:text-white"
          aria-label="Scroll to next section"
        >
          <ChevronDown size={26} className="animate-bob" />
        </button>
      </section>

      {/* ── Panel 2: Inside every chapter ── */}
      <section className="snap-section aurora bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <p data-reveal className="label-caps mb-3 text-center">
            Inside Every Chapter
          </p>
          <h2
            data-reveal
            style={{ '--reveal-delay': '0.06s' } as React.CSSProperties}
            className="font-display mx-auto mb-4 max-w-2xl text-center text-3xl font-medium leading-snug text-[var(--color-ink)] md:text-5xl"
          >
            Five layers, one idea —<br className="hidden md:block" /> like a fractal, it repeats at every scale.
          </h2>
          <p
            data-reveal
            style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}
            className="mx-auto mb-12 max-w-xl text-center text-[var(--color-slate)]"
          >
            Every chapter tells it as a story, draws it as a system, hands you the framework,
            lets you simulate it, then asks what you'll do with it.
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {chapterElements.map((el, i) => {
              const Icon = el.icon;
              return (
                <div
                  key={el.label}
                  data-reveal
                  style={{ '--reveal-delay': `${0.12 + i * 0.07}s` } as React.CSSProperties}
                  className={`group rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-5 text-center transition hover:-translate-y-1 hover:border-[var(--color-accent)]/40 hover:shadow-lg ${
                    i === 4 ? 'col-span-2 md:col-span-1' : ''
                  }`}
                >
                  <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/15 to-violet-500/10 ring-1 ring-[var(--color-border)] transition group-hover:ring-[var(--color-accent)]/40">
                    <Icon size={20} className="text-[var(--color-accent)]" />
                  </span>
                  <p className="font-display text-base font-medium text-[var(--color-ink)]">
                    {el.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--color-muted)]">
                    {el.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Panel 3: Why this book ── */}
      <section className="snap-section gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" />
        <EmergenceField density={0.35} speed={0.16} linkDist={110} />
        <div className="relative mx-auto w-full max-w-5xl px-6 py-20">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p data-reveal className="label-caps mb-4 text-white/40">
                Why This Book
              </p>
              <h2
                data-reveal
                style={{ '--reveal-delay': '0.06s' } as React.CSSProperties}
                className="font-display text-3xl font-medium leading-snug md:text-5xl"
              >
                Everyone teaches you to prompt one AI.
                <span className="text-amber-400"> Nobody teaches you to conduct many.</span>
              </h2>
            </div>
            <div
              data-reveal
              style={{ '--reveal-delay': '0.14s' } as React.CSSProperties}
              className="space-y-5 text-base leading-relaxed text-white/65 md:text-lg"
            >
              <p>
                The next decade belongs to people who can design <em>systems</em> of agents —
                with memory, feedback loops, markets, and hierarchies — and know why those
                systems do things no single model could.
              </p>
              <p>
                This guide gives the next generation that literacy: emergence theory made
                visual, architectures made touchable, and every framework ready to use the
                day you read it.
              </p>
              <blockquote className="border-l-2 border-amber-500/60 pl-5 font-display text-lg italic text-white/75">
                Intelligence emerges from relationships between agents, memory, tools, feedback
                loops, and environments.
              </blockquote>
              <Link
                to="/about"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-400/80 transition hover:text-amber-400"
              >
                <UserCircle size={15} />
                Meet the founder → why I built this
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Panel 4: Contents carousel ── */}
      <section className="snap-section bg-[var(--color-surface)]">
        <div className="w-full py-16">
          <div className="mx-auto mb-8 flex max-w-5xl items-end justify-between px-6">
            <div>
              <p data-reveal className="label-caps mb-2">
                Table of Contents
              </p>
              <h2
                data-reveal
                style={{ '--reveal-delay': '0.06s' } as React.CSSProperties}
                className="font-display text-3xl font-medium text-[var(--color-ink)] md:text-4xl"
              >
                Six parts. Swipe through them.
              </h2>
            </div>
            <div className="hidden gap-2 md:flex">
              <button
                onClick={() => nudgeCarousel(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-slate)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                aria-label="Previous part"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => nudgeCarousel(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-slate)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                aria-label="Next part"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} data-reveal className="part-carousel mx-auto max-w-7xl">
            {parts.map((part) => {
              const Icon = partIcons[part.number - 1];
              const theme = getPartTheme(part.number);
              const partChapters = chapters.filter((c) => c.partNumber === part.number);
              return (
                <article key={part.number} className="part-card card-elevated overflow-hidden">
                  <div className="relative h-28 overflow-hidden text-white">
                    <FlowScene seed={part.number * 101} palette={theme.flow} />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                      <div>
                        <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-wider text-white/60">
                          <Icon size={13} />
                          Part {String(part.number).padStart(2, '0')}
                        </span>
                        <h3 className="font-display mt-0.5 text-lg font-medium">{part.title}</h3>
                      </div>
                      <span className="font-mono text-[0.625rem] text-white/50">
                        {partChapters.length} ch.
                      </span>
                    </div>
                  </div>
                  <ul className="divide-y divide-[var(--color-border-subtle)]">
                    {partChapters.map((ch) => (
                      <li key={ch.id}>
                        <Link
                          to={`/chapter/${ch.id}/p/0`}
                          className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition hover:bg-[var(--color-paper)]"
                        >
                          <span className="min-w-0 truncate">
                            <span className="font-mono text-xs" style={{ color: theme.flow.accent }}>
                              {String(ch.id).padStart(2, '0')}
                            </span>
                            <span className="ml-2 text-[var(--color-ink)]">{ch.title}</span>
                          </span>
                          <ArrowRight size={13} className="shrink-0 text-[var(--color-muted)]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <p className="mt-3 text-center font-mono text-[0.625rem] uppercase tracking-wider text-[var(--color-muted)] md:hidden">
            ← swipe →
          </p>
        </div>
      </section>

      {/* ── Panel 5: Blueprint ── */}
      <section className="snap-section aurora bg-[var(--color-surface)]">
        <div className="mx-auto w-full max-w-3xl px-6 py-20">
          <p data-reveal className="label-caps mb-3 text-center">
            Leave with something
          </p>
          <h2
            data-reveal
            style={{ '--reveal-delay': '0.06s' } as React.CSSProperties}
            className="font-display mx-auto mb-4 max-w-2xl text-center text-3xl font-medium leading-snug text-[var(--color-ink)] md:text-4xl"
          >
            Your Emergence Blueprint
          </h2>
          <p
            data-reveal
            style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}
            className="mx-auto mb-10 max-w-lg text-center text-[var(--color-slate)]"
          >
            Fill this in as you read. When you're done, download a copy — your personal
            playbook for conducting agents, not just prompting them.
          </p>
          <div data-reveal style={{ '--reveal-delay': '0.16s' } as React.CSSProperties}>
            <EmergenceBlueprint />
          </div>
          <div
            data-reveal
            style={{ '--reveal-delay': '0.22s' } as React.CSSProperties}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={KIT_LINKS.experienceKit}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/8 px-5 py-2.5 text-sm font-medium text-amber-700 transition hover:border-amber-500/50 hover:bg-amber-500/12"
            >
              <Sparkles size={14} />
              Experience Kit — go deeper
            </a>
            <a
              href={KIT_LINKS.exoBotKit}
              className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/8 px-5 py-2.5 text-sm font-medium text-violet-700 transition hover:border-violet-500/50 hover:bg-violet-500/12"
            >
              <Hammer size={14} />
              Exo Bot Kit — build your first agent
            </a>
          </div>
        </div>
      </section>

      {/* ── Panel 6: Begin + footer ── */}
      <section className="snap-section gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" />
        <EmergenceField density={0.5} speed={0.22} linkDist={130} />
        <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 text-center">
          <Logo size={56} />
          <h2
            data-reveal
            className="font-display mt-7 text-3xl font-medium leading-snug md:text-5xl"
          >
            Begin with one AI hitting a wall.
            <br />
            End knowing how to build a mind from many.
          </h2>
          <p
            data-reveal
            style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}
            className="mt-5 max-w-md text-white/65"
          >
            Free to read, cover to cover. Built for the generation that will grow up
            alongside agent systems.
          </p>
          <div
            data-reveal
            style={{ '--reveal-delay': '0.18s' } as React.CSSProperties}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/chapter/1/p/0"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:scale-[1.03] hover:bg-amber-50"
            >
              Read Chapter 01
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5"
            >
              <Heart size={15} />
              Support the Guide
            </Link>
          </div>
        </div>

        <footer className="relative border-t border-white/10 px-6 py-6">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-center text-sm text-white/40 md:flex-row md:text-left">
            <p>
              <span className="font-display text-white/70">The Age of Emergent Intelligence</span>
              {' · '}ProjectX
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link to="/about" className="transition hover:text-white/80">
                About
              </Link>
              <Link to="/support" className="transition hover:text-white/80">
                Support
              </Link>
              <a
                href="https://github.com/cismankit/The-Age-of-Emergent-Intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white/80"
              >
                GitHub
              </a>
              <a href={KIT_LINKS.experienceKit} className="transition hover:text-white/80">
                Experience Kit
              </a>
              <a href={KIT_LINKS.exoBotKit} className="transition hover:text-white/80">
                Exo Bot Kit
              </a>
              <span>25 chapters · free forever</span>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
