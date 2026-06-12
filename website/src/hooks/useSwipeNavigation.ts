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

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        onNextRef.current();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrevRef.current();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;

      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

      if (dx < 0) onNextRef.current();
      else onPrevRef.current();
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [enabled]);
}
