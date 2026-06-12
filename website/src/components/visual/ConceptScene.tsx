import { useEffect, useRef } from 'react';
import { FlowScene, type ScenePalette } from './FlowScene';

/**
 * Visual motifs — each one is a different generative algorithm that
 * embodies a concept from the book. The chapter's content decides
 * which algorithm paints its plates, so no two chapters feel templated.
 */
export type Motif =
  | 'flow' // turbulent currents — adaptation, contact with reality
  | 'network' // nodes linking — societies, teams, coordination
  | 'swarm' // flocking boids — collective intelligence, markets
  | 'lattice' // cellular automaton — emergence from simple rules
  | 'ripple' // propagating signals — feedback, reflection, influence
  | 'orbit' // bodies in orbit — memory, partnership, ecosystems
  | 'branch'; // recursive growth — planning, tools, self-improvement

interface Props {
  motif: Motif;
  seed: number;
  palette: ScenePalette;
  className?: string;
}

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

export function ConceptScene({ motif, seed, palette, className = '' }: Props) {
  if (motif === 'flow') {
    return <FlowScene seed={seed} palette={palette} className={className} />;
  }
  return <MotifCanvas motif={motif} seed={seed} palette={palette} className={className} />;
}

function MotifCanvas({ motif, seed, palette, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rand = makeRandom(seed * 7919 + 23);

    let width = 0;
    let height = 0;
    let raf = 0;
    let frame = 0;

    const paintBase = (alpha = 1) => {
      ctx.globalAlpha = alpha;
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, palette.from);
      g.addColorStop(0.5, palette.via);
      g.addColorStop(1, palette.to);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
      const glow = ctx.createRadialGradient(
        width * 0.3, height * 0.35, 0,
        width * 0.3, height * 0.35, Math.max(width, height) * 0.6,
      );
      glow.addColorStop(0, `${palette.accent}26`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    };

    const softDot = (x: number, y: number, r: number, core: string, halo: string) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, core);
      g.addColorStop(0.5, halo);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    let step: () => void = () => {};
    let init: () => void = () => {};

    /* ───────────────────────── network ───────────────────────── */
    if (motif === 'network') {
      interface Node { x: number; y: number; dx: number; dy: number; r: number; bright: boolean }
      interface Pulse { a: number; b: number; t: number }
      let nodes: Node[] = [];
      let pulses: Pulse[] = [];

      init = () => {
        const count = 22 + Math.floor(rand() * 14);
        nodes = Array.from({ length: count }, () => ({
          x: rand() * width,
          y: rand() * height,
          dx: (rand() - 0.5) * 0.32,
          dy: (rand() - 0.5) * 0.28,
          r: 1.6 + rand() * 2.2,
          bright: rand() > 0.7,
        }));
        pulses = [];
      };

      step = () => {
        paintBase();
        const maxD = Math.min(width, height) * 0.32;
        ctx.globalCompositeOperation = 'lighter';

        for (const n of nodes) {
          n.x += n.dx; n.y += n.dy;
          if (n.x < 0 || n.x > width) n.dx *= -1;
          if (n.y < 0 || n.y > height) n.dy *= -1;
        }
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < maxD) {
              ctx.strokeStyle = palette.accentSoft;
              ctx.globalAlpha = (1 - d / maxD) * 0.4;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
        for (const n of nodes) {
          softDot(n.x, n.y, n.bright ? 14 : 8,
            n.bright ? 'rgba(255,255,255,0.9)' : `${palette.accentSoft}cc`,
            `${palette.accent}40`);
        }
        // Messages travelling the links
        if (frame % 26 === 0 && pulses.length < 6) {
          const a = Math.floor(rand() * nodes.length);
          let b = Math.floor(rand() * nodes.length);
          if (b === a) b = (b + 1) % nodes.length;
          pulses.push({ a, b, t: 0 });
        }
        pulses = pulses.filter((p) => p.t <= 1);
        for (const p of pulses) {
          p.t += 0.016;
          const a = nodes[p.a], b = nodes[p.b];
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          softDot(x, y, 6, 'rgba(255,255,255,0.95)', `${palette.accent}66`);
        }
        ctx.globalCompositeOperation = 'source-over';
      };
    }

    /* ───────────────────────── swarm ───────────────────────── */
    if (motif === 'swarm') {
      interface Boid { x: number; y: number; vx: number; vy: number; white: boolean }
      let boids: Boid[] = [];

      init = () => {
        const count = 56 + Math.floor(rand() * 30);
        boids = Array.from({ length: count }, () => {
          const a = rand() * Math.PI * 2;
          return {
            x: rand() * width, y: rand() * height,
            vx: Math.cos(a) * 1.1, vy: Math.sin(a) * 1.1,
            white: rand() > 0.8,
          };
        });
      };

      step = () => {
        paintBase(0.16);
        ctx.globalCompositeOperation = 'lighter';
        const R = Math.min(width, height) * 0.14;
        for (const b of boids) {
          let cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, n = 0;
          for (const o of boids) {
            if (o === b) continue;
            const d = Math.hypot(o.x - b.x, o.y - b.y);
            if (d < R) {
              cx += o.x; cy += o.y; ax += o.vx; ay += o.vy; n++;
              if (d < R * 0.32 && d > 0) {
                sx += (b.x - o.x) / d; sy += (b.y - o.y) / d;
              }
            }
          }
          if (n > 0) {
            b.vx += ((cx / n - b.x) * 0.0014) + ((ax / n - b.vx) * 0.04) + sx * 0.05;
            b.vy += ((cy / n - b.y) * 0.0014) + ((ay / n - b.vy) * 0.04) + sy * 0.05;
          }
          const sp = Math.hypot(b.vx, b.vy) || 1;
          const cl = Math.min(1.7, Math.max(0.9, sp));
          b.vx = (b.vx / sp) * cl; b.vy = (b.vy / sp) * cl;
          b.x += b.vx; b.y += b.vy;
          if (b.x < -10) b.x = width + 10; if (b.x > width + 10) b.x = -10;
          if (b.y < -10) b.y = height + 10; if (b.y > height + 10) b.y = -10;

          ctx.strokeStyle = b.white ? '#ffffff' : palette.accentSoft;
          ctx.globalAlpha = b.white ? 0.5 : 0.42;
          ctx.lineWidth = b.white ? 1.6 : 1.1;
          ctx.beginPath();
          ctx.moveTo(b.x - b.vx * 5, b.y - b.vy * 5);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      };
    }

    /* ───────────────────────── lattice (Game of Life) ───────────────────────── */
    if (motif === 'lattice') {
      let cols = 0, rows = 0, cell = 24;
      let alive: Uint8Array = new Uint8Array(0);
      let bright: Float32Array = new Float32Array(0);

      const reseed = () => {
        for (let i = 0; i < alive.length; i++) alive[i] = rand() < 0.3 ? 1 : 0;
      };

      init = () => {
        cell = Math.max(18, Math.min(30, Math.round(Math.min(width, height) / 16)));
        cols = Math.ceil(width / cell);
        rows = Math.ceil(height / cell);
        alive = new Uint8Array(cols * rows);
        bright = new Float32Array(cols * rows);
        reseed();
      };

      const evolve = () => {
        const next = new Uint8Array(cols * rows);
        let pop = 0;
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            let n = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (!dx && !dy) continue;
                n += alive[((y + dy + rows) % rows) * cols + ((x + dx + cols) % cols)];
              }
            }
            const i = y * cols + x;
            next[i] = alive[i] ? (n === 2 || n === 3 ? 1 : 0) : n === 3 ? 1 : 0;
            pop += next[i];
          }
        }
        alive = next;
        if (pop < cols * rows * 0.04) reseed();
      };

      step = () => {
        if (frame % 16 === 0) evolve();
        paintBase();
        ctx.globalCompositeOperation = 'lighter';
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = y * cols + x;
            bright[i] += ((alive[i] ? 1 : 0) - bright[i]) * 0.07;
            const b = bright[i];
            if (b < 0.03) continue;
            const px = x * cell, py = y * cell, pad = cell * 0.16;
            ctx.fillStyle = palette.accent;
            ctx.globalAlpha = b * 0.34;
            ctx.beginPath();
            ctx.roundRect(px + pad, py + pad, cell - pad * 2, cell - pad * 2, 3);
            ctx.fill();
            if (b > 0.75) {
              softDot(px + cell / 2, py + cell / 2, cell * 0.42,
                'rgba(255,255,255,0.5)', `${palette.accentSoft}33`);
            }
          }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      };
    }

    /* ───────────────────────── ripple ───────────────────────── */
    if (motif === 'ripple') {
      interface Emitter { x: number; y: number; period: number; offset: number }
      interface Ring { x: number; y: number; r: number; max: number }
      let emitters: Emitter[] = [];
      let rings: Ring[] = [];

      init = () => {
        const count = 3 + Math.floor(rand() * 3);
        emitters = Array.from({ length: count }, () => ({
          x: width * (0.15 + rand() * 0.7),
          y: height * (0.18 + rand() * 0.64),
          period: 110 + Math.floor(rand() * 70),
          offset: Math.floor(rand() * 160),
        }));
        rings = [];
      };

      step = () => {
        paintBase();
        ctx.globalCompositeOperation = 'lighter';
        const maxR = Math.min(width, height) * 0.55;
        for (const e of emitters) {
          if ((frame + e.offset) % e.period === 0) {
            rings.push({ x: e.x, y: e.y, r: 2, max: maxR * (0.6 + rand() * 0.4) });
          }
          const pulse = 0.6 + 0.4 * Math.sin((frame + e.offset) * 0.05);
          softDot(e.x, e.y, 9 * pulse, 'rgba(255,255,255,0.9)', `${palette.accent}55`);
        }
        rings = rings.filter((r) => r.r < r.max);
        for (const r of rings) {
          r.r += 1.1;
          const fade = 1 - r.r / r.max;
          ctx.strokeStyle = palette.accentSoft;
          ctx.globalAlpha = fade * 0.5;
          ctx.lineWidth = 1.4 + fade;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      };
    }

    /* ───────────────────────── orbit ───────────────────────── */
    if (motif === 'orbit') {
      interface Body { ring: number; angle: number; speed: number; r: number; bright: boolean }
      let ringRadii: number[] = [];
      let bodies: Body[] = [];
      let cx = 0, cy = 0;

      init = () => {
        cx = width * (0.4 + rand() * 0.2);
        cy = height * (0.42 + rand() * 0.16);
        const ringCount = 3 + Math.floor(rand() * 3);
        const base = Math.min(width, height);
        ringRadii = Array.from({ length: ringCount }, (_, i) =>
          base * (0.14 + (i / ringCount) * 0.34 + rand() * 0.04));
        bodies = [];
        ringRadii.forEach((_, ring) => {
          const n = 1 + Math.floor(rand() * 3);
          for (let k = 0; k < n; k++) {
            bodies.push({
              ring,
              angle: rand() * Math.PI * 2,
              speed: (0.0035 + rand() * 0.003) * (rand() > 0.5 ? 1 : -1) / (1 + ring * 0.5),
              r: 2.5 + rand() * 3.5,
              bright: rand() > 0.45,
            });
          }
        });
      };

      step = () => {
        paintBase(0.12);
        ctx.globalCompositeOperation = 'lighter';
        const pulse = 0.75 + 0.25 * Math.sin(frame * 0.02);
        softDot(cx, cy, 30 * pulse, 'rgba(255,255,255,0.85)', `${palette.accent}50`);
        for (const r of ringRadii) {
          ctx.strokeStyle = palette.accentSoft;
          ctx.globalAlpha = 0.1;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        for (const b of bodies) {
          b.angle += b.speed;
          const x = cx + Math.cos(b.angle) * ringRadii[b.ring];
          const y = cy + Math.sin(b.angle) * ringRadii[b.ring];
          softDot(x, y, b.r * 4,
            b.bright ? 'rgba(255,255,255,0.95)' : `${palette.accentSoft}dd`,
            `${palette.accent}45`);
        }
        ctx.globalCompositeOperation = 'source-over';
      };
    }

    /* ───────────────────────── branch ───────────────────────── */
    if (motif === 'branch') {
      interface Seg { x1: number; y1: number; x2: number; y2: number; depth: number; order: number; tip: boolean }
      let segs: Seg[] = [];
      let grown = 0;
      let hold = 0;
      const maxDepth = 8;

      const grow = (x: number, y: number, angle: number, len: number, depth: number, order: { n: number }) => {
        const x2 = x + Math.cos(angle) * len;
        const y2 = y + Math.sin(angle) * len;
        const isTip = depth >= maxDepth || len < 7;
        segs.push({ x1: x, y1: y, x2, y2, depth, order: order.n++, tip: isTip });
        if (isTip) return;
        const split = rand() > 0.18 ? 2 : 3;
        for (let i = 0; i < split; i++) {
          const spread = 0.32 + rand() * 0.4;
          const na = angle + (i - (split - 1) / 2) * spread + (rand() - 0.5) * 0.18;
          grow(x2, y2, na, len * (0.68 + rand() * 0.14), depth + 1, order);
        }
      };

      init = () => {
        segs = [];
        grown = 0;
        hold = 0;
        const order = { n: 0 };
        const roots = 1 + Math.floor(rand() * 2);
        for (let i = 0; i < roots; i++) {
          grow(
            width * (roots === 1 ? 0.5 : 0.3 + i * 0.4) + (rand() - 0.5) * width * 0.1,
            height + 4,
            -Math.PI / 2 + (rand() - 0.5) * 0.3,
            height * (0.2 + rand() * 0.08),
            0, order,
          );
        }
        segs.sort((a, b) => a.order - b.order);
        paintBase();
      };

      step = () => {
        ctx.globalCompositeOperation = 'lighter';
        if (grown < segs.length) {
          const batch = Math.max(1, Math.round(segs.length / 240));
          for (let i = 0; i < batch && grown < segs.length; i++, grown++) {
            const s = segs[grown];
            const w = Math.max(0.7, 4.4 - s.depth * 0.55);
            ctx.strokeStyle = s.depth < 2 ? palette.accentSoft : palette.accent;
            ctx.globalAlpha = 0.5;
            ctx.lineWidth = w;
            ctx.beginPath();
            ctx.moveTo(s.x1, s.y1);
            ctx.lineTo(s.x2, s.y2);
            ctx.stroke();
            if (s.tip) softDot(s.x2, s.y2, 7, 'rgba(255,255,255,0.8)', `${palette.accent}40`);
          }
          ctx.globalAlpha = 1;
        } else {
          // Fully grown — let the canopy breathe, then regrow a new plan
          hold++;
          if (hold % 5 === 0) {
            const tips = segs.filter((s) => s.tip);
            const s = tips[Math.floor(rand() * tips.length)];
            const pulse = 0.5 + rand() * 0.5;
            softDot(s.x2, s.y2, 9 * pulse, 'rgba(255,255,255,0.55)', `${palette.accentSoft}30`);
          }
          if (hold > 460) init();
        }
        ctx.globalCompositeOperation = 'source-over';
      };
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintBase();
      init();
      if (reduceMotion) {
        for (let i = 0; i < 320; i++) { frame++; step(); }
      }
    };

    const loop = () => {
      frame++;
      step();
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
  }, [motif, seed, palette]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
