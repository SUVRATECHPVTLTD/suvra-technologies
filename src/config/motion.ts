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

export const TRANSITION_HERO: Transition = {
  duration: MOTION_DURATIONS.hero,
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

/**
 * Genuine clip-path + vertical rise mask reveal for typography and editorial headlines.
 */
export const maskRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    clipPath: 'inset(0% 0% 100% 0%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: TRANSITION_HERO,
  },
};

/**
 * Editorial frame/media horizontal wipe reveal with restrained scale settling.
 */
export const editorialWipeVariants: Variants = {
  hidden: {
    opacity: 0.25,
    scale: 1.03,
    clipPath: 'inset(0% 100% 0% 0%)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.65,
      ease: MOTION_EASING,
    },
  },
};

/**
 * Directional axis reveal preset for asymmetric layouts and split columns.
 */
export function directionalRevealVariants(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance = 20
): Variants {
  const axisOffset =
    direction === 'up'
      ? { y: distance, x: 0 }
      : direction === 'down'
        ? { y: -distance, x: 0 }
        : direction === 'left'
          ? { x: distance, y: 0 }
          : { x: -distance, y: 0 };

  return {
    hidden: { opacity: 0, ...axisOffset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: TRANSITION_SECTION,
    },
  };
}

/**
 * Scroll/viewport-triggered SVG vector path drawing preset.
 */
export const svgPathDrawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0.2 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.85, ease: MOTION_EASING },
      opacity: { duration: 0.25, ease: MOTION_EASING },
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
