import type { AssistantAdminConfig } from '../types/assistant';

const ENV: Partial<ImportMetaEnv> =
  typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

const API_BASE_URL = ((ENV.VITE_API_BASE_URL as string | undefined) || '').trim().replace(/\/$/, '');

/**
 * Explicit activation gate for future Cloudflare Workers AI integration.
 * Remains strictly disabled (FAQ / Quick Answers Mode) until backend deployment,
 * quota validation, and Turnstile / rate-limit protection are verified.
 */
export const ASSISTANT_REMOTE_AI_ENABLED =
  ENV.VITE_ENABLE_ASSISTANT_AI === 'true' && Boolean(API_BASE_URL);

export const ASSISTANT_API_BASE_URL = API_BASE_URL;

export const ASSISTANT_CONFIG: AssistantAdminConfig = {
  enabled: true,
  aiBackendEnabled: ASSISTANT_REMOTE_AI_ENABLED,
  assistantName: 'Suvra AI Assistant',
  supportingLabel: 'Your Technology Guide',
  modeDisplayLabel: ASSISTANT_REMOTE_AI_ENABLED ? 'Cloudflare AI + FAQ' : 'Automated FAQ Assistant',
  modelId: '', // Configured server-side in Cloudflare Workers after verifying current free-tier eligible models
  maxInputChars: 500,
  maxOutputTokens: 450,
  maxSessionAiRequests: 10,
  dailyAiBudgetRequests: 500,
  rateLimitWindowMs: 10 * 60 * 1000,
  requestTimeoutMs: 12000,
  maxContextTurns: 4,
  welcomeMessage: [
    'Hello! Welcome to Suvra Technologies.',
    '',
    "I'm your technology guide. I can help you explore our services, understand development options and discuss your project requirements.",
    '',
    'How can I help you today?',
  ].join('\n'),
  fallbackMessage:
    'I can help with information about Suvra Technologies and our services. For more specific assistance, please contact our team.',
  suggestedQuestions: [
    'What services do you provide?',
    'How much does website development cost?',
    'Can you develop Android and iOS applications?',
    'Can you automate my business?',
    'I need custom software.',
    'Help me plan my project.',
    'How can I contact your team?',
  ],
};
