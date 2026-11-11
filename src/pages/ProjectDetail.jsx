import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, ImageIcon } from 'lucide-react';
import AgentWorkflow from '../components/AgentWorkflow.jsx';
import CoverArt from '../components/CoverArt.jsx';
import { GithubIcon } from '../components/Icons.jsx';
import { Badge, LinkButton, Reveal, SpotlightCard } from '../components/ui.jsx';
import { getProject, projects } from '../data/projects.js';

const architecture = [
  { layer: 'Interface', tech: 'Streamlit', text: 'Where content is submitted and results are presented.' },
  { layer: 'API', tech: 'FastAPI', text: 'Python backend that exposes the analysis pipeline.' },
  { layer: 'Orchestration', tech: 'LangGraph', text: 'Coordinates the specialized agents and their hand-offs.' },
  { layer: 'Agents', tech: 'Python · OOP', text: 'Vision analysis, risk assessment and report generation.' },
  { layer: 'Model', tech: 'Gemma 4 31B', text: 'The multimodal model behind the analysis.' },
  { layer: 'Deployment', tech: 'Render', text: 'Hosting for the deployed application.' },
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => {
    if (project) document.title = `${project.title} — Akash Vishwakarma`;
  }, [project]);

  if (!project) {
    return (
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-3xl font-semibold">Project not found</h1>
        <Link to={{ pathname: '/', hash: '#projects' }} className="mt-6 text-sm text-violet-300 hover:text-white">
          ← Back to projects
        </Link>
      </div>
    );
  }

  const isGuardian = project.slug === 'guardian-ai';
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pb-24 pt-28">
      <div className="container-x">
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeft size={16} /> All projects
        </Link>

        {/* Header */}
        <header className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="font-mono text-xs text-violet-400">
              {project.number} · {project.category}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="text-gradient">{project.title}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{project.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href={project.github} icon={GithubIcon} variant="primary">
                GitHub Repository
              </LinkButton>
              {project.hasDemo && (
                <LinkButton href={project.demo} icon={ExternalLink}>
                  Live Demo
                </LinkButton>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-violet-500/30 shadow-glow-lg">
            <CoverArt variant={project.cover} className="aspect-[16/9] w-full" />
          </div>
        </header>

        {/* Key features */}
        <section className="mt-20" aria-labelledby="features-title">
          <Reveal>
            <h2 id="features-title" className="font-display text-2xl font-semibold">
              Key features
            </h2>
          </Reveal>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <Reveal key={f} delay={i * 0.04}>
                <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-violet-400" />
                  <span className="text-zinc-200">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* Guardian-only: architecture + workflow */}
        {isGuardian && (
          <>
            <section className="mt-20" aria-labelledby="arch-title">
              <Reveal>
                <h2 id="arch-title" className="font-display text-2xl font-semibold">
                  Architecture overview
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">
                  A layered view of how the pieces of the system fit together.
                </p>
              </Reveal>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {architecture.map((a, i) => (
                  <Reveal key={a.layer} delay={i * 0.05}>
                    <SpotlightCard className="h-full p-5">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-violet-400">{a.layer}</p>
                      <h3 className="mt-1 font-display text-lg font-semibold">{a.tech}</h3>
                      <p className="mt-1 text-sm text-muted">{a.text}</p>
                    </SpotlightCard>
                  </Reveal>
                ))}
              </div>
            </section>

            <section className="mt-20" aria-labelledby="flow-title">
              <Reveal>
                <h2 id="flow-title" className="font-display text-2xl font-semibold">
                  Agent workflow
                </h2>
                <p className="mb-6 mt-2 max-w-2xl text-sm text-muted">
                  How content moves through the multi-agent pipeline, from input to security report.
                </p>
              </Reveal>
              <Reveal>
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                  <AgentWorkflow />
                </div>
              </Reveal>
            </section>
          </>
        )}

        {/* Tech stack */}
        <section className="mt-20" aria-labelledby="stack-title">
          <Reveal>
            <h2 id="stack-title" className="font-display text-2xl font-semibold">
              Technology stack
            </h2>
          </Reveal>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {project.stack.map((s) => (
              <li key={s}>
                <Badge className="px-3.5 py-1.5 text-xs">{s}</Badge>
              </li>
            ))}
          </ul>
        </section>

        {/* Screenshots */}
        <section className="mt-20" aria-labelledby="shots-title">
          <Reveal>
            <h2 id="shots-title" className="font-display text-2xl font-semibold">
              Screenshots
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.screenshots.length > 0
              ? project.screenshots.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    className="aspect-video w-full rounded-xl border border-white/10 object-cover"
                  />
                ))
              : [1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-center"
                  >
                    <ImageIcon size={22} className="text-zinc-500" />
                    <p className="text-xs text-muted">Screenshot {n} — not added yet</p>
                  </div>
                ))}
          </div>
          {project.screenshots.length === 0 && (
            <p className="mt-3 text-xs text-muted">
              Add images to <code className="font-mono">public/screenshots/</code> and list them under{' '}
              <code className="font-mono">screenshots</code> in <code className="font-mono">src/data/projects.js</code>.
            </p>
          )}
        </section>

        {/* Next project */}
        <nav className="mt-24 border-t border-white/10 pt-8" aria-label="Next project">
          <Link to={`/projects/${next.slug}`} className="group flex items-center justify-between gap-4">
            <span>
              <span className="block font-mono text-xs text-muted">Next project</span>
              <span className="font-display text-2xl font-semibold transition-colors group-hover:text-violet-300">
                {next.title}
              </span>
            </span>
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>
    </article>
  );
}
