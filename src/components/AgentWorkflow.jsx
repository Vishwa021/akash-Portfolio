import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, FileInput, FileText, Network, ScanEye, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils.js';

const nodes = {
  input: { label: 'Content input', sub: 'Text, images and other content to analyse', icon: FileInput },
  orchestrator: { label: 'LangGraph orchestrator', sub: 'Coordinates the agents and the flow of work', icon: Network },
  vision: { label: 'Vision analysis agent', sub: 'Specialized analysis of visual content', icon: ScanEye },
  risk: { label: 'Risk assessment agent', sub: 'Assesses the risk of what was found', icon: ShieldAlert },
  report: { label: 'Security report', sub: 'Automated report generation', icon: FileText },
};

// Which nodes light up at each step of the looping animation.
const sequence = [['input'], ['orchestrator'], ['vision', 'risk'], ['report']];

function Node({ id, active }) {
  const n = nodes[id];
  return (
    <motion.div
      animate={{ scale: active ? 1.03 : 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex-1 rounded-2xl border p-4 transition-all duration-500',
        active ? 'border-violet-400/70 bg-violet-500/15 shadow-glow' : 'border-white/10 bg-white/[0.03]'
      )}
    >
      <n.icon size={20} className={cn('mb-2 transition-colors', active ? 'text-violet-300' : 'text-zinc-400')} />
      <h4 className="font-display text-sm font-semibold">{n.label}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted">{n.sub}</p>
    </motion.div>
  );
}

function Connector() {
  return (
    <div className="flex items-center justify-center text-violet-400/70" aria-hidden="true">
      <ArrowRight size={18} className="hidden lg:block" />
      <ArrowDown size={18} className="lg:hidden" />
    </div>
  );
}

export default function AgentWorkflow() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % sequence.length), 1700);
    return () => clearInterval(id);
  }, []);

  const on = (id) => sequence[step].includes(id);

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        <Node id="input" active={on('input')} />
        <Connector />
        <Node id="orchestrator" active={on('orchestrator')} />
        <Connector />
        <div className="flex flex-1 flex-col gap-3">
          <Node id="vision" active={on('vision')} />
          <Node id="risk" active={on('risk')} />
        </div>
        <Connector />
        <Node id="report" active={on('report')} />
      </div>
      <p className="mt-4 text-xs text-muted">
        Simplified, illustrative view of the agent workflow. The highlight loops through the stages automatically.
      </p>
    </div>
  );
}
