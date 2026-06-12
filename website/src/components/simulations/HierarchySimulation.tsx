import { useEffect, useRef, useState } from 'react';

export function HierarchySimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [infoLoss, setInfoLoss] = useState(0.3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    let pulse = 0;
    let animId: number;

    const nodes = [
      { x: W / 2, y: 40, label: 'CEO', level: 0 },
      { x: W / 3, y: 120, label: 'Eng Lead', level: 1 },
      { x: (2 * W) / 3, y: 120, label: 'Mkt Lead', level: 1 },
      { x: W / 4, y: 200, label: 'Worker', level: 2 },
      { x: W / 2, y: 200, label: 'Worker', level: 2 },
      { x: (3 * W) / 4, y: 200, label: 'Worker', level: 2 },
    ];

    const edges = [
      [0, 1], [0, 2], [1, 3], [1, 4], [2, 5],
    ];

    const draw = () => {
      pulse += 0.03;
      ctx.fillStyle = '#0f1419';
      ctx.fillRect(0, 0, W, H);

      const direction = Math.sin(pulse) > 0 ? 'down' : 'up';
      const t = (Math.sin(pulse) + 1) / 2;

      edges.forEach(([from, to]) => {
        const n1 = nodes[from];
        const n2 = nodes[to];
        const isDown = n1.level < n2.level;
        const active = (direction === 'down' && isDown) || (direction === 'up' && !isDown);

        ctx.strokeStyle = active ? 'rgba(96, 165, 250, 0.6)' : 'rgba(100, 116, 139, 0.2)';
        ctx.lineWidth = active ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.stroke();

        if (active) {
          const mx = n1.x + (n2.x - n1.x) * t;
          const my = n1.y + (n2.y - n1.y) * t;
          const detail = isDown ? 1 - infoLoss : 1;
          ctx.beginPath();
          ctx.arc(mx, my, 3 + detail * 3, 0, Math.PI * 2);
          ctx.fillStyle = isDown ? '#60a5fa' : '#34d399';
          ctx.fill();
        }
      });

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = n.level === 0 ? '#f472b6' : n.level === 1 ? '#a78bfa' : '#60a5fa';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '9px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 3);
      });

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(
        direction === 'down'
          ? `Directive flowing down (detail: ${((1 - infoLoss) * 100).toFixed(0)}%)`
          : `Summary flowing up (compressed: ${(infoLoss * 100).toFixed(0)}% lost)`,
        10,
        H - 10,
      );

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [infoLoss]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <canvas ref={canvasRef} width={500} height={240} className="w-full rounded-lg" />
      <label className="mt-4 flex items-center gap-2 text-sm">
        Information loss per level: {(infoLoss * 100).toFixed(0)}%
        <input type="range" min={0} max={0.8} step={0.05} value={infoLoss} onChange={(e) => setInfoLoss(Number(e.target.value))} className="w-32" />
      </label>
    </div>
  );
}
