import { useEffect, useRef, useState } from 'react';

export function FeedbackSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [feedbackGain, setFeedbackGain] = useState(0.5);
  const [balancing, setBalancing] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    let value = 50;
    const target = 50;
    const history: number[] = [];

    let animId: number;
    let frame = 0;

    const draw = () => {
      frame++;
      const noise = (Math.random() - 0.5) * 8;
      const error = target - value;
      const feedback = error * feedbackGain * 0.1;
      const balance = balancing ? -feedback * 0.3 : 0;
      value += feedback + balance + noise * 0.3;
      value = Math.max(0, Math.min(100, value));

      history.push(value);
      if (history.length > W) history.shift();

      ctx.fillStyle = '#0f1419';
      ctx.fillRect(0, 0, W, H);

      // Target line
      ctx.strokeStyle = '#34d399';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, H - (target / 100) * H);
      ctx.lineTo(W, H - (target / 100) * H);
      ctx.stroke();
      ctx.setLineDash([]);

      // History
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      history.forEach((v, i) => {
        const y = H - (v / 100) * H;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      });
      ctx.stroke();

      // Current value
      ctx.fillStyle = '#fbbf24';
      ctx.font = '14px monospace';
      ctx.fillText(`System: ${value.toFixed(1)}`, 10, 20);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [feedbackGain, balancing]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
      <canvas ref={canvasRef} width={500} height={200} className="w-full rounded-lg" />
      <div className="mt-4 flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm">
          Feedback gain: {feedbackGain.toFixed(2)}
          <input
            type="range"
            min={0.1}
            max={1.5}
            step={0.05}
            value={feedbackGain}
            onChange={(e) => setFeedbackGain(Number(e.target.value))}
            className="w-24"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={balancing}
            onChange={(e) => setBalancing(e.target.checked)}
          />
          Balancing loop active
        </label>
      </div>
      <p className="mt-2 text-xs text-[var(--color-slate)]">
        High gain without balancing → oscillation or runaway. Toggle balancing to stabilize.
      </p>
    </div>
  );
}
