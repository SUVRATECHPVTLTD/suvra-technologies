export type ServiceCategoryId = 'engineering' | 'intelligence' | 'digital' | 'infrastructure';

export type DiagramKind =
  | 'website'
  | 'mobile'
  | 'custom-software'
  | 'ecommerce'
  | 'ai-automation'
  | 'ai-agents'
  | 'crm-erp'
  | 'ui-ux'
  | 'digital-marketing'
  | 'seo'
  | 'cloud-devops'
  | 'it-consulting'
  | 'api-integrations'
  | 'maintenance';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug: string;
  name: string;
  category: ServiceCategoryId;
  categoryLabel: string;
  shortDescription: string;
  heroSummary: string;
  overview: string;
  challenges: string[];
  approach: string[];
  capabilities: string[];
  benefits: string[];
  methodology: { step: string; detail: string }[];
  techStack: string[];
  diagramKind: DiagramKind;
  diagramCaption: string;
  relatedSlugs: string[];
  faqs: FAQItem[];
}

export interface IndustryItem {
  slug: string;
  name: string;
  shortDescription: string;
  sectorContext: string;
  challenges: string[];
  solutions: string[];
  recommendedServices: string[];
  complianceFocus: string;
}

export interface ProductDirection {
  id: string;
  category: string;
  title: string;
  status: 'Concept & Research' | 'Architecture Phase' | 'Planned Initiative';
  summary: string;
  focusAreas: string[];
}

export interface ProjectConcept {
  slug: string;
  title: string;
  category: 'Web Platforms' | 'AI & Automation' | 'Enterprise Systems' | 'Mobile & SaaS';
  label: 'Concept Demonstration' | 'Architecture Blueprint';
  summary: string;
  challenge: string;
  approach: string;
  implementation: string[];
  intendedOutcomes: string[];
  stack: string[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  category: 'Architecture' | 'AI & Automation' | 'Product Engineering' | 'Cloud Strategy';
  readTime: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
  relatedSlugs: string[];
}

export interface LocationCoverage {
  slug: string;
  name: string;
  regionType: 'Headquarters Region' | 'State Coverage' | 'National Coverage' | 'Global Coverage';
  headline: string;
  summary: string;
  officeNotice: string;
  priorities: string[];
  recommendedServices: string[];
}

export interface CareerRole {
  id: string;
  title: string;
  type: string;
  status: string;
  summary: string;
}

export interface EnquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  services: string[];
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  consent: boolean;
}

export interface ApiResult<T> {
  ok: boolean;
  source: 'local-fixture' | 'cloudflare-worker';
  data: T;
  message?: string;
}
