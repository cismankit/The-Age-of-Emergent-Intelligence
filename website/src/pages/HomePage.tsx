import { Link } from 'react-router-dom';
import { BookOpen, Layers, Brain, Users, Hammer, ArrowRight } from 'lucide-react';
import { chapters } from '../data/chapters';
import { parts } from '../data/parts';

const partIcons = [BookOpen, Layers, Brain, Users, Hammer, ArrowRight];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="gradient-hero px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-200">
            A Visual Interactive Field Guide
          </p>
          <h1 className="font-display mb-4 text-4xl leading-tight md:text-6xl">
            Emergence
          </h1>
          <p className="mb-2 text-xl text-blue-100 md:text-2xl">
            How Multi-Agent AI Systems Learn, Adapt, and Create Intelligence Beyond Their Design
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-lg italic text-blue-200/80">
            "Intelligence is not something an individual possesses. It is a behavior that emerges
            from relationships between agents, memory, tools, feedback loops, and environments."
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/chapter/1"
              className="rounded-lg bg-white px-6 py-3 font-medium text-[var(--color-ink)] transition hover:bg-blue-50"
            >
              Start Reading →
            </Link>
            <a
              href="#parts"
              className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Explore Structure
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-blue-200">
            <span>25 Chapters</span>
            <span>·</span>
            <span>6 Parts</span>
            <span>·</span>
            <span>Interactive Simulations</span>
            <span>·</span>
            <span>Reader Exercises</span>
          </div>
        </div>
      </section>

      {/* What makes this different */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-display mb-8 text-center text-3xl">Not Another AI Trends Book</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
            <h3 className="mb-3 font-semibold text-red-900">Most AI books explain</h3>
            <ul className="space-y-2 text-sm text-red-800">
              <li>• LLMs and prompting</li>
              <li>• Single-agent workflows</li>
              <li>• Tool tutorials</li>
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
            <h3 className="mb-3 font-semibold text-emerald-900">This book explains</h3>
            <ul className="space-y-2 text-sm text-emerald-800">
              <li>• Why intelligence emerges</li>
              <li>• How agents coordinate</li>
              <li>• How systems evolve</li>
              <li>• How to build agent ecosystems</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Parts */}
      <section id="parts" className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-10 text-center text-3xl">Six Parts, Twenty-Five Chapters</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {parts.map((part) => {
              const Icon = partIcons[part.number - 1];
              const partChapters = chapters.filter((c) => c.partNumber === part.number);
              return (
                <div key={part.number} className="rounded-xl border border-[var(--color-border)] overflow-hidden">
                  <div className={`${part.gradient} px-5 py-4 text-white`}>
                    <div className="flex items-center gap-2">
                      <Icon size={20} />
                      <span className="text-sm font-medium opacity-80">Part {part.number}</span>
                    </div>
                    <h3 className="font-display mt-1 text-xl">{part.title}</h3>
                  </div>
                  <ul className="divide-y divide-[var(--color-border)]">
                    {partChapters.map((ch) => (
                      <li key={ch.id}>
                        <Link
                          to={`/chapter/${ch.id}`}
                          className="flex items-center justify-between px-5 py-3 text-sm transition hover:bg-blue-50"
                        >
                          <span>
                            <span className="font-mono text-xs text-[var(--color-slate)]">
                              {ch.id}.
                            </span>{' '}
                            {ch.title}
                          </span>
                          <ArrowRight size={14} className="text-[var(--color-slate)]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Format tiers */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-display mb-8 text-center text-3xl">Publication Tiers</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { tier: 'Tier 1', name: 'PDF', desc: '50–80 pages, print-ready' },
            { tier: 'Tier 2', name: 'Interactive Website', desc: 'This experience — live now', active: true },
            { tier: 'Tier 3', name: 'YouTube Companion', desc: '25 chapter videos' },
            { tier: 'Tier 4', name: 'Audiobook', desc: 'Narrated with visual refs' },
          ].map((t) => (
            <div
              key={t.tier}
              className={`rounded-xl border p-5 text-center ${
                t.active ? 'border-[var(--color-accent)] bg-blue-50' : 'border-[var(--color-border)]'
              }`}
            >
              <p className="text-xs font-medium uppercase text-[var(--color-slate)]">{t.tier}</p>
              <h3 className="mt-1 font-semibold">{t.name}</h3>
              <p className="mt-2 text-sm text-[var(--color-slate)]">{t.desc}</p>
              {t.active && (
                <span className="mt-3 inline-block rounded-full bg-[var(--color-accent)] px-3 py-0.5 text-xs text-white">
                  You are here
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
