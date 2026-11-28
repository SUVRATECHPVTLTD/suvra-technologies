import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { useLocation } from 'react-router-dom';
import { ASSISTANT_CONFIG } from '../../config/assistant';
import { sendAssistantQuery } from '../../services/assistantClient';
import type { ChatContextTurn, ChatMessageItem } from '../../types/assistant';

interface AssistantContextValue {
  isOpen: boolean;
  isSending: boolean;
  messages: ChatMessageItem[];
  hasUserInteracted: boolean;
  sessionAiCount: number;
  aiQuotaExhausted: boolean;
  launcherRef: RefObject<HTMLButtonElement | null>;
  openAssistant: () => void;
  closeAssistant: (restoreFocus?: boolean) => void;
  toggleAssistant: () => void;
  sendMessage: (text: string) => Promise<void>;
  resetConversation: () => void;
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

function createWelcomeMessage(): ChatMessageItem {
  return {
    id: `welcome-${Date.now().toString(36)}`,
    role: 'assistant',
    content: ASSISTANT_CONFIG.welcomeMessage,
    mode: ASSISTANT_CONFIG.aiBackendEnabled ? 'ai' : 'faq',
    timestamp: new Date().toISOString(),
  };
}

export function AssistantProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessageItem[]>(() => [createWelcomeMessage()]);
  const [sessionAiCount, setSessionAiCount] = useState(0);
  const [aiQuotaExhausted, setAiQuotaExhausted] = useState(false);
  const [conversationId, setConversationId] = useState(
    () => `conv-${Math.random().toString(36).slice(2, 9)}`
  );

  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const inFlightTextRef = useRef<string | null>(null);

  const openAssistant = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeAssistant = useCallback((restoreFocus = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        launcherRef.current?.focus();
      });
    }
  }, []);

  const toggleAssistant = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!next) {
        requestAnimationFrame(() => {
          launcherRef.current?.focus();
        });
      }
      return next;
    });
  }, []);

  const resetConversation = useCallback(() => {
    inFlightTextRef.current = null;
    setIsSending(false);
    setMessages([createWelcomeMessage()]);
    setConversationId(`conv-${Math.random().toString(36).slice(2, 9)}`);
  }, []);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const trimmed = rawText.slice(0, ASSISTANT_CONFIG.maxInputChars).trim();
      if (!trimmed || isSending) return;
      if (inFlightTextRef.current === trimmed) return;

      inFlightTextRef.current = trimmed;
      const userMsg: ChatMessageItem = {
        id: `usr-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
        role: 'user',
        content: trimmed,
        timestamp: new Date().toISOString(),
      };

      const recentTurns: ChatContextTurn[] = messages
        .slice(-ASSISTANT_CONFIG.maxContextTurns)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [...prev, userMsg]);
      setIsSending(true);

      try {
        // Brief natural delay in FAQ mode so UI transition feels responsive without blocking
        if (!ASSISTANT_CONFIG.aiBackendEnabled) {
          await new Promise((resolve) => setTimeout(resolve, 140));
        }

        const result = await sendAssistantQuery({
          message: trimmed,
          conversationId,
          currentPage: pathname,
          recentTurns,
          sessionAiCount,
          aiQuotaExhausted,
        });

        if (result.usedRemoteAi) {
          setSessionAiCount((c) => c + 1);
        }
        if (result.markQuotaExhausted) {
          setAiQuotaExhausted(true);
        }

        const assistantMsg: ChatMessageItem = {
          id: `ast-${result.response.requestId}`,
          role: 'assistant',
          content: result.response.message,
          mode: result.response.mode,
          actions: result.response.suggestedActions,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } finally {
        inFlightTextRef.current = null;
        setIsSending(false);
      }
    },
    [aiQuotaExhausted, conversationId, isSending, messages, pathname, sessionAiCount]
  );

  const hasUserInteracted = useMemo(
    () => messages.some((m) => m.role === 'user'),
    [messages]
  );

  const value = useMemo<AssistantContextValue>(
    () => ({
      isOpen,
      isSending,
      messages,
      hasUserInteracted,
      sessionAiCount,
      aiQuotaExhausted,
      launcherRef,
      openAssistant,
      closeAssistant,
      toggleAssistant,
      sendMessage,
      resetConversation,
    }),
    [
      aiQuotaExhausted,
      closeAssistant,
      hasUserInteracted,
      isOpen,
      isSending,
      messages,
      openAssistant,
      resetConversation,
      sendMessage,
      sessionAiCount,
      toggleAssistant,
    ]
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) {
    throw new Error('useAssistant must be used inside AssistantProvider');
  }
  return ctx;
}
