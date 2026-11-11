import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from './ProjectCard.jsx';
import { SectionHeading } from './ui.jsx';
import { projectFilters, projects } from '../data/projects.js';
import { cn } from '../lib/utils.js';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const visible = projects.filter((p) => filter === 'All' || p.filter === filter);

  return (
    <section id="projects" className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="03 / Projects"
          title="Featured projects."
          subtitle="Practical software across AI, multi-agent systems, full-stack development and automation."
        />

        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-all',
                filter === f
                  ? 'border-violet-400/60 bg-violet-500/15 text-white'
                  : 'border-white/10 text-muted hover:border-white/25 hover:text-white'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={p.featured ? 'md:col-span-2' : ''}
              >
                <ProjectCard project={p} featured={p.featured} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
