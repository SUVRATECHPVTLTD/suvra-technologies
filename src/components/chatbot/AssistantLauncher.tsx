import { motion, useReducedMotion } from 'motion/react';
import { ASSISTANT_CONFIG } from '../../config/assistant';
import { TRANSITION_MICRO } from '../../config/motion';
import { BRAND_ASSETS } from '../../config/site';
import { useAssistant } from './AssistantProvider';

export function AssistantLauncher() {
  const { isOpen, toggleAssistant, launcherRef } = useAssistant();
  const prefersReducedMotion = useReducedMotion();

  if (!ASSISTANT_CONFIG.enabled) return null;

  return (
    <div className="relative group flex items-center justify-end">
      <span
        role="tooltip"
        className="pointer-events-none hidden sm:inline-block mr-3 px-2.5 py-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[11px] font-medium text-[var(--text-primary)] shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-all duration-150 whitespace-nowrap"
      >
        Ask Suvra AI
      </span>

      <motion.button
        ref={launcherRef}
        type="button"
        onClick={toggleAssistant}
        aria-label={isOpen ? 'Close Suvra AI Assistant' : 'Ask Suvra AI'}
        aria-expanded={isOpen}
        aria-controls="suvra-assistant-dialog"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
        transition={TRANSITION_MICRO}
        className="relative inline-flex items-center justify-center w-[46px] h-[46px] sm:w-[54px] sm:h-[54px] rounded-full bg-[#071426] border border-[#2563EB]/75 shadow-[0_10px_28px_-8px_rgba(37,99,235,0.55)] hover:border-[#06B6D4] hover:shadow-[0_12px_30px_-6px_rgba(6,182,212,0.5)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#06B6D4]"
      >
        {/* Subtle orbital halo ring — animates around the official emblem without touching the logo itself */}
        <svg
          viewBox="0 0 64 64"
          className="pointer-events-none absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="1.25"
            strokeDasharray="18 12 6 12"
            strokeOpacity="0.6"
            className="suvra-orbit-halo"
            data-paused={prefersReducedMotion || isOpen ? 'true' : 'false'}
          />
        </svg>

        {/* Official immutable ST symbol derivative — never distorted, recolored, or animated */}
        <img
          src={BRAND_ASSETS.symbolDarkBg}
          alt="Suvra AI Assistant"
          width={682}
          height={654}
          className="w-6 h-6 sm:w-7 sm:h-7 object-contain select-none pointer-events-none"
        />
      </motion.button>
    </div>
  );
}
