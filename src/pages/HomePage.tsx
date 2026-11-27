import {
  BlogPreview,
  ContactCTA,
  FaqSection,
  FounderSection,
  PortfolioPreview,
  ProductsPreview,
} from '../components/home/ProofAndConversion';
import {
  IndustriesPreview,
  ProcessTimeline,
  TechnologyMarquee,
} from '../components/home/EcosystemAndProcess';
import {
  CapabilityStrip,
  CompanyIntroSection,
  HeroSection,
} from '../components/home/HeroAndIntro';
import {
  BusinessComparison,
  CoreServicesSection,
  ServicesAndProductsSection,
} from '../components/home/ServicesAndModel';
import { SeoHead } from '../components/ui/SeoHead';

export function HomePage() {
  return (
    <>
      <SeoHead
        title="Suvra Technologies — Engineering Tomorrow. Empowering Today."
        description="Suvra Technologies is a Technology & Innovation Company delivering software development, website development, mobile applications, AI automation, and digital transformation."
      />
      <HeroSection />
      <CapabilityStrip />
      <CompanyIntroSection />
      <CoreServicesSection />
      <ServicesAndProductsSection />
      <BusinessComparison />
      <IndustriesPreview />
      <TechnologyMarquee />
      <ProcessTimeline />
      <ProductsPreview />
      <PortfolioPreview />
      <FounderSection />
      <BlogPreview />
      <FaqSection />
      <ContactCTA />
    </>
  );
}
