import type {
  BlogArticle,
  CareerRole,
  FAQItem,
  LocationCoverage,
  ProductDirection,
  ProjectConcept,
} from '../types/cms';

export const CAPABILITY_PILLARS = [
  'Software Engineering',
  'Artificial Intelligence',
  'Digital Transformation',
  'Product Innovation',
] as const;

export const COMPARISON_ROWS = [
  {
    dimension: 'Project Coordination',
    fragmented: 'Separate freelancers or agencies for design, web, backend, and cloud—leaving integration gaps for your team to resolve.',
    integrated: 'Single multidisciplinary engineering direction aligning UI/UX, APIs, security, and deployment under one architecture.',
  },
  {
    dimension: 'Scalability',
    fragmented: 'Monolithic templates or hasty scripts that require costly rewrites as traffic, tenants, or features grow.',
    integrated: 'Modular TypeScript domain contracts and Cloudflare-first edge delivery designed to expand across web, mobile, and SaaS.',
  },
  {
    dimension: 'Technology Integration',
    fragmented: 'Brittle point-to-point plugins and manual CSV exports connecting CRM, billing, and automation tools.',
    integrated: 'Contract-first REST APIs, signed webhooks, and schema-validated automation pipelines with clear error boundaries.',
  },
  {
    dimension: 'Long-Term Maintainability',
    fragmented: 'Undocumented codebases tied to heavy third-party plugins and opaque hosting setups.',
    integrated: 'Clean, dependency-lean codebases supported by explicit Architecture Decision Records and verification checks.',
  },
  {
    dimension: 'Design Consistency',
    fragmented: 'Inconsistent visual styling across marketing pages, admin consoles, and mobile screens.',
    integrated: 'Shared semantic design tokens, dual-theme light/dark architecture, and WCAG 2.2 AA accessibility standards.',
  },
  {
    dimension: 'Ongoing Support',
    fragmented: 'Reactive bug patches that mask symptoms without addressing underlying state or network issues.',
    integrated: 'Root-cause diagnostics, staged dependency updates, and structured maintenance workflows.',
  },
] as const;

export type TechEcosystemCategory =
  | 'Frontend & Mobile'
  | 'Cloudflare Edge'
  | 'Data & Backup'
  | 'Security & AI';

export const TECHNOLOGY_ECOSYSTEM: ReadonlyArray<{
  name: string;
  role: string;
  category: TechEcosystemCategory;
}> = [
  { name: 'Next.js', role: 'App Router & SSR Web', category: 'Frontend & Mobile' },
  { name: 'React', role: 'Component Interfaces', category: 'Frontend & Mobile' },
  { name: 'TypeScript', role: 'Strict Type Safety', category: 'Frontend & Mobile' },
  { name: 'Tailwind CSS', role: 'Design Token Styling', category: 'Frontend & Mobile' },
  { name: 'Cloudflare Workers', role: 'Global Edge Compute', category: 'Cloudflare Edge' },
  { name: 'Cloudflare Pages', role: 'Static & Edge Delivery', category: 'Cloudflare Edge' },
  { name: 'Hono', role: 'Lightweight Edge APIs', category: 'Cloudflare Edge' },
  { name: 'Cloudflare D1', role: 'Edge Relational SQL', category: 'Data & Backup' },
  { name: 'Drizzle ORM', role: 'Type-Safe Queries', category: 'Data & Backup' },
  { name: 'Cloudflare R2', role: 'Zero-Egress Storage', category: 'Data & Backup' },
  { name: 'Cloudflare Turnstile', role: 'Bot Protection', category: 'Security & AI' },
  { name: 'Cloudflare Zero Trust', role: 'Identity & Admin Access', category: 'Security & AI' },
  { name: 'Oracle Cloud (OCI)', role: 'Backup & Heavy Compute', category: 'Data & Backup' },
];

