import { Sparkles } from 'lucide-react';
import { FlowScene } from './visual/FlowScene';
import { getPartTheme } from '../lib/partThemes';

interface Props {
  description: string;
  chapterId: number;
  partNumber: number;
  compact?: boolean;
}

export function ScenePlaceholder({ description, chapterId, partNumber, compact = false }: Props) {
  // Fractal identity: the part sets the palette, the chapter sets the seed —
  // every plate in a part shares DNA but no two are alike.
  const palette = getPartTheme(partNumber).flow;

  return (
    <figure className="group relative overflow-hidden rounded-xl border border-[var(--color-border)]">
      <div
        className={`relative ${compact ? 'aspect-[16/10] min-h-[160px]' : 'aspect-[21/9] min-h-[200px]'}`}
        style={{ background: palette.from }}
      >
        <FlowScene seed={chapterId} palette={palette} />

        {/* Cinematic letterbox bars */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[6%] bg-black/50" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-black/50" />

        {/* Legibility scrim behind the caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

        <div className={`absolute inset-0 flex flex-col justify-end ${compact ? 'p-4' : 'p-6 md:p-8'}`}>
          <div className="mb-2 flex items-center gap-3">
            <span className="flex items-center gap-1.5 rounded border border-white/15 bg-black/30 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white/70 backdrop-blur-sm">
              <Sparkles size={11} />
              Living Scene
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
            Plate {chapterId} — generative artwork, unique to this chapter
          </span>
          <span className="text-[0.625rem] text-[var(--color-muted)]">Original · 21:9</span>
        </figcaption>
      )}
    </figure>
  );
}
