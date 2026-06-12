import { Clapperboard } from 'lucide-react';

interface Props {
  description: string;
  chapterId: number;
  compact?: boolean;
}

const palettes = [
  { from: '#0c1220', via: '#1a2744', to: '#2d3f6b', accent: '#60a5fa' },
  { from: '#0a1410', via: '#0f2e24', to: '#1a4d3a', accent: '#34d399' },
  { from: '#120a20', via: '#2d1b4e', to: '#4c2a7a', accent: '#a78bfa' },
  { from: '#140e08', via: '#3d2810', to: '#5c3d18', accent: '#fbbf24' },
  { from: '#140810', via: '#3d1028', to: '#5c1840', accent: '#f472b6' },
  { from: '#081412', via: '#0f3330', to: '#1a5550', accent: '#2dd4bf' },
];

export function ScenePlaceholder({ description, chapterId, compact = false }: Props) {
  const palette = palettes[(chapterId - 1) % palettes.length];

  return (
    <figure className="group relative overflow-hidden rounded-xl border border-[var(--color-border)]">
      <div
        className={`relative ${compact ? 'aspect-[16/10] min-h-[160px]' : 'aspect-[21/9] min-h-[200px]'}`}
        style={{
          background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.via} 50%, ${palette.to} 100%)`,
        }}
      >
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${palette.accent}40 0%, transparent 60%)`,
          }}
        />

        {/* Cinematic letterbox bars */}
        <div className="absolute inset-x-0 top-0 h-[6%] bg-black/50" />
        <div className="absolute inset-x-0 bottom-0 h-[6%] bg-black/50" />

        <div className={`absolute inset-0 flex flex-col justify-end ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
          <div className="mb-2 flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded border border-white/15 bg-black/30 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm">
              <Clapperboard size={11} />
              Scene
            </span>
          </div>
          <blockquote className={`max-w-2xl font-display leading-relaxed text-white/90 ${compact ? 'text-base' : 'text-lg md:text-xl'}`}>
            {description}
          </blockquote>
        </div>

        {/* Corner marks — field guide plate reference */}
        <div className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-white/20" />
        <div className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r border-t border-white/20" />
        <div className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/20" />
        <div className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/20" />
      </div>
      {!compact && (
        <figcaption className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-[var(--color-muted)]">
            Fig. {chapterId} — Cinematic reference
          </span>
          <span className="text-[0.625rem] text-[var(--color-muted)]">Fable 5 · 21:9</span>
        </figcaption>
      )}
    </figure>
  );
}
