import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '../config/site.js';
import { cn } from '../lib/utils.js';

export default function Navbar() {
  const { pathname, key } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [key]);

  // Highlight the section currently in view (home page only).
  useEffect(() => {
    setActive('');
    if (pathname !== '/') return undefined;
    let observer;
    const t = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 600);
    return () => {
      clearTimeout(t);
      observer?.disconnect();
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled || open ? 'border-b border-white/10 bg-ink-950/80 backdrop-blur-xl' : 'border-b border-transparent'
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Primary">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-electric-500 text-sm font-bold">
            A
          </span>
          <span className="hidden sm:inline">Akash V.</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                to={{ pathname: '/', hash: `#${item.id}` }}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm transition-colors hover:text-white',
                  active === item.id ? 'bg-white/[0.06] text-white' : 'text-muted'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pb-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    to={{ pathname: '/', hash: `#${item.id}` }}
                    className="block rounded-lg px-3 py-3 text-muted hover:bg-white/[0.05] hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
