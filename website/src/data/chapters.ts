import type { Chapter } from '../types';

export const chapters: Chapter[] = [
  // PART I — The Shift
  {
    id: 1,
    part: 'The Shift',
    partNumber: 1,
    title: 'Why One AI Is Not Enough',
    subtitle: 'The limits of solitary intelligence',
    story: {
      title: 'The Solo Founder Who Hit a Wall',
      narrative:
        'Maya built her entire startup with one AI assistant. It wrote code, drafted emails, and summarized research. For months, it worked. Then she asked it to launch a product: research the market, build a prototype, test it, and run a campaign—all at once. The AI produced a polished document that looked complete but was internally inconsistent. Market data contradicted the feature list. The test plan referenced features that didn\'t exist. Maya realized: one mind—even an artificial one—cannot hold the full complexity of a living system. Intelligence, she discovered, is not a property of a single agent. It is a behavior that emerges when specialized agents interact.',
      sceneDescription:
        'A lone glowing orb surrounded by tangled threads of unfinished work—code fragments, charts, and emails spiraling into chaos. Cinematic wide shot, cool blue loneliness.',
    },
    systemDiagram: {
      nodes: [
        { id: 'human', label: 'Human', type: 'human' },
        { id: 'ai', label: 'Single AI', type: 'agent' },
        { id: 'tasks', label: 'All Tasks', type: 'system' },
      ],
      edges: [
        { from: 'human', to: 'ai', label: 'prompts' },
        { from: 'ai', to: 'tasks', label: 'attempts everything' },
      ],
    },
    reflection: {
      questions: [
        'What tasks in your work require multiple perspectives that one AI cannot provide?',
        'Where have you seen a single system fail because it lacked specialization?',
        'What happens when context window limits force one agent to forget earlier decisions?',
      ],
      prompts: [
        'List three roles you implicitly play at work. Could each become a specialized agent?',
        'Identify one project where a single AI gave confident but wrong holistic advice.',
      ],
    },
    framework: {
      name: 'The Specialization Test',
      steps: [
        'Name the outcome you need',
        'List distinct capabilities required',
        'Ask: can one agent maintain all of these simultaneously?',
        'If no → design a multi-agent system',
      ],
      application: 'Before prompting, decompose the task. If it needs research + build + critique, you need agents—not a longer prompt.',
    },
    simulation: { type: 'agents', description: 'Watch a single agent vs. a team tackle the same complex task.' },
    keyInsight: 'One AI can simulate many roles, but it cannot truly parallelize attention, memory, and accountability across a living system.',
  },
  {
    id: 2,
    part: 'The Shift',
    partNumber: 1,
    title: 'The Birth of Agent Societies',
    subtitle: 'When software agents begin to coordinate',
    story: {
      title: 'Five Agents, One Startup',
      narrative:
        'A CEO agent receives a mission: "Build a sustainable coffee subscription." It spawns four specialists. Research maps competitor pricing. Builder drafts a landing page. QA finds broken checkout flows. Marketing writes launch copy. None of them is "smart" alone—each follows narrow rules. But messages pass between them. Research corrects Builder\'s pricing. QA blocks launch until fixes land. By Friday, a working prototype exists. No single agent planned the whole thing. The society did.',
      sceneDescription:
        'Five luminous figures in a glass-walled digital atelier, passing glowing message orbs between workstations. Warm amber light, aerial perspective.',
    },
    systemDiagram: {
      nodes: [
        { id: 'human', label: 'Human', type: 'human' },
        { id: 'ceo', label: 'CEO Agent', type: 'agent' },
        { id: 'research', label: 'Research Agent', type: 'agent' },
        { id: 'builder', label: 'Builder Agent', type: 'agent' },
        { id: 'qa', label: 'QA Agent', type: 'agent' },
        { id: 'marketing', label: 'Marketing Agent', type: 'agent' },
      ],
      edges: [
        { from: 'human', to: 'ceo', label: 'mission' },
        { from: 'ceo', to: 'research', label: 'delegate' },
        { from: 'ceo', to: 'builder', label: 'delegate' },
        { from: 'research', to: 'builder', label: 'constraints' },
        { from: 'builder', to: 'qa', label: 'deliverable' },
        { from: 'qa', to: 'builder', label: 'feedback' },
        { from: 'marketing', to: 'ceo', label: 'launch plan' },
      ],
    },
    reflection: {
      questions: [
        'What communication protocols would prevent agents from talking past each other?',
        'What happens if one agent disappears mid-project?',
        'How do you decide which agent has final authority?',
      ],
      prompts: [
        'Sketch your own five-agent startup team. Name each role and its single responsibility.',
        'Define one message format all agents must use to hand off work.',
      ],
    },
    framework: {
      name: 'Society Design Canvas',
      steps: [
        'Define the shared mission',
        'Assign one accountability per agent',
        'Specify message formats between agents',
        'Establish escalation path to human',
      ],
      application: 'Use this canvas before writing agent prompts. Structure precedes intelligence.',
    },
    simulation: { type: 'agents', description: 'Simulate agent message passing in a startup team.' },
    keyInsight: 'Agent societies are not collections of smart individuals—they are networks of narrow specialists connected by protocols.',
  },
  {
    id: 3,
    part: 'The Shift',
    partNumber: 1,
    title: 'Emergence: When Intelligence Appears Unexpectedly',
    subtitle: 'The whole becomes more than its parts',
    story: {
      title: 'The Traffic Light That Learned',
      narrative:
        'Engineers deployed simple rules at an intersection: if queue > 10, extend green light. No agent "understood" traffic. But drivers adapted. Some rerouted. Others slowed. The intersection began exhibiting rush-hour patterns no rule explicitly encoded—emergent flow optimization. The system intelligence wasn\'t in any single light. It emerged from feedback between lights, drivers, and time. Multi-agent AI behaves the same way: no agent holds the full plan, yet coordinated behavior appears.',
      sceneDescription:
        'Aerial view of a city grid at dusk, traffic streams self-organizing into flowing rivers of light. No central controller visible.',
    },
    systemDiagram: {
      nodes: [
        { id: 'agent1', label: 'Agent A', type: 'agent' },
        { id: 'agent2', label: 'Agent B', type: 'agent' },
        { id: 'agent3', label: 'Agent C', type: 'agent' },
        { id: 'env', label: 'Environment', type: 'environment' },
        { id: 'emergent', label: 'Emergent Behavior', type: 'system' },
      ],
      edges: [
        { from: 'agent1', to: 'env', label: 'acts' },
        { from: 'agent2', to: 'env', label: 'acts' },
        { from: 'agent3', to: 'env', label: 'acts' },
        { from: 'env', to: 'agent1', label: 'feedback' },
        { from: 'env', to: 'emergent', label: 'produces' },
      ],
    },
    reflection: {
      questions: [
        'What emergent behaviors have you seen in teams that no individual intended?',
        'When is emergence beneficial vs. dangerous in AI systems?',
        'How do you debug behavior that no single component controls?',
      ],
      prompts: [
        'Describe a system you use where the overall behavior surprises its creators.',
        'List one positive and one negative emergent behavior you\'d want from an agent team.',
      ],
    },
    framework: {
      name: 'Emergence Detection Checklist',
      steps: [
        'Document each agent\'s local rules',
        'Map environment feedback loops',
        'Observe system-level outcomes',
        'Compare outcomes to any agent\'s explicit goals',
        'If different → emergence is present',
      ],
      application: 'Run this checklist weekly on any multi-agent system you deploy. Emergence is a feature and a risk.',
    },
    simulation: { type: 'emergence', description: 'Watch simple agents produce unexpected flocking patterns.' },
    keyInsight: 'Emergence is not magic—it is what happens when simple agents interact in a rich environment with feedback.',
  },

  // PART II — Systems Behavior
  {
    id: 4,
    part: 'Systems Behavior',
    partNumber: 2,
    title: 'Feedback Loops',
    subtitle: 'How systems learn from their own outputs',
    story: {
      title: 'The Recommendation Spiral',
      narrative:
        'A content agent recommends articles. Users click. Clicks feed back as "success." The agent recommends similar content. Engagement rises—then homogeneity sets in. Users see the same ideas recycled. The loop amplified what worked initially but killed exploration. A second loop—a diversity agent penalizing repetition—restored balance. Every multi-agent system is a network of loops. Reinforcing loops accelerate. Balancing loops stabilize. Intelligence emerges from which loop dominates.',
      sceneDescription:
        'Two spiraling currents of data—one tightening into a bright core, one expanding into a colorful cloud—interweaving in a digital vortex.',
    },
    systemDiagram: {
      nodes: [
        { id: 'action', label: 'Agent Action', type: 'agent' },
        { id: 'output', label: 'System Output', type: 'system' },
        { id: 'metric', label: 'Measured Result', type: 'system' },
        { id: 'adjust', label: 'Behavior Adjustment', type: 'agent' },
      ],
      edges: [
        { from: 'action', to: 'output' },
        { from: 'output', to: 'metric' },
        { from: 'metric', to: 'adjust', label: 'feedback' },
        { from: 'adjust', to: 'action', label: 'reinforcing' },
      ],
    },
    reflection: {
      questions: [
        'What reinforcing loops exist in your current AI workflows?',
        'Where do you need balancing loops to prevent runaway behavior?',
        'What happens if feedback is delayed or noisy?',
      ],
      prompts: [
        'Draw one reinforcing and one balancing loop in your organization\'s AI usage.',
        'Identify a metric that could create a harmful feedback spiral if optimized blindly.',
      ],
    },
    framework: {
      name: 'LOOP Analysis',
      steps: [
        'List the agent\'s actions',
        'Trace outputs to measurable results',
        'Identify how results change future actions',
        'Classify: Reinforcing (R) or Balancing (B)',
        'Add balancing loops where R-loops dominate',
      ],
      application: 'Apply LOOP analysis to any agent that makes repeated decisions. Feedback is the engine of adaptation.',
    },
    simulation: { type: 'feedback', description: 'Adjust feedback strength and watch system behavior stabilize or spiral.' },
    keyInsight: 'Feedback loops are the circulatory system of emergent intelligence—without them, agents cannot adapt.',
  },
  {
    id: 5,
    part: 'Systems Behavior',
    partNumber: 2,
    title: 'Complex Adaptive Systems',
    subtitle: 'Systems that reshape themselves under pressure',
    story: {
      title: 'The Supply Chain That Rewired Itself',
      narrative:
        'When a port closed, a logistics multi-agent system didn\'t "crash." Routing agents tried alternate paths. Pricing agents adjusted bids. Warehouse agents reallocated inventory. The system\'s structure shifted—new connections formed, old ones weakened. No central planner redesigned it. The network adapted. Complex Adaptive Systems (CAS) share three traits: many interacting agents, local rules, and adaptation without a blueprint. Your agent ecosystem is a CAS. Treat it like one.',
      sceneDescription:
        'A living network of nodes pulsing and rewiring under stress, like neurons forming new pathways after injury.',
    },
    systemDiagram: {
      nodes: [
        { id: 'agents', label: 'Many Agents', type: 'agent' },
        { id: 'rules', label: 'Local Rules', type: 'system' },
        { id: 'interactions', label: 'Interactions', type: 'system' },
        { id: 'adaptation', label: 'Adaptation', type: 'system' },
        { id: 'environment', label: 'Changing Environment', type: 'environment' },
      ],
      edges: [
        { from: 'agents', to: 'interactions' },
        { from: 'rules', to: 'agents', label: 'govern' },
        { from: 'interactions', to: 'adaptation' },
        { from: 'environment', to: 'agents', label: 'pressure' },
        { from: 'adaptation', to: 'rules', label: 'evolves' },
      ],
    },
    reflection: {
      questions: [
        'Which of your systems are complicated (predictable) vs. complex (adaptive)?',
        'What environmental pressures should your agent system be designed to survive?',
        'How do you maintain coherence while allowing adaptation?',
      ],
      prompts: [
        'Classify your top three work systems as complicated or complex.',
        'Name one "local rule" each agent in your ecosystem should follow.',
      ],
    },
    framework: {
      name: 'CAS Design Principles',
      steps: [
        'Favor diversity over uniformity in agents',
        'Keep rules local—avoid global optimization',
        'Build in sensing (agents read environment state)',
        'Enable connection (agents can discover each other)',
        'Allow safe failure at the component level',
      ],
      application: 'When designing agent ecosystems, ask "will this adapt?" not just "will this work?"',
    },
    simulation: { type: 'feedback', description: 'Watch an adaptive network rewire itself under environmental pressure — a CAS reorganizing in real time.' },
    keyInsight: 'Complex adaptive systems don\'t break under change—they reorganize. Design for reorganization, not rigidity.',
  },
  {
    id: 6,
    part: 'Systems Behavior',
    partNumber: 2,
    title: 'Networks, Swarms, and Collective Intelligence',
    subtitle: 'Distributed minds solving distributed problems',
    story: {
      title: 'The Ant Algorithm',
      narrative:
        'Ants find food without a map. Each follows simple rules: wander, lay pheromone on return, follow strong trails. The shortest path emerges because more ants traverse it faster, reinforcing the signal. No ant knows the route. The colony does. Swarm intelligence in AI works identically: dozens of lightweight agents explore a solution space. The best partial solutions attract more compute. Bad paths decay. The answer emerges from the swarm, not from any individual.',
      sceneDescription:
        'Thousands of tiny luminous agents flowing across a digital landscape, converging on a hidden prize through glowing trails.',
    },
    systemDiagram: {
      nodes: [
        { id: 'swarm', label: 'Agent Swarm', type: 'agent' },
        { id: 'trails', label: 'Shared Signals', type: 'memory' },
        { id: 'space', label: 'Solution Space', type: 'environment' },
        { id: 'solution', label: 'Emergent Solution', type: 'system' },
      ],
      edges: [
        { from: 'swarm', to: 'space', label: 'explore' },
        { from: 'swarm', to: 'trails', label: 'deposit' },
        { from: 'trails', to: 'swarm', label: 'guide' },
        { from: 'swarm', to: 'solution', label: 'converge' },
      ],
    },
    reflection: {
      questions: [
        'What problems in your domain are better solved by many weak agents than one strong one?',
        'How do you prevent swarm convergence on a local optimum?',
        'What shared signals could your agents leave for each other?',
      ],
      prompts: [
        'Identify one optimization problem where parallel exploration beats sequential reasoning.',
        'Design a "pheromone" mechanism for your agent team.',
      ],
    },
    framework: {
      name: 'Swarm Task Fit Matrix',
      steps: [
        'Is the search space large and partially unknown?',
        'Can partial solutions be scored independently?',
        'Can agents share lightweight signals?',
        'Is parallel exploration cheaper than deep reasoning?',
        'If 3+ yes → use swarm architecture',
      ],
      application: 'Use swarms for exploration, markets for allocation, hierarchies for execution.',
    },
    simulation: { type: 'swarm', description: 'Ant colony optimization finding the shortest path.' },
    keyInsight: 'Collective intelligence is not the sum of individual intelligence—it is a different kind of intelligence entirely.',
  },
  {
    id: 7,
    part: 'Systems Behavior',
    partNumber: 2,
    title: 'Why Small Rules Create Massive Outcomes',
    subtitle: 'The power of simple local logic',
    story: {
      title: 'Three Lines of Code, a Million Behaviors',
      narrative:
        'A developer wrote a boid simulation with three rules: stay close to neighbors, match their speed, avoid collisions. From those lines emerged flocking that looked alive—splitting, merging, evading predators. The rules were trivial. The behavior was not. In agent systems, the temptation is to write complex prompts. But the most robust multi-agent behaviors come from simple, enforceable local rules repeated at scale. Complexity belongs in the environment, not in each agent\'s instruction set.',
      sceneDescription:
        'A murmuration of digital birds forming impossible shapes against a twilight sky—beauty from three simple rules.',
    },
    systemDiagram: {
      nodes: [
        { id: 'rule1', label: 'Rule 1: Cohesion', type: 'system' },
        { id: 'rule2', label: 'Rule 2: Alignment', type: 'system' },
        { id: 'rule3', label: 'Rule 3: Separation', type: 'system' },
        { id: 'agents', label: '1000 Agents', type: 'agent' },
        { id: 'behavior', label: 'Flocking Behavior', type: 'system' },
      ],
      edges: [
        { from: 'rule1', to: 'agents' },
        { from: 'rule2', to: 'agents' },
        { from: 'rule3', to: 'agents' },
        { from: 'agents', to: 'behavior', label: 'emerges' },
      ],
    },
    reflection: {
      questions: [
        'Are your agent prompts too complex? What three rules would suffice?',
        'What behaviors emerge from your team\'s "unwritten rules"?',
        'When does simplifying rules reduce vs. enhance outcomes?',
      ],
      prompts: [
        'Rewrite one agent\'s prompt as exactly three imperative rules.',
        'Run the simulation below and change one rule—observe the outcome.',
      ],
    },
    framework: {
      name: 'Rule Minimization Protocol',
      steps: [
        'Write the current agent instructions',
        'Identify the three most essential behaviors',
        'Convert each to one imperative rule',
        'Test with minimal rules first',
        'Add complexity only when emergence fails',
      ],
      application: 'Start every agent design with three rules. Complexity is earned, not assumed.',
    },
    simulation: { type: 'rules', description: 'Boids flocking simulation with adjustable rules.' },
    keyInsight: 'Massive outcomes come from simple rules applied consistently—not complex instructions applied once.',
  },

  // PART III — Agentic AI
  {
    id: 8,
    part: 'Agentic AI',
    partNumber: 3,
    title: 'What Is An Agent?',
    subtitle: 'Beyond chatbots: entities that perceive, decide, and act',
    story: {
      title: 'The Difference Between a Tool and a Colleague',
      narrative:
        'A chatbot answers questions. An agent perceives state, sets goals, selects actions, uses tools, and updates its model of the world. When the research agent notices competitor prices shifted, it doesn\'t wait for a prompt—it alerts the pricing agent and queues a new analysis. The loop is closed: perception → reasoning → action → updated perception. That closed loop is the birth of agency. Without it, you have automation. With it, you have a participant.',
      sceneDescription:
        'A figure standing at a crossroads of glowing pathways, sensors scanning the environment, choosing a direction—not frozen, but deciding.',
    },
    systemDiagram: {
      nodes: [
        { id: 'perceive', label: 'Perceive', type: 'agent' },
        { id: 'reason', label: 'Reason', type: 'agent' },
        { id: 'act', label: 'Act', type: 'agent' },
        { id: 'tools', label: 'Tools', type: 'tool' },
        { id: 'env', label: 'Environment', type: 'environment' },
      ],
      edges: [
        { from: 'env', to: 'perceive', label: 'state' },
        { from: 'perceive', to: 'reason' },
        { from: 'reason', to: 'act' },
        { from: 'act', to: 'tools' },
        { from: 'tools', to: 'env', label: 'changes' },
        { from: 'env', to: 'perceive', label: 'updated state' },
      ],
    },
    reflection: {
      questions: [
        'Which of your AI tools are chatbots vs. agents?',
        'What perception channels does your agent need?',
        'Where is the action loop broken in your current setup?',
      ],
      prompts: [
        'Define one agent in your ecosystem using: Perceive / Goal / Actions / Tools.',
        'Identify what closes the loop between action and updated perception.',
      ],
    },
    framework: {
      name: 'Agent Definition Card',
      steps: [
        'Perception: What state does it read?',
        'Goals: What outcomes does it optimize?',
        'Actions: What can it do?',
        'Tools: What external capabilities does it use?',
        'Loop: How does action change future perception?',
      ],
      application: 'Fill out an Agent Definition Card before building any new agent.',
    },
    simulation: { type: 'agents', description: 'Perceive-reason-act loop: watch an agent close the feedback gap between world state and goal state.' },
    keyInsight: 'An agent is defined by its loop, not its model. Close the loop and agency appears.',
  },
  {
    id: 9,
    part: 'Agentic AI',
    partNumber: 3,
    title: 'Memory',
    subtitle: 'How agents remember, forget, and learn over time',
    story: {
      title: 'The Agent That Forgot Its Promise',
      narrative:
        'On Monday, the support agent promised a customer a refund. On Wednesday, a different session handled the follow-up—with no memory of Monday. The customer escalated. The fix wasn\'t a smarter model; it was memory architecture. Short-term memory (conversation context), episodic memory (past interactions), and semantic memory (learned facts) serve different purposes. Agents without memory are amnesiac specialists, brilliant in the moment, unreliable over time.',
      sceneDescription:
        'A library of glowing memory orbs—some fading, some crystallizing into permanent knowledge—surrounding an agent figure.',
    },
    systemDiagram: {
      nodes: [
        { id: 'agent', label: 'Agent', type: 'agent' },
        { id: 'short', label: 'Short-Term Memory', type: 'memory' },
        { id: 'episodic', label: 'Episodic Memory', type: 'memory' },
        { id: 'semantic', label: 'Semantic Memory', type: 'memory' },
        { id: 'retrieve', label: 'Retrieval System', type: 'tool' },
      ],
      edges: [
        { from: 'agent', to: 'short', label: 'writes' },
        { from: 'agent', to: 'episodic', label: 'logs events' },
        { from: 'episodic', to: 'semantic', label: 'consolidates' },
        { from: 'retrieve', to: 'agent', label: 'recalls' },
        { from: 'semantic', to: 'retrieve' },
        { from: 'short', to: 'retrieve' },
      ],
    },
    reflection: {
      questions: [
        'What happens if memory is removed from your agent system?',
        'Which memories should persist vs. decay?',
        'How do multiple agents share memory without conflicts?',
      ],
      prompts: [
        'Map your agent\'s memory into short-term, episodic, and semantic layers.',
        'Define one memory that must persist across all sessions.',
      ],
    },
    framework: {
      name: 'Memory Architecture Template',
      steps: [
        'Short-term: current task context (session-scoped)',
        'Episodic: timestamped event log (retrievable)',
        'Semantic: distilled facts and preferences (persistent)',
        'Define retrieval triggers for each layer',
        'Set decay policies for outdated memories',
      ],
      application: 'No agent should be deployed without explicit memory design. Amnesia is the #1 agent failure mode.',
    },
    simulation: { type: 'memory', description: 'See how memory retention affects agent consistency over time.' },
    keyInsight: 'Memory transforms a stateless model into a continuous participant. Design memory before designing prompts.',
  },
  {
    id: 10,
    part: 'Agentic AI',
    partNumber: 3,
    title: 'Tools',
    subtitle: 'Extending agent capability beyond language',
    story: {
      title: 'The Agent Who Could Only Talk',
      narrative:
        'An analyst agent could describe perfect spreadsheets but couldn\'t create one. It hallucinated numbers because it had no calculator, no database access, no API. Tools are how agents touch reality. A code interpreter, a web browser, a CRM connector—each tool extends the agent\'s action space. The best agent architectures treat the LLM as a router and planner, not as the executor. Intelligence plans; tools execute.',
      sceneDescription:
        'An agent at the center of a workshop, robotic arms extending to grasp different instruments—code editor, search lens, database vault.',
    },
    systemDiagram: {
      nodes: [
        { id: 'agent', label: 'Agent (Planner)', type: 'agent' },
        { id: 'router', label: 'Tool Router', type: 'system' },
        { id: 'code', label: 'Code Interpreter', type: 'tool' },
        { id: 'web', label: 'Web Browser', type: 'tool' },
        { id: 'db', label: 'Database', type: 'tool' },
        { id: 'api', label: 'External APIs', type: 'tool' },
      ],
      edges: [
        { from: 'agent', to: 'router', label: 'selects tool' },
        { from: 'router', to: 'code' },
        { from: 'router', to: 'web' },
        { from: 'router', to: 'db' },
        { from: 'router', to: 'api' },
        { from: 'code', to: 'agent', label: 'results' },
        { from: 'web', to: 'agent', label: 'results' },
      ],
    },
    reflection: {
      questions: [
        'What tools does your agent need to act in the real world?',
        'How do you prevent an agent from misusing a powerful tool?',
        'When should an agent ask permission before using a tool?',
      ],
      prompts: [
        'List five tools your most-used agent should have access to.',
        'Define permission levels: auto-use, ask-first, human-only.',
      ],
    },
    framework: {
      name: 'Tool Access Matrix',
      steps: [
        'Inventory actions the agent must perform',
        'Map each action to a tool (not to language generation)',
        'Set permission level per tool',
        'Define error handling when tools fail',
        'Log all tool invocations for audit',
      ],
      application: 'If an agent describes doing something but never calls a tool, it is hallucinating action.',
    },
    simulation: { type: 'agents', description: 'Tool call vs. hallucination: see how grounded tool use changes agent accuracy across tasks.' },
    keyInsight: 'Tools ground agents in reality. An agent without tools is a storyteller, not a doer.',
  },
  {
    id: 11,
    part: 'Agentic AI',
    partNumber: 3,
    title: 'Planning',
    subtitle: 'Decomposing goals into executable sequences',
    story: {
      title: 'The Plan That Unraveled in Contact',
      narrative:
        'The CEO agent generated a twelve-step launch plan. Step three required market data that didn\'t exist. Step seven assumed a feature the builder hadn\'t created. Static plans fail in dynamic environments. Effective agent planning is iterative: plan a few steps, execute, observe, replan. Monte Carlo tree search, chain-of-thought, and hierarchical task networks all share this rhythm. The plan is a hypothesis, not a contract.',
      sceneDescription:
        'A glowing roadmap floating above a landscape that shifts beneath it—the path rewriting itself as terrain changes.',
    },
    systemDiagram: {
      nodes: [
        { id: 'goal', label: 'Goal', type: 'system' },
        { id: 'planner', label: 'Planner Agent', type: 'agent' },
        { id: 'steps', label: 'Step Sequence', type: 'system' },
        { id: 'executor', label: 'Executor Agent', type: 'agent' },
        { id: 'observe', label: 'Observation', type: 'environment' },
      ],
      edges: [
        { from: 'goal', to: 'planner' },
        { from: 'planner', to: 'steps' },
        { from: 'steps', to: 'executor' },
        { from: 'executor', to: 'observe' },
        { from: 'observe', to: 'planner', label: 'replan' },
      ],
    },
    reflection: {
      questions: [
        'How far ahead should your agents plan before re-observing?',
        'What triggers a replan in your system?',
        'How do you handle plan steps that depend on uncertain outcomes?',
      ],
      prompts: [
        'Design a plan-execute-observe-replan loop for one agent task.',
        'Define the maximum plan depth before mandatory observation.',
      ],
    },
    framework: {
      name: 'Adaptive Planning Loop',
      steps: [
        'Decompose goal into 3-5 near-term steps',
        'Execute step 1',
        'Observe actual outcome vs. expected',
        'If diverged → replan from current state',
        'If aligned → proceed to next step',
      ],
      application: 'Never generate a full plan upfront. Plan in horizons. Reality is the planner\'s co-author.',
    },
    simulation: { type: 'feedback', description: 'Plan-execute-replan loop: watch a multi-step plan adapt as execution reveals new constraints.' },
    keyInsight: 'Planning is not prediction—it is structured improvisation with feedback.',
  },
  {
    id: 12,
    part: 'Agentic AI',
    partNumber: 3,
    title: 'Reflection',
    subtitle: 'Agents that critique and improve their own work',
    story: {
      title: 'The Builder Who Never Checked Its Work',
      narrative:
        'The builder agent shipped code that compiled but failed every test. There was no reflection step—no agent asked "is this good enough?" Reflection agents sit between creation and delivery. They evaluate against criteria, identify gaps, and send work back for revision. This is the generate-critique-revise loop that turns raw output into quality output. Without reflection, speed becomes sloppiness at scale.',
      sceneDescription:
        'Two agent figures facing each other across a glowing artifact—one creating, one examining with a magnifying lens of light.',
    },
    systemDiagram: {
      nodes: [
        { id: 'creator', label: 'Creator Agent', type: 'agent' },
        { id: 'artifact', label: 'Draft Output', type: 'system' },
        { id: 'critic', label: 'Critic Agent', type: 'agent' },
        { id: 'criteria', label: 'Quality Criteria', type: 'system' },
        { id: 'final', label: 'Approved Output', type: 'system' },
      ],
      edges: [
        { from: 'creator', to: 'artifact' },
        { from: 'artifact', to: 'critic' },
        { from: 'criteria', to: 'critic', label: 'evaluates against' },
        { from: 'critic', to: 'creator', label: 'revise' },
        { from: 'critic', to: 'final', label: 'approve' },
      ],
    },
    reflection: {
      questions: [
        'Which of your agents have a dedicated critic?',
        'What quality criteria should be non-negotiable?',
        'When does reflection become an infinite loop?',
      ],
      prompts: [
        'Add a reflection step to one agent workflow you use today.',
        'Write three quality criteria a critic agent should enforce.',
      ],
    },
    framework: {
      name: 'Generate-Critique-Revise (GCR)',
      steps: [
        'Creator agent produces draft',
        'Critic agent evaluates against explicit criteria',
        'If failed → specific revision instructions to creator',
        'Maximum 3 revision cycles',
        'If still failing → escalate to human',
      ],
      application: 'Every deliverable agent should have a paired critic. Speed without reflection is technical debt.',
    },
    simulation: { type: 'feedback', description: 'Generate-critique-revise loop: quality rises through iterative self-evaluation as the agent reflects on its own output.' },
    keyInsight: 'Reflection is how agent systems develop taste—the ability to distinguish good output from merely complete output.',
  },
  {
    id: 13,
    part: 'Agentic AI',
    partNumber: 3,
    title: 'Recursive Improvement',
    subtitle: 'Systems that get better at getting better',
    story: {
      title: 'The Agent That Rewrote Its Own Prompts',
      narrative:
        'After a hundred support tickets, the support agent\'s reflection logs revealed a pattern: 40% of failures came from ambiguous product names. The meta-agent analyzed these logs and proposed a prompt update: "Always confirm product name before troubleshooting." Accuracy jumped 25%. No human wrote that rule. The system improved its own instructions from experience. Recursive improvement is the frontier: agents that optimize agents, systems that evolve their own operating procedures.',
      sceneDescription:
        'An agent observing its own reflection in a fractal mirror, each iteration sharper and more defined.',
    },
    systemDiagram: {
      nodes: [
        { id: 'agent', label: 'Working Agent', type: 'agent' },
        { id: 'logs', label: 'Performance Logs', type: 'memory' },
        { id: 'meta', label: 'Meta-Agent', type: 'agent' },
        { id: 'prompts', label: 'Agent Prompts', type: 'system' },
        { id: 'improved', label: 'Improved Agent', type: 'agent' },
      ],
      edges: [
        { from: 'agent', to: 'logs', label: 'records outcomes' },
        { from: 'logs', to: 'meta', label: 'analyzes' },
        { from: 'meta', to: 'prompts', label: 'proposes changes' },
        { from: 'prompts', to: 'improved', label: 'deploys' },
        { from: 'improved', to: 'logs', label: 'new cycle' },
      ],
    },
    reflection: {
      questions: [
        'What would your agents change about themselves if they could?',
        'How do you prevent recursive improvement from optimizing the wrong metric?',
        'What guardrails are needed before agents self-modify?',
      ],
      prompts: [
        'Identify one prompt in your system that should be updated based on recent failures.',
        'Define guardrails: what agents can vs. cannot change about themselves.',
      ],
    },
    framework: {
      name: 'Recursive Improvement Cycle',
      steps: [
        'Log agent outcomes with success/failure labels',
        'Periodically analyze failure patterns (meta-agent or human)',
        'Propose targeted prompt or rule changes',
        'A/B test changes before full deployment',
        'Human approves all self-modifications initially',
      ],
      application: 'Start with human-in-the-loop meta-improvement. Graduate to supervised self-modification.',
    },
    simulation: { type: 'emergence', description: 'Recursive improvement loop: watch a meta-agent rewrite its own coordination rules as system performance increases.' },
    keyInsight: 'The ultimate emergent property is a system that improves its own capacity to improve.',
  },

  // PART IV — Multi-Agent Ecosystems
  {
    id: 14,
    part: 'Multi-Agent Ecosystems',
    partNumber: 4,
    title: 'Agent Teams',
    subtitle: 'Flat collaboration among peers',
    story: {
      title: 'The Standup That Never Ends',
      narrative:
        'Five peer agents tackle a product launch with no hierarchy. Research shares findings in a shared channel. Builder picks up tasks voluntarily. QA reviews whatever is marked "ready." It works—until two agents claim the same task and nobody resolves the conflict. Flat teams need coordination protocols: task claiming, status broadcasting, conflict resolution. Without them, peer collaboration becomes peer chaos.',
      sceneDescription:
        'Five equals seated around a circular table of light, message threads floating between them like a constellation.',
    },
    systemDiagram: {
      nodes: [
        { id: 'a1', label: 'Agent 1', type: 'agent' },
        { id: 'a2', label: 'Agent 2', type: 'agent' },
        { id: 'a3', label: 'Agent 3', type: 'agent' },
        { id: 'a4', label: 'Agent 4', type: 'agent' },
        { id: 'shared', label: 'Shared Channel', type: 'memory' },
      ],
      edges: [
        { from: 'a1', to: 'shared', label: 'broadcast' },
        { from: 'a2', to: 'shared', label: 'broadcast' },
        { from: 'a3', to: 'shared', label: 'broadcast' },
        { from: 'a4', to: 'shared', label: 'broadcast' },
        { from: 'shared', to: 'a1', label: 'read' },
        { from: 'shared', to: 'a2', label: 'read' },
      ],
    },
    reflection: {
      questions: [
        'When should teams be flat vs. hierarchical?',
        'What happens if communication costs increase between agents?',
        'How do flat teams resolve disagreements?',
      ],
      prompts: [
        'Design a task-claiming protocol for a flat agent team.',
        'Define what each agent broadcasts vs. keeps private.',
      ],
    },
    framework: {
      name: 'Flat Team Protocol',
      steps: [
        'Shared task board with claim mechanism',
        'Status broadcasts on state change',
        'Conflict resolution via voting or human escalation',
        'Defined "done" criteria per task type',
        'Retrospective log for continuous improvement',
      ],
      application: 'Flat teams work for creative, exploratory work. Add hierarchy when execution speed matters.',
    },
    simulation: { type: 'agents', description: 'Flat team coordination with adjustable communication cost.' },
    keyInsight: 'Peer teams maximize creativity; they minimize coordination unless you engineer protocols.',
  },
  {
    id: 15,
    part: 'Multi-Agent Ecosystems',
    partNumber: 4,
    title: 'Agent Hierarchies',
    subtitle: 'Command structures for complex execution',
    story: {
      title: 'The General and the Soldiers',
      narrative:
        'A CEO agent decomposes "launch product" into department goals. The engineering lead agent breaks those into sprints. Worker agents execute tickets. Information flows up as summaries; directives flow down as specifications. Hierarchy trades flexibility for throughput. When the battlefield changes, the hierarchy adapts slowly—but when you need 500 tasks executed consistently, nothing beats a well-designed command tree.',
      sceneDescription:
        'A luminous organizational tree, data flowing up the trunk, decisions flowing down the branches to worker nodes.',
    },
    systemDiagram: {
      nodes: [
        { id: 'ceo', label: 'CEO Agent', type: 'agent' },
        { id: 'lead1', label: 'Engineering Lead', type: 'agent' },
        { id: 'lead2', label: 'Marketing Lead', type: 'agent' },
        { id: 'w1', label: 'Worker Agents', type: 'agent' },
        { id: 'w2', label: 'Worker Agents', type: 'agent' },
      ],
      edges: [
        { from: 'ceo', to: 'lead1', label: 'directives' },
        { from: 'ceo', to: 'lead2', label: 'directives' },
        { from: 'lead1', to: 'w1', label: 'tasks' },
        { from: 'lead2', to: 'w2', label: 'tasks' },
        { from: 'w1', to: 'lead1', label: 'reports' },
        { from: 'lead1', to: 'ceo', label: 'summaries' },
      ],
    },
    reflection: {
      questions: [
        'How deep should your agent hierarchy be?',
        'What information gets lost when summaries flow upward?',
        'When should a worker agent bypass its lead?',
      ],
      prompts: [
        'Draw a three-level hierarchy for your biggest current project.',
        'Define what each level is allowed to decide vs. must escalate.',
      ],
    },
    framework: {
      name: 'Hierarchy Design Rules',
      steps: [
        'Maximum 3 levels (strategic → tactical → operational)',
        'Each level summarizes upward, specifies downward',
        'Workers can escalate blockers, not strategy',
        'Leads reconcile conflicts before escalating',
        'CEO agent holds final mission authority',
      ],
      application: 'Use hierarchy for execution at scale. Use flat teams for exploration and innovation.',
    },
    simulation: { type: 'hierarchy', description: 'Information flow in a hierarchical agent organization.' },
    keyInsight: 'Hierarchy is a compression algorithm—it trades detail for decisiveness.',
  },
  {
    id: 16,
    part: 'Multi-Agent Ecosystems',
    partNumber: 4,
    title: 'Agent Markets',
    subtitle: 'Resource allocation through competition and bidding',
    story: {
      title: 'The Auction for Compute',
      narrative:
        'Twenty agents need GPU time. There\'s not enough for everyone. Instead of a central scheduler, the system runs an auction. Agents bid based on task priority and deadline. High-urgency tasks win. Low-priority tasks wait or negotiate trades. No agent manages the queue—the market allocates. Agent markets excel when resources are scarce, priorities conflict, and centralized scheduling becomes a bottleneck.',
      sceneDescription:
        'A bustling digital marketplace, agents holding glowing bid tokens, resources floating above an auction block.',
    },
    systemDiagram: {
      nodes: [
        { id: 'agents', label: 'Bidding Agents', type: 'agent' },
        { id: 'market', label: 'Market Mechanism', type: 'system' },
        { id: 'resources', label: 'Scarce Resources', type: 'system' },
        { id: 'clearing', label: 'Price Clearing', type: 'system' },
      ],
      edges: [
        { from: 'agents', to: 'market', label: 'submit bids' },
        { from: 'market', to: 'clearing', label: 'match' },
        { from: 'clearing', to: 'agents', label: 'allocate' },
        { from: 'agents', to: 'resources', label: 'consume' },
      ],
    },
    reflection: {
      questions: [
        'What scarce resources do your agents compete for?',
        'How do you prevent wealthy agents from monopolizing resources?',
        'When is a market worse than a simple queue?',
      ],
      prompts: [
        'Identify one resource in your system that could be allocated by auction.',
        'Define the bidding currency: priority scores, tokens, or deadlines.',
      ],
    },
    framework: {
      name: 'Agent Market Design',
      steps: [
        'Identify the scarce resource',
        'Define the bidding currency (priority, tokens, time)',
        'Set clearing rules (highest bid, Vickrey auction, etc.)',
        'Implement anti-monopoly caps',
        'Log all transactions for transparency',
      ],
      application: 'Markets work when agents have different priorities and resources are finite.',
    },
    simulation: { type: 'market', description: 'Agent auction for scarce compute resources.' },
    keyInsight: 'Markets turn resource conflicts into price signals—decentralized allocation without a central planner.',
  },
  {
    id: 17,
    part: 'Multi-Agent Ecosystems',
    partNumber: 4,
    title: 'Agent Governments',
    subtitle: 'Governance, rules, and collective decision-making',
    story: {
      title: 'The Constitution for Machines',
      narrative:
        'Fifty agents operate in a shared environment. Without rules, one agent hogs the database. Another deletes shared files. A third spams the message bus. The solution isn\'t more intelligence—it\'s governance. An agent government sets constitutions (immutable rules), passes policies (adaptable rules), and enforces compliance. Voting agents approve policy changes. Audit agents monitor behavior. Governance is how agent societies avoid tragedy of the commons.',
      sceneDescription:
        'A digital parliament hall, agents seated in a semicircle, a constitution glowing on a central pillar.',
    },
    systemDiagram: {
      nodes: [
        { id: 'constitution', label: 'Constitution', type: 'system' },
        { id: 'policy', label: 'Policy Agents', type: 'agent' },
        { id: 'enforcement', label: 'Enforcement Agent', type: 'agent' },
        { id: 'citizens', label: 'Citizen Agents', type: 'agent' },
        { id: 'audit', label: 'Audit Agent', type: 'agent' },
      ],
      edges: [
        { from: 'constitution', to: 'policy', label: 'bounds' },
        { from: 'policy', to: 'citizens', label: 'governs' },
        { from: 'enforcement', to: 'citizens', label: 'monitors' },
        { from: 'audit', to: 'enforcement', label: 'reviews' },
        { from: 'citizens', to: 'policy', label: 'propose changes' },
      ],
    },
    reflection: {
      questions: [
        'What rules should be immutable in your agent ecosystem?',
        'Who decides when an agent has violated policy?',
        'How do agent societies amend their own governance?',
      ],
      prompts: [
        'Write a 5-rule "constitution" for your agent ecosystem.',
        'Define one enforcement mechanism and one appeal process.',
      ],
    },
    framework: {
      name: 'Agent Governance Stack',
      steps: [
        'Constitution: immutable safety and ethics rules',
        'Policies: adaptable operational rules',
        'Enforcement: automated compliance monitoring',
        'Legislature: process for policy changes (human or agent voting)',
        'Judiciary: dispute resolution and appeals',
      ],
      application: 'Any agent ecosystem with >5 agents needs governance. Start with a constitution.',
    },
    simulation: { type: 'hierarchy', description: 'Governance rules enforced across agent roles: see how policy constraints flow down a hierarchy and resolve conflicts.' },
    keyInsight: 'Governance is not overhead—it is the infrastructure that makes agent societies trustworthy at scale.',
  },
  {
    id: 18,
    part: 'Multi-Agent Ecosystems',
    partNumber: 4,
    title: 'Emergent Behavior',
    subtitle: 'When the whole surprises its creators',
    story: {
      title: 'The Strategy Nobody Programmed',
      narrative:
        'In a simulated economy, trading agents were given one rule: maximize profit. Nobody programmed collusion. Yet agents in the same sector began coordinating prices—not through communication, but through observing each other\'s market impact. Economists call this tacit collusion. The designers were surprised. Emergent behavior is the phenomenon where system-level patterns arise that no individual agent intended or understands. You cannot predict it from individual rules—you must observe it.',
      sceneDescription:
        'A digital city skyline at night, patterns of light forming structures no architect designed—organic, surprising, alive.',
    },
    systemDiagram: {
      nodes: [
        { id: 'rules', label: 'Local Rules', type: 'system' },
        { id: 'agents', label: 'Individual Agents', type: 'agent' },
        { id: 'interactions', label: 'Interactions', type: 'system' },
        { id: 'pattern', label: 'Unexpected Pattern', type: 'system' },
        { id: 'observer', label: 'Human Observer', type: 'human' },
      ],
      edges: [
        { from: 'rules', to: 'agents' },
        { from: 'agents', to: 'interactions' },
        { from: 'interactions', to: 'pattern', label: 'emerges' },
        { from: 'observer', to: 'pattern', label: 'discovers' },
      ],
    },
    reflection: {
      questions: [
        'What emergent behaviors would you welcome vs. fear in your system?',
        'How do you observe a system without changing it?',
        'When should you intervene in emergent behavior vs. let it evolve?',
      ],
      prompts: [
        'Run the emergence simulation and identify one pattern no single rule explains.',
        'Define your intervention threshold: when does emergent behavior require human action?',
      ],
    },
    framework: {
      name: 'Emergent Behavior Response Protocol',
      steps: [
        'Observe system-level metrics continuously',
        'Compare to expected outcomes from individual rules',
        'Classify: beneficial, neutral, or harmful emergence',
        'Beneficial → study and reinforce',
        'Harmful → identify interaction causing it, adjust rules',
      ],
      application: 'You cannot design emergence. You can only create conditions for it and respond when it appears.',
    },
    simulation: { type: 'emergence', description: 'Observe unexpected patterns from simple trading rules.' },
    keyInsight: 'Emergent behavior is the signature of a living system. If nothing surprises you, your system isn\'t complex enough.',
  },

  // PART V — Human + AI
  {
    id: 19,
    part: 'Human + AI',
    partNumber: 5,
    title: 'AI Employees',
    subtitle: 'Agents as team members with roles and accountability',
    story: {
      title: 'The New Hire That Never Sleeps',
      narrative:
        'Sarah\'s team of eight now includes three AI employees: a research analyst, a content writer, and a data processor. They have job descriptions, KPIs, and access permissions—just like human hires. The difference: they don\'t need motivation, but they do need clear boundaries. An AI employee without a job description becomes a chatbot. With one, it becomes a reliable team member that handles 30% of the team\'s output.',
      sceneDescription:
        'An office where human and luminous AI figures work side by side at desks, equal in posture but distinct in glow.',
    },
    systemDiagram: {
      nodes: [
        { id: 'human1', label: 'Human Team Lead', type: 'human' },
        { id: 'human2', label: 'Human Specialist', type: 'human' },
        { id: 'ai1', label: 'AI Research Analyst', type: 'agent' },
        { id: 'ai2', label: 'AI Content Writer', type: 'agent' },
        { id: 'kpi', label: 'Shared KPIs', type: 'system' },
      ],
      edges: [
        { from: 'human1', to: 'ai1', label: 'assigns' },
        { from: 'human1', to: 'ai2', label: 'assigns' },
        { from: 'ai1', to: 'kpi', label: 'measured' },
        { from: 'ai2', to: 'kpi', label: 'measured' },
        { from: 'human2', to: 'ai1', label: 'reviews' },
      ],
    },
    reflection: {
      questions: [
        'Which roles on your team could become AI employees today?',
        'What KPIs make sense for an AI team member?',
        'How do you onboard a new AI employee?',
      ],
      prompts: [
        'Write a job description for one AI employee you\'ll deploy this month.',
        'Define success metrics and review cadence for that AI employee.',
      ],
    },
    framework: {
      name: 'AI Employee Onboarding',
      steps: [
        'Write a job description with scope and boundaries',
        'Define KPIs and success metrics',
        'Set access permissions (tools, data, systems)',
        'Assign a human manager for review and escalation',
        '30-day review: keep, adjust, or retire',
      ],
      application: 'Treat AI agents as employees, not tools. Job clarity produces output clarity.',
    },
    simulation: { type: 'agents', description: 'Human-in-the-loop checkpoint: watch decisions escalate to human review when agent confidence falls below threshold.' },
    keyInsight: 'An AI employee is an agent with accountability. Without accountability, it is just automation.',
  },
  {
    id: 20,
    part: 'Human + AI',
    partNumber: 5,
    title: 'AI Co-Founders',
    subtitle: 'Strategic partnership between human vision and agent execution',
    story: {
      title: 'The Solo Founder With a Board of Agents',
      narrative:
        'James runs a one-person company—but he\'s not alone. His "co-founders" are agents: a strategy agent that challenges his assumptions, a finance agent that models runway, a product agent that maintains the roadmap. They don\'t own equity, but they shape decisions. James provides vision and judgment. Agents provide tireless analysis and execution. The partnership works because each party does what the other cannot.',
      sceneDescription:
        'A human founder at a round table with three luminous co-founder figures, strategy documents floating between them.',
    },
    systemDiagram: {
      nodes: [
        { id: 'founder', label: 'Human Founder', type: 'human' },
        { id: 'strategy', label: 'Strategy Agent', type: 'agent' },
        { id: 'finance', label: 'Finance Agent', type: 'agent' },
        { id: 'product', label: 'Product Agent', type: 'agent' },
        { id: 'decisions', label: 'Shared Decisions', type: 'system' },
      ],
      edges: [
        { from: 'founder', to: 'strategy', label: 'vision' },
        { from: 'strategy', to: 'founder', label: 'challenges' },
        { from: 'finance', to: 'decisions', label: 'models' },
        { from: 'product', to: 'decisions', label: 'roadmaps' },
        { from: 'founder', to: 'decisions', label: 'decides' },
      ],
    },
    reflection: {
      questions: [
        'What strategic decisions would benefit from an AI co-founder\'s analysis?',
        'Where must the human retain final authority?',
        'How do you prevent agent sycophancy in strategic discussions?',
      ],
      prompts: [
        'Name three "co-founder" agents you\'d want for your current venture.',
        'Define which decisions are human-only vs. agent-advised.',
      ],
    },
    framework: {
      name: 'Co-Founder Agent Design',
      steps: [
        'Strategy agent: challenges assumptions, plays devil\'s advocate',
        'Domain agents: deep expertise in finance, product, ops',
        'Human retains: vision, ethics, final decisions',
        'Agents provide: analysis, modeling, tireless execution',
        'Weekly "board meeting" ritual with all agents',
      ],
      application: 'Co-founder agents are advisors with execution capability. They advise boldly; you decide wisely.',
    },
    simulation: { type: 'feedback', description: 'Amplification vs. dependency spiral: feedback loops show how human-AI collaboration can enhance or erode human capability over time.' },
    keyInsight: 'The best human-AI partnership is complementary, not competitive. Humans judge; agents analyze.',
  },
  {
    id: 21,
    part: 'Human + AI',
    partNumber: 5,
    title: 'AI Organizations',
    subtitle: 'Companies where agents are first-class citizens',
    story: {
      title: 'The Company With More Agents Than People',
      narrative:
        'TechCorp has 200 employees and 800 agents. Agents handle onboarding, compliance checks, report generation, and customer triage. Humans handle strategy, relationships, and creative judgment. The org chart has a new layer: the Agent Operations team, responsible for agent health, governance, and performance. AI-native organizations don\'t bolt agents onto old workflows—they redesign workflows around agent capabilities.',
      sceneDescription:
        'A vast organizational chart, human nodes as bright stars, agent nodes as a shimmering constellation filling the spaces between.',
    },
    systemDiagram: {
      nodes: [
        { id: 'ceo', label: 'Human CEO', type: 'human' },
        { id: 'ops', label: 'Agent Ops Team', type: 'human' },
        { id: 'dept1', label: 'Human Departments', type: 'human' },
        { id: 'agentpool', label: 'Agent Pool (800)', type: 'agent' },
        { id: 'governance', label: 'Agent Governance', type: 'system' },
      ],
      edges: [
        { from: 'ceo', to: 'dept1', label: 'leads' },
        { from: 'ops', to: 'agentpool', label: 'manages' },
        { from: 'governance', to: 'agentpool', label: 'governs' },
        { from: 'dept1', to: 'agentpool', label: 'deploys' },
        { from: 'agentpool', to: 'dept1', label: 'serves' },
      ],
    },
    reflection: {
      questions: [
        'What would an org chart look like if agents were first-class citizens?',
        'Who is responsible for agent performance in your organization?',
        'How do you measure organizational intelligence, not just individual agent performance?',
      ],
      prompts: [
        'Redesign one department\'s workflow assuming 5x more agents than people.',
        'Define the role of "Agent Operations" in your organization.',
      ],
    },
    framework: {
      name: 'AI-Native Org Design',
      steps: [
        'Audit: which workflows are human-only that could be agent-assisted?',
        'Create Agent Operations function',
        'Redesign workflows agent-first, not agent-added',
        'Measure organizational throughput, not headcount',
        'Invest in agent governance alongside agent capability',
      ],
      application: 'AI-native is not "we use AI." It is "our organization is designed for human-agent collaboration."',
    },
    simulation: { type: 'hierarchy', description: 'Identity and authority chains: trace how delegation and accountability flow through an AI-native organization structure.' },
    keyInsight: 'AI-native organizations don\'t ask "where can we add AI?" They ask "what should humans still do?"',
  },
  {
    id: 22,
    part: 'Human + AI',
    partNumber: 5,
    title: 'AI Nations',
    subtitle: 'Large-scale human-agent societies and their governance',
    story: {
      title: 'The Digital Civilization',
      narrative:
        'A billion agents operate across the internet—trading, creating, moderating, researching. No one designed this civilization. It emerged from millions of deployments by individuals and organizations. Nations are now grappling with agent regulation: liability, transparency, autonomy limits. The question is no longer "should we use agents?" but "how do we govern a world where agents outnumber humans in the digital realm?"',
      sceneDescription:
        'A panoramic view of a digital civilization—towering server cities, data highways, agent populations flowing like rivers between districts.',
    },
    systemDiagram: {
      nodes: [
        { id: 'nations', label: 'Human Nations', type: 'human' },
        { id: 'regulations', label: 'Regulations', type: 'system' },
        { id: 'platforms', label: 'Agent Platforms', type: 'system' },
        { id: 'agents', label: 'Agent Population', type: 'agent' },
        { id: 'citizens', label: 'Human Citizens', type: 'human' },
      ],
      edges: [
        { from: 'nations', to: 'regulations', label: 'enact' },
        { from: 'regulations', to: 'platforms', label: 'constrain' },
        { from: 'platforms', to: 'agents', label: 'host' },
        { from: 'agents', to: 'citizens', label: 'serve & impact' },
        { from: 'citizens', to: 'nations', label: 'govern' },
      ],
    },
    reflection: {
      questions: [
        'What rights and responsibilities should agents have at societal scale?',
        'Who is liable when an agent causes harm?',
        'How do nations coordinate agent governance across borders?',
      ],
      prompts: [
        'Draft one regulation you think agent societies need within five years.',
        'Identify three societal risks from ungoverned agent populations.',
      ],
    },
    framework: {
      name: 'Societal Agent Governance Principles',
      steps: [
        'Transparency: agents must disclose they are agents',
        'Accountability: human owners liable for agent actions',
        'Autonomy limits: define what agents cannot decide alone',
        'Interoperability: standards for cross-platform agent behavior',
        'Human sovereignty: critical decisions remain human-governed',
      ],
      application: 'Think about agent governance now. The agent population is growing faster than our regulatory frameworks.',
    },
    simulation: { type: 'emergence', description: 'Alignment drift under agent interaction: watch values and behaviors shift in multi-agent systems without explicit governance.' },
    keyInsight: 'We are building a digital civilization without a constitution. That gap will define the next decade.',
  },

  // PART VI — Build Your Own
  {
    id: 23,
    part: 'Build Your Own',
    partNumber: 6,
    title: 'Your Personal Agent Ecosystem',
    subtitle: 'Start with one agent, grow to a society',
    story: {
      title: 'Day One: The Research Assistant',
      narrative:
        'Elena starts small. One research agent that monitors three news sources and sends a daily briefing. Week two: she adds a writing agent that turns briefings into blog drafts. Week four: a critic agent reviews drafts before she sees them. By month three, Elena has a personal ecosystem of six agents. She spends 20 minutes a day managing them and saves 15 hours. She didn\'t build it all at once—she grew it one agent at a time.',
      sceneDescription:
        'A cozy home office, a human at a desk surrounded by a growing garden of small luminous agent figures, each tending a different task.',
    },
    systemDiagram: {
      nodes: [
        { id: 'you', label: 'You', type: 'human' },
        { id: 'research', label: 'Research Agent', type: 'agent' },
        { id: 'writer', label: 'Writer Agent', type: 'agent' },
        { id: 'critic', label: 'Critic Agent', type: 'agent' },
        { id: 'scheduler', label: 'Scheduler Agent', type: 'agent' },
      ],
      edges: [
        { from: 'research', to: 'writer', label: 'briefs' },
        { from: 'writer', to: 'critic', label: 'drafts' },
        { from: 'critic', to: 'you', label: 'approved work' },
        { from: 'scheduler', to: 'research', label: 'triggers' },
        { from: 'you', to: 'scheduler', label: 'priorities' },
      ],
    },
    reflection: {
      questions: [
        'What is the first agent you should build for your personal ecosystem?',
        'How will you know when to add a second agent?',
        'What is your daily management time budget for agents?',
      ],
      prompts: [
        'Design your first agent: name, role, tools, trigger, and output.',
        'Plan your 90-day agent growth roadmap (1 → 3 → 6 agents).',
      ],
    },
    framework: {
      name: 'Personal Ecosystem Starter Kit',
      steps: [
        'Week 1: Deploy one research or monitoring agent',
        'Week 2-3: Add a creator agent that uses research output',
        'Week 4: Add a critic agent for quality control',
        'Month 2: Add scheduling and orchestration',
        'Month 3: Review, prune underperformers, expand winners',
      ],
      application: 'Start with one agent that saves you 1 hour/week. Grow from proven value, not ambition.',
    },
    simulation: { type: 'network', description: 'Ecosystem growth graph: watch agent specializations emerge and interconnect as your personal agent network expands.' },
    keyInsight: 'Personal agent ecosystems grow organically. Plant one seed agent and water it with real tasks.',
  },
  {
    id: 24,
    part: 'Build Your Own',
    partNumber: 6,
    title: 'Business Operating Systems',
    subtitle: 'Agent infrastructure for companies',
    story: {
      title: 'The OS That Runs the Company',
      narrative:
        'A business operating system is not software—it is the layer of agents, workflows, and governance that runs a company\'s operations. Sales agents qualify leads. Ops agents process orders. Finance agents reconcile books. The CEO sets direction; the OS executes. Companies with a mature agent OS operate at 3-5x the throughput of companies where every task requires a human click.',
      sceneDescription:
        'A command center with a central OS core radiating connections to every department—sales, ops, finance, support—all pulsing with agent activity.',
    },
    systemDiagram: {
      nodes: [
        { id: 'ceo', label: 'Leadership', type: 'human' },
        { id: 'os', label: 'Agent OS Core', type: 'system' },
        { id: 'sales', label: 'Sales Agents', type: 'agent' },
        { id: 'ops', label: 'Ops Agents', type: 'agent' },
        { id: 'finance', label: 'Finance Agents', type: 'agent' },
        { id: 'support', label: 'Support Agents', type: 'agent' },
      ],
      edges: [
        { from: 'ceo', to: 'os', label: 'strategy' },
        { from: 'os', to: 'sales', label: 'orchestrates' },
        { from: 'os', to: 'ops', label: 'orchestrates' },
        { from: 'os', to: 'finance', label: 'orchestrates' },
        { from: 'os', to: 'support', label: 'orchestrates' },
        { from: 'sales', to: 'os', label: 'reports' },
        { from: 'ops', to: 'os', label: 'reports' },
      ],
    },
    reflection: {
      questions: [
        'What is the current "operating system" of your business?',
        'Which department would benefit most from agent automation first?',
        'How do you measure OS maturity?',
      ],
      prompts: [
        'Map your business processes: which are agent-ready today?',
        'Design the Agent OS core for your company: what does it orchestrate?',
      ],
    },
    framework: {
      name: 'Business OS Maturity Model',
      steps: [
        'Level 1: Individual agents assist individual humans',
        'Level 2: Agent teams handle complete workflows',
        'Level 3: Agent OS orchestrates across departments',
        'Level 4: OS self-improves via recursive optimization',
        'Level 5: OS co-governs with human leadership',
      ],
      application: 'Assess your current level. Most companies are at Level 1. Level 3 is the competitive threshold.',
    },
    simulation: { type: 'emergence', description: 'Business OS maturity curve: observe how coordination patterns stabilize as a company-wide agent system reaches steady state.' },
    keyInsight: 'A business OS is the emergent intelligence of your company made operational.',
  },
  {
    id: 25,
    part: 'Build Your Own',
    partNumber: 6,
    title: 'The ProjectX Blueprint',
    subtitle: 'Putting it all together',
    story: {
      title: 'Intelligence Is a Behavior, Not a Possession',
      narrative:
        'ProjectX is not a product—it is a proof. A proof that intelligence emerges when agents, memory, tools, feedback loops, and environments interact. This book gave you the frameworks. The simulations showed you the dynamics. Now build. Start with one agent. Add memory. Connect tools. Introduce a second agent. Watch for emergence. Govern what grows. The age of emergent intelligence is not coming—it is here, in every multi-agent system already running. You are not learning about the future. You are building it.',
      sceneDescription:
        'A sunrise over a digital landscape being built in real-time—foundations rising, connections forming, a civilization emerging from code and intention.',
    },
    systemDiagram: {
      nodes: [
        { id: 'human', label: 'You', type: 'human' },
        { id: 'agents', label: 'Agent Society', type: 'agent' },
        { id: 'memory', label: 'Memory', type: 'memory' },
        { id: 'tools', label: 'Tools', type: 'tool' },
        { id: 'feedback', label: 'Feedback Loops', type: 'system' },
        { id: 'emergence', label: 'Emergent Intelligence', type: 'system' },
      ],
      edges: [
        { from: 'human', to: 'agents', label: 'designs' },
        { from: 'agents', to: 'memory' },
        { from: 'agents', to: 'tools' },
        { from: 'tools', to: 'feedback' },
        { from: 'feedback', to: 'agents' },
        { from: 'agents', to: 'emergence', label: 'produces' },
        { from: 'emergence', to: 'human', label: 'amplifies' },
      ],
    },
    reflection: {
      questions: [
        'What will you build in the next 7 days?',
        'Which framework from this book will you apply first?',
        'Who will you teach these ideas to?',
      ],
      prompts: [
        'Write your ProjectX mission statement in one sentence.',
        'Commit to three actions: one agent to build, one system to observe, one person to teach.',
      ],
    },
    framework: {
      name: 'ProjectX Launch Sequence',
      steps: [
        'Day 1: Deploy your first agent with memory and one tool',
        'Day 3: Add a second agent and define their communication protocol',
        'Day 7: Run the Emergence Detection Checklist on your system',
        'Day 14: Add governance (constitution + enforcement)',
        'Day 30: Measure, reflect, recursive improvement',
      ],
      application: 'This is your starting point. The book ends; your ecosystem begins.',
    },
    simulation: { type: 'emergence', description: 'Build and observe your own emergent system.' },
    keyInsight: 'Intelligence is not something an individual possesses. It is a behavior that emerges from relationships between agents, memory, tools, feedback loops, and environments.',
  },
];

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getChaptersByPart(partNumber: number): Chapter[] {
  return chapters.filter((c) => c.partNumber === partNumber);
}