export const DEVELOPMENT_PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    summary:
      'Align on business objectives, operational constraints, user roles, and technical feasibility without unverified assumptions.',
    websiteOutput: 'Sitemap hierarchy, audience goals & content inventory',
    softwareOutput: 'Domain requirements, role boundaries & feasibility brief',
  },
  {
    step: '02',
    title: 'Strategy & Planning',
    summary:
      'Define information architecture, data models, API contracts, infrastructure posture, and phased delivery milestones.',
    websiteOutput: 'SEO route plan, conversion funnels & wireframes',
    softwareOutput: 'Typed data schemas, Hono/D1 contracts & milestone plan',
  },
  {
    step: '03',
    title: 'UI/UX Design',
    summary:
      'Establish responsive layouts, light/dark design tokens, accessible interactions, and interactive system diagrams.',
    websiteOutput: 'Dual-theme design tokens, responsive grids & visual system',
    softwareOutput: 'Component states, workspace workflows & error boundaries',
  },
  {
    step: '04',
    title: 'Engineering',
    summary:
      'Build modular frontend surfaces, strict TypeScript interfaces, and backend-ready integrations with clean code discipline.',
    websiteOutput: 'Static-first React/Next.js build & metadata automation',
    softwareOutput: 'API adapters, edge Workers logic & role-guarded modules',
  },
  {
    step: '05',
    title: 'Quality Assurance',
    summary:
      'Verify responsiveness from 320px to 1920px, keyboard accessibility, form validation states, and build integrity.',
    websiteOutput: 'Viewport responsiveness, WCAG contrast & link integrity checks',
    softwareOutput: 'Type-checking, payload validation & edge failure recovery tests',
  },
  {
    step: '06',
    title: 'Launch',
    summary:
      'Deploy via repeatable CI/CD pipelines with configured DNS, TLS, metadata hygiene, and rollback readiness.',
    websiteOutput: 'Cloudflare Pages edge launch, canonicals & sitemap activation',
    softwareOutput: 'Production Secrets, Turnstile protection & Zero Trust policies',
  },
  {
    step: '07',
    title: 'Ongoing Improvement',
    summary:
      'Maintain dependencies, refine conversion journeys, and evolve platforms cleanly into mobile, SaaS, or API phases.',
    websiteOutput: 'Content iterations, SEO tracking & dependency maintenance',
    softwareOutput: 'Mobile client expansion, OCI backup drills & schema evolution',
  },
] as const;

export const PRODUCT_DIRECTIONS: ProductDirection[] = [
  {
    id: 'software-products',
    category: 'Proprietary Software',
    title: 'Focused Operational & Workflow Software',
    status: 'Architecture Phase',
    summary:
      'Internal research toward modular workflow utilities designed for growing Indian and global SMBs seeking clarity over bloated enterprise suites.',
    focusAreas: ['Structured intake & approval tools', 'Clean tabular reporting', 'Edge-first low-cost hosting'],
  },
  {
    id: 'mobile-apps',
    category: 'Mobile Applications',
    title: 'Utility & Field-Ready Mobile Experiences',
    status: 'Concept & Research',
    summary:
      'Exploration of lightweight, offline-tolerant Android and iOS applications tailored for regional commerce, education, and operational teams.',
    focusAreas: ['Low-bandwidth resilience', 'Shared TypeScript API layer', 'Accessible mobile ergonomics'],
  },
  {
    id: 'saas-platforms',
    category: 'SaaS Platforms',
    title: 'Multi-Tenant Cloud Software Foundations',
    status: 'Planned Initiative',
    summary:
      'Reusable multi-tenant SaaS building blocks built on Cloudflare Workers, D1, R2, and Zero-Trust boundaries for future commercial product launches.',
    focusAreas: ['Tenant data isolation', 'Role-based access control', 'Predictable infrastructure unit economics'],
  },
  {
    id: 'ai-solutions',
    category: 'AI-Powered Solutions',
    title: 'Guardrailed Automation & Knowledge Systems',
    status: 'Concept & Research',
    summary:
      'Applied AI tooling centered on structured document workflows, grounded customer knowledge bases, and auditable business automation.',
    focusAreas: ['Schema-validated AI extraction', 'Verified source grounding', 'Human-in-the-loop escalation'],
  },
];

