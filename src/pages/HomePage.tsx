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
  BusinessTransformation,
  CoreServicesSection,
  CustomSolutionCTA,
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
      <CustomSolutionCTA />
      <ServicesAndProductsSection />
      <IndustriesPreview />
      <ProcessTimeline />
      <TechnologyMarquee />
      <ProductsPreview />
      <PortfolioPreview />
      <BusinessTransformation />
      <FounderSection />
      <BlogPreview />
      <FaqSection />
      <ContactCTA />
    </>
  );
}
