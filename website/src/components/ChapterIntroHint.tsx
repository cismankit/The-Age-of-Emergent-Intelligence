import { useEffect, useRef, useState } from 'react';
import { getPartTheme } from '../lib/partThemes';

interface HintConfig {
  label: string;
  headline: string;
  description: string;
  leftLabel: string;
  rightLabel: string;
  leftDetail: string;
  rightDetail: string;
  leftBad?: boolean;
}

const CHAPTER_HINTS: Record<number, HintConfig> = {
  2: {
    label: 'Agent Society',
    headline: 'One mission. Many specialists.',
    description: 'A CEO agent delegates — each specialist owns one context deeply.',
    leftLabel: 'CEO Agent',
    rightLabel: 'Specialist Team',
    leftDetail: 'Sends the mission',
    rightDetail: 'Research · Build · QA · Launch',
  },
  3: {
    label: 'Stigmergy',
    headline: 'Coordination without commands.',
    description: 'Agents follow the trail, not the director. The environment carries the signal.',
    leftLabel: 'Explicit Coordination',
    rightLabel: 'Stigmergic Signal',
    leftDetail: 'Agent A tells Agent B directly',
    rightDetail: 'Agent leaves trace · Agent B reads it',
    leftBad: true,
  },
  25: {
    label: 'OS Mind',
    headline: 'The full stack of emergence.',
    description: 'Memory + tools + loops + governance = a mind that outlasts any single agent.',
    leftLabel: 'Individual AI',
    rightLabel: 'Agent OS',
    leftDetail: 'Stateless · Forgets · One role',
    rightDetail: 'Memory · Tools · Roles · Rules',
    leftBad: true,
  },
};

interface Props {
  chapterId: number;
  partNumber: number;
}

export function ChapterIntroHint({ chapterId, partNumber }: Props) {
  const config = CHAPTER_HINTS[chapterId];
  if (!config) return null;

  return <ChapterHintWidget config={config} partNumber={partNumber} />;
}

function ChapterHintWidget({ config, partNumber }: { config: HintConfig; partNumber: number }) {
  const theme = getPartTheme(partNumber);
  const [active, setActive] = useState<'left' | 'right'>('left');
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-advance to right side after 1.4s for context
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setActive('right'), 1400);
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.4 },
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const accent = theme.flow.accent;

  return (
    <div
      ref={containerRef}
      className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] px-4 py-3">
        <p className="label-caps">Interactive · {config.label}</p>
        <p className="hidden text-xs text-[var(--color-muted)] sm:block">{config.description}</p>
      </div>

      {/* Two-panel toggle */}
      <div className="flex divide-x divide-[var(--color-border-subtle)]">
        {/* Left panel */}
        <button
          className={`flex flex-1 flex-col gap-1 px-4 py-4 text-left transition-colors ${
            active === 'left'
              ? config.leftBad
                ? 'bg-rose-50/60'
                : 'bg-amber-50/50'
              : 'hover:bg-[var(--color-border-subtle)]/25'
          }`}
          onClick={() => setActive('left')}
          aria-pressed={active === 'left'}
        >
          <span
            className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider"
            style={{
              color:
                active === 'left'
                  ? config.leftBad
                    ? '#be123c'
                    : '#b45309'
                  : 'var(--color-muted)',
            }}
          >
            {config.leftLabel}
          </span>
          <p className="text-xs leading-snug text-[var(--color-slate)]">{config.leftDetail}</p>
          {active === 'left' && config.leftBad && (
            <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-rose-500 animate-pulse">
              ● fragile
            </span>
          )}
          {active === 'left' && !config.leftBad && (
            <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-amber-600 animate-pulse">
              ● active
            </span>
          )}
        </button>

        {/* Right panel */}
        <button
          className={`flex flex-1 flex-col gap-1 px-4 py-4 text-left transition-colors ${
            active === 'right' ? 'bg-emerald-50/60' : 'hover:bg-[var(--color-border-subtle)]/25'
          }`}
          onClick={() => setActive('right')}
          aria-pressed={active === 'right'}
        >
          <span
            className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider"
            style={{ color: active === 'right' ? '#059669' : 'var(--color-muted)' }}
          >
            {config.rightLabel}
          </span>
          <p className="text-xs leading-snug text-[var(--color-slate)]">{config.rightDetail}</p>
          {active === 'right' && (
            <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-600 animate-pulse">
              ● this chapter
            </span>
          )}
        </button>
      </div>

      {/* Footer insight */}
      <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] px-4 py-2.5">
        <p className="text-xs text-[var(--color-muted)]">
          {active === 'right' ? config.headline : 'Click to see the shift →'}
        </p>
        <button
          onClick={() => setActive((s) => (s === 'left' ? 'right' : 'left'))}
          className="ml-3 shrink-0 rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] transition hover:bg-[var(--color-border-subtle)]"
          style={{ borderColor: active === 'right' ? accent + '55' : undefined }}
        >
          {active === 'left' ? 'See the shift →' : '← Back'}
        </button>
      </div>
    </div>
  );
}
