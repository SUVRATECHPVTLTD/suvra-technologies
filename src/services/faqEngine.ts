import { ASSISTANT_CONFIG } from '../config/assistant';
import { CURRENCY_CONFIG, QUOTATION_LABELS } from '../config/currency';
import { buildAssistantKnowledgeBase } from '../data/assistantKnowledge';
import type { AssistantAction, AssistantLanguage, AssistantMode } from '../types/assistant';

export interface FaqEngineResponse {
  message: string;
  mode: AssistantMode;
  detectedLanguage: AssistantLanguage;
  suggestedActions: AssistantAction[];
}

const HINGLISH_HINTS = [
  'kya',
  'kaise',
  'kitna',
  'kitne',
  'chahiye',
  'banwana',
  'banani',
  'bana',
  'batao',
  'bataiye',
  'paisa',
  'paise',
  'kharcha',
  'karna',
  'karwana',
  'aap',
  'hum',
  'mera',
  'meri',
  'hamara',
  'madad',
  'sampark',
  'baat',
  'namaste',
  'bhai',
  'ji',
  'hai',
  'hain',
  'ho',
  'milega',
  'sakte',
  'sakta',
];

export function detectVisitorLanguage(input: string): AssistantLanguage {
  if (/[\u0900-\u097F]/.test(input)) {
    return 'hi';
  }
  const tokens = input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const hinglishHits = tokens.filter((t) => HINGLISH_HINTS.includes(t)).length;
  if (hinglishHits >= 1) {
    return 'hinglish';
  }
  return 'en';
}

const SERVICE_KEYWORDS: Array<{ slug: string; keywords: string[] }> = [
  {
    slug: 'website-development',
    keywords: ['website', 'web development', 'web design', 'landing page', 'corporate site', 'वेबसाइट'],
  },
  {
    slug: 'mobile-app-development',
    keywords: ['mobile app', 'android', 'ios', 'flutter', 'react native', 'app development', 'मोबाइल', 'ऐप'],
  },
  {
    slug: 'custom-software-development',
    keywords: ['custom software', 'saas', 'portal', 'dashboard', 'bespoke software', 'internal tool', 'सॉफ्टवेयर'],
  },
  {
    slug: 'ecommerce-development',
    keywords: ['ecommerce', 'e-commerce', 'online store', 'shop', 'dukaan', 'checkout', 'catalog', 'ई-कॉमर्स'],
  },
  {
    slug: 'ai-business-automation',
    keywords: ['automate', 'automation', 'ai workflow', 'business automation', 'workflow', 'ऑटोमेशन'],
  },
  {
    slug: 'ai-chatbots-agents',
    keywords: ['chatbot', 'chatbots', 'ai agent', 'agents', 'conversational', 'virtual assistant', 'चैटबॉट'],
  },
  {
    slug: 'crm-erp-solutions',
    keywords: ['crm', 'erp', 'inventory', 'billing', 'lead management', 'pipeline'],
  },
  {
    slug: 'ui-ux-design-branding',
    keywords: ['ui/ux', 'ui ux', 'design system', 'branding', 'wireframe', 'prototype', 'डिज़ाइन'],
  },
  {
    slug: 'digital-marketing',
    keywords: ['digital marketing', 'marketing', 'social media', 'ads', 'campaign', 'lead generation', 'मार्केटिंग'],
  },
  {
    slug: 'seo-local-seo',
    keywords: ['seo', 'local seo', 'search engine', 'google ranking', 'organic search', 'keywords'],
  },
  {
    slug: 'cloud-devops',
    keywords: ['cloud', 'devops', 'cloudflare', 'oci', 'oracle', 'ci/cd', 'hosting', 'deployment', 'क्लाउड'],
  },
  {
    slug: 'it-consulting',
    keywords: ['consulting', 'advisory', 'architecture review', 'audit', 'roadmap', 'mvp scope'],
  },
  {
    slug: 'api-development-integrations',
    keywords: ['api', 'webhook', 'integration', 'integrations', 'payment gateway', 'rest', 'hono'],
  },
  {
    slug: 'website-maintenance-support',
    keywords: ['maintenance', 'support', 'uptime', 'bug fix', 'update', 'amc', 'रखरखाव'],
  },
];

