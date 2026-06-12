export type NodeType = 'human' | 'agent' | 'system' | 'tool' | 'memory' | 'environment';

export interface DiagramNode {
  id: string;
  label: string;
  type: NodeType;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export type SimulationType =
  | 'swarm'
  | 'feedback'
  | 'network'
  | 'agents'
  | 'market'
  | 'memory'
  | 'hierarchy'
  | 'emergence'
  | 'rules';

export interface Chapter {
  id: number;
  part: string;
  partNumber: number;
  title: string;
  subtitle: string;
  story: {
    title: string;
    narrative: string;
    sceneDescription: string;
  };
  systemDiagram: {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
  };
  reflection: {
    questions: string[];
    prompts: string[];
  };
  framework: {
    name: string;
    steps: string[];
    application: string;
  };
  simulation?: {
    type: SimulationType;
    description: string;
  };
  keyInsight: string;
}

export interface Part {
  number: number;
  title: string;
  gradient: string;
}
