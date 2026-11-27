import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  BRAND_ASSETS,
  SITE_CONFIG,
  isProductionIndexingAllowed,
  resolveSiteOrigin,
} from '../../config/site';

interface SeoHeadProps {
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoHead({
  title,
  description,
  ogType = 'website',
  structuredData,
  noIndex = false,
}: SeoHeadProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title.includes(SITE_CONFIG.companyName)
      ? title
      : `${title} — ${SITE_CONFIG.companyName}`;

    const origin = resolveSiteOrigin();
    const canonicalUrl = origin ? `${origin}${pathname}` : '';
    const ogImageUrl = origin ? `${origin}${BRAND_ASSETS.ogImage}` : BRAND_ASSETS.ogImage;
    const siteIconUrl = origin ? `${origin}${BRAND_ASSETS.siteIcon512}` : BRAND_ASSETS.siteIcon512;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:image', ogImageUrl);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImageUrl);

    const canIndex = !noIndex && isProductionIndexingAllowed(origin);
    upsertMeta('name', 'robots', canIndex ? 'index, follow' : 'noindex, nofollow');

    if (SITE_CONFIG.googleSiteVerification) {
      upsertMeta('name', 'google-site-verification', SITE_CONFIG.googleSiteVerification);
    }

    let canonicalEl = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', canonicalUrl);
      upsertMeta('property', 'og:url', canonicalUrl);
    } else if (canonicalEl) {
      canonicalEl.remove();
    }

    const scriptId = 'suvra-route-jsonld';
    const existingScript = document.getElementById(scriptId);
    if (existingScript) existingScript.remove();

    const baseOrganization: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.companyName,
      description: `${SITE_CONFIG.positioning} — ${SITE_CONFIG.tagline}`,
      email: SITE_CONFIG.email,
      telephone: SITE_CONFIG.phoneDisplay,
      logo: siteIconUrl,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ramdyalu',
        addressLocality: 'Muzaffarpur',
        addressRegion: 'Bihar',
        postalCode: '842002',
        addressCountry: 'IN',
      },
      founder: {
        '@type': 'Person',
        name: SITE_CONFIG.founderName,
        sameAs: SITE_CONFIG.founderLinkedIn,
      },
      ...(origin ? { url: origin } : {}),
    };

    const websiteSchema: Record<string, unknown> | null =
      pathname === '/' && origin
        ? {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_CONFIG.companyName,
            url: origin,
            description: description,
          }
        : null;

    const ldItems: Record<string, unknown>[] = [baseOrganization];
    if (websiteSchema) ldItems.push(websiteSchema);
    if (structuredData) {
      if (Array.isArray(structuredData)) ldItems.push(...structuredData);
      else ldItems.push(structuredData);
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(ldItems.length === 1 ? ldItems[0] : ldItems);
    document.head.appendChild(script);
  }, [title, description, ogType, pathname, structuredData, noIndex]);

  return null;
}
