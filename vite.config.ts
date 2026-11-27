import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import {
  buildRobotsTxt,
  buildSitemapXml,
  isNonIndexablePreviewOrigin,
} from './src/config/seoRoutes.ts';

function resolveEnvSiteOrigin(): string {
  const raw =
    process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    process.env.APP_URL ||
    '';
  return raw.trim().replace(/\/$/, '');
}

function isEnvIndexingAllowed(siteOrigin: string): boolean {
  const flag =
    (process.env.VITE_ALLOW_INDEXING || process.env.ALLOW_INDEXING) === 'true';
  const explicitProdUrl = Boolean(
    (process.env.VITE_SITE_URL || process.env.SITE_URL || '').trim()
  );
  return flag && explicitProdUrl && !isNonIndexablePreviewOrigin(siteOrigin);
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default defineConfig(() => {
  const envOrigin = resolveEnvSiteOrigin();
  const allowIndexing = isEnvIndexingAllowed(envOrigin);
  const gscVerification = (
    process.env.VITE_GSC_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    ''
  ).trim();

  let resolvedOutDir = path.resolve(import.meta.dirname, 'dist');

  return {
    define: {
      'import.meta.env.VITE_PREVIEW_URL': JSON.stringify(
        (process.env.APP_URL || '').trim().replace(/\/$/, '')
      ),
      'import.meta.env.VITE_SITE_URL': JSON.stringify(
        (process.env.VITE_SITE_URL || process.env.SITE_URL || '').trim().replace(/\/$/, '')
      ),
      'import.meta.env.VITE_ALLOW_INDEXING': JSON.stringify(
        allowIndexing ? 'true' : 'false'
      ),
      'import.meta.env.VITE_GSC_VERIFICATION': JSON.stringify(gscVerification),
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'suvra-dynamic-seo',
        configResolved(config) {
          resolvedOutDir = path.resolve(config.root, config.build.outDir);
        },
        transformIndexHtml(html) {
          const robotsContent = allowIndexing ? 'index, follow' : 'noindex, nofollow';
          let nextHtml = html.replace(
            /<meta name="robots" content="[^"]*"\s*\/?>/,
            `<meta name="robots" content="${robotsContent}" />`
          );

          if (envOrigin) {
            const absOgImage = escapeHtmlAttr(`${envOrigin}/brand/social/og-image-1200x630.png`);
            nextHtml = nextHtml
              .replace(
                /<meta property="og:image" content="[^"]*"\s*\/?>/,
                `<meta property="og:image" content="${absOgImage}" />`
              )
              .replace(
                /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
                `<meta name="twitter:image" content="${absOgImage}" />`
              );
          }

          if (gscVerification && !nextHtml.includes('google-site-verification')) {
            nextHtml = nextHtml.replace(
              '</head>',
              `    <meta name="google-site-verification" content="${escapeHtmlAttr(gscVerification)}" />\n  </head>`
            );
          }

          return nextHtml;
        },
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const reqUrl = (req.url || '').split('?')[0];
            if (reqUrl !== '/robots.txt' && reqUrl !== '/sitemap.xml') {
              return next();
            }

            const host = req.headers['x-forwarded-host'] || req.headers.host;
            const proto = req.headers['x-forwarded-proto'] || 'http';
            const requestOrigin =
              envOrigin || (host ? `${proto}://${host}` : 'http://localhost:3000');
            const isPreview =
              !allowIndexing || isNonIndexablePreviewOrigin(requestOrigin);

            if (reqUrl === '/robots.txt') {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.end(buildRobotsTxt(requestOrigin, allowIndexing));
              return;
            }

            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(buildSitemapXml(requestOrigin, isPreview));
          });
        },
        closeBundle(error?: Error) {
          if (error) return;
          if (!fs.existsSync(resolvedOutDir)) return;

          const buildOrigin = envOrigin || 'http://localhost:3000';
          const isPreview = !allowIndexing || isNonIndexablePreviewOrigin(buildOrigin);

          fs.writeFileSync(
            path.join(resolvedOutDir, 'robots.txt'),
            buildRobotsTxt(buildOrigin, allowIndexing),
            'utf8'
          );
          fs.writeFileSync(
            path.join(resolvedOutDir, 'sitemap.xml'),
            buildSitemapXml(buildOrigin, isPreview),
            'utf8'
          );
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      rolldownOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/react-router')) {
              return 'router-vendor';
            }
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'motion-vendor';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons-vendor';
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
