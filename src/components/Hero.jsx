import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DevWorkspace from './DevWorkspace.jsx';
import { GithubIcon, LinkedinIcon } from './Icons.jsx';
import { LinkButton } from './ui.jsx';
import { site } from '../config/site.js';
import { cn, hasLink } from '../lib/utils.js';

function SocialIcon({ href, label, children }) {
  const cls =
    'flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-violet-400/50 hover:text-white';
  if (!hasLink(href)) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${label} (link not set yet)`}
        title="Link not set yet — add it in .env"
        className={cn(cls, 'cursor-not-allowed opacity-45 hover:translate-y-0')}
      >
        {children}
      </button>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
      {children}
    </a>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-24 pt-28 sm:pt-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -left-24 top-10 h-[420px] w-[420px] animate-gradient-shift rounded-full bg-violet-600/25 blur-[120px]" />
        <div
          className="absolute -right-24 top-40 h-[380px] w-[380px] animate-gradient-shift rounded-full bg-electric-500/20 blur-[120px]"
          style={{ animationDelay: '-7s' }}
        />
      </div>

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs text-zinc-300"
          >
            <MapPin size={13} className="text-violet-400" /> {site.location}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-3 font-display text-base text-muted"
          >
            {site.name} · {site.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Building Intelligent Applications Through <span className="text-gradient">Python &amp; AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            I'm a Python Developer passionate about building backend systems, AI-powered applications, and intelligent
            automation solutions. I enjoy transforming ideas into practical software through clean architecture, APIs,
            and emerging AI technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to={{ pathname: '/', hash: '#projects' }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-electric-500 px-5 py-3 text-sm font-medium text-white shadow-glow transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              Explore My Work <ArrowRight size={16} />
            </Link>
            <LinkButton href={site.links.resume} icon={Download} download className="py-3">
              Download Resume
            </LinkButton>
            <Link
              to={{ pathname: '/', hash: '#contact' }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-white/[0.07]"
            >
              <MessageCircle size={16} /> Let's Connect
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <SocialIcon href={site.links.github} label="GitHub">
              <GithubIcon />
            </SocialIcon>
            <SocialIcon href={site.links.linkedin} label="LinkedIn">
              <LinkedinIcon />
            </SocialIcon>
            <SocialIcon href={`mailto:${site.email}`} label="Email">
              <Mail size={18} />
            </SocialIcon>
            <a href={`mailto:${site.email}`} className="ml-1 text-sm text-muted transition-colors hover:text-white">
              {site.email}
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <DevWorkspace />
        </motion.div>
      </div>
    </section>
  );
}
