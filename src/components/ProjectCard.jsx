import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import CoverArt from './CoverArt.jsx';
import { GithubIcon } from './Icons.jsx';
import { Badge, LinkButton, SpotlightCard } from './ui.jsx';
import { cn } from '../lib/utils.js';

export default function ProjectCard({ project, featured = false }) {
  const p = project;
  return (
    <SpotlightCard className={cn('h-full', featured && 'border-violet-500/30 shadow-glow-lg')}>
      <div className={cn('grid h-full', featured ? 'lg:grid-cols-[1.15fr_1fr]' : 'grid-rows-[auto_1fr]')}>
        <Link
          to={`/projects/${p.slug}`}
          className="group relative block overflow-hidden"
          aria-label={`View details of ${p.title}`}
        >
          <CoverArt
            variant={p.cover}
            className={cn(
              'w-full object-cover transition-transform duration-700 group-hover:scale-105',
              featured ? 'h-full min-h-[240px]' : 'aspect-[16/9]'
            )}
          />
          {featured && (
            <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-violet-500 to-electric-500 px-3 py-1 font-mono text-[11px] font-medium text-white">
              Featured project
            </span>
          )}
        </Link>

        <div className={cn('flex flex-col p-6', featured && 'sm:p-8')}>
          <p className="font-mono text-xs text-violet-400">
            {p.number} · {p.category}
          </p>
          <h3
            className={cn(
              'mt-2 font-display font-semibold tracking-tight',
              featured ? 'text-3xl sm:text-4xl' : 'text-2xl'
            )}
          >
            {p.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{p.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s}>
                <Badge>{s}</Badge>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
            <Link
              to={`/projects/${p.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-electric-500 px-4 py-2.5 text-sm font-medium text-white shadow-glow transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              View Details <ArrowUpRight size={16} />
            </Link>
            <LinkButton href={p.github} icon={GithubIcon}>
              GitHub Repository
            </LinkButton>
            {p.hasDemo && (
              <LinkButton href={p.demo} icon={ExternalLink}>
                Live Demo
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
