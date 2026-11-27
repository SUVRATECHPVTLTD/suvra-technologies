# Design System — Suvra Technologies

## 1. Brand Color Palette & Semantic Tokens (`src/index.css`)

| Role | Light Mode (`:root`) | Dark Mode (`.dark`) | Usage |
|---|---|---|---|
| `--bg-canvas` | `#F8FAFC` (Platinum White) | `#071426` (Midnight Navy) | Primary page canvas |
| `--bg-surface` | `#FFFFFF` | `#0F172A` (Deep Space) | Cards, panels, header, footer |
| `--bg-elevated` | `#F1F5F9` | `#162238` | Interactive sub-panels, callouts, inputs |
| `--bg-contrast` | `#071426` | `#040B16` | High-contrast dark sections (`ServicesAndProductsSection`, `ContactCTA`) |
| `--text-primary` | `#071426` | `#F8FAFC` | Headings and primary copy |
| `--text-secondary` | `#475569` | `#CBD5E1` | Body paragraphs and supporting descriptions |
| `--text-muted` | `#4E5D73` | `#94A3B8` | Metadata, eyebrows, breadcrumbs, hints (tuned for WCAG 2.2 AA >= 4.5:1 across `#FFFFFF`, `#F8FAFC`, `#F1F5F9`) |
| `--border-subtle` | `#E2E8F0` | `#1E293B` | Card borders and section dividers |
| `--border-strong` | `#CBD5E1` | `#334155` | Secondary buttons, form controls |
| `--accent-primary` | `#2563EB` (Electric Blue) | `#2563EB` | Primary CTAs, active selections, focus outlines |
| `--accent-cyan` | `#06B6D4` (Innovation Cyan) | `#06B6D4` | Dark-mode accent text, subtle technical highlights, dark-section emphasis |

### Contrast Guardrails
- Electric Blue (`#2563EB`) + White (`#FFFFFF`) passes WCAG AA (~5.17:1).
- Light mode accents use `#2563EB` (avoiding light-cyan text on light canvases), while dark mode surfaces pair `dark:text-[#06B6D4]` against `#071426`/`#0F172A` (> 8:1 contrast).

## 2. Typography (`index.html` + `src/index.css`)

- **Display / Headings (`--font-display`)**: `Space Grotesk` (weights `500`, `600`, `700`), `text-wrap: balance`.
- **Body / UI (`--font-sans`)**: `Inter` (weights `400`, `500`, `600`, `700`).
- **Technical Labels (`--font-mono`)**: `JetBrains Mono` (weights `400`, `500`) used sparingly for step indices, diagram annotations, and category labels.
- **Hero Scale**: `clamp(2.35rem, 4.6vw, 3.9rem)` with `1.06` line-height.

## 3. Spacing, Layout & Touch Targets

- **8-Point Grid & Container**: `max-w-7xl` (`1280px`) with responsive horizontal padding (`px-4 sm:px-6 lg:px-8`).
- **Section Rhythm**: `py-14 sm:py-20` on inner pages; `py-20 sm:py-24` on primary homepage sections alternating `--bg-canvas`, `--bg-surface`, and `#071426` dark contrast bands.
- **Interactive Touch Targets**: Navigation buttons, mobile menu triggers (`w-11 h-11`), theme toggle (`min-w-[40px] min-h-[40px]`), hero node selectors (`min-h-[44px]`), and back-to-top button (`w-11 h-11`) enforce accessible click/touch areas across `320px`–`1920px`.

## 4. Motion Tokens (`src/config/motion.ts`)

- **Easing Curve**: `cubic-bezier(0.16, 1, 0.3, 1)` (`MOTION_EASING`).
- **Durations**:
  - `micro`: `160ms` (dropdowns, `layoutId` active nav/tab transitions, panel swaps)
  - `standard`: `280ms` (route fade-rise, card stagger items)
  - `section`: `550ms` (scroll-triggered section reveals, `viewport={{ once: true, amount: 0.12 }}`)
  - `hero`: `780ms` (hero headline and visual entrance)
  - `stagger`: `60ms` between grid items
- **Reduced Motion**: Wrapped in `<MotionConfig reducedMotion="user">` in `src/App.tsx` plus `@media (prefers-reduced-motion: reduce)` rules in `src/index.css` so content remains immediately readable when motion is reduced.
