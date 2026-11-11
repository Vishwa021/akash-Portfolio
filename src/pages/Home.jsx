import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Hackathon from '../components/Hackathon.jsx';
import Education from '../components/Education.jsx';
import Terminal from '../components/Terminal.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  const { hash, key } = useLocation();

  useEffect(() => {
    document.title = 'Akash Vishwakarma — Python Developer | Backend Engineer | AI Enthusiast';
  }, []);

  // Scroll to the requested section (e.g. coming from a project page via /#projects).
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => clearTimeout(t);
  }, [hash, key]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Hackathon />
      <Education />
      <Terminal />
      <Contact />
    </>
  );
}
