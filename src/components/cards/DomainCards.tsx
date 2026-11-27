import { useState, type MouseEvent } from 'react';
import {
  ArrowRight,
  Bot,
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

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPointer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <Link
      to={`/services/${service.slug}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPointer(null)}
      className="group relative overflow-hidden rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
    >
      {pointer && (
        <span
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(240px circle at ${pointer.x}px ${pointer.y}px, rgba(37, 99, 235, 0.08), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2">
          <div className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#2563EB] dark:text-[#06B6D4] transition-transform duration-200 group-hover:scale-105">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
          <span className="font-mono text-[11px] text-[var(--text-muted)]">
            {service.categoryLabel}
          </span>
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
          {service.name}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          {service.shortDescription}
        </p>
      </div>

      <span className="relative z-10 mt-5 pt-4 border-t border-[var(--border-subtle)] inline-flex items-center justify-between text-xs font-medium text-[#2563EB] dark:text-[#06B6D4]">
        <span>Learn More</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function IndustryCard({ industry }: { industry: IndustryItem }) {
  return (
    <Link
      to={`/industries/${industry.slug}`}
      className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
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
    <article className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-colors duration-200 hover:border-[var(--border-strong)]">
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

export function ProjectCard({ project }: { project: ProjectConcept }) {
  return (
    <Link
      to={`/case-studies/${project.slug}`}
      className="group rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between transition-all duration-200 hover:border-[#2563EB]/60 dark:hover:border-[#06B6D4]/60 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          <span>{project.category}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">
            {project.label}
          </span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
          {project.summary}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-4">
        <span className="font-mono text-[11px] text-[var(--text-muted)] truncate">
          {project.stack.slice(0, 3).join(' · ')}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2563EB] dark:text-[#06B6D4] shrink-0">
          <span>Inspect</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </span>
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
