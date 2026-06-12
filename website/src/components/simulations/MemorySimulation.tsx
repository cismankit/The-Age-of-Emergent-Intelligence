import { useMemo, useState } from 'react';

const SESSIONS = [
  { day: 'Mon', promise: 'Refund customer $49' },
  { day: 'Tue', promise: 'Ship order #1847' },
  { day: 'Wed', promise: 'Follow up on refund' },
  { day: 'Thu', promise: 'Update pricing page' },
];

export function MemorySimulation() {
  const [hasMemory, setHasMemory] = useState(false);
  const [retention, setRetention] = useState(70);

  const sessions = useMemo(
    () =>
      SESSIONS.map((s, i) => ({
        ...s,
        remembered: hasMemory ? i === 0 || i === 3 || retention > 60 : i === 0,
      })),
    [hasMemory, retention],
  );

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            checked={hasMemory}
            onChange={(e) => setHasMemory(e.target.checked)}
            className="accent-amber-500"
          />
          Memory system enabled
        </label>
        {hasMemory && (
          <label className="flex items-center gap-2 text-sm text-white/70">
            Retention: {retention}%
            <input
              type="range"
              min={20}
              max={100}
              value={retention}
              onChange={(e) => setRetention(Number(e.target.value))}
              className="w-24 accent-amber-500"
            />
          </label>
        )}
      </div>
      <div className="space-y-2">
        {sessions.map((s, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
              s.remembered
                ? 'border-emerald-500/30 bg-emerald-500/10'
                : 'border-red-500/30 bg-red-500/10'
            }`}
          >
            <div>
              <span className="font-mono text-xs text-white/40">{s.day}</span>
              <p className="text-sm text-white/80">{s.promise}</p>
            </div>
            <span
              className={`font-mono text-xs ${s.remembered ? 'text-emerald-400' : 'text-red-400'}`}
            >
              {s.remembered ? 'REMEMBERED' : 'FORGOTTEN'}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-white/35">
        Toggle memory and adjust retention. Without memory, only the current session persists.
      </p>
    </div>
  );
}
