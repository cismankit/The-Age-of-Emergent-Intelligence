# CEO Roadmap — The Age of Emergent Intelligence

> **ProjectX · Emergence Field Guide**
> Last updated: June 2026 · Living document — update as milestones ship

---

## Vision in one sentence

Become the defining interactive field guide for multi-agent AI — the resource developers, founders, and curious minds turn to before building their first agent system.

---

## Competitive Landscape

| Competitor | Strength | Gap we fill |
|---|---|---|
| **LangChain / LangGraph Docs** | Exhaustive API reference; used by devs | Zero narrative. No emergence theory. Code-first, human-last |
| **Anthropic Agent Guides** | Authoritative on Claude; clear architecture patterns | Single-vendor view; no multi-system reasoning; no simulations |
| **CrewAI** | Good "crew" mental model; rising community | Framework-locked; no theory of emergence; no interactivity |
| **AutoGen / Microsoft** | Research depth; multi-agent orchestration | Academic; impenetrable to non-engineers; no story-first approach |
| **Simon Willison** | Brilliant practitioner writing; trusted voice | Personal blog, not structured curriculum; no simulations |
| **Emergence (us)** | **Story + simulation + framework + human voice + emergence theory** | **None of the above combine all five** |

**Our moat:** We teach the *why* behind agent behavior with cinematic narrative + touchable simulations. Everyone else teaches *how to configure a framework*.

---

---

## Product Clarification (read this first)

**Emergence (robotbod.ai) is NOT an "AI employee" SaaS.** It is a free, visual, interactive field guide to multi-agent AI — 25 chapters, live simulations, practical frameworks. ProjectX kits (Experience Kit, Exo Bot Kit) are future paid learning products, not a generic workforce automation platform.

External critiques that compare us to HappyRobot, GetBOB, etc. apply a **category template** that largely misapplies here. We adopt valid lessons (clarity, SEO, performance) without becoming generic SaaS copy.

---

## Lanes & Acceptance Criteria

### Lane 1 — Founder decisions
| Item | Done when |
|---|---|
| Customize `/about` bio, photo, social links | Real name, photo, and working links live on site |
| Google Search Console | `site:robotbod.ai` returns homepage (founder verifies) |
| Kit URLs & email backend | ConvertKit/Beehiiv wired; kit pages capture to backend |
| Real proof metrics | At least one metric or testimonial with `available: true` in `proof.ts` |

### Lane 2 — Copy & positioning
| Item | Done when |
|---|---|
| Homepage 10-second clarity | Above fold states: free field guide · builders/students/founders · conduct many agents · Start Reading CTA |
| No AI-employee SaaS language | No "cut support costs 70%" or workforce-automation framing on homepage/hero |
| Chapter reader tone | Progress shows section dots, not "Book p. X of 126" anxiety |

### Lane 3 — Engineering ✅ (June 2026 pass)
| Item | Done when |
|---|---|
| Continuous scroll reader | Hero+story, insight+diagram, framework+reflect merged; simulation as Lab section; no standalone Opening page |
| Sticky section nav | Story · System · Framework · Lab tabs; j/k scroll sections, h/l change chapters |
| Desktop layout | md+ content ~70% width; collapsible framework sidebar |
| Ch. 1 interactive intro | `AgentCompareIntro` — click 1 vs 5 agents before/during hero |
| SEO package | `robots.txt`, `sitemap.xml`, OG tags, JSON-LD Book schema in `index.html` |
| ProofModule | Config-driven `proof.ts`; honest "coming soon" empty state on About |
| Performance | Simulations lazy-loaded via `React.lazy`; build passes |

---

## Phase Roadmap

### Phase 0 — Foundation ✅ (Shipped)
- [x] 25-chapter structure across 6 Parts
- [x] React reader with snap-scroll landing
- [x] 12 live simulations (now 25 — all chapters have sims)
- [x] EmergenceField canvas (interactive particle network)
- [x] Support / Zelle / crypto donation page
- [x] GitHub Pages deployment

### Phase 1 — Human Face + Living Artifact ✅ (Complete)
Priority: make the guide feel made by a *person*, not a system.

- [x] **CEO / founder About page** (`/about`) — origin story, human voice
- [x] **ROADMAP.md** — this document
- [x] **Experience Kit** placeholder landing (`/kits/experience`) — with working email waitlist
- [x] **Exo Bot Kit** placeholder landing (`/kits/exo-bot`) — with working email waitlist
- [x] **"My Emergence Blueprint"** — localStorage export from final chapter / hero CTA
- [x] **Keyboard navigation** — Arrow keys + J/K/H/L page turning in reader
- [x] **Per-chapter SEO titles** — `document.title` updates while reading
- [x] **First-visit nav hint** — overlay teaching swipe / keyboard / tap-zone navigation
- [x] **Reflection question note-saving** — auto-saves to localStorage
- [x] **Chapter-complete chip** — banner on the final page of each chapter
- [x] **ContentsDrawer progress awareness** — "in progress" icon + saved page link
- [x] **og:image** — 1200×630 SVG social card at `/og-image.svg` + Open Graph + Twitter card meta
- [x] **Narrow mobile tap zones** — reduced from 22% → 13% width to cut accidental page turns
- [x] **Auto-moving pages fixed** — removed duplicate keyboard handler from useSwipeNavigation (was causing every keypress to navigate two pages); increased swipe threshold to 80px with 2× horizontal dominance requirement
- [x] **Reduced page count** — consolidated 8–10 pages per chapter → 4–5 (title · scene+story · insight+diagram · framework+reflect · [simulation] · [finale])
- [x] **Scroll reader redesign** — continuous scroll within chapter; sticky section nav (Story · System · Framework · Lab); section-based progress; framework sidebar on md+
- [x] **Chapter 1 interactive intro** — `AgentCompareIntro` (1 agent vs 5 agents canvas)
- [x] **Homepage clarity pass** — free field guide identity badge; audience + outcome above fold; removed "126 pages" stat
- [x] **SEO package** — `robots.txt`, `sitemap.xml`, canonical + JSON-LD Book schema
- [x] **ProofModule** — config-driven social proof with honest empty state
- [x] **Kit email waitlist** — working localStorage email capture on both kit pages

