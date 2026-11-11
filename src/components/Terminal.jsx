import { useEffect, useRef, useState } from 'react';
import { Reveal, SectionHeading } from './ui.jsx';
import { site } from '../config/site.js';
import { projects } from '../data/projects.js';
import { skillGroups } from '../data/skills.js';
import { hasLink } from '../lib/utils.js';

const PROMPT = 'visitor@akash-portfolio:~$';
const COMMAND_NAMES = ['about', 'skills', 'projects', 'guardian', 'contact', 'github', 'clear', 'help'];

const linkOrNote = (url, label) => (hasLink(url) ? url : `${label} link not configured yet.`);

const commands = {
  help: () => [
    'Available commands:',
    '',
    '  about      who I am',
    '  skills     technologies I work with',
    '  projects   things I have built',
    '  guardian   details on Guardian AI',
    '  contact    how to reach me',
    '  github     my GitHub profile',
    '  clear      clear the terminal',
  ],
  about: () => [
    `${site.name} — Python Developer`,
    'Information Technology graduate focused on Python, backend engineering,',
    'APIs, and AI-powered applications including multi-agent systems.',
    `Location: ${site.location}`,
  ],
  skills: () =>
    skillGroups.map((g) => `${g.title.padEnd(22)} ${g.items.map((i) => i.name).join(', ')}`),
  projects: () => [
    ...projects.map((p) => `${p.number}  ${p.title.padEnd(16)} ${p.category}`),
    '',
    "Type 'guardian' for details on the featured project.",
  ],
  guardian: () => {
    const g = projects[0];
    return [
      `${g.title} — ${g.category}`,
      g.summary,
      '',
      'Key features:',
      ...g.features.map((f) => `  • ${f}`),
      '',
      `Stack: ${g.stack.join(', ')}`,
      `GitHub: ${linkOrNote(g.github, 'GitHub')}`,
      `Live demo: ${linkOrNote(g.demo, 'Demo')}`,
      'Full write-up: /projects/guardian-ai',
    ];
  },
  contact: () => [
    `Email:    ${site.email}`,
    `Location: ${site.location}`,
    `GitHub:   ${linkOrNote(site.links.github, 'GitHub')}`,
    `LinkedIn: ${linkOrNote(site.links.linkedin, 'LinkedIn')}`,
  ],
  github: () => [linkOrNote(site.links.github, 'GitHub')],
};

const WELCOME = ["Welcome to Akash's terminal.", "Type 'help' to see available commands."];

export default function Terminal() {
  const [history, setHistory] = useState([{ cmd: null, out: WELCOME }]);
  const [value, setValue] = useState('');
  const [past, setPast] = useState([]);
  const [pointer, setPointer] = useState(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  const exec = (raw) => {
    const cmd = raw.trim();
    if (!cmd) {
      setHistory((h) => [...h, { cmd: '', out: [] }]);
      return;
    }
    const key = cmd.toLowerCase();
    if (key === 'clear') {
      setHistory([]);
    } else {
      const out = commands[key]
        ? commands[key]()
        : [`command not found: ${cmd}`, "Type 'help' to see available commands."];
      setHistory((h) => [...h, { cmd, out }]);
    }
    setPast((p) => [cmd, ...p]);
    setPointer(-1);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      exec(value);
      setValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(pointer + 1, past.length - 1);
      if (next >= 0) {
        setPointer(next);
        setValue(past[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = pointer - 1;
      setPointer(next);
      setValue(next >= 0 ? past[next] : '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMAND_NAMES.find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const runChip = (c) => {
    exec(c);
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section id="terminal" className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="06 / Terminal"
          title="Explore my portfolio from the command line."
          subtitle="Type a command, or tap one below. Tab autocompletes, ↑ / ↓ browse history."
        />

        <Reveal>
          <div className="glass mx-auto max-w-3xl overflow-hidden rounded-2xl shadow-glow-lg">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
              </div>
              <span className="font-mono text-xs text-muted">akash-portfolio — bash</span>
            </div>

            <div
              ref={bodyRef}
              onClick={() => inputRef.current?.focus({ preventScroll: true })}
              className="h-[340px] cursor-text overflow-y-auto bg-black/30 p-4 font-mono text-[13px] leading-relaxed"
              role="log"
              aria-live="polite"
            >
              {history.map((entry, i) => (
                <div key={i} className="mb-2">
                  {entry.cmd !== null && (
                    <div>
                      <span className="text-violet-400">{PROMPT}</span> <span>{entry.cmd}</span>
                    </div>
                  )}
                  {entry.out.map((line, j) => (
                    <div key={j} className="min-h-[1.2em] whitespace-pre-wrap break-words text-zinc-300">
                      {line}
                    </div>
                  ))}
                </div>
              ))}

              <label className="flex items-center gap-2">
                <span className="shrink-0 text-violet-400">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal command input"
                  className="min-w-0 flex-1 bg-transparent text-white caret-violet-400 outline-none"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
              {COMMAND_NAMES.filter((c) => c !== 'help').map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => runChip(c)}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-violet-400/50 hover:text-white"
                >
                  {c}
                </button>
              ))}
              <button
                type="button"
                onClick={() => runChip('help')}
                className="rounded-md border border-violet-400/40 bg-violet-500/10 px-2.5 py-1 font-mono text-xs text-violet-200 hover:text-white"
              >
                help
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
