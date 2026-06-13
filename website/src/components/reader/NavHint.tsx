import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Keyboard, Smartphone } from 'lucide-react';

interface Props {
  onDismiss: () => void;
}

/**
 * First-visit hint teaching new readers how to navigate the reader.
 * Auto-dismisses after 5 s; clicking anywhere also dismisses it.
 */
export function NavHint({ onDismiss }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <button
      className="fixed inset-0 z-[90] flex items-end justify-center pb-24 sm:items-center sm:pb-0"
      onClick={onDismiss}
      aria-label="Dismiss navigation hint"
    >
      {/* Dim backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-[var(--color-panel)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="label-caps mb-4 text-white/40">How to read</p>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Smartphone size={15} className="text-amber-400" />
            </span>
            <p className="text-sm text-white/70">
              <span className="font-medium text-white">Scroll</span> through Story → System → Framework → Lab
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <Keyboard size={15} className="text-amber-400" />
            </span>
            <p className="text-sm text-white/70">
              <span className="font-medium text-white">J / K</span> jump between sections; <span className="font-medium text-white">H / L</span> switch chapters
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
              <span className="flex items-center gap-0.5">
                <ChevronLeft size={11} className="text-amber-400" />
                <ChevronRight size={11} className="text-amber-400" />
              </span>
            </span>
            <p className="text-sm text-white/70">
              <span className="font-medium text-white">Bottom bar</span> navigates between chapters; section nav at top
            </p>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="mt-5 w-full rounded-lg bg-white/10 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/15"
        >
          Got it
        </button>

        <p className="mt-2 text-center text-[0.625rem] text-white/30">Disappears in 5 s</p>
      </div>
    </button>
  );
}
