import { motion, useReducedMotion } from 'motion/react';
import { TRANSITION_MICRO } from '../../config/motion';
import { SITE_CONFIG } from '../../config/site';

const WHATSAPP_PREFILL_URL = `${SITE_CONFIG.whatsappHref}?text=${encodeURIComponent(
  'Hello Suvra Technologies, I would like to discuss my project requirements.'
)}`;

export function FloatingWhatsApp() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative group flex items-center justify-end">
      <span
        role="tooltip"
        className="pointer-events-none hidden sm:inline-block mr-3 px-2.5 py-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[11px] font-medium text-[var(--text-primary)] shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-all duration-150 whitespace-nowrap"
      >
        Chat with Suvra Technologies on WhatsApp
      </span>

      <motion.a
        href={WHATSAPP_PREFILL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Suvra Technologies on WhatsApp"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={TRANSITION_MICRO}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06, y: -1 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        className="inline-flex items-center justify-center w-[50px] h-[50px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_10px_24px_-6px_rgba(37,211,102,0.55)] border border-white/25 transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#25D366]"
      >
        {/* Official WhatsApp speech-bubble and handset glyph */}
        <svg
          viewBox="0 0 32 32"
          className="w-6 h-6 sm:w-[26px] sm:h-[26px] fill-current"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.06 0-12.8 5.736-12.8 12.796 0 2.256.592 4.46 1.716 6.404L3.1 29.02l6.796-1.78a12.76 12.76 0 0 0 6.108 1.556h.004c7.056 0 12.796-5.74 12.796-12.8 0-3.42-1.332-6.632-3.752-9.052A12.712 12.712 0 0 0 16.004 3.2zm7.448 18.212c-.312.88-1.82 1.68-2.516 1.784-.64.096-1.452.136-2.344-.148-.54-.172-1.236-.404-2.124-.788-3.74-1.616-6.18-5.38-6.368-5.632-.184-.248-1.52-2.024-1.52-3.86 0-1.836.964-2.74 1.304-3.112.34-.372.744-.464.992-.464.248 0 .496.004.712.012.228.012.536-.088.836.636.312.748 1.056 2.58 1.148 2.768.092.188.156.408.032.656-.124.248-.188.404-.372.62-.188.216-.392.484-.56.652-.188.188-.384.392-.164.768.216.372.968 1.596 2.08 2.588 1.428 1.272 2.632 1.668 3.004 1.852.372.188.588.156.804-.092.216-.248.932-1.088 1.18-1.46.248-.372.496-.312.836-.188.34.124 2.172 1.024 2.544 1.212.372.188.62.28.712.436.092.156.092.9-.22 1.78z" />
        </svg>
      </motion.a>
    </div>
  );
}
