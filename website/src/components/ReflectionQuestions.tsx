interface Props {
  questions: string[];
  accent?: string;
}

export function ReflectionQuestions({ questions, accent = 'var(--color-accent)' }: Props) {
  return (
    <ol className="space-y-4">
      {questions.map((q, i) => (
        <li
          key={i}
          className="card-elevated flex gap-4 px-5 py-4"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-xs font-semibold text-white"
            style={{ background: accent }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="pt-0.5 text-[1.0312rem] leading-relaxed text-[var(--color-ink)]">{q}</p>
        </li>
      ))}
    </ol>
  );
}
