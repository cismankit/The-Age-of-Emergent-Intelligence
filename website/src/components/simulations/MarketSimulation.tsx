import { useEffect, useRef, useState } from 'react';

export function MarketSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [agentCount, setAgentCount] = useState(8);
  const [resourceScarcity, setResourceScarcity] = useState(0.4);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const resources = Math.max(1, Math.floor(agentCount * resourceScarcity));

    interface Bid {
      agent: number;
      amount: number;
      y: number;
      won: boolean;
    }

    let bids: Bid[] = [];
    let frame = 0;
    let animId: number;
    let clearingPrice = 0;

    const draw = () => {
      frame++;
      if (frame % 90 === 0) {
        bids = Array.from({ length: agentCount }, (_, i) => ({
          agent: i,
          amount: 20 + Math.random() * 80,
          y: 40 + i * ((H - 80) / agentCount),
          won: false,
        }));
        bids.sort((a, b) => b.amount - a.amount);
        bids.forEach((b, i) => { b.won = i < resources; });
        clearingPrice = bids[resources - 1]?.amount ?? 0;
      }

      ctx.fillStyle = '#0f1419';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Resources: ${resources} / ${agentCount} agents`, 10, 20);
      ctx.fillText(`Clearing price: ${clearingPrice.toFixed(0)}`, 10, 36);

      bids.forEach((bid) => {
        const barW = (bid.amount / 100) * (W - 120);
        ctx.fillStyle = bid.won ? '#34d399' : '#475569';
        ctx.fillRect(100, bid.y, barW, 16);
        ctx.fillStyle = '#fff';
        ctx.font = '10px sans-serif';
        ctx.fillText(`Agent ${bid.agent}`, 10, bid.y + 12);
        ctx.fillText(bid.amount.toFixed(0), 105 + barW, bid.y + 12);
      });

      if (clearingPrice > 0) {
        const lineX = 100 + (clearingPrice / 100) * (W - 120);
        ctx.strokeStyle = '#fbbf24';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(lineX, 30);
        ctx.lineTo(lineX, H - 10);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [agentCount, resourceScarcity]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <canvas ref={canvasRef} width={500} height={280} className="w-full rounded-lg" />
      <div className="mt-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          Agents: {agentCount}
          <input type="range" min={4} max={16} value={agentCount} onChange={(e) => setAgentCount(Number(e.target.value))} className="w-24" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Scarcity: {(resourceScarcity * 100).toFixed(0)}%
          <input type="range" min={0.1} max={0.9} step={0.05} value={resourceScarcity} onChange={(e) => setResourceScarcity(Number(e.target.value))} className="w-24" />
        </label>
      </div>
    </div>
  );
}
