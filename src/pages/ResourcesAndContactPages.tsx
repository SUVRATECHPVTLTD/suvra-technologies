import { useEffect, useState } from 'react';
import { ArrowLeft, ExternalLink, Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BlogCard } from '../components/cards/DomainCards';
import { MultiStepEnquiryForm } from '../components/forms/MultiStepEnquiryForm';
import { ContactCTA } from '../components/home/ProofAndConversion';
import { BrandSymbol } from '../components/ui/BrandMark';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Container, SectionHeader } from '../components/ui/Container';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { AnimatedHeading } from '../components/ui/MotionPrimitives';
import { SeoHead } from '../components/ui/SeoHead';
import { SITE_CONFIG } from '../config/site';
import { BLOG_ARTICLES, GENERAL_FAQS, getArticleBySlug } from '../data/company';
import type { BlogArticle } from '../types/cms';

const BLOG_CATEGORIES: Array<'All' | BlogArticle['category']> = [
  'All',
  'Architecture',
  'Cloud Strategy',
  'AI & Automation',
  'Product Engineering',
];

export function BlogIndexPage() {
  const [cat, setCat] = useState<(typeof BLOG_CATEGORIES)[number]>('All');
  const visible = cat === 'All' ? BLOG_ARTICLES : BLOG_ARTICLES.filter((a) => a.category === cat);

  return (
    <>
      <SeoHead
        title="Technology Insights"
        description="Engineering articles and architectural notes from Suvra Technologies."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container>
          <Breadcrumbs items={[{ label: 'Insights' }]} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Technology Insights"
            title="Engineering notes and systems thinking."
            description="Original technical perspectives authored without fabricated case metrics or external guest hype."
          />

          <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter articles">
            {BLOG_CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={cat === item}
                onClick={() => setCat(item)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
                  cat === item
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'bg-[var(--bg-surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.max(0, Math.round((window.scrollY / docHeight) * 100))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!article) {
    return <NotFoundPage />;
  }

  const related = article.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <>
      <SeoHead
        title={article.title}
        description={article.summary}
        ogType="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.summary,
          articleSection: article.category,
          author: {
            '@type': 'Organization',
            name: SITE_CONFIG.companyName,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.companyName,
          },
        }}
      />

      <div
        aria-hidden="true"
        className="fixed top-14 sm:top-16 left-0 right-0 z-30 h-0.5 bg-transparent"
      >
        <div
          className="h-full bg-[#2563EB] dark:bg-[#06B6D4] transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Insights', to: '/blog' },
              { label: article.title },
            ]}
          />

          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{article.readTime}</span>
          </div>

          <AnimatedHeading
            as="h1"
            className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]"
          >
            {article.title}
          </AnimatedHeading>

          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            {article.summary}
          </p>

          <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)]">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                  {section.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-14 pt-10 border-t border-[var(--border-subtle)]">
              <h2 className="font-display text-xl font-bold text-[var(--text-primary)] mb-5">
                Related Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {related.map((item) => (
                  <BlogCard key={item.slug} article={item} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>
      <ContactCTA />
    </>
  );
}

export function FaqPage() {
  return (
    <>
      <SeoHead
        title="Frequently Asked Questions"
        description="Answers to common questions about Suvra Technologies services, process, mobile apps, and ongoing support."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: GENERAL_FAQS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="max-w-4xl">
          <Breadcrumbs items={[{ label: 'FAQ' }]} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="FAQ"
            title="Frequently asked questions."
            description="Straightforward information on how we collaborate, scope projects, and maintain delivered systems."
          />
          <div className="mt-10">
            <FAQAccordion items={GENERAL_FAQS} />
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <SeoHead
        title="Contact Us"
        description="Reach Suvra Technologies via email, phone, WhatsApp, or visit our Muzaffarpur headquarters details."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="space-y-12">
          <Breadcrumbs items={[{ label: 'Contact' }]} />

          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Direct Channels"
            title="Connect with Suvra Technologies."
            description="Reach us directly using our verified channels below, or switch to the guided project intake form to scope requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 hover:border-[#2563EB]/60 transition-colors"
            >
              <Mail className="w-5 h-5 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
              <p className="mt-4 font-display text-base font-semibold text-[var(--text-primary)]">Official Email</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)] break-all">{SITE_CONFIG.email}</p>
            </a>

            <a
              href={SITE_CONFIG.phoneHref}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 hover:border-[#2563EB]/60 transition-colors"
            >
              <Phone className="w-5 h-5 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
              <p className="mt-4 font-display text-base font-semibold text-[var(--text-primary)]">Phone</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{SITE_CONFIG.phoneDisplay}</p>
            </a>

            <a
              href={SITE_CONFIG.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 hover:border-[#2563EB]/60 transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-[#06B6D4]" aria-hidden="true" />
              <p className="mt-4 font-display text-base font-semibold text-[var(--text-primary)]">Business WhatsApp</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{SITE_CONFIG.phoneDisplay}</p>
            </a>

            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6">
              <MapPin className="w-5 h-5 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
              <p className="mt-4 font-display text-base font-semibold text-[var(--text-primary)]">Headquarters</p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{SITE_CONFIG.headquarters}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
            <div className="lg:col-span-4 space-y-4">
              <h2 className="font-display text-2xl font-bold text-[var(--text-primary)]">
                Quick Project Enquiry
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Complete the structured intake wizard to generate a clean email or WhatsApp brief ready to send to our engineering leadership.
              </p>
              <a
                href={SITE_CONFIG.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] dark:text-[#06B6D4]"
              >
                <span>Founder on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
            <div className="lg:col-span-8">
              <MultiStepEnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function StartProjectPage() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('service') || undefined;

  return (
    <>
      <SeoHead
        title="Start a Project"
        description="Scope your website, mobile app, custom software, AI automation, or cloud engineering project with Suvra Technologies."
      />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="max-w-4xl">
          <Breadcrumbs items={[{ label: 'Start a Project' }]} />
          <SectionHeader
            as="h1"
            align="left"
            eyebrow="Guided Intake"
            title="Start a Project with Suvra Technologies."
            description="Walk through four concise steps to organize your services, requirements, optional budget/timeline, and direct handoff draft."
          />
          <div className="mt-10">
            <MultiStepEnquiryForm preselectedService={preselected} />
          </div>
        </Container>
      </section>
    </>
  );
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' | 'cookies' }) {
  const meta = {
    privacy: {
      title: 'Privacy Policy (Draft)',
      desc: 'Draft privacy practices for Suvra Technologies pending formal legal review.',
      sections: [
        {
          heading: '1. Draft Status Notice',
          text: 'This Privacy Policy is a structured template draft prepared for Suvra Technologies and requires formal legal review prior to commercial publication.',
        },
        {
          heading: '2. Enquiry & Communication Data',
          text: 'During this frontend preview phase, project enquiry inputs remain in client memory for email or WhatsApp drafting and are not persisted in browser local storage or remote databases.',
        },
        {
          heading: '3. Contact for Privacy Questions',
          text: `Questions regarding data handling can be directed to ${SITE_CONFIG.email} or ${SITE_CONFIG.headquarters}.`,
        },
      ],
    },
    terms: {
      title: 'Terms & Conditions (Draft)',
      desc: 'Draft terms of website usage for Suvra Technologies pending legal review.',
      sections: [
        {
          heading: '1. Draft Status Notice',
          text: 'These Terms & Conditions represent a provisional website draft pending formal legal review and jurisdiction specification prior to full commercial operations.',
        },
        {
          heading: '2. Informational Scope',
          text: 'Service descriptions, conceptual diagrams, and architectural blueprints on this site are informational and do not constitute a binding service agreement until mutually executed in writing.',
        },
      ],
    },
    cookies: {
      title: 'Cookie Policy (Draft)',
      desc: 'Draft cookie and browser storage notice for Suvra Technologies.',
      sections: [
        {
          heading: '1. Draft Status Notice',
          text: 'This Cookie Policy is a provisional draft requiring legal review before production indexing.',
        },
        {
          heading: '2. Essential Preferences Only',
          text: 'This website stores only your optional Light/Dark theme preference in browser storage (key: suvra-theme). No third-party advertising trackers or personal enquiry data are stored in local storage.',
        },
      ],
    },
  }[kind];

  return (
    <>
      <SeoHead title={meta.title} description={meta.desc} noIndex />
      <section className="py-14 sm:py-20 bg-[var(--bg-canvas)]">
        <Container className="max-w-3xl">
          <Breadcrumbs items={[{ label: meta.title }]} />
          <div className="rounded-xl border border-amber-400/50 bg-amber-50/70 dark:bg-amber-950/30 p-4 mb-8 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
            <strong>Legal Draft Notice:</strong> This policy text is a placeholder draft requiring formal legal review prior to commercial publication.
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
            {meta.title}
          </h1>
          <div className="mt-8 space-y-6">
            {meta.sections.map((sec) => (
              <div key={sec.heading} className="border-t border-[var(--border-subtle)] pt-5">
                <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  {sec.heading}
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">{sec.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="Page Not Found (404)"
        description="The requested route could not be found on Suvra Technologies."
        noIndex
      />
      <section className="py-24 bg-[var(--bg-canvas)]">
        <Container className="max-w-2xl text-center">
          <BrandSymbol className="h-12 mx-auto mb-5" />
          <p className="font-mono text-sm text-[#2563EB] dark:text-[#06B6D4]">HTTP 404</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
            Page not found
          </h1>
          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed">
            The route you requested does not exist or may have moved. Use the links below to return home or explore our services.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Return Home</span>
            </Link>
            <Link
              to="/services"
              className="px-5 py-3 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors"
            >
              Browse Services
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
