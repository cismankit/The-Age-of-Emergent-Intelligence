import { Link } from 'react-router-dom';
import { Quote, Heart } from 'lucide-react';
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
}

export function PageView({ chapter, page }: Props) {
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

    case 'scene':
      return (
        <div className="reader-page flex h-full min-h-0 flex-col">
          <p className="label-caps mb-1.5" style={{ color: theme.flow.accent }}>
            Scene
          </p>
          <h2 className="font-display mb-4 text-2xl font-medium leading-snug text-[var(--color-ink)] md:text-3xl">
            {chapter.story.title}
          </h2>
          <div className="min-h-0 flex-1">
            <ScenePlaceholder
              description={chapter.story.sceneDescription}
              chapterId={chapter.id}
              partNumber={chapter.partNumber}
              compact
              fill
            />
          </div>
        </div>
      );

    case 'story':
      return (
        <div className="reader-page">
          <p className="label-caps mb-4">Scenario</p>
          <div className="prose-narrative">
            {page.paragraphs?.map((para, i) => (
              <p key={i} className={page.label === 'Story' && i === 0 ? 'first-para' : ''}>
                {para}
              </p>
            ))}
          </div>
        </div>
      );

    case 'insight':
      return (
        <div className="reader-page flex flex-col justify-center">
          <div
            className="relative flex min-h-[60%] flex-col justify-center overflow-hidden rounded-2xl p-8 text-white md:p-12"
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
              <Quote size={26} className="mb-4 text-white/30" />
              <p className="label-caps mb-4" style={{ color: theme.flow.accentSoft }}>
                Key Insight
              </p>
              <blockquote className="font-display text-2xl font-medium leading-snug md:text-3xl">
                {chapter.keyInsight}
              </blockquote>
            </div>
            <div className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-white/20" />
            <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/20" />
          </div>
        </div>
      );

    case 'diagram':
      return (
        <div className="reader-page">
          <p className="label-caps mb-4">System Architecture</p>
          <SystemDiagram
            nodes={chapter.systemDiagram.nodes}
            edges={chapter.systemDiagram.edges}
            compact
          />
        </div>
      );

    case 'framework':
      return (
        <div className="reader-page">
          <p className="label-caps mb-4">Practical Framework</p>
          <FrameworkCard
            name={chapter.framework.name}
            steps={chapter.framework.steps}
            application={chapter.framework.application}
            compact
          />
        </div>
      );

    case 'reflection-questions':
      return (
        <div className="reader-page flex flex-col justify-center">
          <p className="label-caps mb-2" style={{ color: theme.flow.accent }}>
            Consider
          </p>
          <h2 className="font-display mb-6 text-xl font-medium text-[var(--color-ink)]">
            Sit with these before turning the page
          </h2>
          <ReflectionQuestions questions={chapter.reflection.questions} accent={theme.flow.accent} />
        </div>
      );

    case 'reflection-prompts':
      return (
        <div className="reader-page flex flex-col justify-center">
          <p className="label-caps mb-2" style={{ color: theme.flow.accent }}>
            Your Turn
          </p>
          <h2 className="font-display mb-6 text-xl font-medium text-[var(--color-ink)]">
            Notes save automatically on this device
          </h2>
          <ReflectionPrompts prompts={chapter.reflection.prompts} chapterId={chapter.id} />
        </div>
      );

    case 'simulation':
      return chapter.simulation ? (
        <div className="reader-page">
          <SimulationPanel
            type={chapter.simulation.type}
            description={chapter.simulation.description}
          />
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
