import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, MessageSquare, RotateCcw } from 'lucide-react';
import { formatINR, formatINRRange, QUOTATION_LABELS } from '../../config/currency';
import { SITE_CONFIG } from '../../config/site';
import { useToast } from '../../context/ToastContext';
import { SERVICES_DATA } from '../../data/services';
import { suvraApi, type EnquirySubmissionResponse } from '../../services/apiClient';
import type { EnquiryPayload } from '../../types/cms';
import { ErrorState, LoadingState } from '../ui/FeedbackStates';
import { FormField } from './FormField';

const STEPS = [
  { id: 1, title: 'Services' },
  { id: 2, title: 'Requirements' },
  { id: 3, title: 'Budget & Timeline' },
  { id: 4, title: 'Contact & Review' },
] as const;

const BUDGET_OPTIONS = [
  `${QUOTATION_LABELS.customPricing} — ${QUOTATION_LABELS.requestQuote}`,
  `Under ${formatINR(100000)}`,
  formatINRRange(100000, 350000),
  formatINRRange(350000, 1000000),
  `Above ${formatINR(1000000)}`,
] as const;

const TIMELINE_OPTIONS = [
  'Flexible / Exploratory',
  '4 – 8 Weeks',
  '2 – 4 Months',
  'Ongoing Partnership',
] as const;

const INITIAL_PAYLOAD: EnquiryPayload = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  services: [],
  projectDescription: '',
  budgetRange: BUDGET_OPTIONS[0],
  timeline: TIMELINE_OPTIONS[0],
  consent: false,
};

type Errors = Partial<Record<keyof EnquiryPayload, string>>;

