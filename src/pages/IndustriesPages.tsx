import { ArrowRight, Check } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { IndustryCard, ServiceCard } from '../components/cards/DomainCards';
import { ContactCTA } from '../components/home/ProofAndConversion';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Container, SectionHeader } from '../components/ui/Container';
import { AnimatedHeading } from '../components/ui/MotionPrimitives';
import { SeoHead } from '../components/ui/SeoHead';
import { INDUSTRIES_DATA, getIndustryBySlug } from '../data/industries';
import { getServiceBySlug } from '../data/services';
import { NotFoundPage } from './ResourcesAndContactPages';

export function IndustriesIndexPage() {
  return (
    <>
      <SeoHead
        title="Industries"
        description="Explore how Suvra Technologies designs software, AI automation, and cloud systems across 10 core industries."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Industries' }]} />
          <SectionHeader
            align="left"
            eyebrow="Sector Expertise"
            title="Digital systems tailored to industry workflows."
            description="Every sector carries distinct operational bottlenecks, device constraints, and data boundaries. Explore our dedicated industry architectures below."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_DATA.map((industry) => (
              <IndustryCard key={industry.slug} industry={industry} />
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const industry = slug ? getIndustryBySlug(slug) : undefined;

  if (!industry) {
    return <NotFoundPage />;
  }

  const recommended = industry.recommendedServices
    .map((s) => getServiceBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <SeoHead title={industry.name} description={industry.shortDescription} />

      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)]">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Industries', to: '/industries' },
              { label: industry.name },
            ]}
          />
          <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-3">
            Industry Architecture
          </p>
          <AnimatedHeading
            as="h1"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] max-w-3xl"
          >
            {industry.name}
          </AnimatedHeading>
          <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {industry.sectorContext}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/start-a-project"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Discuss {industry.name} Solutions</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[var(--bg-surface)]">
        <Container className="space-y-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Operational Challenges
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                {industry.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-baseline gap-2.5">
                    <span className="font-mono text-xs text-[var(--text-muted)]" aria-hidden="true">—</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#2563EB]/40 bg-[var(--bg-canvas)] p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                Proposed Technical Solutions
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                {industry.solutions.map((solution) => (
                  <li key={solution} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6">
            <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
              Security &amp; Governance Focus
            </p>
            <p className="mt-2 text-sm sm:text-base text-[var(--text-primary)]">
              {industry.complianceFocus}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
              Recommended Services for {industry.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommended.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
