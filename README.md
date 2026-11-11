# Akash Vishwakarma — Portfolio

React + Vite + Tailwind CSS + Framer Motion + Lucide React.

## Run it

```bash
npm install
cp .env.example .env   # then fill in the values you have
npm run dev            # http://localhost:5173
npm run build          # production build in dist/
```

## Replace the placeholders

Nothing here is invented: every link you haven't provided is blank, and its button renders disabled with a "link not set yet" tooltip until you fill it in.

| What | Where |
| --- | --- |
| GitHub, LinkedIn, resume URL | `.env` → `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_RESUME_URL` |
| Project repos / Guardian AI live demo | `.env` → `VITE_GUARDIAN_GITHUB`, `VITE_GUARDIAN_DEMO`, `VITE_CAREERFLOW_GITHUB`, `VITE_ASSISTANT_GITHUB` |
| Project screenshots | put images in `public/screenshots/`, list paths in `src/data/projects.js` (`screenshots: []`) |
| Resume file | drop `resume.pdf` in `public/` and set `VITE_RESUME_URL=/resume.pdf` |
| Contact form email service | `.env` → `VITE_FORM_ENDPOINT` (Formspree-compatible). If blank, the form opens the visitor's email app addressed to you. |

## Structure

```
src/
  config/site.js        name, email, links, nav
  data/projects.js      project content (single source of truth)
  data/skills.js        skill categories
  components/           Hero, About, Skills, Projects, Hackathon, Education,
                        Terminal, Contact, Navbar, ui.jsx (shared primitives) …
  pages/                Home, ProjectDetail (with Guardian AI architecture + workflow)
```

## Notes

- The Guardian AI "Architecture overview" and "Agent workflow" are a simplified view built from the features you listed. Edit `src/pages/ProjectDetail.jsx` and `src/components/AgentWorkflow.jsx` so they match the real implementation.
- Project cover images are generated SVGs (`CoverArt.jsx`). Swap in real screenshots whenever you like.
- Deploy to Vercel or Netlify as-is: `vercel.json` and `public/_redirects` handle SPA routing for `/projects/:slug`.
