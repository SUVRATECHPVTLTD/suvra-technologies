import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard, ProjectCard } from '../components/cards/DomainCards';
import { ContactCTA } from '../components/home/ProofAndConversion';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Container, SectionHeader } from '../components/ui/Container';
import { EmptyState } from '../components/ui/FeedbackStates';
import { AnimatedHeading } from '../components/ui/MotionPrimitives';
import { SeoHead } from '../components/ui/SeoHead';
import { CONCEPT_PROJECTS, PRODUCT_DIRECTIONS, getProjectBySlug } from '../data/company';
import type { ProjectConcept } from '../types/cms';
import { NotFoundPage } from './ResourcesAndContactPages';

export function ProductsPage() {
  return (
    <>
      <SeoHead
        title="Products & Innovation"
        description="Explore Suvra Technologies' product development direction across software products, mobile applications, SaaS platforms, and AI solutions."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Products' }]} />
          <SectionHeader
            align="left"
            eyebrow="Product Innovation Roadmap"
            title="Proprietary software, mobile, SaaS, and AI initiatives."
            description="As a Technology & Innovation Company founded in 2026, Suvra Technologies is actively researching and architecting proprietary products alongside client services. We present only honest availability stages."
          />

          <div className="mt-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)]">
            <strong className="text-[var(--text-primary)]">Availability Disclosure:</strong> No commercial SaaS or mobile product is prematurely marked as launched here. Official releases will be published only after verification and readiness checks.
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCT_DIRECTIONS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

const FILTERS: Array<'All' | ProjectConcept['category'] | 'Verified Client Work'> = [
  'All',
  'Web Platforms',
  'AI & Automation',
  'Enterprise Systems',
  'Mobile & SaaS',
  'Verified Client Work',
];

export function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const items =
    filter === 'Verified Client Work'
      ? []
      : filter === 'All'
        ? CONCEPT_PROJECTS
        : CONCEPT_PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <SeoHead
        title="Portfolio & Concept Demonstrations"
        description="Architectural blueprints and concept demonstrations illustrating Suvra Technologies engineering capabilities."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Portfolio' }]} />
          <SectionHeader
            align="left"
            eyebrow="Work & Blueprints"
            title="Concept demonstrations & engineering architecture showcases."
            description="Every item below is explicitly labelled as a concept demonstration or architecture blueprint rather than fabricated client history."
          />

          <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter portfolio">
            {FILTERS.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
                  filter === cat
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {items.length === 0 ? (
              <EmptyState
                title="Verified Public Client Case Studies Pending Authorization"
                description="Suvra Technologies does not publish fabricated client logos or unverified project metrics. Public client case studies will appear here once authorized by clients."
                action={
                  <button
                    type="button"
                    onClick={() => setFilter('All')}
                    className="px-4 py-2 text-xs font-medium text-white bg-[#2563EB] rounded-lg"
                  >
                    View Architecture Blueprints
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function CaseStudiesIndexPage() {
  return (
    <>
      <SeoHead
        title="Case Studies & Architectural Blueprints"
        description="Structured challenge, approach, and implementation blueprints from Suvra Technologies."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Case Studies' }]} />
          <SectionHeader
            align="left"
            eyebrow="Technical Case Blueprints"
            title="Challenge, architecture, and intended outcomes."
            description="Inspect our reusable case study structure applied to core architecture demonstrations."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONCEPT_PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <>
      <SeoHead title={project.title} description={project.summary} />

      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Case Studies', to: '/case-studies' },
              { label: project.title },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[#2563EB] dark:text-[#06B6D4]">{project.label}</span>
          </div>

          <AnimatedHeading
            as="h1"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] max-w-3xl"
          >
            {project.title}
          </AnimatedHeading>
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Problem &amp; Challenge
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="rounded-2xl border border-[#2563EB]/40 bg-[var(--bg-surface)] p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Architectural Approach
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {project.approach}
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Implementation Highlights
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
                {project.implementation.map((step) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                Intended Design Outcomes (Conceptual)
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
                {project.intendedOutcomes.map((out) => (
                  <li key={out} className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true">—</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-xs text-[var(--text-muted)]">
                Stack: {project.stack.join(' · ')}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
            >
              <span>Build a Similar Architecture</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
