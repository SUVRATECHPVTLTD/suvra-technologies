import { isNonIndexablePreviewOrigin } from './seoRoutes';

export const BRAND_ASSETS = {
  symbolLightBg: '/brand/logos/symbol-light-background.png',
  symbolDarkBg: '/brand/logos/symbol-transparent.png',
  horizontalLightBg: '/brand/logos/horizontal-light.png',
  horizontalDarkBg: '/brand/logos/horizontal-dark.png',
  stackedLightBg: '/brand/logos/stacked-light.png',
  stackedDarkBg: '/brand/logos/stacked-dark.png',
  ogImage: '/brand/social/og-image-1200x630.png',
  siteIcon512: '/google-site-icon-512.png',
} as const;

const ENV: Partial<ImportMetaEnv> =
  typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

const CONFIGURED_SITE_URL = (
  (ENV.VITE_SITE_URL as string | undefined) || ''
).trim().replace(/\/$/, '');

const CONFIGURED_PREVIEW_URL = (
  (ENV.VITE_PREVIEW_URL as string | undefined) || ''
).trim().replace(/\/$/, '');

export const SITE_CONFIG = {
  companyName: 'Suvra Technologies',
  founderName: 'Ravi Ranjan',
  founderTitle: 'Founder & Chief Executive Officer',
  establishedYear: 2026,
  positioning: 'Technology & Innovation Company',
  tagline: 'Engineering Tomorrow. Empowering Today.',
  email: 'ofclsuvratech@gmail.com',
  phoneDisplay: '+91 7281921311',
  phoneHref: 'tel:+917281921311',
  whatsappHref: 'https://wa.me/917281921311',
  headquarters: 'Ramdyalu, Muzaffarpur, Bihar, India – 842002',
  founderLinkedIn: 'https://www.linkedin.com/in/ravimeranjan/',
  targetMarkets: 'India and International Markets',
  suvrixaNote:
    'Ravi Ranjan is also the Founder of SUVRIXA, an initiative helping students buy and sell second-hand books locally.',
  siteUrl: CONFIGURED_SITE_URL,
  previewUrl: CONFIGURED_PREVIEW_URL,
  allowIndexingFlag: ENV.VITE_ALLOW_INDEXING === 'true',
  googleSiteVerification: (
    (ENV.VITE_GSC_VERIFICATION as string | undefined) || ''
  ).trim(),
} as const;

/**
 * Resolves the active origin dynamically:
 * 1. Explicit production SITE_URL / VITE_SITE_URL when configured
 * 2. Runtime preview APP_URL or active browser window.location.origin during development/preview
 */
export function resolveSiteOrigin(): string {
  if (SITE_CONFIG.siteUrl) return SITE_CONFIG.siteUrl;
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin.replace(/\/$/, '');
  }
  return SITE_CONFIG.previewUrl;
}

/**
 * Indexing is strictly disabled unless VITE_ALLOW_INDEXING === "true",
 * an explicit production VITE_SITE_URL is configured, and the resolved host is not a preview/staging host.
 */
export function isProductionIndexingAllowed(origin = resolveSiteOrigin()): boolean {
  return (
    SITE_CONFIG.allowIndexingFlag &&
    Boolean(SITE_CONFIG.siteUrl) &&
    !isNonIndexablePreviewOrigin(origin)
  );
}
