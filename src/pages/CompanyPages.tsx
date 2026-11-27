import { ArrowRight, ExternalLink, MapPin, User } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ServiceCard } from '../components/cards/DomainCards';
import { ContactCTA } from '../components/home/ProofAndConversion';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Container, SectionHeader } from '../components/ui/Container';
import { AnimatedHeading } from '../components/ui/MotionPrimitives';
import { SeoHead } from '../components/ui/SeoHead';
import { SITE_CONFIG } from '../config/site';
import { CAREERS_ROLES, LOCATIONS_DATA, getLocationBySlug } from '../data/company';
import { getServiceBySlug } from '../data/services';
import { NotFoundPage } from './ResourcesAndContactPages';

export function AboutPage() {
  return (
    <>
      <SeoHead
        title="About Us"
        description="Learn about Suvra Technologies, a Technology & Innovation Company combining software engineering, product innovation, and Cloudflare-first cloud architecture."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="space-y-14">
          <Breadcrumbs items={[{ label: 'About Us' }]} />

          <div className="max-w-3xl">
            <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-3">
              Established {SITE_CONFIG.establishedYear} · {SITE_CONFIG.positioning}
            </p>
            <AnimatedHeading
              as="h1"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]"
            >
              {SITE_CONFIG.tagline}
            </AnimatedHeading>
            <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              Suvra Technologies was established in 2026 in Muzaffarpur, Bihar to combine dependable client software engineering with purposeful product innovation for Indian and international markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Vision',
                body: 'Build Suvra Technologies into a trusted, internationally competitive technology brand grounded in engineering quality rather than short-term hype.',
              },
              {
                title: 'Mission',
                body: 'Design and deliver accessible websites, custom software, mobile applications, AI workflows, and resilient cloud systems that help businesses operate with clarity.',
              },
              {
                title: 'Services & Product Innovation',
                body: 'Balance client technology services with focused research toward proprietary software products, SaaS platforms, and practical AI solutions.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-7"
              >
                <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {card.body}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
              Engineering &amp; Infrastructure Philosophy
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[var(--text-secondary)] leading-relaxed">
              <p>
                We prioritize clarity, accessibility (WCAG 2.2 AA), strict TypeScript contracts, and verifiable architecture over bloated dependencies or superficial visual tricks.
              </p>
              <p>
                Our infrastructure strategy defaults to Cloudflare (Pages, Workers, D1, R2, Turnstile, Zero Trust) to keep performance high and baseline costs lean, adding Oracle Cloud Infrastructure where workloads technically justify dedicated compute.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function FounderPage() {
  return (
    <>
      <SeoHead
        title={`Founder — ${SITE_CONFIG.founderName}`}
        description={`Profile of ${SITE_CONFIG.founderName}, ${SITE_CONFIG.founderTitle} of Suvra Technologies.`}
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Founder' }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)]">
                {SITE_CONFIG.founderName}
              </h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{SITE_CONFIG.founderTitle}</p>
              <p className="mt-2 font-mono text-[11px] text-[var(--text-muted)]">
                Portrait Placeholder · Verified photo pending
              </p>
              <a
                href={SITE_CONFIG.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <AnimatedHeading
                as="h1"
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
              >
                {SITE_CONFIG.founderName}
              </AnimatedHeading>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                Ravi Ranjan is the Founder and Chief Executive Officer of Suvra Technologies, established in 2026 in Muzaffarpur, Bihar, India. His leadership focuses on uniting high-craft software services with long-term proprietary product development.
              </p>
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                {SITE_CONFIG.suvrixaNote} SUVRIXA is presented here strictly as Ravi Ranjan&apos;s independent student-focused local book exchange initiative rather than a subsidiary or corporate product of Suvra Technologies.
              </p>

              <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
                <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  Leadership Principles
                </h2>
                <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
                  <li>— Honesty in technical scoping, metrics, and delivery expectations.</li>
                  <li>— Root-cause engineering and clean architectural maintainability.</li>
                  <li>— Enabling regional and international organizations with globally competitive digital systems.</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function TeamPage() {
  return (
    <>
      <SeoHead
        title="Team & Leadership"
        description="Leadership-first overview of Suvra Technologies without fabricated employee profiles."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="space-y-10">
          <Breadcrumbs items={[{ label: 'Team' }]} />
          <SectionHeader
            align="left"
            eyebrow="Leadership-First Structure"
            title="Transparent team representation."
            description="Suvra Technologies does not publish fabricated team members or stock portraits. Below is our verified leadership structure and specialist collaboration model."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7">
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">Executive Leadership</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
                {SITE_CONFIG.founderName}
              </h2>
              <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                {SITE_CONFIG.founderTitle}
              </p>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                Oversees technical direction, client architecture strategy, product roadmap planning, and delivery standards.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/founder" className="text-sm font-medium text-[#2563EB] dark:text-[#06B6D4]">
                  View Founder Page
                </Link>
                <a
                  href={SITE_CONFIG.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7">
              <p className="font-mono text-xs text-[var(--text-muted)]">Specialist Network</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
                Multidisciplinary Delivery Model
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                Engagements are structured across full-stack engineering, UI/UX systems, cloud infrastructure, and quality assurance disciplines scaled transparently to project requirements.
              </p>
              <Link
                to="/careers"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4]"
              >
                <span>Explore Collaboration &amp; Careers</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function CareersPage() {
  return (
    <>
      <SeoHead
        title="Careers"
        description="Careers, internships, and engineering collaboration opportunities at Suvra Technologies."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="space-y-10">
          <Breadcrumbs items={[{ label: 'Careers' }]} />
          <SectionHeader
            align="left"
            eyebrow="Careers & Internships"
            title="Honest talent pipeline without artificial job postings."
            description="We currently do not list unverified full-time vacancies, but we welcome introductions from dedicated builders and learners."
          />

          <div className="space-y-4">
            {CAREERS_ROLES.map((role) => (
              <div
                key={role.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                    {role.status}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">{role.type}</span>
                </div>
                <h2 className="mt-2 font-display text-xl font-bold text-[var(--text-primary)]">
                  {role.title}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
                  {role.summary}
                </p>
                <div className="mt-5">
                  <a
                    href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Talent & Internship Introduction — Suvra Technologies')}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                  >
                    <span>Send Portfolio / Introduction</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function LocationsIndexPage() {
  return (
    <>
      <SeoHead
        title="Service Locations"
        description="Service coverage areas for Suvra Technologies across Muzaffarpur, Patna, Bihar, India, and International Markets."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Locations' }]} />
          <SectionHeader
            align="left"
            eyebrow="Geographic Coverage"
            title="Headquartered in Muzaffarpur. Delivering across India and globally."
            description="Our physical headquarters is in Ramdyalu, Muzaffarpur, Bihar. Other listed regions represent digital service coverage areas rather than branch offices."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LOCATIONS_DATA.map((loc) => (
              <Link
                key={loc.slug}
                to={`/locations/${loc.slug}`}
                className="group rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between hover:border-[#2563EB]/60 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#2563EB] dark:text-[#06B6D4]">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span className="font-mono">{loc.regionType}</span>
                  </div>
                  <h2 className="mt-2.5 font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4]">
                    {loc.name}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {loc.summary}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4]">
                  <span>View Regional Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function LocationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : undefined;

  if (!location) {
    return <NotFoundPage />;
  }

  const services = location.recommendedServices
    .map((s) => getServiceBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <SeoHead title={`${location.name} Technology Services`} description={location.summary} />

      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="space-y-12">
          <Breadcrumbs
            items={[
              { label: 'Locations', to: '/locations' },
              { label: location.name },
            ]}
          />

          <div className="max-w-3xl">
            <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-3">
              {location.regionType}
            </p>
            <AnimatedHeading
              as="h1"
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
            >
              {location.headline}
            </AnimatedHeading>
            <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
              {location.summary}
            </p>
            <p className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 text-xs sm:text-sm text-[var(--text-primary)]">
              {location.officeNotice}
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Regional Engineering Priorities
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-secondary)]">
              {location.priorities.map((item) => (
                <li key={item} className="flex items-baseline gap-2.5">
                  <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
              Frequently Requested Services in {location.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((service) => (
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
