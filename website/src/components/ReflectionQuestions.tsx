import { useState, useEffect } from 'react';

interface Props {
  questions: string[];
  accent?: string;
  chapterId?: number;
}

const storageKey = (chapterId: number) => `emergence-reflect-q-${chapterId}`;

export function ReflectionQuestions({ questions, accent = 'var(--color-accent)', chapterId }: Props) {
  const [notes, setNotes] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!chapterId) return;
    try {
      const saved = localStorage.getItem(storageKey(chapterId));
      if (saved) setNotes(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, [chapterId]);

  const update = (index: number, value: string) => {
    if (!chapterId) return;
    const next = { ...notes, [index]: value };
    setNotes(next);
    try {
      localStorage.setItem(storageKey(chapterId), JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <ol className="space-y-4">
      {questions.map((q, i) => (
        <li key={i} className="card-elevated px-5 py-4">
          <div className="flex gap-4">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold text-white"
              style={{ background: accent }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="pt-0.5 text-[1.0312rem] leading-relaxed text-[var(--color-ink)]">{q}</p>
          </div>
          {chapterId && (
            <textarea
              className="mt-3 w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] px-3 py-2 text-sm leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30"
              rows={2}
              value={notes[i] ?? ''}
              onChange={(e) => update(i, e.target.value)}
              placeholder="Your thoughts… (auto-saved)"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
