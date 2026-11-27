import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { MOTION_EASING, TRANSITION_STANDARD } from '../../config/motion';
import type { DiagramKind } from '../../types/cms';

interface ServiceDiagramProps {
  kind: DiagramKind;
  caption: string;
}

export function ServiceDiagram({ kind, caption }: ServiceDiagramProps) {
  const figureRef = useRef<HTMLElement>(null);
  const isInView = useInView(figureRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const isFlowCategory =
    kind === 'crm-erp' ||
    kind === 'ecommerce' ||
    kind === 'ui-ux' ||
    kind === 'digital-marketing' ||
    kind === 'seo' ||
    kind === 'it-consulting';

  const flowLabelsByKind: Record<
    'crm-erp' | 'ecommerce' | 'ui-ux' | 'digital-marketing' | 'seo' | 'it-consulting',
    Array<{ label: string; detail: string }>
  > = {
    'crm-erp': [
      { label: 'Lead & Intake Capture', detail: 'Validated CRM entries & role permissions' },
      { label: 'Workflow State Engine', detail: 'Approvals, inventory, and invoice triggers' },
      { label: 'Edge Database Core', detail: 'Typed relational schemas on Cloudflare D1' },
      { label: 'Operational Reporting', detail: 'Audit trails & team visibility dashboards' },
    ],
    ecommerce: [
      { label: 'Edge Storefront', detail: 'Fast product discovery from 320px upward' },
      { label: 'Cart & Inventory Lock', detail: 'Consistent SKU validation & R2 media' },
      { label: 'Payment Gateway API', detail: 'Webhook verification & idempotent checkout' },
      { label: 'Order Fulfillment', detail: 'Dispatch alerts & customer status updates' },
    ],
    'ui-ux': [
      { label: 'Information Hierarchy', detail: 'Task-focused flows & clear navigation' },
      { label: 'Design Token Matrix', detail: 'Light/dark palettes & WCAG AA contrast' },
      { label: 'Component Primitives', detail: 'Accessible states across forms & menus' },
      { label: 'Design Handover', detail: 'Production React/Tailwind parity' },
    ],
    'digital-marketing': [
      { label: 'Audience & Funnel Map', detail: 'Search intent & landing page alignment' },
      { label: 'Landing Page Speed', detail: 'Core Web Vitals & clean conversion paths' },
      { label: 'Campaign Tracking', detail: 'Privacy-conscious UTM & enquiry routing' },
      { label: 'Conversion Iteration', detail: 'Refining copy & intake completion clarity' },
    ],
    seo: [
      { label: 'Technical Crawl Hygiene', detail: 'Semantic headings, canonicals & sitemaps' },
      { label: 'Schema.org JSON-LD', detail: 'Organization, Service & FAQ structured data' },
      { label: 'Regional & Local Intent', detail: 'Bihar, India & global service route focus' },
      { label: 'Search Performance', detail: 'Lightweight bundles & clean indexability' },
    ],
    'it-consulting': [
      { label: 'Current-State Audit', detail: 'Codebase, hosting bills & bottleneck review' },
      { label: 'Architecture Blueprint', detail: 'Cloudflare-first & OCI trade-off matrix' },
      { label: 'Security & Cost Guard', detail: 'Zero Trust boundaries & vendor de-risking' },
      { label: 'Execution Roadmap', detail: 'Phased engineering milestones & handover' },
    ],
  };

  return (
    <figure
      ref={figureRef}
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[var(--border-subtle)]">
        <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
          Conceptual Architecture &amp; Interface Illustration
        </span>
        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          Illustrative Blueprint
        </span>
      </div>

      {kind === 'website' && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={TRANSITION_STANDARD}
          className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <div className="ml-3 flex-1 max-w-xs h-5 rounded bg-[var(--bg-elevated)] px-3 flex items-center font-mono text-[10px] text-[var(--text-muted)]">
              Edge-cached semantic DOM · 320px–1920px
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            <div className="md:col-span-7 space-y-3">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: MOTION_EASING }}
                className="h-3 w-28 rounded bg-[#2563EB]/30 origin-left"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: 0.08, ease: MOTION_EASING }}
                className="h-6 w-4/5 rounded bg-[var(--text-primary)]/15 origin-left"
              />
              <div className="h-3 w-full rounded bg-[var(--text-muted)]/20" />
              <div className="h-3 w-5/6 rounded bg-[var(--text-muted)]/20" />
              <div className="pt-2 flex gap-2">
                <div className="h-8 w-28 rounded-md bg-[#2563EB]" />
                <div className="h-8 w-28 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)]" />
              </div>
            </div>

            <div className="md:col-span-5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  Edge Delivery Flow
                </span>
                <span className="font-mono text-[10px] text-[#2563EB] dark:text-[#06B6D4]">
                  TLS 1.3
                </span>
              </div>
              <svg viewBox="0 0 260 54" className="w-full h-auto my-2" aria-hidden="true">
                <line
                  x1="28"
                  y1="27"
                  x2="232"
                  y2="27"
                  className="stroke-[var(--border-strong)]"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {isInView && !prefersReducedMotion && (
                  <motion.circle
                    r="3.5"
                    fill="#06B6D4"
                    cy="27"
                    initial={{ cx: 28, opacity: 0 }}
                    animate={{ cx: [28, 232], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <circle cx="28" cy="27" r="10" className="fill-[#2563EB]" />
                <circle cx="130" cy="27" r="10" className="fill-[#06B6D4]" />
                <circle cx="232" cy="27" r="10" className="fill-[#2563EB]" />
              </svg>
              <div className="font-mono text-[10px] text-[var(--text-muted)]">
                Edge CDN · Accessible UI · SEO Ready
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {kind === 'mobile' && (
        <div className="space-y-4 max-w-2xl mx-auto">
          <svg viewBox="0 0 520 44" className="hidden sm:block w-full h-auto" aria-hidden="true">
            <motion.path
              d="M 130 22 L 390 22"
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.75"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: MOTION_EASING }}
            />
            {isInView && !prefersReducedMotion && (
              <motion.circle
                r="4"
                cy="22"
                fill="#06B6D4"
                initial={{ cx: 130, opacity: 0 }}
                animate={{ cx: [130, 390, 130], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <circle cx="130" cy="22" r="6" fill="#2563EB" />
            <circle cx="260" cy="22" r="7" fill="#06B6D4" />
            <circle cx="390" cy="22" r="6" fill="#2563EB" />
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Android Client View', accent: 'bg-[#2563EB]', state: 'Offline Queue Ready' },
              { label: 'iOS Client View', accent: 'bg-[#06B6D4]', state: 'Synced via Edge API' },
            ].map((device, idx) => (
              <motion.div
                key={device.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: MOTION_EASING }}
                className="rounded-2xl border-2 border-[var(--border-strong)] bg-[var(--bg-elevated)] p-4"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pb-3 border-b border-[var(--border-subtle)]">
                  <span>{device.label}</span>
                  <span>{device.state}</span>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-[var(--text-primary)]/15" />
                  <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 space-y-2">
                    <div className="h-2.5 w-1/2 rounded bg-[var(--text-muted)]/25" />
                    <div className="h-2.5 w-full rounded bg-[var(--text-muted)]/15" />
                  </div>
                  <div className={`h-9 w-full rounded-lg ${device.accent} opacity-90`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {(kind === 'ai-automation' || kind === 'ai-agents') && (
        <div>
          <svg
            viewBox="0 0 760 220"
            className="hidden sm:block w-full h-auto"
            role="img"
            aria-label={caption}
          >
            <defs>
              <marker id="arrow-suvra" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#2563EB" />
              </marker>
            </defs>
            {isInView && !prefersReducedMotion && (
              <motion.circle
                r="4"
                cy="100"
                fill="#06B6D4"
                initial={{ cx: 100, opacity: 0 }}
                animate={{ cx: [100, 655], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {[
              { x: 20, title: '1. Input & Sanitize', sub: 'Schema Validation' },
              {
                x: 205,
                title: '2. Grounded Context',
                sub: kind === 'ai-agents' ? 'Approved Docs Only' : 'Rule + AI Extract',
              },
              { x: 390, title: '3. Guardrail Check', sub: 'Confidence & Policy' },
              { x: 575, title: '4. Action / Handoff', sub: 'CRM or Human Review' },
            ].map((node, i) => (
              <g key={node.title}>
                <motion.rect
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: MOTION_EASING }}
                  x={node.x}
                  y="45"
                  width="160"
                  height="110"
                  rx="12"
                  className="fill-[var(--bg-elevated)] stroke-[var(--border-strong)]"
                  strokeWidth="1.5"
                />
                <text
                  x={node.x + 16}
                  y="88"
                  className="fill-[var(--text-primary)] text-[13px] font-semibold"
                  fontFamily="Space Grotesk, sans-serif"
                >
                  {node.title}
                </text>
                <text
                  x={node.x + 16}
                  y="114"
                  className="fill-[var(--text-muted)] text-[11px]"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {node.sub}
                </text>
                {i < 3 && (
                  <motion.line
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.15, ease: MOTION_EASING }}
                    x1={node.x + 160}
                    y1="100"
                    x2={node.x + 185}
                    y2="100"
                    stroke="#2563EB"
                    strokeWidth="2"
                    markerEnd="url(#arrow-suvra)"
                  />
                )}
              </g>
            ))}
          </svg>
          <div className="grid grid-cols-1 gap-3 sm:hidden">
            {[
              { step: '01', title: 'Input & Sanitize', sub: 'Schema Validation' },
              {
                step: '02',
                title: 'Grounded Context',
                sub: kind === 'ai-agents' ? 'Approved Docs Only' : 'Rule + AI Extract',
              },
              { step: '03', title: 'Guardrail Check', sub: 'Confidence & Policy' },
              { step: '04', title: 'Action / Handoff', sub: 'CRM or Human Review' },
            ].map((node) => (
              <div
                key={node.step}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-[var(--text-primary)]">
                    {node.title}
                  </p>
                  <p className="font-mono text-xs text-[var(--text-muted)]">{node.sub}</p>
                </div>
                <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                  {node.step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(kind === 'cloud-devops' ||
        kind === 'api-integrations' ||
        kind === 'custom-software' ||
        kind === 'maintenance') && (
        <div className="space-y-4">
          <svg viewBox="0 0 760 72" className="w-full h-auto hidden sm:block" aria-hidden="true">
            <motion.path
              d="M 110 36 L 380 36 L 650 36"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: MOTION_EASING }}
            />
            {isInView && !prefersReducedMotion && (
              <motion.circle
                r="4.5"
                cy="36"
                fill="#06B6D4"
                initial={{ cx: 110, opacity: 0 }}
                animate={{ cx: [110, 650], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {[110, 380, 650].map((cx, i) => (
              <g key={cx}>
                <circle cx={cx} cy="36" r="14" className="fill-[#2563EB]" />
                <text
                  x={cx}
                  y="40"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                >
                  0{i + 1}
                </text>
              </g>
            ))}
          </svg>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                stage: '01. Edge Perimeter',
                items: [
                  'Cloudflare DNS & TLS 1.3',
                  'WAF & Turnstile Verification',
                  'Rate Limits & Schema Guards',
                ],
              },
              {
                stage: '02. Application Core',
                items: [
                  'Typed Hono / Worker APIs',
                  'Role-Based Access Rules',
                  'Idempotent Webhook Handlers',
                ],
              },
              {
                stage: '03. Persistence & Backup',
                items: [
                  'Cloudflare D1 / R2 Storage',
                  'Encrypted Tunnel to OCI Origin',
                  'Staged Rollback & Audits',
                ],
              },
            ].map((col, idx) => (
              <motion.div
                key={col.stage}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: MOTION_EASING }}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4"
              >
                <p className="font-mono text-xs font-medium text-[#2563EB] dark:text-[#06B6D4]">
                  {col.stage}
                </p>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isFlowCategory && (
        <div className="space-y-4">
          <svg viewBox="0 0 760 56" className="w-full h-auto hidden sm:block" aria-hidden="true">
            <motion.path
              d="M 95 28 L 285 28 L 475 28 L 665 28"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: MOTION_EASING }}
            />
            {isInView && !prefersReducedMotion && (
              <motion.circle
                r="4"
                cy="28"
                fill="#06B6D4"
                initial={{ cx: 95, opacity: 0 }}
                animate={{ cx: [95, 665], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {[95, 285, 475, 665].map((cx, i) => (
              <g key={cx}>
                <circle cx={cx} cy="28" r="13" className="fill-[#2563EB]" />
                <text
                  x={cx}
                  y="32"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="10.5"
                  fontFamily="JetBrains Mono, monospace"
                >
                  0{i + 1}
                </text>
              </g>
            ))}
          </svg>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {flowLabelsByKind[kind].map((block, index) => (
              <motion.div
                key={block.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: MOTION_EASING }}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 flex flex-col justify-between"
              >
                <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                  0{index + 1}
                </span>
                <div className="mt-3">
                  <p className="font-display text-sm font-semibold text-[var(--text-primary)]">
                    {block.label}
                  </p>
                  <p className="mt-1.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                    {block.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <figcaption className="mt-4 text-xs text-[var(--text-muted)]">{caption}</figcaption>
    </figure>
  );
}
