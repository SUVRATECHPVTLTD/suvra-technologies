import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';
import { TRANSITION_STANDARD } from '../../config/motion';
import { BackToTop } from '../ui/BackToTop';
import { FloatingWhatsApp } from '../ui/FloatingWhatsApp';
import { Footer } from './Footer';
import { Header } from './Header';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <div className="min-h-screen overflow-x-clip flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#2563EB] focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>

      <Header />

      <motion.main
        id="main-content"
        key={pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={TRANSITION_STANDARD}
        className="flex-1"
      >
        <Outlet />
      </motion.main>

      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </div>
  );
}
