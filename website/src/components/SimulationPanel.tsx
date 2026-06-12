import type { SimulationType } from '../types';
import { Activity } from 'lucide-react';
import { SwarmSimulation } from './simulations/SwarmSimulation';
import { FeedbackSimulation } from './simulations/FeedbackSimulation';
import { BoidsSimulation } from './simulations/BoidsSimulation';
import { AgentTeamSimulation } from './simulations/AgentTeamSimulation';
import { MarketSimulation } from './simulations/MarketSimulation';
import { MemorySimulation } from './simulations/MemorySimulation';
import { HierarchySimulation } from './simulations/HierarchySimulation';
import { EmergenceSimulation } from './simulations/EmergenceSimulation';

interface Props {
  type: SimulationType;
  description: string;
}

const components: Record<SimulationType, React.ComponentType> = {
  swarm: SwarmSimulation,
  feedback: FeedbackSimulation,
  network: EmergenceSimulation,
  agents: AgentTeamSimulation,
  market: MarketSimulation,
  memory: MemorySimulation,
  hierarchy: HierarchySimulation,
  emergence: EmergenceSimulation,
  rules: BoidsSimulation,
};

export function SimulationPanel({ type, description }: Props) {
  const Sim = components[type];

  return (
    <div className="panel-dark overflow-hidden">
      <div className="flex items-start gap-3 border-b border-[var(--color-panel-border)] px-6 py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5">
          <Activity size={15} className="text-amber-400" />
        </span>
        <div>
          <p className="label-caps text-white/40">Live Simulation</p>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{description}</p>
        </div>
      </div>
      <div className="p-4 md:p-6">
        <Sim />
      </div>
    </div>
  );
}
