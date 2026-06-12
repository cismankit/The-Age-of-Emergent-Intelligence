import type { DiagramNode, DiagramEdge } from '../types';

const nodeStyles: Record<string, { fill: string; stroke: string; text: string }> = {
  human: { fill: '#ffe4e6', stroke: '#fb7185', text: '#9f1239' },
  agent: { fill: '#dbeafe', stroke: '#60a5fa', text: '#1e40af' },
  system: { fill: '#ede9fe', stroke: '#a78bfa', text: '#5b21b6' },
  tool: { fill: '#fef3c7', stroke: '#fbbf24', text: '#92400e' },
  memory: { fill: '#d1fae5', stroke: '#34d399', text: '#065f46' },
  environment: { fill: '#f1f5f9', stroke: '#94a3b8', text: '#334155' },
};

interface Props {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

function layoutNodes(nodes: DiagramNode[]) {
  const cols = Math.min(nodes.length, 3);
  const rows = Math.ceil(nodes.length / cols);
  const nodeW = 130;
  const nodeH = 44;
  const gapX = 48;
  const gapY = 72;
  const width = cols * nodeW + (cols - 1) * gapX + 40;
  const height = rows * nodeH + (rows - 1) * gapY + 40;

  const positions: Record<string, { x: number; y: number }> = {};
  nodes.forEach((node, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    positions[node.id] = {
      x: 20 + col * (nodeW + gapX) + nodeW / 2,
      y: 20 + row * (nodeH + gapY) + nodeH / 2,
    };
  });

  return { positions, width, height, nodeW, nodeH };
}

export function SystemDiagram({ nodes, edges }: Props) {
  const { positions, width, height, nodeW, nodeH } = layoutNodes(nodes);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-slate)]">
        System Diagram
      </h3>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="mx-auto w-full max-w-2xl"
          role="img"
          aria-label="System architecture diagram"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>

          {edges.map((edge, i) => {
            const from = positions[edge.from];
            const to = positions[edge.to];
            if (!from || !to) return null;

            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 12;

            return (
              <g key={i}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    className="fill-blue-600 text-[10px] font-medium"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {nodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;
            const style = nodeStyles[node.type] ?? nodeStyles.system;
            const x = pos.x - nodeW / 2;
            const y = pos.y - nodeH / 2;

            return (
              <g key={node.id}>
                <rect
                  x={x}
                  y={y}
                  width={nodeW}
                  height={nodeH}
                  rx={8}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="2"
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill={style.text}
                  className="text-[11px] font-semibold"
                >
                  {node.label.length > 18 ? node.label.slice(0, 16) + '…' : node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-4">
        {Object.entries(nodeStyles).map(([type, style]) => {
          if (!nodes.some((n) => n.type === type)) return null;
          return (
            <span key={type} className="flex items-center gap-1.5 text-xs text-[var(--color-slate)]">
              <span
                className="inline-block h-3 w-3 rounded border-2"
                style={{ backgroundColor: style.fill, borderColor: style.stroke }}
              />
              {type}
            </span>
          );
        })}
      </div>
    </div>
  );
}
