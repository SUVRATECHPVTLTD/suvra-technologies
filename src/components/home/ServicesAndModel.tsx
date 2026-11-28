import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Layers, XCircle } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING, TRANSITION_MICRO, svgPathDrawVariants } from '../../config/motion';
import { SERVICE_CATEGORIES, SERVICES_DATA, getServicesByCategory } from '../../data/services';
import type { ServiceCategoryId, ServiceItem } from '../../types/cms';
import { ServiceCard } from '../cards/DomainCards';
import { Container, SectionHeader } from '../ui/Container';
import { RevealOnScroll, TextMaskReveal } from '../ui/MotionPrimitives';

const HOMEPAGE_PRIORITY_SLUGS = [
  'website-development',
  'mobile-app-development',
  'custom-software-development',
  'ai-business-automation',
  'digital-marketing',
  'seo-local-seo',
] as const;

type ServiceFilterKey = 'featured' | 'all' | ServiceCategoryId;

export function CoreServicesSection() {
  const [selectedFilter, setSelectedFilter] = useState<ServiceFilterKey>('featured');

  const featuredServices = HOMEPAGE_PRIORITY_SLUGS.map((slug) =>
    SERVICES_DATA.find((s) => s.slug === slug)
  ).filter((item): item is ServiceItem => Boolean(item));

  const visibleServices =
    selectedFilter === 'featured'
      ? featuredServices
      : selectedFilter === 'all'
        ? SERVICES_DATA
        : getServicesByCategory(selectedFilter);

  const filterButtons: Array<{ id: ServiceFilterKey; label: string }> = [
    { id: 'featured', label: 'Core 6 Services' },
    { id: 'all', label: `All ${SERVICES_DATA.length} Services` },
    ...SERVICE_CATEGORIES.map((cat) => ({ id: cat.id, label: cat.label })),
  ];

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <SectionHeader
          eyebrow="Core Technology Services"
          title="Conversion-focused engineering, AI automation, and digital growth."
          description="Six core service pillars engineered with clear deliverables and transparent INR scoping—backed by our full 14-service catalog."
        />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
            role="group"
            aria-label="Filter services by discipline"
          >
            {filterButtons.map((btn) => {
              const active = selectedFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedFilter(btn.id)}
                  className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    active
                      ? 'text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="service-filter-bg"
                      transition={TRANSITION_MICRO}
                      className="absolute inset-0 rounded-lg bg-[#2563EB]"
                    />
                  )}
                  <span className="relative z-10">{btn.label}</span>
                </button>
              );
            })}
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, index) => (
              <motion.div
                layout
                key={service.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ ...TRANSITION_MICRO, delay: Math.min(index * 0.03, 0.18) }}
                className="flex"
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Showing {visibleServices.length} of {SERVICES_DATA.length} approved capabilities across Engineering, Intelligence, Digital, and Infrastructure.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] border border-[var(--border-strong)] bg-[var(--bg-canvas)] hover:border-[#2563EB] rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Explore All 14 Services Directory</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function CustomSolutionCTA() {
  return (
    <section className="py-16 sm:py-20 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-[#2563EB]/35 bg-[#071426] p-8 sm:p-12 lg:p-14 text-white shadow-[var(--shadow-card)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#2563EB]/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#06B6D4]/15 blur-3xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs font-medium text-[#06B6D4] mb-3">
                Custom Architecture &amp; Scoping
              </p>
              <TextMaskReveal>
                <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                  Need Something Beyond Our Core Services?
                </h2>
              </TextMaskReveal>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Every business has unique challenges. We design and engineer tailored technology solutions aligned with your requirements, operations and long-term goals.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:flex-col lg:items-end gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
              >
                <span>Discuss Your Requirements</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/start-a-project"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#06B6D4] border border-slate-700 bg-[#0F172A]/90 hover:border-[#06B6D4] hover:text-white rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
              >
                Request a Custom Proposal
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ServicesAndProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = Boolean(isInView && !prefersReducedMotion);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 bg-[#071426] text-[#F8FAFC] overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:24px_24px]"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <RevealOnScroll direction="right" distance={16} className="lg:col-span-5">
            <p className="font-mono text-xs font-medium text-[#06B6D4] mb-3">
              Services &amp; Product Innovation
            </p>
            <TextMaskReveal>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Engineering Solutions. Creating Products.
              </h2>
            </TextMaskReveal>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Client engagements keep our engineering grounded in real operational constraints, while internal product research produces reusable SaaS foundations, mobile patterns, and guardrailed AI workflows that elevate client delivery.
            </p>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#06B6D4] hover:text-white transition-colors"
              >
                <span>View Products &amp; Innovation Direction</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-7 space-y-4">
            <svg viewBox="0 0 600 54" className="w-full h-auto hidden sm:block" aria-hidden="true">
              <motion.path
                d="M 100 32 C 180 8, 220 8, 300 32 C 380 54, 420 54, 500 32"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
                strokeDasharray="5 5"
                variants={svgPathDrawVariants}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              />
              {shouldAnimate && (
                <motion.circle
                  r="4"
                  fill="#06B6D4"
                  initial={{ cx: 100, cy: 32, opacity: 0 }}
                  animate={{
                    cx: [100, 200, 300, 400, 500],
                    cy: [32, 14, 32, 48, 32],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <circle cx="100" cy="32" r="5" fill="#2563EB" />
              <circle cx="300" cy="32" r="6" fill="#06B6D4" />
              <circle cx="500" cy="32" r="5" fill="#2563EB" />
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
              <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-xs text-[#06B6D4]">Track 01</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    Client Services
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Custom software, websites, mobile apps, AI workflows, and cloud consulting built around real customer problems.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#2563EB]/70 bg-[#162238] p-6 flex flex-col items-center justify-center text-center">
                <Layers className="w-7 h-7 text-[#06B6D4] mb-3" aria-hidden="true" />
                <p className="font-display text-base font-semibold text-white">
                  Shared Engineering Core
                </p>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Reusable TypeScript contracts, accessibility systems, and Cloudflare-first architecture patterns.
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-6 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-xs text-[#06B6D4]">Track 02</p>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">
                    Proprietary Products
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Ongoing R&amp;D toward focused SaaS platforms, mobile tools, and AI-enabled software products.
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

const TRANSFORMATION_CHALLENGES = [
  'Limited digital presence',
  'Repetitive manual processes',
  'Disconnected business systems',
  'Missed customer opportunities',
  'Difficulty scaling operations',
] as const;

const TRANSFORMATION_SOLUTIONS = [
  'High-performance websites and applications',
  'Intelligent business automation',
  'Integrated software and ERP solutions',
  'Scalable cloud infrastructure',
  'Data-driven digital strategies',
] as const;

export function BusinessTransformation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 'some' });
  const prefersReducedMotion = useReducedMotion();
  const active = Boolean(isInView || prefersReducedMotion);

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow="Business Transformation"
          title="From Business Challenges to Digital Opportunities."
          description="Eliminate operational drag and disconnected tooling through an engineered transition from fragmented workflows to scalable platforms."
        />

        <div
          ref={sectionRef}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
        >
          {/* Left Side: Operational Challenges with progressive strike-through */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.5, ease: MOTION_EASING }}
            className="lg:col-span-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-8 flex flex-col justify-between"
          >
            <div>
              <p className="font-mono text-xs text-[var(--text-muted)]">Operational Bottlenecks</p>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Is outdated technology holding your business back?
              </h3>

              <ul className="mt-6 space-y-4">
                {TRANSFORMATION_CHALLENGES.map((challenge, idx) => (
                  <motion.li
                    key={challenge}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.35,
                      delay: prefersReducedMotion ? 0 : 0.12 + idx * 0.08,
                      ease: MOTION_EASING,
                    }}
                    className="flex items-center gap-3 py-1.5 border-b border-[var(--border-subtle)] last:border-b-0"
                  >
                    <XCircle
                      className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="relative inline-block text-sm sm:text-[15px] text-[var(--text-secondary)] font-medium">
                      <span>{challenge}</span>
                      <motion.span
                        aria-hidden="true"
                        initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
                        animate={{ scaleX: active ? 1 : 0 }}
                        transition={{
                          duration: 0.42,
                          delay: prefersReducedMotion ? 0 : 0.38 + idx * 0.1,
                          ease: MOTION_EASING,
                        }}
                        style={{ originX: 0 }}
                        className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-[#2563EB]/65 dark:bg-[#06B6D4]/70 pointer-events-none"
                      />
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <p className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] leading-relaxed">
              Resolving legacy bottlenecks starts with clean architecture, connected data contracts, and disciplined automation.
            </p>
          </motion.div>

          {/* Right Side: Elevated Navy Transformation Panel */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : 0.25, ease: MOTION_EASING }}
            className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-[#2563EB]/50 bg-[#071426] p-7 sm:p-9 text-white shadow-[var(--shadow-card)] flex flex-col justify-between"
          >
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: active ? 0.8 : 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="pointer-events-none absolute -top-28 -right-24 w-80 h-80 rounded-full bg-radial from-[#06B6D4]/25 via-[#2563EB]/15 to-transparent blur-2xl"
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2">
                <p className="font-mono text-xs font-medium text-[#06B6D4]">
                  Engineered Outcome Architecture
                </p>
                <span className="hidden sm:inline font-mono text-[11px] text-slate-400">
                  Suvra Systems Model
                </span>
              </div>

              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                We Engineer Your Next Stage of Growth.
              </h3>

              <ul className="mt-6 space-y-3.5">
                {TRANSFORMATION_SOLUTIONS.map((solution, idx) => (
                  <motion.li
                    key={solution}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                    animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                    transition={{
                      duration: 0.38,
                      delay: prefersReducedMotion ? 0 : 0.45 + idx * 0.08,
                      ease: MOTION_EASING,
                    }}
                    className="flex items-center gap-3 rounded-lg border border-slate-800/90 bg-[#0F172A]/85 px-4 py-3"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#06B6D4] shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm sm:text-[15px] font-medium text-slate-100">
                      {solution}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: 0.4,
                delay: prefersReducedMotion ? 0 : 0.82,
                ease: MOTION_EASING,
              }}
              className="relative z-10 mt-8 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/start-a-project"
                className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-5 py-3 text-sm font-medium text-[#06B6D4] border border-slate-700 bg-[#0F172A] hover:border-[#06B6D4] hover:text-white rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
              >
                Explore Our Solutions
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
