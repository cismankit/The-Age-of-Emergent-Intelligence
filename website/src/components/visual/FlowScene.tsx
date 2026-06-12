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
    const pointer = { x: -9999, y: -9999, active: false };

    // Luminous orbs — slow drifting pools of light that give the scene depth
    interface Orb { x: number; y: number; r: number; dx: number; dy: number; phase: number; bright: boolean }
    let orbs: Orb[] = [];

    const seedOrbs = () => {
      const count = 5 + Math.floor(rand() * 4);
      orbs = Array.from({ length: count }, () => ({
        x: rand() * width,
        y: rand() * height,
        r: 18 + rand() * Math.min(width, height) * 0.16,
        dx: (rand() - 0.5) * 0.18,
        dy: (rand() - 0.5) * 0.14,
        phase: rand() * Math.PI * 2,
        bright: rand() > 0.55,
      }));
    };

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
      const count = Math.max(90, Math.min(260, Math.round((width * height) / 2900)));
      particles = Array.from({ length: count }, () => spawn());
      seedOrbs();

      // Pre-develop the painting so it never appears blank on arrival
      const warmup = reduceMotion ? 240 : 80;
      for (let i = 0; i < warmup; i++) stepOnce(true);
    };

    const drawOrbs = () => {
      ctx.globalCompositeOperation = 'lighter';
      for (const o of orbs) {
        const pulse = 0.7 + 0.3 * Math.sin(t * 0.0012 + o.phase);
        const glow = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * pulse);
        glow.addColorStop(0, `${palette.accent}${o.bright ? '2e' : '1c'}`);
        glow.addColorStop(0.55, `${palette.accent}10`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Bright core — the "memory orb" itself
        if (o.bright) {
          const core = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, 5 + pulse * 3);
          core.addColorStop(0, 'rgba(255,255,255,0.85)');
          core.addColorStop(0.4, `${palette.accentSoft}99`);
          core.addColorStop(1, 'transparent');
          ctx.fillStyle = core;
          ctx.beginPath();
          ctx.arc(o.x, o.y, 5 + pulse * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        o.x += o.dx + Math.sin(t * 0.0008 + o.phase) * 0.08;
        o.y += o.dy + Math.cos(t * 0.0009 + o.phase) * 0.06;
        if (o.x < -o.r) o.x = width + o.r;
        if (o.x > width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = height + o.r;
        if (o.y > height + o.r) o.y = -o.r;
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const stepOnce = (skipFade = false) => {
      t += 16;

      if (!skipFade) {
        // Whisper-fade toward the base so trails stay luminous but alive
        ctx.globalAlpha = 0.03;
        paintBase();
        ctx.globalAlpha = 1;
      }

      drawOrbs();

      // Additive trails — light accumulates where currents converge
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        let angle = fieldAngle(p.x, p.y, t);
        // The reader's hand bends the currents
        if (pointer.active) {
          const dx = pointer.x - p.x, dy = pointer.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 170 && d > 4) {
            const w = (1 - d / 170) * 0.55;
            const toward = Math.atan2(dy, dx);
            angle = angle * (1 - w) + toward * w;
          }
        }
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        p.life++;

        const fade = Math.sin(Math.min(1, p.life / p.maxLife) * Math.PI);
        const isWhite = p.hueShift > 0.78;
        ctx.strokeStyle = isWhite ? '#ffffff' : p.hueShift > 0.4 ? palette.accentSoft : palette.accent;
        ctx.globalAlpha = (isWhite ? 0.22 : 0.3) * fade;
        ctx.lineWidth = p.hueShift > 0.92 ? 2 : p.hueShift > 0.6 ? 1.3 : 0.9;
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
      ctx.globalCompositeOperation = 'source-over';
    };

    let running = false;
    const loop = () => {
      stepOnce();
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      // Burst: a cluster of fresh currents springs from the tap
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const n = Math.min(40, particles.length);
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        const a = (i / n) * Math.PI * 2;
        const d = rand() * 24;
        p.x = x + Math.cos(a) * d;
        p.y = y + Math.sin(a) * d;
        p.px = p.x;
        p.py = p.y;
        p.life = 0;
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // Animate only while visible — saves the frame budget for the page being read
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: '80px' },
    );
    io.observe(canvas);

    if (!reduceMotion) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
      canvas.addEventListener('pointerdown', onDown);
    }

    return () => {
      stop();
      observer.disconnect();
      io.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('pointerdown', onDown);
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
