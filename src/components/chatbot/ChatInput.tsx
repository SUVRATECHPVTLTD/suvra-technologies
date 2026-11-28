import { useState, type KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';
import { ASSISTANT_CONFIG } from '../../config/assistant';

interface ChatInputProps {
  onSend: (text: string) => Promise<void> | void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [draft, setDraft] = useState('');
  const maxLen = ASSISTANT_CONFIG.maxInputChars;
  const trimmed = draft.trim();
  const remaining = maxLen - draft.length;

  const submit = async () => {
    if (!trimmed || disabled) return;
    const text = trimmed.slice(0, maxLen);
    setDraft('');
    await onSend(text);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  return (
    <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] shrink-0">
      <div className="flex items-end gap-2">
        <div className="flex-1 min-w-0">
          <label htmlFor="suvra-assistant-input" className="sr-only">
            Ask a question to Suvra AI Assistant
          </label>
          <textarea
            id="suvra-assistant-input"
            rows={2}
            maxLength={maxLen}
            value={draft}
            disabled={disabled}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about services, apps, AI, or project planning..."
            className="w-full resize-none rounded-xl border border-[var(--border-strong)] bg-[var(--bg-canvas)] px-3 py-2 text-xs sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] disabled:opacity-60"
          />
        </div>
        <button
          type="button"
          disabled={disabled || trimmed.length === 0}
          onClick={() => void submit()}
          aria-label="Send message"
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-400 dark:disabled:bg-slate-700 text-white transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
        >
          <SendHorizontal className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-1.5 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
        <span>Enter to send · Shift + Enter for new line</span>
        {draft.length > maxLen - 120 && (
          <span className="font-mono tabular-nums">
            {remaining} chars left
          </span>
        )}
      </div>
    </div>
  );
}
