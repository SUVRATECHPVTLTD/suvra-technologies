import {
  ArrowRight,
  Bot,
  Cloud,
  Code2,
  Compass,
  Cpu,
  Database,
  Globe,
  Layers,
  Megaphone,
  Palette,
  Search,
  ShoppingCart,
  Smartphone,
  Wrench,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING, staggerContainerVariants, staggerItemVariants } from '../../config/motion';
import { SERVICE_CATEGORIES, getServicesByCategory } from '../../data/services';

const SERVICE_ICONS: Record<string, typeof Globe> = {
  'website-development': Globe,
  'mobile-app-development': Smartphone,
  'custom-software-development': Code2,
  'ecommerce-development': ShoppingCart,
  'api-development-integrations': Layers,
  'ai-business-automation': Cpu,
  'ai-chatbots-agents': Bot,
  'crm-erp-solutions': Database,
  'ui-ux-design-branding': Palette,
  'digital-marketing': Megaphone,
  'seo-local-seo': Search,
  'cloud-devops': Cloud,
  'it-consulting': Compass,
  'website-maintenance-support': Wrench,
};

export function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.99 }}
      transition={{ duration: 0.2, ease: MOTION_EASING }}
      role="region"
      id="header-services-megamenu"
      aria-label="Services Mega Menu"
      className="absolute left-0 right-0 top-full mt-2.5 rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl z-40 overflow-hidden"
    >
      <div className="px-6 lg:px-8 py-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            variants={staggerContainerVariants}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {SERVICE_CATEGORIES.map((category) => {
              const items = getServicesByCategory(category.id);
              return (
                <motion.div key={category.id} variants={staggerItemVariants}>
                  <p className="font-mono text-xs font-medium text-[#2563EB] dark:text-[#06B6D4] pb-2 mb-3 border-b border-[var(--border-subtle)]">
                    {category.label}
                  </p>
                  <ul className="space-y-1.5">
                    {items.map((service) => {
                      const Icon = SERVICE_ICONS[service.slug] ?? Code2;
                      return (
                        <li key={service.slug}>
                          <Link
                            to={`/services/${service.slug}`}
                            onClick={onNavigate}
                            className="group flex items-start gap-2.5 rounded-lg p-2 -mx-2 hover:bg-[var(--bg-elevated)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                          >
                            <Icon
                              className="w-4 h-4 mt-0.5 shrink-0 text-[var(--text-muted)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4]"
                              aria-hidden="true"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[#2563EB] dark:group-hover:text-[#06B6D4] leading-snug">
                                {service.name}
                              </p>
                              <p className="mt-0.5 text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                                {service.shortDescription}
                              </p>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="lg:col-span-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-6 flex flex-col justify-between">
            <div>
              <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
                Technical Consultation
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                Not sure which architecture fits your roadmap?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                Walk through our 4-step project intake to scope engineering, AI automation, or cloud infrastructure with clarity.
              </p>
            </div>

            <div className="mt-6 space-y-2.5">
              <Link
                to="/start-a-project"
                onClick={onNavigate}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
              <Link
                to="/services"
                onClick={onNavigate}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-canvas)] rounded-lg transition-colors whitespace-nowrap"
              >
                View All 14 Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
