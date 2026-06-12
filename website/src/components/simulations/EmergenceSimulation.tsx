import { useEffect, useRef } from 'react';

export function EmergenceSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'a' | 'b';
    }

    const particles: Particle[] = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      type: i % 2 === 0 ? 'a' : 'b',
    }));

    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 20, 25, 0.15)';
      ctx.fillRect(0, 0, W, H);

      particles.forEach((p, i) => {
        // Simple rule: same type attracts weakly, opposite repels
        particles.forEach((other, j) => {
          if (i === j) return;
          const dx = other.x - p.x;
          const dy = other.y - p.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 40 && d > 0) {
            const force = p.type === other.type ? 0.02 : -0.03;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        });

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'a' ? '#60a5fa' : '#f472b6';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <canvas ref={canvasRef} width={500} height={300} className="w-full rounded-lg" />
      <p className="mt-2 text-xs text-[var(--color-slate)]">
        Two agent types with simple attraction/repulsion rules. Watch clustering patterns emerge—no agent knows the global plan.
      </p>
    </div>
  );
}
