interface Props {
  questions: string[];
}

export function ReflectionQuestions({ questions }: Props) {
  return (
    <ol className="space-y-5">
      {questions.map((q, i) => (
        <li key={i} className="flex gap-4">
          <span className="font-mono text-sm font-medium text-[var(--color-accent)]">
            {String(i + 1).padStart(2, '0')}
          </span>
          <p className="text-[1.0625rem] leading-relaxed text-[var(--color-ink)]">{q}</p>
        </li>
      ))}
    </ol>
  );
}
