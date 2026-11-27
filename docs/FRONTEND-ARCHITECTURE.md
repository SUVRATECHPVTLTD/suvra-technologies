# Frontend Architecture — Suvra Technologies

## 1. Architectural Overview

The Suvra Technologies frontend is a static-first React 19 Single Page Application built with TypeScript, Vite 8 (Rolldown bundler), Tailwind CSS v4, React Router v7, and `motion/react`.

It separates **configuration**, **typed CMS fixtures**, **transport abstraction**, **reusable UI primitives**, and **lazy-loaded route modules** so the codebase can transition directly to Cloudflare Workers + Hono + D1 (or be ported cleanly to Next.js App Router) without rewriting components.

## 2. Directory Topology

```text
├── public/                     # Static web assets served at /
│   ├── brand/logos/            # Official Option 4 light & dark PNG lockups/symbols
│   ├── brand/social/           # og-image-1200x630.png
│   ├── icons/                  # icon-192.png, icon-512.png
│   ├── _redirects              # Cloudflare Pages SPA fallback (/* /index.html 200)
│   ├── robots.txt              # Default staging protection (overwritten dynamically at dev/build)
│   └── site.webmanifest        # Root-relative PWA manifest icons
├── Suvra-Technologies-Brand-Assets/  # Immutable master & cross-platform brand kit
├── src/
│   ├── App.tsx                 # Route table, React.lazy code splitting, MotionConfig, Providers
│   ├── main.tsx                # Application bootstrap
│   ├── index.css               # Tailwind v4 @theme + semantic light/dark CSS tokens
│   ├── config/
│   │   ├── currency.ts         # Centralized INR (₹ / en-IN) currency formatting and Custom Pricing labels
│   │   ├── seoRoutes.ts        # 52 public sitemap routes, preview-host guards, robots.txt & sitemap.xml builders
│   │   ├── site.ts             # Official corporate facts, brand asset paths, env/origin resolution
│   │   └── motion.ts           # Centralized easing, duration, and variant tokens
│   ├── types/
│   │   └── cms.ts              # Strict TypeScript domain contracts & ApiResult<T>
│   ├── data/
│   │   ├── services.ts         # 14 services across 4 disciplines
│   │   ├── industries.ts       # 10 target industries
│   │   └── company.ts          # Comparison, categorized ecosystem, 7-step website/software tracks, products, blueprints, blog, FAQs, 5 locations, careers
│   ├── services/
│   │   └── apiClient.ts        # Backend-ready API client (local fixtures + VITE_API_BASE_URL fetch)
│   ├── context/
│   │   ├── ThemeContext.tsx    # Light/Dark state synced to <html>.dark and suvra-theme key
│   │   └── ToastContext.tsx    # Accessible live-region toast notifications
│   ├── components/
│   │   ├── layout/             # Capsule Header, MegaMenu, MobileNavigation, Footer, Layout
│   │   ├── home/               # HeroAndIntro, ServicesAndModel, EcosystemAndProcess, ProofAndConversion
│   │   ├── cards/              # ServiceCard, IndustryCard, ProductCard, ProjectCard, BlogCard
│   │   ├── forms/              # FormField, MultiStepEnquiryForm (INR-only budgets)
│   │   └── ui/                 # BrandMark, Container, Breadcrumbs, ThemeToggle, FAQAccordion, ServiceDiagram, FloatingWhatsApp, SeoHead, FeedbackStates, MotionPrimitives, BackToTop, Toast
│   └── pages/
│       ├── HomePage.tsx
│       ├── ServicesPages.tsx
│       ├── IndustriesPages.tsx
│       ├── ProductsAndWorkPages.tsx
│       ├── CompanyPages.tsx
│       └── ResourcesAndContactPages.tsx
└── docs/                       # Architecture, QA, Final Release, Route, Design, Brand, and Backend contracts
```

## 3. Key Technical Decisions

### 3.1 Code Splitting & Vendor Chunking
- Every non-home page module in `src/App.tsx` is lazy-loaded with `React.lazy()` and `<Suspense fallback={<RouteFallback />} />`.
- `vite.config.ts` configures `build.rolldownOptions.output.manualChunks` to separate `react-vendor`, `router-vendor`, `motion-vendor`, and `icons-vendor` from the application entry (`228.50 kB` unminified / `53.24 kB` gzipped), eliminating >500 kB chunk warnings and optimizing edge cache hit rates.

### 3.2 Anti-FOUC Dual-Theme Synchronization
- An inline `<script>` in `index.html` resolves `localStorage.getItem('suvra-theme')` or `window.matchMedia('(prefers-color-scheme: dark)')` prior to first paint and applies/removes `.dark` on `<html>`.
- `ThemeContext.tsx` synchronizes runtime toggles cleanly without hydration or flash issues.

### 3.3 Cloudflare Workers / Pages Compatibility
- **Zero Node.js Runtime Dependencies in `src/`**: Verified zero imports of `fs`, `path`, `crypto`, `http`, `express`, `dotenv`, or `@google/genai` inside `src/`.
- **Note on `package.json` Starter Dependencies**: `@google/genai`, `express`, `dotenv`, `tsx`, and `@types/express` remain in `package.json` from the initial workspace template; Vite tree-shakes/excludes them from `dist/`, so the production static bundle is 100% browser-only and Cloudflare-compatible.
- **SPA Routing on Cloudflare Pages**: `public/_redirects` routes `/* /index.html 200` so direct visits and browser refreshes on nested routes (e.g., `/services/website-development`) render cleanly while unknown paths fall through to React Router's `<NotFoundPage />`.
- **Cloudflare Workers Static Assets Note**: If deploying via Wrangler Workers Static Assets instead of Cloudflare Pages, set `"assets": { "directory": "./dist", "not_found_handling": "single-page-application" }` in `wrangler.jsonc`.
