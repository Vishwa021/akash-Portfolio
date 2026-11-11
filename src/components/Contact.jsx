import { useState } from 'react';
import { CheckCircle2, Loader2, Mail, MapPin, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons.jsx';
import { Reveal, SectionHeading, LinkButton } from './ui.jsx';
import { site } from '../config/site.js';
import { cn } from '../lib/utils.js';

const initial = { name: '', email: '', message: '', website: '' }; // `website` is a honeypot

const validate = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = 'Enter a valid email address.';
  if (v.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';
  return errors;
};

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-zinc-200">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (error) =>
  cn(
    'w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-violet-400/70 focus:bg-white/[0.05]',
    error ? 'border-red-400/60' : 'border-white/10'
  );

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | error

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.website) return; // bot
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (!site.formEndpoint) {
      // No email service configured: fall back to the visitor's mail client.
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
      const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
      setValues(initial);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="07 / Contact"
          title="Have an interesting project in mind?"
          subtitle="I'm always interested in connecting with developers, exploring opportunities, and building meaningful technology."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-4">
            <a
              href={`mailto:${site.email}`}
              className="glow-border flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                <Mail size={18} />
              </span>
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">Email</span>
                <span className="text-sm">{site.email}</span>
              </span>
            </a>
            <div className="glow-border flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                <MapPin size={18} />
              </span>
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">Location</span>
                <span className="text-sm">{site.location}</span>
              </span>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <LinkButton href={site.links.github} icon={GithubIcon}>
                GitHub
              </LinkButton>
              <LinkButton href={site.links.linkedin} icon={LinkedinIcon}>
                LinkedIn
              </LinkButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="glass space-y-5 rounded-2xl p-6 sm:p-8">
              {/* honeypot */}
              <input
                type="text"
                name="website"
                value={values.website}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <Field label="Name" id="name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={onChange}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputCls(errors.name)}
                />
              </Field>

              <Field label="Email" id="email" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={onChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputCls(errors.email)}
                />
              </Field>

              <Field label="Message" id="message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={onChange}
                  placeholder="Tell me about your project or opportunity…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={cn(inputCls(errors.message), 'resize-y')}
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-electric-500 px-5 py-3 text-sm font-medium text-white shadow-glow transition-all hover:brightness-110 disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              <div aria-live="polite" className="min-h-[1.25rem] text-sm">
                {status === 'sent' && (
                  <p className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={16} /> Message sent — thank you!
                  </p>
                )}
                {status === 'mailto' && (
                  <p className="text-zinc-300">Opening your email app with the message ready to send…</p>
                )}
                {status === 'error' && (
                  <p className="text-red-400">
                    Something went wrong. Please email me directly at{' '}
                    <a className="underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
