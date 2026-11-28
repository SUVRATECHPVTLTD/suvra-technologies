import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
import { CAPABILITY_PILLARS } from '../../data/company';
import { Container, SectionHeader } from '../ui/Container';
import { RevealOnScroll } from '../ui/MotionPrimitives';

const ARCHITECTURE_NODES = [
  {
    id: 'edge',
    short: 'EDGE',
    label: 'Global Edge Perimeter',
    tech: 'Cloudflare Workers · Pages · Zero Trust',
    detail:
      'Anycast routing, TLS 1.3 security, and low-latency edge execution across India and global markets.',
    cx: 230,
    cy: 62,
    path: 'M 230 62 C 230 112 230 144 230 172',
    packetX: [230, 230, 230],
    packetY: [62, 118, 172],
    glyph: 'M -6 0 A 6 6 0 1 0 6 0 A 6 6 0 1 0 -6 0 M -6 0 L 6 0 M 0 -6 A 9 6 0 0 1 0 6',
  },
  {
    id: 'apps',
    short: 'APPS',
    label: 'Web, Mobile & SaaS Surfaces',
    tech: 'Next.js · React · TypeScript · Mobile',
    detail:
      'Responsive, WCAG-aligned customer interfaces and role-scoped administrative consoles.',
    cx: 84,
    cy: 196,
    path: 'M 84 196 C 122 196 146 196 174 196',
    packetX: [84, 128, 174],
    packetY: [196, 196, 196],
    glyph: 'M -6 -5 L 6 -5 L 6 5 L -6 5 Z M -6 -2 L 6 -2',
  },
  {
    id: 'ai',
    short: 'AI',
    label: 'Applied AI & Automation',
    tech: 'Grounded Agents · Schema Workflows',
    detail:
      'Deterministic validation paired with scoped AI classification, extraction, and escalation.',
    cx: 376,
    cy: 196,
    path: 'M 376 196 C 338 196 314 196 286 196',
    packetX: [376, 332, 286],
    packetY: [196, 196, 196],
    glyph: 'M -4 -4 L 4 -4 L 4 4 L -4 4 Z M 0 -7 L 0 -4 M 0 4 L 0 7 M -7 0 L -4 0 M 4 0 L 7 0',
  },
  {
    id: 'data',
    short: 'DATA',
    label: 'Relational Core & Backups',
    tech: 'Cloudflare D1 · R2 · Oracle Cloud (OCI)',
    detail:
      'Type-safe Drizzle schemas, zero-egress R2 storage, and selective OCI compute resilience.',
    cx: 230,
    cy: 330,
    path: 'M 230 330 C 230 280 230 248 230 220',
    packetX: [230, 230, 230],
    packetY: [330, 274, 220],
    glyph: 'M -6 -4 C -6 -6 6 -6 6 -4 L 6 4 C 6 6 -6 6 -6 4 Z M -6 0 C -6 2 6 2 6 0',
  },
] as const;

const ORBITAL_PERIMETER_ARCS = [
  'M 230 62 C 230 124, 84 128, 84 196',
  'M 230 62 C 230 124, 376 128, 376 196',
  'M 84 196 C 84 264, 230 268, 230 330',
  'M 376 196 C 376 264, 230 268, 230 330',
] as const;

