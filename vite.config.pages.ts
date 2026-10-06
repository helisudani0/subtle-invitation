// Standalone static build for GitHub Pages (used by .github/workflows/pages.yml):
//   vite build -c vite.config.pages.ts  →  static site in .output/public
// This bypasses the Lovable build plugin (whose prerender shim targets Cloudflare).
// NOTE: nitro 3 beta has a known bug where the FINAL "nitro environment" build step
// fails with "rolldownOptions.input should not be an html file when building for SSR"
// when preset is "static" (upstream: solidjs/solid-start#2288, nitrojs/nitro#3843).
// Everything we need (.output/public with prerendered index.html) is written BEFORE
// that step, so the workflow tolerates the nonzero exit and verifies the output.
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  base: "/subtle-invitation/",
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    nitro({
      preset: "static",
      baseURL: "/subtle-invitation/",
      prerender: { routes: ["/"] },
    }),
  ],
});
