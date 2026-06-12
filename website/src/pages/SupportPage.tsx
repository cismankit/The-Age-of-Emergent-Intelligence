import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Heart, Landmark, Bitcoin, ArrowRight } from 'lucide-react';
import { supportConfig, zelleQrPayload } from '../data/support';

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 font-mono text-xs text-[var(--color-slate)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
    >
      {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export function SupportPage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Intro */}
        <div className="mb-14 text-center">
          <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent-muted)]/50">
            <Heart size={20} className="text-[var(--color-accent)]" />
          </span>
          <p className="label-caps mb-3">Support the Guide</p>
          <h1 className="font-display text-4xl font-medium text-[var(--color-ink)] md:text-5xl">
            Keep Emergence free for the next generation
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-slate)]">
            This field guide is free to read — for students, builders, and anyone curious about
            how intelligence emerges. If it taught you something, a donation of any size funds
            new chapters, real cinematic artwork, and keeps it open for readers who can't pay.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Zelle */}
          {supportConfig.zelle.enabled && (
            <section className="card-elevated overflow-hidden">
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
                  <Landmark size={16} className="text-[#6d1ed4]" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-medium text-[var(--color-ink)]">Zelle</h2>
                  <p className="text-xs text-[var(--color-muted)]">Instant, no fees, from any US bank app</p>
                </div>
              </div>
              <div className="flex flex-col items-center px-6 py-8">
                <div className="rounded-xl border border-[var(--color-border)] bg-white p-4">
                  <QRCodeSVG value={zelleQrPayload()} size={180} level="M" />
                </div>
                <p className="mt-5 text-center text-sm text-[var(--color-slate)]">
                  Scan with your banking app, or send directly to
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="rounded bg-[var(--color-paper)] px-3 py-1.5 font-mono text-sm text-[var(--color-ink)]">
                    {supportConfig.zelle.recipient}
                  </code>
                  <CopyButton value={supportConfig.zelle.recipient} />
                </div>
              </div>
            </section>
          )}

          {/* Crypto */}
          <section className="card-elevated overflow-hidden">
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-paper)] px-6 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)]">
                <Bitcoin size={16} className="text-[#f7931a]" />
              </span>
              <div>
                <h2 className="font-display text-lg font-medium text-[var(--color-ink)]">Crypto</h2>
                <p className="text-xs text-[var(--color-muted)]">Borderless — built for the next generation</p>
              </div>
            </div>
            <div className="divide-y divide-[var(--color-border-subtle)]">
              {supportConfig.crypto.map((coin) => (
                <div key={coin.symbol} className="flex items-center gap-4 px-6 py-4">
                  <div className="shrink-0 rounded-lg border border-[var(--color-border)] bg-white p-2">
                    <QRCodeSVG value={`${coin.uriPrefix}${coin.address}`} size={64} level="M" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-semibold text-[var(--color-ink)]">
                      <span className="h-2 w-2 rounded-full" style={{ background: coin.color }} />
                      {coin.name}
                      <span className="font-mono text-xs text-[var(--color-muted)]">{coin.symbol}</span>
                    </p>
                    <p className="mt-1 truncate font-mono text-xs text-[var(--color-slate)]">
                      {coin.address}
                    </p>
                  </div>
                  <CopyButton value={coin.address} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* What support funds */}
        <section className="mt-12 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-8">
          <p className="label-caps mb-5 text-center">Where It Goes</p>
          <div className="grid gap-6 text-center sm:grid-cols-3">
            {[
              { title: 'New chapters', desc: 'Expanding beyond the first 25 — deeper into agent ecosystems' },
              { title: 'Cinematic artwork', desc: 'Commissioned scene illustrations for every chapter' },
              { title: 'Free forever', desc: 'No paywall for students and the next generation of builders' },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-display text-lg font-medium text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-slate)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            to="/chapter/1/p/0"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-ink)] bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-ink)]/90"
          >
            Back to Reading
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
