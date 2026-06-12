import { useEffect, useRef, useState } from 'react';

export function SwarmSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pheromoneStrength, setPheromoneStrength] = useState(50);
  const [agentCount, setAgentCount] = useState(30);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const target = { x: W * 0.8, y: H * 0.3 };
    const nest = { x: W * 0.15, y: H * 0.7 };

    interface Ant {
      x: number;
      y: number;
      angle: number;
      hasFood: boolean;
      speed: number;
    }

    const ants: Ant[] = Array.from({ length: agentCount }, () => ({
      x: nest.x + (Math.random() - 0.5) * 20,
      y: nest.y + (Math.random() - 0.5) * 20,
      angle: Math.random() * Math.PI * 2,
      hasFood: false,
      speed: 1.5 + Math.random(),
    }));

    const pheromones: { x: number; y: number; strength: number; toFood: boolean }[] = [];

    let animId: number;
    const draw = () => {
      ctx.fillStyle = '#0f1419';
      ctx.fillRect(0, 0, W, H);

      // Target (food)
      ctx.beginPath();
      ctx.arc(target.x, target.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();

      // Nest
      ctx.beginPath();
      ctx.arc(nest.x, nest.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();

      // Pheromone trails
      const decay = 0.995;
      for (let i = pheromones.length - 1; i >= 0; i--) {
        const p = pheromones[i];
        p.strength *= decay;
        if (p.strength < 0.05) {
          pheromones.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.toFood
          ? `rgba(251, 191, 36, ${p.strength * 0.3})`
          : `rgba(52, 211, 153, ${p.strength * 0.3})`;
        ctx.fill();
      }

      ants.forEach((ant) => {
        if (!ant.hasFood) {
          const dx = target.x - ant.x;
          const dy = target.y - ant.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 15) {
            ant.hasFood = true;
            ant.angle = Math.atan2(nest.y - ant.y, nest.x - ant.x);
          } else {
            // Follow pheromone to food
            let bestAngle = ant.angle + (Math.random() - 0.5) * 0.8;
            let bestStrength = 0;
            pheromones.forEach((p) => {
              if (!p.toFood) return;
              const pdx = p.x - ant.x;
              const pdy = p.y - ant.y;
              const pd = Math.sqrt(pdx * pdx + pdy * pdy);
              if (pd < 30 && p.strength > bestStrength) {
                bestStrength = p.strength;
                bestAngle = Math.atan2(pdy, pdx);
              }
            });
            ant.angle = ant.angle * 0.7 + bestAngle * 0.3 + (Math.random() - 0.5) * 0.3;
          }
        } else {
          const dx = nest.x - ant.x;
          const dy = nest.y - ant.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 15) {
            ant.hasFood = false;
            ant.angle = Math.atan2(target.y - ant.y, target.x - ant.x);
          } else {
            let bestAngle = ant.angle + (Math.random() - 0.5) * 0.5;
            let bestStrength = 0;
            pheromones.forEach((p) => {
              if (p.toFood) return;
              const pdx = p.x - ant.x;
              const pdy = p.y - ant.y;
              const pd = Math.sqrt(pdx * pdx + pdy * pdy);
              if (pd < 30 && p.strength > bestStrength) {
                bestStrength = p.strength;
                bestAngle = Math.atan2(pdy, pdx);
              }
            });
            ant.angle = ant.angle * 0.7 + bestAngle * 0.3;
          }
        }

        ant.x += Math.cos(ant.angle) * ant.speed;
        ant.y += Math.sin(ant.angle) * ant.speed;
        ant.x = Math.max(5, Math.min(W - 5, ant.x));
        ant.y = Math.max(5, Math.min(H - 5, ant.y));

        if (Math.random() < 0.3) {
          pheromones.push({
            x: ant.x,
            y: ant.y,
            strength: pheromoneStrength / 100,
            toFood: !ant.hasFood,
          });
        }

        ctx.beginPath();
        ctx.arc(ant.x, ant.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = ant.hasFood ? '#fbbf24' : '#60a5fa';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [agentCount, pheromoneStrength]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <canvas ref={canvasRef} width={500} height={300} className="w-full rounded-lg" />
      <div className="mt-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          Agents: {agentCount}
          <input
            type="range"
            min={10}
            max={60}
            value={agentCount}
            onChange={(e) => setAgentCount(Number(e.target.value))}
            className="w-24"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Pheromone: {pheromoneStrength}%
          <input
            type="range"
            min={10}
            max={100}
            value={pheromoneStrength}
            onChange={(e) => setPheromoneStrength(Number(e.target.value))}
            className="w-24"
          />
        </label>
      </div>
    </div>
  );
}
