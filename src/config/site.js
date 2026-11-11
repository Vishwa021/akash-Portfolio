const env = import.meta.env;

/**
 * Central site configuration.
 * Links are intentionally blank until real URLs are provided.
 * Set them in a .env file (see .env.example) or paste them here.
 */
export const site = {
  name: 'Akash Vishwakarma',
  title: 'Python Developer | Backend Engineer | AI Enthusiast',
  email: 'akashvishwa021@gmail.com',
  location: 'Mumbai, India',
  links: {
    github: env.VITE_GITHUB_URL || '',
    linkedin: env.VITE_LINKEDIN_URL || '',
    resume: env.VITE_RESUME_URL || '',
  },
  formEndpoint: env.VITE_FORM_ENDPOINT || '',
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'hackathon', label: 'Hackathon' },
  { id: 'education', label: 'Education' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'contact', label: 'Contact' },
];
