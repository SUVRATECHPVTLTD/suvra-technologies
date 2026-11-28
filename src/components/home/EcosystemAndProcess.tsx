import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Code2,
  Compass,
  Layers,
  Map as MapIcon,
  Pause,
  Play,
  RefreshCw,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MOTION_EASING,
  TRANSITION_MICRO,
  TRANSITION_STANDARD,
  svgPathDrawVariants,
} from '../../config/motion';
import {
  DEVELOPMENT_PROCESS,
  TECHNOLOGY_ECOSYSTEM,
  type TechEcosystemCategory,
} from '../../data/company';
import { INDUSTRIES_DATA } from '../../data/industries';
import { getServiceBySlug } from '../../data/services';
import { Container, SectionHeader } from '../ui/Container';

const ECOSYSTEM_CENTER = 250;
const ECOSYSTEM_RADIUS = 150;
const LABEL_RADIUS = 196;

const INDUSTRY_SHORT_LABELS: Record<string, string> = {
  'education-edtech': 'EdTech',
  healthcare: 'Healthcare',
  'retail-ecommerce': 'Retail',
  'real-estate': 'Real Estate',
  'finance-fintech': 'FinTech',
  'logistics-supply-chain': 'Logistics',
  manufacturing: 'Manufacturing',
  hospitality: 'Hospitality',
  startups: 'Startups',
  enterprises: 'Enterprises',
};

const RADIAL_INDUSTRY_NODES = INDUSTRIES_DATA.map((industry, index) => {
  const angleDeg = -90 + index * (360 / INDUSTRIES_DATA.length);
  const angle = angleDeg * (Math.PI / 180);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const cx = Math.round(ECOSYSTEM_CENTER + ECOSYSTEM_RADIUS * cos);
  const cy = Math.round(ECOSYSTEM_CENTER + ECOSYSTEM_RADIUS * sin);

  const ctrlAngle = angle + 0.18;
  const ctrlR = ECOSYSTEM_RADIUS * 0.52;
  const ctrlX = Math.round(ECOSYSTEM_CENTER + ctrlR * Math.cos(ctrlAngle));
  const ctrlY = Math.round(ECOSYSTEM_CENTER + ctrlR * Math.sin(ctrlAngle));

  const lx = Math.round(ECOSYSTEM_CENTER + LABEL_RADIUS * cos);
  const ly = Math.round(ECOSYSTEM_CENTER + LABEL_RADIUS * sin);
  const textAnchor: 'middle' | 'start' | 'end' =
    Math.abs(cos) < 0.22 ? 'middle' : cos > 0 ? 'start' : 'end';

  return {
    ...industry,
    indexLabel: String(index + 1).padStart(2, '0'),
    shortLabel: INDUSTRY_SHORT_LABELS[industry.slug] ?? industry.name.split(' ')[0],
    cx,
    cy,
    lx,
    ly: Math.abs(cos) < 0.22 ? (sin < 0 ? ly - 6 : ly + 10) : ly + 3,
    textAnchor,
    path: `M ${ECOSYSTEM_CENTER} ${ECOSYSTEM_CENTER} Q ${ctrlX} ${ctrlY} ${cx} ${cy}`,
  };
});

