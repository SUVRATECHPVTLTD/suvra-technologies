import { ASSISTANT_CONFIG } from '../../config/assistant';

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
}

export function SuggestedQuestions({ onSelect, disabled = false }: SuggestedQuestionsProps) {
  return (
    <div className="space-y-2 pt-1 pb-1.5">
      <p className="text-[11px] font-medium text-[var(--text-muted)]">
        Quick questions (English, Hindi &amp; Hinglish supported)
      </p>
      <div className="flex flex-wrap gap-1.5">
        {ASSISTANT_CONFIG.suggestedQuestions.map((question) => (
          <button
            key={question}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(question)}
            className="text-left px-2.5 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] font-medium text-[var(--text-secondary)] hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:border-[#06B6D4] dark:hover:text-[#06B6D4] disabled:opacity-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
