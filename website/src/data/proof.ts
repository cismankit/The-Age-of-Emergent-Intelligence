/**
 * Proof module data — config-driven for kit testimonials, usage stats, and
 * social proof. Currently in honest "early/coming soon" state.
 *
 * When real metrics / testimonials are available:
 *   1. Replace placeholder entries with real data
 *   2. Set `available: true` on the relevant proof items
 *   3. The ProofModule component renders honest empty state otherwise
 */

export type ProofType = 'metric' | 'testimonial' | 'milestone';

export interface ProofItem {
  type: ProofType;
  id: string;
  /** Set to false to show honest "coming soon" placeholder */
  available: boolean;
  /** For metrics: "1,200+" */
  value?: string;
  /** Label / headline */
  label: string;
  /** Supporting detail */
  detail?: string;
  /** Person name for testimonials */
  name?: string;
  /** Role / context for testimonials */
  role?: string;
  /** Kit slug this proof belongs to, or undefined for general */
  kitSlug?: string;
}

export const proofItems: ProofItem[] = [
  {
    id: 'readers',
    type: 'metric',
    available: false,
    value: undefined,
    label: 'Readers',
    detail: 'Monthly unique readers — will display once tracked',
  },
  {
    id: 'simulations-run',
    type: 'metric',
    available: false,
    value: undefined,
    label: 'Simulations run',
    detail: 'Interactive sim engagements — will display once tracked',
  },
  {
    id: 'blueprint-exports',
    type: 'metric',
    available: false,
    value: undefined,
    label: 'Blueprints exported',
    detail: '"Living with something" metric — exported emergence blueprints',
  },
  {
    id: 'testimonial-1',
    type: 'testimonial',
    available: false,
    label: 'Early reader',
    detail: 'Testimonial will appear here after first cohort completes the guide',
    name: undefined,
    role: undefined,
  },
  {
    id: 'experience-kit-waitlist',
    type: 'metric',
    available: false,
    value: undefined,
    label: 'Experience Kit waitlist',
    kitSlug: 'experience',
    detail: 'People waiting for the Experience Kit launch',
  },
  {
    id: 'exo-bot-waitlist',
    type: 'metric',
    available: false,
    value: undefined,
    label: 'Exo Bot Kit waitlist',
    kitSlug: 'exo-bot',
    detail: 'People waiting for the Exo Bot Kit launch',
  },
];

/** Filter proof items for a specific kit (or general if no slug) */
export function getProofForKit(kitSlug?: string): ProofItem[] {
  if (kitSlug) {
    return proofItems.filter((p) => p.kitSlug === kitSlug || !p.kitSlug);
  }
  return proofItems.filter((p) => !p.kitSlug);
}
