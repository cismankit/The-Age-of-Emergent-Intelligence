import QRCode from 'react-qr-code';
import type { SimulationType } from '../types';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const Sim = components[type];
  const demoUrl = `https://cismankit.github.io/The-Age-of-Emergent-Intelligence/chapter/${id}#simulation`;

  return (
    <div id="simulation" className="scroll-mt-24 rounded-xl border-2 border-[var(--color-accent)] bg-gradient-to-br from-blue-50/80 to-white p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Interactive Simulation
          </h3>
          <p className="mt-1 text-sm text-[var(--color-slate)]">{description}</p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-white p-3">
          <QRCode value={demoUrl} size={72} level="M" />
          <div className="text-xs text-[var(--color-slate)]">
            <p className="font-medium text-[var(--color-ink)]">Scan to try on mobile</p>
            <p className="mt-1 max-w-[140px] break-all">{demoUrl}</p>
          </div>
        </div>
      </div>
      <Sim />
    </div>
  );
}
