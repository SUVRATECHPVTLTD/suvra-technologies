# Suvra AI Assistant Architecture — "Your Technology Guide"

This document outlines the architecture, brand rules, multilingual FAQ engine, future Cloudflare Workers AI contract, free-tier cost controls, and security guardrails for **Suvra AI Assistant**.

## 1. Visual Identity & Official Brand Asset Enforcement

- **Brand Emblem**: Uses exclusively the immutable Option 4 ST transparent PNG symbol (`/brand/logos/symbol-transparent.png`, backed up at `/Suvra-Technologies-Brand-Assets/`).
- **Components**:
  - `AssistantLauncher.tsx`: Circular Midnight Navy (`#0A192F` / `#071426`) floating button with crisp ST symbol and a lightweight surrounding SVG orbital ring (`motion.svg`). Accessible tooltip reads `"Ask Suvra AI"`.
  - `AssistantHeader.tsx`: Displays ST symbol, `"Suvra AI Assistant"`, `"Your Technology Guide"`, and an honest live mode pill (`"Automated FAQ Assistant"` in current frontend phase; `"Cloudflare AI + FAQ"` when backend Workers AI is enabled), plus **Reset Conversation** and **Close** controls.
  - `AssistantPanel.tsx`: Floating panel (`380px–420px` wide on desktop) / bottom sheet on mobile with auto-focus on open, `Escape` key dismissal restoring focus to `AssistantLauncher`, multiline `ChatInput` (`Enter` sends, `Shift+Enter` adds a newline, `500`-character limit), `SuggestedQuestions`, `ChatMessage` bubble actions (internal React Router route buttons + WhatsApp enquiry handoff), and privacy footer (`Powered by Suvra Technologies` + `/privacy-policy`).
- **Coordinated Bottom-Right Stack (`Layout.tsx`)**: Renders `BackToTop` (scroll-revealed) -> `FloatingWhatsApp` (`#25D366`, authentic white glyph, hover/focus tooltip `"Chat with Suvra Technologies on WhatsApp"`, `wa.me/917281921311`) -> `AssistantLauncher` cleanly above footer safe areas across all routes.
- **No Deceptive UI**: Zero fake unread notification dots, zero fake "online" availability claims, and zero auto-opening modal popups.

## 2. Deterministic Multilingual FAQ Engine (`src/services/faqEngine.ts`)

In the current frontend phase (`VITE_ENABLE_ASSISTANT_AI="false"`), all queries execute instantaneously client-side with zero API cost:

- **Single Source of Truth (`src/data/assistantKnowledge.ts`)**: Aggregates verified facts directly from `SITE_CONFIG`, `SERVICES_DATA` (14 services), `INDUSTRIES_DATA` (10 industries), `DEVELOPMENT_PROCESS` (7 phases), `TECHNOLOGY_ECOSYSTEM` (13 stack items), `GENERAL_FAQS`, and `getPublicServicePricing()` (`INR` / `Custom Pricing` only — unpublished figures are never exposed).
- **Language Support**: Understands and responds cleanly in:
  - **English**
  - **Hindi (Devanagari script)** (e.g. `वेबसाइट`, `मोबाइल ऐप`, `संपर्क`, `कीमत`, `ऑटोमेशन`)
  - **Hinglish (Romanized Hindi)** (e.g. `Mujhe mobile app banwana hai`, `website kitne me banegi`, `suvra kya karta hai`)
- **Project Planning Handoff**: Multi-step requirement queries (`"Help me plan my project"`, `"I need custom software"`) guide users toward structured scoping and offer one-click navigation to `/start-a-project`, `/contact`, or prefilled WhatsApp chat.
- **Honest Fallback**: Out-of-scope, unverified, or unknown topics return the approved fallback (`"I can help with information about Suvra Technologies and our services. For more specific assistance, please contact our team."`) alongside contact links.

## 3. Future Cloudflare Workers AI Contract (`src/services/assistantClient.ts`, `src/types/assistant.ts`)

- **Feature Gate**: Controlled via `ASSISTANT_REMOTE_AI_ENABLED` (`VITE_ENABLE_ASSISTANT_AI === 'true' && Boolean(VITE_API_BASE_URL)`). Defaults strictly to `false`.
- **Endpoint**: `POST ${VITE_API_BASE_URL}/api/chat` accepting `ChatApiRequest` (`sessionId`, `message`, `history` capped at last 4 turns, optional `turnstileToken`) and returning `ChatApiResponse`.
- **Server-Side Model Selection**: `modelId` is intentionally unassigned in the frontend config and must be bound inside the Cloudflare Worker `env` after verifying current Cloudflare Workers AI free-tier Neuron allocation eligibility (10,000 Neurons/day target).

## 4. Free-Tier Cost Controls & Security Guardrails

1. **FAQ-First Interception**: Deterministic greetings, company facts, contact info, and direct service pricing lookups can be served without consuming Workers AI tokens.
2. **Quota & Input Caps**:
   - `maxInputChars: 500`
   - `maxOutputTokens: 450`
   - `maxSessionAiRequests: 10` (client guard + server IP/session rate limiting)
   - `dailyAiBudgetRequests: 500` (server D1/KV daily circuit breaker)
   - `requestTimeoutMs: 12000` (`AbortController`)
   - **Graceful Quota Fallback**: On `429` quota exhaustion, network failure, or timeout, `assistantClient.ts` seamlessly degrades to `faqEngine.ts` without breaking the chat UI.
3. **Security & Privacy**:
   - **In-Memory Conversation State Only**: Chat messages are held solely in React context (`AssistantProvider.tsx`) and never persisted to `localStorage` or `sessionStorage`.
   - **XSS Safety**: `ChatMessage.tsx` renders plain-text nodes and structured link buttons without `dangerouslySetInnerHTML` or raw HTML injection.
   - **Prompt-Injection & Secret Guardrails**: Prompts requesting system instructions, API keys, secrets, tokens, or `.env` variables are immediately blocked before leaving the client.
