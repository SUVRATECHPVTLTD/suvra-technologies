import type { Transition, Variants } from 'motion/react';

/**
 * Centralized Motion Tokens for Suvra Technologies
 * Micro interaction: ~120–200ms
 * Standard interaction: ~200–350ms
 * Section reveal: ~400–700ms
 * Hero introduction: ~600–1000ms
 * Stagger delay: ~40–80ms
 */
export const MOTION_EASING = [0.16, 1, 0.3, 1] as const;

export const MOTION_DURATIONS = {
  micro: 0.16,
  standard: 0.28,
  section: 0.55,
  hero: 0.78,
  stagger: 0.06,
} as const;

export const TRANSITION_MICRO: Transition = {
  duration: MOTION_DURATIONS.micro,
  ease: MOTION_EASING,
};

export const TRANSITION_STANDARD: Transition = {
  duration: MOTION_DURATIONS.standard,
  ease: MOTION_EASING,
};

export const TRANSITION_SECTION: Transition = {
  duration: MOTION_DURATIONS.section,
  ease: MOTION_EASING,
};

export const fadeRiseVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_SECTION,
  },
};

export const maskRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.hero,
      ease: MOTION_EASING,
    },
  },
};

export const scaleEntranceVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITION_SECTION,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_DURATIONS.stagger,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITION_STANDARD,
  },
};
