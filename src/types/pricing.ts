export type ServicePricingType =
  | 'starting_price'
  | 'fixed_project'
  | 'monthly_retainer'
  | 'annual_maintenance'
  | 'custom_quotation'
  | 'unpublished';

export type PricingStatus = 'approved' | 'internal_draft' | 'unpublished';

export type BillingInterval = 'one_time' | 'monthly' | 'annual' | 'custom';

export interface ServicePricingConfig {
  serviceId: string;
  pricingType: ServicePricingType;
  /**
   * Internal INR amount stored for future admin publication workflow.
   * Never exposed publicly unless isPublished === true AND pricingStatus === 'approved'.
   */
  startingPrice: number | null;
  currency: 'INR';
  billingInterval: BillingInterval;
  pricingStatus: PricingStatus;
  /**
   * Delivery window shown publicly only when commercially approved alongside published pricing.
   */
  estimatedDuration: string | null;
  includedDeliverables: string[];
  exclusions: string[];
  lastUpdated: string;
  isPublished: boolean;
}

export interface ServicePublicPricing {
  serviceId: string;
  isPublished: boolean;
  pricingTypeLabel: string;
  displayPrice: string;
  billingSuffix: string;
  ctaLabel: string;
  estimatedDuration: string | null;
  approvalNotice: string;
}
