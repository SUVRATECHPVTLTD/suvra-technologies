import { ArrowRight, CheckCircle2, ExternalLink, Mail, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { ServiceCard } from '../components/cards/DomainCards';
import { FounderExecutiveProfile } from '../components/company/FounderExecutiveProfile';
import { ContactCTA } from '../components/home/ProofAndConversion';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Container, SectionHeader } from '../components/ui/Container';
import { AnimatedHeading, RevealOnScroll } from '../components/ui/MotionPrimitives';
import { SeoHead } from '../components/ui/SeoHead';
import { SITE_CONFIG } from '../config/site';
import {
  CAREERS_ROLES,
  FOUNDER_EXECUTIVE_PROFILE,
  FOUNDER_LEADERSHIP_DATA,
  LOCATIONS_DATA,
  getLocationBySlug,
} from '../data/company';
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

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#06B6D4]">
                FOUNDER &amp; LEADERSHIP
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
                {FOUNDER_EXECUTIVE_PROFILE.name} — {FOUNDER_EXECUTIVE_PROFILE.designation}
              </h2>
              <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                {FOUNDER_EXECUTIVE_PROFILE.supportingBiography}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Executive Profile</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={FOUNDER_EXECUTIVE_PROFILE.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] rounded-lg hover:bg-[var(--bg-elevated)] transition-colors whitespace-nowrap"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function FounderPage() {
  const profile = FOUNDER_EXECUTIVE_PROFILE;

  return (
    <>
      <SeoHead
        title={`Founder — ${profile.name}`}
        description={`Executive profile of ${profile.name}, ${profile.designation} of ${profile.company}.`}
      />

      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="space-y-14">
          <Breadcrumbs items={[{ label: 'Founder & Leadership' }]} />

          {/* 1. Primary Photo-Free Editorial Executive Header */}
          <FounderExecutiveProfile variant="page" />

          {/* 2. Executive Introduction & 3. Company Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <RevealOnScroll className="lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-8">
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-2">
                01 · Executive Introduction
              </p>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Leadership Grounded in Engineering Discipline
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {FOUNDER_LEADERSHIP_DATA.executiveIntroduction}
              </p>
              <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                {profile.supportingBiography}
              </p>
            </RevealOnScroll>

            <RevealOnScroll
              delay={0.08}
              className="lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-8"
            >
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-2">
                02 · Company Vision
              </p>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Building a Trusted Technology Brand
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {FOUNDER_LEADERSHIP_DATA.companyVision}
              </p>
              <p className="mt-4 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Established {profile.establishedYear} · {profile.headquarters}
              </p>
            </RevealOnScroll>
          </div>

          {/* 4. Leadership Philosophy */}
          <div>
            <RevealOnScroll>
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-2">
                03 · Leadership Philosophy
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Principles Guiding Strategy &amp; Client Delivery
              </h2>
            </RevealOnScroll>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {FOUNDER_LEADERSHIP_DATA.leadershipPhilosophy.map((item, idx) => (
                <RevealOnScroll
                  key={item.title}
                  delay={idx * 0.06}
                  className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* 5. Technology & Innovation Focus */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-10">
            <RevealOnScroll>
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-2">
                04 · Technology &amp; Innovation Focus
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Core Technical Pillars
              </h2>
            </RevealOnScroll>

            <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {FOUNDER_LEADERSHIP_DATA.technologyInnovationFocus.map((pillar, idx) => (
                <RevealOnScroll
                  key={pillar.area}
                  delay={idx * 0.06}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6"
                >
                  <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                    {pillar.area}
                  </h3>
                  <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                    {pillar.summary}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>

          {/* 6. Commitment to Engineering Quality & 7. Long-Term Strategic Direction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <RevealOnScroll className="lg:col-span-6 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-2">
                  05 · Commitment to Engineering Quality
                </p>
                <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                  Accountable Craft Across Every Engagement
                </h2>
                <ul className="mt-5 space-y-3">
                  {FOUNDER_LEADERSHIP_DATA.engineeringQualityCommitments.map((commitment) => (
                    <li
                      key={commitment}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{commitment}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>

            <RevealOnScroll
              delay={0.08}
              className="lg:col-span-6 rounded-2xl border border-[#2563EB]/35 bg-[#071426] text-white p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <p className="font-mono text-xs text-[#06B6D4] mb-2">
                  06 · Long-Term Strategic Direction
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  Dual-Track Client Delivery &amp; Product R&amp;D
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {FOUNDER_LEADERSHIP_DATA.strategicDirection}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800">
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  Independent Initiative Disclosure
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {profile.suvrixaDisclosure}
                </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* 8. Professional Contact & LinkedIn */}
          <RevealOnScroll className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4] mb-2">
                07 · Professional Contact &amp; LinkedIn
              </p>
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Connect Directly with Leadership &amp; Engineering
              </h2>
              <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
                For partnership inquiries, custom software architecture discussions, or company outreach, connect via LinkedIn or write directly to {profile.email}.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function TeamPage() {
  const profile = FOUNDER_EXECUTIVE_PROFILE;

  return (
    <>
      <SeoHead
        title="Team & Leadership"
        description="Leadership-first, photo-free corporate structure of Suvra Technologies without fabricated employee rosters."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="space-y-10">
          <Breadcrumbs items={[{ label: 'Team' }]} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="FOUNDER & LEADERSHIP"
            title="Transparent leadership-first structure."
            description="Suvra Technologies maintains a leadership-first, photo-free corporate presentation without fabricated team rosters or artificial profile cards."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#2563EB] dark:text-[#06B6D4]">
                  Executive Leadership
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
                  {profile.name}
                </h2>
                <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                  {profile.designation} · {profile.company}
                </p>
                <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">
                  {profile.supportingHeadline}
                </p>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {profile.supportingBiography}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-4">
                <Link to="/founder" className="text-sm font-medium text-[#2563EB] dark:text-[#06B6D4]">
                  View Executive Profile
                </Link>
                <a
                  href={profile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <span>{profile.email}</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Specialist Network
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text-primary)]">
                  Multidisciplinary Delivery Model
                </h2>
                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  Engagements are structured across full-stack engineering, UI/UX systems, cloud infrastructure, and quality assurance disciplines scaled transparently to project requirements.
                </p>
              </div>
              <Link
                to="/careers"
                className="mt-6 pt-4 border-t border-[var(--border-subtle)] inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4]"
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
            as="h1"
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
            as="h1"
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