export const CONCEPT_PROJECTS: ProjectConcept[] = [
  {
    slug: 'cloudflare-edge-saas-blueprint',
    title: 'Multi-Tenant SaaS Workspace Architecture',
    category: 'Enterprise Systems',
    label: 'Architecture Blueprint',
    summary:
      'A reference architecture demonstrating tenant-isolated operational workspaces backed by Cloudflare Workers, Hono, D1, and Drizzle ORM.',
    challenge:
      'Early-stage SaaS platforms frequently face high fixed cloud bills or tangled tenant permissions when scaling beyond initial users.',
    approach:
      'Design a stateless edge API gateway enforcing scoped tenant context on every query, paired with an accessible dual-theme React workspace.',
    implementation: [
      'Contract-first TypeScript schemas shared across frontend and Hono API handlers',
      'Tenant-scoped middleware and server-side RBAC policy checks',
      'Zero-egress R2 document attachment flow using short-lived signed URLs',
    ],
    intendedOutcomes: [
      'Sub-second regional page delivery across edge POPs',
      'Predictable baseline hosting cost prior to heavy compute scaling',
      'Clean separation enabling future mobile client integration',
    ],
    stack: ['React', 'TypeScript', 'Hono', 'Cloudflare Workers', 'D1 & Drizzle ORM'],
  },
  {
    slug: 'grounded-intake-automation-concept',
    title: 'AI-Assisted Enquiry Triage & Routing Engine',
    category: 'AI & Automation',
    label: 'Concept Demonstration',
    summary:
      'A conceptual workflow demonstrating structured client intake validation, automated requirement classification, and human-reviewed CRM handoff.',
    challenge:
      'Unstructured contact emails and chat enquiries force technical teams to spend hours manually sorting scope, urgency, and required expertise.',
    approach:
      'Pair deterministic multi-step form capture with schema-validated AI summarization and explicit human approval before client communication.',
    implementation: [
      '4-step accessible intake wizard with field-level validation and Turnstile readiness',
      'Structured JSON categorization mapping enquiry scope to service disciplines',
      'Fallback email-draft and WhatsApp escalation paths for zero dropped leads',
    ],
    intendedOutcomes: [
      'Cleaner initial discovery calls with structured requirement briefs',
      'Zero unverified automated promises sent directly to prospective clients',
      'Auditable routing trail across sales and engineering leads',
    ],
    stack: ['TypeScript', 'Cloudflare Workers', 'Structured AI Schemas', 'Accessible Forms'],
  },
  {
    slug: 'regional-commerce-mobile-concept',
    title: 'Low-Bandwidth Mobile Commerce & Catalog System',
    category: 'Mobile & SaaS',
    label: 'Concept Demonstration',
    summary:
      'An interface and synchronization blueprint designed for retail merchants and buyers operating across variable mobile network conditions.',
    challenge:
      'Media-heavy retail apps often stall on congested networks, causing failed cart updates and frustrated regional shoppers.',
    approach:
      'Combine edge-optimized image sizing on R2 with optimistic local cart persistence and idempotent order submission APIs.',
    implementation: [
      'Compact payload catalog API with ETag caching',
      'Responsive thumb-zone navigation tested from 320px viewports upward',
      'Resilient retry queue for order status confirmation',
    ],
    intendedOutcomes: [
      'Reliable browsing experience on mid-range Android devices',
      'Elimination of duplicate order submissions during network drops',
      'Unified product catalog shared between web storefront and mobile app',
    ],
    stack: ['React Native / Web', 'TypeScript', 'Cloudflare R2', 'Edge REST APIs'],
  },
  {
    slug: 'enterprise-corporate-web-system',
    title: 'International B2B Technology Web Platform',
    category: 'Web Platforms',
    label: 'Concept Demonstration',
    summary:
      'A multi-route corporate architecture featuring mega-menu navigation, 14 service detail blueprints, dual-theme tokens, and technical SEO structure.',
    challenge:
      'Service-and-product technology firms often struggle to present broad capabilities clearly without overwhelming visitors or sacrificing page speed.',
    approach:
      'Organize services into four logical pillars (Engineering, Intelligence, Digital, Infrastructure) supported by dedicated, non-repetitive detail pages.',
    implementation: [
      'WCAG 2.2 AA light and dark themes powered by semantic CSS variables',
      'Original SVG technical diagrams tailored to each service discipline',
      'Static-first routing ready for Cloudflare Pages deployment',
    ],
    intendedOutcomes: [
      'Clear navigation across desktop mega-menus and mobile drawers',
      'Strong search and social metadata hygiene across every route',
      'Backend-ready API abstraction for future CMS and enquiry integration',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Cloudflare Pages'],
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'why-cloudflare-first-architecture-suits-growing-enterprises',
    title: 'Why a Cloudflare-First Architecture Suits Modern Scaling Businesses',
    category: 'Cloud Strategy',
    readTime: '5 min read',
    summary:
      'Examining how consolidating DNS, edge compute, zero-egress storage, and Zero Trust security reduces architectural sprawl and operational cost.',
    sections: [
      {
        heading: 'The hidden cost of premature multi-cloud complexity',
        body: [
          'Many growing software teams inherit sprawling cloud setups before they have the traffic or operational staff to justify them. Separate CDN vendors, NAT gateways, egress-heavy object buckets, and public origin servers multiply both monthly invoices and security surface area.',
          'Adopting a Cloudflare-first default reverses this sequence: static frontends, edge APIs, bot protection, and object storage run at the network edge first, while dedicated compute instances are provisioned only where workload profiles genuinely require them.',
        ],
      },
      {
        heading: 'Separating edge execution from heavy stateful compute',
        body: [
          'Edge isolates excel at authentication verification, routing, caching, and lightweight relational reads. When an application introduces sustained CPU jobs, complex analytics, or specialized runtimes, pairing Cloudflare Tunnel shielding with Oracle Cloud Infrastructure provides predictable capacity without exposing origin IPs.',
        ],
      },
    ],
    relatedSlugs: ['designing-backend-ready-frontends', 'practical-guardrails-for-business-ai-automation'],
  },
  {
    slug: 'designing-backend-ready-frontends',
    title: 'Designing Backend-Ready Frontends Without Over-Engineering',
    category: 'Architecture',
    readTime: '4 min read',
    summary:
      'How strict TypeScript contracts, clean service adapters, and honest UI states prepare a frontend for seamless API integration.',
    sections: [
      {
        heading: 'Isolate data transport from UI components',
        body: [
          'Components should never care whether data originates from a local typed fixture during early prototyping or a Hono endpoint on Cloudflare Workers in production. Placing typed request and response contracts inside a dedicated API client layer prevents costly UI rewrites when backend endpoints go live.',
        ],
      },
      {
        heading: 'Build loading, validation, and failure states on day one',
        body: [
          'Forms and dashboards often feel finished only on happy paths. Designing explicit validation feedback, loading indicators, and non-deceptive fallback flows from the outset ensures reliable behavior when real network latency arrives.',
        ],
      },
    ],
    relatedSlugs: ['why-cloudflare-first-architecture-suits-growing-enterprises', 'accessible-dual-theme-design-systems'],
  },
  {
    slug: 'practical-guardrails-for-business-ai-automation',
    title: 'Practical Guardrails for AI Automation in Real Business Workflows',
    category: 'AI & Automation',
    readTime: '6 min read',
    summary:
      'Why combining deterministic validation, schema-constrained outputs, and human escalation outperforms unconstrained chatbots.',
    sections: [
      {
        heading: 'Use deterministic code wherever rules are exact',
        body: [
          'AI models should classify unstructured inputs, summarize lengthy threads, or retrieve verified documentation—not calculate invoices or invent policy terms. Blending deterministic validation with scoped model calls keeps automation predictable.',
        ],
      },
      {
        heading: 'Design clean human escalation paths',
        body: [
          'Every customer-facing conversational interface needs an immediate path to human engineering or support channels when confidence is low or requirements fall outside documented knowledge.',
        ],
      },
    ],
    relatedSlugs: ['why-cloudflare-first-architecture-suits-growing-enterprises', 'designing-backend-ready-frontends'],
  },
  {
    slug: 'accessible-dual-theme-design-systems',
    title: 'Engineering Intentional Light and Dark Modes in Modern Web Systems',
    category: 'Product Engineering',
    readTime: '4 min read',
    summary:
      'Avoiding split-brain contrast bugs by pairing semantic CSS tokens, system-preference detection, and explicit surface hierarchies.',
    sections: [
      {
        heading: 'Why naive color inversion fails',
        body: [
          'Automated CSS inversion breaks brand accents, washes out shadows, and produces unreadable button states. Intentional dual-theme engineering defines separate surface elevation steps, border contrast, and optical text weights for both light and dark canvases.',
        ],
      },
      {
        heading: 'Preventing theme flicker on initial load',
        body: [
          'Resolving stored preference and OS color scheme before first paint keeps navigation smooth while respecting user accessibility preferences including reduced motion.',
        ],
      },
    ],
    relatedSlugs: ['designing-backend-ready-frontends', 'practical-guardrails-for-business-ai-automation'],
  },
];

export const GENERAL_FAQS: FAQItem[] = [
  {
    question: 'What types of services does Suvra Technologies provide?',
    answer:
      'We deliver 14 core technology services grouped across four disciplines: Engineering (Web, Mobile, Custom Software, E-commerce, APIs), Intelligence (AI Business Automation, AI Chatbots & Agents, CRM/ERP), Digital (UI/UX Design & Branding, Digital Marketing, SEO & Local SEO), and Infrastructure (Cloud & DevOps, IT Consulting, Maintenance & Support).',
  },
  {
    question: 'How does Suvra Technologies combine client services with product innovation?',
    answer:
      'As a Technology & Innovation Company, we pair client-focused software engineering and consulting services with active research and development toward proprietary software products, mobile applications, SaaS platforms, and AI-enabled solutions.',
  },
  {
    question: 'How do you approach pricing, timelines, and project scope?',
    answer:
      'We scope each engagement after understanding exact functional requirements, integrations, and architectural constraints rather than publishing artificial fixed promises. You can submit an initial scope through our Start a Project workflow to begin a structured review.',
  },
  {
    question: 'Where is Suvra Technologies based, and do you work outside Bihar or India?',
    answer:
      'Suvra Technologies is headquartered in Ramdyalu, Muzaffarpur, Bihar, India (842002), and serves clients across Bihar, pan-India, and international markets through structured remote collaboration.',
  },
  {
    question: 'Do you support both web and mobile expansion after an initial launch?',
    answer:
      'Yes. We design clean API contracts, typed domain schemas, and modular architectures so websites can expand into SaaS workspaces, administrative consoles, and mobile applications without starting over.',
  },
  {
    question: 'How does ongoing maintenance and support work after launch?',
    answer:
      'Through our Website Maintenance & Support practice, we handle scheduled dependency updates, staging verification, security header hygiene, and iterative UI or feature improvements.',
  },
];

export const LOCATIONS_DATA: LocationCoverage[] = [
  {
    slug: 'muzaffarpur',
    name: 'Muzaffarpur',
    regionType: 'Headquarters Region',
    headline: 'Technology Engineering & Digital Solutions from Muzaffarpur',
    summary:
      'Headquartered in Ramdyalu, Muzaffarpur (842002), Suvra Technologies partners directly with local institutions, retail businesses, healthcare clinics, and emerging founders across the district.',
    officeNotice: 'Headquarters Location: Ramdyalu, Muzaffarpur, Bihar, India – 842002.',
    priorities: [
      'Fast, mobile-accessible websites and local search visibility for regional enterprises.',
      'Custom operational software, billing workflows, and educational portals built for low-bandwidth reliability.',
      'Direct in-region consultation paired with international engineering standards.',
    ],
    recommendedServices: ['website-development', 'seo-local-seo', 'custom-software-development', 'ecommerce-development'],
  },
  {
    slug: 'patna',
    name: 'Patna',
    regionType: 'State Coverage',
    headline: 'Digital Platforms & Enterprise Software Coverage for Patna',
    summary:
      'We support growing enterprises, coaching institutes, healthcare networks, and service organizations across Patna with modern web systems, CRM/ERP workflows, and mobile applications.',
    officeNotice: 'Service Coverage Area — Operated from our Muzaffarpur headquarters with dedicated remote and scheduled regional collaboration.',
    priorities: [
      'Scalable EdTech portals, student administration systems, and responsive mobile apps.',
      'Structured CRM pipelines and automated enquiry routing for high-volume service businesses.',
      'Modern UI/UX redesigns replacing slow legacy websites.',
    ],
    recommendedServices: ['custom-software-development', 'mobile-app-development', 'crm-erp-solutions', 'digital-marketing'],
  },
  {
    slug: 'bihar',
    name: 'Bihar',
    regionType: 'State Coverage',
    headline: 'Modern Software & Cloud Engineering Across Bihar',
    summary:
      'Suvra Technologies helps businesses and institutions across Bihar transition from manual spreadsheets and outdated portals to dependable, cloud-ready digital systems.',
    officeNotice: 'Service Coverage Area — Headquartered in Muzaffarpur, Bihar; delivering digitally across all districts of the state.',
    priorities: [
      'Mobile-first web engineering optimized for regional cellular connectivity.',
      'E-commerce storefronts and WhatsApp-connected lead workflows for regional brands.',
      'Cloudflare-first infrastructure keeping ongoing hosting costs lean and predictable.',
    ],
    recommendedServices: ['website-development', 'ecommerce-development', 'ai-business-automation', 'website-maintenance-support'],
  },
  {
    slug: 'india',
    name: 'India',
    regionType: 'National Coverage',
    headline: 'Full-Lifecycle Software & AI Engineering Across India',
    summary:
      'Serving startups, SMEs, and enterprises across India with distributed engineering collaboration, contract-first APIs, SaaS architectures, and applied AI workflows.',
    officeNotice: 'National Service Coverage — Remote-first delivery across India anchored from our Bihar headquarters.',
    priorities: [
      'SaaS MVP engineering and scalable TypeScript architectures for Indian startups.',
      'API integrations connecting payment gateways, logistics, and internal ERP tools.',
      'Technical SEO and conversion-focused web platforms for competitive national markets.',
    ],
    recommendedServices: ['custom-software-development', 'api-development-integrations', 'ai-business-automation', 'cloud-devops'],
  },
  {
    slug: 'international-services',
    name: 'International Services',
    regionType: 'Global Coverage',
    headline: 'Global Software Engineering & Cloud Architecture Collaboration',
    summary:
      'Suvra Technologies collaborates with international startups, agencies, and businesses seeking disciplined frontend, backend, AI automation, and Cloudflare-first engineering.',
    officeNotice: 'Global Remote Delivery — Asynchronous-friendly documentation, overlapping time-zone calls, and clean repository ownership.',
    priorities: [
      'WCAG 2.2 AA accessible web platforms and React/Next.js frontend engineering.',
      'Edge-first API development with Hono, Cloudflare Workers, and clean TypeScript contracts.',
      'Pragmatic IT consulting and architecture audits grounded in transparent trade-offs.',
    ],
    recommendedServices: ['it-consulting', 'cloud-devops', 'ui-ux-design-branding', 'api-development-integrations'],
  },
];

export const CAREERS_ROLES: CareerRole[] = [
  {
    id: 'general-talent-pipeline',
    title: 'Engineering & Design Talent Network',
    type: 'Future Collaboration · Remote / In-Region',
    status: 'Open for Introductions',
    summary:
      'We are not publishing fabricated job openings. However, engineers, UI/UX designers, and technical interns aligned with TypeScript, React, cloud systems, or applied AI are welcome to share portfolios or GitHub profiles for future project collaboration.',
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getProjectBySlug(slug: string): ProjectConcept | undefined {
  return CONCEPT_PROJECTS.find((project) => project.slug === slug);
}

export function getLocationBySlug(slug: string): LocationCoverage | undefined {
  return LOCATIONS_DATA.find((loc) => loc.slug === slug);
}
