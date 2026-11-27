/**
 * Centralized Currency & Quotation Formatting for Suvra Technologies
 * Exclusive public currency: Indian Rupee (INR / ₹) formatted with en-IN locale.
 */
export const CURRENCY_CONFIG = {
  code: 'INR',
  symbol: '₹',
  locale: 'en-IN',
} as const;

const inrFormatter = new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
  style: 'currency',
  currency: CURRENCY_CONFIG.code,
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

export function formatINRRange(minAmount: number, maxAmount: number): string {
  return `${formatINR(minAmount)} – ${formatINR(maxAmount)}`;
}

export const QUOTATION_LABELS = {
  customPricing: 'Custom Pricing',
  requestQuote: 'Request a Quote',
  discoveryNote:
    'All engagements are scoped transparently in INR (₹) after technical discovery rather than fixed generic pricing.',
} as const;
