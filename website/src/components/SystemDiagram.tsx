import type { DiagramNode, DiagramEdge } from '../types';

const nodeStyles: Record<
  string,
  { bg: string; border: string; text: string; dot: string }
> = {
  human: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-400/50',
    text: 'text-rose-200',
    dot: 'bg-rose-400',
  },
  agent: {
    bg: 'bg-sky-500/10',
    border: 'border-sky-400/50',
    text: 'text-sky-200',
    dot: 'bg-sky-400',
  },
  system: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-400/50',
    text: 'text-violet-200',
    dot: 'bg-violet-400',
  },
  tool: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/50',
    text: 'text-amber-200',
    dot: 'bg-amber-400',
  },
  memory: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/50',
    text: 'text-emerald-200',
    dot: 'bg-emerald-400',
  },
  environment: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-400/50',
    text: 'text-slate-200',
    dot: 'bg-slate-400',
  },
};

const typeLabels: Record<string, string> = {
  human: 'Human',
  agent: 'Agent',
  system: 'System',
  tool: 'Tool',
  memory: 'Memory',
  environment: 'Environment',
};

interface Props {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  compact?: boolean;
}

export function SystemDiagram({ nodes, edges, compact = false }: Props) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const cols = nodes.length <= 3 ? nodes.length : 3;

  return (
    <div className="panel-dark overflow-hidden">
      {!compact && (
        <div className="border-b border-[var(--color-panel-border)] px-6 py-4">
          <p className="label-caps text-white/40">System Architecture</p>
          <p className="mt-1 text-sm text-white/60">
            How agents, tools, and environments connect in this chapter
          </p>
        </div>
      )}

      <div className={`relative ${compact ? 'px-4 py-4' : 'px-6 py-8'}`}>
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-40" />

        <div
          className="relative grid gap-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {nodes.map((node) => {
            const style = nodeStyles[node.type] ?? nodeStyles.system;
            return (
              <div
                key={node.id}
                className={`rounded-lg border ${style.border} ${style.bg} px-4 py-3 text-center`}
              >
                <div className="mb-2 flex items-center justify-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                  <span className="font-mono text-[0.625rem] uppercase tracking-wider text-white/40">
                    {typeLabels[node.type] ?? node.type}
                  </span>
                </div>
                <p className={`text-sm font-medium ${style.text}`}>{node.label}</p>
              </div>
            );
          })}
        </div>

        {edges.length > 0 && (
          <div className={`relative space-y-2 border-t border-[var(--color-panel-border)] ${compact ? 'mt-4 pt-4' : 'mt-8 pt-6'}`}>
            {!compact && <p className="label-caps mb-4 text-white/35">Signal Flow</p>}
            {edges.map((edge, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-2.5 text-sm"
              >
                <span className="font-medium text-white/80">
                  {nodeMap[edge.from]?.label ?? edge.from}
                </span>
                <svg width="24" height="12" viewBox="0 0 24 12" className="shrink-0 text-amber-500/70">
                  <line x1="0" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.5" />
                  <polygon points="18,3 24,6 18,9" fill="currentColor" />
                </svg>
                {edge.label && (
                  <span className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-xs text-amber-300/90">
                    {edge.label}
                  </span>
                )}
                {edge.label && (
                  <svg width="24" height="12" viewBox="0 0 24 12" className="shrink-0 text-amber-500/70">
                    <line x1="0" y1="6" x2="18" y2="6" stroke="currentColor" strokeWidth="1.5" />
                    <polygon points="18,3 24,6 18,9" fill="currentColor" />
                  </svg>
                )}
                <span className="font-medium text-white/80">
                  {nodeMap[edge.to]?.label ?? edge.to}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 border-t border-[var(--color-panel-border)] px-6 py-3">
        {Object.entries(typeLabels).map(([type, label]) => {
          const style = nodeStyles[type];
          if (!nodes.some((n) => n.type === type)) return null;
          return (
            <span key={type} className="flex items-center gap-1.5 text-xs text-white/40">
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
