import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { chapters } from '../../data/chapters';
import { parts } from '../../data/parts';

interface Props {
  open: boolean;
  onClose: () => void;
  currentChapterId: number;
}

export function ContentsDrawer({ open, onClose, currentChapterId }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close contents"
      />
      <aside className="absolute bottom-0 left-0 right-0 max-h-[85dvh] overflow-hidden rounded-t-2xl border-t border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-96 md:rounded-none md:rounded-l-2xl md:border-l md:border-t-0">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <p className="label-caps">Contents</p>
            <p className="text-sm text-[var(--color-slate)]">25 chapters · 6 parts</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-slate)] transition hover:bg-[var(--color-paper)]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(85dvh-73px)] overflow-y-auto overscroll-contain px-3 py-3 md:max-h-[calc(100dvh-73px)]">
          {parts.map((part) => {
            const partChapters = chapters.filter((c) => c.partNumber === part.number);
            return (
              <div key={part.number} className="mb-4">
                <p className="px-2 py-2 font-mono text-[0.625rem] uppercase tracking-wider text-[var(--color-muted)]">
                  Part {String(part.number).padStart(2, '0')} — {part.title}
                </p>
                <ul className="space-y-0.5">
                  {partChapters.map((ch) => {
                    const isCurrent = ch.id === currentChapterId;
                    return (
                      <li key={ch.id}>
                        <Link
                          to={`/chapter/${ch.id}/p/0`}
                          onClick={onClose}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                            isCurrent
                              ? 'bg-[var(--color-accent-muted)]/60 font-medium text-[var(--color-ink)]'
                              : 'text-[var(--color-slate)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]'
                          }`}
                        >
                          <span className="font-mono text-xs text-[var(--color-muted)]">
                            {String(ch.id).padStart(2, '0')}
                          </span>
                          <span className="min-w-0 truncate">{ch.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
