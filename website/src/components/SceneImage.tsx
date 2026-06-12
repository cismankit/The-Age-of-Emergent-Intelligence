import { useState } from 'react';
import QRCode from 'react-qr-code';

const BASE = import.meta.env.BASE_URL;

interface Props {
  chapterId: number;
  title: string;
  caption: string;
}

export function SceneImage({ chapterId, title, caption }: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = `${BASE}scenes/chapter-${String(chapterId).padStart(2, '0')}.png`;
  const demoUrl = `https://cismankit.github.io/The-Age-of-Emergent-Intelligence/chapter/${chapterId}`;

  return (
    <figure className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-black shadow-lg">
      <div className="relative aspect-video w-full">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-800 to-slate-900" />
        )}
        <img
          src={src}
          alt={`Cinematic scene: ${title}`}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5">
          <div className="text-white">
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              Chapter {chapterId} · Cinematic Scene
            </p>
            <figcaption className="font-display mt-1 text-lg leading-snug">{caption}</figcaption>
          </div>
          <div className="hidden shrink-0 rounded-lg bg-white p-2 sm:block" title="Scan to open chapter on mobile">
            <QRCode value={demoUrl} size={64} level="M" />
          </div>
        </div>
      </div>
    </figure>
  );
}
