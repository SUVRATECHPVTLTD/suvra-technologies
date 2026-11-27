import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { Link } from 'react-router-dom';
import { TRANSITION_MICRO, TRANSITION_STANDARD } from '../../config/motion';
import {
  DEVELOPMENT_PROCESS,
  TECHNOLOGY_ECOSYSTEM,
  type TechEcosystemCategory,
} from '../../data/company';
import { INDUSTRIES_DATA } from '../../data/industries';
import { Container, SectionHeader } from '../ui/Container';

const ECOSYSTEM_CENTER = 230;
const ECOSYSTEM_RADIUS = 166;

const INDUSTRY_SHORT_LABELS: Record<string, string> = {
  'education-edtech': 'EdTech',
  healthcare: 'Health',
  'retail-ecommerce': 'Retail',
  'real-estate': 'Realty',
  'finance-fintech': 'FinTech',
  'logistics-supply-chain': 'Logistics',
  manufacturing: 'Mfg',
  hospitality: 'Travel',
  startups: 'Startups',
  enterprises: 'Enterprise',
};

const RADIAL_INDUSTRY_NODES = INDUSTRIES_DATA.map((industry, index) => {
  const angle = (-90 + index * (360 / INDUSTRIES_DATA.length)) * (Math.PI / 180);
  const cx = Math.round(ECOSYSTEM_CENTER + ECOSYSTEM_RADIUS * Math.cos(angle));
  const cy = Math.round(ECOSYSTEM_CENTER + ECOSYSTEM_RADIUS * Math.sin(angle));
  const ctrlX = Math.round(ECOSYSTEM_CENTER + (cx - ECOSYSTEM_CENTER) * 0.45);
  const ctrlY = Math.round(ECOSYSTEM_CENTER + (cy - ECOSYSTEM_CENTER) * 0.45);
  return {
    ...industry,
    shortLabel: INDUSTRY_SHORT_LABELS[industry.slug] ?? industry.name.split(' ')[0],
    cx,
    cy,
    path: `M ${ECOSYSTEM_CENTER} ${ECOSYSTEM_CENTER} Q ${ctrlX} ${ctrlY} ${cx} ${cy}`,
  };
});

