import { useState, useEffect } from 'react';

interface Props {
  prompts: string[];
  chapterId: number;
}

const storageKey = (chapterId: number) => `emergence-reflection-${chapterId}`;

export function ReflectionPrompts({ prompts, chapterId }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey(chapterId));
      if (saved) setAnswers(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, [chapterId]);

  const update = (index: number, value: string) => {
    const next = { ...answers, [index]: value };
    setAnswers(next);
    localStorage.setItem(storageKey(chapterId), JSON.stringify(next));
  };

  return (
    <div className="space-y-5">
      {prompts.map((p, i) => (
        <div key={i}>
          <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">{p}</label>
          <textarea
            className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30"
            rows={3}
            value={answers[i] ?? ''}
            onChange={(e) => update(i, e.target.value)}
            placeholder="Optional — jot a note…"
          />
        </div>
      ))}
    </div>
  );
}
