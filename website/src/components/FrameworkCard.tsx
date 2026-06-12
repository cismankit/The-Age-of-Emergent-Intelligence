import { Wrench } from 'lucide-react';

interface Props {
  name: string;
  steps: string[];
  application: string;
  compact?: boolean;
}

export function FrameworkCard({ name, steps, application, compact = false }: Props) {
  return (
    <div className="card-elevated overflow-hidden">
      {!compact && (
        <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Wrench size={15} className="text-[var(--color-accent)]" />
          </span>
          <div>
            <p className="label-caps">Practical Framework</p>
            <h3 className="font-display text-lg font-medium text-[var(--color-ink)]">{name}</h3>
          </div>
        </div>
      )}

      <div className={compact ? 'p-4' : 'px-6 py-6'}>
        {compact && (
          <h3 className="font-display mb-4 text-lg font-medium text-[var(--color-ink)]">{name}</h3>
        )}
        <ol className={compact ? 'space-y-3' : 'space-y-4'}>
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-paper)] font-mono text-xs font-medium text-[var(--color-accent)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="pt-0.5 text-[0.9375rem] leading-relaxed text-[var(--color-ink)]">
                {step}
              </p>
            </li>
          ))}
        </ol>

        <div className={`rounded-lg border border-[var(--color-accent)]/20 bg-[var(--color-accent-muted)]/40 px-4 py-3 ${compact ? 'mt-4' : 'mt-6 px-5 py-4'}`}>
          <p className="label-caps mb-2 text-[var(--color-accent)]">Apply It</p>
          <p className="text-sm leading-relaxed text-[var(--color-slate)]">{application}</p>
        </div>
      </div>
    </div>
  );
}