### Phase 2 — Cinematic Simulations (Q3 2026)
Priority: move from procedural placeholders to art-directed scenes.

- [x] **ScenePlaceholder honest labeling** — now clearly marked "Generative plate · Interactive" instead of implying Fable 5 cinema
- [ ] Commission Fable 5 / Midjourney cinematic scene for each of the 25 chapters
- [ ] Replace `ScenePlaceholder` components with actual rendered artwork
- [ ] Add parallax depth to scene images in the reader
- [ ] Animate system diagrams (nodes light up as the narrative progresses)

### Phase 3 — Complete Interactivity ✅ (All chapters now have simulations)
Priority: closed the 13-simulation gap (previously 12/25; now 25/25).

- [x] Ch 5: CAS — feedback simulation (adaptive network under pressure)
- [x] Ch 8: Agent loop — agents simulation (perceive-reason-act)
- [x] Ch 10: Tools — agents simulation (tool call vs. hallucination)
- [x] Ch 11: Planning — feedback simulation (plan-execute-replan)
- [x] Ch 12: Reflection/GCR — feedback simulation (generate-critique-revise)
- [x] Ch 13: Recursive improvement — emergence simulation (meta-improvement loop)
- [x] Ch 17: Governance — hierarchy simulation (rules enforcement)
- [x] Ch 19: Human-in-the-Loop — agents simulation (human oversight checkpoint)
- [x] Ch 20: Amplification — feedback simulation (amplification vs. dependency spiral)
- [x] Ch 21: Identity & Authority — hierarchy simulation (delegation chains)
- [x] Ch 22: Alignment — emergence simulation (alignment drift)
- [x] Ch 23: Ecosystem growth — network simulation (agent ecosystem graph)
- [x] Ch 24: OS maturity — emergence simulation (system stabilization)

### Phase 4 — Product + Monetization (Q4 2026)
- [x] **Kit email waitlist** — localStorage capture on both kit landing pages; plug in ConvertKit/Beehiiv when ready
- [ ] **Experience Kit** (paid or donation-gated): curated multi-week learning journey with worksheets, prompts, and community access
- [ ] **Exo Bot Kit** (paid): agent scaffolding starter + video walkthrough + private Discord
- [ ] PDF companion (50–80 pages) for offline reading
- [ ] YouTube companion series (25 videos, one per chapter)
- [ ] Link kits from Chapter 25 finale page

### Phase 5 — Scale + Community (2027) — Deferred
The following are intentionally deferred until reader volume justifies the infrastructure cost:

- [ ] Reader profiles: save progress across devices (currently localStorage only)
- [ ] Community annotation layer (highlight + comment)
- [ ] Guest chapters from practitioners (Simon Willison, Swyx, etc.)
- [ ] Localization: Spanish, Portuguese, Mandarin
- [ ] Audiobook (narrative sections)
- [ ] Email newsletter integration (Resend / ConvertKit / Beehiiv at scale)

*Rationale: Community infrastructure before audience creates ghost towns. Ship Phase 4 and grow the reader base first.*

---

## Product Links (placeholder — update when launched)

| Product | Status | URL |
|---|---|---|
| Experience Kit | Waitlist open | `https://robotbod.ai/kits/experience` |
| Exo Bot Kit | Waitlist open | `https://robotbod.ai/kits/exo-bot` |
| Email List | Collected via kit pages | — [Plug in ConvertKit/Beehiiv] |
| Discord | Planned | — [CUSTOMIZE] |

---

## Key Metrics to Track

- Monthly unique readers
- Chapter completion rate (% who reach Ch 25)
- Simulation engagement rate (interactions per chapter page)
- Blueprint export count (our "living with something" metric)
- Kit waitlist size (currently stored in reader's localStorage — wire to backend when ready)

---

## What the Founder Must Customize

- [ ] Replace `[CUSTOMIZE]` in `/about` page with real bio, photo URL, social links
- [ ] Add real Experience Kit URL when product launches
- [ ] Add real Exo Bot Kit URL when product launches
- [ ] Set up email list backend (Resend / ConvertKit / Beehiiv) — kit pages are ready to accept form submissions; replace `localStorage` with a real API call in `KitComingSoonPage.tsx`'s `WaitlistForm`
- [ ] Add Discord / community link once community exists

---

*"Intelligence emerges from relationships between agents, memory, tools, feedback loops, and environments."*
*— The thesis. Build the product that proves it.*
