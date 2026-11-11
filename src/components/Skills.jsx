import {
  AppWindow, Boxes, Braces, Code2, Cpu, Database, FileCode2, FlaskConical, HardDrive, Layers,
  Leaf, Monitor, Network, Server, Shapes, Sparkles, Terminal, Webhook, Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, SectionHeading, SpotlightCard } from './ui.jsx';
import { skillGroups } from '../data/skills.js';

const icons = {
  AppWindow, Boxes, Braces, Code2, Cpu, Database, FileCode2, FlaskConical, HardDrive, Layers,
  Leaf, Monitor, Network, Server, Shapes, Sparkles, Terminal, Webhook, Zap,
};

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="02 / Skills"
          title="Technologies I work with."
          subtitle="The languages, frameworks and tools I use to build backend systems and AI-powered applications."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const GroupIcon = icons[group.icon];
            return (
              <Reveal key={group.id} delay={gi * 0.06} className={group.id === 'ai' ? 'lg:col-span-2' : ''}>
                <SpotlightCard className="h-full p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/25 to-electric-500/25 text-violet-300">
                      <GroupIcon size={18} />
                    </span>
                    <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => {
                      const Icon = icons[item.icon] || Code2;
                      return (
                        <motion.li
                          key={item.name}
                          whileHover={{ y: -3, scale: 1.03 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-zinc-200 hover:border-violet-400/40"
                        >
                          <Icon size={15} className="text-electric-400" />
                          {item.name}
                        </motion.li>
                      );
                    })}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
