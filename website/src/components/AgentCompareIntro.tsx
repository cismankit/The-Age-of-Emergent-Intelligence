import { useEffect, useRef, useState } from 'react';

type Mode = 'solo' | 'team';

interface NodePos {
  x: number;
  y: number;
  vx: number;
  vy: number;
  label: string;
  isAgent: boolean;
  isOverloaded?: boolean;
}

const TASKS = ['Research', 'Build', 'QA', 'Launch', 'Support'];
const AGENT_LABELS = ['A1', 'A2', 'A3', 'A4', 'A5'];
const COLORS = ['#f59e0b', '#10b981', '#6d28d9', '#ef4444', '#3b82f6'];

function AgentCanvas({
  mode,
  width,
  height,
  active,
}: {
  mode: Mode;
  width: number;
  height: number;
  active: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rawCtx = canvas.getContext('2d');
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const cx = width / 2;
    const cy = height / 2;
    const r = Math.min(width, height) * 0.32;

    // Task nodes in a ring
    const taskNodes: NodePos[] = TASKS.map((label, i) => {
      const angle = (i / TASKS.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        label,
        isAgent: false,
      };
    });

    // Agent nodes
    const agentNodes: NodePos[] =
      mode === 'solo'
        ? [{ x: cx, y: cy, vx: 0, vy: 0, label: 'AI', isAgent: true, isOverloaded: true }]
        : AGENT_LABELS.map((label, i) => {
            const angle = (i / AGENT_LABELS.length) * Math.PI * 2 - Math.PI / 2;
            const ar = r * 0.45;
            return {
              x: cx + ar * Math.cos(angle),
              y: cy + ar * Math.sin(angle),
              vx: (Math.random() - 0.5) * 0.15,
              vy: (Math.random() - 0.5) * 0.15,
              label,
              isAgent: true,
            };
          });

    function draw(ts: number) {
      ctx.clearRect(0, 0, width, height);
      timeRef.current = ts * 0.001;
      const t = timeRef.current;

      // Subtle drift
      const allNodes = [...agentNodes, ...taskNodes];
      for (const n of allNodes) {
        if (n.isAgent && mode === 'solo') continue; // center stays
        n.x += n.vx;
        n.y += n.vy;
        // Gentle pull back to ring position
        const angle = allNodes.indexOf(n) / TASKS.length * Math.PI * 2 - Math.PI / 2;
        const tr = n.isAgent ? r * 0.45 : r;
        const tx = cx + tr * Math.cos(angle);
        const ty = cy + tr * Math.sin(angle);
        n.vx += (tx - n.x) * 0.012;
        n.vy += (ty - n.y) * 0.012;
        n.vx *= 0.92;
        n.vy *= 0.92;
      }

      // Draw connections
      taskNodes.forEach((task, i) => {
        const agent = mode === 'solo' ? agentNodes[0] : agentNodes[i];
        if (!agent) return;

        const pulse = mode === 'solo'
          ? Math.abs(Math.sin(t * 3 + i)) * 0.6 + 0.2
          : Math.abs(Math.sin(t * 1.5 + i * 1.2)) * 0.3 + 0.5;

        const color = COLORS[i];

        ctx.beginPath();
        ctx.moveTo(task.x, task.y);
        ctx.lineTo(agent.x, agent.y);
        ctx.strokeStyle = color + Math.round(pulse * 200).toString(16).padStart(2, '0');
        ctx.lineWidth = mode === 'solo' ? 1.5 : 2;
        if (mode === 'solo') {
          ctx.setLineDash([4, 5]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Traveling dot on connection
        const progress = ((t * (mode === 'solo' ? 1.8 : 0.9) + i * 0.3) % 1);
        const dx = agent.x - task.x;
        const dy = agent.y - task.y;
        ctx.beginPath();
        ctx.arc(
          task.x + dx * progress,
          task.y + dy * progress,
          mode === 'solo' ? 2.5 : 3,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = color + 'cc';
        ctx.fill();
      });

      // Draw agent nodes
      agentNodes.forEach((node) => {
        const shake = node.isOverloaded ? Math.sin(t * 18) * 2 : 0;
        const nx = node.x + shake;
        const ny = node.y + (node.isOverloaded ? Math.cos(t * 22) * 1.5 : 0);
        const nr = mode === 'solo' ? 22 : 14;

        // Outer glow
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * 2.5);
        const glow = mode === 'solo' ? 'rgba(180,83,9,' : 'rgba(16,185,129,';
        grad.addColorStop(0, glow + '0.25)');
        grad.addColorStop(1, glow + '0)');
        ctx.beginPath();
        ctx.arc(nx, ny, nr * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Main circle
        ctx.beginPath();
        ctx.arc(nx, ny, nr, 0, Math.PI * 2);
        ctx.fillStyle = mode === 'solo' ? '#b45309' : '#059669';
        ctx.fill();

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${mode === 'solo' ? 11 : 9}px "IBM Plex Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, nx, ny);
      });

      // Draw task nodes
      taskNodes.forEach((node, i) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[i] + '22';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS[i] + '88';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = COLORS[i];
        ctx.font = '7.5px "IBM Plex Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label.toUpperCase(), node.x, node.y);
      });

      // Status text
      ctx.font = '600 10px "IBM Plex Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      if (mode === 'solo') {
        ctx.fillStyle = '#b45309cc';
        ctx.fillText('CONTEXT OVERFLOW', cx, 10);
      } else {
        ctx.fillStyle = '#059669cc';
        ctx.fillText('COORDINATED SYSTEM', cx, 10);
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    if (active) {
      frameRef.current = requestAnimationFrame(draw);
    } else {
      // Single static frame
      draw(0);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [mode, width, height, active]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} aria-hidden />;
}

export function AgentCompareIntro() {
  const [mode, setMode] = useState<Mode>('solo');
  const [seen, setSeen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 320, h: 220 });

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(() => {
      const w = Math.floor(el.offsetWidth / 2) - 8;
      setDims({ w: Math.max(140, w), h: Math.max(180, Math.round(w * 0.72)) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-start when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSeen(true); },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="mb-8 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      {/* Header */}
      <div className="border-b border-[var(--color-border-subtle)] px-4 py-3 flex items-center justify-between gap-3">
        <p className="label-caps">Interactive · Try it</p>
        <p className="text-xs text-[var(--color-muted)] hidden sm:block">
          One agent overwhelmed vs. five coordinated agents
        </p>
      </div>

      {/* Canvas pair */}
      <div className="flex gap-0 divide-x divide-[var(--color-border-subtle)]">
        {/* Solo */}
        <button
          className={`flex-1 flex flex-col items-center gap-0 transition-all cursor-pointer group ${
            mode === 'solo' ? 'bg-amber-50/60' : 'hover:bg-[var(--color-border-subtle)]/30'
          }`}
          onClick={() => setMode('solo')}
          aria-label="Show solo agent (overwhelmed)"
          aria-pressed={mode === 'solo'}
        >
          <div className="w-full flex items-center justify-between px-3 pt-2 pb-1">
            <span className={`font-mono text-[0.6875rem] font-semibold uppercase tracking-wider ${
              mode === 'solo' ? 'text-amber-700' : 'text-[var(--color-muted)]'
            }`}>
              1 Agent
            </span>
            {mode === 'solo' && (
              <span className="font-mono text-[0.6rem] text-amber-600 uppercase tracking-wider animate-pulse">
                ● active
              </span>
            )}
          </div>
          <AgentCanvas mode="solo" width={dims.w} height={dims.h} active={seen && mode === 'solo'} />
          <p className={`text-[0.6875rem] text-center px-3 pb-2 leading-tight ${
            mode === 'solo' ? 'text-amber-700' : 'text-[var(--color-muted)]'
          }`}>
            {mode === 'solo' ? 'Context splits — quality collapses' : 'Click to see failure mode'}
          </p>
        </button>

        {/* Team */}
        <button
          className={`flex-1 flex flex-col items-center gap-0 transition-all cursor-pointer ${
            mode === 'team' ? 'bg-emerald-50/60' : 'hover:bg-[var(--color-border-subtle)]/30'
          }`}
          onClick={() => setMode('team')}
          aria-label="Show agent team (coordinated)"
          aria-pressed={mode === 'team'}
        >
          <div className="w-full flex items-center justify-between px-3 pt-2 pb-1">
            <span className={`font-mono text-[0.6875rem] font-semibold uppercase tracking-wider ${
              mode === 'team' ? 'text-emerald-700' : 'text-[var(--color-muted)]'
            }`}>
              5 Agents
            </span>
            {mode === 'team' && (
              <span className="font-mono text-[0.6rem] text-emerald-600 uppercase tracking-wider animate-pulse">
                ● active
              </span>
            )}
          </div>
          <AgentCanvas mode="team" width={dims.w} height={dims.h} active={seen && mode === 'team'} />
          <p className={`text-[0.6875rem] text-center px-3 pb-2 leading-tight ${
            mode === 'team' ? 'text-emerald-700' : 'text-[var(--color-muted)]'
          }`}>
            {mode === 'team' ? 'Each agent owns one task fully' : 'Click to see coordination'}
          </p>
        </button>
      </div>

      {/* Toggle CTA */}
      <div className="border-t border-[var(--color-border-subtle)] px-4 py-2.5 flex items-center justify-between">
        <p className="text-xs text-[var(--color-muted)]">
          {mode === 'solo'
            ? 'One AI holds 5 task contexts simultaneously — attention fractures'
            : 'Each specialist holds one context deeply — coordination emerges'}
        </p>
        <button
          onClick={() => setMode(m => m === 'solo' ? 'team' : 'solo')}
          className="shrink-0 ml-3 rounded-lg px-3 py-1.5 text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-paper)] text-[var(--color-ink)] transition hover:bg-[var(--color-border-subtle)]"
        >
          {mode === 'solo' ? 'See 5 agents →' : '← See 1 agent'}
        </button>
      </div>
    </div>
  );
}
