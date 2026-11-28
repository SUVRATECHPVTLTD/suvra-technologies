import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  MOTION_DURATIONS,
  MOTION_EASING,
  directionalRevealVariants,
  editorialWipeVariants,
  maskRevealVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from '../../config/motion';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  direction = 'up',
  distance = 18,
  className = '',
}: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = directionalRevealVariants(direction, prefersReducedMotion ? 0 : distance);

  return (
    <motion.div
      variants={variants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: MOTION_DURATIONS.section, delay, ease: MOTION_EASING }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedHeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  delay?: number;
  className?: string;
  triggerOnScroll?: boolean;
}

export function AnimatedHeading({
  children,
  as = 'h1',
  delay = 0.06,
  className = '',
  triggerOnScroll = false,
}: AnimatedHeadingProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(wrapperRef, { once: true, amount: 'some' });
  const Component = motion[as];

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <div ref={wrapperRef} className="overflow-hidden pb-1 -mb-1">
      <Component
        variants={maskRevealVariants}
        initial="hidden"
        animate={!triggerOnScroll || isInView ? 'visible' : 'hidden'}
        transition={{ duration: MOTION_DURATIONS.hero, delay, ease: MOTION_EASING }}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
}

export function TextMaskReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(wrapperRef, { once: true, amount: 'some' });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={wrapperRef} className="overflow-hidden pb-1 -mb-1">
      <motion.div
        variants={maskRevealVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: MOTION_DURATIONS.section, delay, ease: MOTION_EASING }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function EditorialFrame({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(wrapperRef, { once: true, amount: 'some' });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={wrapperRef} className={className}>
      <motion.div
        variants={editorialWipeVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{ duration: 0.65, delay, ease: MOTION_EASING }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerGrid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 'some' });

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={prefersReducedMotion || isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
