import { Link } from 'react-router-dom';
import { ArrowRight, GitFork, ExternalLink, Heart, BookOpen } from 'lucide-react';
import { EmergenceField } from '../components/visual/EmergenceField';
import { ProofModule } from '../components/ProofModule';
import { getProofForKit } from '../data/proof';

// ── Social links ────────────────────────────────────────────────────
const SOCIAL = {
  github: 'https://github.com/cismankit',
  linkedin: 'https://www.linkedin.com/in/ankit-yadav-ji/',
};

// To use a custom photo: add website/public/founder.jpg and set PHOTO_URL to '/founder.jpg'
const PHOTO_URL = 'https://github.com/cismankit.png';

// [CUSTOMIZE] Replace with real product URLs when launched
const KIT_LINKS = {
  experienceKit: '/kits/experience',
  exoBotKit: '/kits/exo-bot',
};

export function AboutPage() {
  return (
    <div className="min-h-screen texture-paper bg-[var(--color-paper)]">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-25" />
        <EmergenceField density={0.3} speed={0.18} linkDist={110} />

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
        {/* Avatar */}
          <div className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-full border-2 border-amber-400/40 shadow-2xl">
            <img
              src={PHOTO_URL}
              alt="Ankit Yadav — founder of ProjectX"
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              style={{ display: 'none' }}
              className="h-full w-full items-center justify-center bg-gradient-to-br from-amber-500/20 to-violet-500/20 text-4xl font-display font-medium text-amber-400/80"
            >
              A
            </div>
          </div>

          <p className="label-caps mb-4 text-white/40">The person behind Emergence</p>
          <h1 className="font-display text-4xl font-medium leading-tight md:text-6xl">
            Ankit Yadav
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
            Security practitioner turned AI systems builder — obsessed with what happens when
            many minds cooperate.
          </p>

          {/* Social links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 transition hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <GitFork size={15} />
              GitHub
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm text-white/70 transition hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <ExternalLink size={15} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Origin story */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <p className="label-caps mb-6">Why I built this</p>

      <div className="space-y-6 text-[1.0625rem] leading-[1.85] text-[var(--color-ink)]">
          <p className="first-para">
            I kept watching the same thing happen. Someone would discover ChatGPT, or Claude, or
            Gemini — and their first instinct was to write a better prompt. To coax the single
            oracle into giving a better answer. To treat one AI like a smarter Google.
          </p>

          <p>
            That's not wrong. But it's incomplete. The real shift — the one that changes what you
            can build — happens when you stop asking <em>one</em> AI and start designing{' '}
            <em>systems</em> of agents that divide labor, accumulate memory, and check each other's
            work. When intelligence stops being a property of a model and starts being a behavior
            that <em>emerges</em> from relationships.
          </p>

          <p>
            Nobody was teaching that. Not in a way that felt human. The frameworks existed — in
            academic papers and GitHub READMEs and Discord threads — but the story was missing. The
            "why does this matter to me, right now, this week" was missing.
          </p>

          <p>
            I come from a security background — CISM certified, years in enterprise risk at EY,
            learning to think about systems that fail in unexpected ways. That training turned out
            to be the perfect lens for multi-agent AI: complex systems break not at their strongest
            node but at the weakest handoff. The gap between what agents <em>intend</em> and what
            they actually do under pressure. I recognized the failure modes immediately, because I'd
            spent years mapping them in a different domain.
          </p>

          <p>
            So I built Emergence. An illustrated field guide. Part book, part lab, part argument
            for a new kind of literacy. Twenty-five chapters that start with one AI hitting a wall
            and end with you knowing how to architect a mind from many.
          </p>

          <blockquote className="my-10 border-l-4 border-amber-500/60 pl-6 font-display text-xl italic text-[var(--color-accent)]">
            "Everyone teaches you to prompt one AI. Nobody teaches you to conduct many."
          </blockquote>

          <p>
            I am not an academic. I'm a builder. I've shipped products, navigated enterprise
            systems, watched AI go from novelty to infrastructure in real time. This guide is what
            I wish existed when I was trying to understand why my multi-agent experiments kept
            failing — and what made them work when they finally did.
          </p>

          <p>
            ProjectX started as a side project and became something I couldn't stop building.
            Because the more I taught it, the more I realized: this is the curriculum for the next
            decade. Not prompting. <em>Conducting.</em>
          </p>
        </div>
      </section>

      {/* What I'm building */}
      <section className="aurora bg-[var(--color-surface)]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="label-caps mb-3">What's coming next</p>
          <h2 className="font-display mb-10 text-3xl font-medium text-[var(--color-ink)] md:text-4xl">
            Emergence is just the beginning.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Experience Kit */}
            <a
              href={KIT_LINKS.experienceKit}
              className="group card-elevated block overflow-hidden p-6 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span className="label-caps mb-3 block text-amber-600">Coming soon</span>
              <h3 className="font-display mb-2 text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-accent)]">
                Experience Kit
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-slate)]">
                A curated learning journey for each chapter: printable worksheets, reflection
                prompts, team facilitation guides, and a week-by-week practice plan. For readers
                who want to <em>do</em> the book, not just read it.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] opacity-0 transition group-hover:opacity-100">
                Join the waitlist <ArrowRight size={13} />
              </span>
            </a>

            {/* Exo Bot Kit */}
            <a
              href={KIT_LINKS.exoBotKit}
              className="group card-elevated block overflow-hidden p-6 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <span className="label-caps mb-3 block text-violet-600">Coming soon</span>
              <h3 className="font-display mb-2 text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-violet)]">
                Exo Bot Kit
              </h3>
              <p className="text-sm leading-relaxed text-[var(--color-slate)]">
                A starter scaffold for your first autonomous agent — built on the architectures from
                Part VI. Includes code, walkthrough video, and access to a community of builders
                running their first multi-agent experiments.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-violet)] opacity-0 transition group-hover:opacity-100">
                Join the waitlist <ArrowRight size={13} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Proof / traction — honest empty state until real metrics */}
      <section className="mx-auto max-w-2xl px-6 py-16 border-t border-[var(--color-border-subtle)]">
        <ProofModule
          items={getProofForKit()}
          title="Proof & traction"
        />
      </section>

      {/* Philosophy */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <p className="label-caps mb-6">The philosophy</p>
        <div className="space-y-6 text-[1.0625rem] leading-[1.85] text-[var(--color-ink)]">
          <p>
            I believe the people who will define the next decade aren't the ones with the best
            prompts. They're the ones who understand emergence — who can look at a broken system
            and ask: what's the feedback loop that's missing? What memory structure would fix this?
            What would happen if we gave these agents different incentives?
          </p>
          <p>
            That's a design skill. It's learnable. And it requires a different kind of textbook —
            one that shows, simulates, and makes you feel the system before it asks you to build one.
          </p>
          <p>
            Emergence is free because intelligence should be accessible. The kits are how I keep
            the lights on and fund the artwork, the new chapters, and the next generation of
            builders who can't afford to pay.
          </p>
        </div>
      </section>

      {/* CTA footer */}
      <section className="relative overflow-hidden gradient-hero text-white">
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-20" />
        <EmergenceField density={0.25} speed={0.14} linkDist={100} />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display mb-5 text-3xl font-medium md:text-4xl">
            Start reading. It's free.
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-white/65">
            Twenty-five chapters. Six parts. Twenty-five live simulations. A curriculum for the people
            who will conduct agents, not just prompt them.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/chapter/1/p/0"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition hover:scale-[1.03] hover:bg-amber-50"
            >
              <BookOpen size={16} />
              Read Chapter 01
            </Link>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5"
            >
              <Heart size={15} />
              Support the Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
