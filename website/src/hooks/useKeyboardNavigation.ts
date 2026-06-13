import { useEffect, useRef } from 'react';

interface Options {
  onNext: () => void;
  onPrev: () => void;
  enabled?: boolean;
}

/**
 * Arrow-key and J/K page turning for the chapter reader.
 * Disabled when focus is inside a textarea or input so reflection
 * prompts remain editable without accidentally flipping pages.
 *
 * Uses stable refs so the listener is registered once and never
 * re-registered when the parent component re-renders.
 */
export function useKeyboardNavigation({ onNext, onPrev, enabled = true }: Options) {
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);

  onNextRef.current = onNext;
  onPrevRef.current = onPrev;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT' || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'j':
        case 'l':
          e.preventDefault();
          onNextRef.current();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'k':
        case 'h':
          e.preventDefault();
          onPrevRef.current();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);
}
