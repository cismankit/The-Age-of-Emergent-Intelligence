import { useEffect, useRef, useState } from 'react';

export function BoidsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cohesion, setCohesion] = useState(1);
  const [alignment, setAlignment] = useState(1);
  const [separation, setSeparation] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    interface Boid {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const boids: Boid[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }));

    let animId: number;

    const draw = () => {
      ctx.fillStyle = '#0f1419';
      ctx.fillRect(0, 0, W, H);

      boids.forEach((b, i) => {
        let cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, count = 0, sepCount = 0;
        const perception = 50;

        boids.forEach((other, j) => {
          if (i === j) return;
          const dx = other.x - b.x;
          const dy = other.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < perception) {
            cx += other.x;
            cy += other.y;
            ax += other.vx;
            ay += other.vy;
            count++;
            if (d < 20) {
              sx -= dx / d;
              sy -= dy / d;
              sepCount++;
            }
          }
        });

        if (count > 0) {
          cx = (cx / count - b.x) * 0.005 * cohesion;
          cy = (cy / count - b.y) * 0.005 * cohesion;
          ax = (ax / count - b.vx) * 0.05 * alignment;
          ay = (ay / count - b.vy) * 0.05 * alignment;
        }
        if (sepCount > 0) {
          sx = (sx / sepCount) * 0.1 * separation;
          sy = (sy / sepCount) * 0.1 * separation;
        }

        b.vx += cx + ax + sx;
        b.vy += cy + ay + sy;

        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        const maxSpeed = 4;
        if (speed > maxSpeed) {
          b.vx = (b.vx / speed) * maxSpeed;
          b.vy = (b.vy / speed) * maxSpeed;
        }

        b.x += b.vx;
        b.y += b.vy;
        if (b.x < 0) b.x = W;
        if (b.x > W) b.x = 0;
        if (b.y < 0) b.y = H;
        if (b.y > H) b.y = 0;

        const angle = Math.atan2(b.vy, b.vx);
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(angle);
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(-4, 3);
        ctx.lineTo(-4, -3);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [cohesion, alignment, separation]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <canvas ref={canvasRef} width={500} height={300} className="w-full rounded-lg" />
      <div className="mt-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          Cohesion: {cohesion.toFixed(1)}
          <input type="range" min={0} max={2} step={0.1} value={cohesion} onChange={(e) => setCohesion(Number(e.target.value))} className="w-20" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Alignment: {alignment.toFixed(1)}
          <input type="range" min={0} max={2} step={0.1} value={alignment} onChange={(e) => setAlignment(Number(e.target.value))} className="w-20" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          Separation: {separation.toFixed(1)}
          <input type="range" min={0} max={2} step={0.1} value={separation} onChange={(e) => setSeparation(Number(e.target.value))} className="w-20" />
        </label>
      </div>
    </div>
  );
}
