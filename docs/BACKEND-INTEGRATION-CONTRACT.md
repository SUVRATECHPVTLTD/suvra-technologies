# Backend Integration Contract — Suvra Technologies

This handoff specification connects the completed React frontend (`src/services/apiClient.ts`, `src/types/cms.ts`) to the planned **Cloudflare-first backend architecture**.

## 1. Planned Target Infrastructure

| Layer | Technology | Responsibility |
|---|---|---|
| Edge Static Hosting | Cloudflare Pages (or Workers Assets) | Serves `dist/` with `public/_redirects` SPA routing and immutable asset caching |
| API Compute | Cloudflare Workers + Hono | Stateless REST endpoints, input validation (`zod`), Turnstile verification, rate limiting |
| Primary Relational DB | Cloudflare D1 + Drizzle ORM | Leads/enquiries, CMS services/projects/articles, audit logs |
| Media & Attachments | Cloudflare R2 | Zero-egress asset storage (founder photo, verified case media, enquiry attachments) via signed URLs |
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

### Protected Admin Endpoints (`/api/admin/*` via Cloudflare Zero Trust)
- `GET /api/admin/enquiries`, `PATCH /api/admin/enquiries/:id` (status triage: `new | reviewing | contacted | archived`)
- `POST/PATCH/DELETE /api/admin/projects` (authorized client case studies — requires explicit client authorization flag before public display)
- `POST/PATCH/DELETE /api/admin/articles`
- `POST /api/admin/media/presign` (short-lived R2 upload URLs for verified portrait/case images)

## 4. Suggested D1 Relational Entities (Drizzle Schema Outline)

- `enquiries`: `id`, `reference_code`, `full_name`, `email`, `phone`, `company_name`, `services_json`, `project_description`, `budget_range`, `timeline`, `consent_accepted`, `status`, `created_at`, `updated_at`
- `services`: `id`, `slug`, `name`, `category`, `sort_order`, `payload_json`, `published`
- `case_studies`: `id`, `slug`, `title`, `category`, `is_concept`, `client_authorized`, `payload_json`, `published_at`
- `articles`: `id`, `slug`, `title`, `category`, `read_time`, `sections_json`, `published`, `published_at`
- `media_assets`: `id`, `r2_key`, `mime_type`, `alt_text`, `uploaded_by`, `created_at`
- `audit_logs`: `id`, `actor_email`, `action`, `target_table`, `target_id`, `created_at`

## 5. Required Environment Variables (Future Backend Phase)

- Frontend: `VITE_SITE_URL`, `VITE_ALLOW_INDEXING`, `VITE_API_BASE_URL`, `VITE_TURNSTILE_SITE_KEY`
- Worker Secrets (server-only via `wrangler secret put`): `TURNSTILE_SECRET_KEY`, `CLOUDFLARE_ACCESS_AUD`, `NOTIFICATION_WEBHOOK_URL` / mail provider key, `OCI_BACKUP_ENDPOINT`
