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
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
      <div className="mb-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={hasMemory} onChange={(e) => setHasMemory(e.target.checked)} />
          Memory system enabled
        </label>
        {hasMemory && (
          <label className="flex items-center gap-2 text-sm">
            Retention: {retention}%
            <input type="range" min={20} max={100} value={retention} onChange={(e) => setRetention(Number(e.target.value))} className="w-24" />
          </label>
        )}
      </div>
      <div className="space-y-3">
        {sessions.map((s, i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-lg border p-3 ${
              s.remembered ? 'border-emerald-300 bg-emerald-50' : 'border-red-300 bg-red-50'
            }`}
          >
            <div>
              <span className="font-mono text-xs text-[var(--color-slate)]">{s.day}</span>
              <p className="text-sm">{s.promise}</p>
            </div>
            <span className={`text-xs font-medium ${s.remembered ? 'text-emerald-700' : 'text-red-700'}`}>
              {s.remembered ? '✓ Remembered' : '✗ Forgotten'}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-[var(--color-slate)]">
        Toggle memory and adjust retention. Without memory, only the current session persists.
      </p>
    </div>
  );
}
