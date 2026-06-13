import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
} from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import { getChapter } from '../data/chapters';
import { buildChapterSections, type ChapterSection } from '../lib/buildChapterPages';
import { getPartTheme } from '../lib/partThemes';
import { useReadingProgress } from '../hooks/useReadingProgress';
import { useSwipeNavigation } from '../hooks/useSwipeNavigation';
import { useFirstVisit } from '../hooks/useFirstVisit';
import { ReaderChrome } from '../components/reader/ReaderChrome';
import { ContentsDrawer } from '../components/reader/ContentsDrawer';
import { NavHint } from '../components/reader/NavHint';
import { ChapterScrollView } from '../components/reader/ChapterScrollView';

/** Local storage key for sidebar preference */
const SIDEBAR_KEY = 'emergence-sidebar-open';

function getSidebarPref(): boolean {
  try { return localStorage.getItem(SIDEBAR_KEY) !== 'false'; }
  catch { return true; }
}

export function ChapterReaderPage() {
  const { id, page } = useParams();
  const navigate = useNavigate();
  const chapterId = Number(id);
  // sectionIndex derived from URL, 0-based
  const initSection = Math.max(0, Number(page) || 0);
  const chapter = getChapter(chapterId);

  const [contentsOpen, setContentsOpen] = useState(false);
  const [showNavHint, dismissNavHint] = useFirstVisit();
  const [activeSectionIndex, setActiveSectionIndex] = useState(initSection);
  const [sidebarOpen, setSidebarOpen] = useState(getSidebarPref);

  const mainRef = useRef<HTMLElement>(null);
  const sectionElements = useRef<(HTMLElement | null)[]>([]);
  const { save } = useReadingProgress();

  const sections = useMemo(() => (chapter ? buildChapterSections(chapter) : []), [chapter]);

  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionElements.current[index] = el;
    },
    [],
  );

  // ── IntersectionObserver: track active section ──────────────────────────
  useLayoutEffect(() => {
    if (!sections.length) return;
    const root = mainRef.current;
    if (!root) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const idx = sections.findIndex((s) => s.id === el.dataset.section);
            if (idx !== -1) setActiveSectionIndex(idx);
          }
        }
      },
      { root, rootMargin: '-35% 0px -35% 0px', threshold: 0 },
    );

    sectionElements.current.forEach((el) => {
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [sections, chapterId]);

  // ── Save progress when active section changes ───────────────────────────
  useEffect(() => {
    if (chapter) save(chapterId, activeSectionIndex);
  }, [chapter, chapterId, activeSectionIndex, save]);

  // ── Update URL to reflect active section (debounced) ───────────────────
  useEffect(() => {
    const newUrl = `/chapter/${chapterId}/p/${activeSectionIndex}`;
    if (window.location.pathname !== newUrl) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [chapterId, activeSectionIndex]);

  // ── Close drawer on chapter change ─────────────────────────────────────
  useEffect(() => { setContentsOpen(false); }, [chapterId]);

  // ── Scroll to saved/URL section on load ────────────────────────────────
  useLayoutEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [chapterId]);

  useEffect(() => {
    if (initSection > 0) {
      const t = setTimeout(() => {
        const el = sectionElements.current[initSection];
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [chapterId, initSection]);

  // ── Section scroll helper ───────────────────────────────────────────────
  const scrollToSection = useCallback((idx: number) => {
    sectionElements.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // ── Chapter navigation ──────────────────────────────────────────────────
  const goPrevChapter = useCallback(() => {
    if (chapterId > 1) navigate(`/chapter/${chapterId - 1}/p/0`);
  }, [chapterId, navigate]);

  const goNextChapter = useCallback(() => {
    if (chapterId < 25) navigate(`/chapter/${chapterId + 1}/p/0`);
    else navigate('/');
  }, [chapterId, navigate]);

  // ── Keyboard: j/k scroll sections; h/l change chapters ─────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT' || (e.target as HTMLElement)?.isContentEditable) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'j':
          e.preventDefault();
          if (activeSectionIndex < sections.length - 1) scrollToSection(activeSectionIndex + 1);
          else goNextChapter();
          break;
        case 'ArrowUp':
        case 'k':
          e.preventDefault();
          if (activeSectionIndex > 0) scrollToSection(activeSectionIndex - 1);
          else goPrevChapter();
          break;
        case 'ArrowRight':
        case 'l':
          e.preventDefault();
          goNextChapter();
          break;
        case 'ArrowLeft':
        case 'h':
          e.preventDefault();
          goPrevChapter();
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeSectionIndex, sections.length, scrollToSection, goNextChapter, goPrevChapter]);

  // ── Swipe: horizontal = chapter nav ────────────────────────────────────
  useSwipeNavigation({ onNext: goNextChapter, onPrev: goPrevChapter });

  // ── SEO ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (chapter) {
      document.title = `Ch. ${chapter.id}: ${chapter.title} — Emergence`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          `${chapter.subtitle} — ${chapter.story.narrative.slice(0, 120)}…`,
        );
      }
    }
    return () => { document.title = 'Emergence — A Visual Guide to Multi-Agent Intelligence'; };
  }, [chapter]);

  // ── Sidebar toggle ─────────────────────────────────────────────────────
  const toggleSidebar = () => {
    setSidebarOpen((v) => {
      const next = !v;
      try { localStorage.setItem(SIDEBAR_KEY, String(next)); } catch {}
      return next;
    });
  };

  // ── Guards ─────────────────────────────────────────────────────────────
  if (!chapter) return <Navigate to="/" replace />;

  const clamped = Math.min(initSection, sections.length - 1);
  if (clamped !== initSection) {
    return <Navigate to={`/chapter/${chapterId}/p/${clamped}`} replace />;
  }

  const theme = getPartTheme(chapter.partNumber);
  const ambient = {
    '--aurora-a': theme.aurora.a,
    '--aurora-b': theme.aurora.b,
    '--aurora-c': theme.aurora.c,
    '--part-accent': theme.flow.accent,
  } as CSSProperties;

  const activeSection: ChapterSection | undefined = sections[activeSectionIndex];

  return (
    <div className="reader-viewport aurora" style={ambient} key={chapterId}>
      <ReaderChrome
        chapterId={chapterId}
        chapterTitle={chapter.title}
        activeSectionIndex={activeSectionIndex}
        totalSections={sections.length}
        sectionLabel={activeSection?.navLabel ?? ''}
        canGoPrev={chapterId > 1}
        canGoNext={chapterId < 25}
        onPrevChapter={goPrevChapter}
        onNextChapter={goNextChapter}
        onOpenContents={() => setContentsOpen(true)}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={toggleSidebar}
      />

      {/* Reader body — main scroll + optional sidebar */}
      <div className={`reader-body ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <main ref={mainRef} className="reader-scroll-main">
          {/* Sticky section nav — inside scroll container */}
          <nav className="reader-section-nav" aria-label="Chapter sections">
            <div className="reader-section-nav-inner">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  className={`reader-section-tab ${i === activeSectionIndex ? 'active' : ''}`}
                  onClick={() => scrollToSection(i)}
                  aria-label={`Go to ${s.label}`}
                  aria-current={i === activeSectionIndex ? 'true' : undefined}
                >
                  {s.navLabel}
                </button>
              ))}
            </div>
          </nav>

          <ChapterScrollView
            chapter={chapter}
            sections={sections}
            setSectionRef={setSectionRef}
            onNextChapter={goNextChapter}
            onPrevChapter={goPrevChapter}
            hasNextChapter={chapterId < 25}
            hasPrevChapter={chapterId > 1}
          />
        </main>

        {/* Desktop sidebar — framework steps visible while reading */}
        <aside className={`reader-sidebar ${sidebarOpen ? 'is-open' : ''}`} aria-label="Framework sidebar">
          <div className="reader-sidebar-inner">
            <div className="flex items-center justify-between mb-4">
              <p className="label-caps">Framework</p>
              <button
                onClick={toggleSidebar}
                className="reader-top-btn lg:hidden"
                aria-label="Close sidebar"
              >
                <PanelRightClose size={16} />
              </button>
            </div>
            <p className="font-display text-sm font-medium text-[var(--color-ink)] mb-3 leading-snug">
              {chapter.framework.name}
            </p>
            <ol className="space-y-2">
              {chapter.framework.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--color-slate)]">
                  <span
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold text-white"
                    style={{ background: theme.flow.accent }}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-[var(--color-muted)] leading-relaxed border-t border-[var(--color-border-subtle)] pt-3">
              {chapter.framework.application}
            </p>

            {/* Quick nav */}
            <div className="mt-6 pt-3 border-t border-[var(--color-border-subtle)]">
              <p className="label-caps mb-2">Sections</p>
              <div className="flex flex-col gap-0.5">
                {sections.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(i)}
                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition text-left ${
                      i === activeSectionIndex
                        ? 'bg-[var(--color-border-subtle)] font-semibold text-[var(--color-ink)]'
                        : 'text-[var(--color-muted)] hover:bg-[var(--color-border-subtle)]/60'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                        i === activeSectionIndex ? 'bg-[var(--part-accent)]' : 'bg-[var(--color-border)]'
                      }`}
                    />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Toggle button (desktop) */}
        <button
          onClick={toggleSidebar}
          className="reader-sidebar-toggle"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          title={sidebarOpen ? 'Hide framework panel' : 'Show framework panel'}
        >
          {sidebarOpen ? <PanelRightClose size={15} /> : <PanelRightOpen size={15} />}
        </button>
      </div>

      <ContentsDrawer
        open={contentsOpen}
        onClose={() => setContentsOpen(false)}
        currentChapterId={chapterId}
      />

      {showNavHint && <NavHint onDismiss={dismissNavHint} />}
    </div>
  );
}

export function ChapterRedirect() {
  const { id } = useParams();
  const chapterId = Number(id);
  const { progress } = useReadingProgress();

  if (!getChapter(chapterId)) return <Navigate to="/" replace />;

  // Map old pageIndex to new sectionIndex (old pages 0/1 = opening, 2=system, 3=framework, 4=lab)
  let sectionIndex = 0;
  if (progress?.chapterId === chapterId) {
    const p = progress.pageIndex;
    // Old title page (0) + scene-story (1) → section 0 (opening)
    // Old insight-diagram (2) → section 1 (system)
    // Old framework-reflect (3) → section 2 (framework)
    // Old simulation (4) → section 3 (lab)
    sectionIndex = p <= 1 ? 0 : p - 1;
  }

  return <Navigate to={`/chapter/${chapterId}/p/${sectionIndex}`} replace />;
}
