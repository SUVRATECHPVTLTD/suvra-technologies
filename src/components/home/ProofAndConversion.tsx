import { useState } from 'react';
import { ArrowRight, Mail, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING, TRANSITION_MICRO } from '../../config/motion';
import { SITE_CONFIG } from '../../config/site';
import {
  BLOG_ARTICLES,
  CONCEPT_PROJECTS,
  GENERAL_FAQS,
  PRODUCT_DIRECTIONS,
} from '../../data/company';
import type { ProjectConcept } from '../../types/cms';
import { ProjectCard } from '../cards/DomainCards';
import { FounderExecutiveProfile } from '../company/FounderExecutiveProfile';
import { Container, SectionHeader } from '../ui/Container';
import { FAQAccordion } from '../ui/FAQAccordion';
import { RevealOnScroll } from '../ui/MotionPrimitives';

export function ProductsPreview() {
  return (
    <section className="py-14 sm:py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <RevealOnScroll direction="right" distance={14} className="lg:col-span-5 lg:sticky lg:top-24">
            <SectionHeader
              align="left"
              eyebrow="Products & Innovation"
              title="Proprietary product direction in active research and architecture."
              description="We do not announce unverified launches. Below are the four product pillars guiding our internal R&D roadmap."
            />
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Explore Products Roadmap</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="lg:col-span-7 divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
            {PRODUCT_DIRECTIONS.map((product, idx) => (
              <RevealOnScroll
                key={product.id}
                delay={idx * 0.04}
                className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
              >
                <div className="sm:col-span-5">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="font-mono tabular-nums text-[#2563EB] dark:text-[#06B6D4]">
                      0{idx + 1}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{product.category}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-[var(--text-primary)]">
                    {product.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
                    {product.status}
                  </p>
                </div>

                <div className="sm:col-span-7">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {product.summary}
                  </p>
                  <p className="mt-2.5 text-xs text-[var(--text-muted)]">
                    {product.focusAreas.join(' · ')}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const PORTFOLIO_FILTERS: Array<'All' | ProjectConcept['category']> = [
  'All',
  'Web Platforms',
  'AI & Automation',
  'Enterprise Systems',
  'Mobile & SaaS',
];

export function PortfolioPreview() {
  const [filter, setFilter] = useState<'All' | ProjectConcept['category']>('All');
  const prefersReducedMotion = useReducedMotion();
  const items =
    filter === 'All'
      ? CONCEPT_PROJECTS
      : CONCEPT_PROJECTS.filter((item) => item.category === filter);

  return (
    <section className="py-14 sm:py-16 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
          <SectionHeader
            align="left"
            eyebrow="Portfolio & Engineering Showcase"
            title="Concept demonstrations & architectural showcases."
            description="Verified client deployments are published only with authorization. These interactive blueprints demonstrate our system architecture patterns."
          />
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] whitespace-nowrap"
          >
            <span>Full Portfolio View</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div
          className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] mb-7"
          role="group"
          aria-label="Filter concept blueprints"
        >
          {PORTFOLIO_FILTERS.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(cat)}
                className={`relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  active
                    ? 'text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="portfolio-filter-bg"
                    transition={TRANSITION_MICRO}
                    className="absolute inset-0 rounded-lg bg-[#2563EB]"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: MOTION_EASING }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {items.map((project) => (
              <div key={project.slug} className="flex">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="py-14 sm:py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <FounderExecutiveProfile variant="home" />
      </Container>
    </section>
  );
}

export function BlogPreview() {
  const [leadArticle, ...otherArticles] = BLOG_ARTICLES;

  return (
    <section className="py-14 sm:py-16 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <SectionHeader
            align="left"
            eyebrow="Technology Insights"
            title="Engineering notes and architectural perspectives."
            description="Original technical essays covering cloud strategy, frontend maintainability, and guardrailed AI systems."
          />
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] whitespace-nowrap"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {leadArticle && (
            <Link
              to={`/blog/${leadArticle.slug}`}
              className="group lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span>{leadArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{leadArticle.readTime}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
                  {leadArticle.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {leadArticle.summary}
                </p>

                {leadArticle.sections.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
                    <p className="font-mono text-[11px] text-[var(--text-muted)] mb-2">
                      Inside This Essay
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                      {leadArticle.sections.map((section) => (
                        <li key={section.heading} className="flex items-baseline gap-2">
                          <span className="font-mono text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true">
                            —
                          </span>
                          <span>{section.heading}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4]">
                <span>Read Featured Essay</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          )}

          <div className="lg:col-span-6 divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)] flex flex-col justify-between">
            {otherArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/blog/${article.slug}`}
                className="group py-4 sm:py-5 flex items-start justify-between gap-4 hover:bg-[var(--bg-surface)]/75 px-3 -mx-3 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{article.readTime}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-base sm:text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <ArrowRight
                  className="w-4 h-4 shrink-0 mt-1 text-[#2563EB] dark:text-[#06B6D4] transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="py-14 sm:py-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              align="left"
              eyebrow="Frequently Asked Questions"
              title="Clear answers before you start."
              description="Practical answers about how Suvra Technologies scopes work, builds software, and collaborates."
            />
            <Link
              to="/faq"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4]"
            >
              <span>View Full FAQ Page</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <FAQAccordion items={GENERAL_FAQS} />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="py-14 sm:py-16 bg-[#071426] text-[#F8FAFC] border-t border-slate-800">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-[#0F172A] via-[#071426] to-[#102542] p-7 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-7">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-radial from-[#2563EB]/20 to-transparent blur-2xl"
          />
          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-xs text-[#06B6D4] mb-2.5">Ready When You Are</p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Let&apos;s build what comes next.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Share your requirements through our multi-step project intake, reach our team directly by email, or initiate a WhatsApp conversation.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all active:scale-[0.98] whitespace-nowrap"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white border border-slate-700 bg-slate-900/80 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>Contact Our Team</span>
            </Link>

            <a
              href={SITE_CONFIG.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[#06B6D4] border border-[#06B6D4]/40 bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
