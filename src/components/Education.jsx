import { GraduationCap } from 'lucide-react';
import { Reveal, SectionHeading } from './ui.jsx';

const items = [
  {
    degree: 'Bachelor of Science – Information Technology',
    school: 'L.S. Raheja College of Arts & Commerce',
    period: '2021 – 2025',
    score: 'CGPA: 8.2',
  },
  {
    degree: 'HSC',
    school: 'Patuck Junior College',
    period: '2019 – 2021',
    score: 'Percentage: 80.33%',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="05 / Education" title="Education." />

        <ol className="relative ml-4 border-l border-white/10 sm:ml-6">
          {items.map((item, i) => (
            <li key={item.degree} className="mb-10 ml-8 last:mb-0">
              <span className="absolute -left-[17px] flex h-8 w-8 items-center justify-center rounded-full border border-violet-400/50 bg-ink-900 text-violet-300 shadow-glow">
                <GraduationCap size={15} />
              </span>
              <Reveal delay={i * 0.08}>
                <p className="font-mono text-xs text-violet-400">{item.period}</p>
                <h3 className="mt-1 font-display text-xl font-semibold">{item.degree}</h3>
                <p className="mt-1 text-muted">{item.school}</p>
                <span className="mt-3 inline-block rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs text-zinc-200">
                  {item.score}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
