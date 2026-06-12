import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { getChapter, chapters } from '../data/chapters';
import { buildChapterPages } from '../lib/buildChapterPages';
import { getPartTheme } from '../lib/partThemes';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';
import { PageView } from '../components/reader/PageView';
import { ReaderChrome } from '../components/reader/ReaderChrome';
import { ContentsDrawer } from '../components/reader/ContentsDrawer';

export function ChapterReaderPage() {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const chapterId = Number(id);
  const pageIndex = Math.max(0, Number(page) || 0);
  const chapter = getChapter(chapterId);
  const [contentsOpen, setContentsOpen] = useState(false);
  const { save } = useReadingProgress();

  const pages = useMemo(() => (chapter ? buildChapterPages(chapter) : []), [chapter]);
  const totalPages = pages.length;
  const currentPage = pages[pageIndex];

  useEffect(() => {
    if (chapter) save(chapterId, pageIndex);
  }, [chapter, chapterId, pageIndex, save]);

  useEffect(() => {
    setContentsOpen(false);
  }, [chapterId, pageIndex]);

  const goToPage = (chId: number, p: number) => {
    navigate(`/chapter/${chId}/p/${p}`);
  };

  const goPrev = () => {
    if (pageIndex > 0) {
      goToPage(chapterId, pageIndex - 1);
    } else if (chapterId > 1) {
      const prevChapter = chapters[chapterId - 2];
      const prevPages = buildChapterPages(prevChapter);
      goToPage(chapterId - 1, prevPages.length - 1);
    }
  };

  const goNext = () => {
    if (pageIndex < totalPages - 1) {
      goToPage(chapterId, pageIndex + 1);
    } else if (chapterId < 25) {
      goToPage(chapterId + 1, 0);
    } else {
      navigate('/');
    }
  };

  // Hooks must run unconditionally — keep this above the early returns.
  useSwipeNavigation({ onNext: goNext, onPrev: goPrev });

  if (!chapter) return <Navigate to="/" replace />;
  if (pageIndex >= totalPages) {
    return <Navigate to={`/chapter/${chapterId}/p/${totalPages - 1}`} replace />;
  }

  const canGoPrev = pageIndex > 0 || chapterId > 1;
  const canGoNext = pageIndex < totalPages - 1 || chapterId < 25;

  // Context-aware ambience: the part's palette tints the whole reading surface.
  const theme = getPartTheme(chapter.partNumber);
  const ambient = {
    '--aurora-a': theme.aurora.a,
    '--aurora-b': theme.aurora.b,
    '--aurora-c': theme.aurora.c,
    '--part-accent': theme.flow.accent,
  } as CSSProperties;

  return (
    <div className="reader-viewport aurora" style={ambient}>
      <ReaderChrome
        chapterId={chapterId}
        chapterTitle={chapter.title}
        pageIndex={pageIndex}
        totalPages={totalPages}
        pageLabel={currentPage?.label ?? ''}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onPrev={goPrev}
        onNext={goNext}
        onOpenContents={() => setContentsOpen(true)}
      />

      <main className="reader-main" key={`${chapterId}-${pageIndex}`}>
        {currentPage && (
          <PageView chapter={chapter} page={currentPage} />
        )}
      </main>

      <ContentsDrawer
        open={contentsOpen}
        onClose={() => setContentsOpen(false)}
        currentChapterId={chapterId}
      />
    </div>
  );
}

export function ChapterRedirect() {
  const { id } = useParams();
  const chapterId = Number(id);
  const { progress } = useReadingProgress();

  if (!getChapter(chapterId)) return <Navigate to="/" replace />;

  const page =
    progress?.chapterId === chapterId ? progress.pageIndex : 0;

  return <Navigate to={`/chapter/${chapterId}/p/${page}`} replace />;
}
