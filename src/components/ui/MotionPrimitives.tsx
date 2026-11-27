import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import {
  MOTION_EASING,
  MOTION_DURATIONS,
  staggerContainerVariants,
  staggerItemVariants,
} from '../../config/motion';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealOnScroll({ children, delay = 0, className = '' }: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
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
}

export function AnimatedHeading({
  children,
  as = 'h1',
  delay = 0.06,
  className = '',
}: AnimatedHeadingProps) {
  const Component = motion[as];
  return (
    <Component
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: MOTION_DURATIONS.hero, delay, ease: MOTION_EASING }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggerGrid({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
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
