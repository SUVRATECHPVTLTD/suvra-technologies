import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Mail, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING, TRANSITION_MICRO } from '../../config/motion';
import { SITE_CONFIG } from '../../config/site';
import { SERVICE_CATEGORIES, getServicesByCategory } from '../../data/services';
import { BrandMark } from '../ui/BrandMark';
import { ThemeToggle } from '../ui/ThemeToggle';

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const [expandedSection, setExpandedSection] = useState<'services' | 'company' | 'resources' | null>('services');
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 20);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [open, onClose]);

  const toggleSection = (key: 'services' | 'company' | 'resources') => {
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={TRANSITION_MICRO}
          className="fixed inset-0 z-50 lg:hidden flex justify-end bg-[#071426]/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: MOTION_EASING }}
            className="relative z-10 w-full max-w-sm h-full bg-[var(--bg-surface)] border-l border-[var(--border-subtle)] flex flex-col"
          >
            <div className="flex items-center justify-between px-5 h-16 border-b border-[var(--border-subtle)] shrink-0">
              <Link to="/" onClick={onClose}>
                <BrandMark compact />
              </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close mobile menu"
            className="w-11 h-11 inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-2" aria-label="Mobile links">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center min-h-[44px] px-2 text-sm font-medium text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-elevated)]"
          >
            Home
          </Link>

          <div className="border-t border-[var(--border-subtle)] pt-2">
            <button
              type="button"
              onClick={() => toggleSection('services')}
              aria-expanded={expandedSection === 'services'}
              className="w-full min-h-[44px] px-2 flex items-center justify-between text-sm font-medium text-[var(--text-primary)]"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedSection === 'services' ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {expandedSection === 'services' && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={TRANSITION_MICRO}
                  className="pl-3 pb-2 space-y-3"
                >
                  <Link
                    to="/services"
                    onClick={onClose}
                    className="block py-1.5 text-xs font-semibold text-[#2563EB] dark:text-[#06B6D4]"
                  >
                    All 14 Services Overview
                  </Link>
                  {SERVICE_CATEGORIES.map((cat) => (
                    <div key={cat.id}>
                      <p className="font-mono text-[11px] text-[var(--text-muted)] mb-1">{cat.label}</p>
                      <ul className="space-y-1">
                        {getServicesByCategory(cat.id).map((svc) => (
                          <li key={svc.slug}>
                            <Link
                              to={`/services/${svc.slug}`}
                              onClick={onClose}
                              className="block py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            >
                              {svc.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/industries"
            onClick={onClose}
            className="flex items-center min-h-[44px] px-2 text-sm font-medium text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-elevated)]"
          >
            Industries
          </Link>
          <Link
            to="/products"
            onClick={onClose}
            className="flex items-center min-h-[44px] px-2 text-sm font-medium text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-elevated)]"
          >
            Products
          </Link>
          <Link
            to="/portfolio"
            onClick={onClose}
            className="flex items-center min-h-[44px] px-2 text-sm font-medium text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-elevated)]"
          >
            Portfolio
          </Link>

          <div className="border-t border-[var(--border-subtle)] pt-2">
            <button
              type="button"
              onClick={() => toggleSection('company')}
              aria-expanded={expandedSection === 'company'}
              className="w-full min-h-[44px] px-2 flex items-center justify-between text-sm font-medium text-[var(--text-primary)]"
            >
              <span>Company</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedSection === 'company' ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {expandedSection === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={TRANSITION_MICRO}
                  className="pl-3 pb-2 space-y-1"
                >
                  {[
                    { label: 'About Us', to: '/about' },
                    { label: 'Founder', to: '/founder' },
                    { label: 'Team', to: '/team' },
                    { label: 'Careers', to: '/careers' },
                    { label: 'Service Locations', to: '/locations' },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={onClose}
                      className="block py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-[var(--border-subtle)] pt-2">
            <button
              type="button"
              onClick={() => toggleSection('resources')}
              aria-expanded={expandedSection === 'resources'}
              className="w-full min-h-[44px] px-2 flex items-center justify-between text-sm font-medium text-[var(--text-primary)]"
            >
              <span>Resources</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expandedSection === 'resources' ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {expandedSection === 'resources' && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={TRANSITION_MICRO}
                  className="pl-3 pb-2 space-y-1"
                >
                  {[
                    { label: 'Technology Insights (Blog)', to: '/blog' },
                    { label: 'Case Studies & Blueprints', to: '/case-studies' },
                    { label: 'FAQ', to: '/faq' },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={onClose}
                      className="block py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center min-h-[44px] px-2 text-sm font-medium text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-elevated)]"
          >
            Contact
          </Link>
        </nav>

        <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-4 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <ThemeToggle showLabel />
            <Link
              to="/start-a-project"
              onClick={onClose}
              className="flex-1 text-center px-4 py-2.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg whitespace-nowrap"
            >
              Start a Project
            </Link>
          </div>

          <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-[var(--text-primary)]">
              <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{SITE_CONFIG.email}</span>
            </a>
            <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 hover:text-[var(--text-primary)]">
              <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
