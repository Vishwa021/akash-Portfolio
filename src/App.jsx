import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import CursorGlow from './components/CursorGlow.jsx';
import Home from './pages/Home.jsx';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));

function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-sm text-violet-400">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Page not found</h1>
      <a href="/" className="mt-6 text-sm text-violet-300 hover:text-white">
        ← Back to home
      </a>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-ink-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-violet-500 focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <ScrollToTopOnRoute />
      <CursorGlow />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <Suspense fallback={<div className="min-h-[70vh]" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <BackToTop />
    </div>
  );
}
