import { Clock } from 'lucide-react';
import type { ProofItem } from '../data/proof';

interface Props {
  items: ProofItem[];
  title?: string;
  /** If true, shows only available items (hides placeholders) */
  hideUnavailable?: boolean;
}

function MetricCard({ item }: { item: ProofItem }) {
  if (!item.available) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-paper)] p-4 text-center opacity-70">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Clock size={12} className="text-[var(--color-muted)]" />
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-[var(--color-muted)]">
            Coming Soon
          </span>
        </div>
        <p className="font-display text-sm font-medium text-[var(--color-slate)]">
          {item.label}
        </p>
        {item.detail && (
          <p className="mt-1 text-[0.6875rem] text-[var(--color-muted)] leading-snug">
            {item.detail}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center">
      <p className="font-display text-2xl font-medium text-[var(--color-ink)]">{item.value}</p>
      <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-[var(--color-muted)]">
        {item.label}
      </p>
      {item.detail && (
        <p className="mt-1 text-xs text-[var(--color-slate)] leading-snug">{item.detail}</p>
      )}
    </div>
  );
}

function TestimonialCard({ item }: { item: ProofItem }) {
  if (!item.available) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-paper)] p-5 opacity-70">
        <div className="flex items-center gap-1.5 mb-3">
          <Clock size={12} className="text-[var(--color-muted)]" />
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-[var(--color-muted)]">
            Testimonial — coming soon
          </span>
        </div>
        <p className="text-sm text-[var(--color-muted)] italic leading-relaxed">
          {item.detail ?? 'Reader voices will appear here once collected.'}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <p className="text-sm leading-relaxed text-[var(--color-ink)] italic">
        "{item.label}"
      </p>
      {item.name && (
        <div className="mt-3 flex items-center gap-2">
          <span className="h-px flex-1 bg-[var(--color-border-subtle)]" />
          <div className="text-right">
            <p className="text-xs font-semibold text-[var(--color-ink)]">{item.name}</p>
            {item.role && (
              <p className="text-[0.625rem] text-[var(--color-muted)]">{item.role}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProofModule({ items, title, hideUnavailable = false }: Props) {
  const visible = hideUnavailable ? items.filter((i) => i.available) : items;

  if (visible.length === 0) return null;

  const metrics = visible.filter((i) => i.type === 'metric' || i.type === 'milestone');
  const testimonials = visible.filter((i) => i.type === 'testimonial');

  return (
    <section aria-label={title ?? 'Social proof'}>
      {title && (
        <p className="label-caps mb-4">{title}</p>
      )}

      {metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 mb-6">
          {metrics.map((item) => (
            <MetricCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {testimonials.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
