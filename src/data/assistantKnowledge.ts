import { QUOTATION_LABELS } from '../config/currency';
import { getPublicServicePricing, getServiceDeliverables } from '../config/pricing';
import { SITE_CONFIG } from '../config/site';
import { DEVELOPMENT_PROCESS, GENERAL_FAQS, TECHNOLOGY_ECOSYSTEM } from './company';
import { INDUSTRIES_DATA } from './industries';
import { SERVICES_DATA } from './services';

export interface AssistantKnowledgeSummary {
  company: {
    name: string;
    positioning: string;
    tagline: string;
    founder: string;
    establishedYear: number;
    email: string;
    phone: string;
    whatsappUrl: string;
    headquarters: string;
    targetMarkets: string;
    suvrixaNote: string;
  };
  services: Array<{
    slug: string;
    name: string;
    categoryLabel: string;
    shortDescription: string;
    deliverables: string[];
    publicPriceDisplay: string;
    techStack: string[];
  }>;
  industries: Array<{ slug: string; name: string; shortDescription: string }>;
  processSteps: Array<{ step: string; title: string; summary: string }>;
  technologies: Array<{ name: string; role: string; category: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

/**
 * Single verified knowledge base synchronized with site config, 14 services,
 * 10 industries, process phases, and public-safe pricing rules.
 */
export function buildAssistantKnowledgeBase(): AssistantKnowledgeSummary {
  return {
    company: {
      name: SITE_CONFIG.companyName,
      positioning: SITE_CONFIG.positioning,
      tagline: SITE_CONFIG.tagline,
      founder: SITE_CONFIG.founderName,
      establishedYear: SITE_CONFIG.establishedYear,
      email: SITE_CONFIG.email,
      phone: SITE_CONFIG.phoneDisplay,
      whatsappUrl: SITE_CONFIG.whatsappHref,
      headquarters: SITE_CONFIG.headquarters,
      targetMarkets: SITE_CONFIG.targetMarkets,
      suvrixaNote: SITE_CONFIG.suvrixaNote,
    },
    services: SERVICES_DATA.map((service) => {
      const publicPricing = getPublicServicePricing(service.slug);
      return {
        slug: service.slug,
        name: service.name,
        categoryLabel: service.categoryLabel,
        shortDescription: service.shortDescription,
        deliverables: getServiceDeliverables(service.slug),
        publicPriceDisplay: publicPricing.isPublished
          ? `${publicPricing.displayPrice} ${publicPricing.billingSuffix}`.trim()
          : `${QUOTATION_LABELS.customPricing} (${QUOTATION_LABELS.requestQuote})`,
        techStack: service.techStack,
      };
    }),
    industries: INDUSTRIES_DATA.map((ind) => ({
      slug: ind.slug,
      name: ind.name,
      shortDescription: ind.shortDescription,
    })),
    processSteps: DEVELOPMENT_PROCESS.map((p) => ({
      step: p.step,
      title: p.title,
      summary: p.summary,
    })),
    technologies: TECHNOLOGY_ECOSYSTEM.map((t) => ({
      name: t.name,
      role: t.role,
      category: t.category,
    })),
    faqs: GENERAL_FAQS,
  };
}
