// Standalone static build for GitHub Pages (used by .github/workflows/pages.yml):
//   vite build -c vite.config.pages.ts  →  fully static site in .output/public
// This bypasses the Lovable build plugin (whose prerender shim targets Cloudflare)
// and emits a pure client-side SPA: an index.html shell plus hashed assets.
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
    tanstackStart({ spa: { enabled: true } }),
    viteReact(),
    nitro({ preset: "static", baseURL: "/subtle-invitation/" }),
  ],
});
