import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING, TRANSITION_MICRO } from '../../config/motion';
import { SERVICE_CATEGORIES, SERVICES_DATA, getServicesByCategory } from '../../data/services';
import type { ServiceCategoryId, ServiceItem } from '../../types/cms';
import { ServiceCard } from '../cards/DomainCards';
import { Container, SectionHeader } from '../ui/Container';

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
  const prefersReducedMotion = useReducedMotion();

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
    <section
      id="core-services"
      className="py-14 sm:py-16 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]"
    >
      <Container>
        <SectionHeader
          eyebrow="Our Core Services"
          title="Conversion-focused engineering, AI automation, and digital growth."
          description="Six foundational services tailored for business growth—or explore all 14 technology practices across Engineering, Intelligence, Digital, and Infrastructure."
        />

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 mb-7">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
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
                  className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
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
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: MOTION_EASING }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch"
          >
            {visibleServices.map((service) => (
              <div key={service.slug} className="flex">
                <ServiceCard service={service} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[var(--border-subtle)]">
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Showing {visibleServices.length} of {SERVICES_DATA.length} services across Engineering, Intelligence, Digital, and Cloud Infrastructure.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <span>Explore All 14 Services</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

const TRANSFORMATION_PAIRS = [
  {
    id: 'presence',
    challenge: 'Limited digital presence',
    solution: 'High-performance websites and applications',
  },
  {
    id: 'manual',
    challenge: 'Repetitive manual processes',
    solution: 'Intelligent business automation',
  },
  {
    id: 'silos',
    challenge: 'Disconnected business systems',
    solution: 'Integrated software, CRM and ERP',
  },
  {
    id: 'scaling',
    challenge: 'Difficulty scaling operations',
    solution: 'Scalable cloud architecture',
  },
  {
    id: 'opportunities',
    challenge: 'Missed customer opportunities',
    solution: 'Data-driven digital strategies',
  },
] as const;

export function BusinessTransformation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 'some' });
  const prefersReducedMotion = useReducedMotion();
  const active = Boolean(isInView || prefersReducedMotion);

  return (
    <section
      id="business-transformation"
      className="py-14 sm:py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <Container>
        <SectionHeader
          eyebrow="Business Transformation & Suvra Advantage"
          title="From Operational Bottlenecks to Engineered Growth."
          description="Replace fragmented tools and manual friction with unified websites, software, automation, and cloud systems designed around your workflow."
        />

        <div ref={sectionRef} className="mt-10">
          {/* Desktop 1-to-1 Aligned Comparison Matrix */}
          <div className="hidden lg:grid grid-cols-12 gap-6 items-stretch">
            <div className="col-span-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-7 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-[var(--text-muted)]">Current Friction</p>
                <h3 className="mt-1.5 font-display text-xl font-bold text-[var(--text-primary)]">
                  What holds teams back
                </h3>

                <ul className="mt-5 space-y-3">
                  {TRANSFORMATION_PAIRS.map((pair, idx) => (
                    <motion.li
                      key={pair.id}
                      initial={prefersReducedMotion ? false : { opacity: 0.72, x: -6 }}
                      animate={active ? { opacity: 1, x: 0 } : { opacity: 0.72, x: -6 }}
                      transition={{
                        duration: 0.28,
                        delay: prefersReducedMotion ? 0 : idx * 0.04,
                        ease: MOTION_EASING,
                      }}
                      className="min-h-[54px] flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3"
                    >
                      <XCircle
                        className="w-4 h-4 text-[var(--text-muted)] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {pair.challenge}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <p className="mt-6 pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-muted)] leading-relaxed">
                Resolving operational bottlenecks begins with clear requirements, integrated data models, and maintainable code.
              </p>
            </div>

            <div className="col-span-7 relative overflow-hidden rounded-2xl border border-[#2563EB]/50 bg-[#071426] p-7 text-white shadow-[var(--shadow-card)] flex flex-col justify-between">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-radial from-[#06B6D4]/20 via-[#2563EB]/12 to-transparent blur-2xl"
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-xs font-medium text-[#06B6D4]">
                    The Suvra Advantage
                  </p>
                  <span className="font-mono text-[11px] text-slate-400">
                    1-to-1 Outcome Alignment
                  </span>
                </div>

                <h3 className="mt-1.5 font-display text-2xl font-bold text-white">
                  We Engineer Your Next Stage of Growth.
                </h3>

                <ul className="mt-5 space-y-3">
                  {TRANSFORMATION_PAIRS.map((pair, idx) => (
                    <motion.li
                      key={pair.id}
                      initial={prefersReducedMotion ? false : { opacity: 0.78, x: 8 }}
                      animate={active ? { opacity: 1, x: 0 } : { opacity: 0.78, x: 8 }}
                      transition={{
                        duration: 0.28,
                        delay: prefersReducedMotion ? 0 : 0.05 + idx * 0.04,
                        ease: MOTION_EASING,
                      }}
                      className="min-h-[54px] flex items-center justify-between gap-3 rounded-lg border border-slate-800 bg-[#0F172A] px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2
                          className="w-4 h-4 text-[#06B6D4] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm sm:text-[15px] font-medium text-slate-100">
                          {pair.solution}
                        </span>
                      </div>
                      <ArrowRight
                        className="w-3.5 h-3.5 text-[#06B6D4]/70 shrink-0"
                        aria-hidden="true"
                      />
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
                <Link
                  to="/start-a-project"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
                >
                  <span>Book a Strategy Call</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-[#06B6D4] border border-slate-700 bg-[#0F172A] hover:border-[#06B6D4] hover:text-white rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Cohesive Paired Challenge -> Solution Stack */}
          <div className="lg:hidden rounded-2xl border border-[#2563EB]/40 bg-[#071426] p-5 sm:p-7 text-white shadow-[var(--shadow-card)]">
            <p className="font-mono text-xs font-medium text-[#06B6D4]">The Suvra Advantage</p>
            <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-white">
              We Engineer Your Next Stage of Growth.
            </h3>

            <ul className="mt-5 space-y-3">
              {TRANSFORMATION_PAIRS.map((pair) => (
                <li
                  key={pair.id}
                  className="rounded-xl border border-slate-800 bg-[#0F172A] p-4 space-y-2"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>{pair.challenge}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#06B6D4] shrink-0" aria-hidden="true" />
                    <span>{pair.solution}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
              <Link
                to="/start-a-project"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-[#06B6D4] border border-slate-700 rounded-lg whitespace-nowrap"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function CustomSolutionCTA() {
  return (
    <section className="py-10 sm:py-12 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-[#2563EB]/35 bg-[#071426] p-6 sm:p-9 text-white shadow-[var(--shadow-card)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#2563EB]/20 blur-3xl"
          />

          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-xs font-medium text-[#06B6D4] mb-2">
              Tailored Engineering &amp; Scoping
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Need a Solution Built Around Your Business?
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-300 leading-relaxed">
              Share your workflow, timeline, and system requirements for a custom technical architecture plan.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/start-a-project"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
            >
              <span>Discuss Your Requirements</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
