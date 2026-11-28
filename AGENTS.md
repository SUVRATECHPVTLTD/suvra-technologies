# Suvra Technologies — Engineering & AI Agent Guardrails

This document defines mandatory repository rules for engineers and coding assistants continuing work across future backend, admin dashboard, mobile, and SaaS phases.

## 1. Official Company & Content Truthfulness Rules

Never alter or contradict verified corporate identity values centralized in `src/config/site.ts`:

- **Company Name**: `Suvra Technologies`
- **Positioning**: `Technology & Innovation Company`
- **Tagline**: `Engineering Tomorrow. Empowering Today.`
- **Founder & CEO**: `Ravi Ranjan` (`https://www.linkedin.com/in/ravimeranjan/`)
- **Established**: `2026`
- **Email / Phone / WhatsApp**: `ofclsuvratech@gmail.com` / `+91 7281921311`
- **Headquarters**: `Ramdyalu, Muzaffarpur, Bihar, India – 842002`
- **SUVRIXA Relationship**: Mention SUVRIXA strictly as Ravi Ranjan's separate student-focused local second-hand book initiative—never as a subsidiary or commercial product of Suvra Technologies.
- **Currency & Quotation Rule**: Format all public monetary values exclusively in Indian Rupees (`INR`, `₹`, `en-IN` locale) through `src/config/currency.ts` and `src/config/pricing.ts`. Never introduce USD/`$` pricing or expose internal draft amounts (`isPublished: false` / `pricingStatus !== 'approved'`); display `Custom Pricing` / `Request a Quote` until leadership approves publication.
- **Suvra AI Assistant & Floating Controls**: Never claim live AI models are connected unless `VITE_ENABLE_ASSISTANT_AI="true"` and `/api/chat` is provisioned; keep conversations strictly in-memory (no `localStorage`), never invent unverified company metrics, and keep `FloatingWhatsApp` circular with no permanent text label or fake availability indicators.

- **Founder & Leadership Privacy Decision**: The Founder & CEO profile intentionally uses a professional, photo-free, typography-based executive presentation. A personal photograph is not required, and missing founder photography must not be treated as an outstanding implementation requirement. Never generate AI portraits, use stock avatars, or display `"Portrait Placeholder"` / `"Verified photo pending"` messages.

**Forbidden Content Patterns**:
- No fabricated testimonials, client logos, case metrics, revenue figures, team rosters, or partner badges (e.g., do not imply official Google/AWS/Microsoft/Cloudflare partnerships).
- No founder portrait placeholders, stock avatars, AI-generated portraits, or pending photograph notices.
- No misleading submission confirmations before backend persistence exists.
- No personal enquiry data or AI chat transcripts stored in `localStorage` or `sessionStorage` (`suvra-theme` is permitted solely for theme preference).

## 2. Brand Asset Protection (`Suvra-Technologies-Brand-Assets/`)

- `/Suvra-Technologies-Brand-Assets/` is **immutable**. Never delete, overwrite, or modify its files.
- Always render the official Option 4 ST emblem and lockups via `src/components/ui/BrandMark.tsx` (`BrandMark`, `BrandHorizontalLockup`, `BrandSymbol`).
- Never redraw, recolor, distort, rotate, or replace the ST monogram with SVG/CSS/AI placeholders, and never display `"Option 4"` selection text in user-facing UI.
- Use `horizontal-light.png` / `symbol-light-background.png` on light surfaces and `horizontal-dark.png` / `symbol-transparent.png` on dark surfaces.

## 3. Infrastructure & Backend Boundaries

- **Cloudflare-First Strategy**: Keep frontend builds static-compatible for Cloudflare Pages / Workers Static Assets (`dist/`). Future backend APIs belong in **Cloudflare Workers + Hono**, relational data in **Cloudflare D1 + Drizzle ORM**, media in **Cloudflare R2**, bot checks in **Cloudflare Turnstile**, admin protection in **Cloudflare Zero Trust**, and secondary backups/heavy compute in **Oracle Cloud Infrastructure (OCI)** where justified.
- Do not migrate this project to Firebase, Supabase, or unrelated backend stacks.
- Keep `src/services/apiClient.ts` as the single client transport boundary so UI components stay decoupled from backend endpoints.

## 4. Verification Checklist Before Merging Any Change

1. Run `npm run lint` (`tsc --noEmit`) — must exit with 0 errors.
2. Run `npm run build` (`vite build`) — must bundle cleanly without chunk warnings or broken asset paths, generating `dist/robots.txt` and `dist/sitemap.xml` from `src/config/seoRoutes.ts`.
3. Verify light and dark modes, `prefers-reduced-motion`, WCAG 2.2 AA focus rings/contrast, exclusive INR (`₹`) formatting, and `320px`–`1920px` responsive layouts.
