import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { TRANSITION_MICRO } from '../../config/motion';
import { BrandMark } from '../ui/BrandMark';
import { ThemeToggle } from '../ui/ThemeToggle';
import { MegaMenu } from './MegaMenu';
import { MobileNavigation } from './MobileNavigation';

type OpenMenu = 'services' | 'company' | 'resources' | null;

export function Header() {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  const isServicesActive = pathname.startsWith('/services');
  const isCompanyActive = ['/about', '/founder', '/team', '/careers', '/locations'].some((p) =>
    pathname.startsWith(p)
  );
  const isResourcesActive = ['/blog', '/case-studies', '/faq'].some((p) =>
    pathname.startsWith(p)
  );

  const renderUnderline = (active: boolean) =>
    active ? (
      <motion.span
        layoutId="nav-active-underline"
        transition={TRANSITION_MICRO}
        className="absolute left-0 right-0 -bottom-0.5 h-0.5 rounded-full bg-[#2563EB] dark:bg-[#06B6D4]"
      />
    ) : null;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm ${
      isActive
        ? 'text-[#2563EB] dark:text-[#06B6D4]'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
    }`;

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3 pointer-events-none">
        <div
          className={`pointer-events-auto relative max-w-7xl mx-auto rounded-2xl border bg-[var(--bg-canvas)]/90 backdrop-blur-xl transition-all duration-200 ${
            scrolled
              ? 'border-[var(--border-strong)]/80 shadow-[var(--shadow-card)]'
              : 'border-[var(--border-subtle)] shadow-xs'
          }`}
        >
          <div
            className={`px-4 sm:px-5 lg:px-6 flex items-center justify-between gap-4 transition-[height] duration-200 ${
              scrolled ? 'h-14' : 'h-14 sm:h-16'
            }`}
          >
            <Link
              to="/"
              className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-lg"
              aria-label="Suvra Technologies Home"
            >
              <BrandMark compact={scrolled} />
            </Link>

          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 xl:gap-6">
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Home</span>
                  {renderUnderline(isActive)}
                </>
              )}
            </NavLink>

            <button
              type="button"
              onClick={() => setOpenMenu((prev) => (prev === 'services' ? null : 'services'))}
              aria-expanded={openMenu === 'services'}
              aria-controls="header-services-megamenu"
              className={`relative inline-flex items-center gap-1 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm ${
                isServicesActive || openMenu === 'services'
                  ? 'text-[#2563EB] dark:text-[#06B6D4]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-150 ${
                  openMenu === 'services' ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
              {renderUnderline(isServicesActive)}
            </button>

            <NavLink to="/industries" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Industries</span>
                  {renderUnderline(isActive)}
                </>
              )}
            </NavLink>

            <NavLink to="/products" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Products</span>
                  {renderUnderline(isActive)}
                </>
              )}
            </NavLink>

            <NavLink to="/portfolio" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Portfolio</span>
                  {renderUnderline(isActive)}
                </>
              )}
            </NavLink>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu((prev) => (prev === 'company' ? null : 'company'))}
                aria-expanded={openMenu === 'company'}
                aria-haspopup="menu"
                aria-controls="header-company-menu"
                className={`relative inline-flex items-center gap-1 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm ${
                  isCompanyActive || openMenu === 'company'
                    ? 'text-[#2563EB] dark:text-[#06B6D4]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Company</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    openMenu === 'company' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
                {renderUnderline(isCompanyActive)}
              </button>

              <AnimatePresence>
                {openMenu === 'company' && (
                  <motion.div
                    id="header-company-menu"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={TRANSITION_MICRO}
                    role="menu"
                    className="absolute left-0 top-full mt-3 w-52 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl py-2 z-50"
                  >
                    {[
                      { label: 'About Us', to: '/about' },
                      { label: 'Founder', to: '/founder' },
                      { label: 'Team & Leadership', to: '/team' },
                      { label: 'Careers', to: '/careers' },
                      { label: 'Service Locations', to: '/locations' },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        onClick={() => setOpenMenu(null)}
                        className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenMenu((prev) => (prev === 'resources' ? null : 'resources'))}
                aria-expanded={openMenu === 'resources'}
                aria-haspopup="menu"
                aria-controls="header-resources-menu"
                className={`relative inline-flex items-center gap-1 py-1.5 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm ${
                  isResourcesActive || openMenu === 'resources'
                    ? 'text-[#2563EB] dark:text-[#06B6D4]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    openMenu === 'resources' ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
                {renderUnderline(isResourcesActive)}
              </button>

              <AnimatePresence>
                {openMenu === 'resources' && (
                  <motion.div
                    id="header-resources-menu"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={TRANSITION_MICRO}
                    role="menu"
                    className="absolute left-0 top-full mt-3 w-56 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl py-2 z-50"
                  >
                    {[
                      { label: 'Technology Insights', to: '/blog' },
                      { label: 'Case Studies & Concepts', to: '/case-studies' },
                      { label: 'FAQ', to: '/faq' },
                    ].map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        onClick={() => setOpenMenu(null)}
                        className="block px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/contact" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span>Contact</span>
                  {renderUnderline(isActive)}
                </>
              )}
            </NavLink>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <Link
              to="/start-a-project"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-all duration-150 active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              Start a Project
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-primary)]"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          </div>

          <AnimatePresence>
            {openMenu === 'services' && <MegaMenu onNavigate={() => setOpenMenu(null)} />}
          </AnimatePresence>
        </div>
      </header>

      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
