# Backend Integration Contract — Suvra Technologies

This handoff specification connects the completed React frontend (`src/services/apiClient.ts`, `src/types/cms.ts`) to the planned **Cloudflare-first backend architecture**.

## 1. Planned Target Infrastructure

| Layer | Technology | Responsibility |
|---|---|---|
| Edge Static Hosting | Cloudflare Pages (or Workers Assets) | Serves `dist/` with `public/_redirects` SPA routing and immutable asset caching |
| API Compute | Cloudflare Workers + Hono | Stateless REST endpoints, input validation (`zod`), Turnstile verification, rate limiting |
| Primary Relational DB | Cloudflare D1 + Drizzle ORM | Leads/enquiries, CMS services/projects/articles, audit logs |
| Media & Attachments | Cloudflare R2 | Zero-egress asset storage (verified case study media, approved product screenshots, enquiry attachments) via signed URLs |
| Bot & Abuse Protection | Cloudflare Turnstile + WAF | Protects `POST /api/enquiries` and future newsletter/career routes |
| Admin Access Control | Cloudflare Zero Trust (Access) | Protects `/admin/*` console and `/api/admin/*` routes with identity SSO + RBAC |
| Heavy / Secondary Backup | Oracle Cloud Infrastructure (OCI) | Scheduled encrypted D1/R2 backups and future dedicated compute workloads behind Cloudflare Tunnel |

## 2. Frontend Client Abstraction (`src/services/apiClient.ts`)

`suvraApi` currently reads from typed local fixtures (`src/data/*`) and executes `POST ${VITE_API_BASE_URL}/api/enquiries` only when `VITE_API_BASE_URL` is configured. Without `VITE_API_BASE_URL`, `submitEnquiry()` operates strictly in validated frontend preview mode without storing personal data in browser storage.

## 3. Planned API Endpoints

### Public Read Endpoints (Optional CMS Hydration)
- `GET /api/health` — Worker & D1 readiness check
- `GET /api/services` & `GET /api/services/:slug` — Maps to `ServiceItem`
- `GET /api/industries` & `GET /api/industries/:slug` — Maps to `IndustryItem`
- `GET /api/projects` & `GET /api/projects/:slug` — Maps to `ProjectConcept` / authorized case studies
- `GET /api/articles` & `GET /api/articles/:slug` — Maps to `BlogArticle`
- `GET /api/faqs` — Maps to `FAQItem[]`

### Public Submission Endpoint
- `POST /api/enquiries`
  - **Request Body (`EnquiryPayload` + Turnstile token)**:
    ```json
    {
      "fullName": "string (min 2)",
      "email": "string (valid email)",
      "phone": "string (optional; min 7 digits if provided)",
      "companyName": "string (optional)",
      "services": ["string (min 1)"],
      "projectDescription": "string (optional; min 15 chars if provided)",
      "budgetRange": "string",
      "timeline": "string",
      "consent": true,
      "turnstileToken": "string (required in production Worker)"
    }
    ```
  - **Server Requirements**: Verify Turnstile token with `TURNSTILE_SECRET_KEY`, rate-limit by IP/ASN, sanitize/validate payload with Zod, persist record in D1, optionally dispatch notification email/webhook asynchronously via `ctx.waitUntil()`, and return `{ mode: "submitted", referenceCode, timestampIso, notice }`.

### Public AI Assistant Endpoint (`POST /api/chat`)
- **Purpose**: Grounded Cloudflare Workers AI endpoint powering **Suvra AI Assistant** when `VITE_ENABLE_ASSISTANT_AI="true"`.
- **Request Body (`ChatApiRequest`)**:
  ```json
  {
    "sessionId": "uuid-string",
    "message": "string (1..500 chars)",
    "history": [{ "role": "user | assistant", "content": "string" }],
    "preferredLanguage": "en | hi | hinglish (optional)",
    "turnstileToken": "string (optional / Turnstile enforced at threshold)"
  }
  ```
