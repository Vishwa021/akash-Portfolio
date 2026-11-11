import { Code2, Network, Puzzle, Server, Webhook } from 'lucide-react';
import { Reveal, SectionHeading, SpotlightCard } from './ui.jsx';

const highlights = [
  { icon: Code2, title: 'Python Development', text: 'Clean, readable, object-oriented code.' },
  { icon: Server, title: 'Backend Engineering', text: 'APIs and services built with care.' },
  { icon: Network, title: 'AI & Multi-Agent Systems', text: 'Orchestrated agents solving real tasks.' },
  { icon: Webhook, title: 'API Integration', text: 'Connecting external services and AI models.' },
  { icon: Puzzle, title: 'Problem Solving', text: 'Turning practical problems into software.' },
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="01 / About" title="A little about my journey." />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I'm an Information Technology graduate with a strong interest in Python development and backend
              engineering. My experience includes developing full-stack applications, REST APIs, AI assistants, and
              multi-agent AI systems.
            </p>
            <p>
              I enjoy exploring new technologies, experimenting with AI models, and solving practical problems through
              software development.
            </p>
            <p>
              Currently, I'm focused on strengthening my backend expertise and building scalable, intelligent
              applications.
            </p>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.06} className={i === 4 ? 'sm:col-span-2' : ''}>
                <SpotlightCard className="h-full p-5">
                  <h.icon size={20} className="mb-3 text-violet-400" />
                  <h3 className="font-display text-base font-semibold">{h.title}</h3>
                  <p className="mt-1 text-sm text-muted">{h.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
