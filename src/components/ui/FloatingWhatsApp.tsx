import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { TRANSITION_MICRO } from '../../config/motion';
import { SITE_CONFIG } from '../../config/site';

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={SITE_CONFIG.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp with Suvra Technologies"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={TRANSITION_MICRO}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-30 inline-flex items-center justify-center gap-2 min-w-[44px] min-h-[44px] px-3 sm:px-4 rounded-full border border-[#06B6D4]/45 bg-[#071426] text-white shadow-lg hover:bg-[#0F172A] hover:border-[#06B6D4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <MessageSquare className="w-4 h-4 text-[#06B6D4] shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
        WhatsApp
      </span>
    </motion.a>
  );
}
