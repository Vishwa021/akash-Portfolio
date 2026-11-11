import { motion } from 'framer-motion';
import { cn, hasLink } from '../lib/utils.js';

export function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, className = '' }) {
  return (
    <Reveal className={cn('mb-12 max-w-2xl', className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-violet-400">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-muted">{subtitle}</p>}
    </Reveal>
  );
}

export function Badge({ children, className = '' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-zinc-300',
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * Button/link that gracefully degrades when a URL has not been configured yet.
 * Unset links render as a disabled button with an explanatory tooltip.
 */
export function LinkButton({ href, children, icon: Icon, variant = 'ghost', download = false, className = '' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400';
  const variants = {
    primary:
      'bg-gradient-to-r from-violet-500 to-electric-500 text-white shadow-glow hover:-translate-y-0.5 hover:brightness-110',
    ghost:
      'border border-white/10 bg-white/[0.03] text-white hover:-translate-y-0.5 hover:border-violet-400/50 hover:bg-white/[0.07]',
  };
  const cls = cn(base, variants[variant], className);

  if (!hasLink(href)) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Link not set yet — add it in .env or src/config/site.js"
        className={cn(cls, 'cursor-not-allowed opacity-45 disabled:hover:translate-y-0 disabled:hover:brightness-100')}
      >
        {Icon && <Icon size={16} />}
        {children}
      </button>
    );
  }

  const external = /^https?:/i.test(href);
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: true } : {})}
    >
      {Icon && <Icon size={16} />}
      {children}
    </a>
  );
}

/** Card with a cursor-following spotlight. */
export function SpotlightCard({ children, className = '', ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={cn('spotlight glow-border relative overflow-hidden rounded-2xl bg-white/[0.03]', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
