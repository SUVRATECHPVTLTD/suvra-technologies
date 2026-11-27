import type { ServiceItem } from '../types/cms';

export const SERVICE_CATEGORIES = [
  {
    id: 'engineering',
    label: 'Engineering',
    summary: 'Web platforms, mobile applications, bespoke software, commerce systems, and API integrations.',
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    summary: 'Applied AI workflows, conversational agents, and unified CRM/ERP operations.',
  },
  {
    id: 'digital',
    label: 'Digital',
    summary: 'Design systems, brand expression, search architecture, and performance marketing.',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    summary: 'Cloudflare-first DevOps, strategic IT advisory, and structured platform maintenance.',
  },
] as const;

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: 'website-development',
    name: 'Website Development',
    category: 'engineering',
    categoryLabel: 'Engineering',
    shortDescription:
      'Accessible, edge-delivered corporate websites and web platforms engineered for speed, clarity, and search readiness.',
    heroSummary:
      'We build fast, maintainable websites structured around semantic markup, strict Core Web Vitals discipline, and effortless content scalability.',
    overview:
      'A company website is often the first technical touchpoint for prospective clients and partners. Rather than assembling heavy theme templates packed with fragile plugins, we engineer bespoke React and TypeScript web architectures deployed to global edge networks with clean typography, responsive grids, and structured SEO foundations.',
    challenges: [
      'Slow page loads caused by bloated third-party scripts, unoptimized media, and render-blocking stylesheets.',
      'Inconsistent layouts across mobile phones, tablets, and high-resolution desktop monitors.',
      'Rigid template CMS setups that break design integrity when teams add new service pages or landing routes.',
    ],
    approach: [
      'Design a modular component system anchored by semantic CSS tokens and predictable responsive breakpoints.',
      'Deliver static-first or edge-rendered bundles over Cloudflare global edge nodes to minimize round-trip latency.',
      'Implement clean Open Graph tags, JSON-LD schema boundaries, accessible keyboard navigation, and WCAG 2.2 AA contrast.',
    ],
    capabilities: [
      'Corporate multi-page websites and product marketing platforms',
      'Light and dark dual-theme design systems with zero layout flash',
      'Interactive multi-step enquiry flows ready for API integration',
      'Semantic HTML5, structured metadata, and sitemap architecture',
    ],
    benefits: [
      'Consistent presentation across 320px mobile devices through 1920px desktop monitors.',
      'Reduced operational overhead by eliminating unnecessary origin servers for static marketing routes.',
      'Clean separation between content schemas and UI components for future CMS or headless API connection.',
    ],
    methodology: [
      { step: 'Information Architecture', detail: 'Map user journeys, sitemaps, and conversion paths before visual styling.' },
      { step: 'Design System Tokens', detail: 'Establish typography, spacing rhythm, and accessible contrast across themes.' },
      { step: 'Component Engineering', detail: 'Build strongly typed, reusable sections with progressive image loading.' },
      { step: 'Verification & Launch', detail: 'Validate responsiveness, accessibility, metadata, and edge cache headers.' },
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js / Vite', 'Cloudflare Pages'],
    diagramKind: 'website',
    diagramCaption: 'Conceptual Interface Illustration — Responsive multi-breakpoint grid and edge-cached page architecture.',
    relatedSlugs: ['ui-ux-design-branding', 'seo-local-seo', 'website-maintenance-support'],
    faqs: [
      {
        question: 'Can our website expand later into a customer portal or SaaS application?',
        answer: 'Yes. We structure frontend components and typed data contracts cleanly so authentication, dashboards, and API endpoints can be layered in without rebuilding the marketing foundation.',
      },
      {
        question: 'Do you rely on heavy drag-and-drop page builders?',
        answer: 'No. We prioritize clean React and TypeScript codebases to avoid runtime bloat, security vulnerabilities in third-party plugins, and unpredictable layout shifts.',
      },
    ],
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    category: 'engineering',
    categoryLabel: 'Engineering',
    shortDescription:
      'Cross-platform iOS and Android applications engineered for offline resilience, clean ergonomics, and shared API contracts.',
    heroSummary:
      'Build dependable mobile products with intuitive touch ergonomics, disciplined state management, and unified backend integration.',
    overview:
      'Modern mobile users expect instant responsiveness even on congested cellular networks. We design and engineer mobile applications for iOS and Android that pair clear native-feeling navigation with predictable synchronization against secure cloud APIs.',
    challenges: [
      'Maintaining feature parity between iOS and Android without duplicating entire engineering teams.',
      'Handling intermittent connectivity gracefully so field teams or customers never lose unsaved actions.',
      'Keeping touch targets, typography, and gesture navigation comfortable across compact and large phone screens.',
    ],
    approach: [
      'Share TypeScript validation schemas and API client contracts across web and mobile surfaces.',
      'Implement optimistic local state caching and explicit retry queues for unstable network transitions.',
      'Design thumb-friendly navigation hierarchies tested across standard Android and iPhone viewport dimensions.',
    ],
    capabilities: [
      'Cross-platform iOS and Android application development',
      'Role-scoped authentication and encrypted local token storage',
      'Offline-tolerant form workflows and background synchronization patterns',
      'Push notification routing and deep-link navigation architecture',
    ],
    benefits: [
      'Unified product logic between mobile clients and web admin dashboards.',
      'Lower long-term maintenance cost through shared domain types and clean modular screens.',
      'Consistent interface quality tailored to mid-range Android devices as well as flagship hardware.',
    ],
    methodology: [
      { step: 'Flow & Ergonomic Mapping', detail: 'Define core mobile journeys, offline boundaries, and device permissions.' },
      { step: 'Interactive Prototyping', detail: 'Validate touch targets, navigation tabs, and error states early.' },
      { step: 'Client & API Integration', detail: 'Connect screens to versioned REST/edge endpoints with strict typing.' },
      { step: 'Device Matrix QA', detail: 'Test across viewport sizes, slow networks, and release packaging checks.' },
    ],
    techStack: ['React Native / Expo', 'TypeScript', 'REST / Edge APIs', 'SQLite Local Cache', 'Cloudflare Workers'],
    diagramKind: 'mobile',
    diagramCaption: 'Conceptual Interface Illustration — Synchronized Android & iOS client views backed by a unified API gateway.',
    relatedSlugs: ['api-development-integrations', 'ui-ux-design-branding', 'custom-software-development'],
    faqs: [
      {
        question: 'Should we start with a cross-platform codebase or separate native apps?',
        answer: 'For most business, SaaS, and consumer applications, a shared TypeScript cross-platform architecture delivers faster iteration while allowing native modules where hardware integration demands it.',
      },
      {
        question: 'How do mobile apps connect to your web backend?',
        answer: 'Both web and mobile clients consume the same versioned API contracts with token-based authentication and schema validation.',
      },
    ],
  },
  {
    slug: 'custom-software-development',
    name: 'Custom Software Development',
    category: 'engineering',
    categoryLabel: 'Engineering',
    shortDescription:
      'Tailored internal platforms, multi-tenant SaaS systems, and domain-specific software built around your exact operational rules.',
    heroSummary:
      'Replace fragmented spreadsheets and rigid off-the-shelf tools with purpose-built software aligned to your business logic.',
    overview:
      'Off-the-shelf software often forces growing organizations into awkward manual workarounds. Suvra Technologies architects custom web applications, SaaS platforms, and internal operational systems designed around clear domain boundaries, role-based security, and long-term extensibility.',
    challenges: [
      'Critical workflows scattered across disconnected spreadsheets, chat threads, and legacy tools.',
      'Software that becomes fragile or prohibitively expensive to modify as business rules evolve.',
      'Lack of granular permissions, audit trails, or multi-tenant data isolation.',
    ],
    approach: [
      'Model domain entities and relational schemas explicitly before writing application UI.',
      'Enforce authorization, validation, and business invariants strictly on the server/edge boundary.',
      'Build modular interfaces with clear separation between data-fetching adapters and presentation components.',
    ],
    capabilities: [
      'Multi-tenant SaaS application architecture and role-scoped workspaces',
      'Operational admin dashboards with tabular inspection and audit logs',
      'Document workflows, approval pipelines, and structured reporting exports',
      'Incremental legacy system modernization without disruptive cutovers',
    ],
    benefits: [
      'Software tailored precisely to your operational vocabulary and approval rules.',
      'Maintainable TypeScript codebases documented with architectural decision records.',
      'Clean readiness for future mobile clients, partner APIs, and automated reporting.',
    ],
    methodology: [
      { step: 'Domain Discovery', detail: 'Audit current operational bottlenecks, user roles, and edge cases.' },
      { step: 'Data & Boundary Design', detail: 'Define relational entities, RBAC matrices, and API contracts.' },
      { step: 'Iterative Delivery', detail: 'Ship vertical functional slices with automated type and validation gates.' },
      { step: 'Handover & Evolution', detail: 'Provide full documentation, deployment runbooks, and roadmap support.' },
    ],
    techStack: ['TypeScript', 'React / Next.js', 'Hono', 'Cloudflare D1 / PostgreSQL', 'Drizzle ORM'],
    diagramKind: 'custom-software',
    diagramCaption: 'Conceptual Architecture Diagram — Modular domain core isolating tenant workspaces, RBAC rules, and relational persistence.',
    relatedSlugs: ['crm-erp-solutions', 'api-development-integrations', 'cloud-devops'],
    faqs: [
      {
        question: 'Can you build software incrementally rather than waiting for a massive release?',
        answer: 'Yes. We structure releases around high-priority operational modules so your team can validate real workflows early.',
      },
      {
        question: 'Who owns the source code and architecture documentation?',
        answer: 'All deliverables are structured cleanly for client ownership, full repository handover, and independent long-term maintenance.',
      },
    ],
  },
  {
    slug: 'ecommerce-development',
    name: 'E-commerce Development',
    category: 'engineering',
    categoryLabel: 'Engineering',
    shortDescription:
      'High-conversion digital storefronts, catalog architectures, and checkout integrations engineered for speed and operational clarity.',
    heroSummary:
      'Create fast, trustworthy online retail experiences with structured catalog filtering, clean product presentation, and dependable order flows.',
    overview:
      'Every second of checkout friction or slow catalog rendering costs customer trust. We build modern e-commerce storefronts and custom commerce workflows that balance crisp product merchandising with reliable inventory, tax, and payment gateway integrations.',
    challenges: [
      'Sluggish product filtering and category pages on mobile cellular connections.',
      'Complex multi-step checkouts that confuse shoppers or fail gracefully on payment retries.',
      'Disconnected inventory records between online storefronts and warehouse or billing tools.',
    ],
    approach: [
      'Architect fast edge-cached catalog browsing with instant client-side state updates and clean URLs.',
      'Integrate payment gateways and webhook verification strictly via server-side signed endpoints.',
      'Design intuitive product detail layouts, transparent shipping/tax breakdowns, and accessible cart drawers.',
    ],
    capabilities: [
      'Custom B2C and B2B digital storefront engineering',
      'Faceted catalog search, variant selection, and inventory-aware cart flows',
      'Payment gateway, invoicing, and shipping carrier API integrations',
      'Order management dashboards and webhook event reconciliation',
    ],
    benefits: [
      'Faster mobile product discovery and streamlined checkout completion.',
      'Reduced manual order reconciliation errors through automated webhook processing.',
      'Scalable product catalog architecture ready for seasonal traffic spikes.',
    ],
    methodology: [
      { step: 'Catalog & Checkout Audit', detail: 'Map SKU attributes, pricing rules, regional taxes, and fulfillment steps.' },
      { step: 'Storefront UX Design', detail: 'Craft distraction-free product cards, galleries, and mobile cart controls.' },
      { step: 'Gateway & Inventory Wiring', detail: 'Implement signed webhooks, idempotent order creation, and notifications.' },
      { step: 'Load & Edge Testing', detail: 'Verify checkout edge cases, payment failure recovery, and caching behavior.' },
    ],
    techStack: ['React / Next.js', 'TypeScript', 'Cloudflare Workers', 'R2 Media Storage', 'Payment Webhooks'],
    diagramKind: 'ecommerce',
    diagramCaption: 'Conceptual Interface Illustration — Faceted catalog storefront connected to idempotent order and webhook processing.',
    relatedSlugs: ['website-development', 'seo-local-seo', 'api-development-integrations'],
    faqs: [
      {
        question: 'Can you integrate Indian and international payment gateways?',
        answer: 'Yes. We design clean server-side payment adapter layers compatible with standard domestic and international payment providers via official APIs and signed webhooks.',
      },
      {
        question: 'How are product images optimized for slower mobile networks?',
        answer: 'Media assets are served through edge object storage with responsive sizing, lazy loading below the fold, and stable container dimensions to prevent layout shift.',
      },
    ],
  },
  {
    slug: 'ai-business-automation',
    name: 'AI & Business Automation',
    category: 'intelligence',
    categoryLabel: 'Intelligence',
    shortDescription:
      'Practical workflow automation and structured AI pipelines that reduce repetitive manual triage without sacrificing human oversight.',
    heroSummary:
      'Apply AI where it solves concrete operational bottlenecks—document classification, workflow routing, and structured data extraction.',
    overview:
      'AI delivers lasting business value only when embedded cleanly into real operational workflows with guardrails, auditability, and deterministic fallbacks. We build automation pipelines that connect forms, emails, documents, and internal tools while keeping humans in control of critical decisions.',
    challenges: [
      'High-volume manual data entry, document categorization, and repetitive ticket routing.',
      'Fragile automation scripts that fail silently without observability or retry policies.',
      'Concerns over data privacy, hallucinated outputs, or unverified AI actions affecting customers.',
    ],
    approach: [
      'Combine deterministic validation rules with scoped AI classification or summarization steps.',
      'Enforce strict JSON schema outputs, confidence thresholds, and human-review queues for exceptions.',
      'Keep API keys and model prompts strictly server-side with logged execution traces.',
    ],
    capabilities: [
      'Automated document parsing and structured data extraction',
      'Lead qualification, ticket triage, and CRM enrichment workflows',
      'Event-driven background pipelines connecting webhooks and internal tools',
      'Human-in-the-loop approval dashboards for sensitive automations',
    ],
    benefits: [
      'Fewer repetitive manual handoffs across operations, support, and sales teams.',
      'Predictable, schema-validated outputs instead of brittle unstructured text.',
      'Clear audit logs showing what triggered an automated workflow and why.',
    ],
    methodology: [
      { step: 'Workflow Bottleneck Mapping', detail: 'Identify high-frequency manual tasks suitable for deterministic or AI automation.' },
      { step: 'Guardrail & Schema Design', detail: 'Define input sanitization, output schemas, and fallback routing.' },
      { step: 'Pipeline Implementation', detail: 'Build resilient webhook triggers, queues, and idempotent connectors.' },
      { step: 'Evaluation & Monitoring', detail: 'Test edge cases and track failure/retry paths before production rollout.' },
    ],
    techStack: ['TypeScript', 'Cloudflare Workers & Queues', 'Structured LLM APIs', 'Hono', 'Webhook Pipelines'],
    diagramKind: 'ai-automation',
    diagramCaption: 'Conceptual Workflow Diagram — Event intake, schema-validated AI processing, guardrail check, and human-escalation queue.',
    relatedSlugs: ['ai-chatbots-agents', 'api-development-integrations', 'crm-erp-solutions'],
    faqs: [
      {
        question: 'Do we need AI for every step of an automation workflow?',
        answer: 'No. We use deterministic code wherever rules are exact, reserving AI models strictly for unstructured classification, extraction, or drafting tasks.',
      },
      {
        question: 'How are sensitive API credentials protected?',
        answer: 'All model calls and integration secrets execute strictly on server-side or edge worker environments, never exposed in browser bundles.',
      },
    ],
  },
  {
    slug: 'ai-chatbots-agents',
    name: 'AI Chatbots & Agents',
    category: 'intelligence',
    categoryLabel: 'Intelligence',
    shortDescription:
      'Grounded conversational assistants and task-oriented agents connected safely to verified knowledge bases and structured actions.',
    heroSummary:
      'Deploy disciplined conversational interfaces that answer from verified documentation and escalate seamlessly to your human team.',
    overview:
      'Generic chatbots frustrate users when they invent answers or trap visitors in loops. We engineer retrieval-grounded assistants and controlled task agents constrained to approved knowledge sources, clear citation boundaries, and clean handoff paths to email, WhatsApp, or support desks.',
    challenges: [
      'Unconstrained chatbots fabricating company policies, pricing, or unsupported promises.',
      'Assistants that cannot access live order, booking, or account context securely.',
      'Poor mobile chat ergonomics and dead-end conversations without human escalation.',
    ],
    approach: [
      'Ground responses in curated knowledge documents with explicit refusal behavior when information is absent.',
      'Expose only tightly scoped, permission-checked tool functions to task agents.',
      'Provide instant escalation controls connecting users to live support channels.',
    ],
    capabilities: [
      'Website and product-embedded knowledge assistants',
      'Retrieval-augmented search over approved documentation and FAQs',
      'Scoped tool-calling agents for guided enquiry intake and scheduling',
      'Seamless human handoff to CRM tickets, email, or WhatsApp',
    ],
    benefits: [
      'Consistent, policy-aligned customer responses available around the clock.',
      'Lower risk of off-brand or hallucinated commitments through strict grounding.',
      'Structured conversation summaries passed directly to your team on escalation.',
    ],
    methodology: [
      { step: 'Knowledge & Scope Audit', detail: 'Curate verified source documents and define strict refusal boundaries.' },
      { step: 'Tool & Permission Modeling', detail: 'Specify read/write actions an agent may invoke under user session limits.' },
      { step: 'Interface & Streaming UI', detail: 'Build accessible chat surfaces with keyboard support and clear disclaimers.' },
      { step: 'Red-Team & Accuracy QA', detail: 'Test adversarial prompts, out-of-scope queries, and fallback handoffs.' },
    ],
    techStack: ['TypeScript', 'Server-Side AI SDKs', 'Vector / Document Indexing', 'Cloudflare Workers', 'Accessible React UI'],
    diagramKind: 'ai-agents',
    diagramCaption: 'Conceptual Architecture Diagram — Query sanitization, verified knowledge retrieval, scoped tool boundary, and human handoff.',
    relatedSlugs: ['ai-business-automation', 'website-development', 'api-development-integrations'],
    faqs: [
      {
        question: 'How do you prevent an AI assistant from making up pricing or guarantees?',
        answer: 'We restrict responses to indexed, approved knowledge sources, enforce structured system constraints, and route unverified questions directly to human follow-up.',
      },
      {
        question: 'Can conversational agents integrate with our existing CRM or enquiry workflow?',
        answer: 'Yes. Verified leads or support requests can be structured into typed payloads and dispatched via authenticated backend webhooks.',
      },
    ],
  },
  {
    slug: 'crm-erp-solutions',
    name: 'CRM & ERP Solutions',
    category: 'intelligence',
    categoryLabel: 'Intelligence',
    shortDescription:
      'Unified customer pipeline, inventory, billing, and operational resource systems engineered around your real business processes.',
    heroSummary:
      'Consolidate customer relationships, internal approvals, and resource tracking into a single coherent operational platform.',
    overview:
      'Growing teams outgrow disconnected spreadsheets long before monolithic enterprise suites make sense. We design and implement tailored CRM and ERP web systems that align sales pipelines, project delivery, invoicing records, and role-based reporting in one clean interface.',
    challenges: [
      'Duplicate customer records and inconsistent status tracking across sales and delivery teams.',
      'Bloated enterprise ERP software where staff use less than ten percent of complex screens.',
      'Lack of real-time visibility into pending approvals, project stages, or billing milestones.',
    ],
    approach: [
      'Design clean, task-focused operational tables, pipeline stages, and filtered views with tabular clarity.',
      'Enforce server-side role permissions across sales, finance, operations, and executive views.',
      'Build import/export pipelines and API hooks to connect accounting, messaging, and web forms.',
    ],
    capabilities: [
      'Lead and client pipeline management with structured activity history',
      'Order, inventory, vendor, and invoice workflow tracking',
      'Role-based operational dashboards and permission matrices',
      'CSV/structured exports and third-party accounting or notification sync',
    ],
    benefits: [
      'Higher team adoption through clean, uncluttered operational interfaces.',
      'Single source of truth connecting initial enquiry intake through delivery.',
      'Extensible relational schemas built to accommodate future modules.',
    ],
    methodology: [
      { step: 'Process & Role Mapping', detail: 'Document every lifecycle stage from lead intake to fulfillment and reporting.' },
      { step: 'Schema & RBAC Design', detail: 'Model relational entities, audit logs, and department-level access rules.' },
      { step: 'Workspace Engineering', detail: 'Build fast searchable tables, detail drawers, and validated entry forms.' },
      { step: 'Migration & Onboarding', detail: 'Structure clean CSV imports and train operational teams.' },
    ],
    techStack: ['React', 'TypeScript', 'Cloudflare D1 / PostgreSQL', 'Drizzle ORM', 'Zero Trust Access'],
    diagramKind: 'crm-erp',
    diagramCaption: 'Conceptual Interface Illustration — Unified client pipeline, approval gates, and role-governed operational ledger.',
    relatedSlugs: ['custom-software-development', 'ai-business-automation', 'it-consulting'],
    faqs: [
      {
        question: 'Can we start with a focused CRM module and add inventory or billing later?',
        answer: 'Yes. Modular relational schemas allow you to launch core pipeline tracking first and expand into resource planning as operations grow.',
      },
      {
        question: 'How is sensitive internal business data protected?',
        answer: 'Administrative consoles are designed for Zero-Trust perimeter access, encrypted transport, and strict server-side role checks.',
      },
    ],
  },
  {
    slug: 'ui-ux-design-branding',
    name: 'UI/UX Design & Branding',
    category: 'digital',
    categoryLabel: 'Digital',
    shortDescription:
      'Cohesive visual identity systems, interface design tokens, interactive prototypes, and accessible component libraries.',
    heroSummary:
      'Craft unmistakable digital brand systems backed by rigorous typography, spatial math, and production-ready UI specifications.',
    overview:
      'Great design is how a product communicates trust and clarity before a user reads a second paragraph. We pair brand visual systems with practical interface engineering—delivering design tokens, responsive page layouts, and interactive prototypes built to survive real-world content.',
    challenges: [
      'Websites and apps that look generic, cluttered, or inconsistent across different screens.',
      'Beautiful static mockups that break down when implemented with real dynamic copy.',
      'Poor color contrast and cramped mobile controls that alienate users.',
    ],
    approach: [
      'Define disciplined color palettes, typographic scales, spacing grids, and light/dark semantic tokens.',
      'Design directly for real viewport breakpoints from 320px mobile to 1920px desktop.',
      'Verify WCAG 2.2 AA contrast and interactive focus states throughout every component.',
    ],
    capabilities: [
      'Digital brand guidelines, color tokens, and typographic hierarchies',
      'Web and mobile UI/UX wireframing and high-fidelity interface design',
      'Dual-theme (light and dark mode) design system engineering',
      'Reusable accessible React/Tailwind component specifications',
    ],
    benefits: [
      'Stronger brand differentiation that avoids generic template aesthetics.',
      'Faster frontend implementation because design tokens map directly to CSS variables.',
      'Improved usability and accessibility across diverse user devices.',
    ],
    methodology: [
      { step: 'Brand & Audience Alignment', detail: 'Clarify positioning, visual personality, and primary user tasks.' },
      { step: 'System Foundations', detail: 'Establish grid rhythm, type pairings, and semantic light/dark color tokens.' },
      { step: 'Screen & State Design', detail: 'Design empty, loading, error, and responsive states—not just ideal views.' },
      { step: 'Developer Handoff', detail: 'Deliver documented tokens and production-ready component markup.' },
    ],
    techStack: ['Design Tokens', 'Tailwind CSS', 'Figma / Interactive Prototypes', 'WCAG 2.2 AA', 'Motion'],
    diagramKind: 'ui-ux',
    diagramCaption: 'Conceptual System Illustration — Semantic light/dark token architecture, typographic scale, and responsive grid system.',
    relatedSlugs: ['website-development', 'mobile-app-development', 'digital-marketing'],
    faqs: [
      {
        question: 'Do you design both light and dark modes intentionally?',
        answer: 'Yes. We establish paired surface, border, and text tokens for each mode rather than applying automated color inversions.',
      },
      {
        question: 'Can you redesign an existing product without halting feature work?',
        answer: 'Yes. By introducing design tokens and modular components incrementally, existing applications can modernize cleanly.',
      },
    ],
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    category: 'digital',
    categoryLabel: 'Digital',
    shortDescription:
      'Structured digital acquisition funnels, conversion landing pages, and transparent campaign measurement without vanity metrics.',
    heroSummary:
      'Connect clear market positioning with high-performing landing pages and measurable enquiry pipelines.',
    overview:
      'Paid campaigns and outreach fail when they send traffic to slow, confusing pages without clear tracking. We align messaging strategy, dedicated conversion landing pages, and clean analytics instrumentation so businesses understand where qualified enquiries originate.',
    challenges: [
      'Ad spend directed to generic homepages with unclear calls to action.',
      'Reporting focused on impressions rather than qualified enquiries and pipeline progression.',
      'Disconnected landing pages, CRM intake forms, and follow-up channels.',
    ],
    approach: [
      'Pair campaign messaging with fast, focused landing experiences tailored to user intent.',
      'Implement privacy-conscious event tracking tied directly to enquiry actions.',
      'Deliver clear, honest campaign reporting without inflated vanity metrics.',
    ],
    capabilities: [
      'Conversion-focused landing page architecture and copy structuring',
      'Search and social campaign planning and creative direction',
      'Enquiry funnel instrumentation and attribution alignment',
      'Content calendars and multi-channel B2B/B2C outreach support',
    ],
    benefits: [
      'Higher clarity on which channels generate genuine business conversations.',
      'Tighter alignment between ad messaging and on-page experience.',
      'Reusable landing templates built directly into your core website architecture.',
    ],
    methodology: [
      { step: 'Audience & Offer Clarity', detail: 'Define target segments, core value propositions, and qualifying questions.' },
      { step: 'Landing Experience', detail: 'Build fast, distraction-free pages connected to validated enquiry forms.' },
      { step: 'Campaign Launch', detail: 'Configure structured campaigns with clean UTM and conversion tracking.' },
      { step: 'Iterative Refinement', detail: 'Evaluate lead quality and refine messaging based on observed data.' },
    ],
    techStack: ['Conversion Landing Pages', 'Structured Analytics', 'UTM Attribution', 'Search & Social Channels'],
    diagramKind: 'digital-marketing',
    diagramCaption: 'Conceptual Funnel Diagram — Intent-aligned campaign entry, fast landing page, and validated enquiry attribution.',
    relatedSlugs: ['seo-local-seo', 'website-development', 'ui-ux-design-branding'],
    faqs: [
      {
        question: 'Do you guarantee a specific number of leads or return on ad spend?',
        answer: 'No. Honest marketing depends on market competition, offer strength, and budget. We focus on building high-clarity funnels and transparent measurement rather than making unsupported guarantees.',
      },
      {
        question: 'Do you build the landing pages needed for campaigns?',
        answer: 'Yes. Because we are an engineering-led company, we build fast, responsive landing pages directly inside your website architecture.',
      },
    ],
  },
  {
    slug: 'seo-local-seo',
    name: 'SEO & Local SEO',
    category: 'digital',
    categoryLabel: 'Digital',
    shortDescription:
      'Technical search architecture, structured data, clean URL hierarchies, and regional discoverability built without spammy tactics.',
    heroSummary:
      'Strengthen organic discoverability through technical speed, semantic structure, and genuinely helpful regional and service content.',
    overview:
      'Sustainable search visibility starts in the codebase. We combine technical SEO fundamentals—clean semantic HTML, canonical discipline, structured Schema.org metadata, and Core Web Vitals optimization—with substantive regional and topic-cluster architecture tailored for Indian and global search intent.',
    challenges: [
      'Single-page sites with duplicate metadata, missing canonicals, or broken crawl paths.',
      'Thin doorway location pages that offer zero real value to readers or search engines.',
      'Slow mobile rendering dragging down organic visibility and user retention.',
    ],
    approach: [
      'Enforce unique page titles, concise meta descriptions, clean heading hierarchies, and valid JSON-LD schemas.',
      'Structure sitemaps, robots directives, and internal cross-linking intentionally.',
      'Craft genuinely informative regional and industry pages without deceptive office claims.',
    ],
    capabilities: [
      'Technical SEO audits and Core Web Vitals remediation',
      'Structured data (Organization, Service, FAQPage, BreadcrumbList) implementation',
      'Local SEO and regional service-area content architecture',
      'Information architecture, internal linking, and crawl hygiene',
    ],
    benefits: [
      'Search engines accurately understand your services, industries, and geographic focus.',
      'Cleaner social link previews across LinkedIn, WhatsApp, and search snippets.',
      'Durable organic foundations free from risky black-hat shortcuts.',
    ],
    methodology: [
      { step: 'Technical & Crawl Audit', detail: 'Inspect indexing controls, canonicals, sitemaps, and performance bottlenecks.' },
      { step: 'Semantic Structuring', detail: 'Align headings, internal links, and schema markup across all routes.' },
      { step: 'Content Architecture', detail: 'Develop helpful service, industry, and educational guides.' },
      { step: 'Measurement & Tuning', detail: 'Track search console impressions and refine underperforming pages.' },
    ],
    techStack: ['Semantic HTML5', 'JSON-LD Structured Data', 'XML Sitemaps', 'Core Web Vitals', 'Search Console'],
    diagramKind: 'seo',
    diagramCaption: 'Conceptual Architecture Diagram — Semantic page hierarchy, JSON-LD structured entities, and regional discovery alignment.',
    relatedSlugs: ['website-development', 'digital-marketing', 'website-maintenance-support'],
    faqs: [
      {
        question: 'How do you handle multi-city or regional SEO ethically?',
        answer: 'We present service coverage areas transparently without claiming fictitious physical branch offices, and ensure every regional page provides genuine local context.',
      },
      {
        question: 'Are SEO foundations included when you build a new website?',
        answer: 'Yes. Semantic structure, metadata, open graph cards, robots/sitemap templates, and performance discipline are built into our standard web engineering.',
      },
    ],
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure',
    shortDescription:
      'Cloudflare-first edge infrastructure, CI/CD pipelines, container workflows, and selective Oracle Cloud compute architectures.',
    heroSummary:
      'Deploy resilient, cost-disciplined cloud environments anchored on Cloudflare edge services and justified backend compute.',
    overview:
      'Over-engineered cloud setups inflate monthly bills while introducing unnecessary operational fragility. Suvra Technologies follows a Cloudflare-first infrastructure philosophy—leveraging global edge workers, zero-egress R2 storage, and Zero Trust security, paired with Oracle Cloud Infrastructure where stateful compute or relational capacity warrants it.',
    challenges: [
      'Unpredictable cloud egress and idle virtual machine expenses.',
      'Manual deployments prone to configuration drift and downtime.',
      'Origin servers exposed directly to public internet scanning and traffic spikes.',
    ],
    approach: [
      'Terminate public traffic at Cloudflare with WAF rules, rate limiting, and edge caching.',
      'Keep static assets and media on Cloudflare Pages and R2 to eliminate egress surprises.',
      'Use automated CI/CD checks, environment separation, and encrypted tunnels to backend compute.',
    ],
    capabilities: [
      'Cloudflare Pages, Workers, D1, R2, and Turnstile architecture setup',
      'Automated Git-based CI/CD build, lint, and deployment pipelines',
      'Origin shielding via Cloudflare Tunnel and Zero Trust access controls',
      'Secondary backup strategies and disaster recovery runbooks',
    ],
    benefits: [
      'Lower baseline infrastructure cost with predictable scaling characteristics.',
      'Faster global response times via distributed edge execution.',
      'Repeatable, documented deployments with clear rollback paths.',
    ],
    methodology: [
      { step: 'Workload Profiling', detail: 'Separate static/edge workloads from stateful compute requirements.' },
      { step: 'Topology Blueprinting', detail: 'Define DNS, TLS, storage buckets, databases, and tunnel boundaries.' },
      { step: 'Pipeline Automation', detail: 'Automate build verification, type checks, and staged rollouts.' },
      { step: 'Hardening & Runbooks', detail: 'Document backup schedules, secret rotation, and incident steps.' },
    ],
    techStack: ['Cloudflare Workers', 'Cloudflare Pages & R2', 'Cloudflare D1', 'Oracle Cloud (OCI)', 'GitHub Actions'],
    diagramKind: 'cloud-devops',
    diagramCaption: 'Conceptual Topology — Cloudflare edge ingress, WAF, Workers, R2 storage, and tunnel-shielded OCI stateful origin.',
    relatedSlugs: ['api-development-integrations', 'it-consulting', 'website-maintenance-support'],
    faqs: [
      {
        question: 'Why does Suvra Technologies prioritize a Cloudflare-first strategy?',
        answer: 'Cloudflare consolidates DNS, TLS, WAF, edge compute, and zero-egress object storage in one global network, keeping latency low and infrastructure bills predictable.',
      },
      {
        question: 'When do you recommend adding Oracle Cloud Infrastructure?',
        answer: 'When workloads require sustained heavy compute, long-running background jobs, or dedicated relational/container infrastructure that exceeds edge isolate limits.',
      },
    ],
  },
  {
    slug: 'it-consulting',
    name: 'IT Consulting',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure',
    shortDescription:
      'Pragmatic technical advisory, architecture audits, build-vs-buy evaluations, and phased digital roadmaps for leadership teams.',
    heroSummary:
      'Make confident technology investments backed by clear architectural trade-offs, cost modeling, and honest technical assessments.',
    overview:
      'Technology choices carry multi-year operational consequences. Before committing budget to custom engineering or vendor contracts, our consulting practice helps founders and operational leaders evaluate system architectures, identify root causes of existing bottlenecks, and define realistic phased execution roadmaps.',
    challenges: [
      'Conflicting vendor recommendations without transparent cost or lock-in analysis.',
      'Existing software systems struggling with slow queries, security debt, or brittle deployments.',
      'Unclear technical sequencing when launching a new digital product or internal platform.',
    ],
    approach: [
      'Conduct structured codebase, infrastructure, and workflow audits grounded in evidence.',
      'Present explicit build-vs-buy trade-offs without pushing unnecessary complexity.',
      'Deliver written Architecture Decision Records (ADRs) and prioritized execution phases.',
    ],
    capabilities: [
      'System architecture reviews and scalability readiness assessments',
      'Cloud cost optimization and vendor lock-in reduction planning',
      'Technical due diligence and legacy modernization roadmaps',
      'MVP scoping and engineering stack selection for startups and SMEs',
    ],
    benefits: [
      'Reduced risk of costly architectural rewrites six months after launch.',
      'Clear alignment between business priorities and engineering sequence.',
      'Objective documentation your internal or external teams can execute against.',
    ],
    methodology: [
      { step: 'Stakeholder & System Audit', detail: 'Review business goals, existing repositories, hosting bills, and constraints.' },
      { step: 'Bottleneck & Risk Analysis', detail: 'Identify single points of failure, security gaps, and unnecessary spend.' },
      { step: 'Option & Cost Matrix', detail: 'Compare practical paths with explicit maintenance and staffing trade-offs.' },
      { step: 'Roadmap Delivery', detail: 'Present a phased technical blueprint ready for immediate execution.' },
    ],
    techStack: ['Architecture Decision Records', 'Security Audits', 'Cloudflare & OCI Modeling', 'System Design'],
    diagramKind: 'it-consulting',
    diagramCaption: 'Conceptual Decision Matrix — Structured evaluation of complexity, operational cost, security posture, and scalability.',
    relatedSlugs: ['cloud-devops', 'custom-software-development', 'crm-erp-solutions'],
    faqs: [
      {
        question: 'Can we engage Suvra Technologies purely for an architecture review before building?',
        answer: 'Yes. Many organizations begin with a focused consulting engagement to validate scope, stack selection, and budget priorities before full development.',
      },
      {
        question: 'What deliverables do we receive from an IT consulting engagement?',
        answer: 'You receive written architectural diagrams, documented trade-offs, security recommendations, and a prioritized implementation roadmap.',
      },
    ],
  },
  {
    slug: 'api-development-integrations',
    name: 'API Development & Integrations',
    category: 'engineering',
    categoryLabel: 'Engineering',
    shortDescription:
      'Contract-first REST and edge APIs, webhook pipelines, and resilient third-party integrations across web, mobile, and enterprise tools.',
    heroSummary:
      'Connect internal databases, mobile apps, payment providers, and partner systems through clean, typed, well-documented APIs.',
    overview:
      'Modern digital ecosystems rely on dependable communication between disparate platforms. We design and build contract-first APIs using TypeScript, Hono, and edge/cloud runtimes—enforcing schema validation, idempotency, rate limits, and resilient retry handling across every integration boundary.',
    challenges: [
      'Undocumented API endpoints causing breaking changes between frontend, mobile, and backend teams.',
      'Failed third-party webhooks resulting in lost orders, out-of-sync records, or duplicate charges.',
      'Insecure integration endpoints lacking signature verification or input sanitization.',
    ],
    approach: [
      'Define typed request/response schemas and consistent error envelopes up front.',
      'Verify webhook signatures, enforce idempotency keys, and implement bounded exponential retries.',
      'Keep all integration keys strictly inside server/worker secrets.',
    ],
    capabilities: [
      'Edge-ready REST APIs built with Hono and strict TypeScript schemas',
      'Payment gateway, messaging, CRM, and ERP system integrations',
      'Signed webhook consumers and outbound event dispatchers',
      'API gateway rate limiting, authentication middleware, and documentation',
    ],
    benefits: [
      'Web, mobile, and partner clients integrate reliably against one canonical API.',
      'Fewer silent sync failures through structured error logging and idempotent handling.',
      'Cleaner security boundaries at the network edge.',
    ],
    methodology: [
      { step: 'Contract Specification', detail: 'Define endpoints, auth headers, status codes, and payload schemas.' },
      { step: 'Gateway & Middleware', detail: 'Implement validation, rate limits, and token/signature verification.' },
      { step: 'Integration Resilience', detail: 'Add idempotency guards, timeouts, and structured error handling.' },
      { step: 'Contract Testing', detail: 'Verify happy paths, malformed inputs, and downstream outage behavior.' },
    ],
    techStack: ['Hono', 'TypeScript', 'Cloudflare Workers', 'OpenAPI 3.1', 'Drizzle ORM'],
    diagramKind: 'api-integrations',
    diagramCaption: 'Conceptual Architecture Diagram — Typed API gateway validating requests, enforcing rate limits, and routing to services.',
    relatedSlugs: ['custom-software-development', 'mobile-app-development', 'cloud-devops'],
    faqs: [
      {
        question: 'Do you support integrating legacy business tools that lack modern webhooks?',
        answer: 'Yes. We can build scheduled synchronization workers or adapter layers that bridge legacy exports with modern REST APIs safely.',
      },
      {
        question: 'Why use Hono and TypeScript for edge APIs?',
        answer: 'Hono runs cleanly on Cloudflare Workers and Node runtimes with minimal overhead, strong middleware ergonomics, and end-to-end TypeScript safety.',
      },
    ],
  },
  {
    slug: 'website-maintenance-support',
    name: 'Website Maintenance & Support',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure',
    shortDescription:
      'Proactive dependency hygiene, security patching, uptime checks, backup verification, and incremental feature updates.',
    heroSummary:
      'Keep production websites and web platforms fast, secure, and up to date long after initial launch day.',
    overview:
      'Software decays when dependencies, browser standards, and third-party APIs evolve without active stewardship. Our maintenance practice provides structured dependency updates, security header checks, content/UI refinements, and verified backup routines so your digital assets remain dependable.',
    challenges: [
      'Websites breaking unexpectedly after neglected framework or dependency updates.',
      'Missing SSL, DNS, or backup verification until an incident occurs.',
      'Slow turnaround when teams need small layout updates, new landing pages, or bug fixes.',
    ],
    approach: [
      'Perform scheduled dependency audits, type-checks, and build verification in staging before production.',
      'Monitor DNS, TLS certificates, form integrations, and Core Web Vitals health.',
      'Fix root causes cleanly rather than layering temporary CSS or script workarounds.',
    ],
    capabilities: [
      'Scheduled framework, package, and security vulnerability patching',
      'Staging validation, build checks, and rollback-safe releases',
      'Content updates, landing page additions, and UI refinements',
      'Backup verification and incident root-cause remediation',
    ],
    benefits: [
      'Reduced risk of sudden downtime or security exposure from outdated dependencies.',
      'Predictable ongoing stewardship without hiring a full-time internal web team.',
      'Continuous preservation of accessibility and performance standards.',
    ],
    methodology: [
      { step: 'Baseline Health Audit', detail: 'Inventory dependencies, hosting config, DNS/TLS, and backup state.' },
      { step: 'Staging Pipeline Setup', detail: 'Establish safe preview builds before pushing changes live.' },
      { step: 'Routine Maintenance Cycles', detail: 'Apply patches, verify forms/links, and review performance metrics.' },
      { step: 'Incremental Enhancements', detail: 'Ship requested UI improvements and new pages cleanly.' },
    ],
    techStack: ['Git Workflows', 'Cloudflare Pages', 'Automated Linting & Builds', 'Dependency Audits', 'DNS / TLS Hygiene'],
    diagramKind: 'maintenance',
    diagramCaption: 'Conceptual Lifecycle Diagram — Scheduled audit, staging build verification, safe rollout, and health monitoring.',
    relatedSlugs: ['website-development', 'cloud-devops', 'seo-local-seo'],
    faqs: [
      {
        question: 'Can you maintain a website that was originally built by another team?',
        answer: 'Yes, following an initial technical audit to assess codebase health, hosting access, and dependency status.',
      },
      {
        question: 'Do maintenance plans guarantee zero downtime?',
        answer: 'No provider can honestly guarantee 100% immunity to upstream outages, but disciplined staging checks, edge caching, and verified backups substantially reduce avoidable incidents.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: ServiceItem['category']): ServiceItem[] {
  return SERVICES_DATA.filter((service) => service.category === category);
}
