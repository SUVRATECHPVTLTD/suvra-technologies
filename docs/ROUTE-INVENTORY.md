# Route Inventory — Suvra Technologies

Total verified routes: **55 named/dynamic routes + 1 wildcard 404 route** (`52` public routes indexed in `public/sitemap.xml` + `3` noindex legal draft routes).

## 1. Core Public Pages (15 Routes)

| Route | Component | Page Purpose | Indexing Policy |
|---|---|---|---|
| `/` | `HomePage` | Flagship landing experience (15 structured sections) | Conditional (`VITE_ALLOW_INDEXING`) |
| `/services` | `ServicesIndexPage` | Interactive filterable directory of all 14 services | Conditional |
| `/industries` | `IndustriesIndexPage` | Overview of all 10 target industries | Conditional |
| `/products` | `ProductsPage` | Product innovation R&D roadmap with honest status disclosures | Conditional |
| `/portfolio` | `PortfolioPage` | Filterable concept demonstrations & blueprints + honest client empty state | Conditional |
| `/case-studies` | `CaseStudiesIndexPage` | Technical case blueprints overview | Conditional |
| `/about` | `AboutPage` | Vision, mission, Services & Product Innovation model, Cloudflare-first philosophy | Conditional |
| `/founder` | `FounderPage` | Ravi Ranjan profile, verified LinkedIn link, honest SUVRIXA separation note | Conditional |
| `/team` | `TeamPage` | Leadership-first transparency without fabricated employees | Conditional |
| `/careers` | `CareersPage` | Honest talent/internship introduction pipeline | Conditional |
| `/locations` | `LocationsIndexPage` | Headquarters vs. regional/global digital coverage | Conditional |
| `/blog` | `BlogIndexPage` | Filterable Technology Insights essays | Conditional |
| `/faq` | `FaqPage` | Accessible FAQ accordion + `FAQPage` JSON-LD schema | Conditional |
| `/contact` | `ContactPage` | Direct email, phone, WhatsApp, HQ + quick enquiry wizard | Conditional |
| `/start-a-project` | `StartProjectPage` | Guided 4-step project scoping wizard (`?service=` prefill supported) | Conditional |

## 2. Dynamic Service Detail Pages (`/services/:slug` — 14 Routes)

1. `/services/website-development` (Engineering)
2. `/services/mobile-app-development` (Engineering)
3. `/services/custom-software-development` (Engineering)
4. `/services/ecommerce-development` (Engineering)
5. `/services/api-development-integrations` (Engineering)
6. `/services/ai-business-automation` (Intelligence)
7. `/services/ai-chatbots-agents` (Intelligence)
8. `/services/crm-erp-solutions` (Intelligence)
9. `/services/ui-ux-design-branding` (Digital)
10. `/services/digital-marketing` (Digital)
11. `/services/seo-local-seo` (Digital)
12. `/services/cloud-devops` (Infrastructure)
13. `/services/it-consulting` (Infrastructure)
14. `/services/website-maintenance-support` (Infrastructure)

Each service detail route validates `slug` via `getServiceBySlug()`, renders `Service` JSON-LD structured data, a tailored `ServiceDiagram`, challenges, approach, capabilities, benefits, methodology, FAQs, and related services—falling back to `NotFoundPage` for unknown slugs.

## 3. Dynamic Industry Detail Pages (`/industries/:slug` — 10 Routes)

1. `/industries/education-edtech`
2. `/industries/healthcare`
3. `/industries/retail-ecommerce`
4. `/industries/real-estate`
5. `/industries/finance-fintech`
6. `/industries/logistics-supply-chain`
7. `/industries/manufacturing`
8. `/industries/hospitality`
9. `/industries/startups`
10. `/industries/enterprises`

## 4. Dynamic Location Coverage Pages (`/locations/:slug` — 5 Routes)

1. `/locations/muzaffarpur` (Headquarters Region: Ramdyalu, Muzaffarpur – 842002)
2. `/locations/patna` (State Coverage)
3. `/locations/bihar` (State Coverage)
4. `/locations/india` (National Coverage)
5. `/locations/international-services` (Global Coverage)

## 5. Dynamic Case Blueprints (`/case-studies/:slug` — 4 Routes)

1. `/case-studies/cloudflare-edge-saas-blueprint`
2. `/case-studies/grounded-intake-automation-concept`
3. `/case-studies/regional-commerce-mobile-concept`
4. `/case-studies/enterprise-corporate-web-system`

## 6. Dynamic Technology Insights (`/blog/:slug` — 4 Routes)

1. `/blog/why-cloudflare-first-architecture-suits-growing-enterprises`
2. `/blog/designing-backend-ready-frontends`
3. `/blog/practical-guardrails-for-business-ai-automation`
4. `/blog/accessible-dual-theme-design-systems`

Each article renders `og:type="article"`, reading progress indicator, and `Article` JSON-LD structured data.

## 7. Legal Drafts & Fallback Routes (4 Routes)

| Route | Component | Policy |
|---|---|---|
| `/privacy-policy` | `LegalPage kind="privacy"` | `noindex, nofollow` + explicit Legal Draft notice banner |
| `/terms-and-conditions` | `LegalPage kind="terms"` | `noindex, nofollow` + explicit Legal Draft notice banner |
| `/cookie-policy` | `LegalPage kind="cookies"` | `noindex, nofollow` + explicit Legal Draft notice banner |
| `*` | `NotFoundPage` | `noindex, nofollow` custom HTTP 404 recovery page with `BrandSymbol` |
