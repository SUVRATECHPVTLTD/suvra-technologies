import { useState } from 'react';
import { ArrowRight, ExternalLink, Mail, MessageSquare, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { TRANSITION_MICRO } from '../../config/motion';
import { SITE_CONFIG } from '../../config/site';
import {
  BLOG_ARTICLES,
  CONCEPT_PROJECTS,
  GENERAL_FAQS,
  PRODUCT_DIRECTIONS,
} from '../../data/company';
import type { ProjectConcept } from '../../types/cms';
import { BlogCard, ProductCard, ProjectCard } from '../cards/DomainCards';
import { BrandSymbol } from '../ui/BrandMark';
import { Container, SectionHeader } from '../ui/Container';
import { FAQAccordion } from '../ui/FAQAccordion';

export function ProductsPreview() {
  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <SectionHeader
            align="left"
            eyebrow="Products & Innovation"
            title="Proprietary product direction in active research and architecture."
            description="We do not announce unverified launches. Below are the four product pillars guiding our internal R&D roadmap."
          />
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4] whitespace-nowrap"
          >
            <span>Explore Products Roadmap</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCT_DIRECTIONS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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
  const items =
    filter === 'All'
      ? CONCEPT_PROJECTS
      : CONCEPT_PROJECTS.filter((item) => item.category === filter);

  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <SectionHeader
            align="left"
            eyebrow="Portfolio & Blueprints"
            title="Concept demonstrations & architectural showcases."
            description="Verified client deployments are published only with authorization. These blueprints demonstrate our engineering patterns."
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
          className="inline-flex flex-wrap items-center gap-1.5 p-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] mb-8"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
            <div className="relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-8 flex flex-col items-center justify-center text-center aspect-[4/3]">
              <div className="absolute top-3.5 right-3.5 opacity-80">
                <BrandSymbol className="h-6" />
              </div>
              <div className="w-16 h-16 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] flex items-center justify-center mb-3">
                <User className="w-7 h-7 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
              </div>
              <p className="font-display text-base font-semibold text-[var(--text-primary)]">
                {SITE_CONFIG.founderName}
              </p>
              <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">
                Verified Founder Portrait Pending
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-2">
              Founder &amp; Leadership
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              {SITE_CONFIG.founderName} — {SITE_CONFIG.founderTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Leading Suvra Technologies from Muzaffarpur, Bihar since 2026 with a clear focus on trustworthy software engineering, disciplined cloud economics, and internationally competitive digital systems.
            </p>
            <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              {SITE_CONFIG.suvrixaNote}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Founder Profile</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE_CONFIG.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] rounded-lg hover:bg-[var(--bg-elevated)] transition-colors whitespace-nowrap"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function BlogPreview() {
  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {BLOG_ARTICLES.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="py-20 sm:py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-subtle)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
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
    <section className="py-20 bg-[#071426] text-[#F8FAFC] border-t border-slate-800">
      <Container>
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-[#0F172A] via-[#071426] to-[#102542] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs text-[#06B6D4] mb-3">Ready When You Are</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let&apos;s build what comes next.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              Share your requirements through our multi-step project intake, reach our team directly by email, or initiate a WhatsApp conversation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
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
