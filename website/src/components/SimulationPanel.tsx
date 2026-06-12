import type { SimulationType } from '../types';
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
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-slate)]">
        Interactive Simulation
      </h3>
      <p className="mb-4 text-sm text-[var(--color-slate)]">{description}</p>
      <Sim />
    </div>
  );
}
