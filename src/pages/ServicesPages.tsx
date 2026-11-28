import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ServiceCard } from '../components/cards/DomainCards';
import { ContactCTA } from '../components/home/ProofAndConversion';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Container, SectionHeader } from '../components/ui/Container';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { AnimatedHeading } from '../components/ui/MotionPrimitives';
import { SeoHead } from '../components/ui/SeoHead';
import { ServiceDiagram } from '../components/ui/ServiceDiagram';
import { CURRENCY_CONFIG, QUOTATION_LABELS } from '../config/currency';
import { getPublicServicePricing, getServiceDeliverables } from '../config/pricing';
import { SITE_CONFIG } from '../config/site';
import {
  SERVICE_CATEGORIES,
  SERVICES_DATA,
  getServiceBySlug,
  getServicesByCategory,
} from '../data/services';
import type { ServiceCategoryId } from '../types/cms';
import { NotFoundPage } from './ResourcesAndContactPages';

export function ServicesIndexPage() {
  const [filter, setFilter] = useState<ServiceCategoryId | 'all'>('all');
  const visible = filter === 'all' ? SERVICES_DATA : getServicesByCategory(filter);

  return (
    <>
      <SeoHead
        title="Services"
        description="Explore all 14 technology services from Suvra Technologies across Engineering, Intelligence, Digital, and Cloud Infrastructure."
      />

      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Services' }]} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="14 Core Capabilities"
            title="Engineering, intelligence, digital design, and cloud services."
            description="Every engagement is architected for maintainability, accessibility, and future expansion into web, mobile, SaaS, or API ecosystems."
          />

          <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter services">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
                filter === 'all'
                  ? 'bg-[#2563EB] border-[#2563EB] text-white'
                  : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              All Services ({SERVICES_DATA.length})
            </button>
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                aria-pressed={filter === cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
                  filter === cat.id
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-14 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                Transparent Quotation Framework · {CURRENCY_CONFIG.code} ({CURRENCY_CONFIG.symbol})
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
                {QUOTATION_LABELS.customPricing} tailored to exact technical scope.
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {QUOTATION_LABELS.discoveryNote} Select your required services in our guided brief to receive a milestone-based proposal.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Link
                to="/start-a-project"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>{QUOTATION_LABELS.requestQuote}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={SITE_CONFIG.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-3 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors whitespace-nowrap"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  if (!service) {
    return <NotFoundPage />;
  }

  const related = service.relatedSlugs
    .map((relSlug) => getServiceBySlug(relSlug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const publicPricing = getPublicServicePricing(service.slug);
  const serviceDeliverables = getServiceDeliverables(service.slug);

  return (
    <>
      <SeoHead
        title={service.name}
        description={service.shortDescription}
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          serviceType: service.categoryLabel,
          description: service.shortDescription,
          provider: {
            '@type': 'Organization',
            name: 'Suvra Technologies',
          },
        }}
      />

      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)]">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Services', to: '/services' },
              { label: service.name },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-3">
                {service.categoryLabel} Practice
              </p>
              <AnimatedHeading
                as="h1"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
              >
                {service.name}
              </AnimatedHeading>
              <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {service.heroSummary}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to={`/start-a-project?service=${encodeURIComponent(service.name)}`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Discuss {service.name}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-5 py-3 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors whitespace-nowrap"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
              <p className="font-mono text-xs text-[var(--text-muted)] mb-3">
                Applicable Technology Stack
              </p>
              <ul className="space-y-2">
                {service.techStack.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-2.5 text-sm text-[var(--text-primary)] py-1 border-b border-[var(--border-subtle)] last:border-b-0"
                  >
                    <Check className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] shrink-0" aria-hidden="true" />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[var(--bg-surface)]">
        <Container className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Service Overview
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                {service.overview}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-[var(--border-subtle)]">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Common Business Challenges
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                {service.challenges.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-[var(--text-muted)]" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#2563EB]/40 bg-[var(--bg-canvas)] p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Our Proposed Approach
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                {service.approach.map((item) => (
                  <li key={item} className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ServiceDiagram kind={service.diagramKind} caption={service.diagramCaption} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Features &amp; Capabilities
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Potential Business Benefits
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-[var(--border-subtle)]">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-2">
              Structured Deliverables
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Core outcomes and implementation milestones scoped for {service.name}.
            </p>

            {serviceDeliverables.length > 0 && (
              <div className="mb-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6">
                <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-3">
                  Key Service Deliverables
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-[var(--text-secondary)]">
                  {serviceDeliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  index: '01',
                  title: 'Architecture & Scope Blueprint',
                  summary: `Typed requirements, system boundaries, and milestone documentation aligned for ${service.name}.`,
                  items: [service.methodology[0]?.step ?? 'Discovery Brief', service.methodology[1]?.step ?? 'System Architecture'],
                },
                {
                  index: '02',
                  title: 'Core Production Implementation',
                  summary: `Clean modular build engineered with ${service.techStack.slice(0, 3).join(', ')} and accessible UI states.`,
                  items: service.capabilities.slice(0, 2),
                },
                {
                  index: '03',
                  title: 'Verification & Handover Pack',
                  summary: 'Responsive QA checks, repository cleanliness, deployment guide, and post-launch readiness.',
                  items: [service.methodology[2]?.step ?? 'QA & Accessibility', service.methodology[3]?.step ?? 'Deployment Handover'],
                },
              ].map((card) => (
                <div
                  key={card.index}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                      Deliverable {card.index}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {card.summary}
                    </p>
                  </div>
                  <ul className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-1.5 text-xs text-[var(--text-secondary)]">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-[var(--border-subtle)]">
            <div className="rounded-2xl border border-[#2563EB]/45 bg-[#071426] text-[#F8FAFC] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                  <span className="font-mono text-[#06B6D4]">
                    {publicPricing.pricingTypeLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>Currency: {CURRENCY_CONFIG.code} ({CURRENCY_CONFIG.symbol})</span>
                  {publicPricing.estimatedDuration && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Typical Timeline: {publicPricing.estimatedDuration}</span>
                    </>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {publicPricing.displayPrice}
                  </h2>
                  {publicPricing.billingSuffix && (
                    <span className="text-xs font-mono text-[#38BDF8]">
                      {publicPricing.billingSuffix}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {publicPricing.approvalNotice} Share your goals for {service.name} to receive an itemized INR milestone proposal without hidden retainers.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
                <Link
                  to={`/start-a-project?service=${encodeURIComponent(service.name)}`}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{publicPricing.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-[var(--border-subtle)]">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
              Development Methodology
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.methodology.map((item, idx) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-5"
                >
                  <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-[var(--text-primary)]">
                    {item.step}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                {service.name} FAQs
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Specific technical and delivery answers for this capability.
              </p>
            </div>
            <div className="lg:col-span-7">
              <FAQAccordion items={service.faqs} />
            </div>
          </div>

          {related.length > 0 && (
            <div className="pt-10 border-t border-[var(--border-subtle)]">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
                Related Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((rel) => (
                  <ServiceCard key={rel.slug} service={rel} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
