import type { Chapter } from '../types';

/**
 * Legacy page types — kept for backwards compatibility.
 * The reader now uses sections (buildChapterSections) for the scroll model.
 */
export type PageType =
  | 'title'
  | 'scene-story'
  | 'insight-diagram'
  | 'framework-reflect'
  | 'simulation'
  | 'finale';

export interface ChapterPage {
  type: PageType;
  label: string;
  paragraphs?: string[];
}

/** Section IDs for the scroll-based reader. */
export type SectionId = 'opening' | 'system' | 'framework' | 'lab' | 'finale';

export interface ChapterSection {
  id: SectionId;
  /** Short label for the sticky nav tab */
  navLabel: string;
  /** Longer label for progress / aria */
  label: string;
  sectionIndex: number;
}

/**
 * Build the ordered section list for a chapter.
 *
 * Section → content mapping:
 *   opening  = hero title + scene + narrative story
 *   system   = key insight card + system diagram
 *   framework= practical framework + reflection questions + exercises
 *   lab      = interactive simulation (only if chapter has one)
 *   finale   = closing page (chapter 25 only)
 */
export function buildChapterSections(chapter: Chapter): ChapterSection[] {
  const sections: ChapterSection[] = [
    { id: 'opening', navLabel: 'Story', label: 'Opening & Story', sectionIndex: 0 },
    { id: 'system', navLabel: 'System', label: 'Architecture', sectionIndex: 1 },
    { id: 'framework', navLabel: 'Framework', label: 'Framework & Reflection', sectionIndex: 2 },
  ];

  if (chapter.simulation) {
    sections.push({ id: 'lab', navLabel: 'Lab', label: 'Simulation Lab', sectionIndex: sections.length });
  }

  if (chapter.id === 25) {
    sections.push({ id: 'finale', navLabel: 'Finale', label: 'The End', sectionIndex: sections.length });
  }

  return sections;
}

// ─── Legacy function (still used by bookProgress etc.) ─────────────────────

export function buildChapterPages(chapter: Chapter): ChapterPage[] {
  const narrativeParagraphs = chapter.story.narrative
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const pages: ChapterPage[] = [
    { type: 'title', label: 'Opening' },
    {
      type: 'scene-story',
      label: 'Story',
      paragraphs: narrativeParagraphs,
    },
    { type: 'insight-diagram', label: 'Architecture' },
    { type: 'framework-reflect', label: 'Framework' },
  ];

  if (chapter.simulation) {
    pages.push({ type: 'simulation', label: 'Simulation' });
  }

  if (chapter.id === 25) {
    pages.push({ type: 'finale', label: 'The End' });
  }

  return pages;
}
