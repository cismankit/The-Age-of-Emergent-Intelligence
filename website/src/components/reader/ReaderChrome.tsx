import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, List, Home, Heart } from 'lucide-react';
import { TOTAL_BOOK_PAGES, getGlobalPageNumber, getBookPercent } from '../../lib/bookProgress';

interface Props {
  chapterId: number;
  chapterTitle: string;
  pageIndex: number;
  totalPages: number;
  pageLabel: string;
  canGoPrev: boolean;
  canGoNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onOpenContents: () => void;
}

export function ReaderChrome({
  chapterId,
  chapterTitle,
  pageIndex,
  totalPages,
  pageLabel,
  canGoPrev,
  canGoNext,
  onPrev,
  onNext,
  onOpenContents,
}: Props) {
  const globalPage = getGlobalPageNumber(chapterId, pageIndex);
  const bookPercent = getBookPercent(chapterId, pageIndex);
  const progress = (globalPage / TOTAL_BOOK_PAGES) * 100;

  return (
    <>
      {/* Tap zones — like turning pages */}
      <button
        className="reader-tap-zone reader-tap-left"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous page"
      />
      <button
        className="reader-tap-zone reader-tap-right"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next page"
      />

      {/* Top bar */}
      <header className="reader-top">
        <div className="reader-top-progress" style={{ width: `${progress}%` }} />
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

      {/* Bottom bar */}
      <footer className="reader-bottom">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className="reader-nav-btn"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="reader-page-indicator">
          <span className="font-mono text-xs text-[var(--color-ink)]">
            {pageIndex + 1} / {totalPages}
            <span style={{ color: 'var(--part-accent, var(--color-muted))' }}> · {pageLabel}</span>
          </span>
          <span className="font-mono text-[0.625rem] text-[var(--color-muted)]">
            Book p. {globalPage} of {TOTAL_BOOK_PAGES} · {bookPercent}%
          </span>
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="reader-nav-btn reader-nav-btn-primary"
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={20} />
        </button>
      </footer>
    </>
  );
}
