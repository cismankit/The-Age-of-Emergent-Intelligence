import { useState, useEffect } from 'react';
import { Download, Sparkles, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'emergence-blueprint-v1';

interface BlueprintData {
  conductorRole: string;
  keyUseCase: string;
  firstAgent: string;
  memorySolution: string;
  feedbackLoop: string;
  humanRole: string;
  nextStep: string;
  createdAt: string;
}

const QUESTIONS = [
  { key: 'conductorRole', label: 'My role as a conductor', placeholder: 'e.g. I orchestrate agents that research, write, and review my long-form reports' },
  { key: 'keyUseCase', label: 'My most important use case', placeholder: 'e.g. Competitive analysis across 20+ sources, updated weekly' },
  { key: 'firstAgent', label: 'The first specialized agent I will build', placeholder: 'e.g. A research agent that monitors RSS feeds and surfaces signal' },
  { key: 'memorySolution', label: 'How I will give my agents memory', placeholder: 'e.g. Vector store for long-term, conversation buffer for short-term' },
  { key: 'feedbackLoop', label: 'The feedback loop my system needs', placeholder: 'e.g. Critic agent reviews output before it reaches me, flags low-confidence responses' },
  { key: 'humanRole', label: 'Where I stay in the loop', placeholder: 'e.g. I approve final deliverables; agents handle all intermediate steps' },
  { key: 'nextStep', label: 'My concrete next step (this week)', placeholder: 'e.g. Set up LangGraph with two agents: a researcher and a writer' },
] as const;

function downloadBlueprint(data: BlueprintData) {
  const lines = [
    '╔══════════════════════════════════════════════════════════╗',
    '║         MY EMERGENCE BLUEPRINT — ProjectX               ║',
    `║         Generated: ${data.createdAt.slice(0, 10)}                         ║`,
    '╚══════════════════════════════════════════════════════════╝',
    '',
    '"Intelligence emerges from relationships between agents,',
    ' memory, tools, feedback loops, and environments."',
    '',
    '─────────────────────────────────────────────',
    '',
    `CONDUCTOR ROLE:\n${data.conductorRole || '(not filled)'}`,
    '',
    `KEY USE CASE:\n${data.keyUseCase || '(not filled)'}`,
    '',
    `FIRST AGENT TO BUILD:\n${data.firstAgent || '(not filled)'}`,
    '',
    `MEMORY SOLUTION:\n${data.memorySolution || '(not filled)'}`,
    '',
    `FEEDBACK LOOP:\n${data.feedbackLoop || '(not filled)'}`,
    '',
    `MY ROLE AS HUMAN:\n${data.humanRole || '(not filled)'}`,
    '',
    `NEXT STEP THIS WEEK:\n${data.nextStep || '(not filled)'}`,
    '',
    '─────────────────────────────────────────────',
    '',
    'Read the full guide free at:',
    'https://cismankit.github.io/The-Age-of-Emergent-Intelligence/',
    '',
    '© ProjectX · The Age of Emergent Intelligence',
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'my-emergence-blueprint.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function EmergenceBlueprint() {
  const [data, setData] = useState<BlueprintData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved) as BlueprintData;
    } catch {
      /* ignore */
    }
    return {
      conductorRole: '',
      keyUseCase: '',
      firstAgent: '',
      memorySolution: '',
      feedbackLoop: '',
      humanRole: '',
      nextStep: '',
      createdAt: new Date().toISOString(),
    };
  });

  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const filled = Object.values(data).filter(
    (v, i) => i < QUESTIONS.length && String(v).trim().length > 0,
  ).length;

  const update = (key: keyof BlueprintData, value: string) => {
    const next = { ...data, [key]: value };
    setData(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(true);
      setTimeout(() => setSaved(false), 1400);
    } catch {
      /* storage unavailable */
    }
  };

  const reset = () => {
    const blank: BlueprintData = {
      conductorRole: '',
      keyUseCase: '',
      firstAgent: '',
      memorySolution: '',
      feedbackLoop: '',
      humanRole: '',
      nextStep: '',
      createdAt: new Date().toISOString(),
    };
    setData(blank);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  // Persist on mount if pre-existing data
  useEffect(() => {
    if (filled > 0) setExpanded(true);
  }, []);

  return (
    <div className="card-elevated overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-4 bg-gradient-to-r from-amber-500/10 to-violet-500/8 px-6 py-5 text-left transition hover:from-amber-500/15 hover:to-violet-500/12"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/15 ring-1 ring-amber-500/25">
            <Sparkles size={17} className="text-amber-600" />
          </span>
          <div>
            <p className="font-display text-base font-medium text-[var(--color-ink)]">
              My Emergence Blueprint
            </p>
            <p className="text-xs text-[var(--color-muted)]">
              {filled}/{QUESTIONS.length} fields filled · auto-saved to this browser
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Progress ring */}
          <svg viewBox="0 0 32 32" className="h-8 w-8 -rotate-90" aria-hidden>
            <circle cx="16" cy="16" r="13" fill="none" stroke="var(--color-border)" strokeWidth="3" />
            <circle
              cx="16"
              cy="16"
              r="13"
              fill="none"
              stroke={filled === QUESTIONS.length ? '#047857' : '#d97706'}
              strokeWidth="3"
              strokeDasharray={`${(filled / QUESTIONS.length) * 81.68} 81.68`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <span className="text-xs font-mono text-[var(--color-muted)]">
            {expanded ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-[var(--color-border)] px-6 pb-6 pt-5">
          <p className="mb-5 text-sm leading-relaxed text-[var(--color-slate)]">
            Fill this in as you read — or all at once at the end. Your answers live in your browser.
            Download a copy to keep.
          </p>

          <div className="space-y-4">
            {QUESTIONS.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label
                  htmlFor={`bp-${key}`}
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {label}
                </label>
                <textarea
                  id={`bp-${key}`}
                  rows={2}
                  placeholder={placeholder}
                  value={data[key as keyof BlueprintData] as string}
                  onChange={(e) => update(key as keyof BlueprintData, e.target.value)}
                  className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-paper)] px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder-[var(--color-muted)]/60 outline-none transition focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-[0.65rem] uppercase tracking-wider transition ${saved ? 'text-emerald-600' : 'text-[var(--color-muted)]'}`}
              >
                {saved ? '✓ saved' : 'auto-save on'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] px-3.5 py-2 text-xs font-medium text-[var(--color-slate)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <RefreshCw size={12} />
                Reset
              </button>
              <button
                onClick={() => downloadBlueprint(data)}
                className="inline-flex items-center gap-1.5 rounded-md bg-[var(--color-ink)] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[var(--color-ink)]/85"
              >
                <Download size={13} />
                Download Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
