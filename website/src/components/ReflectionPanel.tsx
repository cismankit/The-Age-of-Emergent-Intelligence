import { useState } from 'react';
import { ChevronDown, PenLine } from 'lucide-react';

interface Props {
  questions: string[];
  prompts: string[];
}

export function ReflectionPanel({ questions, prompts }: Props) {
  const [open, setOpen] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="card-elevated overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition hover:bg-[var(--color-paper)]/60"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-paper)]">
            <PenLine size={15} className="text-[var(--color-accent)]" />
          </span>
          <div>
            <p className="label-caps">Reader Reflection</p>
            <p className="mt-0.5 text-sm text-[var(--color-slate)]">
              {questions.length} questions · {prompts.length} written exercises
            </p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--color-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="space-y-8 border-t border-[var(--color-border)] px-6 pb-6 pt-6">
          <div>
            <p className="label-caps mb-4">Consider</p>
            <ol className="space-y-3">
              {questions.map((q, i) => (
                <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-[var(--color-slate)]">
                  <span className="font-mono text-xs font-medium text-[var(--color-accent)]">
                    Q{i + 1}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="label-caps mb-4">Your Turn</p>
            <div className="space-y-5">
              {prompts.map((p, i) => (
                <div key={i}>
                  <label className="mb-2 block text-sm font-medium text-[var(--color-ink)]">
                    {p}
                  </label>
                  <textarea
                    className="w-full resize-y rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-3 text-sm leading-relaxed text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30"
                    rows={3}
                    value={answers[i] ?? ''}
                    onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                    placeholder="Write your response…"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
