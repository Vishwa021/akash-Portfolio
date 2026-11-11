import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const script = [
  { type: 'cmd', text: 'python main.py --profile akash' },
  { type: 'out', text: '✓ backend modules loaded' },
  { type: 'out', text: '✓ langgraph agents compiled' },
  { type: 'out', text: '✓ api routes registered' },
  { type: 'cmd', text: 'curl localhost:8000/health' },
  { type: 'out', text: '{"status": "ok"}' },
];

const badges = [
  { label: 'Python', pos: 'left-[-18px] top-8', delay: 0 },
  { label: 'FastAPI', pos: 'right-[-14px] top-20 hidden sm:flex', delay: 0.8 },
  { label: 'LangGraph', pos: 'left-[-10px] bottom-24 hidden sm:flex', delay: 1.6 },
  { label: 'Gemma 4', pos: 'right-6 bottom-[-18px]', delay: 2.2 },
  { label: 'Django', pos: 'right-[34%] top-[-18px] hidden md:flex', delay: 1.2 },
];

const status = [
  { label: 'python', state: 'ready', color: 'bg-emerald-400' },
  { label: 'api', state: 'ready', color: 'bg-emerald-400' },
  { label: 'agents', state: 'idle', color: 'bg-amber-400' },
];

function useLoopingScript(length) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => (c > length + 2 ? 0 : c + 1)), 900);
    return () => clearInterval(id);
  }, [length]);
  return Math.min(count, length);
}

export default function DevWorkspace() {
  const visible = useLoopingScript(script.length);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-500/20 to-electric-500/20 blur-3xl" aria-hidden="true" />

      {badges.map((b) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + b.delay * 0.2 }}
          className={`absolute z-20 ${b.pos}`}
        >
          <span
            className="glass flex animate-float items-center rounded-full px-3 py-1.5 font-mono text-xs text-zinc-200 shadow-glow-lg"
            style={{ animationDelay: `${b.delay}s` }}
          >
            {b.label}
          </span>
        </motion.div>
      ))}

      <div className="glass relative overflow-hidden rounded-2xl shadow-glow-lg">
        {/* window chrome */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-red-400/80" />
            <span className="h-3 w-3 rounded-full bg-amber-400/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-xs text-muted">akash@workspace ~ python</span>
          <span className="w-10" />
        </div>

        {/* terminal */}
        <div className="min-h-[170px] space-y-1.5 px-4 py-4 font-mono text-[13px]" aria-hidden="true">
          {script.slice(0, visible).map((line, i) => (
            <div key={i} className={line.type === 'cmd' ? 'text-white' : 'text-emerald-300/90'}>
              {line.type === 'cmd' && <span className="mr-2 text-violet-400">$</span>}
              {line.text}
            </div>
          ))}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-violet-400" />
        </div>

        {/* code */}
        <div className="border-t border-white/10 bg-black/25 px-4 py-4 font-mono text-[12.5px] leading-relaxed">
          <pre className="overflow-x-auto">
            <code>
              <span className="code-kw">class</span> <span className="code-fn">Developer</span>:{'\n'}
              {'    '}name = <span className="code-str">"Akash Vishwakarma"</span>{'\n'}
              {'    '}focus = [<span className="code-str">"Backend"</span>, <span className="code-str">"AI Agents"</span>, <span className="code-str">"APIs"</span>]{'\n\n'}
              {'    '}<span className="code-kw">def</span> <span className="code-fn">build</span>(self, idea):{'\n'}
              {'        '}<span className="code-com"># clean architecture first</span>{'\n'}
              {'        '}<span className="code-kw">return</span> self.ship(idea)
            </code>
          </pre>
        </div>

        {/* status bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-muted">
          {status.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 animate-pulse-dot rounded-full ${s.color}`} />
              {s.label} · {s.state}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
