import { useState, type MouseEvent } from 'react';
import {
  ArrowRight,
  Bot,
  Check,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  Globe,
  Layers,
  Megaphone,
  Palette,
  Search,
  ShoppingCart,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPublicServicePricing, getServiceDeliverables } from '../../config/pricing';
import type {
  BlogArticle,
  IndustryItem,
  ProductDirection,
  ProjectConcept,
  ServiceItem,
} from '../../types/cms';

const SERVICE_ICON_MAP: Record<string, typeof Globe> = {
  'website-development': Globe,
  'mobile-app-development': Smartphone,
  'custom-software-development': Code2,
  'ecommerce-development': ShoppingCart,
  'api-development-integrations': Layers,
  'ai-business-automation': Cpu,
  'ai-chatbots-agents': Bot,
  'crm-erp-solutions': Database,
  'ui-ux-design-branding': Palette,
  'digital-marketing': Megaphone,
  'seo-local-seo': Search,
  'cloud-devops': Cloud,
  'it-consulting': Compass,
  'website-maintenance-support': Wrench,
};

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = SERVICE_ICON_MAP[service.slug] ?? Code2;
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const deliverables = getServiceDeliverables(service.slug);
  const pricing = getPublicServicePricing(service.slug);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPointer(null)}
      className="group relative w-full h-full overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/65 dark:hover:border-[#06B6D4]/65 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
    >
      {pointer && (
        <span
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(260px circle at ${pointer.x}px ${pointer.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#2563EB] dark:text-[#06B6D4] transition-transform duration-200 group-hover:scale-105 group-hover:border-[#2563EB]/40">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {service.categoryLabel}
          </span>
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
          <Link
            to={`/services/${service.slug}`}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] rounded-sm"
          >
            {service.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          {service.shortDescription}
        </p>

        {deliverables.length > 0 && (
          <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)]">
            <p className="font-mono text-[11px] font-medium text-[var(--text-muted)] mb-2">
              Key Deliverables
            </p>
            <ul className="space-y-1.5">
              {deliverables.slice(0, 3).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs sm:text-[13px] text-[var(--text-secondary)] leading-snug"
                >
                  <Check
                    className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#06B6D4] shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-5 pt-4 border-t border-[var(--border-subtle)]">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display text-sm font-semibold text-[var(--text-primary)] tabular-nums">
            {pricing.displayPrice}
          </p>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {pricing.billingSuffix}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <Link
            to={`/start-a-project?service=${encodeURIComponent(service.name)}`}
            className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            {pricing.ctaLabel}
          </Link>
          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4] hover:underline underline-offset-4 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] rounded-sm"
          >
            <span>Learn More</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function IndustryCard({ industry }: { industry: IndustryItem }) {
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className="group w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
    >
      <div>
        <p className="font-mono text-xs text-[var(--text-muted)]">Industry Focus</p>
        <h3 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
          {industry.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          {industry.shortDescription}
        </p>
      </div>
      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4]">
        <span>Explore Solutions</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function ProductCard({ product }: { product: ProductDirection }) {
  return (
    <article className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-colors duration-200 hover:border-[var(--border-strong)]">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          <span>{product.category}</span>
          <span aria-hidden="true">·</span>
          <span className="font-medium text-[#2563EB] dark:text-[#06B6D4]">{product.status}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-[var(--text-primary)]">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          {product.summary}
        </p>
      </div>

      <ul className="mt-5 pt-4 border-t border-[var(--border-subtle)] space-y-1.5 text-xs text-[var(--text-secondary)]">
        {product.focusAreas.map((area) => (
          <li key={area} className="flex items-baseline gap-2">
            <span className="font-mono text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true">—</span>
            <span>{area}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PortfolioSchematicVisual({ slug }: { slug: string }) {
  if (slug === 'cloudflare-edge-saas-blueprint') {
    return (
      <svg viewBox="0 0 360 112" className="w-full h-24" aria-hidden="true">
        <rect x="12" y="32" width="76" height="46" rx="8" className="fill-[var(--bg-surface)] stroke-[var(--border-strong)]" strokeWidth="1.2" />
        <text x="50" y="52" textAnchor="middle" fontSize="8.5" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-primary)]">TENANT</text>
        <text x="50" y="65" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-muted)]">RBAC Gate</text>

        <path d="M 88 55 L 128 55" className="stroke-[#2563EB] dark:stroke-[#06B6D4]" strokeWidth="1.6" strokeDasharray="4 4" />
        <rect x="128" y="24" width="96" height="62" rx="10" className="fill-[#071426] stroke-[#2563EB]" strokeWidth="1.4" />
        <text x="176" y="49" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="Space Grotesk, sans-serif" fill="#F8FAFC">EDGE API</text>
        <text x="176" y="64" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fill="#06B6D4">Hono · Workers</text>

        <path d="M 224 42 L 264 34 M 224 68 L 264 76" className="stroke-[#2563EB] dark:stroke-[#06B6D4]" strokeWidth="1.5" />
        <rect x="264" y="16" width="84" height="34" rx="7" className="fill-[var(--bg-surface)] stroke-[var(--border-strong)]" strokeWidth="1.2" />
        <text x="306" y="36" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-primary)]">D1 + Drizzle</text>
        <rect x="264" y="60" width="84" height="34" rx="7" className="fill-[var(--bg-surface)] stroke-[var(--border-strong)]" strokeWidth="1.2" />
        <text x="306" y="80" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-primary)]">R2 Signed URL</text>
      </svg>
    );
  }

  if (slug === 'grounded-intake-automation-concept') {
    return (
      <svg viewBox="0 0 360 112" className="w-full h-24" aria-hidden="true">
        <rect x="12" y="32" width="76" height="46" rx="8" className="fill-[var(--bg-surface)] stroke-[var(--border-strong)]" strokeWidth="1.2" />
        <text x="50" y="52" textAnchor="middle" fontSize="8.5" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-primary)]">INTAKE</text>
        <text x="50" y="65" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-muted)]">4-Step Brief</text>

        <path d="M 88 55 L 124 55" className="stroke-[#2563EB] dark:stroke-[#06B6D4]" strokeWidth="1.6" />
        <rect x="124" y="26" width="104" height="58" rx="10" className="fill-[#071426] stroke-[#06B6D4]" strokeWidth="1.4" />
        <text x="176" y="50" textAnchor="middle" fontSize="8.8" fontWeight="700" fontFamily="Space Grotesk, sans-serif" fill="#F8FAFC">AI TRIAGE</text>
        <text x="176" y="65" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fill="#06B6D4">JSON Schema Guard</text>

        <path d="M 228 55 L 264 55" className="stroke-[#2563EB] dark:stroke-[#06B6D4]" strokeWidth="1.6" strokeDasharray="4 4" />
        <rect x="264" y="28" width="84" height="54" rx="8" className="fill-[var(--bg-surface)] stroke-[#2563EB]/60" strokeWidth="1.2" />
        <text x="306" y="51" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" className="fill-[#2563EB] dark:fill-[#06B6D4]">HUMAN REVIEW</text>
        <text x="306" y="65" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-muted)]">CRM Handoff</text>
      </svg>
    );
  }

  if (slug === 'regional-commerce-mobile-concept') {
    return (
      <svg viewBox="0 0 360 112" className="w-full h-24" aria-hidden="true">
        <rect x="26" y="14" width="54" height="84" rx="10" className="fill-[var(--bg-surface)] stroke-[#2563EB]" strokeWidth="1.4" />
        <rect x="34" y="26" width="38" height="22" rx="4" className="fill-[var(--bg-elevated)] stroke-[var(--border-subtle)]" />
        <rect x="34" y="54" width="38" height="14" rx="3" className="fill-[#2563EB]/20" />
        <line x1="45" y1="86" x2="61" y2="86" className="stroke-[var(--border-strong)]" strokeWidth="2" strokeLinecap="round" />

        <path d="M 80 56 L 136 56" className="stroke-[#2563EB] dark:stroke-[#06B6D4]" strokeWidth="1.6" strokeDasharray="4 4" />
        <rect x="136" y="28" width="92" height="56" rx="9" className="fill-[#071426] stroke-[#2563EB]" strokeWidth="1.4" />
        <text x="182" y="52" textAnchor="middle" fontSize="8.8" fontWeight="700" fontFamily="Space Grotesk, sans-serif" fill="#F8FAFC">SYNC QUEUE</text>
        <text x="182" y="66" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fill="#06B6D4">ETag · Retry Safe</text>

        <path d="M 228 56 L 268 56" className="stroke-[#2563EB] dark:stroke-[#06B6D4]" strokeWidth="1.6" />
        <rect x="268" y="30" width="76" height="52" rx="8" className="fill-[var(--bg-surface)] stroke-[var(--border-strong)]" strokeWidth="1.2" />
        <text x="306" y="53" textAnchor="middle" fontSize="8" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-primary)]">R2 MEDIA</text>
        <text x="306" y="66" textAnchor="middle" fontSize="7.5" fontFamily="JetBrains Mono, monospace" className="fill-[var(--text-muted)]">Edge Storefront</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 360 112" className="w-full h-24" aria-hidden="true">
      <rect x="18" y="14" width="324" height="84" rx="10" className="fill-[var(--bg-surface)] stroke-[var(--border-strong)]" strokeWidth="1.2" />
      <rect x="28" y="22" width="304" height="14" rx="4" className="fill-[var(--bg-elevated)]" />
      <circle cx="38" cy="29" r="3" className="fill-[#2563EB]" />
      <rect x="48" y="26" width="52" height="6" rx="2" className="fill-[var(--border-strong)]" />
      <rect x="278" y="25" width="44" height="8" rx="3" className="fill-[#2563EB]" />

      <rect x="28" y="44" width="142" height="44" rx="6" className="fill-[#071426] stroke-[#2563EB]/60" strokeWidth="1.2" />
      <text x="40" y="63" fontSize="8.5" fontWeight="700" fontFamily="Space Grotesk, sans-serif" fill="#F8FAFC">14 SERVICE PILLARS</text>
      <text x="40" y="76" fontSize="7.5" fontFamily="JetBrains Mono, monospace" fill="#06B6D4">WCAG 2.2 · Dual Theme</text>

      <rect x="180" y="44" width="72" height="44" rx="6" className="fill-[var(--bg-elevated)] stroke-[var(--border-subtle)]" />
      <rect x="260" y="44" width="72" height="44" rx="6" className="fill-[var(--bg-elevated)] stroke-[var(--border-subtle)]" />
      <circle cx="216" cy="66" r="10" className="fill-none stroke-[#2563EB]" strokeWidth="1.4" />
      <circle cx="296" cy="66" r="10" className="fill-none stroke-[#06B6D4]" strokeWidth="1.4" strokeDasharray="3 3" />
    </svg>
  );
}

export function ProjectCard({ project }: { project: ProjectConcept }) {
  return (
    <Link
      to={`/case-studies/${project.slug}`}
      className="group w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
    >
      <div>
        <div className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 px-4 py-3 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.28] dark:opacity-[0.18]"
          />
          <div className="relative z-10">
            <PortfolioSchematicVisual slug={project.slug} />
          </div>
        </div>

        <div className="p-6 pb-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
              {project.label}
            </span>
          </div>
          <h3 className="mt-2.5 font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="p-6 pt-5">
        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-[var(--text-muted)] truncate">
            {project.stack.slice(0, 3).join(' · ')}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4] shrink-0">
            <span>Inspect</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
    >
      <div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{article.readTime}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          {article.summary}
        </p>
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4]">
        <span>Read Article</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