function sanitizePlainQuery(raw: string): string {
  return raw.slice(0, ASSISTANT_CONFIG.maxInputChars).trim();
}

export function runDeterministicFaqEngine(rawQuery: string): FaqEngineResponse {
  const query = sanitizePlainQuery(rawQuery);
  const lower = query.toLowerCase();
  const lang = detectVisitorLanguage(query);
  const kb = buildAssistantKnowledgeBase();

  // Security & privacy guardrail: block prompt extraction or credential requests
  if (
    /(system prompt|ignore previous|reveal instructions|api[\s_-]?key|secret[\s_-]?key|password|otp|credit card|cvv|bank pin|\.env|environment variable)/i.test(
      lower
    )
  ) {
    const securityReply =
      lang === 'hi'
        ? 'सुरक्षा और गोपनीयता कारणों से हम पासवर्ड, OTP, वित्तीय विवरण या आंतरिक सिस्टम निर्देश नहीं मांगते और न ही साझा करते हैं। मैं Suvra Technologies की सेवाओं और प्रोजेक्ट योजना में आपकी मदद कर सकता हूँ।'
        : lang === 'hinglish'
          ? 'Security aur privacy ke liye hum kabhi bhi passwords, OTPs, card details ya internal system config request ya share nahi karte. Main aapko Suvra Technologies ki services aur project planning mein madad kar sakta hoon.'
          : 'For your privacy and security, Suvra Technologies never requests passwords, OTPs, or financial credentials, and does not expose internal system configurations. I can gladly help you with our services, process, or project planning.';

    return {
      message: securityReply,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [
        { label: 'Privacy Policy', type: 'route', to: '/privacy-policy' },
        { label: 'Start a Project', type: 'start_project', to: '/start-a-project' },
      ],
    };
  }

  // Greeting
  if (/^(hi|hello|hey|namaste|namaskar|hii+|good morning|good afternoon|good evening)[!.\s]*$/i.test(lower)) {
    const greetingReply =
      lang === 'hi'
        ? 'नमस्ते! Suvra Technologies में आपका स्वागत है। मैं आपका टेक्नोलॉजी गाइड हूँ। आप हमारी 14 सेवाओं, प्रोजेक्ट प्लानिंग, या संपर्क विवरण के बारे में पूछ सकते हैं।'
        : lang === 'hinglish'
          ? 'Namaste! Suvra Technologies mein aapka swagat hai. Main aapka technology guide hoon — aap hamari services, mobile apps, AI automation ya project planning ke baare mein pooch sakte hain.'
          : ASSISTANT_CONFIG.welcomeMessage;

    return {
      message: greetingReply,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [
        { label: 'Explore 14 Services', type: 'route', to: '/services' },
        { label: 'Start a Project', type: 'start_project', to: '/start-a-project' },
      ],
    };
  }

  // Project Planning / Scope Guidance
  if (
    /(plan my project|start a project|project requirement|banwana|banani|project scope|quote|proposal|start project|प्रोजेक्ट)/i.test(
      lower
    ) &&
    !/(cost|price|pricing|kitna|kharcha|charge|rate|fees|पैसा|खर्च|कीमत)/i.test(lower)
  ) {
    const planReply =
      lang === 'hi'
        ? [
            'आपका प्रोजेक्ट प्लान करने के लिए आप नीचे दिए गए मुख्य बिंदु साझा कर सकते हैं (व्यक्तिगत डेटा अभी साझा करना अनिवार्य नहीं है):',
            '• आवश्यक सेवा (जैसे Website, Mobile App, Custom Software, AI Automation)',
            '• व्यवसाय का प्रकार और मुख्य उद्देश्य',
            '• आवश्यक फीचर्स या इंटीग्रेशन',
            '• अनुमानित बजट (INR / ₹ में) और समयसीमा',
            '',
            'आप हमारे 4-चरण Start a Project फॉर्म का उपयोग कर सकते हैं या सीधे WhatsApp पर आवश्यकता भेज सकते हैं।',
          ].join('\n')
        : lang === 'hinglish'
          ? [
              'Apna project plan karne ke liye aap yeh basic points share kar sakte hain:',
              '• Kaunsi service chahiye (Website, Mobile App, Custom Software, AI Automation)',
              '• Aapka business type aur main goal',
              '• Key features jo aapko chahiye',
              '• Approximate budget (INR / ₹ mein) aur timeline',
              '',
              'Aap hamare Start a Project intake wizard ko use kar sakte hain ya WhatsApp par directly apni requirement bhej sakte hain.',
            ].join('\n')
          : [
              'To plan your project smoothly, here are the key details our engineering team looks at:',
              '• Required service (Website, Mobile App, Custom Software, AI Automation, or Cloud)',
              '• Business type and primary operational goal',
              '• Expected features or third-party integrations',
              '• Approximate budget range in INR (₹) and preferred timeline',
              '',
              'You can complete our guided 4-step Start a Project intake form or send a quick project brief directly on WhatsApp.',
            ].join('\n');

    return {
      message: planReply,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [
        { label: 'Open Start a Project Form', type: 'start_project', to: '/start-a-project' },
        {
          label: 'Send Brief on WhatsApp',
          type: 'whatsapp',
          prefillMessage: 'Hello Suvra Technologies, I would like help planning my project requirements.',
        },
      ],
    };
  }

  // Contact / Headquarters / Founder / About Company
  if (
    /(contact|phone|email|whatsapp|address|headquarter|office|location|muzaffarpur|bihar|founder|ravi ranjan|suvrixa|about suvra|company|संपर्क|पता|मुजफ्फरपुर|संस्थापक)/i.test(
      lower
    )
  ) {
    const isFounder = /(founder|ravi|ceo|suvrixa|संस्थापक)/i.test(lower);
    const contactReply = isFounder
      ? lang === 'hi'
        ? `Suvra Technologies की स्थापना 2026 में ${kb.company.founder} (Founder & CEO) द्वारा की गई थी। यह एक ${kb.company.positioning} है ("${kb.company.tagline}"), जिसका मुख्यालय ${kb.company.headquarters} में स्थित है। (${kb.company.suvrixaNote})`
        : lang === 'hinglish'
          ? `Suvra Technologies ek ${kb.company.positioning} hai ("${kb.company.tagline}"), jise 2026 mein ${kb.company.founder} (Founder & CEO) ne establish kiya. Headquarters: ${kb.company.headquarters}. (${kb.company.suvrixaNote})`
          : `Suvra Technologies is a ${kb.company.positioning} ("${kb.company.tagline}") established in ${kb.company.establishedYear} by Founder & CEO ${kb.company.founder}. Headquartered at ${kb.company.headquarters}, serving ${kb.company.targetMarkets}. (${kb.company.suvrixaNote})`
      : lang === 'hi'
        ? `आप Suvra Technologies से सीधे संपर्क कर सकते हैं:\n• ईमेल: ${kb.company.email}\n• फ़ोन / WhatsApp: ${kb.company.phone}\n• मुख्यालय: ${kb.company.headquarters}\n• सेवा क्षेत्र: ${kb.company.targetMarkets}`
        : lang === 'hinglish'
          ? `Aap Suvra Technologies se directly sampark kar sakte hain:\n• Email: ${kb.company.email}\n• Phone / WhatsApp: ${kb.company.phone}\n• Headquarters: ${kb.company.headquarters}\n• Markets: ${kb.company.targetMarkets}`
          : `You can reach Suvra Technologies directly via:\n• Email: ${kb.company.email}\n• Phone & Business WhatsApp: ${kb.company.phone}\n• Headquarters: ${kb.company.headquarters}\n• Target Markets: ${kb.company.targetMarkets}`;

    return {
      message: contactReply,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [
        { label: 'Contact Page', type: 'route', to: '/contact' },
        {
          label: 'Chat on WhatsApp',
          type: 'whatsapp',
          prefillMessage: 'Hello Suvra Technologies, I would like to connect with your team.',
        },
        ...(isFounder ? [{ label: 'Founder Profile', type: 'route' as const, to: '/founder' }] : []),
      ],
    };
  }

  // Match specific service first (including if pricing is asked for a specific service!)
  const askingPrice = /(cost|price|pricing|budget|kitna|kharcha|charge|rate|fee|quotation|quote|कीमत|खर्च|रेट)/i.test(
    lower
  );

  let matchedServiceSlug: string | null = null;
  let bestKeywordLen = 0;
  for (const entry of SERVICE_KEYWORDS) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw) && kw.length > bestKeywordLen) {
        bestKeywordLen = kw.length;
        matchedServiceSlug = entry.slug;
      }
    }
  }

  if (matchedServiceSlug) {
    const svc = kb.services.find((s) => s.slug === matchedServiceSlug);
    if (svc) {
      const deliverablesList = svc.deliverables.map((d) => `• ${d}`).join('\n');
      const priceNote = `${QUOTATION_LABELS.customPricing} (${CURRENCY_CONFIG.code} / ${CURRENCY_CONFIG.symbol}) — final quotation is prepared after scoping your exact requirements.`;

      const svcMessage =
        lang === 'hi'
          ? `${svc.name} (${svc.categoryLabel}):\n${svc.shortDescription}\n\nमुख्य डिलीवरेबल्स:\n${deliverablesList}\n\nमूल्य निर्धारण: ${svc.publicPriceDisplay}। सभी कोटेशन तकनीकी स्कोप समझने के बाद INR (₹) में दिए जाते हैं।`
          : lang === 'hinglish'
            ? `${svc.name} (${svc.categoryLabel}):\n${svc.shortDescription}\n\nKey deliverables:\n${deliverablesList}\n\nPricing: ${svc.publicPriceDisplay}. Final INR (₹) quotation aapke exact scope aur requirements ke baad share kiya jata hai.`
            : `${svc.name} (${svc.categoryLabel}):\n${svc.shortDescription}\n\nWhat's included:\n${deliverablesList}\n\nPricing: ${askingPrice ? priceNote : svc.publicPriceDisplay}`;

      return {
        message: svcMessage,
        mode: 'faq',
        detectedLanguage: lang,
        suggestedActions: [
          { label: `Explore ${svc.name}`, type: 'route', to: `/services/${svc.slug}` },
          {
            label: 'Request Proposal',
            type: 'start_project',
            to: `/start-a-project?service=${encodeURIComponent(svc.name)}`,
          },
          {
            label: 'Ask on WhatsApp',
            type: 'whatsapp',
            prefillMessage: `Hello Suvra Technologies, I would like to discuss ${svc.name} requirements.`,
          },
        ],
      };
    }
  }

  // General pricing question without specific service
  if (askingPrice) {
    const pricingReply =
      lang === 'hi'
        ? `Suvra Technologies सभी प्रोजेक्ट को उनके वास्तविक तकनीकी स्कोप, इंटीग्रेशन और आवश्यकताओं के आधार पर भारतीय रुपये (${CURRENCY_CONFIG.code} / ${CURRENCY_CONFIG.symbol}) में ${QUOTATION_LABELS.customPricing} मॉडल के तहत कोट करता है। सही अनुमान प्राप्त करने के लिए अपनी आवश्यकता साझा करें।`
        : lang === 'hinglish'
          ? `Suvra Technologies har project ko exact scope, features aur integrations ke hisab se Indian Rupees (${CURRENCY_CONFIG.code} / ${CURRENCY_CONFIG.symbol}) mein quote karta hai (${QUOTATION_LABELS.customPricing}). Apni requirement bhejkar aap Request a Quote kar sakte hain.`
          : `All Suvra Technologies engagements use transparent ${QUOTATION_LABELS.customPricing} in Indian Rupees (${CURRENCY_CONFIG.code} / ${CURRENCY_CONFIG.symbol}) rather than generic one-size-fits-all rates. Share your project goals via Start a Project or WhatsApp to receive a tailored proposal.`;

    return {
      message: pricingReply,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [
        { label: QUOTATION_LABELS.requestQuote, type: 'start_project', to: '/start-a-project' },
        {
          label: 'Discuss Scope on WhatsApp',
          type: 'whatsapp',
          prefillMessage: 'Hello Suvra Technologies, I would like to request a custom INR quote for my project.',
        },
      ],
    };
  }

  // All services overview
  if (/(services|what do you do|offerings|capabilities|what services|सेवाएं|क्या करते|kaam karte)/i.test(lower)) {
    const overviewReply =
      lang === 'hi'
        ? [
            'Suvra Technologies 4 मुख्य क्षेत्रों में 14 तकनीकी सेवाएं प्रदान करता है:',
            '1. Engineering: Website, Mobile App (Android/iOS), Custom Software, E-commerce, API Integrations',
            '2. Intelligence: AI & Business Automation, AI Chatbots & Agents, CRM & ERP Solutions',
            '3. Digital: UI/UX Design & Branding, Digital Marketing, SEO & Local SEO',
            '4. Infrastructure: Cloud & DevOps, IT Consulting, Website Maintenance & Support',
          ].join('\n')
        : lang === 'hinglish'
          ? [
              'Suvra Technologies 4 core categories mein 14 services provide karta hai:',
              '1. Engineering: Website, Mobile App (Android/iOS), Custom Software, E-commerce, API Integrations',
              '2. Intelligence: AI & Business Automation, AI Chatbots & Agents, CRM & ERP Solutions',
              '3. Digital: UI/UX Design & Branding, Digital Marketing, SEO & Local SEO',
              '4. Infrastructure: Cloud & DevOps, IT Consulting, Website Maintenance & Support',
            ].join('\n')
          : [
              'Suvra Technologies delivers 14 specialized services across four disciplines:',
              '• Engineering: Website Development, Mobile Apps (iOS & Android), Custom Software, E-commerce, APIs & Integrations',
              '• Intelligence: AI & Business Automation, AI Chatbots & Agents, CRM & ERP Solutions',
              '• Digital: UI/UX Design & Branding, Digital Marketing, SEO & Local SEO',
              '• Infrastructure: Cloud & DevOps, IT Consulting, Website Maintenance & Support',
            ].join('\n');

    return {
      message: overviewReply,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [
        { label: 'View All 14 Services', type: 'route', to: '/services' },
        { label: 'Start a Project', type: 'start_project', to: '/start-a-project' },
      ],
    };
  }

  // Industries / Process / Technology stack
  if (/(industr|sector|edtech|health|retail|fintech|real estate|logistics|hospitality|manufacturing|startup)/i.test(lower)) {
    return {
      message: `We architect software, AI, and cloud workflows tailored across 10 sectors: ${kb.industries
        .map((i) => i.name)
        .join(', ')}.`,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [{ label: 'Explore Industries', type: 'route', to: '/industries' }],
    };
  }

  if (/(process|how do you work|steps|methodology|timeline|tarika)/i.test(lower)) {
    const stepsText = kb.processSteps.map((s) => `${s.step}. ${s.title}`).join(' → ');
    return {
      message: `Our engineering workflow follows 7 structured phases:\n${stepsText}\n\nEach phase outputs clear milestones before advancing to launch and ongoing improvement.`,
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [{ label: 'Start a Project', type: 'start_project', to: '/start-a-project' }],
    };
  }

  if (/(tech|stack|react|next|tailwind|typescript|cloudflare|oracle|technology)/i.test(lower)) {
    return {
      message:
        'Our core engineering stack pairs React, Next.js, TypeScript, and Tailwind CSS on the frontend with a Cloudflare-first edge architecture (Workers, Pages, Hono, D1, Drizzle ORM, R2, Turnstile, Zero Trust) and Oracle Cloud Infrastructure (OCI) for justified compute/backups.',
      mode: 'faq',
      detectedLanguage: lang,
      suggestedActions: [{ label: 'View Architecture Blueprints', type: 'route', to: '/portfolio' }],
    };
  }

  // Safe deterministic fallback — never fabricates answers
  const localizedFallback =
    lang === 'hi'
      ? 'मैं Suvra Technologies और हमारी सेवाओं से जुड़ी जानकारी में आपकी मदद कर सकता हूँ। अधिक विशिष्ट सहायता के लिए कृपया हमारी टीम से संपर्क करें।'
      : lang === 'hinglish'
        ? 'Main Suvra Technologies aur hamari services se judi jaankari mein aapki madad kar sakta hoon. Specific requirements ke liye please hamari team se sampark karein.'
        : ASSISTANT_CONFIG.fallbackMessage;

  return {
    message: localizedFallback,
    mode: 'fallback',
    detectedLanguage: lang,
    suggestedActions: [
      {
        label: 'Chat on WhatsApp',
        type: 'whatsapp',
        prefillMessage: `Hello Suvra Technologies, I have a question: ${query.slice(0, 140)}`,
      },
      { label: 'Start a Project', type: 'start_project', to: '/start-a-project' },
      { label: 'Contact Page', type: 'route', to: '/contact' },
    ],
  };
}
