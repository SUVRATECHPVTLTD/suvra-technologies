import { useRef } from 'react';
import { ArrowRight, ExternalLink, Mail, MapPin } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING } from '../../config/motion';
import { FOUNDER_EXECUTIVE_PROFILE } from '../../data/company';
import { BrandSymbol } from '../ui/BrandMark';

interface FounderExecutiveProfileProps {
  variant?: 'home' | 'page';
}

export function FounderExecutiveProfile({ variant = 'home' }: FounderExecutiveProfileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 'some' });
  const prefersReducedMotion = useReducedMotion();
  const active = Boolean(isInView || prefersReducedMotion);

  const profile = FOUNDER_EXECUTIVE_PROFILE;
  const NameTag = variant === 'page' ? 'h1' : 'h2';

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-7 sm:p-10 lg:p-12 shadow-[var(--shadow-card)]"
    >
      {/* Subtle geometric blueprint texture & restrained brand accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045] dark:opacity-[0.07] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:36px_36px] text-[var(--text-muted)]"
      />
      <motion.div
        aria-hidden="true"
        initial={prefersReducedMotion ? { opacity: 0.7 } : { opacity: 0, scale: 0.92 }}
        animate={active ? { opacity: 0.75, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.85, ease: MOTION_EASING }}
        className="pointer-events-none absolute -top-28 -right-24 w-80 h-80 rounded-full bg-radial from-[#2563EB]/12 via-[#06B6D4]/8 to-transparent blur-2xl"
      />

      <div className="relative z-10">
        {/* Top corporate bar: eyebrow + official corporate ST mark as institutional header element */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.42, ease: MOTION_EASING }}
          className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]"
        >
          <p className="font-mono text-xs font-medium tracking-[0.16em] uppercase text-[#2563EB] dark:text-[#06B6D4]">
            FOUNDER &amp; LEADERSHIP
          </p>
          <div className="inline-flex items-center gap-2.5 text-xs font-medium text-[var(--text-secondary)]">
            <BrandSymbol className="h-5" />
            <span>{profile.company}</span>
            <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">
              Est. {profile.establishedYear}
            </span>
          </div>
        </motion.div>

        {/* Main editorial grid: Typography identity + structured executive dossier */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left 7 columns: Editorial Typography & Core Biography */}
          <div className="lg:col-span-7">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.48, delay: prefersReducedMotion ? 0 : 0.08, ease: MOTION_EASING }}
            >
              <NameTag className="font-display text-3xl sm:text-4xl lg:text-[3rem] font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]">
                {profile.name}
              </NameTag>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.16, ease: MOTION_EASING }}
              className="mt-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-3 gap-y-0.5 text-sm sm:text-base font-medium text-[var(--text-primary)]"
            >
              <span>{profile.designation}</span>
              <span aria-hidden="true" className="hidden sm:inline text-[#2563EB] dark:text-[#06B6D4]">—</span>
              <span className="text-[#2563EB] dark:text-[#06B6D4]">{profile.company}</span>
            </motion.div>

            {/* Animated horizontal accent divider */}
            <motion.div
              aria-hidden="true"
              initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: active ? 1 : 0 }}
              transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : 0.24, ease: MOTION_EASING }}
              style={{ originX: 0 }}
              className="mt-5 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4]"
            />

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.48, delay: prefersReducedMotion ? 0 : 0.28, ease: MOTION_EASING }}
              className="mt-6 space-y-4"
            >
              <p className="font-display text-xl sm:text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
                {profile.supportingHeadline}
              </p>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                {profile.supportingBiography}
              </p>

              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl pt-1">
                {profile.suvrixaDisclosure}
              </p>
            </motion.div>

            {/* Primary Actions */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : 0.36, ease: MOTION_EASING }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              {variant === 'home' ? (
                <Link
                  to="/founder"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <span>Founder &amp; Leadership Profile</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <span>Contact Suvra Technologies</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              )}

              <a
                href={profile.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-canvas)] hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:border-[#06B6D4] dark:hover:text-[#06B6D4] rounded-lg transition-all hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <span>Connect on LinkedIn</span>
                <ExternalLink
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg border border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <Mail className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
            </motion.div>
          </div>

          {/* Right 5 columns: Structured Executive Governance Grid (no portrait placeholder) */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 14 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.22, ease: MOTION_EASING }}
            className="lg:col-span-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] divide-y divide-[var(--border-subtle)]"
          >
            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Corporate Positioning
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
                {profile.positioning}
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                Client Software Engineering, Applied AI &amp; Proprietary Product R&amp;D
              </p>
            </div>

            <div className="p-5 grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  Established
                </p>
                <p className="mt-1 font-display text-lg font-bold text-[var(--text-primary)] tabular-nums">
                  {profile.establishedYear}
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  Focus Markets
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  India &amp; Global
                </p>
              </div>
            </div>

            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true" />
                <span>Headquarters</span>
              </p>
              <p className="mt-1.5 text-sm text-[var(--text-primary)] leading-snug">
                {profile.headquarters}
              </p>
            </div>

            <div className="p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Executive Mandate
              </p>
              <p className="mt-1.5 text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">
                Uniting clean engineering standards, Cloudflare-first unit economics, and transparent client delivery.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
