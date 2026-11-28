import { useRef, useState } from 'react';
import { ArrowRight, Code2, Cpu, Globe, Layers, Smartphone } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MOTION_DURATIONS,
  MOTION_EASING,
  TRANSITION_MICRO,
  maskRevealVariants,
  svgPathDrawVariants,
} from '../../config/motion';
import { SITE_CONFIG } from '../../config/site';
import { Container } from '../ui/Container';
import { RevealOnScroll, TextMaskReveal } from '../ui/MotionPrimitives';

const HERO_SOLUTION_NODES = [
  {
    id: 'web',
    short: 'WEB',
    label: 'Website Development',
    tech: 'Next.js · React · Performance',
    detail:
      'Conversion-focused business websites, portals, and corporate platforms engineered for speed, accessibility, and search visibility.',
    outcome: 'Sub-second edge delivery & WCAG-aligned UX',
    href: '/services/website-development',
    cx: 230,
    cy: 56,
    path: 'M 230 56 C 230 104 230 134 230 162',
    glyph: 'M -6 0 A 6 6 0 1 0 6 0 A 6 6 0 1 0 -6 0 M -6 0 L 6 0 M 0 -6 A 9 6 0 0 1 0 6',
  },
  {
    id: 'apps',
    short: 'APPS',
    label: 'Mobile App Development',
    tech: 'Android · iOS · Cross-Platform',
    detail:
      'Responsive, offline-tolerant mobile applications built for dependable customer engagement and field team workflows.',
    outcome: 'Unified API contracts across mobile & web',
    href: '/services/mobile-app-development',
    cx: 82,
    cy: 188,
    path: 'M 82 188 C 118 188 142 188 170 188',
    glyph: 'M -4.5 -7 L 4.5 -7 L 4.5 7 L -4.5 7 Z M -1.5 4.5 L 1.5 4.5',
  },
  {
    id: 'software',
    short: 'SOFTWARE',
    label: 'Custom Software Solutions',
    tech: 'ERP · CRM · SaaS Systems',
    detail:
      'Tailored operational platforms, role-scoped business tools, and modular APIs designed around your exact workflows.',
    outcome: 'Clean code ownership without off-the-shelf bloat',
    href: '/services/custom-software-development',
    cx: 378,
    cy: 188,
    path: 'M 378 188 C 342 188 318 188 290 188',
    glyph: 'M -6 -4 L -2 0 L -6 4 M 6 -4 L 2 0 L 6 4 M -1 5 L 1 -5',
  },
  {
    id: 'ai',
    short: 'AI',
    label: 'Artificial Intelligence & Automation',
    tech: 'Workflows · Triage · Guardrailed AI',
    detail:
      'Practical AI automation and structured intake assistants that remove manual bottlenecks with deterministic safeguards.',
    outcome: 'Auditable workflows with human-in-the-loop escalation',
    href: '/services/ai-business-automation',
    cx: 230,
    cy: 318,
    path: 'M 230 318 C 230 270 230 242 230 214',
    glyph: 'M -4 -4 L 4 -4 L 4 4 L -4 4 Z M 0 -7 L 0 -4 M 0 4 L 0 7 M -7 0 L -4 0 M 4 0 L 7 0',
  },
] as const;

const ORBITAL_PERIMETER_ARCS = [
  'M 230 56 C 230 116, 82 122, 82 188',
  'M 230 56 C 230 116, 378 122, 378 188',
  'M 82 188 C 82 254, 230 260, 230 318',
  'M 378 188 C 378 254, 230 260, 230 318',
] as const;

const HERO_CAPABILITY_TILES = [
  {
    index: '01',
    title: 'Website Development',
    subtitle: 'Websites & client portals',
    href: '/services/website-development',
    icon: Globe,
  },
  {
    index: '02',
    title: 'Mobile Applications',
    subtitle: 'Android & iOS mobile apps',
    href: '/services/mobile-app-development',
    icon: Smartphone,
  },
  {
    index: '03',
    title: 'Custom Software',
    subtitle: 'ERP, CRM & SaaS systems',
    href: '/services/custom-software-development',
    icon: Code2,
  },
  {
    index: '04',
    title: 'AI & Automation',
    subtitle: 'Workflows & AI agents',
    href: '/services/ai-business-automation',
    icon: Cpu,
  },
] as const;

