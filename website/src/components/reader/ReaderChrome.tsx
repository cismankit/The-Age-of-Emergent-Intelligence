import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, List, Home, Heart } from 'lucide-react';

interface Props {
  chapterId: number;
  chapterTitle: string;
  activeSectionIndex: number;
  totalSections: number;
  sectionLabel: string;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onOpenContents: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ReaderChrome({
  chapterId,
  chapterTitle,
  activeSectionIndex,
  totalSections,
  sectionLabel,
  canGoPrev,
  canGoNext,
  onPrevChapter,
  onNextChapter,
  onOpenContents,
}: Props) {
  // Chapter progress: how far through the 25 chapters are we (rough %)
  const chapterPercent = Math.round(((chapterId - 1) / 25) * 100);

  return (
    <>
      {/* Top bar */}
      <header className="reader-top">
        <div
          className="reader-top-progress"
          style={{ width: `${chapterPercent + (activeSectionIndex / Math.max(1, totalSections - 1)) * (100 / 25)}%` }}
        />
        <div className="reader-top-inner">
          <Link to="/" className="reader-top-btn" aria-label="Home">
            <Home size={18} />
          </Link>
          <button onClick={onOpenContents} className="reader-top-center" type="button">
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--part-accent, var(--color-muted))' }}
            >
              Ch. {String(chapterId).padStart(2, '0')}
            </span>
            <span className="truncate text-sm font-medium text-[var(--color-ink)]">
              {chapterTitle}
            </span>
          </button>
          <Link to="/support" className="reader-top-btn" aria-label="Support the guide">
            <Heart size={17} />
          </Link>
          <button onClick={onOpenContents} className="reader-top-btn" aria-label="Contents">
            <List size={18} />
          </button>
        </div>
      </header>

      {/* Bottom bar — chapter navigation only */}
      <footer className="reader-bottom">
        <button
          onClick={onPrevChapter}
          disabled={!canGoPrev}
          className="reader-nav-btn"
          aria-label="Previous chapter"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline text-xs">Ch. {String(chapterId - 1).padStart(2, '0')}</span>
        </button>

        {/* Section progress dots */}
        <div
          className="reader-section-dots"
          role="status"
          aria-label={`${sectionLabel} — section ${activeSectionIndex + 1} of ${totalSections}`}
        >
          <span className="font-mono text-xs text-[var(--color-muted)] hidden sm:inline">
            {sectionLabel}
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSections }).map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeSectionIndex
                    ? 'h-2 w-5 bg-[var(--part-accent,var(--color-accent))]'
                    : 'h-1.5 w-1.5 bg-[var(--color-border)]'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[0.625rem] text-[var(--color-muted)] sm:hidden">
            {sectionLabel}
          </span>
        </div>

        <button
          onClick={onNextChapter}
          disabled={!canGoNext}
          className="reader-nav-btn reader-nav-btn-primary"
          aria-label="Next chapter"
        >
          <span className="hidden sm:inline text-xs">Ch. {String(chapterId + 1).padStart(2, '0')}</span>
          <ChevronRight size={20} />
        </button>
      </footer>
    </>
  );
}
