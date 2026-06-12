interface Props {
  index: string;
  title: string;
  subtitle?: string;
}

export function SectionLabel({ index, title, subtitle }: Props) {
  return (
    <div className="section-rule flex items-start gap-5">
      <span className="font-mono text-2xl font-medium tabular-nums text-[var(--color-accent)] md:text-3xl">
        {index}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <h2 className="font-display text-xl font-medium text-[var(--color-ink)] md:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm leading-relaxed text-[var(--color-slate)]">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
