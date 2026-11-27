import { BRAND_ASSETS } from '../../config/site';

interface BrandMarkProps {
  compact?: boolean;
}

/**
 * Renders the official approved Option 4 ST symbol (immutable raster derivatives from
 * Suvra-Technologies-Brand-Assets/01-logos/) paired with crisp wordmark typography.
 * Exact 682:654 aspect ratio is preserved with zero distortion, recoloring, or replacement.
 */
export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className="inline-flex items-center gap-2.5 shrink-0 select-none">
      <img
        src={BRAND_ASSETS.symbolLightBg}
        alt="Suvra Technologies ST Emblem"
        width={682}
        height={654}
        className={`dark:hidden w-auto object-contain shrink-0 transition-all duration-200 ${
          compact ? 'h-8' : 'h-9'
        }`}
      />
      <img
        src={BRAND_ASSETS.symbolDarkBg}
        alt="Suvra Technologies ST Emblem"
        width={682}
        height={654}
        className={`hidden dark:block w-auto object-contain shrink-0 transition-all duration-200 ${
          compact ? 'h-8' : 'h-9'
        }`}
      />
      <span
        className={`font-display font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap transition-all duration-200 ${
          compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
        }`}
      >
        Suvra Technologies
      </span>
    </span>
  );
}

/**
 * Renders the official full horizontal lockup (1500x400) for generous spaces such as
 * the corporate footer, loading screens, and splash/hero lockups.
 */
export function BrandHorizontalLockup({ className = 'h-14' }: { className?: string }) {
  return (
    <span className="inline-flex items-center shrink-0 select-none">
      <img
        src={BRAND_ASSETS.horizontalLightBg}
        alt="Suvra Technologies — Engineering Tomorrow. Empowering Today."
        width={1500}
        height={400}
        className={`dark:hidden w-auto object-contain ${className}`}
      />
      <img
        src={BRAND_ASSETS.horizontalDarkBg}
        alt="Suvra Technologies — Engineering Tomorrow. Empowering Today."
        width={1500}
        height={400}
        className={`hidden dark:block w-auto object-contain ${className}`}
      />
    </span>
  );
}

/**
 * Renders the standalone Option 4 ST symbol in light/dark variants at exact aspect ratio.
 */
export function BrandSymbol({ className = 'h-10' }: { className?: string }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 select-none">
      <img
        src={BRAND_ASSETS.symbolLightBg}
        alt="Suvra Technologies ST Symbol"
        width={682}
        height={654}
        className={`dark:hidden w-auto object-contain ${className}`}
      />
      <img
        src={BRAND_ASSETS.symbolDarkBg}
        alt="Suvra Technologies ST Symbol"
        width={682}
        height={654}
        className={`hidden dark:block w-auto object-contain ${className}`}
      />
    </span>
  );
}
