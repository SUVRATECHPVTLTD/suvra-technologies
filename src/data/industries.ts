import type { IndustryItem } from '../types/cms';

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    slug: 'education-edtech',
    name: 'Education & EdTech',
    shortDescription:
      'Accessible learning portals, student assessment systems, and institutional administration platforms engineered for high-concurrency access.',
    sectorContext:
      'Educational institutions and learning platforms serve students across wide ranges of devices, bandwidth conditions, and accessibility needs.',
    challenges: [
      'Heavy portals failing to load reliably on budget Android phones or low-bandwidth regional connections.',
      'Fragmented admissions, attendance, fee tracking, and student communication tools.',
      'Poor accessibility for screen readers and keyboard-only learners.',
    ],
    solutions: [
      'Lightweight, responsive web and mobile learning interfaces with offline-tolerant study workflows.',
      'Unified administrative dashboards connecting admissions, cohorts, and structured reporting.',
      'WCAG 2.2 AA aligned typography, contrast, and keyboard navigation.',
    ],
    recommendedServices: ['website-development', 'mobile-app-development', 'custom-software-development'],
    complianceFocus: 'Role-scoped student data protection and strict parent/faculty access boundaries.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    shortDescription:
      'Patient intake portals, appointment scheduling interfaces, and clinical operations software built with strict data-handling discipline.',
    sectorContext:
      'Healthcare providers require dependable, distraction-free software where clarity prevents scheduling errors and protects patient privacy.',
    challenges: [
      'Confusing appointment booking workflows that increase phone desk congestion.',
      'Sensitive patient or diagnostic records stored across disconnected spreadsheets or insecure forms.',
      'Unreliable communication between clinic reception, practitioners, and patients.',
    ],
    solutions: [
      'Clear multi-step patient scheduling and digital intake portals.',
      'Role-governed clinic CRM/workflow tools with explicit server-side access enforcement.',
      'Encrypted API bridges connecting notifications, lab updates, and reception desks.',
    ],
    recommendedServices: ['custom-software-development', 'ui-ux-design-branding', 'api-development-integrations'],
    complianceFocus: 'Least-privilege access controls, encrypted transport, and minimization of client-side sensitive state.',
  },
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    shortDescription:
      'High-speed storefronts, omnichannel catalog tooling, and automated order synchronization built for modern retail.',
    sectorContext:
      'Retailers competing online must deliver instant mobile catalog browsing alongside accurate stock and dispatch coordination.',
    challenges: [
      'Slow catalog pages and confusing mobile checkout steps causing cart abandonment.',
      'Manual reconciliation between online storefront orders and warehouse stock counts.',
      'Rising image delivery bandwidth costs as product catalogs expand.',
    ],
    solutions: [
      'Edge-cached storefronts with fast faceted search and clean mobile checkout flows.',
      'Idempotent payment webhook pipelines and automated inventory sync APIs.',
      'Zero-egress Cloudflare R2 media delivery for high-resolution product catalogs.',
    ],
    recommendedServices: ['ecommerce-development', 'seo-local-seo', 'digital-marketing'],
    complianceFocus: 'Signed payment webhook verification and clean customer order privacy controls.',
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    shortDescription:
      'Property discovery portals, interactive listing filters, and lead-management CRMs tailored for developers and brokerages.',
    sectorContext:
      'Property buyers expect effortless visual exploration, accurate location filtering, and prompt follow-up from sales teams.',
    challenges: [
      'Cluttered property websites where high-resolution galleries stall on mobile devices.',
      'Unstructured enquiry leads lost across spreadsheets and personal messaging apps.',
      'Poor local search visibility for neighborhood and project-specific queries.',
    ],
    solutions: [
      'Fast, edge-delivered property showcase platforms with structured map/filter attributes.',
      'Integrated lead routing CRM capturing project interest, budget band, and follow-up status.',
      'Clean regional SEO architecture targeting city and corridor search intent.',
    ],
    recommendedServices: ['website-development', 'crm-erp-solutions', 'seo-local-seo'],
    complianceFocus: 'Validated lead capture with bot protection and transparent property disclosure layouts.',
  },
  {
    slug: 'finance-fintech',
    name: 'Finance & FinTech',
    shortDescription:
      'Precision dashboards, structured onboarding workflows, and security-hardened API architectures for financial operations.',
    sectorContext:
      'Financial services demand extreme clarity in tabular numbers, zero-ambiguity form validation, and rigorous perimeter security.',
    challenges: [
      'Opaque multi-step onboarding forms with unclear validation or drop-off points.',
      'Unaligned data tables and inconsistent formatting across financial reporting tools.',
      'Insecure API endpoints or exposed operational consoles.',
    ],
    solutions: [
      'Accessible multi-step onboarding interfaces with deterministic validation and tabular precision.',
      'Zero-Trust protected internal operations consoles and audit-logged workflows.',
      'Contract-first APIs enforcing idempotency keys and strict input schemas.',
    ],
    recommendedServices: ['custom-software-development', 'api-development-integrations', 'cloud-devops'],
    complianceFocus: 'Zero client-side secret exposure, strict CSP/TLS headers, and auditable state mutations.',
  },
  {
    slug: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    shortDescription:
      'Shipment tracking portals, fleet coordination dashboards, and mobile field applications built for operational reliability.',
    sectorContext:
      'Logistics teams operate in dynamic environments where dispatchers and field personnel need accurate status updates on any connection.',
    challenges: [
      'Delayed visibility into consignment checkpoints across regional hubs.',
      'Field delivery apps failing when drivers move through low-connectivity zones.',
      'Manual data re-entry between booking portals, manifests, and billing sheets.',
    ],
    solutions: [
      'Offline-tolerant mobile field apps with queued status synchronization.',
      'Centralized dispatch and exception-tracking admin consoles.',
      'Automated API integrations linking manifest generation, notifications, and invoicing.',
    ],
    recommendedServices: ['mobile-app-development', 'crm-erp-solutions', 'api-development-integrations'],
    complianceFocus: 'Tamper-evident status timestamps and resilient webhook retry handling.',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    shortDescription:
      'B2B industrial portals, distributor order systems, and production-planning ERP tools replacing manual spreadsheets.',
    sectorContext:
      'Manufacturers need reliable B2B digital presence for international buyers alongside streamlined internal procurement and production tracking.',
    challenges: [
      'Outdated B2B websites that fail to communicate technical capabilities to international buyers.',
      'Fragmented tracking across raw material procurement, work orders, and dealer dispatches.',
      'Manual quote generation slowing down commercial response times.',
    ],
    solutions: [
      'Clean international B2B websites featuring technical spec sheets and structured RFQ intake.',
      'Custom ERP modules tracking inventory thresholds, batch orders, and dealer portals.',
      'Automated quote summary generation and CRM follow-up workflows.',
    ],
    recommendedServices: ['crm-erp-solutions', 'website-development', 'ai-business-automation'],
    complianceFocus: 'Role-isolated distributor portals and documented operational audit logs.',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality',
    shortDescription:
      'Direct-booking digital experiences, property showcase sites, and guest request automation designed for speed and warmth.',
    sectorContext:
      'Hospitality brands depend on atmospheric visual presentation paired with effortless mobile reservation and guest enquiry flows.',
    challenges: [
      'Over-reliance on third-party aggregators due to slow or unconvincing direct websites.',
      'Delayed responses to group booking, event, and concierge enquiries.',
      'Poor local search presence for travelers researching regional stays.',
    ],
    solutions: [
      'Fast, mobile-first direct showcase and reservation enquiry platforms.',
      'Automated guest enquiry routing and guided conversational assistants.',
      'Structured local SEO and schema markup for property discovery.',
    ],
    recommendedServices: ['website-development', 'ai-chatbots-agents', 'seo-local-seo'],
    complianceFocus: 'Transparent rate/policy presentation and privacy-conscious guest enquiry handling.',
  },
  {
    slug: 'startups',
    name: 'Startups',
    shortDescription:
      'Pragmatic MVP engineering, SaaS foundations, and cost-efficient Cloudflare-first architectures built to scale without rewrites.',
    sectorContext:
      'Early-stage teams must validate market fit quickly without accumulating brittle code or runaway cloud infrastructure bills.',
    challenges: [
      'Over-engineered cloud clusters burning runway before product-market fit.',
      'Throwaway prototypes that must be completely rewritten once real users arrive.',
      'Inconsistent UX across landing pages, web apps, and mobile roadmaps.',
    ],
    solutions: [
      'Lean TypeScript MVPs hosted on Cloudflare Pages, Workers, and D1 with minimal fixed cost.',
      'Clean modular domain architecture ready to expand into multi-tenant SaaS or mobile.',
      'Cohesive brand and UI systems that establish immediate credibility.',
    ],
    recommendedServices: ['custom-software-development', 'ui-ux-design-branding', 'it-consulting'],
    complianceFocus: 'Clean IP repository hygiene, strict environment secret separation, and documented ADRs.',
  },
  {
    slug: 'enterprises',
    name: 'Enterprises',
    shortDescription:
      'Complex system integrations, Zero-Trust internal portals, AI workflow automation, and long-term architectural modernization.',
    sectorContext:
      'Established organizations require disciplined engineering partners capable of integrating across legacy systems, security teams, and global markets.',
    challenges: [
      'Siloed departmental systems requiring manual data reconciliation.',
      'Aging web portals with accessibility gaps and high maintenance costs.',
      'Adopting AI automation safely within corporate governance boundaries.',
    ],
    solutions: [
      'Contract-first API integration layers bridging legacy databases and modern interfaces.',
      'Cloudflare Zero Trust access gateways and audited operational consoles.',
      'Scoped, human-in-the-loop AI workflows with strict schema validation.',
    ],
    recommendedServices: ['it-consulting', 'api-development-integrations', 'cloud-devops'],
    complianceFocus: 'Zero-Trust perimeter enforcement, WCAG 2.2 AA accessibility, and formal change documentation.',
  },
];

export function getIndustryBySlug(slug: string): IndustryItem | undefined {
  return INDUSTRIES_DATA.find((industry) => industry.slug === slug);
}