- **Server Safeguards**:
  - Verify current Cloudflare Workers AI free-tier Neuron allowance (`~10,000 Neurons/day`) before selecting `WORKERS_AI_MODEL` in Worker `wrangler.toml`/env.
  - Enforce FAQ-first interception for deterministic company/contact/pricing queries before calling `env.AI.run()`.
  - Cap `max_tokens <= 450`, truncate history to last `4` turns, enforce per-IP rate limiting + daily Worker request budget (`500` req/day default), and return `HTTP 429` on exhaustion so the frontend automatically falls back to local `faqEngine.ts`.
  - Inject only verified Suvra knowledge context + `getPublicServicePricing()` (`isPublished === true` rows only). Never pass secrets or unpublished draft prices into AI system prompts.

### Protected Admin Endpoints (`/api/admin/*` via Cloudflare Zero Trust)
- `GET /api/admin/enquiries`, `PATCH /api/admin/enquiries/:id` (status triage: `new | reviewing | contacted | archived`)
- `GET /api/admin/pricing`, `PATCH /api/admin/pricing/:serviceId` (explicit INR quotation edit + `pricingStatus: 'approved'` / `isPublished` publication toggle)
- `GET /api/admin/assistant`, `PATCH /api/admin/assistant` (toggle `enabled`, `aiBackendEnabled`, daily/session limits, welcome/fallback copy)
- `POST/PATCH/DELETE /api/admin/projects` (authorized client case studies — requires explicit client authorization flag before public display)
- `POST/PATCH/DELETE /api/admin/articles`
- `POST /api/admin/media/presign` (short-lived R2 upload URLs for verified case study media and approved asset uploads)
- **Founder & Leadership CMS Note**: The Founder & CEO profile intentionally uses a professional, photo-free, typography-based executive presentation. A personal photograph is not required, and missing founder photography must not be treated as an outstanding implementation requirement. Any future `founder_profile` CMS media field must remain strictly optional (`optionalMedia.enabled = false` by default).

## 4. Suggested D1 Relational Entities (Drizzle Schema Outline)

- `enquiries`: `id`, `reference_code`, `full_name`, `email`, `phone`, `company_name`, `services_json`, `project_description`, `budget_range`, `timeline`, `consent_accepted`, `status`, `created_at`, `updated_at`
- `pricing_configs`: `service_id`, `pricing_type`, `starting_price`, `currency`, `billing_interval`, `pricing_status`, `estimated_duration`, `included_deliverables_json`, `exclusions_json`, `is_published`, `updated_by`, `updated_at`
- `assistant_config`: `id`, `enabled`, `ai_backend_enabled`, `max_input_chars`, `max_output_tokens`, `max_session_ai_requests`, `daily_ai_budget_requests`, `welcome_message`, `fallback_message`, `updated_at`
- `assistant_usage_logs`: `id`, `day_bucket`, `request_count`, `neurons_estimate`, `mode`, `updated_at`
- `services`: `id`, `slug`, `name`, `category`, `sort_order`, `payload_json`, `published`
- `case_studies`: `id`, `slug`, `title`, `category`, `is_concept`, `client_authorized`, `payload_json`, `published_at`
- `articles`: `id`, `slug`, `title`, `category`, `read_time`, `sections_json`, `published`, `published_at`
- `media_assets`: `id`, `r2_key`, `mime_type`, `alt_text`, `uploaded_by`, `created_at`
- `audit_logs`: `id`, `actor_email`, `action`, `target_table`, `target_id`, `created_at`

## 5. Required Environment Variables (Future Backend Phase)

- Frontend: `VITE_SITE_URL`, `VITE_ALLOW_INDEXING`, `VITE_API_BASE_URL`, `VITE_TURNSTILE_SITE_KEY`, `VITE_ENABLE_ASSISTANT_AI` (defaults `"false"`)
- Worker Secrets & Bindings (`wrangler.toml` / `wrangler secret put`): `AI` (Workers AI binding), `WORKERS_AI_MODEL`, `TURNSTILE_SECRET_KEY`, `CLOUDFLARE_ACCESS_AUD`, `NOTIFICATION_WEBHOOK_URL` / mail provider key, `OCI_BACKUP_ENDPOINT`