export function MultiStepEnquiryForm({ preselectedService }: { preselectedService?: string }) {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState<EnquiryPayload>(() => ({
    ...INITIAL_PAYLOAD,
    services: preselectedService ? [preselectedService] : [],
  }));
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<EnquirySubmissionResponse | null>(null);

  const toggleService = (serviceName: string) => {
    setPayload((prev) => {
      const exists = prev.services.includes(serviceName);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== serviceName)
          : [...prev.services, serviceName],
      };
    });
    setErrors((prev) => ({ ...prev, services: undefined }));
  };

  const validateStep = (targetStep: number): boolean => {
    const nextErrors: Errors = {};
    if (targetStep === 1 && payload.services.length === 0) {
      nextErrors.services = 'Select at least one service area to continue.';
    }
    if (
      targetStep === 2 &&
      payload.projectDescription.trim().length > 0 &&
      payload.projectDescription.trim().length < 15
    ) {
      nextErrors.projectDescription =
        'If sharing project details, include at least 15 characters—or leave blank to discuss during discovery.';
    }
    if (targetStep === 4) {
      if (payload.fullName.trim().length < 2) {
        nextErrors.fullName = 'Enter your full name.';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
        nextErrors.email = 'Enter a valid email address.';
      }
      if (
        payload.phone.trim().length > 0 &&
        payload.phone.trim().replace(/\D/g, '').length < 7
      ) {
        nextErrors.phone = 'Enter a valid phone or WhatsApp number (at least 7 digits), or leave blank.';
      }
      if (!payload.consent) {
        nextErrors.consent = 'Confirm consent to prepare this enquiry draft.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const result = await suvraApi.submitEnquiry(payload);
      if (!result.ok) {
        setSubmitError(result.message || 'Submission could not be completed.');
        showToast('Enquiry submission notice', result.message, 'error');
        return;
      }
      setSubmissionResult(result.data);
      showToast('Project enquiry brief prepared', `Reference ${result.data.referenceCode}`, 'success');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unexpected submission error.');
    } finally {
      setSubmitting(false);
    }
  };

  const buildMessageBody = () =>
    [
      'Suvra Technologies — Project Enquiry Draft',
      `Name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone.trim() || 'Not provided'}`,
      `Company: ${payload.companyName.trim() || 'Not specified'}`,
      `Selected Services: ${payload.services.join(', ')}`,
      `Estimated Budget: ${payload.budgetRange}`,
      `Estimated Timeline: ${payload.timeline}`,
      '',
      'Project Requirements:',
      payload.projectDescription.trim() || 'Not provided — discuss during initial discovery.',
    ].join('\n');

  const mailtoHref = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    `Project Enquiry — ${payload.companyName || payload.fullName}`
  )}&body=${encodeURIComponent(buildMessageBody())}`;

  const whatsappHref = `${SITE_CONFIG.whatsappHref}?text=${encodeURIComponent(buildMessageBody())}`;

  if (submitting) {
    return <LoadingState label="Validating enquiry payload and preparing brief..." />;
  }

  if (submissionResult) {
    return (
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
              {submissionResult.mode === 'preview-draft' ? 'Preview Mode · Validated Brief' : 'Enquiry Submitted'} · {submissionResult.referenceCode}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-[var(--text-primary)]">
              Your enquiry draft is ready to send
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              {submissionResult.notice}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-5 text-sm">
          <div>
            <dt className="text-xs text-[var(--text-muted)]">Contact</dt>
            <dd className="mt-1 font-medium text-[var(--text-primary)]">
              {payload.fullName} · {payload.email}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--text-muted)]">Phone &amp; Company</dt>
            <dd className="mt-1 font-medium text-[var(--text-primary)]">
              {payload.phone.trim() || 'Phone omitted'}{payload.companyName.trim() ? ` · ${payload.companyName.trim()}` : ''}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs text-[var(--text-muted)]">Selected Services</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{payload.services.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--text-muted)]">Budget Range</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{payload.budgetRange}</dd>
          </div>
          <div>
            <dt className="text-xs text-[var(--text-muted)]">Timeline</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{payload.timeline}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={mailtoHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Open Email Draft</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] rounded-lg transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" />
            <span>Send via WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setSubmissionResult(null);
              setPayload(INITIAL_PAYLOAD);
              setStep(1);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Start New Enquiry</span>
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full px-3.5 py-2.5 text-sm rounded-lg border border-[var(--border-strong)] bg-[var(--bg-canvas)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]';

  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs text-[#2563EB] dark:text-[#06B6D4]">
            Step {step} of {STEPS.length} — {STEPS[step - 1].title}
          </span>
          <span className="font-mono text-xs text-[var(--text-muted)]">Frontend Preview Mode</span>
        </div>
        <div className="grid grid-cols-4 gap-2" aria-label="Form progress">
          {STEPS.map((item) => (
            <div
              key={item.id}
              className={`h-1.5 rounded-full transition-colors ${
                item.id <= step ? 'bg-[#2563EB]' : 'bg-[var(--border-subtle)]'
              }`}
            />
          ))}
        </div>
      </div>

      {submitError && (
        <div className="mb-6">
          <ErrorState
            title="Preview Delivery Error"
            description={submitError}
            onRetry={handleSubmit}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Select the services you need
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Choose one or more capabilities relevant to your project scope.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SERVICES_DATA.map((service) => {
              const checked = payload.services.includes(service.name);
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => toggleService(service.name)}
                  aria-pressed={checked}
                  className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                    checked
                      ? 'border-[#2563EB] bg-[#2563EB]/8 text-[var(--text-primary)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">{service.name}</span>
                  <span
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      checked
                        ? 'bg-[#2563EB] border-[#2563EB] text-white'
                        : 'border-[var(--border-strong)]'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.services && (
            <p role="alert" className="text-xs text-red-700 dark:text-red-400">
              {errors.services}
            </p>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Describe your project requirements
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Share your goals, target users, existing tools, or technical constraints.
            </p>
          </div>

          <FormField
            id="enquiry-description"
            label="Project Details"
            error={errors.projectDescription}
            hint="Optional — outline your goals or constraints (at least 15 characters if entered). Avoid sharing confidential passwords."
          >
            <textarea
              id="enquiry-description"
              rows={6}
              value={payload.projectDescription}
              aria-invalid={Boolean(errors.projectDescription)}
              aria-describedby={errors.projectDescription ? 'enquiry-description-error' : 'enquiry-description-hint'}
              onChange={(e) => {
                setPayload({ ...payload, projectDescription: e.target.value });
                setErrors({ ...errors, projectDescription: undefined });
              }}
              placeholder="Outline what you want to build, integrate, or modernize (optional)..."
              className={inputClass}
            />
          </FormField>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Estimated budget &amp; timeline
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Both selections are optional and help us prepare realistic architectural options.
            </p>
          </div>

          <FormField id="enquiry-budget" label="Estimated Budget Range">
            <select
              id="enquiry-budget"
              value={payload.budgetRange}
              onChange={(e) => setPayload({ ...payload, budgetRange: e.target.value })}
              className={inputClass}
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </FormField>

          <FormField id="enquiry-timeline" label="Estimated Timeline">
            <select
              id="enquiry-timeline"
              value={payload.timeline}
              onChange={(e) => setPayload({ ...payload, timeline: e.target.value })}
              className={inputClass}
            >
              {TIMELINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
              Contact details &amp; review
            </h3>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Personal details remain strictly in memory for preview drafting and are not stored in browser local storage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="enquiry-name" label="Full Name" required error={errors.fullName}>
              <input
                id="enquiry-name"
                type="text"
                autoComplete="name"
                value={payload.fullName}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? 'enquiry-name-error' : undefined}
                onChange={(e) => {
                  setPayload({ ...payload, fullName: e.target.value });
                  setErrors({ ...errors, fullName: undefined });
                }}
                placeholder="Your full name"
                className={inputClass}
              />
            </FormField>

            <FormField id="enquiry-email" label="Email Address" required error={errors.email}>
              <input
                id="enquiry-email"
                type="email"
                autoComplete="email"
                value={payload.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'enquiry-email-error' : undefined}
                onChange={(e) => {
                  setPayload({ ...payload, email: e.target.value });
                  setErrors({ ...errors, email: undefined });
                }}
                placeholder="you@company.com"
                className={inputClass}
              />
            </FormField>

            <FormField id="enquiry-phone" label="Phone / WhatsApp" error={errors.phone}>
              <input
                id="enquiry-phone"
                type="tel"
                autoComplete="tel"
                value={payload.phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
                onChange={(e) => {
                  setPayload({ ...payload, phone: e.target.value });
                  setErrors({ ...errors, phone: undefined });
                }}
                placeholder="+91 98765 43210 (optional)"
                className={inputClass}
              />
            </FormField>

            <FormField id="enquiry-company" label="Company Name">
              <input
                id="enquiry-company"
                type="text"
                autoComplete="organization"
                value={payload.companyName}
                onChange={(e) => setPayload({ ...payload, companyName: e.target.value })}
                placeholder="Organization or startup name"
                className={inputClass}
              />
            </FormField>
          </div>

          <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-xs text-[var(--text-secondary)] space-y-1">
            <p className="font-medium text-[var(--text-primary)]">
              Selected Services ({payload.services.length}): {payload.services.join(', ')}
            </p>
            <p>
              Budget: {payload.budgetRange} · Timeline: {payload.timeline}
            </p>
          </div>

          <div>
            <label className="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-secondary)] cursor-pointer">
              <input
                type="checkbox"
                checked={payload.consent}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'enquiry-consent-error' : undefined}
                onChange={(e) => {
                  setPayload({ ...payload, consent: e.target.checked });
                  setErrors({ ...errors, consent: undefined });
                }}
                className="mt-1 h-4 w-4 rounded border-[var(--border-strong)] text-[#2563EB] focus:ring-[#2563EB]"
              />
              <span>
                I understand this frontend preview prepares a local enquiry draft for email or WhatsApp handoff rather than transmitting data to a remote server yet.
              </span>
            </label>
            {errors.consent && (
              <p id="enquiry-consent-error" role="alert" className="mt-1.5 text-xs text-red-700 dark:text-red-400">
                {errors.consent}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] border border-[var(--border-strong)] rounded-lg hover:bg-[var(--bg-elevated)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back</span>
          </button>
        ) : (
          <span className="text-xs text-[var(--text-muted)]">
            Direct WhatsApp: {SITE_CONFIG.phoneDisplay}
          </span>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Prepare Enquiry Draft</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
