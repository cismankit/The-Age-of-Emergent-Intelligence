import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Sparkles, Hammer, ArrowLeft, BookOpen, Mail, CheckCircle2, AlertCircle } from 'lucide-react';

const kits = {
  experience: {
    icon: Sparkles,
    color: 'amber',
    name: 'Experience Kit',
    tagline: 'Turn every chapter into a practice session',
    description:
      'A curated multi-week learning journey with worksheets, prompts, guided simulations, and community access — designed so the ideas in the guide become tools you actually use.',
    features: [
      'Printable chapter worksheets for every part',
      'Curated AI prompts that walk you through each framework',
      'Guided simulation challenges with reflection scaffolding',
      'Private community access for readers building agent systems',
    ],
    accent: 'amber',
  },
  'exo-bot': {
    icon: Hammer,
    color: 'violet',
    name: 'Exo Bot Kit',
    tagline: 'Build your first autonomous agent — with guidance',
    description:
      'An agent scaffolding starter pack with boilerplate code, architecture templates, a video walkthrough, and private Discord access — designed for readers ready to ship after Part VI.',
    features: [
      'Production-ready multi-agent scaffold (Python + TypeScript)',
      'Architecture templates for every pattern in the book',
      'Step-by-step video walkthrough of the ProjectX Blueprint',
      'Private Discord for kit owners to share builds and get feedback',
    ],
    accent: 'violet',
  },
};

type KitSlug = keyof typeof kits;

function WaitlistForm({ slug, accent }: { slug: string; accent: string }) {
  const storageKey = `emergence-waitlist-${slug}`;
  const saved = (() => {
    try { return localStorage.getItem(storageKey) ?? ''; } catch { return ''; }
  })();

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>(saved ? 'success' : 'idle');
  const [savedEmail] = useState(saved);

  const isAmber = accent === 'amber';
  const accentClass = isAmber ? 'border-amber-500 ring-amber-500/30' : 'border-violet-500 ring-violet-500/30';
  const btnClass = isAmber
    ? 'bg-amber-500 hover:bg-amber-600 text-white'
    : 'bg-violet-500 hover:bg-violet-600 text-white';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      return;
    }
    try {
      localStorage.setItem(storageKey, trimmed);
    } catch { /* ignore */ }
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5">
        <CheckCircle2 size={18} className={isAmber ? 'text-amber-500 shrink-0 mt-0.5' : 'text-violet-500 shrink-0 mt-0.5'} />
        <div>
          <p className="text-sm font-medium text-[var(--color-ink)]">You're on the list</p>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">
            {savedEmail || email} — we'll email you when it launches. No spam, ever.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }}
          className={`flex-1 rounded-lg border bg-[var(--color-paper)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted)] outline-none transition focus:ring-2 ${
            status === 'error' ? 'border-red-400 ring-red-400/30' : `border-[var(--color-border)] focus:${accentClass}`
          }`}
          aria-label="Email address"
        />
        <button
          type="submit"
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${btnClass}`}
        >
          Notify me
        </button>
      </div>
      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />
          Please enter a valid email address.
        </p>
      )}
      <p className="text-xs text-[var(--color-muted)]">Saved to this device only. One email when it launches.</p>
    </form>
  );
}

export function KitComingSoonPage() {
  const { slug } = useParams<{ slug: string }>();
  const kit = kits[slug as KitSlug];

  if (!kit) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-[var(--color-muted)]">Kit not found.</p>
        <Link to="/" className="mt-4 inline-block text-[var(--color-accent)]">
          Back to home
        </Link>
      </div>
    );
  }

  const Icon = kit.icon;
  const isAmber = kit.accent === 'amber';

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        to="/"
        className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--color-slate)] transition hover:text-[var(--color-ink)]"
      >
        <ArrowLeft size={15} />
        Back to guide
      </Link>

      {/* Badge */}
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-wider ${
          isAmber
            ? 'border-amber-300/30 bg-amber-400/10 text-amber-600'
            : 'border-violet-300/30 bg-violet-400/10 text-violet-600'
        }`}
      >
        <Icon size={10} />
        Coming soon
      </span>

      <h1 className="font-display mt-5 text-4xl font-medium leading-tight text-[var(--color-ink)] md:text-5xl">
        {kit.name}
      </h1>
      <p className="mt-3 text-xl text-[var(--color-slate)]">{kit.tagline}</p>

      <p className="mt-6 text-base leading-relaxed text-[var(--color-slate)]">{kit.description}</p>

      {/* Features */}
      <ul className="mt-8 space-y-3">
        {kit.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span
              className={`mt-1 h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-white text-[0.5rem] font-bold ${
                isAmber ? 'bg-amber-500' : 'bg-violet-500'
              }`}
            >
              ✓
            </span>
            <span className="text-[var(--color-ink)]">{f}</span>
          </li>
        ))}
      </ul>

      {/* Email CTA */}
      <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-muted)]">
            <Mail size={18} className="text-[var(--color-accent)]" />
          </span>
          <div>
            <p className="font-medium text-[var(--color-ink)]">Get notified when it launches</p>
            <p className="text-sm text-[var(--color-muted)]">No spam. One email when it's ready.</p>
          </div>
        </div>
        <WaitlistForm slug={slug ?? 'kit'} accent={kit.accent} />
      </div>

      {/* Read in the meantime */}
      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
        <Link
          to="/chapter/1/p/0"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-ink)]/90"
        >
          <BookOpen size={15} />
          Read the guide while you wait
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-paper)]"
        >
          Browse all chapters
        </Link>
      </div>
    </div>
  );
}
