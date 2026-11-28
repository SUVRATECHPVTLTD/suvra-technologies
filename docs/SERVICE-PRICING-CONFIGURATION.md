# Service Pricing Configuration & INR Quotation Policy — Suvra Technologies

This document specifies the independent service pricing architecture implemented in `src/types/pricing.ts`, `src/config/pricing.ts`, and `src/config/currency.ts`.

## 1. Price Approval Policy (Critical Guardrail)

1. **No Public Unapproved Prices**: All 14 services in `SERVICE_PRICING_CONFIG` currently store internal draft placeholders for future review and carry `isPublished: false` and `pricingStatus: 'internal_draft'`.
2. **Public Display Behavior**: `getPublicServicePricing(serviceId)` strictly blocks unpublished or unapproved amounts from leaking into JSX, DOM attributes, JSON-LD, or client chat responses. Until commercial sign-off is explicitly flipped to `pricingStatus: 'approved'` and `isPublished: true`, every public service card, service detail page, and AI assistant reply displays **`Custom Pricing`** / **`Request a Quote`** in Indian Rupees (`INR`, `₹`).
3. **Exclusive INR Currency**: All monetary values, formatters (`formatINR` using `en-IN` grouping), and quotation disclosures are strictly INR (`₹`). USD (`$`) pricing is forbidden.

## 2. Typed Schema (`src/types/pricing.ts`)

Each of the 14 services has an independent record keyed by `service.slug`:

| Field | Type | Description |
|---|---|---|
| `serviceId` | `string` | Matches `ServiceItem.slug` in `src/data/services.ts` |
| `pricingType` | `'starting_price' \| 'fixed_project' \| 'monthly_retainer' \| 'annual_maintenance' \| 'custom_quotation' \| 'unpublished'` | Quotation classification |
| `startingPrice` | `number \| null` | Internal numeric INR figure (`null` when strictly bespoke) |
| `currency` | `'INR'` | Locked to Indian Rupees |
| `billingInterval` | `'one_time' \| 'monthly' \| 'annual' \| 'custom'` | Engagement billing cadence |
| `pricingStatus` | `'internal_draft' \| 'approved' \| 'unpublished'` | Approval gate checked before rendering numbers |
| `estimatedDuration` | `string \| null` | Optional timeline string (also gated when `null`) |
| `includedDeliverables` | `string[]` | Core deliverables rendered on service cards & detail pages |
| `exclusions` | `string[]` | Scope exclusions for commercial clarity |
| `lastUpdated` | `string` | ISO date string |
| `isPublished` | `boolean` | Publication switch (must be `true` alongside `pricingStatus: 'approved'`) |

## 3. Configured Services (Current Status: All Unpublished / Custom Pricing)

All 14 services (`website-development`, `mobile-app-development`, `custom-software-development`, `ecommerce-development`, `ai-business-automation`, `ai-chatbots-agents`, `crm-erp-solutions`, `ui-ux-design-branding`, `digital-marketing`, `seo-local-seo`, `cloud-devops`, `it-consulting`, `api-development-integrations`, `website-maintenance-support`) have:
- Verified `includedDeliverables` exposed publicly on Home `CoreServicesSection`, `/services`, and `/services/:slug`.
- `isPublished: false` and `pricingStatus: 'internal_draft'`, resulting in `Custom Pricing` (`INR (₹)`) + `Request a Quote` publicly.

## 4. Future Admin Dashboard Publication Workflow

When the Cloudflare Workers + Hono + D1 backend (`pricing_configs` table) and Zero Trust Admin Console are connected:
1. Authorized administrators edit INR figures, `estimatedDuration`, `includedDeliverables`, and `exclusions`.
2. Explicitly toggling `pricingStatus = 'approved'` and `isPublished = true` enables `getPublicServicePricing()` to render formatted INR quotes (e.g., `Starting ₹...`) without altering React card components.
3. Unapproving or setting `isPublished = false` reverts a service immediately back to `Custom Pricing` / `Request a Quote`.
