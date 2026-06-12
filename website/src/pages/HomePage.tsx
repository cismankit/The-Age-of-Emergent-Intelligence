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
} from 'lucide-react';
import { chapters, getChapter } from '../data/chapters';
import { parts } from '../data/parts';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { getBookPercent } from '../lib/bookProgress';

const partIcons = [BookOpen, Layers, Brain, Users, Hammer, ArrowRight];

const chapterElements = [
  { icon: BookOpen, label: 'Scenario', desc: 'Narrative case study' },
  { icon: GitBranch, label: 'Architecture', desc: 'System diagram' },
  { icon: Lightbulb, label: 'Framework', desc: 'Actionable tool' },
  { icon: Play, label: 'Simulation', desc: 'Interactive model' },
  { icon: PenLine, label: 'Reflection', desc: 'Reader exercises' },
];

export function HomePage() {
  const { progress } = useReadingProgress();
  const resumeChapter = progress ? getChapter(progress.chapterId) : null;

  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden px-6 pb-24 pt-16 text-white md:pb-32 md:pt-24">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-50" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="animate-fade-up">
            <p className="label-caps mb-6 text-white/40">Vol. I · Illustrated Field Guide</p>
            <h1 className="font-display max-w-3xl text-5xl font-medium leading-[1.08] tracking-tight md:text-7xl">
              Emergence
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              How multi-agent AI systems learn, adapt, and create intelligence beyond their
              design — a visual guide to systems that think together.
            </p>
          </div>

          <blockquote className="animate-fade-up mt-10 max-w-2xl border-l-2 border-amber-500/50 pl-6 font-display text-lg italic leading-relaxed text-white/60 md:text-xl" style={{ animationDelay: '0.1s' }}>
            Intelligence is not something an individual possesses. It is a behavior that emerges
            from relationships between agents, memory, tools, feedback loops, and environments.
          </blockquote>

          <div className="animate-fade-up mt-12 flex flex-wrap items-center gap-4" style={{ animationDelay: '0.2s' }}>
            {progress && resumeChapter ? (
              <Link
                to={`/chapter/${progress.chapterId}/p/${progress.pageIndex}`}
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-amber-50"
              >
                <Bookmark size={16} />
                Continue Ch. {String(progress.chapterId).padStart(2, '0')} ·{' '}
                {getBookPercent(progress.chapterId, progress.pageIndex)}% read
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                to="/chapter/1/p/0"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-amber-50"
              >
                Start Reading
                <ArrowRight size={16} />
              </Link>
            )}
            <a
              href="#parts"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5"
            >
              Browse Contents
            </a>
          </div>

          <p className="animate-fade-up mt-6 font-mono text-xs text-white/35" style={{ animationDelay: '0.25s' }}>
            Tap edges or swipe to turn pages · ← → on keyboard
          </p>

          <dl className="animate-fade-up mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-4" style={{ animationDelay: '0.3s' }}>
            {[
              { value: '25', label: 'Chapters' },
              { value: '6', label: 'Parts' },
              { value: '12', label: 'Simulations' },
              { value: '25', label: 'Frameworks' },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-3xl font-medium text-white md:text-4xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-mono text-xs uppercase tracking-wider text-white/40">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What each chapter contains */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="label-caps mb-3 text-center">Inside Every Chapter</p>
          <h2 className="font-display mb-12 text-center text-3xl font-medium text-[var(--color-ink)]">
            Five layers of understanding
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {chapterElements.map((el) => {
              const Icon = el.icon;
              return (
                <div
                  key={el.label}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-5 text-center transition hover:border-[var(--color-accent)]/30 hover:shadow-sm"
                >
                  <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                    <Icon size={18} className="text-[var(--color-accent)]" />
                  </span>
                  <p className="font-medium text-[var(--color-ink)]">{el.label}</p>
                  <p className="mt-1 text-xs text-[var(--color-muted)]">{el.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Positioning */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <p className="label-caps mb-4">The Gap</p>
            <h2 className="font-display text-3xl font-medium leading-snug text-[var(--color-ink)]">
              Most AI books explain tools. This one explains systems.
            </h2>
          </div>
          <div className="space-y-6 text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
            <p>
              Prompt engineering guides teach you to talk to one model. Tool tutorials show you
              how to wire APIs. Neither explains <em>why</em> intelligence emerges when agents
              coordinate — or how to design for it.
            </p>
            <p>
              This field guide maps the territory: emergence theory, agent architectures,
              multi-agent ecosystems, and the human systems that make them work. Each chapter
              pairs narrative with architecture diagrams, practical frameworks, and live
              simulations you can manipulate.
            </p>
          </div>
        </div>
      </section>

      {/* Parts */}
      <section id="parts" className="border-t border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="label-caps mb-3">Table of Contents</p>
            <h2 className="font-display text-3xl font-medium text-[var(--color-ink)] md:text-4xl">
              Six parts, twenty-five chapters
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {parts.map((part) => {
              const Icon = partIcons[part.number - 1];
              const partChapters = chapters.filter((c) => c.partNumber === part.number);
              return (
                <article
                  key={part.number}
                  className="card-elevated group overflow-hidden transition hover:shadow-[0_2px_4px_rgba(12,15,20,0.06),0_12px_32px_rgba(12,15,20,0.1)]"
                >
                  <div className={`${part.gradient} relative px-5 py-5 text-white`}>
                    <div className="pointer-events-none absolute inset-0 grid-dots opacity-20" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Icon size={18} className="text-white/70" />
                        <span className="font-mono text-xs uppercase tracking-wider text-white/50">
                          Part {String(part.number).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-white/40">
                        {partChapters.length} ch.
                      </span>
                    </div>
                    <h3 className="relative mt-2 font-display text-xl font-medium">
                      {part.title}
                    </h3>
                  </div>
                  <ul className="divide-y divide-[var(--color-border-subtle)]">
                    {partChapters.map((ch) => (
                      <li key={ch.id}>
                        <Link
                          to={`/chapter/${ch.id}`}
                          className="flex items-center justify-between gap-3 px-5 py-3.5 text-sm transition hover:bg-[var(--color-paper)]"
                        >
                          <span className="min-w-0">
                            <span className="font-mono text-xs text-[var(--color-muted)]">
                              {String(ch.id).padStart(2, '0')}
                            </span>
                            <span className="ml-2 text-[var(--color-ink)]">{ch.title}</span>
                          </span>
                          <ArrowRight
                            size={14}
                            className="shrink-0 text-[var(--color-muted)] opacity-0 transition group-hover:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="label-caps mb-4">Begin</p>
          <h2 className="font-display text-3xl font-medium text-[var(--color-ink)]">
            Start with the limits of solitary intelligence
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-slate)]">
            Chapter 1 introduces the specialization test — the first framework for knowing when
            one AI is enough, and when you need a system.
          </p>
          <Link
            to="/chapter/1/p/0"
            className="mt-8 inline-flex items-center gap-2 rounded-md border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-ink)]/90"
          >
            Read Chapter 01
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
