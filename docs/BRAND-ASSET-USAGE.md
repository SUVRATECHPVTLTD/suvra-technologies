# Brand Asset Usage — Suvra Technologies

## 1. Source of Truth (`/Suvra-Technologies-Brand-Assets/`)

The repository contains the official, immutable Option 4 ST monogram and raster derivatives inside `/Suvra-Technologies-Brand-Assets/` (no SVG master exists; all derivatives originate from `00-master/approved-option-4-original.png`).

**Rules**:
1. Never delete, modify, or overwrite files inside `/Suvra-Technologies-Brand-Assets/`.
2. Never redraw, recolor, distort, rotate, or replace the Option 4 ST symbol with SVG/CSS/AI placeholders.
3. Preserve exact natural aspect ratios (`682x654` for symbol variants; `1500x400` for horizontal lockups).
4. Never display internal `"Option 4"` selection text anywhere in UI copy.

## 2. Active Web Integration Map (`public/` & `src/`)

| Asset Purpose | Source in Brand Kit | Deployed Web Path | Where Rendered |
|---|---|---|---|
| Symbol (Light Surfaces) | `01-logos/symbol-light-background.png` | `/brand/logos/symbol-light-background.png` | `BrandMark` & `BrandSymbol` in Light Mode (Header, Mobile Drawer, 404, Loading/Empty States, Founder Card) |
| Symbol (Dark Surfaces) | `01-logos/symbol-transparent.png` | `/brand/logos/symbol-transparent.png` | `BrandMark` & `BrandSymbol` in Dark Mode |
| Horizontal Lockup (Light) | `01-logos/horizontal-light.png` | `/brand/logos/horizontal-light.png` | `BrandHorizontalLockup` in Footer (Light Mode) |
| Horizontal Lockup (Dark) | `01-logos/horizontal-dark.png` | `/brand/logos/horizontal-dark.png` | `BrandHorizontalLockup` in Footer (Dark Mode) |
| Browser Favicons | `02-web/favicon.ico`, `16x16`, `32x32`, `48x48` | `/favicon.ico`, `/favicon-*.png` | `index.html` `<link rel="icon">` |
| Apple Touch Icon | `02-web/apple-touch-icon.png` | `/apple-touch-icon.png` | `index.html` `<link rel="apple-touch-icon">` |
| PWA & Manifest Icons | `02-web/icons/*`, `02-web/pwa-maskable-*` | `/icons/icon-*.png`, `/pwa-maskable-*.png` | `public/site.webmanifest` (root-relative paths) |
| Google Site Icon | `02-web/google-site-icon-512.png` | `/google-site-icon-512.png` | Static web root (`BRAND_ASSETS.siteIcon512`) |
| Social Open Graph Card | `07-social/og-image-1200x630.png` | `/brand/social/og-image-1200x630.png` | `index.html` `og:image` & `twitter:image` |

## 3. Reserved Assets for Future Phases

Directories `03-android`, `04-ios`, `05-expo`, and `06-admin` inside `/Suvra-Technologies-Brand-Assets/` remain archived in place for upcoming mobile and Cloudflare Zero Trust admin dashboard phases.