export function IndustriesPreview() {
  const [activeSlug, setActiveSlug] = useState(INDUSTRIES_DATA[0].slug);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const isEcosystemInView = useInView(ecosystemRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const activeNode =
    RADIAL_INDUSTRY_NODES.find((item) => item.slug === activeSlug) ?? RADIAL_INDUSTRY_NODES[0];

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeader
            align="left"
            eyebrow="Connected Industry Ecosystem"
            title="Tailored engineering for ten core business sectors."
            description="Inspect any sector node on our circular ecosystem to view industry bottlenecks, engineered architecture, and governance focus."
          />
          <Link
            to="/industries"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] whitespace-nowrap"
          >
            <span>All 10 Industry Pages</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            ref={ecosystemRef}
            className="lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                Circular Sector Network
              </span>
              <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                {activeNode.name}
              </span>
            </div>

            <div className="my-3">
              <svg
                viewBox="0 0 460 460"
                className="w-full h-auto max-h-[360px] mx-auto"
                role="img"
                aria-label="Interactive circular ecosystem connecting Suvra Technologies to 10 core industries"
              >
                <circle
                  cx={ECOSYSTEM_CENTER}
                  cy={ECOSYSTEM_CENTER}
                  r={ECOSYSTEM_RADIUS}
                  fill="none"
                  className="stroke-[var(--border-subtle)]"
                  strokeDasharray="4 6"
                  strokeWidth="1.25"
                />
                <circle
                  cx={ECOSYSTEM_CENTER}
                  cy={ECOSYSTEM_CENTER}
                  r={102}
                  fill="none"
                  className="stroke-[var(--border-subtle)]"
                  strokeWidth="1"
                />

                {RADIAL_INDUSTRY_NODES.map((node) => {
                  const selected = node.slug === activeNode.slug;
                  return (
                    <path
                      key={`sector-path-${node.slug}`}
                      d={node.path}
                      fill="none"
                      className={
                        selected
                          ? 'stroke-[#2563EB] dark:stroke-[#06B6D4]'
                          : 'stroke-[var(--border-strong)]/60'
                      }
                      strokeWidth={selected ? 2.25 : 1}
                      strokeDasharray={selected ? undefined : '3 4'}
                    />
                  );
                })}

                {isEcosystemInView && !prefersReducedMotion && (
                  <>
                    <motion.circle
                      key={`sector-ring-${activeNode.slug}`}
                      cx={activeNode.cx}
                      cy={activeNode.cy}
                      r={30}
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="1.5"
                      initial={{ scale: 0.85, opacity: 0.7 }}
                      animate={{ scale: 1.28, opacity: 0 }}
                      transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.circle
                      key={`sector-pulse-${activeNode.slug}`}
                      r={4}
                      fill="#06B6D4"
                      initial={{ cx: ECOSYSTEM_CENTER, cy: ECOSYSTEM_CENTER, opacity: 0 }}
                      animate={{
                        cx: [ECOSYSTEM_CENTER, activeNode.cx],
                        cy: [ECOSYSTEM_CENTER, activeNode.cy],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 1.75, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </>
                )}

                <g>
                  <circle
                    cx={ECOSYSTEM_CENTER}
                    cy={ECOSYSTEM_CENTER}
                    r={44}
                    className="fill-[#071426] stroke-[#2563EB]"
                    strokeWidth="2"
                  />
                  <text
                    x={ECOSYSTEM_CENTER}
                    y={ECOSYSTEM_CENTER - 3}
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    SUVRA
                  </text>
                  <text
                    x={ECOSYSTEM_CENTER}
                    y={ECOSYSTEM_CENTER + 11}
                    textAnchor="middle"
                    fill="#06B6D4"
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    10 SECTORS
                  </text>
                </g>

                {RADIAL_INDUSTRY_NODES.map((node) => {
                  const selected = node.slug === activeNode.slug;
                  return (
                    <g
                      key={node.slug}
                      onClick={() => setActiveSlug(node.slug)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      aria-label={`Inspect ${node.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setActiveSlug(node.slug);
                        }
                      }}
                    >
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={selected ? 27 : 23}
                        className={
                          selected
                            ? 'fill-[#2563EB] stroke-[#06B6D4]'
                            : 'fill-[var(--bg-surface)] stroke-[var(--border-strong)] hover:stroke-[#2563EB]'
                        }
                        strokeWidth={selected ? 2.25 : 1.5}
                      />
                      <text
                        x={node.cx}
                        y={node.cy + 3.5}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="JetBrains Mono, monospace"
                        fill={selected ? '#FFFFFF' : 'currentColor'}
                        className={selected ? '' : 'fill-[var(--text-primary)]'}
                      >
                        {node.shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div
              className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-3 border-t border-[var(--border-subtle)]"
              role="tablist"
              aria-label="Industries selector"
            >
              {RADIAL_INDUSTRY_NODES.map((ind) => {
                const selected = ind.slug === activeNode.slug;
                return (
                  <button
                    key={ind.slug}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveSlug(ind.slug)}
                    className={`min-h-[44px] px-2 py-1.5 rounded-lg border text-center text-[11px] font-medium transition-colors truncate focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      selected
                        ? 'border-[#2563EB] bg-[#2563EB] text-white'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                    }`}
                    title={ind.name}
                  >
                    {ind.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            role="tabpanel"
            aria-label={activeNode.name}
            className="lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 sm:p-8 min-h-[380px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={TRANSITION_MICRO}
              >
                <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                  Sector Solution Blueprint
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
                  {activeNode.name}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {activeNode.sectorContext}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[var(--border-subtle)]">
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-2">
                      Common Sector Challenges
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                      {activeNode.challenges.slice(0, 2).map((ch) => (
                        <li key={ch} className="flex items-baseline gap-2">
                          <span className="font-mono text-[var(--text-muted)]" aria-hidden="true">
                            —
                          </span>
                          <span>{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-2">
                      Engineering Solutions
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                      {activeNode.solutions.slice(0, 2).map((sol) => (
                        <li key={sol} className="flex items-baseline gap-2">
                          <span
                            className="font-mono text-[#2563EB] dark:text-[#06B6D4]"
                            aria-hidden="true"
                          >
                            —
                          </span>
                          <span>{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[var(--text-muted)]">
                    Governance: {activeNode.complianceFocus}
                  </span>
                  <Link
                    to={`/industries/${activeNode.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] whitespace-nowrap"
                  >
                    <span>Open {activeNode.name} Page</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}

const TECH_FILTERS: Array<'All' | TechEcosystemCategory> = [
  'All',
  'Frontend & Mobile',
  'Cloudflare Edge',
  'Data & Backup',
  'Security & AI',
];

export function TechnologyMarquee() {
  const [techFilter, setTechFilter] = useState<'All' | TechEcosystemCategory>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  const visibleTech =
    techFilter === 'All'
      ? TECHNOLOGY_ECOSYSTEM
      : TECHNOLOGY_ECOSYSTEM.filter((item) => item.category === techFilter);

  const doubled = [...TECHNOLOGY_ECOSYSTEM, ...TECHNOLOGY_ECOSYSTEM];

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <Container>
        <SectionHeader
          eyebrow="Technology Ecosystem"
          title="Modern platforms aligned with our Cloudflare-first engineering stack."
          description="Filter our technical stack by architectural layer. These represent platforms used or planned in engineering delivery—never implied as corporate partnerships."
        />

        <div
          className="mt-8 inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
          role="group"
          aria-label="Filter technology ecosystem by category"
        >
          {TECH_FILTERS.map((category) => {
            const active = techFilter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setTechFilter(category)}
                className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                  active
                    ? 'text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="tech-filter-bg"
                    transition={TRANSITION_MICRO}
                    className="absolute inset-0 rounded-lg bg-[#2563EB]"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
        >
          <AnimatePresence mode="popLayout">
            {visibleTech.map((item) => (
              <motion.div
                layout
                key={item.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={TRANSITION_MICRO}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors"
              >
                <div>
                  <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                    {item.category}
                  </span>
                  <h3 className="mt-1 font-display text-base font-semibold text-[var(--text-primary)]">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-xs text-[var(--text-muted)]">{item.role}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <div className="mt-10 relative border-t border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3.5">
        <div
          className="flex w-max animate-suvra-marquee gap-6 px-4"
          style={{ animationPlayState: isInView ? 'running' : 'paused' }}
        >
          {doubled.map((item, idx) => (
            <div
              key={`${item.name}-strip-${idx}`}
              className="flex items-center gap-2 shrink-0 text-xs text-[var(--text-secondary)] whitespace-nowrap"
            >
              <span className="font-semibold text-[var(--text-primary)]">{item.name}</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">{item.role}</span>
            </div>
          ))}
        </div>
      </div>

      <Container className="mt-5">
        <p className="text-xs text-[var(--text-muted)]">
          Disclosure: Listed technologies reflect engineering tools and target deployment platforms used in our development architecture, not official partner certifications.
        </p>
      </Container>
    </section>
  );
}

type ProcessTrack = 'website' | 'software';

export function ProcessTimeline() {
  const [track, setTrack] = useState<ProcessTrack>('website');
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ['start 0.78', 'end 0.65'],
  });
  const smoothScaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            align="left"
            eyebrow="Our Development Process"
            title="Seven disciplined phases from discovery to ongoing improvement."
            description="Switch between our Website & Digital Delivery and Software & Product Engineering tracks as you scroll down our execution pipeline."
          />

          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)]"
            role="tablist"
            aria-label="Development process track"
          >
            {[
              { id: 'website' as const, label: 'Website & Digital Track' },
              { id: 'software' as const, label: 'Software & Product Track' },
            ].map((tab) => {
              const active = track === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTrack(tab.id)}
                  className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                    active
                      ? 'text-white'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="process-track-bg"
                      transition={TRANSITION_MICRO}
                      className="absolute inset-0 rounded-lg bg-[#2563EB]"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scroll-driven alternating vertical timeline */}
        <div ref={timelineContainerRef} className="relative mt-14">
          {/* Desktop center spine */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-[var(--border-subtle)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: smoothScaleY }}
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 origin-top bg-[#2563EB] dark:bg-[#06B6D4]"
          />

          {/* Mobile left spine */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-4 top-3 bottom-3 w-0.5 bg-[var(--border-subtle)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: smoothScaleY }}
            className="md:hidden absolute left-4 top-3 bottom-3 w-0.5 origin-top bg-[#2563EB] dark:bg-[#06B6D4]"
          />

          <ol className="space-y-8 md:space-y-10">
            {DEVELOPMENT_PROCESS.map((phase, idx) => {
              const isLeft = idx % 2 === 0;
              const isSelected = activeIndex === idx;
              const deliverable =
                track === 'website' ? phase.websiteOutput : phase.softwareOutput;

              return (
                <li
                  key={phase.step}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-start gap-4 md:gap-0 pl-12 md:pl-0"
                >
                  {/* Step Marker */}
                  <div className="md:col-start-2 md:row-start-1 flex justify-center md:pt-5">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Phase ${phase.step}: ${phase.title}`}
                      className={`absolute left-0 top-4 md:static w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-mono text-xs font-semibold transition-colors z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                        isSelected
                          ? 'border-[#06B6D4] bg-[#2563EB] text-white'
                          : 'border-[#2563EB] bg-[var(--bg-surface)] text-[#2563EB] dark:text-[#06B6D4]'
                      }`}
                    >
                      {phase.step}
                    </button>
                  </div>

                  {/* Alternating Content Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={TRANSITION_STANDARD}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`rounded-2xl border p-6 transition-colors ${
                      isSelected
                        ? 'border-[#2563EB]/60 bg-[var(--bg-canvas)] shadow-[var(--shadow-card)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)]'
                    } ${isLeft ? 'md:col-start-1 md:row-start-1 md:mr-4' : 'md:col-start-3 md:row-start-1 md:ml-4'}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                        Phase {phase.step} of 07
                      </span>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">
                        {track === 'website' ? 'Web & Digital' : 'Software & Product'}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-[var(--text-primary)]">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {phase.summary}
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${track}-${phase.step}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={TRANSITION_MICRO}
                        className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)]"
                      >
                        <span className="font-mono text-[var(--text-muted)]">Key Output: </span>
                        {deliverable}
                      </motion.p>
                    </AnimatePresence>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
