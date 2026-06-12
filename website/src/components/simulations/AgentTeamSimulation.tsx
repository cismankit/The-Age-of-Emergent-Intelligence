import { useEffect, useRef, useState } from 'react';

const AGENTS = ['CEO', 'Research', 'Builder', 'QA', 'Marketing'];
const COLORS = ['#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];

export function AgentTeamSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [commCost, setCommCost] = useState(0.2);
  const [missingAgent, setMissingAgent] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const centerX = W / 2;
    const centerY = H / 2;
    const radius = 100;

    const positions = AGENTS.map((_, i) => {
      const angle = (i / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });

    let messagePhase = 0;
    let animId: number;

    const draw = () => {
      messagePhase += 0.02;
      ctx.fillStyle = '#0f1419';
      ctx.fillRect(0, 0, W, H);

      // Messages between agents
      for (let i = 0; i < AGENTS.length; i++) {
        if (i === missingAgent) continue;
        const next = (i + 1) % AGENTS.length;
        if (next === missingAgent) continue;

        const p1 = positions[i];
        const p2 = positions[next];
        const t = (messagePhase + i * 0.2) % 1;

        if (Math.random() > commCost) {
          const mx = p1.x + (p2.x - p1.x) * t;
          const my = p1.y + (p2.y - p1.y) * t;
          ctx.beginPath();
          ctx.arc(mx, my, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
        }

        ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      AGENTS.forEach((name, i) => {
        const pos = positions[i];
        const isMissing = i === missingAgent;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, isMissing ? 15 : 22, 0, Math.PI * 2);
        ctx.fillStyle = isMissing ? 'rgba(100,100,100,0.3)' : COLORS[i];
        ctx.fill();

        if (!isMissing) {
          ctx.fillStyle = '#fff';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(name, pos.x, pos.y + 4);
        } else {
          ctx.fillStyle = '#666';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('OFFLINE', pos.x, pos.y + 4);
        }
      });

      // Progress bar
      const activeAgents = AGENTS.length - (missingAgent !== null ? 1 : 0);
      const progress = Math.min(1, (activeAgents / AGENTS.length) * (1 - commCost * 0.5));
      ctx.fillStyle = '#334155';
      ctx.fillRect(20, H - 30, W - 40, 12);
      ctx.fillStyle = progress > 0.6 ? '#34d399' : progress > 0.3 ? '#fbbf24' : '#ef4444';
      ctx.fillRect(20, H - 30, (W - 40) * progress, 12);
      ctx.fillStyle = '#fff';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Project completion: ${(progress * 100).toFixed(0)}%`, W / 2 - 50, H - 34);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [commCost, missingAgent]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <canvas ref={canvasRef} width={500} height={300} className="w-full rounded-lg" />
      <div className="mt-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          Comm cost: {(commCost * 100).toFixed(0)}%
          <input type="range" min={0} max={0.8} step={0.05} value={commCost} onChange={(e) => setCommCost(Number(e.target.value))} className="w-24" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Remove agent:
          <select
            value={missingAgent ?? ''}
            onChange={(e) => setMissingAgent(e.target.value === '' ? null : Number(e.target.value))}
            className="rounded border px-2 py-1 text-sm"
          >
            <option value="">None</option>
            {AGENTS.map((a, i) => (
              <option key={i} value={i}>{a}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
