import { Link } from 'react-router-dom';
import { BookOpen, Layers, Brain, Users, Hammer, ArrowRight, ExternalLink } from 'lucide-react';
import { chapters } from '../data/chapters';
import { parts } from '../data/parts';

const BASE = import.meta.env.BASE_URL;
const partIcons = [BookOpen, Layers, Brain, Users, Hammer, ArrowRight];

export function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <img
          src={`${BASE}covers/hero.png`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1419]/85 via-[#0f1419]/70 to-[#0f1419]/95" />
        <div className="relative px-6 py-20 text-white md:py-32">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
            <img
              src={`${BASE}covers/cover.png`}
              alt="Emergence book cover"
              className="w-48 shrink-0 rounded-lg shadow-2xl ring-2 ring-white/20 md:w-56"
            />
            <div className="text-center md:text-left">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-200">
                The Illustrated Field Guide
              </p>
              <h1 className="font-display mb-3 text-4xl leading-tight md:text-5xl lg:text-6xl">
                Emergence
              </h1>
              <p className="mb-4 text-lg text-blue-100 md:text-xl">
                How Multi-Agent AI Systems Learn, Adapt, and Create Intelligence Beyond Their Design
              </p>
              <p className="max-w-xl text-base italic text-blue-200/80">
                Intelligence is not something an individual possesses. It is a behavior that
                emerges from relationships between agents, memory, tools, feedback loops, and
                environments.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                <Link
                  to="/chapter/1"
                  className="rounded-lg bg-white px-6 py-3 font-medium text-[var(--color-ink)] shadow-lg transition hover:bg-blue-50"
                >
                  Start Reading →
                </Link>
                <a
                  href="#parts"
                  className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Explore Chapters
                </a>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200 md:justify-start">
                <span>25 Chapters</span>
                <span>25 Cinematic Scenes</span>
                <span>8 Simulations</span>
                <span>QR-Linked Demos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      <section className="border-y border-[var(--color-border)] bg-white px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-8 text-center text-2xl">Featured Scenes</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {[1, 2, 3, 14, 25].map((id) => (
              <Link
                key={id}
                to={`/chapter/${id}`}
                className="group overflow-hidden rounded-lg border border-[var(--color-border)]"
              >
                <img
                  src={`${BASE}scenes/chapter-${String(id).padStart(2, '0')}.png`}
                  alt={chapters[id - 1].title}
                  className="aspect-video w-full object-cover transition group-hover:scale-105"
                />
                <p className="truncate p-2 text-xs font-medium">{chapters[id - 1].title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="parts" className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display mb-10 text-center text-3xl">Six Parts, Twenty-Five Chapters</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {parts.map((part) => {
              const Icon = partIcons[part.number - 1];
              const partChapters = chapters.filter((c) => c.partNumber === part.number);
              const thumb = partChapters[0];
              return (
                <div
                  key={part.number}
                  className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm"
                >
                  <div className={`${part.gradient} relative px-5 py-4 text-white`}>
                    <img
                      src={`${BASE}scenes/chapter-${String(thumb.id).padStart(2, '0')}.png`}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-30"
                    />
                    <div className="relative">
                      <div className="flex items-center gap-2">
                        <Icon size={20} />
                        <span className="text-sm font-medium opacity-80">Part {part.number}</span>
                      </div>
                      <h3 className="font-display mt-1 text-xl">{part.title}</h3>
                    </div>
                  </div>
                  <ul className="divide-y divide-[var(--color-border)]">
                    {partChapters.map((ch) => (
                      <li key={ch.id}>
                        <Link
                          to={`/chapter/${ch.id}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-blue-50"
                        >
                          <img
                            src={`${BASE}scenes/chapter-${String(ch.id).padStart(2, '0')}.png`}
                            alt=""
                            className="h-10 w-14 shrink-0 rounded object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="font-mono text-xs text-[var(--color-slate)]">
                              {ch.id}.
                            </span>{' '}
                            {ch.title}
                          </span>
                          <ArrowRight size={14} className="shrink-0 text-[var(--color-slate)]" />
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

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-display mb-8 text-center text-3xl">Publication Formats</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              tier: 'Tier 1',
              name: 'PDF',
              desc: 'Print any chapter via the Print button',
              href: '/chapter/1',
            },
            {
              tier: 'Tier 2',
              name: 'Interactive Website',
              desc: 'Full experience with scenes & simulations',
              active: true,
            },
            {
              tier: 'Tier 3',
              name: 'QR Demos',
              desc: 'Scan codes on every chapter & simulation',
              active: true,
            },
            {
              tier: 'Tier 4',
              name: 'Field Guide',
              desc: 'Frameworks & exercises per chapter',
              active: true,
            },
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
                  Live
                </span>
              )}
              {t.href && (
                <Link
                  to={t.href}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--color-accent)] hover:underline"
                >
                  Open <ExternalLink size={12} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
