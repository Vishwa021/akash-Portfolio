import { Award, CalendarDays, Cpu, Globe2, Layers3, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal, SectionHeading, SpotlightCard } from './ui.jsx';

const details = [
  { icon: CalendarDays, label: 'When', value: 'June 2026' },
  { icon: Globe2, label: 'Format', value: 'Online' },
  { icon: UserRound, label: 'Role', value: 'Participant / Developer' },
];

const showcase = [
  { icon: Cpu, title: 'Gemma 4 31B', text: 'The model powering Guardian AI.' },
  { icon: Layers3, title: 'Cerebras inference', text: 'Inference used while building during the hackathon.' },
  { icon: Award, title: 'Multimodal agents', text: 'Multi-agent analysis of multiple content types.' },
];

export default function Hackathon() {
  return (
    <section id="hackathon" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="04 / Hackathon" title="Hackathon experience." />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-600/15 via-ink-900 to-electric-500/10 p-6 shadow-glow-lg sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" aria-hidden="true" />

            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/40 bg-violet-500/10 px-3.5 py-1.5 font-mono text-xs text-violet-200">
                  <Award size={14} /> Hackathon Participant
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Cerebras × Gemma 4 Hackathon
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-muted">
                  Developed Guardian AI, a multimodal cybersecurity multi-agent system using Gemma 4 31B and Cerebras
                  inference.
                </p>

                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  {details.map((d) => (
                    <div key={d.label} className="rounded-xl border border-white/10 bg-black/20 p-3.5">
                      <dt className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                        <d.icon size={12} /> {d.label}
                      </dt>
                      <dd className="mt-1 text-sm font-medium">{d.value}</dd>
                    </div>
                  ))}
                </dl>

                <Link
                  to="/projects/guardian-ai"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-white"
                >
                  See the Guardian AI project →
                </Link>
              </div>

              <div className="grid gap-3">
                {showcase.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.08}>
                    <SpotlightCard className="flex items-start gap-4 p-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/30 to-electric-500/30 text-violet-200">
                        <s.icon size={18} />
                      </span>
                      <div>
                        <h4 className="font-display font-semibold">{s.title}</h4>
                        <p className="mt-0.5 text-sm text-muted">{s.text}</p>
                      </div>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
