import { useCallback, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'emergence-reading-progress';

export interface ReadingProgress {
  chapterId: number;
  pageIndex: number;
  updatedAt: number;
}

// Snapshot must be referentially stable between calls, otherwise
// useSyncExternalStore detects a "new" value every render and loops forever.
let cachedRaw: string | null = null;
let cachedProgress: ReadingProgress | null = null;

function readProgress(): ReadingProgress | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }

  if (raw === cachedRaw) return cachedProgress;

  cachedRaw = raw;
  cachedProgress = null;

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as ReadingProgress;
      if (parsed.chapterId >= 1 && parsed.chapterId <= 25 && parsed.pageIndex >= 0) {
        cachedProgress = parsed;
      }
    } catch {
      /* ignore malformed data */
    }
  }

  return cachedProgress;
}

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function emit() {
  listeners.forEach((l) => l());
}

export function saveReadingProgress(chapterId: number, pageIndex: number) {
  const progress: ReadingProgress = {
    chapterId,
    pageIndex,
    updatedAt: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  emit();
}

export function clearReadingProgress() {
  localStorage.removeItem(STORAGE_KEY);
  emit();
}

export function useReadingProgress() {
  const progress = useSyncExternalStore(
    subscribe,
    readProgress,
    () => null,
  );

  const save = useCallback((chapterId: number, pageIndex: number) => {
    saveReadingProgress(chapterId, pageIndex);
  }, []);

  return { progress, save };
}
