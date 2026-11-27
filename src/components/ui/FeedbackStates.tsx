import { AlertTriangle, RefreshCw } from 'lucide-react';
import type { ReactNode } from 'react';
import { BrandSymbol } from './BrandMark';

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-10 text-center">
      <div className="mb-4 flex justify-center">
        <BrandSymbol className="h-11 opacity-85" />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = 'Loading content...' }: { label?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-8 sm:p-10 text-center"
    >
      <div className="mb-4 flex justify-center">
        <BrandSymbol className="h-11" />
      </div>
      <div className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
        <RefreshCw className="w-4 h-4 text-[#2563EB] dark:text-[#06B6D4] animate-spin" aria-hidden="true" />
        <span>{label}</span>
      </div>
    </div>
  );
}

export function ErrorState({
  title = 'Unable to complete request',
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-300 dark:border-red-900/70 bg-red-50/70 dark:bg-red-950/30 p-6"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-700 dark:text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h3 className="font-display text-base font-semibold text-red-900 dark:text-red-200">{title}</h3>
          <p className="mt-1 text-sm text-red-800 dark:text-red-300 leading-relaxed">{description}</p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 px-4 py-2 text-xs font-medium rounded-lg bg-red-700 text-white hover:bg-red-800 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
