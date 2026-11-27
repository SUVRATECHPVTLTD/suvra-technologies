/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from 'react';
import { MotionConfig } from 'motion/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Container } from './components/ui/Container';
import { LoadingState } from './components/ui/FeedbackStates';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { HomePage } from './pages/HomePage';

const ServicesIndexPage = lazy(() =>
  import('./pages/ServicesPages').then((m) => ({ default: m.ServicesIndexPage }))
);
const ServiceDetailPage = lazy(() =>
  import('./pages/ServicesPages').then((m) => ({ default: m.ServiceDetailPage }))
);
const IndustriesIndexPage = lazy(() =>
  import('./pages/IndustriesPages').then((m) => ({ default: m.IndustriesIndexPage }))
);
const IndustryDetailPage = lazy(() =>
  import('./pages/IndustriesPages').then((m) => ({ default: m.IndustryDetailPage }))
);
const ProductsPage = lazy(() =>
  import('./pages/ProductsAndWorkPages').then((m) => ({ default: m.ProductsPage }))
);
const PortfolioPage = lazy(() =>
  import('./pages/ProductsAndWorkPages').then((m) => ({ default: m.PortfolioPage }))
);
const CaseStudiesIndexPage = lazy(() =>
  import('./pages/ProductsAndWorkPages').then((m) => ({ default: m.CaseStudiesIndexPage }))
);
const CaseStudyDetailPage = lazy(() =>
  import('./pages/ProductsAndWorkPages').then((m) => ({ default: m.CaseStudyDetailPage }))
);
const AboutPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.AboutPage }))
);
const FounderPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.FounderPage }))
);
const TeamPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.TeamPage }))
);
const CareersPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.CareersPage }))
);
const LocationsIndexPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.LocationsIndexPage }))
);
const LocationDetailPage = lazy(() =>
  import('./pages/CompanyPages').then((m) => ({ default: m.LocationDetailPage }))
);
const BlogIndexPage = lazy(() =>
  import('./pages/ResourcesAndContactPages').then((m) => ({ default: m.BlogIndexPage }))
);
const BlogDetailPage = lazy(() =>
  import('./pages/ResourcesAndContactPages').then((m) => ({ default: m.BlogDetailPage }))
);
const FaqPage = lazy(() =>
  import('./pages/ResourcesAndContactPages').then((m) => ({ default: m.FaqPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ResourcesAndContactPages').then((m) => ({ default: m.ContactPage }))
);
const StartProjectPage = lazy(() =>
  import('./pages/ResourcesAndContactPages').then((m) => ({ default: m.StartProjectPage }))
);
const LegalPage = lazy(() =>
  import('./pages/ResourcesAndContactPages').then((m) => ({ default: m.LegalPage }))
);
const NotFoundPage = lazy(() =>
  import('./pages/ResourcesAndContactPages').then((m) => ({ default: m.NotFoundPage }))
);

function RouteFallback() {
  return (
    <Container className="py-20">
      <LoadingState label="Loading page..." />
    </Container>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<HomePage />} />

                  <Route path="/services" element={<ServicesIndexPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />

                  <Route path="/industries" element={<IndustriesIndexPage />} />
                  <Route path="/industries/:slug" element={<IndustryDetailPage />} />

                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/case-studies" element={<CaseStudiesIndexPage />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />

                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/founder" element={<FounderPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/careers" element={<CareersPage />} />

                  <Route path="/locations" element={<LocationsIndexPage />} />
                  <Route path="/locations/:slug" element={<LocationDetailPage />} />

                  <Route path="/blog" element={<BlogIndexPage />} />
                  <Route path="/blog/:slug" element={<BlogDetailPage />} />
                  <Route path="/faq" element={<FaqPage />} />

                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/start-a-project" element={<StartProjectPage />} />

                  <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
                  <Route path="/terms-and-conditions" element={<LegalPage kind="terms" />} />
                  <Route path="/cookie-policy" element={<LegalPage kind="cookies" />} />

                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
