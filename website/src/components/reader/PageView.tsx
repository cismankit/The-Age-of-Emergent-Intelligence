import { Link } from 'react-router-dom';
import { Quote, Heart, CheckCircle2 } from 'lucide-react';
import { EmergenceField } from '../visual/EmergenceField';
import { ConceptScene } from '../visual/ConceptScene';
import { getPartTheme } from '../../lib/partThemes';
import { getChapterMotif } from '../../lib/chapterMotifs';
import type { Chapter } from '../../types';
import type { ChapterPage } from '../../lib/buildChapterPages';
import { parts } from '../../data/parts';
import { ScenePlaceholder } from '../ScenePlaceholder';
import { SystemDiagram } from '../SystemDiagram';
import { FrameworkCard } from '../FrameworkCard';
import { ReflectionQuestions } from '../ReflectionQuestions';
import { ReflectionPrompts } from '../ReflectionPrompts';
import { SimulationPanel } from '../SimulationPanel';

interface Props {
  chapter: Chapter;
  page: ChapterPage;
  isLastPage?: boolean;
}

function ChapterCompleteChip({ chapterId, theme }: { chapterId: number; theme: ReturnType<typeof getPartTheme> }) {
  const nextId = chapterId + 1;
  return (
    <div
      className="mt-6 flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3"
      role="status"
      aria-label={`Chapter ${chapterId} complete`}
    >
      <CheckCircle2 size={18} style={{ color: theme.flow.accent }} className="shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-ink)]">
          Chapter {String(chapterId).padStart(2, '0')} complete
        </p>
        <p className="text-xs text-[var(--color-muted)]">
          Swipe or press → to start Chapter {String(nextId).padStart(2, '0')}
        </p>
      </div>
    </div>
  );
}

export function PageView({ chapter, page, isLastPage = false }: Props) {
  const part = parts.find((p) => p.number === chapter.partNumber);
  const theme = getPartTheme(chapter.partNumber);

  switch (page.type) {
    case 'title':
      return (
        <div className={`reader-page relative overflow-hidden ${part?.gradient ?? 'gradient-hero'} flex flex-col justify-end text-white`}>
          <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" />
          <EmergenceField
            density={0.45}
            speed={0.18}
            linkDist={110}
            colors={theme.fieldColors}
            linkRgb={theme.linkRgb}
          />
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-wider text-white/50">
              Part {String(chapter.partNumber).padStart(2, '0')} · {chapter.part}
            </p>
            <p className="mt-2 font-mono text-xs text-white/40">
              Chapter {String(chapter.id).padStart(2, '0')} of 25
            </p>
            <h1 className="font-display mt-4 text-3xl font-medium leading-tight md:text-4xl">
              {chapter.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-white/70 md:text-lg">
              {chapter.subtitle}
            </p>
          </div>
        </div>
      );

    case 'scene-story':
      return (
        <div className="reader-page">
          {/* Scene */}
          <p className="label-caps mb-1.5" style={{ color: theme.flow.accent }}>
            Scene
          </p>
          <h2 className="font-display mb-3 text-2xl font-medium leading-snug text-[var(--color-ink)] md:text-3xl">
            {chapter.story.title}
          </h2>
          <div className="mb-6 h-44 overflow-hidden rounded-xl">
            <ScenePlaceholder
              description={chapter.story.sceneDescription}
              chapterId={chapter.id}
              partNumber={chapter.partNumber}
              compact
              fill
            />
          </div>

          {/* Narrative */}
          <p className="label-caps mb-4">Scenario</p>
          <div className="prose-narrative">
            {page.paragraphs?.map((para, i) => (
              <p key={i} className={i === 0 ? 'first-para' : ''}>
                {para}
              </p>
            ))}
          </div>
        </div>
      );

    case 'insight-diagram':
      return (
        <div className="reader-page">
          {/* Key Insight */}
          <div
            className="relative mb-6 overflow-hidden rounded-2xl p-6 text-white md:p-8"
            style={{ background: theme.flow.from }}
          >
            <ConceptScene
              motif={getChapterMotif(chapter.id).motif}
              seed={chapter.id * 31 + 7}
              palette={theme.flow}
              className="opacity-70"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/45 via-black/20 to-transparent" />
            <div className="relative">
              <Quote size={22} className="mb-3 text-white/30" />
              <p className="label-caps mb-3" style={{ color: theme.flow.accentSoft }}>
                Key Insight
              </p>
              <blockquote className="font-display text-xl font-medium leading-snug md:text-2xl">
                {chapter.keyInsight}
              </blockquote>
            </div>
            <div className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-white/20" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/20" />
          </div>

          {/* System Diagram */}
          <p className="label-caps mb-4">System Architecture</p>
          <SystemDiagram
            nodes={chapter.systemDiagram.nodes}
            edges={chapter.systemDiagram.edges}
            compact
          />
        </div>
      );

    case 'framework-reflect':
      return (
        <div className="reader-page">
          {/* Framework */}
          <p className="label-caps mb-4">Practical Framework</p>
          <FrameworkCard
            name={chapter.framework.name}
            steps={chapter.framework.steps}
            application={chapter.framework.application}
            compact
          />

          {/* Reflection Questions */}
          <div className="mt-6">
            <p className="label-caps mb-2" style={{ color: theme.flow.accent }}>
              Consider
            </p>
            <p className="font-display mb-4 text-base font-medium text-[var(--color-ink)]">
              Sit with these — jot a note, it saves automatically
            </p>
            <ReflectionQuestions
              questions={chapter.reflection.questions}
              accent={theme.flow.accent}
              chapterId={chapter.id}
            />
          </div>

          {/* Exercises */}
          {chapter.reflection.prompts.length > 0 && (
            <div className="mt-6">
              <p className="label-caps mb-2" style={{ color: theme.flow.accent }}>
                Your Turn
              </p>
              <ReflectionPrompts prompts={chapter.reflection.prompts} chapterId={chapter.id} />
            </div>
          )}

          {isLastPage && chapter.id < 25 && (
            <ChapterCompleteChip chapterId={chapter.id} theme={theme} />
          )}
        </div>
      );

    case 'simulation':
      return chapter.simulation ? (
        <div className="reader-page">
          <SimulationPanel
            type={chapter.simulation.type}
            description={chapter.simulation.description}
          />
          {isLastPage && chapter.id < 25 && (
            <ChapterCompleteChip chapterId={chapter.id} theme={theme} />
          )}
        </div>
      ) : null;

    case 'finale':
      return (
        <div className="reader-page gradient-hero relative flex flex-col items-center justify-center overflow-hidden text-center text-white">
          <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" />
          <EmergenceField density={0.7} speed={0.3} linkDist={140} />
          <div className="relative">
            <p className="label-caps mb-4 text-white/40">You finished the field guide</p>
            <h1 className="font-display text-3xl font-medium leading-tight md:text-4xl">
              Intelligence emerges.
              <br />
              Now go build a system that proves it.
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/65">
              All 25 chapters, 6 parts, every framework. If this guide changed how you think,
              help keep it free for the next generation of builders.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/support"
                className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-[var(--color-ink)] transition hover:bg-amber-50"
              >
                <Heart size={15} />
                Support the Guide
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5"
              >
                Back to Contents
              </Link>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
