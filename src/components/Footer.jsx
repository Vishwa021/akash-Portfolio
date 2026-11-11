import { site } from '../config/site.js';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-x flex flex-col items-center justify-between gap-3 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with React, Tailwind CSS &amp; Framer Motion.
        </p>
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
          {site.email}
        </a>
      </div>
    </footer>
  );
}