export function HeroSection() {
  const [activeNodeId, setActiveNodeId] =
    useState<(typeof HERO_SOLUTION_NODES)[number]['id']>('web');
  const activeNode =
    HERO_SOLUTION_NODES.find((node) => node.id === activeNodeId) ?? HERO_SOLUTION_NODES[0];
  const visualRef = useRef<HTMLDivElement>(null);
  const isVisualInView = useInView(visualRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = Boolean(isVisualInView && !prefersReducedMotion);

  return (
    <section className="relative overflow-hidden pt-7 pb-12 sm:pt-10 sm:pb-14 lg:pt-12 lg:pb-16 bg-[var(--bg-canvas)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-[#2563EB]/[0.06] via-[#06B6D4]/[0.025] to-transparent dark:from-[#2563EB]/[0.14] dark:via-[#06B6D4]/[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[480px] h-[480px] rounded-full bg-radial from-[#06B6D4]/10 via-[#2563EB]/5 to-transparent blur-3xl dark:from-[#06B6D4]/15"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASING }}
              className="font-mono text-xs font-medium tracking-wider uppercase text-[#2563EB] dark:text-[#06B6D4] mb-3.5"
            >
              {SITE_CONFIG.positioning}
            </motion.p>

            <h1 className="font-display text-[clamp(2rem,3.5vw,3.35rem)] font-bold leading-[1.08] tracking-tight text-[var(--text-primary)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block xl:whitespace-nowrap"
                  variants={maskRevealVariants}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  animate="visible"
                  transition={{
                    duration: MOTION_DURATIONS.hero,
                    delay: 0.04,
                    ease: MOTION_EASING,
                  }}
                >
                  Engineering Tomorrow.
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block xl:whitespace-nowrap text-[#2563EB] dark:text-[#06B6D4]"
                  variants={maskRevealVariants}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  animate="visible"
                  transition={{
                    duration: MOTION_DURATIONS.hero,
                    delay: 0.14,
                    ease: MOTION_EASING,
                  }}
                >
                  Empowering Today.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATIONS.section,
                delay: 0.2,
                ease: MOTION_EASING,
              }}
              className="mt-5 text-base sm:text-[17px] text-[var(--text-secondary)] leading-relaxed max-w-xl"
            >
              We build high-performance websites, mobile applications, custom software and intelligent AI solutions designed around your business.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATIONS.section,
                delay: 0.26,
                ease: MOTION_EASING,
              }}
              className="mt-7 flex flex-wrap items-center gap-3.5"
            >
              <Link
                to="/start-a-project"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all duration-150 active:scale-[0.98] whitespace-nowrap shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                Explore Services
              </Link>
            </motion.div>

            <motion.dl
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: MOTION_DURATIONS.section, delay: 0.34, ease: MOTION_EASING }}
              className="mt-8 pt-5 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <dt className="font-mono text-[11px] text-[var(--text-muted)]">Delivery Scope</dt>
                <dd className="mt-0.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                  14 Services
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] text-[var(--text-muted)]">Headquarters</dt>
                <dd className="mt-0.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                  Muzaffarpur, India
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] text-[var(--text-muted)]">Markets</dt>
                <dd className="mt-0.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                  India &amp; Global
                </dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            ref={visualRef}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: MOTION_DURATIONS.hero, delay: 0.14, ease: MOTION_EASING }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.26] dark:opacity-[0.16]"
              />

              <div className="order-1 relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Core Digital Capabilities
                </span>
                <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                  Select Solution
                </span>
              </div>

              <div className="order-3 sm:order-2 relative z-10 my-2.5">
                <svg
                  viewBox="0 0 460 374"
                  className="w-full h-auto max-h-[195px] sm:max-h-[304px]"
                  role="img"
                  aria-label="Interactive diagram of Suvra Technologies core solutions: Web, Mobile Apps, Custom Software, and AI Automation"
                >
                  <defs>
                    <radialGradient id="suvra-core-aura" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
                      <stop offset="55%" stopColor="#06B6D4" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="suvra-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>

                  <circle cx="230" cy="188" r="160" fill="url(#suvra-core-aura)" />

                  <circle
                    cx="230"
                    cy="188"
                    r="156"
                    fill="none"
                    className="stroke-[var(--border-subtle)]"
                    strokeWidth="1"
                  />
                  <circle
                    cx="230"
                    cy="188"
                    r="136"
                    fill="none"
                    stroke="url(#suvra-arc-grad)"
                    strokeOpacity="0.35"
                    strokeDasharray="14 10 3 10"
                    strokeWidth="1.25"
                    className="suvra-orbit-slow"
                    data-paused={!shouldAnimate ? 'true' : undefined}
                  />
                  <ellipse
                    cx="230"
                    cy="188"
                    rx="174"
                    ry="68"
                    fill="none"
                    className="stroke-[var(--border-strong)]/45"
                    strokeDasharray="4 6"
                    strokeWidth="1"
                  />
                  <circle
                    cx="230"
                    cy="188"
                    r="88"
                    fill="none"
                    className="stroke-[var(--border-subtle)]"
                    strokeWidth="1"
                  />

                  {[
                    [230, 14, 230, 24],
                    [230, 350, 230, 360],
                    [52, 188, 62, 188],
                    [398, 188, 408, 188],
                  ].map(([x1, y1, x2, y2], idx) => (
                    <line
                      key={idx}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      className="stroke-[var(--border-strong)]"
                      strokeWidth="1.25"
                    />
                  ))}

                  {ORBITAL_PERIMETER_ARCS.map((d, idx) => (
                    <motion.path
                      key={`mesh-${idx}`}
                      d={d}
                      fill="none"
                      stroke={idx % 2 === 0 ? '#2563EB' : '#06B6D4'}
                      strokeOpacity="0.34"
                      strokeWidth="1.3"
                      variants={svgPathDrawVariants}
                      initial={prefersReducedMotion ? 'visible' : 'hidden'}
                      animate="visible"
                      transition={{ duration: 0.7, delay: 0.14 + idx * 0.07, ease: MOTION_EASING }}
                    />
                  ))}

                  {HERO_SOLUTION_NODES.map((node) => {
                    const isSelected = node.id === activeNode.id;
                    return (
                      <path
                        key={`connector-${node.id}`}
                        d={node.path}
                        fill="none"
                        className={
                          isSelected
                            ? 'stroke-[#2563EB] dark:stroke-[#06B6D4] suvra-dash-flow'
                            : 'stroke-[var(--border-strong)]'
                        }
                        data-paused={!shouldAnimate ? 'true' : undefined}
                        strokeWidth={isSelected ? 2.4 : 1.25}
                        strokeDasharray={isSelected ? '6 6' : '3 4'}
                      />
                    );
                  })}

                  {shouldAnimate && (
                    <motion.circle
                      key={`pulse-${activeNode.id}`}
                      cx={activeNode.cx}
                      cy={activeNode.cy}
                      r={34}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="1.5"
                      initial={{ scale: 0.84, opacity: 0.6 }}
                      animate={{ scale: 1.24, opacity: 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}

                  {/* Central Hub */}
                  <g>
                    <rect
                      x="170"
                      y="160"
                      width="120"
                      height="56"
                      rx="14"
                      className="fill-[#071426] stroke-[#2563EB]"
                      strokeWidth="1.75"
                    />
                    <rect
                      x="175"
                      y="165"
                      width="110"
                      height="46"
                      rx="10"
                      fill="none"
                      stroke="#06B6D4"
                      strokeOpacity="0.32"
                      strokeWidth="1"
                    />
                    <text
                      x="230"
                      y="184"
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11.5"
                      fontWeight="700"
                      fontFamily="Space Grotesk, sans-serif"
                    >
                      SUVRA
                    </text>
                    <text
                      x="230"
                      y="199"
                      textAnchor="middle"
                      fill="#06B6D4"
                      fontSize="8.8"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      Digital Solutions
                    </text>
                  </g>

                  {HERO_SOLUTION_NODES.map((node) => {
                    const isSelected = node.id === activeNode.id;
                    return (
                      <g
                        key={node.id}
                        onClick={() => setActiveNodeId(node.id)}
                        className="cursor-pointer group"
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`Inspect ${node.label}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveNodeId(node.id);
                          }
                        }}
                      >
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isSelected ? 34 : 29}
                          className={
                            isSelected
                              ? 'fill-[#2563EB] stroke-[#06B6D4]'
                              : 'fill-[var(--bg-surface)] stroke-[var(--border-strong)] group-hover:stroke-[#2563EB]'
                          }
                          strokeWidth={isSelected ? 2.25 : 1.5}
                        />
                        <g
                          transform={`translate(${node.cx}, ${node.cy - 8})`}
                          className={
                            isSelected
                              ? 'stroke-white'
                              : 'stroke-[#2563EB] dark:stroke-[#06B6D4]'
                          }
                          fill="none"
                          strokeWidth="1.45"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={node.glyph} />
                        </g>
                        <text
                          x={node.cx}
                          y={node.cy + 15}
                          textAnchor="middle"
                          fontSize={node.short.length > 5 ? '7.8' : '9'}
                          fontWeight="600"
                          fontFamily="JetBrains Mono, monospace"
                          fill={isSelected ? '#FFFFFF' : 'currentColor'}
                          className={isSelected ? '' : 'fill-[var(--text-primary)]'}
                        >
                          {node.short}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div
                className="order-2 sm:order-3 relative z-10 mt-2.5 sm:my-2.5 grid grid-cols-4 gap-1 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
                role="group"
                aria-label="Core business solutions"
              >
                {HERO_SOLUTION_NODES.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  return (
                    <button
                      key={`btn-${node.id}`}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      aria-pressed={isSelected}
                      className={`relative min-h-[42px] sm:min-h-[44px] px-1 sm:px-2 py-2 rounded-lg font-mono text-[10px] sm:text-[11px] font-medium transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                        isSelected
                          ? 'text-white'
                          : 'text-[var(--text-primary)] hover:text-[#2563EB] dark:hover:text-[#06B6D4]'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="hero-node-pill"
                          transition={TRANSITION_MICRO}
                          className="absolute inset-0 rounded-lg bg-[#2563EB] shadow-xs"
                        />
                      )}
                      <span className="relative z-10">{node.short}</span>
                    </button>
                  );
                })}
              </div>

              <div className="order-4 relative z-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-3.5 sm:p-4 pr-14 sm:pr-4 min-h-[112px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={TRANSITION_MICRO}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                        {activeNode.label}
                      </p>
                      <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                        {activeNode.tech}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {activeNode.detail}
                    </p>
                    <div className="mt-2.5 pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">
                        {activeNode.outcome}
                      </span>
                      <Link
                        to={activeNode.href}
                        className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4] hover:underline underline-offset-4 whitespace-nowrap"
                      >
                        <span>Explore {activeNode.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export function CapabilityStrip() {
  return (
    <section
      aria-label="Highlighted technology capabilities"
      className="border-t border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-5 sm:py-6"
    >
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {HERO_CAPABILITY_TILES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.href}
                className="group flex items-center gap-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-3 transition-all duration-150 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <div className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center text-[#2563EB] dark:text-[#06B6D4] shrink-0">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] tabular-nums text-[#2563EB] dark:text-[#06B6D4]">
                      {item.index}
                    </span>
                    <span className="font-display text-sm font-semibold text-[var(--text-primary)] truncate group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{item.subtitle}</p>
                </div>
                <ArrowRight
                  className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] group-hover:translate-x-0.5 transition-all shrink-0"
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function AboutOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = Boolean(isInView && !prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 bg-[#071426] text-[#F8FAFC] border-t border-slate-800 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <RevealOnScroll direction="right" distance={16} className="lg:col-span-6">
            <p className="font-mono text-xs font-medium tracking-wider uppercase text-[#06B6D4] mb-3">
              About Suvra Technologies
            </p>
            <TextMaskReveal>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Engineering Solutions. Creating Products.
              </h2>
            </TextMaskReveal>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Established in 2026 and headquartered in Muzaffarpur, Bihar, Suvra Technologies pairs dependable client software engineering with focused research into modular SaaS platforms, mobile applications, and guardrailed AI systems.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-slate-800">
              <div>
                <p className="font-mono text-[11px] text-slate-400">Headquarters</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-white leading-snug">
                  Ramdyalu, Muzaffarpur, Bihar – 842002
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-slate-400">Target Markets</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-white">
                  {SITE_CONFIG.targetMarkets}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] text-slate-400">Infrastructure Bias</p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-white">
                  Cloudflare-First + OCI
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
              >
                <span>Discover Our Approach</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#06B6D4] hover:text-white transition-colors whitespace-nowrap"
              >
                <span>View Products Roadmap</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-6 space-y-4">
            <svg viewBox="0 0 600 46" className="w-full h-auto hidden sm:block" aria-hidden="true">
              <path
                d="M 100 28 C 180 6, 220 6, 300 28 C 380 48, 420 48, 500 28"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
                className="suvra-dash-flow"
                data-paused={!shouldAnimate ? 'true' : undefined}
              />
              <circle cx="100" cy="28" r="5" fill="#2563EB" />
              <circle cx="300" cy="28" r="6" fill="#06B6D4" />
              <circle cx="500" cy="28" r="5" fill="#2563EB" />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
              <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-5 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-xs text-[#06B6D4]">Track 01</p>
                  <h3 className="mt-2 font-display text-base font-semibold text-white">
                    Client Services
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Custom software, websites, mobile apps, AI workflows, and cloud consulting built around business goals.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#2563EB]/70 bg-[#162238] p-5 flex flex-col items-center justify-center text-center">
                <Layers className="w-6 h-6 text-[#06B6D4] mb-2.5" aria-hidden="true" />
                <p className="font-display text-sm font-semibold text-white">
                  Shared Engineering Core
                </p>
                <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                  TypeScript contracts, accessibility tokens, and Cloudflare-first architecture patterns.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-5 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-xs text-[#06B6D4]">Track 02</p>
                  <h3 className="mt-2 font-display text-base font-semibold text-white">
                    Proprietary Products
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Ongoing R&amp;D toward focused SaaS utilities, mobile tools, and AI-enabled software products.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export const CompanyIntroSection = AboutOverviewSection;
