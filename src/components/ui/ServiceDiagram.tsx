import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { MOTION_EASING, TRANSITION_STANDARD, svgPathDrawVariants } from '../../config/motion';
import type { DiagramKind } from '../../types/cms';

interface ServiceDiagramProps {
  kind: DiagramKind;
  caption: string;
}

export function ServiceDiagram({ kind, caption }: ServiceDiagramProps) {
  const figureRef = useRef<HTMLElement>(null);
  const isInView = useInView(figureRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = Boolean(isInView && !prefersReducedMotion);

  return (
    <figure
      ref={figureRef}
      className="relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-7 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint-grid opacity-[0.16] dark:opacity-[0.1]"
      />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[var(--border-subtle)]">
        <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
          Conceptual Architecture &amp; Interface Illustration
        </span>
        <span className="font-mono text-[11px] text-[var(--text-muted)]">
          Illustrative Blueprint
        </span>
      </div>

      <div className="relative z-10">
        {kind === 'website' && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={TRANSITION_STANDARD}
            className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden"
          >
            <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>
              <div className="flex-1 max-w-sm h-5 rounded bg-[var(--bg-elevated)] px-3 flex items-center font-mono text-[10px] text-[var(--text-muted)] truncate">
                Edge-cached semantic DOM · 320px–1920px
              </div>
              <span className="font-mono text-[10px] text-[#2563EB] dark:text-[#06B6D4]">TLS 1.3</span>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              <div className="md:col-span-7 space-y-3">
                <motion.div
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: MOTION_EASING }}
                  className="h-3 w-28 rounded bg-[#2563EB]/30 origin-left"
                />
                <motion.div
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
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
                <span className="font-mono text-[11px] text-[var(--text-muted)]">
                  Global Edge CDN Flow
                </span>
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
                  {shouldAnimate && (
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
                  Cloudflare Pages · Accessible UI · SEO
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
                variants={svgPathDrawVariants}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              />
              {shouldAnimate && (
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
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
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

        {kind === 'custom-software' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 items-stretch">
            {[
              { code: 'L1', title: 'Tenant Context', sub: 'Workspace Scope', items: ['Org Boundary', 'Session Token'] },
              { code: 'L2', title: 'RBAC Policy Gate', sub: 'Server Enforcement', items: ['Role Guards', 'Schema Zod Check'] },
              { code: 'L3', title: 'Domain Services', sub: 'Typed Workflows', items: ['Approvals', 'State Transitions'] },
              { code: 'L4', title: 'Relational Core', sub: 'D1 / PostgreSQL', items: ['Drizzle Models', 'Audit Trail'] },
            ].map((layer, idx) => (
              <motion.div
                key={layer.code}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: MOTION_EASING }}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">{layer.code}</span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">{layer.sub}</span>
                  </div>
                  <p className="mt-2 font-display text-sm font-semibold text-[var(--text-primary)]">{layer.title}</p>
                </div>
                <div className="mt-4 space-y-1.5">
                  {layer.items.map((item) => (
                    <div key={item} className="rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--text-secondary)]">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {kind === 'ecommerce' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
              <p className="font-mono text-[11px] text-[var(--text-muted)] mb-3">
                Edge Catalog Grid · R2 Media
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {['SKU-101 · ₹2,499', 'SKU-104 · ₹4,950'].map((sku) => (
                  <div key={sku} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 space-y-2">
                    <div className="h-10 rounded bg-[#2563EB]/12 border border-[#2563EB]/20" />
                    <p className="font-mono text-[10px] text-[var(--text-primary)]">{sku}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-center">
              <svg viewBox="0 0 120 40" className="w-28 h-10" aria-hidden="true">
                <line x1="8" y1="20" x2="112" y2="20" stroke="#2563EB" strokeWidth="1.75" strokeDasharray="4 4" />
                {shouldAnimate && (
                  <motion.circle
                    r="4"
                    cy="20"
                    fill="#06B6D4"
                    initial={{ cx: 8, opacity: 0 }}
                    animate={{ cx: [8, 112], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </svg>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-[#2563EB]/45 bg-[var(--bg-elevated)] p-4 space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#2563EB] dark:text-[#06B6D4]">Idempotent Checkout Flow</span>
                <span className="text-[var(--text-muted)]">INR (₹)</span>
              </div>
              <div className="rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-3 text-xs text-[var(--text-secondary)]">
                Cart Lock → Payment Gateway Signature → Order Ledger &amp; Dispatch Webhook
              </div>
            </div>
          </div>
        )}

        {kind === 'api-integrations' && (
          <svg viewBox="0 0 740 200" className="w-full h-auto" role="img" aria-label={caption}>
            <rect x="290" y="66" width="160" height="68" rx="14" className="fill-[#071426] stroke-[#2563EB]" strokeWidth="2" />
            <text x="370" y="96" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="700" fontFamily="Space Grotesk, sans-serif">
              HONO EDGE API
            </text>
            <text x="370" y="114" textAnchor="middle" fill="#06B6D4" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
              OpenAPI · Rate Limit
            </text>

            {[
              { x: 20, y: 24, label: 'Web App Client', path: 'M 170 50 Q 230 50 290 88', px: [170, 230, 290], py: [50, 62, 88] },
              { x: 20, y: 124, label: 'Mobile iOS / Android', path: 'M 170 150 Q 230 150 290 112', px: [170, 230, 290], py: [150, 138, 112] },
              { x: 570, y: 24, label: 'Signed Webhooks', path: 'M 450 88 Q 510 50 570 50', px: [450, 510, 570], py: [88, 62, 50] },
              { x: 570, y: 124, label: 'Partner CRM / ERP', path: 'M 450 112 Q 510 150 570 150', px: [450, 510, 570], py: [112, 138, 150] },
            ].map((peer, idx) => (
              <g key={peer.label}>
                <motion.path
                  d={peer.path}
                  fill="none"
                  stroke="#2563EB"
                  strokeOpacity="0.6"
                  strokeWidth="1.75"
                  variants={svgPathDrawVariants}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                />
                {shouldAnimate && (
                  <motion.circle
                    r="3.5"
                    fill="#06B6D4"
                    animate={{ cx: [...peer.px], cy: [...peer.py], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.1, delay: idx * 0.35, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
                <rect x={peer.x} y={peer.y} width="150" height="52" rx="10" className="fill-[var(--bg-elevated)] stroke-[var(--border-strong)]" strokeWidth="1.5" />
                <text x={peer.x + 75} y={peer.y + 30} textAnchor="middle" className="fill-[var(--text-primary)]" fontSize="11" fontWeight="600" fontFamily="Space Grotesk, sans-serif">
                  {peer.label}
                </text>
              </g>
            ))}
          </svg>
        )}

        {kind === 'ai-automation' && (
          <svg viewBox="0 0 760 210" className="w-full h-auto" role="img" aria-label={caption}>
            {[
              { x: 18, y: 70, w: 150, h: 70, title: '1. Event Intake', sub: 'Forms & Webhooks' },
              { x: 205, y: 70, w: 155, h: 70, title: '2. Schema Extract', sub: 'JSON Validation' },
              { x: 398, y: 70, w: 150, h: 70, title: '3. Policy Gate', sub: 'Confidence Check' },
              { x: 586, y: 24, w: 156, h: 64, title: 'Auto-Dispatch', sub: 'CRM & Alerts' },
              { x: 586, y: 118, w: 156, h: 64, title: 'Human Review', sub: 'Exception Queue' },
            ].map((box, i) => (
              <g key={box.title}>
                <motion.rect
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: MOTION_EASING }}
                  x={box.x}
                  y={box.y}
                  width={box.w}
                  height={box.h}
                  rx="12"
                  className={i === 4 ? 'fill-[var(--bg-surface)] stroke-[#06B6D4]' : 'fill-[var(--bg-elevated)] stroke-[var(--border-strong)]'}
                  strokeWidth="1.5"
                />
                <text x={box.x + 14} y={box.y + 30} className="fill-[var(--text-primary)]" fontSize="12" fontWeight="600" fontFamily="Space Grotesk, sans-serif">
                  {box.title}
                </text>
                <text x={box.x + 14} y={box.y + 49} className="fill-[var(--text-muted)]" fontSize="10" fontFamily="JetBrains Mono, monospace">
                  {box.sub}
                </text>
              </g>
            ))}
            <path d="M 168 105 L 205 105 M 360 105 L 398 105 M 548 105 L 586 56 M 548 105 L 586 150" stroke="#2563EB" strokeWidth="1.75" fill="none" />
            {shouldAnimate && (
              <motion.circle
                r="4"
                fill="#06B6D4"
                animate={{ cx: [168, 398, 548, 586], cy: [105, 105, 105, 56], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </svg>
        )}

        {kind === 'ai-agents' && (
          <svg viewBox="0 0 760 210" className="w-full h-auto" role="img" aria-label={caption}>
            {[
              { x: 20, title: 'User Prompt', sub: 'Input Sanitization' },
              { x: 205, title: 'Approved Knowledge', sub: 'Indexed Docs Only' },
              { x: 390, title: 'Scoped Tool Call', sub: 'Permission Checked' },
              { x: 575, title: 'Cited Response', sub: 'Or Human Handoff' },
            ].map((node, i) => (
              <g key={node.title}>
                <motion.rect
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.08, ease: MOTION_EASING }}
                  x={node.x}
                  y="45"
                  width="160"
                  height="112"
                  rx="12"
                  className={i === 1 ? 'fill-[#071426] stroke-[#2563EB]' : 'fill-[var(--bg-elevated)] stroke-[var(--border-strong)]'}
                  strokeWidth="1.5"
                />
                <text x={node.x + 16} y="88" fill={i === 1 ? '#F8FAFC' : undefined} className={i === 1 ? '' : 'fill-[var(--text-primary)]'} fontSize="13" fontWeight="600" fontFamily="Space Grotesk, sans-serif">
                  {node.title}
                </text>
                <text x={node.x + 16} y="114" fill={i === 1 ? '#06B6D4' : undefined} className={i === 1 ? '' : 'fill-[var(--text-muted)]'} fontSize="11" fontFamily="JetBrains Mono, monospace">
                  {node.sub}
                </text>
                {i < 3 && (
                  <line x1={node.x + 160} y1="100" x2={node.x + 185} y2="100" stroke="#2563EB" strokeWidth="2" />
                )}
              </g>
            ))}
            {shouldAnimate && (
              <motion.circle
                r="4"
                cy="100"
                fill="#06B6D4"
                animate={{ cx: [100, 655], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </svg>
        )}

        {kind === 'crm-erp' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { col: '01. Intake', card: 'Enquiry Record', meta: 'Validated Lead · ₹ Scope' },
              { col: '02. Qualification', card: 'Discovery Review', meta: 'Assignee & Priority' },
              { col: '03. Approvals', card: 'Milestone Sign-off', meta: 'Role-Gated State' },
              { col: '04. Ledger', card: 'Billing & Inventory', meta: 'Cloudflare D1 Audit' },
            ].map((stage, idx) => (
              <motion.div
                key={stage.col}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: MOTION_EASING }}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4"
              >
                <p className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">{stage.col}</p>
                <div className="mt-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3">
                  <p className="font-display text-sm font-semibold text-[var(--text-primary)]">{stage.card}</p>
                  <p className="mt-1 font-mono text-[10px] text-[var(--text-muted)]">{stage.meta}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {kind === 'ui-ux' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            <div className="md:col-span-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 space-y-3">
              <p className="font-mono text-[11px] text-[var(--text-muted)]">Dual-Theme Token Matrix</p>
              <div className="grid grid-cols-4 gap-2">
                {['#071426', '#2563EB', '#06B6D4', '#F8FAFC'].map((hex) => (
                  <div key={hex} className="space-y-1 text-center">
                    <div className="h-9 rounded-md border border-[var(--border-strong)]" style={{ backgroundColor: hex }} />
                    <span className="font-mono text-[9px] text-[var(--text-muted)]">{hex}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[10px] text-[#2563EB] dark:text-[#06B6D4]">
                WCAG 2.2 AA Contrast Verified Pairs
              </p>
            </div>
            <div className="md:col-span-7 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[var(--text-muted)]">Type Scale &amp; Grid Rhythm</span>
                <span className="font-mono text-[10px] text-[var(--text-muted)]">320px → 1920px</span>
              </div>
              <div className="my-3 space-y-2">
                <div className="font-display text-lg font-bold text-[var(--text-primary)]">Display Heading · Space Grotesk</div>
                <div className="text-xs text-[var(--text-secondary)]">Prose Body · Inter 16px / 1.6 line-height</div>
                <div className="font-mono text-[11px] text-[#2563EB] dark:text-[#06B6D4]">Tabular Data · JetBrains Mono</div>
              </div>
            </div>
          </div>
        )}

        {kind === 'digital-marketing' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            {[
              { step: '01', name: 'Search & Social Entry', note: 'Clean UTM Attribution' },
              { step: '02', name: 'Dedicated Landing', note: 'Fast Edge Delivery' },
              { step: '03', name: 'Guided Qualification', note: 'Multi-Step Intake' },
              { step: '04', name: 'CRM & WhatsApp Route', note: 'Zero Lost Enquiries' },
            ].map((stage, i) => (
              <motion.div
                key={stage.step}
                initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: i * 0.08, ease: MOTION_EASING }}
                className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4"
              >
                <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">Funnel {stage.step}</span>
                <p className="mt-2 font-display text-sm font-semibold text-[var(--text-primary)]">{stage.name}</p>
                <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">{stage.note}</p>
              </motion.div>
            ))}
          </div>
        )}

        {kind === 'seo' && (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
              <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                Semantic Hierarchy &amp; Schema Graph
              </span>
              <span className="font-mono text-[11px] text-[var(--text-muted)]">
                robots.txt · sitemap.xml · JSON-LD
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { tag: '<main> + H1..H3', desc: 'Clean Semantic Outline & Canonicals' },
                { tag: '@type: Service', desc: 'Organization, FAQ & Breadcrumb JSON-LD' },
                { tag: 'Regional Intent', desc: 'Muzaffarpur · Patna · Bihar · Global' },
              ].map((node) => (
                <div key={node.tag} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5">
                  <p className="font-mono text-xs font-semibold text-[#2563EB] dark:text-[#06B6D4]">{node.tag}</p>
                  <p className="mt-1.5 text-xs text-[var(--text-secondary)]">{node.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {kind === 'cloud-devops' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            {[
              {
                stage: '01. Edge Ingress',
                accent: 'border-[#2563EB]/45',
                items: ['Anycast DNS & TLS 1.3', 'WAF & Turnstile Guard', 'Workers + Pages Static'],
              },
              {
                stage: '02. Data & Media',
                accent: 'border-[var(--border-subtle)]',
                items: ['Cloudflare D1 SQLite', 'Drizzle ORM Typed Layer', 'Zero-Egress R2 Buckets'],
              },
              {
                stage: '03. Shielded Compute',
                accent: 'border-[#06B6D4]/45',
                items: ['Cloudflare Tunnel Link', 'Zero Trust Admin Gate', 'OCI Backup & Heavy Jobs'],
              },
            ].map((col, idx) => (
              <motion.div
                key={col.stage}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: MOTION_EASING }}
                className={`rounded-xl border ${col.accent} bg-[var(--bg-elevated)] p-4`}
              >
                <p className="font-mono text-xs font-medium text-[#2563EB] dark:text-[#06B6D4]">{col.stage}</p>
                <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
                  {col.items.map((item) => (
                    <li key={item} className="rounded-md bg-[var(--bg-surface)] border border-[var(--border-subtle)] px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {kind === 'it-consulting' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { lens: 'Complexity Audit', verdict: 'Eliminate Sprawl', note: 'Codebase & schema review' },
              { lens: 'Cloud Economics', verdict: 'Predictable INR Spend', note: 'Cloudflare-first baseline' },
              { lens: 'Security Posture', verdict: 'Zero-Trust Boundaries', note: 'Least privilege & secrets' },
              { lens: 'Execution Plan', verdict: 'Phased ADRs', note: 'Milestones before build' },
            ].map((cell) => (
              <div key={cell.lens} className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4">
                <p className="font-mono text-[11px] text-[var(--text-muted)]">{cell.lens}</p>
                <p className="mt-2 font-display text-sm font-semibold text-[#2563EB] dark:text-[#06B6D4]">{cell.verdict}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{cell.note}</p>
              </div>
            ))}
          </div>
        )}

        {kind === 'maintenance' && (
          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
              {[
                { cycle: '01. Audit', detail: 'Dependencies & TLS' },
                { cycle: '02. Staging', detail: 'Type-Check & Build' },
                { cycle: '03. Release', detail: 'Rollback-Safe Deploy' },
                { cycle: '04. Verify', detail: 'Forms & Backup Drills' },
              ].map((step) => (
                <div key={step.cycle} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3.5 text-center">
                  <p className="font-mono text-xs font-semibold text-[#2563EB] dark:text-[#06B6D4]">{step.cycle}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <figcaption className="relative z-10 mt-4 text-xs text-[var(--text-muted)]">{caption}</figcaption>
    </figure>
  );
}
