// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages export: `BUILD_TARGET=pages vite build` produces a fully static site in
// .output/public, deployed by .github/workflows/pages.yml. All other builds (dev,
// Lovable preview/publish) keep the default Cloudflare target.
const isPages = process.env.BUILD_TARGET === "pages";

export default defineConfig({
  ...(isPages
    ? {
        vite: { base: "/subtle-invitation/" },
        nitro: {
          preset: "static",
          baseURL: "/subtle-invitation/",
          prerender: { crawlLinks: true },
        },
        tanstackStart: { prerender: { enabled: true } },
      }
    : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
