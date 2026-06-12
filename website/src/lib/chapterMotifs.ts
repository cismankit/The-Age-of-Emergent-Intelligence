import type { Motif } from '../components/visual/ConceptScene';

/**
 * Content-aware art direction: every chapter's plates are painted by the
 * generative algorithm that embodies its concept — cellular automata for
 * emergence, flocking for swarms, orbital systems for memory, recursive
 * trees for planning. The artwork *is* the idea.
 */
interface ChapterMotif {
  motif: Motif;
  /** What the plate depicts, in the caption's voice. */
  study: string;
}

const motifs: Record<number, ChapterMotif> = {
  1: { motif: 'orbit', study: 'a lone mind and its limits' }, // Why One AI Is Not Enough
  2: { motif: 'network', study: 'agents discovering each other' }, // Birth of Agent Societies
  3: { motif: 'lattice', study: 'order appearing from simple rules' }, // Emergence
  4: { motif: 'ripple', study: 'outputs feeding back as inputs' }, // Feedback Loops
  5: { motif: 'flow', study: 'a system reshaping under pressure' }, // Complex Adaptive Systems
  6: { motif: 'swarm', study: 'collective motion without a leader' }, // Networks, Swarms
  7: { motif: 'lattice', study: 'small rules, massive outcomes' }, // Small Rules
  8: { motif: 'orbit', study: 'perception and action in cycles' }, // What Is An Agent?
  9: { motif: 'orbit', study: 'memories held in orbit, some fading' }, // Memory
  10: { motif: 'branch', study: 'capability branching beyond language' }, // Tools
  11: { motif: 'branch', study: 'a goal decomposing into steps' }, // Planning
  12: { motif: 'ripple', study: 'work examined in its own reflection' }, // Reflection
  13: { motif: 'branch', study: 'improvement compounding on itself' }, // Recursive Improvement
  14: { motif: 'network', study: 'peers coordinating as equals' }, // Agent Teams
  15: { motif: 'orbit', study: 'command radiating from the center' }, // Agent Hierarchies
  16: { motif: 'swarm', study: 'competition allocating resources' }, // Agent Markets
  17: { motif: 'lattice', study: 'rules holding a society together' }, // Agent Governments
  18: { motif: 'flow', study: 'behavior nobody programmed' }, // Emergent Behavior
  19: { motif: 'network', study: 'a colleague woven into the team' }, // AI Employees
  20: { motif: 'orbit', study: 'two minds sharing one venture' }, // AI Co-Founders
  21: { motif: 'network', study: 'an organization run by agents' }, // AI Organizations
  22: { motif: 'lattice', study: 'governance at the scale of nations' }, // AI Nations
  23: { motif: 'orbit', study: 'an ecosystem arranged around you' }, // Personal Agent Ecosystem
  24: { motif: 'swarm', study: 'a business that operates itself' }, // Business Operating Systems
  25: { motif: 'flow', study: 'the blueprint, set in motion' }, // The ProjectX Blueprint
};

const motifNames: Record<Motif, string> = {
  flow: 'Flow study',
  network: 'Network study',
  swarm: 'Swarm study',
  lattice: 'Cellular study',
  ripple: 'Signal study',
  orbit: 'Orbital study',
  branch: 'Growth study',
};

export function getChapterMotif(chapterId: number): ChapterMotif {
  return motifs[chapterId] ?? { motif: 'flow', study: 'a system in motion' };
}

export function getMotifName(motif: Motif): string {
  return motifNames[motif];
}
