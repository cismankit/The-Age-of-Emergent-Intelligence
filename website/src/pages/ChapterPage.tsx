import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, Printer } from 'lucide-react';
import { getChapter, chapters } from '../data/chapters';
import { parts } from '../data/parts';
import { SystemDiagram } from '../components/SystemDiagram';
import { SceneImage } from '../components/SceneImage';
import { ReflectionPanel } from '../components/ReflectionPanel';
import { FrameworkCard } from '../components/FrameworkCard';
import { SimulationPanel } from '../components/SimulationPanel';
import { ChapterNav } from '../components/ChapterNav';

export function ChapterPage() {
  const { id } = useParams();
  const chapterId = Number(id);
  const chapter = getChapter(chapterId);

  if (!chapter) return <Navigate to="/" replace />;

  const part = parts.find((p) => p.number === chapter.partNumber);
  const prev = chapterId > 1 ? chapterId - 1 : null;
  const next = chapterId < 25 ? chapterId + 1 : null;
  const progress = Math.round((chapterId / 25) * 100);

  return (
    <div>
      <div className="sticky top-[65px] z-40 h-1 bg-slate-200">
        <div
          className="h-full bg-[var(--color-accent)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className={`${part?.gradient ?? 'gradient-hero'} px-6 py-12 text-white`}>
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="mb-4 inline-flex items-center gap-1 text-sm text-white/70 hover:text-white">
            <ChevronLeft size={16} /> All Chapters
          </Link>
          <p className="text-sm font-medium uppercase tracking-wider text-white/70">
            Part {chapter.partNumber} — {chapter.part}
          </p>
          <p className="mt-1 font-mono text-sm text-white/60">
            Chapter {chapter.id} of 25 · {progress}% complete
          </p>
          <h1 className="font-display mt-2 text-3xl md:text-4xl">{chapter.title}</h1>
          <p className="mt-2 text-lg text-white/80">{chapter.subtitle}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 xl:grid-cols-[1fr_260px]">
        <article className="min-w-0">
          <section className="mb-16">
            <h2 className="mb-6 font-display text-2xl text-[var(--color-ink)]">
              {chapter.story.title}
            </h2>
            <SceneImage
              chapterId={chapter.id}
              title={chapter.story.title}
              caption={chapter.story.sceneDescription}
            />
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-[var(--color-ink)]">
              {chapter.story.narrative.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <div className="mb-16 flex gap-4 rounded-xl border border-amber-200 bg-amber-50 p-6">
            <Lightbulb className="mt-1 shrink-0 text-amber-600" size={24} />
            <div>
              <h3 className="mb-1 font-semibold text-amber-900">Key Insight</h3>
              <p className="text-amber-800">{chapter.keyInsight}</p>
            </div>
          </div>

          <section className="mb-16">
            <SystemDiagram
              nodes={chapter.systemDiagram.nodes}
              edges={chapter.systemDiagram.edges}
            />
          </section>

          <section className="mb-16">
            <FrameworkCard
              name={chapter.framework.name}
              steps={chapter.framework.steps}
              application={chapter.framework.application}
            />
          </section>

          <section className="mb-16">
            <ReflectionPanel
              questions={chapter.reflection.questions}
              prompts={chapter.reflection.prompts}
            />
          </section>

          {chapter.simulation && (
            <section className="mb-16">
              <SimulationPanel
                type={chapter.simulation.type}
                description={chapter.simulation.description}
              />
            </section>
          )}

          <nav className="flex items-center justify-between border-t border-[var(--color-border)] pt-8 print:hidden">
            {prev ? (
              <Link
                to={`/chapter/${prev}`}
                className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                <ChevronLeft size={16} />
                Ch. {prev}: {chapters[prev - 1].title}
              </Link>
            ) : (
              <span />
            )}
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-slate)] hover:bg-slate-50"
            >
              <Printer size={14} /> Print chapter
            </button>
            {next ? (
              <Link
                to={`/chapter/${next}`}
                className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Ch. {next}: {chapters[next - 1].title}
                <ChevronRight size={16} />
              </Link>
            ) : (
              <Link
                to="/"
                className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
              >
                Back to Start <ChevronRight size={16} />
              </Link>
            )}
          </nav>
        </article>

        <aside className="print:hidden">
          <ChapterNav />
        </aside>
      </div>
    </div>
  );
}
