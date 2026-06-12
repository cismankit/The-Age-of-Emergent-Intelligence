import { Link, useParams } from 'react-router-dom';
import { chapters } from '../data/chapters';

const BASE = import.meta.env.BASE_URL;

export function ChapterNav() {
  const { id } = useParams();
  const currentId = Number(id);

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-xl border border-[var(--color-border)] bg-white p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-slate)]">
          All Chapters
        </p>
        <ul className="space-y-1">
          {chapters.map((ch) => (
            <li key={ch.id}>
              <Link
                to={`/chapter/${ch.id}`}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                  ch.id === currentId
                    ? 'bg-blue-50 font-medium text-[var(--color-accent)]'
                    : 'text-[var(--color-slate)] hover:bg-slate-50'
                }`}
              >
                <img
                  src={`${BASE}scenes/chapter-${String(ch.id).padStart(2, '0')}.png`}
                  alt=""
                  className="h-8 w-12 rounded object-cover"
                />
                <span className="truncate">
                  <span className="font-mono text-xs opacity-60">{ch.id}.</span> {ch.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
