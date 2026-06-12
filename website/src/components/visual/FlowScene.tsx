import { useEffect, useRef } from 'react';

export interface ScenePalette {
  from: string;
  via: string;
  to: string;
  accent: string;
  accentSoft: string;
}

interface Props {
  /** Deterministic seed — same seed always paints the same scene. */
  seed: number;
  palette: ScenePalette;
  className?: string;
}

/** Small deterministic PRNG (mulberry32). */
function makeRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface FlowParticle {
  x: number;
  y: number;
  px: number;
  py: number;
  speed: number;
  hueShift: number;
  life: number;
  maxLife: number;
}

/**
 * A seeded flow-field painting that keeps painting itself —
 * every chapter gets its own living artwork. Pure math, fully original.
 */
export function FlowScene({ seed, palette, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rand = makeRandom(seed * 7919 + 17);

    // Seeded field constants — what makes each chapter's painting unique
    const f1 = 0.8 + rand() * 2.2;
    const f2 = 0.6 + rand() * 1.8;
    const f3 = rand() * Math.PI * 2;
    const swirl = 0.6 + rand() * 2.4;
    const drift = rand() * 0.4;

    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;
    let particles: FlowParticle[] = [];

    const fieldAngle = (x: number, y: number, time: number) => {
      const nx = x / width;
      const ny = y / height;
      return (
        Math.sin(nx * f1 * Math.PI + f3 + time * 0.0008) * swirl +
        Math.cos(ny * f2 * Math.PI - f3 + time * 0.0011) * swirl +
        Math.sin((nx + ny) * 2.4 + time * 0.0006) * drift * Math.PI
      );
    };

    const spawn = (p?: FlowParticle): FlowParticle => {
      const fresh: FlowParticle = p ?? ({} as FlowParticle);
      fresh.x = rand() * width;
      fresh.y = rand() * height;
      fresh.px = fresh.x;
      fresh.py = fresh.y;
      fresh.speed = 0.4 + rand() * 1.1;
      fresh.hueShift = rand();
      fresh.life = 0;
      fresh.maxLife = 120 + rand() * 240;
      return fresh;
    };

    const paintBase = () => {
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, palette.from);
      g.addColorStop(0.5, palette.via);
      g.addColorStop(1, palette.to);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Soft glow pools
      const glow = ctx.createRadialGradient(
        width * 0.3, height * 0.35, 0,
        width * 0.3, height * 0.35, Math.max(width, height) * 0.6,
      );
      glow.addColorStop(0, `${palette.accent}30`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      paintBase();
      const count = Math.max(80, Math.min(240, Math.round((width * height) / 3200)));
      particles = Array.from({ length: count }, () => spawn());

      if (reduceMotion) {
        // Paint a finished static artwork: run the field forward silently
        for (let i = 0; i < 220; i++) stepOnce(true);
      }
    };

    const stepOnce = (skipFade = false) => {
      t += 16;

      if (!skipFade) {
        // Whisper-fade toward the base so trails stay luminous but alive
        ctx.globalAlpha = 0.025;
        paintBase();
        ctx.globalAlpha = 1;
      }

      for (const p of particles) {
        const angle = fieldAngle(p.x, p.y, t);
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        p.life++;

        const fade = Math.sin(Math.min(1, p.life / p.maxLife) * Math.PI);
        ctx.strokeStyle = p.hueShift > 0.72 ? '#ffffff' : palette.accentSoft;
        ctx.globalAlpha = 0.16 * fade + (p.hueShift > 0.72 ? 0.08 : 0);
        ctx.lineWidth = p.hueShift > 0.9 ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        if (
          p.life > p.maxLife ||
          p.x < -5 || p.x > width + 5 ||
          p.y < -5 || p.y > height + 5
        ) {
          spawn(p);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      stepOnce();
      raf = requestAnimationFrame(loop);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [seed, palette]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
