import { useEffect, useRef } from 'react';

interface Options {
  onNext: () => void;
  onPrev: () => void;
  enabled?: boolean;
}

export function useSwipeNavigation({ onNext, onPrev, enabled = true }: Options) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);

  onNextRef.current = onNext;
  onPrevRef.current = onPrev;

  useEffect(() => {
    if (!enabled) return;

    // Keyboard navigation is handled exclusively by useKeyboardNavigation —
    // registering it here too caused every keypress to navigate two pages at once.

    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;

      // Require a clear horizontal gesture (≥80 px, 2× horizontal dominance)
      // to avoid accidental page turns during vertical scrolling.
      if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 2) return;

      if (dx < 0) onNextRef.current();
      else onPrevRef.current();
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [enabled]);
}
