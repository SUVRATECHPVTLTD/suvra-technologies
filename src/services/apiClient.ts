import { SITE_CONFIG } from '../config/site';
import {
  BLOG_ARTICLES,
  CAREERS_ROLES,
  CONCEPT_PROJECTS,
  GENERAL_FAQS,
  LOCATIONS_DATA,
  PRODUCT_DIRECTIONS,
} from '../data/company';
import { INDUSTRIES_DATA, getIndustryBySlug } from '../data/industries';
import { SERVICES_DATA, getServiceBySlug } from '../data/services';
import type {
  ApiResult,
  BlogArticle,
  CareerRole,
  EnquiryPayload,
  FAQItem,
  IndustryItem,
  LocationCoverage,
  ProductDirection,
  ProjectConcept,
  ServiceItem,
} from '../types/cms';

/**
 * Backend-ready API client abstraction prepared for future Cloudflare Workers + Hono + D1 integration.
 * During this frontend phase, read operations resolve from typed local fixtures and enquiry submissions
 * operate strictly in validated preview mode without storing personal data in browser storage.
 */
const API_BASE_URL =
  typeof import.meta !== 'undefined' && import.meta.env
    ? ((import.meta.env.VITE_API_BASE_URL as string | undefined) || '')
    : '';

export interface EnquirySubmissionResponse {
  mode: 'preview-draft' | 'submitted';
  referenceCode: string;
  timestampIso: string;
  notice: string;
}

export const suvraApi = {
  isRemoteApiConfigured(): boolean {
    return Boolean(API_BASE_URL);
  },

  getSiteConfig(): ApiResult<typeof SITE_CONFIG> {
    return { ok: true, source: 'local-fixture', data: SITE_CONFIG };
  },

  getServices(): ApiResult<ServiceItem[]> {
    return { ok: true, source: 'local-fixture', data: SERVICES_DATA };
  },

  getServiceBySlug(slug: string): ApiResult<ServiceItem | null> {
    return { ok: true, source: 'local-fixture', data: getServiceBySlug(slug) ?? null };
  },

  getIndustries(): ApiResult<IndustryItem[]> {
    return { ok: true, source: 'local-fixture', data: INDUSTRIES_DATA };
  },

  getIndustryBySlug(slug: string): ApiResult<IndustryItem | null> {
    return { ok: true, source: 'local-fixture', data: getIndustryBySlug(slug) ?? null };
  },

  getProducts(): ApiResult<ProductDirection[]> {
    return { ok: true, source: 'local-fixture', data: PRODUCT_DIRECTIONS };
  },

  getProjects(): ApiResult<ProjectConcept[]> {
    return { ok: true, source: 'local-fixture', data: CONCEPT_PROJECTS };
  },

  getArticles(): ApiResult<BlogArticle[]> {
    return { ok: true, source: 'local-fixture', data: BLOG_ARTICLES };
  },

  getFaqs(): ApiResult<FAQItem[]> {
    return { ok: true, source: 'local-fixture', data: GENERAL_FAQS };
  },

  getLocations(): ApiResult<LocationCoverage[]> {
    return { ok: true, source: 'local-fixture', data: LOCATIONS_DATA };
  },

  getCareers(): ApiResult<CareerRole[]> {
    return { ok: true, source: 'local-fixture', data: CAREERS_ROLES };
  },

  async submitEnquiry(
    payload: EnquiryPayload,
    options?: { simulateFailure?: boolean }
  ): Promise<ApiResult<EnquirySubmissionResponse>> {
    await new Promise((resolve) => setTimeout(resolve, 450));

    if (options?.simulateFailure) {
      return {
        ok: false,
        source: 'local-fixture',
        data: {
          mode: 'preview-draft',
          referenceCode: '',
          timestampIso: new Date().toISOString(),
          notice:
            'Simulated delivery failure state: please use the direct Email Draft or WhatsApp enquiry actions below.',
        },
        message: 'Unable to reach remote intake endpoint in preview mode.',
      };
    }

    if (API_BASE_URL) {
      const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Enquiry API returned HTTP ${response.status}`);
      }

      const remoteData = (await response.json()) as EnquirySubmissionResponse;
      return { ok: true, source: 'cloudflare-worker', data: remoteData };
    }

    const shortCode = `PREVIEW-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    return {
      ok: true,
      source: 'local-fixture',
      data: {
        mode: 'preview-draft',
        referenceCode: shortCode,
        timestampIso: new Date().toISOString(),
        notice:
          'Frontend Preview Mode: This enquiry was validated locally and has NOT been transmitted to or stored in a remote database yet. Use the Email Draft or WhatsApp buttons below to send it directly to Suvra Technologies.',
      },
    };
  },
};
