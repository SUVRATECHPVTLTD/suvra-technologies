import { RotateCcw, X } from 'lucide-react';
import { ASSISTANT_CONFIG } from '../../config/assistant';
import { BRAND_ASSETS } from '../../config/site';

interface AssistantHeaderProps {
  onReset: () => void;
  onClose: () => void;
  canReset: boolean;
  aiQuotaExhausted: boolean;
}

export function AssistantHeader({
  onReset,
  onClose,
  canReset,
  aiQuotaExhausted,
}: AssistantHeaderProps) {
  const modeLabel =
    aiQuotaExhausted || !ASSISTANT_CONFIG.aiBackendEnabled
      ? 'Quick Answers'
      : 'Workers AI';

  return (
    <div className="px-4 py-3.5 bg-[#071426] text-white border-b border-slate-800 flex items-center justify-between gap-2.5 shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-[#0F172A] border border-[#2563EB]/60 flex items-center justify-center shrink-0">
          <img
            src={BRAND_ASSETS.symbolDarkBg}
            alt="Suvra Technologies Symbol"
            width={682}
            height={654}
            className="w-6 h-6 object-contain"
          />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-sm sm:text-[15px] font-semibold text-white leading-tight">
            {ASSISTANT_CONFIG.assistantName}
          </h2>
          <p className="text-[11px] text-[#06B6D4] leading-tight mt-0.5">
            {ASSISTANT_CONFIG.supportingLabel}{' '}
            <span className="text-slate-300" aria-label={`Mode: ${ASSISTANT_CONFIG.modeDisplayLabel}`}>
              · {modeLabel}
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {canReset && (
          <button
            type="button"
            onClick={onReset}
            title="Reset conversation"
            aria-label="Reset conversation"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          title="Close assistant"
          aria-label="Close Suvra AI Assistant"
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4]"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
