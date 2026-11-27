import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MOTION_DURATIONS,
  MOTION_EASING,
  TRANSITION_MICRO,
} from '../../config/motion';
import { SITE_CONFIG } from '../../config/site';
import { CAPABILITY_PILLARS } from '../../data/company';
import { Container, SectionHeader } from '../ui/Container';
import { RevealOnScroll } from '../ui/MotionPrimitives';

const ARCHITECTURE_NODES = [
  {
    id: 'edge',
    label: 'Global Edge Perimeter',
    tech: 'Cloudflare Workers · Pages · Zero Trust',
    detail:
      'Anycast routing, TLS 1.3 security, and low-latency edge execution across India and global markets.',
    cx: 220,
    cy: 64,
    path: 'M 220 64 Q 220 120 220 162',
    tx: 220,
    ty: 162,
  },
  {
    id: 'apps',
    label: 'Web, Mobile & SaaS Surfaces',
    tech: 'Next.js · React · TypeScript · Mobile',
    detail:
      'Responsive, WCAG-aligned customer interfaces and role-scoped administrative consoles.',
    cx: 88,
    cy: 184,
    path: 'M 88 184 Q 130 184 170 184',
    tx: 168,
    ty: 184,
  },
  {
    id: 'ai',
    label: 'Applied AI & Automation',
    tech: 'Grounded Agents · Schema Workflows',
    detail:
      'Deterministic validation paired with scoped AI classification, extraction, and escalation.',
    cx: 352,
    cy: 184,
    path: 'M 352 184 Q 310 184 270 184',
    tx: 272,
    ty: 184,
  },
  {
    id: 'data',
    label: 'Relational Core & Backups',
    tech: 'Cloudflare D1 · R2 · Oracle Cloud (OCI)',
    detail:
      'Type-safe Drizzle schemas, zero-egress R2 storage, and selective OCI compute resilience.',
    cx: 220,
    cy: 304,
    path: 'M 220 304 Q 220 250 220 206',
    tx: 220,
    ty: 206,
  },
] as const;

