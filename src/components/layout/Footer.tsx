import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';
import { INDUSTRIES_DATA } from '../../data/industries';
import { SERVICES_DATA } from '../../data/services';
import { BrandHorizontalLockup } from '../ui/BrandMark';
import { Container } from '../ui/Container';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] pt-16 pb-24 sm:pb-16 lg:pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block py-1" aria-label="Suvra Technologies Home">
              <BrandHorizontalLockup className="h-14 sm:h-16" />
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              Technology &amp; Innovation Company combining client software engineering, AI automation, and proprietary product research for India and international markets.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[var(--text-secondary)]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[var(--text-muted)]" aria-hidden="true" />
                <span>{SITE_CONFIG.headquarters}</span>
              </p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-[var(--text-primary)]">
                <Mail className="w-4 h-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <a href={SITE_CONFIG.phoneHref} className="flex items-center gap-2 hover:text-[var(--text-primary)]">
                <Phone className="w-4 h-4 shrink-0 text-[var(--text-muted)]" aria-hidden="true" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-xs font-medium text-[var(--text-muted)] mb-4">Services</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              {SERVICES_DATA.slice(0, 7).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="hover:text-[var(--text-primary)] transition-colors">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="font-medium text-[#2563EB] dark:text-[#06B6D4]">
                  View all 14 services
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-xs font-medium text-[var(--text-muted)] mb-4">Industries</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
              {INDUSTRIES_DATA.slice(0, 6).map((ind) => (
                <li key={ind.slug}>
                  <Link to={`/industries/${ind.slug}`} className="hover:text-[var(--text-primary)] transition-colors">
                    {ind.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/industries" className="font-medium text-[#2563EB] dark:text-[#06B6D4]">
                  All industries
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h2 className="font-mono text-xs font-medium text-[var(--text-muted)] mb-4">Company</h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li><Link to="/about" className="hover:text-[var(--text-primary)] transition-colors">About Us</Link></li>
                <li><Link to="/founder" className="hover:text-[var(--text-primary)] transition-colors">Founder</Link></li>
                <li><Link to="/team" className="hover:text-[var(--text-primary)] transition-colors">Team</Link></li>
                <li><Link to="/products" className="hover:text-[var(--text-primary)] transition-colors">Products</Link></li>
                <li><Link to="/careers" className="hover:text-[var(--text-primary)] transition-colors">Careers</Link></li>
                <li><Link to="/locations" className="hover:text-[var(--text-primary)] transition-colors">Locations</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="font-mono text-xs font-medium text-[var(--text-muted)] mb-4">Resources</h2>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                <li><Link to="/portfolio" className="hover:text-[var(--text-primary)] transition-colors">Portfolio</Link></li>
                <li><Link to="/case-studies" className="hover:text-[var(--text-primary)] transition-colors">Case Studies</Link></li>
                <li><Link to="/blog" className="hover:text-[var(--text-primary)] transition-colors">Insights</Link></li>
                <li><Link to="/faq" className="hover:text-[var(--text-primary)] transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="hover:text-[var(--text-primary)] transition-colors">Contact</Link></li>
                <li>
                  <a
                    href={SITE_CONFIG.founderLinkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors"
                  >
                    <span>Founder LinkedIn</span>
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            &copy; {year} {SITE_CONFIG.companyName} · Established {SITE_CONFIG.establishedYear}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy (Draft)
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-[var(--text-primary)] transition-colors">
              Terms &amp; Conditions (Draft)
            </Link>
            <Link to="/cookie-policy" className="hover:text-[var(--text-primary)] transition-colors">
              Cookie Policy (Draft)
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
