# Suvra Technologies — Frontend Web Platform

Official corporate website and multi-route frontend platform for **Suvra Technologies** (*Engineering Tomorrow. Empowering Today.*).

- **Company**: Suvra Technologies (`Technology & Innovation Company`, established 2026)
- **Founder & CEO**: Ravi Ranjan
- **Headquarters**: Ramdyalu, Muzaffarpur, Bihar, India – 842002
- **Contact**: `ofclsuvratech@gmail.com` · `+91 7281921311` (Phone & Business WhatsApp)
- **Target Markets**: India and International Markets

## Technology Stack & Architecture Note

- **Provisioned Runtime**: React 19, TypeScript, Vite 8, Tailwind CSS v4, React Router v7 (`BrowserRouter`), Motion (`motion/react`), Lucide React.
- **Next.js Note**: Because this AI Studio workspace is provisioned on Vite (`vite.config.ts`), the frontend is implemented using Vite + React Router as the documented fallback while keeping components, semantic CSS tokens, typed CMS/service models (`src/types/cms.ts`), and `suvraApi` (`src/services/apiClient.ts`) cleanly structured for future Next.js App Router or Cloudflare Pages/Workers deployment.
- **Cloudflare-First Readiness**: `src/` contains zero Node.js-only runtime imports (`fs`, `path`, `express`, `dotenv`) and compiles into static split bundles (`dist/`) with `public/_redirects` configured for SPA fallback routing on Cloudflare Pages.

## Local Setup & Scripts

```bash
npm install
npm run dev      # Starts Vite dev server on port 3000
npm run lint     # Runs TypeScript strict check (tsc --noEmit)
npm run build    # Builds production bundle into dist/
npm run preview  # Previews production build locally
```

### Environment Variables

See `.env.example` for template keys:
- `SITE_URL` / `VITE_SITE_URL`: Purchased production canonical domain origin (leave blank during development, preview, and staging).
- `ALLOW_INDEXING` / `VITE_ALLOW_INDEXING`: Set to `"true"` **only** when deploying to the verified production domain (`noindex, nofollow` and `Disallow: /` are enforced automatically across development, preview, and staging hosts).
- `GOOGLE_SITE_VERIFICATION` / `VITE_GSC_VERIFICATION`: Optional Google Search Console verification token injected into HTML metadata at launch.
- `VITE_API_BASE_URL`: Base URL for the future Cloudflare Workers + Hono API backend.

## Documentation Index

- [`AGENTS.md`](./AGENTS.md) — Engineering standards, brand asset rules, and content truthfulness guardrails for future contributors.
- [`docs/FRONTEND-ARCHITECTURE.md`](./docs/FRONTEND-ARCHITECTURE.md) — Component topology, state management, chunk splitting, and Cloudflare compatibility.
- [`docs/ROUTE-INVENTORY.md`](./docs/ROUTE-INVENTORY.md) — Complete public route map (52 indexable routes + 3 legal drafts + custom 404).
- [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md) — Typography, light/dark color tokens, WCAG 2.2 AA contrast, and motion specifications.
- [`docs/BRAND-ASSET-USAGE.md`](./docs/BRAND-ASSET-USAGE.md) — Integration rules for the immutable Option 4 ST monogram and raster derivatives.
- [`docs/BACKEND-INTEGRATION-CONTRACT.md`](./docs/BACKEND-INTEGRATION-CONTRACT.md) — Future API endpoints, D1/Drizzle entities, R2 media, Turnstile, and Cloudflare Zero Trust handoff.
- [`docs/FRONTEND-QA-REPORT.md`](./docs/FRONTEND-QA-REPORT.md) — Initial QA audit status.
- [`docs/FRONTEND-FINAL-REPORT.md`](./docs/FRONTEND-FINAL-REPORT.md) — Final premium frontend audit & release polish report (`PASS`, `FIXED`, `PENDING`, `NOT TESTED`).

## Known Limitations (Frontend Phase)

1. **Backend Deferred**: Cloudflare Workers, Hono, D1, Drizzle ORM, R2, Turnstile, and Zero Trust are intentionally unprovisioned in this phase. Project enquiries operate in validated frontend preview mode with Email (`mailto:`) and WhatsApp handoff drafts without storing personal data in `localStorage`.
2. **Draft Legal Pages**: `/privacy-policy`, `/terms-and-conditions`, and `/cookie-policy` are explicitly marked as legal drafts pending formal review.
3. **Pending Media & External Checks**: Founder portrait displays a labelled placeholder pending an official photograph; live external reference websites (`webfloratechnologies.com`, `redntechnologies.com`), Homepage Prototype V1, and headless browser / Lighthouse CLI audits were not available in this environment.
