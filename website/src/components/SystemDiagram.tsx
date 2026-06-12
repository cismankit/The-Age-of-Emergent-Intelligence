import type { DiagramNode, DiagramEdge } from '../types';

const nodeColors: Record<string, string> = {
  human: 'bg-rose-100 border-rose-400 text-rose-900',
  agent: 'bg-blue-100 border-blue-400 text-blue-900',
  system: 'bg-violet-100 border-violet-400 text-violet-900',
  tool: 'bg-amber-100 border-amber-400 text-amber-900',
  memory: 'bg-emerald-100 border-emerald-400 text-emerald-900',
  environment: 'bg-slate-100 border-slate-400 text-slate-900',
};

interface Props {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export function SystemDiagram({ nodes, edges }: Props) {
  const cols = Math.min(nodes.length, 3);
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-slate)]">
        System Diagram
      </h3>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`rounded-lg border-2 px-3 py-2 text-center text-sm font-medium ${nodeColors[node.type]}`}
          >
            {node.label}
          </div>
        ))}
      </div>
      {edges.length > 0 && (
        <div className="mt-4 space-y-1 border-t border-[var(--color-border)] pt-4">
          {edges.map((edge, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-[var(--color-slate)]">
              <span className="font-medium text-[var(--color-ink)]">
                {nodeMap[edge.from]?.label ?? edge.from}
              </span>
              <span className="text-[var(--color-accent)]">→</span>
              {edge.label && (
                <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                  {edge.label}
                </span>
              )}
              <span className="text-[var(--color-accent)]">→</span>
              <span className="font-medium text-[var(--color-ink)]">
                {nodeMap[edge.to]?.label ?? edge.to}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
