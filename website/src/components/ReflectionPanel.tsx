import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Props {
  questions: string[];
  prompts: string[];
}

export function ReflectionPanel({ questions, prompts }: Props) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-slate)]">
            Interactive Reflection
          </h3>
          <p className="mt-1 text-sm text-[var(--color-slate)]">
            {questions.length} questions · {prompts.length} exercises
          </p>
        </div>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {open && (
        <div className="space-y-6 border-t border-[var(--color-border)] px-6 pb-6 pt-4">
          <div>
            <h4 className="mb-3 font-medium text-[var(--color-ink)]">Consider</h4>
            <ul className="space-y-2">
              {questions.map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-[var(--color-slate)]">
                  <span className="font-mono text-[var(--color-accent)]">{i + 1}.</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-medium text-[var(--color-ink)]">Your Turn</h4>
            <div className="space-y-4">
              {prompts.map((p, i) => (
                <div key={i}>
                  <label className="mb-1 block text-sm text-[var(--color-slate)]">{p}</label>
                  <textarea
                    className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] p-3 text-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                    rows={2}
                    value={answers[i] ?? ''}
                    onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                    placeholder="Write your response..."
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
