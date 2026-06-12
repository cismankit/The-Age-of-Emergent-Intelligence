import { Link } from 'react-router-dom';
import { Quote, Heart } from 'lucide-react';
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

  switch (page.type) {
    case 'title':
      return (
        <div className={`reader-page relative ${part?.gradient ?? 'gradient-hero'} flex flex-col justify-end text-white`}>
          <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" />
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
        <div className="reader-page">
          <p className="label-caps mb-3">{chapter.story.title}</p>
          <ScenePlaceholder
            description={chapter.story.sceneDescription}
            chapterId={chapter.id}
            compact
          />
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
          <Quote size={24} className="mb-4 text-[var(--color-accent)]/40" />
          <p className="label-caps mb-4 text-[var(--color-accent)]">Key Insight</p>
          <blockquote className="font-display text-2xl font-medium leading-snug text-[var(--color-ink)] md:text-3xl">
            {chapter.keyInsight}
          </blockquote>
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
        <div className="reader-page">
          <p className="label-caps mb-4">Consider</p>
          <ReflectionQuestions questions={chapter.reflection.questions} />
        </div>
      );

    case 'reflection-prompts':
      return (
        <div className="reader-page">
          <p className="label-caps mb-4">Your Turn</p>
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
        <div className="reader-page gradient-hero relative flex flex-col items-center justify-center text-center text-white">
          <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" />
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
