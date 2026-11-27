import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { TRANSITION_MICRO } from '../../config/motion';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={TRANSITION_MICRO}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-[4.5rem] right-4 sm:bottom-[4.75rem] sm:right-5 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-md hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
