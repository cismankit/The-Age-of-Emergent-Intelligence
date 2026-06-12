interface Props {
  name: string;
  steps: string[];
  application: string;
}

export function FrameworkCard({ name, steps, application }: Props) {
  return (
    <div className="rounded-xl border-2 border-[var(--color-accent)] bg-blue-50/50 p-6">
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
        Practical Framework
      </h3>
      <h4 className="font-display mb-4 text-xl text-[var(--color-ink)]">{name}</h4>
      <ol className="mb-4 space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="pt-0.5 text-[var(--color-ink)]">{step}</span>
          </li>
        ))}
      </ol>
      <div className="rounded-lg bg-white p-4 text-sm text-[var(--color-slate)]">
        <span className="font-medium text-[var(--color-ink)]">Apply it: </span>
        {application}
      </div>
    </div>
  );
}
