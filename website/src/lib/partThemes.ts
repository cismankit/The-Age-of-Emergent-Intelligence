import type { ScenePalette } from '../components/visual/FlowScene';

/**
 * The fractal identity system: one palette per part, propagated through
 * every scale of the book — home part cards, chapter title fields, scene
 * plates, insight pages, and the reader's ambient washes. Same DNA,
 * different magnification.
 */
export interface PartTheme {
  flow: ScenePalette;
  aurora: { a: string; b: string; c: string };
  fieldColors: string[];
  linkRgb: string;
}

export const partThemes: Record<number, PartTheme> = {
  1: {
    flow: { from: '#0a1020', via: '#16243f', to: '#28406b', accent: '#60a5fa', accentSoft: '#93c5fd' },
    aurora: { a: 'rgba(96,165,250,0.10)', b: 'rgba(180,83,9,0.06)', c: 'rgba(59,130,246,0.05)' },
    fieldColors: ['#93c5fd', '#60a5fa', '#fbbf24', '#f4f1ea'],
    linkRgb: '96, 165, 250',
  },
  2: {
    flow: { from: '#07130e', via: '#0e2c20', to: '#175243', accent: '#34d399', accentSoft: '#6ee7b7' },
    aurora: { a: 'rgba(52,211,153,0.10)', b: 'rgba(180,83,9,0.06)', c: 'rgba(16,185,129,0.05)' },
    fieldColors: ['#6ee7b7', '#34d399', '#fbbf24', '#f4f1ea'],
    linkRgb: '52, 211, 153',
  },
  3: {
    flow: { from: '#0f0920', via: '#2a1850', to: '#4a2a85', accent: '#a78bfa', accentSoft: '#c4b5fd' },
    aurora: { a: 'rgba(167,139,250,0.10)', b: 'rgba(180,83,9,0.06)', c: 'rgba(139,92,246,0.05)' },
    fieldColors: ['#c4b5fd', '#a78bfa', '#fbbf24', '#f4f1ea'],
    linkRgb: '167, 139, 250',
  },
  4: {
    flow: { from: '#130d06', via: '#37230d', to: '#5e3d14', accent: '#fbbf24', accentSoft: '#fcd34d' },
    aurora: { a: 'rgba(251,191,36,0.10)', b: 'rgba(109,40,217,0.05)', c: 'rgba(217,119,6,0.06)' },
    fieldColors: ['#fcd34d', '#fbbf24', '#f59e0b', '#f4f1ea'],
    linkRgb: '251, 191, 36',
  },
  5: {
    flow: { from: '#14070e', via: '#3a0f26', to: '#611a40', accent: '#f472b6', accentSoft: '#f9a8d4' },
    aurora: { a: 'rgba(244,114,182,0.10)', b: 'rgba(180,83,9,0.06)', c: 'rgba(225,29,72,0.05)' },
    fieldColors: ['#f9a8d4', '#f472b6', '#fbbf24', '#f4f1ea'],
    linkRgb: '244, 114, 182',
  },
  6: {
    flow: { from: '#06120f', via: '#0d322d', to: '#16584f', accent: '#2dd4bf', accentSoft: '#5eead4' },
    aurora: { a: 'rgba(45,212,191,0.10)', b: 'rgba(180,83,9,0.06)', c: 'rgba(20,184,166,0.05)' },
    fieldColors: ['#5eead4', '#2dd4bf', '#fbbf24', '#f4f1ea'],
    linkRgb: '45, 212, 191',
  },
};

export function getPartTheme(partNumber: number): PartTheme {
  return partThemes[partNumber] ?? partThemes[1];
}
