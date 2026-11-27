import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export type ToastTone = 'info' | 'success' | 'error';

interface ToastProps {
  title: string;
  description?: string;
  tone?: ToastTone;
  onClose: () => void;
}

export function Toast({ title, description, tone = 'info', onClose }: ToastProps) {
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'error' ? AlertCircle : Info;
  const toneClass =
    tone === 'success'
      ? 'text-emerald-600 dark:text-emerald-400'
      : tone === 'error'
        ? 'text-red-600 dark:text-red-400'
        : 'text-[#2563EB] dark:text-[#06B6D4]';

  return (
    <div
      role="status"
      className="pointer-events-auto flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 shadow-lg text-[var(--text-primary)]"
    >
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${toneClass}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">{description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
      >
        <X className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
