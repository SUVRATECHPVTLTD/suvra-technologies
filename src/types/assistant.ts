export type AssistantMode = 'ai' | 'faq' | 'fallback' | 'unavailable';

export type AssistantLanguage = 'en' | 'hi' | 'hinglish';

export type AssistantAvailability = 'faq_only' | 'ai_available' | 'quota_exhausted';

export interface AssistantAction {
  label: string;
  type: 'route' | 'whatsapp' | 'start_project' | 'reset';
  to?: string;
  prefillMessage?: string;
}

export interface ChatMessageItem {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  mode?: AssistantMode;
  actions?: AssistantAction[];
  timestamp: string;
}

export interface ChatContextTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatApiRequest {
  message: string;
  conversationId: string;
  language: AssistantLanguage;
  currentPage: string;
  limitedConversationContext: ChatContextTurn[];
}

export interface ChatApiResponse {
  message: string;
  mode: AssistantMode;
  requestId: string;
  suggestedActions: AssistantAction[];
  availability: AssistantAvailability;
  errorCode?: string;
}

/**
 * Future Cloudflare Zero Trust Admin Dashboard contract for Suvra AI Assistant settings.
 */
export interface AssistantAdminConfig {
  enabled: boolean;
  aiBackendEnabled: boolean;
  assistantName: string;
  supportingLabel: string;
  modeDisplayLabel: string;
  modelId: string;
  maxInputChars: number;
  maxOutputTokens: number;
  maxSessionAiRequests: number;
  dailyAiBudgetRequests: number;
  rateLimitWindowMs: number;
  requestTimeoutMs: number;
  maxContextTurns: number;
  welcomeMessage: string;
  fallbackMessage: string;
  suggestedQuestions: readonly string[];
}
