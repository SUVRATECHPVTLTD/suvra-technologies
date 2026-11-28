import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MOTION_EASING } from '../../config/motion';
import { BRAND_ASSETS } from '../../config/site';
import { AssistantHeader } from './AssistantHeader';
import { useAssistant } from './AssistantProvider';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { SuggestedQuestions } from './SuggestedQuestions';

export function AssistantPanel() {
  const {
    isOpen,
    isSending,
    messages,
    hasUserInteracted,
    aiQuotaExhausted,
    closeAssistant,
    sendMessage,
    resetConversation,
  } = useAssistant();

  const prefersReducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const focusTimer = window.setTimeout(() => {
      const input = panelRef.current?.querySelector<HTMLTextAreaElement>('#suvra-assistant-input');
      input?.focus();
    }, 60);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeAssistant(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeAssistant, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const container = scrollRef.current;
    if (!container) return;

    if (!hasUserInteracted && !isSending) {
      container.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    container.scrollTo({
      top: container.scrollHeight,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [hasUserInteracted, isOpen, isSending, messages, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          ref={panelRef}
          id="suvra-assistant-dialog"
          role="dialog"
          aria-label="Suvra AI Assistant"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.22, ease: MOTION_EASING }}
          className="fixed z-50 inset-x-3 bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[400px] h-[min(580px,calc(100dvh-1.5rem))] sm:h-[min(590px,calc(100dvh-2.5rem))] rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl flex flex-col overflow-hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <AssistantHeader
            onReset={resetConversation}
            onClose={() => closeAssistant(true)}
            canReset={hasUserInteracted}
            aiQuotaExhausted={aiQuotaExhausted}
          />

          <div
            ref={scrollRef}
            aria-live="polite"
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[var(--bg-canvas)]"
          >
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onNavigate={() => closeAssistant(false)}
              />
            ))}

            {!hasUserInteracted && (
              <SuggestedQuestions
                disabled={isSending}
                onSelect={(q) => void sendMessage(q)}
              />
            )}

            {isSending && (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex items-center justify-center shrink-0">
                  <img
                    src={BRAND_ASSETS.symbolLightBg}
                    alt=""
                    aria-hidden="true"
                    width={682}
                    height={654}
                    className="dark:hidden w-4 h-4 object-contain"
                  />
                  <img
                    src={BRAND_ASSETS.symbolDarkBg}
                    alt=""
                    aria-hidden="true"
                    width={682}
                    height={654}
                    className="hidden dark:block w-4 h-4 object-contain"
                  />
                </div>
                <div className="px-3.5 py-2 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-muted)]">
                  Preparing answer...
                </div>
              </div>
            )}
          </div>

          <ChatInput onSend={sendMessage} disabled={isSending} />

          <div className="px-4 py-2 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 text-[10px] text-[var(--text-muted)] shrink-0">
            <span>Powered by Suvra Technologies</span>
            <Link
              to="/privacy-policy"
              onClick={() => closeAssistant(false)}
              className="underline hover:text-[var(--text-primary)]"
            >
              In-memory only · Privacy Policy
            </Link>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
