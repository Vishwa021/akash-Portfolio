const env = import.meta.env;

/**
 * Project data.
 * `github` / `demo` are blank placeholders until real URLs are provided.
 * Set them via .env (VITE_*) or paste them here. Never invent links.
 *
 * `screenshots`: array of image paths under /public, e.g. '/screenshots/guardian-1.png'.
 * While empty, the detail page shows clearly labelled placeholder frames.
 */
export const projects = [
  {
    slug: 'guardian-ai',
    number: '01',
    featured: true,
    title: 'Guardian AI',
    category: 'Artificial Intelligence | Multi-Agent Systems',
    filter: 'AI',
    cover: 'guardian',
    summary:
      'Guardian AI is a multi-agent cybersecurity system powered by Gemma 4 31B, designed for automated threat analysis across multiple types of content.',
    stack: ['Python', 'Gemma 4 31B', 'FastAPI', 'Streamlit', 'LangGraph', 'OOP', 'Render'],
    features: [
      'Multi-agent architecture for intelligent threat analysis.',
      'Specialized vision analysis agent.',
      'Risk assessment agent.',
      'Automated security report generation.',
      'LangGraph-powered agent orchestration.',
      'Multimodal content processing.',
    ],
    github: env.VITE_GUARDIAN_GITHUB || '',
    demo: env.VITE_GUARDIAN_DEMO || '',
    hasDemo: true,
    screenshots: [],
  },
  {
    slug: 'careerflow',
    number: '02',
    featured: false,
    title: 'CareerFlow',
    category: 'Full-Stack Web Development',
    filter: 'Full-Stack',
    cover: 'careerflow',
    summary:
      'CareerFlow is a career exploration and guidance platform designed to help students discover career opportunities and access useful career-related information.',
    stack: ['Python', 'Django', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Secure user authentication.',
      'Dynamic career listings.',
      'Blogging functionality.',
      'User interactions.',
      'Administrative dashboard.',
      'Database-driven content management.',
    ],
    github: env.VITE_CAREERFLOW_GITHUB || '',
    demo: '',
    hasDemo: false,
    screenshots: [],
  },
  {
    slug: 'my-assistant-ai',
    number: '03',
    featured: false,
    title: 'My Assistant AI',
    category: 'AI | Python Automation',
    filter: 'Automation',
    cover: 'assistant',
    summary:
      'A Python-based voice-controlled personal assistant designed to automate daily activities and provide useful information through voice interactions.',
    stack: ['Python', 'OpenWeather API', 'SERP API', 'Gemini API'],
    features: [
      'Voice-controlled interactions.',
      'Reminder scheduling.',
      'Real-time weather updates.',
      'News article retrieval.',
      'External API integrations.',
    ],
    github: env.VITE_ASSISTANT_GITHUB || '',
    demo: '',
    hasDemo: false,
    screenshots: [],
  },
];

export const projectFilters = ['All', 'AI', 'Full-Stack', 'Automation'];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
