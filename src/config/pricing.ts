import type { ServicePublicPricing, ServicePricingConfig, ServicePricingType } from '../types/pricing';
import { CURRENCY_CONFIG, formatINR, QUOTATION_LABELS } from './currency';

/**
 * Centralized, independent service pricing configuration prepared for future Admin Dashboard sync.
 *
 * IMPORTANT — PRICE APPROVAL POLICY:
 * All proposed numerical amounts below represent unapproved internal discussion placeholders.
 * `isPublished` MUST remain `false` and `pricingStatus` MUST remain `'internal_draft'` or `'unpublished'`
 * until explicit commercial approval is granted by Suvra Technologies leadership.
 */
export const SERVICE_PRICING_CONFIG: Readonly<Record<string, ServicePricingConfig>> = {
  'website-development': {
    serviceId: 'website-development',
    pricingType: 'starting_price',
    startingPrice: 15000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Custom responsive website design',
      'Professional UI/UX',
      'Technical SEO foundations',
      'Performance optimization',
      'Scalable website architecture',
    ],
    exclusions: ['Domain registration & paid third-party SaaS licenses', 'Commercial photography/video shoots'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'mobile-app-development': {
    serviceId: 'mobile-app-development',
    pricingType: 'starting_price',
    startingPrice: 60000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Android and iOS application development',
      'Custom application interfaces',
      'API integration',
      'Responsive mobile experiences',
      'Application deployment assistance',
    ],
    exclusions: ['Apple Developer / Google Play store enrollment fees', 'Dedicated cloud backend hosting'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'custom-software-development': {
    serviceId: 'custom-software-development',
    pricingType: 'starting_price',
    startingPrice: 75000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Custom business software',
      'Business dashboards',
      'Database and API architecture',
      'Workflow integration',
      'Scalable modular systems',
    ],
    exclusions: ['Legacy hardware procurement', 'Third-party commercial ERP licensing'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'ecommerce-development': {
    serviceId: 'ecommerce-development',
    pricingType: 'starting_price',
    startingPrice: 30000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Structured product catalog & filtering',
      'Responsive storefront UI/UX',
      'Cart & checkout workflow',
      'Payment gateway API readiness',
      'Order & inventory tracking foundation',
    ],
    exclusions: ['Merchant gateway transaction fees', 'Bulk SKU photography & copywriting'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'ai-business-automation': {
    serviceId: 'ai-business-automation',
    pricingType: 'starting_price',
    startingPrice: 25000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'AI-powered workflow integration',
      'Intelligent business automation',
      'Repetitive task optimization',
      'CRM and communication integrations',
      'Custom automation solutions',
    ],
    exclusions: ['Paid external LLM token consumption beyond free tiers', 'Paid third-party SaaS connectors'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'ai-chatbots-agents': {
    serviceId: 'ai-chatbots-agents',
    pricingType: 'starting_price',
    startingPrice: 20000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Custom branded chat assistant UI',
      'Grounded company knowledge base',
      'Deterministic FAQ & fallback routing',
      'WhatsApp & enquiry form handoff',
      'Guardrails & rate-limit safeguards',
    ],
    exclusions: ['Paid AI gateway subscriptions', 'WhatsApp Business API per-message charges'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'crm-erp-solutions': {
    serviceId: 'crm-erp-solutions',
    pricingType: 'starting_price',
    startingPrice: 50000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Customer & lead pipeline management',
      'Role-based access permissions',
      'Inventory, order & billing trackers',
      'Structured tabular reporting & CSV exports',
      'Relational database schema & API hooks',
    ],
    exclusions: ['Historical paper archive digitization', 'On-premise physical server hardware'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'ui-ux-design-branding': {
    serviceId: 'ui-ux-design-branding',
    pricingType: 'starting_price',
    startingPrice: 10000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Visual identity & design token system',
      'Light & dark mode interface guidelines',
      'Responsive web & mobile wireframes',
      'Interactive UI state specifications',
      'WCAG 2.2 AA contrast verification',
    ],
    exclusions: ['Offset print production', 'Paid stock font licensing unless requested'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'digital-marketing': {
    serviceId: 'digital-marketing',
    pricingType: 'monthly_retainer',
    startingPrice: 10000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'monthly',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Digital marketing strategy',
      'Campaign management',
      'Social media strategy',
      'Performance monitoring',
      'Analytics and reporting',
    ],
    exclusions: ['Direct paid media spend on ad platforms', 'Physical event sponsorship costs'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'seo-local-seo': {
    serviceId: 'seo-local-seo',
    pricingType: 'monthly_retainer',
    startingPrice: 8000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'monthly',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Technical SEO',
      'On-page optimization',
      'Local search visibility',
      'Keyword strategy',
      'Search performance analysis',
    ],
    exclusions: ['Paid search ad budgets', 'Third-party PR wire fees'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'cloud-devops': {
    serviceId: 'cloud-devops',
    pricingType: 'custom_quotation',
    startingPrice: null,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'custom',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Cloudflare Pages, Workers & R2 setup',
      'Automated CI/CD build & deploy checks',
      'WAF, Turnstile & Zero Trust boundaries',
      'Tunnel-shielded backend topology',
      'Backup & rollback documentation',
    ],
    exclusions: ['Paid cloud provider usage invoices', 'Physical co-location hosting'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'it-consulting': {
    serviceId: 'it-consulting',
    pricingType: 'custom_quotation',
    startingPrice: null,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'custom',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Architecture & codebase audit',
      'Build-vs-buy & stack evaluation',
      'Cloud unit-cost & risk assessment',
      'Security & scalability review',
      'Phased technical execution roadmap',
    ],
    exclusions: ['Full software implementation (scoped separately)', 'Legal compliance certification'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'api-development-integrations': {
    serviceId: 'api-development-integrations',
    pricingType: 'starting_price',
    startingPrice: 10000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'one_time',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Typed REST & Hono edge APIs',
      'Signed webhook consumers & dispatchers',
      'Schema validation & rate-limit guards',
      'CRM, payment & messaging connectors',
      'API contract documentation',
    ],
    exclusions: ['Paid third-party API subscription tiers', 'Legacy ERP vendor customization fees'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
  'website-maintenance-support': {
    serviceId: 'website-maintenance-support',
    pricingType: 'monthly_retainer',
    startingPrice: 3000,
    currency: CURRENCY_CONFIG.code,
    billingInterval: 'monthly',
    pricingStatus: 'internal_draft',
    estimatedDuration: null,
    includedDeliverables: [
      'Scheduled dependency & security updates',
      'Uptime & metadata integrity monitoring',
      'Staging verification before deployment',
      'Minor UI & content updates',
      'Backup & incident recovery readiness',
    ],
    exclusions: ['Major new product module builds', 'Dedicated 24/7 phone call center'],
    lastUpdated: '2026-11-27',
    isPublished: false,
  },
};

const PRICING_TYPE_LABELS: Record<ServicePricingType, string> = {
  starting_price: 'Scope-Based Quotation',
  fixed_project: 'Fixed Project Scope',
  monthly_retainer: 'Monthly Engagement',
  annual_maintenance: 'Annual Support Plan',
  custom_quotation: 'Custom Quotation',
  unpublished: 'Quotation Basis',
};

export function getServicePricingConfig(serviceId: string): ServicePricingConfig | undefined {
  return SERVICE_PRICING_CONFIG[serviceId];
}

export function getServiceDeliverables(serviceId: string): string[] {
  return SERVICE_PRICING_CONFIG[serviceId]?.includedDeliverables ?? [];
}

/**
 * Returns public-safe pricing metadata.
 * Never exposes unpublished draft figures on any public surface.
 */
export function getPublicServicePricing(serviceId: string): ServicePublicPricing {
  const config = SERVICE_PRICING_CONFIG[serviceId];

  if (!config) {
    return {
      serviceId,
      isPublished: false,
      pricingTypeLabel: 'Quotation Basis',
      displayPrice: QUOTATION_LABELS.customPricing,
      billingSuffix: `${CURRENCY_CONFIG.code} (${CURRENCY_CONFIG.symbol})`,
      ctaLabel: QUOTATION_LABELS.requestQuote,
      estimatedDuration: null,
      approvalNotice: QUOTATION_LABELS.discoveryNote,
    };
  }

  const isApprovedAndPublished =
    config.isPublished &&
    config.pricingStatus === 'approved' &&
    typeof config.startingPrice === 'number' &&
    config.startingPrice > 0;

  if (!isApprovedAndPublished) {
    return {
      serviceId,
      isPublished: false,
      pricingTypeLabel:
        config.pricingType === 'monthly_retainer'
          ? 'Retainer / Custom Scope'
          : PRICING_TYPE_LABELS[config.pricingType],
      displayPrice: QUOTATION_LABELS.customPricing,
      billingSuffix: `${CURRENCY_CONFIG.code} (${CURRENCY_CONFIG.symbol})`,
      ctaLabel: QUOTATION_LABELS.requestQuote,
      estimatedDuration: null,
      approvalNotice: QUOTATION_LABELS.discoveryNote,
    };
  }

  const formattedAmount = formatINR(config.startingPrice as number);
  const billingSuffix =
    config.billingInterval === 'monthly'
      ? '/ month'
      : config.billingInterval === 'annual'
        ? '/ year'
        : 'starting';

  return {
    serviceId,
    isPublished: true,
    pricingTypeLabel: PRICING_TYPE_LABELS[config.pricingType],
    displayPrice:
      config.pricingType === 'starting_price' ? `Starting ${formattedAmount}` : formattedAmount,
    billingSuffix,
    ctaLabel: 'Request Proposal',
    estimatedDuration: config.estimatedDuration,
    approvalNotice: `Indicative commercial rate in ${CURRENCY_CONFIG.code} (${CURRENCY_CONFIG.symbol}). Final scope confirmed after technical discovery.`,
  };
}
