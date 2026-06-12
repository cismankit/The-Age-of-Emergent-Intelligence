import type { Chapter } from '../types';

export type PageType =
  | 'title'
  | 'scene'
  | 'story'
  | 'insight'
  | 'diagram'
  | 'framework'
  | 'reflection-questions'
  | 'reflection-prompts'
  | 'simulation'
  | 'finale';

export interface ChapterPage {
  type: PageType;
  label: string;
  paragraphs?: string[];
}

function chunkText(text: string, maxChars = 520): string[] {
  if (text.length <= maxChars) return [text];

  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) ?? [text];
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (current.length + trimmed.length + 1 > maxChars && current.length > 0) {
      chunks.push(current.trim());
      current = trimmed;
    } else {
      current = current ? `${current} ${trimmed}` : trimmed;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function chunkParagraphs(paragraphs: string[], maxChars = 520): string[] {
  return paragraphs.flatMap((para) => chunkText(para, maxChars));
}

export function buildChapterPages(chapter: Chapter): ChapterPage[] {
  const pages: ChapterPage[] = [
    { type: 'title', label: 'Opening' },
    { type: 'scene', label: 'Scene' },
  ];

  const storyTexts = chunkParagraphs(
    chapter.story.narrative.split('\n\n').filter(Boolean),
  );

  storyTexts.forEach((text, i) => {
    pages.push({
      type: 'story',
      label: storyTexts.length > 1 ? `Story ${i + 1}` : 'Story',
      paragraphs: [text],
    });
  });

  pages.push(
    { type: 'insight', label: 'Insight' },
    { type: 'diagram', label: 'Architecture' },
    { type: 'framework', label: 'Framework' },
    { type: 'reflection-questions', label: 'Reflect' },
  );

  if (chapter.reflection.prompts.length > 0) {
    pages.push({ type: 'reflection-prompts', label: 'Exercises' });
  }

  if (chapter.simulation) {
    pages.push({ type: 'simulation', label: 'Simulation' });
  }

  if (chapter.id === 25) {
    pages.push({ type: 'finale', label: 'The End' });
  }

  return pages;
}
