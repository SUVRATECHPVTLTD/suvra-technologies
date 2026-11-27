import { AlertCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export function FormField({ id, label, required = false, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
        <span>{label}</span>
        {required ? (
          <span className="ml-1 text-[#2563EB] dark:text-[#06B6D4]" aria-hidden="true">*</span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-[var(--text-muted)]">(Optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-[var(--text-muted)]">{hint}</p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-xs text-red-700 dark:text-red-400"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
