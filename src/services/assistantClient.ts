import { ASSISTANT_API_BASE_URL, ASSISTANT_CONFIG } from '../config/assistant';
import type {
  AssistantAvailability,
  ChatApiRequest,
  ChatApiResponse,
  ChatContextTurn,
} from '../types/assistant';
import { detectVisitorLanguage, runDeterministicFaqEngine } from './faqEngine';

/**
 * Assistant transport client.
 * - Defaults strictly to Quick Answers / Automated FAQ Mode without calling non-existent endpoints.
 * - When future Cloudflare Workers AI backend is explicitly enabled and configured,
 *   enforces message length limits, request timeout, session AI caps, duplicate submission guard,
 *   and automatic graceful degradation to FAQ mode on quota exhaustion or network error.
 */
export async function sendAssistantQuery(params: {
  message: string;
  conversationId: string;
  currentPage: string;
  recentTurns: ChatContextTurn[];
  sessionAiCount: number;
  aiQuotaExhausted: boolean;
}): Promise<{
  response: ChatApiResponse;
  usedRemoteAi: boolean;
  markQuotaExhausted: boolean;
}> {
  const sanitized = params.message.slice(0, ASSISTANT_CONFIG.maxInputChars).trim();
  const detectedLanguage = detectVisitorLanguage(sanitized);

  // If live Workers AI is disabled, API URL unconfigured, or session quota exhausted -> stay in local FAQ mode
  const canAttemptRemoteAi =
    ASSISTANT_CONFIG.enabled &&
    ASSISTANT_CONFIG.aiBackendEnabled &&
    Boolean(ASSISTANT_API_BASE_URL) &&
    !params.aiQuotaExhausted &&
    params.sessionAiCount < ASSISTANT_CONFIG.maxSessionAiRequests;

  if (!canAttemptRemoteAi) {
    const faqResult = runDeterministicFaqEngine(sanitized);
    const availability: AssistantAvailability = params.aiQuotaExhausted
      ? 'quota_exhausted'
      : 'faq_only';

    return {
      usedRemoteAi: false,
      markQuotaExhausted: params.aiQuotaExhausted,
      response: {
        message: faqResult.message,
        mode: faqResult.mode,
        requestId: `faq-${Date.now().toString(36)}`,
        suggestedActions: faqResult.suggestedActions,
        availability,
      },
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ASSISTANT_CONFIG.requestTimeoutMs);

  const requestBody: ChatApiRequest = {
    message: sanitized,
    conversationId: params.conversationId,
    language: detectedLanguage,
    currentPage: params.currentPage,
    limitedConversationContext: params.recentTurns.slice(-ASSISTANT_CONFIG.maxContextTurns),
  };

  try {
    const res = await fetch(`${ASSISTANT_API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    if (res.status === 429) {
      const faqFallback = runDeterministicFaqEngine(sanitized);
      return {
        usedRemoteAi: false,
        markQuotaExhausted: true,
        response: {
          message: faqFallback.message,
          mode: 'fallback',
          requestId: `faq-limit-${Date.now().toString(36)}`,
          suggestedActions: faqFallback.suggestedActions,
          availability: 'quota_exhausted',
          errorCode: 'QUOTA_EXHAUSTED',
        },
      };
    }

    if (!res.ok) {
      throw new Error(`HTTP_${res.status}`);
    }

    const remote = (await res.json()) as Partial<ChatApiResponse>;
    if (typeof remote.message !== 'string' || !remote.message.trim()) {
      throw new Error('INVALID_RESPONSE');
    }

    return {
      usedRemoteAi: remote.mode === 'ai',
      markQuotaExhausted: remote.availability === 'quota_exhausted',
      response: {
        message: remote.message,
        mode: remote.mode ?? 'ai',
        requestId: remote.requestId ?? `ai-${Date.now().toString(36)}`,
        suggestedActions: Array.isArray(remote.suggestedActions) ? remote.suggestedActions : [],
        availability: remote.availability ?? 'ai_available',
        errorCode: remote.errorCode,
      },
    };
  } catch {
    // Graceful silent degradation to verified FAQ mode — never exposes credentials or broken AI promises
    const faqFallback = runDeterministicFaqEngine(sanitized);
    return {
      usedRemoteAi: false,
      markQuotaExhausted: false,
      response: {
        message: faqFallback.message,
        mode: faqFallback.mode,
        requestId: `faq-recover-${Date.now().toString(36)}`,
        suggestedActions: faqFallback.suggestedActions,
        availability: 'faq_only',
        errorCode: 'REMOTE_FALLBACK',
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
