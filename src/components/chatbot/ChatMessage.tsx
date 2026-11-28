import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { TRANSITION_MICRO } from '../../config/motion';
import { BRAND_ASSETS, SITE_CONFIG } from '../../config/site';
import type { ChatMessageItem } from '../../types/assistant';

interface ChatMessageProps {
  message: ChatMessageItem;
  onNavigate?: () => void;
}

export function ChatMessage({ message, onNavigate }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const lines = message.content.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={TRANSITION_MICRO}
      className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] flex items-center justify-center shrink-0 mt-0.5">
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
      )}

      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
          isUser
            ? 'bg-[#2563EB] text-white rounded-br-sm'
            : 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-tl-sm'
        }`}
      >
        <div className="space-y-1.5 break-words">
          {lines.map((line, index) =>
            line.trim() === '' ? (
              <div key={index} className="h-1" aria-hidden="true" />
            ) : (
              <p key={index}>{line}</p>
            )
          )}
        </div>

        {!isUser && message.actions && message.actions.length > 0 && (
          <div className="mt-3 pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap gap-1.5">
            {message.actions.map((action) => {
              if (action.type === 'whatsapp') {
                const href = action.prefillMessage
                  ? `${SITE_CONFIG.whatsappHref}?text=${encodeURIComponent(action.prefillMessage)}`
                  : SITE_CONFIG.whatsappHref;
                return (
                  <a
                    key={action.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-[11px] font-medium text-emerald-800 dark:text-emerald-300 hover:bg-[#25D366]/25 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{action.label}</span>
                  </a>
                );
              }

              return (
                <Link
                  key={action.label}
                  to={action.to || '/start-a-project'}
                  onClick={onNavigate}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[11px] font-medium text-[#2563EB] dark:text-[#06B6D4] hover:border-[#2563EB] transition-colors"
                >
                  <span>{action.label}</span>
                  <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
