import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { TRANSITION_MICRO } from '../../config/motion';
import type { FAQItem } from '../../types/cms';

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const buttonId = `${baseId}-btn-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <div key={item.question} className="py-1">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left text-sm sm:text-base font-medium text-[var(--text-primary)] hover:text-[#2563EB] dark:hover:text-[#06B6D4] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] rounded-md"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#2563EB] dark:text-[#06B6D4]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={TRANSITION_MICRO}
                  className="pb-5 pr-8 text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  {item.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