export function HeroSection() {
  const [activeNodeId, setActiveNodeId] =
    useState<(typeof ARCHITECTURE_NODES)[number]['id']>('edge');
  const activeNode =
    ARCHITECTURE_NODES.find((node) => node.id === activeNodeId) ?? ARCHITECTURE_NODES[0];
  const visualRef = useRef<HTMLDivElement>(null);
  const isVisualInView = useInView(visualRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = Boolean(isVisualInView && !prefersReducedMotion);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-[var(--bg-canvas)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-[#2563EB]/[0.06] via-[#06B6D4]/[0.025] to-transparent dark:from-[#2563EB]/[0.14] dark:via-[#06B6D4]/[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-radial from-[#06B6D4]/10 via-[#2563EB]/5 to-transparent blur-3xl dark:from-[#06B6D4]/15"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASING }}
              className="font-mono text-xs font-medium tracking-wider uppercase text-[#2563EB] dark:text-[#06B6D4] mb-4"
            >
              {SITE_CONFIG.positioning}
            </motion.p>

            <h1 className="font-display text-[clamp(2.35rem,4.6vw,3.95rem)] font-bold leading-[1.06] tracking-tight text-[var(--text-primary)]">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
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
                  className="block text-[#2563EB] dark:text-[#06B6D4]"
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
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATIONS.section,
                delay: 0.22,
                ease: MOTION_EASING,
              }}
              className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl"
            >
              We design, engineer and deliver intelligent software, innovative technology products and scalable digital solutions that empower businesses to grow in a connected world.
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATIONS.section,
                delay: 0.28,
                ease: MOTION_EASING,
              }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
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
                Explore Our Services
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center py-2.5 px-1 text-sm font-medium text-[var(--text-secondary)] hover:text-[#2563EB] dark:hover:text-[#06B6D4] underline-offset-4 hover:underline whitespace-nowrap"
              >
                Discover Our Approach
              </Link>
            </motion.div>
          </div>

          <motion.div
            ref={visualRef}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 18, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: MOTION_DURATIONS.hero, delay: 0.14, ease: MOTION_EASING }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-6 shadow-[var(--shadow-card)] overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.28] dark:opacity-[0.18]"
              />

              <div className="relative z-10 flex items-center justify-between gap-3 pb-3.5 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Connected Systems Architecture
                </span>
                <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                  Select Node to Inspect
                </span>
              </div>

              <div className="relative z-10 my-3">
                <svg
                  viewBox="0 0 460 392"
                  className="w-full h-auto max-h-[340px]"
                  role="img"
                  aria-label="Interactive Suvra Technologies connected systems architecture diagram"
                >
                  <defs>
                    <radialGradient id="suvra-core-aura" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                      <stop offset="55%" stopColor="#06B6D4" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="suvra-arc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>

                  <circle cx="230" cy="196" r="168" fill="url(#suvra-core-aura)" />

                  {/* Precision Concentric Orbital Rings */}
                  <circle
                    cx="230"
                    cy="196"
                    r="164"
                    fill="none"
                    className="stroke-[var(--border-subtle)]"
                    strokeWidth="1"
                  />
                  <motion.circle
                    cx="230"
                    cy="196"
                    r="142"
                    fill="none"
                    stroke="url(#suvra-arc-grad)"
                    strokeOpacity="0.35"
                    strokeDasharray="14 10 3 10"
                    strokeWidth="1.25"
                    style={{ originX: '230px', originY: '196px' }}
                    animate={shouldAnimate ? { rotate: 360 } : undefined}
                    transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                  />
                  <ellipse
                    cx="230"
                    cy="196"
                    rx="178"
                    ry="72"
                    fill="none"
                    className="stroke-[var(--border-strong)]/50"
                    strokeDasharray="4 6"
                    strokeWidth="1"
                  />
                  <circle
                    cx="230"
                    cy="196"
                    r="92"
                    fill="none"
                    className="stroke-[var(--border-subtle)]"
                    strokeWidth="1"
                  />

                  {/* Cardinal Coordinate Ticks */}
                  {[
                    [230, 18, 230, 28],
                    [230, 364, 230, 374],
                    [52, 196, 62, 196],
                    [398, 196, 408, 196],
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

                  {/* Curved Inter-Layer Perimeter Mesh */}
                  {ORBITAL_PERIMETER_ARCS.map((d, idx) => (
                    <motion.path
                      key={`mesh-${idx}`}
                      d={d}
                      fill="none"
                      stroke={idx % 2 === 0 ? '#2563EB' : '#06B6D4'}
                      strokeOpacity="0.38"
                      strokeWidth="1.4"
                      variants={svgPathDrawVariants}
                      initial={prefersReducedMotion ? 'visible' : 'hidden'}
                      animate="visible"
                      transition={{ duration: 0.8, delay: 0.16 + idx * 0.08, ease: MOTION_EASING }}
                    />
                  ))}

                  {/* Core Connectors */}
                  {ARCHITECTURE_NODES.map((node) => {
                    const isSelected = node.id === activeNode.id;
                    return (
                      <path
                        key={`connector-${node.id}`}
                        d={node.path}
                        fill="none"
                        className={
                          isSelected
                            ? 'stroke-[#2563EB] dark:stroke-[#06B6D4]'
                            : 'stroke-[var(--border-strong)]'
                        }
                        strokeWidth={isSelected ? 2.4 : 1.25}
                        strokeDasharray={isSelected ? undefined : '3 4'}
                      />
                    );
                  })}

                  {/* Active Data Transmission Packet & Beacon */}
                  {shouldAnimate && (
                    <>
                      <motion.circle
                        key={`pulse-${activeNode.id}`}
                        cx={activeNode.cx}
                        cy={activeNode.cy}
                        r={34}
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        initial={{ scale: 0.84, opacity: 0.65 }}
                        animate={{ scale: 1.26, opacity: 0 }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <motion.circle
                        key={`packet-halo-${activeNode.id}`}
                        r={7}
                        fill="#06B6D4"
                        fillOpacity="0.22"
                        initial={{ cx: activeNode.cx, cy: activeNode.cy, opacity: 0 }}
                        animate={{
                          cx: [...activeNode.packetX],
                          cy: [...activeNode.packetY],
                          opacity: [0, 0.85, 0],
                        }}
                        transition={{ duration: 1.85, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.circle
                        key={`packet-${activeNode.id}`}
                        r={3.5}
                        fill="#06B6D4"
                        initial={{ cx: activeNode.cx, cy: activeNode.cy, opacity: 0 }}
                        animate={{
                          cx: [...activeNode.packetX],
                          cy: [...activeNode.packetY],
                          opacity: [0, 1, 0],
                        }}
                        transition={{ duration: 1.85, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </>
                  )}

                  {/* Central Hub */}
                  <g>
                    <rect
                      x="170"
                      y="168"
                      width="120"
                      height="56"
                      rx="14"
                      className="fill-[#071426] stroke-[#2563EB]"
                      strokeWidth="1.75"
                    />
                    <rect
                      x="175"
                      y="173"
                      width="110"
                      height="46"
                      rx="10"
                      fill="none"
                      stroke="#06B6D4"
                      strokeOpacity="0.3"
                      strokeWidth="1"
                    />
                    <text
                      x="230"
                      y="192"
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11.5"
                      fontWeight="700"
                      fontFamily="Space Grotesk, sans-serif"
                    >
                      SUVRA CORE
                    </text>
                    <text
                      x="230"
                      y="207"
                      textAnchor="middle"
                      fill="#06B6D4"
                      fontSize="8.8"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      API · Type Contracts
                    </text>
                  </g>

                  {/* 4 Interactive Architecture Layer Nodes */}
                  {ARCHITECTURE_NODES.map((node) => {
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
                          r={isSelected ? 34 : 28}
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
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={node.glyph} />
                        </g>
                        <text
                          x={node.cx}
                          y={node.cy + 14}
                          textAnchor="middle"
                          fontSize="9.5"
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
                className="relative z-10 my-3 grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
                role="group"
                aria-label="Architecture layers"
              >
                {ARCHITECTURE_NODES.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  return (
                    <button
                      key={`btn-${node.id}`}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      aria-pressed={isSelected}
                      className={`relative min-h-[44px] px-2.5 py-2 rounded-lg font-mono text-[11px] font-medium transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
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

              <div className="relative z-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 min-h-[92px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={TRANSITION_MICRO}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-display text-sm font-semibold text-[var(--text-primary)]">
                        {activeNode.label}
                      </p>
                      <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                        {activeNode.tech}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {activeNode.detail}
                    </p>
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
      aria-label="Core capability pillars"
      className="border-t border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-5"
    >
      <Container>
        <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          {CAPABILITY_PILLARS.map((pillar, idx) => (
            <li
              key={pillar}
              className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[var(--text-primary)]"
            >
              <span className="font-mono text-xs tabular-nums text-[#2563EB] dark:text-[#06B6D4]">
                0{idx + 1}
              </span>
              <span>{pillar}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function CompanyIntroSection() {
  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-canvas)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <RevealOnScroll direction="right" distance={16} className="lg:col-span-7">
            <SectionHeader
              align="left"
              eyebrow="About Suvra Technologies"
              title="A technology & innovation company built for both client delivery and proprietary products."
              description="Established in 2026 and headquartered in Muzaffarpur, Bihar, Suvra Technologies pairs client software engineering with focused research into modular SaaS platforms, mobile applications, and practical AI systems."
            />
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>About Suvra Technologies</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/founder"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors"
              >
                <span>Meet Founder Ravi Ranjan</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll
            direction="left"
            distance={16}
            delay={0.08}
            className="lg:col-span-5 divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]"
          >
            <div className="py-5">
              <p className="font-mono text-xs text-[var(--text-muted)]">Headquarters</p>
              <p className="mt-1.5 text-sm sm:text-base font-medium text-[var(--text-primary)]">
                {SITE_CONFIG.headquarters}
              </p>
            </div>
            <div className="py-5">
              <p className="font-mono text-xs text-[var(--text-muted)]">Target Markets</p>
              <p className="mt-1.5 text-sm sm:text-base font-medium text-[var(--text-primary)]">
                {SITE_CONFIG.targetMarkets}
              </p>
            </div>
            <div className="py-5">
              <p className="font-mono text-xs text-[var(--text-muted)]">Infrastructure Bias</p>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                Cloudflare-first edge architecture for speed and cost control, backed by Oracle Cloud where dedicated compute is justified.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
