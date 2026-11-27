import { useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Layers, XCircle } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING, TRANSITION_MICRO } from '../../config/motion';
import { COMPARISON_ROWS } from '../../data/company';
import { SERVICE_CATEGORIES, SERVICES_DATA, getServicesByCategory } from '../../data/services';
import type { ServiceCategoryId } from '../../types/cms';
import { ServiceCard } from '../cards/DomainCards';
import { Container, SectionHeader } from '../ui/Container';
import { StaggerGrid, StaggerItem } from '../ui/MotionPrimitives';

export function CoreServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategoryId | 'all'>('all');

  const marqueeServices = SERVICES_DATA.slice(0, 4);
  const filteredServices =
    selectedCategory === 'all' ? SERVICES_DATA : getServicesByCategory(selectedCategory);

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <SectionHeader
          eyebrow="14 Core Services"
          title="Comprehensive engineering, intelligence, digital, and cloud capabilities."
          description="Explore our services grouped across four coherent practices. Every offering connects to its own dedicated architectural overview."
        />

        <StaggerGrid className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-5 mb-14">
          {marqueeServices.map((svc, idx) => {
            const isWide = idx === 0 || idx === 3;
            return (
              <StaggerItem key={svc.slug} className={isWide ? 'lg:col-span-7' : 'lg:col-span-5'}>
                <Link
                  to={`/services/${svc.slug}`}
                  className="group h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span>{svc.categoryLabel}</span>
                      <span className="font-mono text-[#2563EB] dark:text-[#06B6D4]">0{idx + 1}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
                      {svc.name}
                    </h3>
                    <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                      {svc.shortDescription}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
                    <span className="font-mono text-xs text-[var(--text-muted)] truncate">
                      {svc.techStack.slice(0, 3).join(' · ')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4] shrink-0">
                      <span>Learn More</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
            role="group"
            aria-label="Filter services by discipline"
          >
            <button
              type="button"
              aria-pressed={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {selectedCategory === 'all' && (
                <motion.span
                  layoutId="service-filter-bg"
                  transition={TRANSITION_MICRO}
                  className="absolute inset-0 rounded-lg bg-[#2563EB]"
                />
              )}
              <span className="relative z-10">All 14 Services</span>
            </button>
            {SERVICE_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(cat.id)}
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
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] whitespace-nowrap"
          >
            <span>Explore Full Services Directory</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function ServicesAndProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 bg-[#071426] text-[#F8FAFC]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-medium text-[#06B6D4] mb-3">
              Services &amp; Product Innovation
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Engineering Solutions. Creating Products.
            </h2>
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
          </div>

          <div className="lg:col-span-7 space-y-4">
            <svg viewBox="0 0 600 54" className="w-full h-auto hidden sm:block" aria-hidden="true">
              <motion.path
                d="M 100 32 C 180 8, 220 8, 300 32 C 380 54, 420 54, 500 32"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: MOTION_EASING }}
              />
              {isInView && !prefersReducedMotion && (
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

export function BusinessComparison() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = COMPARISON_ROWS[selectedIdx] ?? COMPARISON_ROWS[0];

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <SectionHeader
          eyebrow="Strategic Comparison"
          title="Fragmented technology workflows vs. integrated engineering."
          description="Select a dimension to inspect how unified systems architecture reduces friction without making unsupported delivery guarantees."
        />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0"
            role="tablist"
            aria-label="Comparison dimensions"
          >
            {COMPARISON_ROWS.map((row, idx) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={row.dimension}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedIdx(idx)}
                  className={`px-4 py-3 rounded-xl border text-left text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'border-[#2563EB] bg-[var(--bg-surface)] text-[#2563EB] dark:text-[#06B6D4]'
                      : 'border-[var(--border-subtle)] bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {row.dimension}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8" role="tabpanel">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.dimension}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={TRANSITION_MICRO}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
                    <XCircle className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    <span>Fragmented Approach</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[var(--text-primary)]">
                    {current.dimension}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {current.fragmented}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#2563EB]/50 bg-[var(--bg-surface)] p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4]">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>Suvra Integrated Engineering</span>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[var(--text-primary)]">
                    {current.dimension}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {current.integrated}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