export function HeroSection() {
  const [activeNodeId, setActiveNodeId] =
    useState<(typeof ARCHITECTURE_NODES)[number]['id']>('edge');
  const activeNode =
    ARCHITECTURE_NODES.find((node) => node.id === activeNodeId) ?? ARCHITECTURE_NODES[0];
  const visualRef = useRef<HTMLDivElement>(null);
  const isVisualInView = useInView(visualRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24 bg-[var(--bg-canvas)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-[#2563EB]/[0.04] via-[#06B6D4]/[0.02] to-transparent dark:from-[#2563EB]/[0.12] dark:via-[#06B6D4]/[0.04]"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASING }}
              className="font-mono text-xs font-medium uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4] mb-4"
            >
              {SITE_CONFIG.positioning}
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: MOTION_DURATIONS.hero,
                  delay: 0.06,
                  ease: MOTION_EASING,
                }}
                className="font-display text-[clamp(2.35rem,4.6vw,3.9rem)] font-bold leading-[1.06] tracking-tight text-[var(--text-primary)]"
              >
                Engineering Tomorrow.
                <br />
                Empowering Today.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATIONS.section,
                delay: 0.14,
                ease: MOTION_EASING,
              }}
              className="mt-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl"
            >
              We design, engineer and deliver intelligent software, innovative technology products and scalable digital solutions that empower businesses to grow in a connected world.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: MOTION_DURATIONS.section,
                delay: 0.22,
                ease: MOTION_EASING,
              }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <Link
                to="/start-a-project"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all duration-150 active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
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
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: MOTION_DURATIONS.hero, delay: 0.1, ease: MOTION_EASING }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  Connected Systems Architecture
                </span>
                <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                  Select Node to Inspect
                </span>
              </div>

              <div className="my-4">
                <svg
                  viewBox="0 0 440 368"
                  className="w-full h-auto max-h-[330px]"
                  role="img"
                  aria-label="Interactive Suvra Technologies connected systems architecture diagram"
                >
                  <defs>
                    <radialGradient id="suvra-grid-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.16" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <circle cx="220" cy="184" r="144" fill="url(#suvra-grid-glow)" />
                  <circle
                    cx="220"
                    cy="184"
                    r="116"
                    fill="none"
                    className="stroke-[var(--border-subtle)]"
                    strokeDasharray="4 6"
                    strokeWidth="1.25"
                  />
                  <ellipse
                    cx="220"
                    cy="184"
                    rx="168"
                    ry="66"
                    fill="none"
                    className="stroke-[var(--border-subtle)]"
                    strokeWidth="1"
                  />

                  <motion.path
                    d="M 220 64 C 220 120, 88 124, 88 184"
                    fill="none"
                    className="stroke-[#2563EB]/35"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: MOTION_EASING }}
                  />
                  <motion.path
                    d="M 220 64 C 220 120, 352 124, 352 184"
                    fill="none"
                    className="stroke-[#06B6D4]/45"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.28, ease: MOTION_EASING }}
                  />
                  <motion.path
                    d="M 88 184 C 88 246, 220 248, 220 304"
                    fill="none"
                    className="stroke-[#2563EB]/35"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.36, ease: MOTION_EASING }}
                  />
                  <motion.path
                    d="M 352 184 C 352 246, 220 248, 220 304"
                    fill="none"
                    className="stroke-[#06B6D4]/45"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.44, ease: MOTION_EASING }}
                  />

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
                        strokeWidth={isSelected ? 2.25 : 1.25}
                        strokeDasharray={isSelected ? undefined : '3 4'}
                      />
                    );
                  })}

                  {isVisualInView && !prefersReducedMotion && (
                    <>
                      <motion.circle
                        key={`pulse-${activeNode.id}`}
                        cx={activeNode.cx}
                        cy={activeNode.cy}
                        r={34}
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        initial={{ scale: 0.85, opacity: 0.65 }}
                        animate={{ scale: 1.22, opacity: 0 }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: 'easeOut',
                        }}
                      />
                      <motion.circle
                        key={`packet-${activeNode.id}`}
                        r={4}
                        fill="#06B6D4"
                        initial={{ cx: activeNode.cx, cy: activeNode.cy, opacity: 0 }}
                        animate={{
                          cx: [activeNode.cx, activeNode.tx],
                          cy: [activeNode.cy, activeNode.ty],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    </>
                  )}

                  <g>
                    <rect
                      x="168"
                      y="162"
                      width="104"
                      height="44"
                      rx="10"
                      className="fill-[#071426] stroke-[#2563EB]"
                      strokeWidth="1.5"
                    />
                    <text
                      x="220"
                      y="181"
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize="11"
                      fontWeight="700"
                      fontFamily="Space Grotesk, sans-serif"
                    >
                      SUVRA CORE
                    </text>
                    <text
                      x="220"
                      y="196"
                      textAnchor="middle"
                      fill="#06B6D4"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      API · Contracts
                    </text>
                  </g>

                  {ARCHITECTURE_NODES.map((node) => {
                    const isSelected = node.id === activeNode.id;
                    return (
                      <g
                        key={node.id}
                        onClick={() => setActiveNodeId(node.id)}
                        className="cursor-pointer"
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
                          r={isSelected ? 30 : 25}
                          className={
                            isSelected
                              ? 'fill-[#2563EB] stroke-[#06B6D4]'
                              : 'fill-[var(--bg-elevated)] stroke-[var(--border-strong)] hover:stroke-[#2563EB]'
                          }
                          strokeWidth="2"
                        />
                        <text
                          x={node.cx}
                          y={node.cy + 4}
                          textAnchor="middle"
                          fontSize="10"
                          fontWeight="600"
                          fontFamily="JetBrains Mono, monospace"
                          fill={isSelected ? '#FFFFFF' : 'currentColor'}
                          className={isSelected ? '' : 'fill-[var(--text-primary)]'}
                        >
                          {node.id.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="my-3 grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Architecture layers">
                {ARCHITECTURE_NODES.map((node) => {
                  const isSelected = node.id === activeNode.id;
                  return (
                    <button
                      key={`btn-${node.id}`}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      aria-pressed={isSelected}
                      className={`min-h-[44px] px-2.5 py-2 rounded-lg border font-mono text-[11px] font-medium transition-colors text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                        isSelected
                          ? 'border-[#2563EB] bg-[#2563EB] text-white'
                          : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[#2563EB]/60'
                      }`}
                    >
                      {node.id.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 min-h-[88px]">
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
              <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
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
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
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
            </div>

            <div className="lg:col-span-5 divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
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
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
