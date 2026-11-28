import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Outlet, useLocation } from 'react-router-dom';
import { TRANSITION_STANDARD } from '../../config/motion';
import { AssistantLauncher } from '../chatbot/AssistantLauncher';
import { AssistantPanel } from '../chatbot/AssistantPanel';
import { AssistantProvider, useAssistant } from '../chatbot/AssistantProvider';
import { BackToTop } from '../ui/BackToTop';
import { FloatingWhatsApp } from '../ui/FloatingWhatsApp';
import { Footer } from './Footer';
import { Header } from './Header';

function FloatingControlStack() {
  const { isOpen } = useAssistant();

  return (
    <>
      <div
        aria-label="Quick communication and navigation tools"
        className={`fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-30 flex flex-col items-end gap-2 sm:gap-3 pointer-events-none transition-opacity duration-150 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <div className="pointer-events-auto">
          <BackToTop />
        </div>
        <div className="pointer-events-auto">
          <FloatingWhatsApp />
        </div>
        <div className="pointer-events-auto">
          <AssistantLauncher />
        </div>
      </div>

      <AssistantPanel />
    </>
  );
}

export function Layout() {
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return (
    <AssistantProvider>
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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={TRANSITION_STANDARD}
          className="flex-1"
        >
          <Outlet />
        </motion.main>

        <Footer />
        <FloatingControlStack />
      </div>
    </AssistantProvider>
  );
}