export function IndustriesPreview() {
  const [activeSlug, setActiveSlug] = useState(INDUSTRIES_DATA[0].slug);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const isEcosystemInView = useInView(ecosystemRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = Boolean(isEcosystemInView && !prefersReducedMotion);

  const activeNode =
    RADIAL_INDUSTRY_NODES.find((item) => item.slug === activeSlug) ?? RADIAL_INDUSTRY_NODES[0];
  const recommendedServices = activeNode.recommendedServices
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section className="py-14 sm:py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <SectionHeader
            align="left"
            eyebrow="Connected Industry Ecosystem"
            title="Tailored engineering for ten core business sectors."
            description="Select any sector node along our orbital network to inspect operational bottlenecks, engineered architecture, and recommended service tracks."
          />
          <Link
            to="/industries"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] whitespace-nowrap"
          >
            <span>All 10 Industry Pages</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          <div
            ref={ecosystemRef}
            className="relative lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 sm:p-5 flex flex-col justify-between overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.22] dark:opacity-[0.14]"
            />

            <div className="relative z-10 flex items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                Circular Sector Network · 10 Domains
              </span>
              <span className="font-mono text-[11px] font-medium text-[#2563EB] dark:text-[#06B6D4]">
                {activeNode.indexLabel} · {activeNode.name}
              </span>
            </div>

            {/* Orbital radial network shown on md+ tablets/desktops; clean 2-col selector used on compact mobile */}
            <div className="relative z-10 my-2.5 hidden md:block">
              <svg
                viewBox="0 0 500 500"
                className="w-full h-auto max-h-[365px] mx-auto"
                role="img"
                aria-label="Interactive circular ecosystem connecting Suvra Technologies to 10 core industries"
              >
                <defs>
                  <radialGradient id="industry-hub-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <circle cx={ECOSYSTEM_CENTER} cy={ECOSYSTEM_CENTER} r={190} fill="url(#industry-hub-glow)" />

                <circle
                  cx={ECOSYSTEM_CENTER}
                  cy={ECOSYSTEM_CENTER}
                  r={228}
                  fill="none"
                  className="stroke-[var(--border-subtle)]"
                  strokeWidth="1"
                />
                <circle
                  cx={ECOSYSTEM_CENTER}
                  cy={ECOSYSTEM_CENTER}
                  r={182}
                  fill="none"
                  stroke="#06B6D4"
                  strokeOpacity="0.32"
                  strokeDasharray="18 14 4 14"
                  strokeWidth="1.25"
                  className="suvra-orbit-slow"
                  data-paused={!shouldAnimate ? 'true' : undefined}
                />
                <circle
                  cx={ECOSYSTEM_CENTER}
                  cy={ECOSYSTEM_CENTER}
                  r={ECOSYSTEM_RADIUS}
                  fill="none"
                  className="stroke-[var(--border-strong)]/70"
                  strokeDasharray="3 6"
                  strokeWidth="1.25"
                />
                <circle
                  cx={ECOSYSTEM_CENTER}
                  cy={ECOSYSTEM_CENTER}
                  r={88}
                  fill="none"
                  className="stroke-[var(--border-subtle)]"
                  strokeWidth="1"
                />

                {RADIAL_INDUSTRY_NODES.map((node, idx) => {
                  const selected = node.slug === activeNode.slug;
                  return (
                    <motion.path
                      key={`sector-path-${node.slug}`}
                      d={node.path}
                      fill="none"
                      className={
                        selected
                          ? 'stroke-[#2563EB] dark:stroke-[#06B6D4] suvra-dash-flow'
                          : 'stroke-[var(--border-strong)]/55'
                      }
                      data-paused={!shouldAnimate ? 'true' : undefined}
                      strokeWidth={selected ? 2.4 : 1.1}
                      strokeDasharray={selected ? '6 6' : '3 5'}
                      variants={svgPathDrawVariants}
                      initial={prefersReducedMotion ? 'visible' : 'hidden'}
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: idx * 0.025, ease: MOTION_EASING }}
                    />
                  );
                })}

                {shouldAnimate && (
                  <motion.circle
                    key={`sector-ring-${activeNode.slug}`}
                    cx={activeNode.cx}
                    cy={activeNode.cy}
                    r={27}
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="1.5"
                    initial={{ scale: 0.85, opacity: 0.65 }}
                    animate={{ scale: 1.32, opacity: 0 }}
                    transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}

                <g>
                  <circle
                    cx={ECOSYSTEM_CENTER}
                    cy={ECOSYSTEM_CENTER}
                    r={44}
                    className="fill-[#071426] stroke-[#2563EB]"
                    strokeWidth="2"
                  />
                  <circle
                    cx={ECOSYSTEM_CENTER}
                    cy={ECOSYSTEM_CENTER}
                    r={37}
                    fill="none"
                    stroke="#06B6D4"
                    strokeOpacity="0.32"
                    strokeWidth="1"
                  />
                  <text
                    x={ECOSYSTEM_CENTER}
                    y={ECOSYSTEM_CENTER - 3}
                    textAnchor="middle"
                    fill="#F8FAFC"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    SUVRA
                  </text>
                  <text
                    x={ECOSYSTEM_CENTER}
                    y={ECOSYSTEM_CENTER + 12}
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
                      className="cursor-pointer group"
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
                        r={selected ? 21 : 17}
                        className={
                          selected
                            ? 'fill-[#2563EB] stroke-[#06B6D4]'
                            : 'fill-[var(--bg-surface)] stroke-[var(--border-strong)] group-hover:stroke-[#2563EB]'
                        }
                        strokeWidth={selected ? 2.25 : 1.5}
                      />
                      <text
                        x={node.cx}
                        y={node.cy + 3.5}
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="600"
                        fontFamily="JetBrains Mono, monospace"
                        fill={selected ? '#FFFFFF' : 'currentColor'}
                        className={selected ? '' : 'fill-[var(--text-primary)]'}
                      >
                        {node.indexLabel}
                      </text>
                      <text
                        x={node.lx}
                        y={node.ly}
                        textAnchor={node.textAnchor}
                        fontSize="10.5"
                        fontWeight={selected ? '700' : '500'}
                        fontFamily="Inter, sans-serif"
                        className={
                          selected
                            ? 'fill-[#2563EB] dark:fill-[#06B6D4]'
                            : 'fill-[var(--text-secondary)] group-hover:fill-[var(--text-primary)]'
                        }
                      >
                        {node.shortLabel}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div
              className="relative z-10 mt-3 md:mt-0 grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-2 md:pt-3 md:border-t md:border-[var(--border-subtle)]"
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
            className="lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 sm:p-7 flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={TRANSITION_MICRO}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                      Sector Solution Blueprint
                    </p>
                    <span className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                      {activeNode.indexLabel} / 10
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                    {activeNode.name}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    {activeNode.sectorContext}
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-[var(--border-subtle)]">
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

                  {recommendedServices.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
                      <p className="font-mono text-[11px] text-[var(--text-muted)] mb-2">
                        Recommended Service Tracks
                      </p>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {recommendedServices.map((svc) => (
                          <Link
                            key={svc.slug}
                            to={`/services/${svc.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors underline-offset-4 hover:underline"
                          >
                            <span>{svc.name}</span>
                            <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[var(--text-muted)] max-w-sm">
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

function TechPlatformMark({ name }: { name: string }) {
  const lower = name.toLowerCase();

  if (lower.includes('next')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 16V8.5L16.5 18.2M15.5 8.5V13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (lower.includes('react')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#06B6D4]" aria-hidden="true">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9.5" ry="3.8" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
      </svg>
    );
  }
  if (lower.includes('typescript')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#2563EB] dark:text-[#3B82F6]" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.5" />
        <text x="12" y="15.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="JetBrains Mono, monospace" fill="currentColor">
          TS
        </text>
      </svg>
    );
  }
  if (lower.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#06B6D4]" aria-hidden="true">
        <path
          d="M7 9.5C8 6.8 10.2 6 12.2 6.8c1.4.6 2 1.8 3.2 2.2 1.1.4 2.1.1 2.9-.8-.8 2.7-2.9 3.6-4.9 2.8-1.4-.5-2-1.8-3.2-2.2-1.1-.3-2.2 0-3.2.7zm-3 6c1-2.7 3.2-3.5 5.2-2.7 1.4.6 2 1.8 3.2 2.2 1.1.4 2.1.1 2.9-.8-.8 2.7-2.9 3.6-4.9 2.8-1.4-.5-2-1.8-3.2-2.2-1.1-.3-2.2 0-3.2.7z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (lower.includes('cloudflare')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#F97316]" aria-hidden="true">
        <path
          d="M17.5 17H7.2a3.7 3.7 0 0 1-.4-7.38A4.8 4.8 0 0 1 16 8.3a3.9 3.9 0 0 1 4.2 3.8A3.3 3.3 0 0 1 17.5 17z"
          fill="currentColor"
          fillOpacity="0.16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (lower.includes('hono')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#EA580C]" aria-hidden="true">
        <path
          d="M12.5 3.5c2.2 2.6 4.5 5.3 4.5 9a5 5 0 1 1-10 0c0-2.1 1-3.9 2.3-5.4.1 1.7 1 2.7 2.1 3 .2-2.5.4-4.7 1.1-6.6z"
          fill="currentColor"
          fillOpacity="0.18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (lower.includes('drizzle')) {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#10B981]" aria-hidden="true">
        <path
          d="M7 14l2.5-6M12 16l2.5-6M16.5 12.5l1.5-3.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#DC2626]" aria-hidden="true">
      <rect x="4" y="8" width="16" height="8" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
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
  const [marqueePaused, setMarqueePaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const visibleTech =
    techFilter === 'All'
      ? TECHNOLOGY_ECOSYSTEM
      : TECHNOLOGY_ECOSYSTEM.filter((item) => item.category === techFilter);

  const countFor = (category: 'All' | TechEcosystemCategory) =>
    category === 'All'
      ? TECHNOLOGY_ECOSYSTEM.length
      : TECHNOLOGY_ECOSYSTEM.filter((item) => item.category === category).length;

  const gridColsClass =
    visibleTech.length === 2
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
      : visibleTech.length === 3
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  const hasSingleTailOnLg = visibleTech.length > 4 && visibleTech.length % 4 === 1;
  const hasSingleTailOnSm = visibleTech.length > 2 && visibleTech.length % 2 === 1;

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-16 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)] overflow-hidden"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            align="left"
            eyebrow="Technology Ecosystem"
            title="Modern platforms aligned with our Cloudflare-first engineering stack."
            description="Continuous stack strip and filterable architecture directory. Listed platforms represent tools used or targeted in delivery—never implied as corporate partnerships."
          />

          {!prefersReducedMotion && (
            <button
              type="button"
              onClick={() => setMarqueePaused((prev) => !prev)}
              aria-pressed={marqueePaused}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-medium rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[#2563EB] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              {marqueePaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
                  <span>Resume Strip</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
                  <span>Pause Strip</span>
                </>
              )}
            </button>
          )}
        </div>
      </Container>

      {/* Genuine GPU-composited horizontal marquee (falls back to static wrapped row on reduced motion) */}
      <div className="mt-7 border-t border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] py-3.5">
        {prefersReducedMotion ? (
          <Container>
            <div className="flex flex-wrap items-center gap-3">
              {TECHNOLOGY_ECOSYSTEM.map((item) => (
                <div
                  key={`rm-${item.name}`}
                  className="inline-flex items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3.5 py-2"
                >
                  <TechPlatformMark name={item.name} />
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        ) : (
          <div className="suvra-marquee-container overflow-hidden">
            <div
              className="suvra-marquee-track flex items-center gap-4 pr-4"
              data-paused={marqueePaused || !isSectionInView ? 'true' : undefined}
            >
              {[0, 1].map((cloneIdx) => (
                <div
                  key={`track-${cloneIdx}`}
                  aria-hidden={cloneIdx === 1 ? 'true' : undefined}
                  className="flex items-center gap-4 shrink-0"
                >
                  {TECHNOLOGY_ECOSYSTEM.map((item) => (
                    <div
                      key={`${cloneIdx}-${item.name}`}
                      className="inline-flex items-center gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-4 py-2.5 shrink-0"
                    >
                      <TechPlatformMark name={item.name} />
                      <div>
                        <p className="font-display text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">
                          {item.name}
                        </p>
                        <p className="font-mono text-[10px] text-[var(--text-muted)] whitespace-nowrap">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Container>
        <div
          className="mt-7 inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
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
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span>{category}</span>
                  <span
                    className={`font-mono text-[11px] tabular-nums ${
                      active ? 'text-white/80' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {countFor(category)}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={techFilter}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: MOTION_EASING }}
            className={`mt-6 grid ${gridColsClass} gap-3.5`}
          >
            {visibleTech.map((item, idx) => {
              const isLast = idx === visibleTech.length - 1;
              const isOrphanTail = isLast && (hasSingleTailOnLg || hasSingleTailOnSm);

              if (isOrphanTail) {
                return (
                  <div
                    key={item.name}
                    className={`${hasSingleTailOnSm ? 'sm:col-span-2' : ''} ${
                      hasSingleTailOnLg ? 'lg:col-span-4' : 'lg:col-span-1'
                    } rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-[#2563EB]/50 dark:hover:border-[#06B6D4]/50`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center shrink-0">
                        <TechPlatformMark name={item.name} />
                      </div>
                      <div>
                        <h3 className="font-display text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                          {item.name}
                        </h3>
                        <p className="font-mono text-xs text-[var(--text-muted)]">
                          {item.role} · Secondary Backup &amp; Dedicated Compute Layer
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                      {item.category}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={item.name}
                  className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/50 dark:hover:border-[#06B6D4]/50 hover:shadow-[var(--shadow-card)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center">
                        <TechPlatformMark name={item.name} />
                      </div>
                      <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-3.5 font-display text-base font-semibold text-[var(--text-primary)]">
                      {item.name}
                    </h3>
                  </div>
                  <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">{item.role}</p>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <p className="mt-5 text-xs text-[var(--text-muted)]">
          Disclosure: Listed technologies reflect engineering tools and target deployment platforms used in our development architecture, not official partner certifications.
        </p>
      </Container>
    </section>
  );
}

type ProcessTrack = 'website' | 'software';

const PHASE_ICONS = [
  Compass,
  MapIcon,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
  RefreshCw,
] as const;

export function ProcessTimeline() {
  const [track, setTrack] = useState<ProcessTrack>('website');
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ['start 0.78', 'end 0.58'],
  });
  const smoothScaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const idx = Math.min(
        DEVELOPMENT_PROCESS.length - 1,
        Math.max(0, Math.floor(latest * DEVELOPMENT_PROCESS.length))
      );
      setActiveIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section className="py-14 sm:py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            align="left"
            eyebrow="Our Development Process"
            title="Seven disciplined phases from discovery to ongoing improvement."
            description="Switch between our Website & Digital Delivery and Software & Product Engineering tracks across our execution pipeline."
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

        <div ref={timelineContainerRef} className="relative mt-9">
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-[var(--border-subtle)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReducedMotion ? 1 : smoothScaleY }}
            className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 origin-top bg-gradient-to-b from-[#2563EB] to-[#06B6D4]"
          />

          <div
            aria-hidden="true"
            className="md:hidden absolute left-4 top-4 bottom-4 w-0.5 bg-[var(--border-subtle)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: prefersReducedMotion ? 1 : smoothScaleY }}
            className="md:hidden absolute left-4 top-4 bottom-4 w-0.5 origin-top bg-gradient-to-b from-[#2563EB] to-[#06B6D4]"
          />

          <ol className="space-y-4 md:space-y-5">
            {DEVELOPMENT_PROCESS.map((phase, idx) => {
              const isLeft = idx % 2 === 0;
              const isSelected = activeIndex === idx;
              const isCompleted = idx <= activeIndex;
              const PhaseIcon = PHASE_ICONS[idx] ?? Compass;
              const deliverable =
                track === 'website' ? phase.websiteOutput : phase.softwareOutput;

              return (
                <li
                  key={phase.step}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-start gap-3 md:gap-0 pl-12 md:pl-0"
                >
                  <div className="md:col-start-2 md:row-start-1 flex justify-center md:pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Phase ${phase.step}: ${phase.title}`}
                      className={`absolute left-0 top-4 md:static w-9 h-9 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                        isSelected
                          ? 'border-[#06B6D4] bg-[#2563EB] text-white scale-105 shadow-md'
                          : isCompleted
                            ? 'border-[#2563EB] bg-[var(--bg-surface)] text-[#2563EB] dark:text-[#06B6D4]'
                            : 'border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-muted)]'
                      }`}
                    >
                      <PhaseIcon className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0.72, x: isLeft ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={TRANSITION_STANDARD}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`rounded-xl border p-4 sm:p-5 transition-all duration-200 ${
                      isSelected
                        ? 'border-[#2563EB]/65 dark:border-[#06B6D4]/65 bg-[var(--bg-canvas)] shadow-[var(--shadow-card)]'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)]'
                    } ${isLeft ? 'md:col-start-1 md:row-start-1 md:mr-4' : 'md:col-start-3 md:row-start-1 md:ml-4'}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs tabular-nums text-[#2563EB] dark:text-[#06B6D4]">
                        Phase {phase.step} of 07
                      </span>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">
                        {track === 'website' ? 'Web & Digital' : 'Software & Product'}
                      </span>
                    </div>
                    <h3 className="mt-1.5 font-display text-lg font-bold text-[var(--text-primary)]">
                      {phase.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {phase.summary}
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${track}-${phase.step}`}
                        initial={{ opacity: 0, y: 3 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -3 }}
                        transition={TRANSITION_MICRO}
                        className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] text-xs font-medium text-[var(--text-primary)]"
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
