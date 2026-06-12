import { useEffect, useRef } from 'react';

interface Props {
  /** Hex colors for particles. */
  colors?: string[];
  /** RGB triplet for connection lines, e.g. "245, 158, 11". */
  linkRgb?: string;
  /** Particles per 10,000 px². */
  density?: number;
  /** Base drift speed in px/frame. */
  speed?: number;
  /** Max link distance in px. */
  linkDist?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  phase: number;
}

/**
 * A living particle network — agents drifting, linking when near,
 * gently reacting to the pointer. Original generative art; the visual
 * thesis of the book rendered as a background.
 */
export function EmergenceField({
  colors = ['#fbbf24', '#a78bfa', '#60a5fa', '#f4f1ea'],
  linkRgb = '217, 119, 6',
  density = 0.6,
  speed = 0.25,
  linkDist = 120,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const seedParticles = () => {
      const count = Math.max(24, Math.min(110, Math.round((width * height * density) / 10000)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        r: 1 + Math.random() * 1.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      if (reduceMotion) drawFrame();
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Links first, under the nodes
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.35;
            ctx.strokeStyle = `rgba(${linkRgb}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        const pulse = 0.65 + 0.35 * Math.sin(t * 0.02 + p.phase);
        ctx.globalAlpha = pulse;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      t++;
      for (const p of particles) {
        // Gentle curl drift so motion feels organic, not linear
        p.vx += Math.sin(t * 0.004 + p.phase) * 0.004;
        p.vy += Math.cos(t * 0.005 + p.phase * 1.3) * 0.004;

        // Pointer: soft attraction within range — the field notices you
        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 4) {
            const force = ((180 - dist) / 180) * 0.012;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Speed cap keeps the field calm
        const v = Math.hypot(p.vx, p.vy);
        const cap = speed * 2.2;
        if (v > cap) {
          p.vx = (p.vx / v) * cap;
          p.vy = (p.vy / v) * cap;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      drawFrame();
      raf = requestAnimationFrame(step);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    if (!reduceMotion) {
      raf = requestAnimationFrame(step);
      canvas.parentElement?.addEventListener('pointermove', onPointerMove);
      canvas.parentElement?.addEventListener('pointerleave', onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.parentElement?.removeEventListener('pointermove', onPointerMove);
      canvas.parentElement?.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [colors, linkRgb, density, speed, linkDist]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
