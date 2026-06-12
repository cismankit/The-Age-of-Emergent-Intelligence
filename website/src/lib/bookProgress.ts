import { chapters } from '../data/chapters';
import { buildChapterPages } from './buildChapterPages';

// Computed once at module load — chapter data is static.
const pageCounts = chapters.map((chapter) => buildChapterPages(chapter).length);

const chapterOffsets: number[] = [];
let runningTotal = 0;
for (const count of pageCounts) {
  chapterOffsets.push(runningTotal);
  runningTotal += count;
}

export const TOTAL_BOOK_PAGES = runningTotal;

/** 1-based page number within the whole book. */
export function getGlobalPageNumber(chapterId: number, pageIndex: number): number {
  return (chapterOffsets[chapterId - 1] ?? 0) + pageIndex + 1;
}

/** 0–100 percentage through the whole book. */
export function getBookPercent(chapterId: number, pageIndex: number): number {
  return Math.round((getGlobalPageNumber(chapterId, pageIndex) / TOTAL_BOOK_PAGES) * 100);
}
