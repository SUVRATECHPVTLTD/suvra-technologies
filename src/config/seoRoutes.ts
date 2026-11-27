export interface SitemapRouteEntry {
  path: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
}

export const CORE_PUBLIC_ROUTES: SitemapRouteEntry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/industries', changefreq: 'monthly', priority: '0.8' },
  { path: '/products', changefreq: 'monthly', priority: '0.8' },
  { path: '/portfolio', changefreq: 'monthly', priority: '0.8' },
  { path: '/case-studies', changefreq: 'monthly', priority: '0.7' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/founder', changefreq: 'monthly', priority: '0.7' },
  { path: '/team', changefreq: 'monthly', priority: '0.6' },
  { path: '/careers', changefreq: 'monthly', priority: '0.6' },
  { path: '/locations', changefreq: 'monthly', priority: '0.7' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/start-a-project', changefreq: 'monthly', priority: '0.9' },
];

export const SERVICE_SLUGS = [
  'website-development',
  'mobile-app-development',
  'custom-software-development',
  'ecommerce-development',
  'ai-business-automation',
  'ai-chatbots-agents',
  'crm-erp-solutions',
  'ui-ux-design-branding',
  'digital-marketing',
  'seo-local-seo',
  'cloud-devops',
  'it-consulting',
  'api-development-integrations',
  'website-maintenance-support',
] as const;

export const INDUSTRY_SLUGS = [
  'education-edtech',
  'healthcare',
  'retail-ecommerce',
  'real-estate',
  'finance-fintech',
  'logistics-supply-chain',
  'manufacturing',
  'hospitality',
  'startups',
  'enterprises',
] as const;

export const LOCATION_SLUGS = [
  'muzaffarpur',
  'patna',
  'bihar',
  'india',
  'international-services',
] as const;

export const CASE_STUDY_SLUGS = [
  'cloudflare-edge-saas-blueprint',
  'grounded-intake-automation-concept',
  'regional-commerce-mobile-concept',
  'enterprise-corporate-web-system',
] as const;

export const BLOG_SLUGS = [
  'why-cloudflare-first-architecture-suits-growing-enterprises',
  'designing-backend-ready-frontends',
  'practical-guardrails-for-business-ai-automation',
  'accessible-dual-theme-design-systems',
] as const;

export function getAllSitemapRoutes(): SitemapRouteEntry[] {
  return [
    ...CORE_PUBLIC_ROUTES,
    ...SERVICE_SLUGS.map((slug) => ({
      path: `/services/${slug}`,
      changefreq: 'monthly' as const,
      priority: '0.8',
    })),
    ...INDUSTRY_SLUGS.map((slug) => ({
      path: `/industries/${slug}`,
      changefreq: 'monthly' as const,
      priority: '0.7',
    })),
    ...LOCATION_SLUGS.map((slug) => ({
      path: `/locations/${slug}`,
      changefreq: 'monthly' as const,
      priority: '0.7',
    })),
    ...CASE_STUDY_SLUGS.map((slug) => ({
      path: `/case-studies/${slug}`,
      changefreq: 'monthly' as const,
      priority: '0.6',
    })),
    ...BLOG_SLUGS.map((slug) => ({
      path: `/blog/${slug}`,
      changefreq: 'monthly' as const,
      priority: '0.7',
    })),
  ];
}

export function isNonIndexablePreviewOrigin(origin: string): boolean {
  if (!origin) return true;
  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname.endsWith('.run.app') ||
      hostname.endsWith('.pages.dev') ||
      hostname.endsWith('.workers.dev') ||
      hostname.endsWith('.invalid')
    );
  } catch {
    return true;
  }
}

export function buildRobotsTxt(siteOrigin: string, allowIndexing: boolean): string {
  const cleanOrigin = siteOrigin.replace(/\/$/, '');
  const canIndex = allowIndexing && Boolean(cleanOrigin) && !isNonIndexablePreviewOrigin(cleanOrigin);

  if (!canIndex) {
    return [
      '# Search engine indexing disabled for development, preview, and staging environments.',
      'User-agent: *',
      'Disallow: /',
      '',
    ].join('\n');
  }

  return [
    '# Production crawl directives for Suvra Technologies',
    'User-agent: *',
    'Allow: /',
    'Disallow: /privacy-policy',
    'Disallow: /terms-and-conditions',
    'Disallow: /cookie-policy',
    '',
    `Sitemap: ${cleanOrigin}/sitemap.xml`,
    '',
  ].join('\n');
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(siteOrigin: string, isPreview: boolean): string {
  const cleanOrigin = siteOrigin.replace(/\/$/, '');
  const urls = getAllSitemapRoutes()
    .map(
      (entry) =>
        `  <url>\n    <loc>${escapeXml(`${cleanOrigin}${entry.path}`)}</loc>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority}</priority>\n  </url>`
    )
    .join('\n');

  const comment = isPreview
    ? '<!-- Dynamic preview/staging sitemap generated without a production domain. Indexing remains disabled via robots.txt and noindex. -->'
    : '<!-- Dynamic production sitemap generated from src/config/seoRoutes.ts -->';

  return `<?xml version="1.0" encoding="UTF-8"?>\n${comment}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
