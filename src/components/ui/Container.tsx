import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'split';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'split',
  className = '',
}: SectionHeaderProps) {
  if (align === 'left') {
    return (
      <div className={`max-w-3xl ${className}`}>
        {eyebrow && (
          <p className="font-mono text-xs font-medium tracking-wide text-[#2563EB] dark:text-[#06B6D4] mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end ${className}`}>
      <div className="lg:col-span-7">
        {eyebrow && (
          <p className="font-mono text-xs font-medium tracking-wide text-[#2563EB] dark:text-[#06B6D4] mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          {title}
        </h2>
      </div>
      {description && (
        <div className="lg:col-span-5">
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
