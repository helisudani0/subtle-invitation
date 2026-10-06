// Post-build step for the GitHub Pages static build.
// Nitro 3 beta fails its final environment step with preset "static"
// (upstream bug: solidjs/solid-start#2288, nitrojs/nitro#3843), but by then the
// SSR render service is fully built. We render "/" through it ourselves and
// write the HTML where GitHub Pages expects it.
import { pathToFileURL } from "node:url";
import { resolve, join } from "node:path";
import { writeFile, rm } from "node:fs/promises";

const root = process.cwd();
const base = process.env.PAGES_BASE || "/subtle-invitation/";
const entry = resolve(root, "node_modules/.nitro/vite/services/ssr/index.js");
const outDir = resolve(root, ".output/public");

const mod = await import(pathToFileURL(entry).href);
const handler = mod.default ?? mod;
const res = await handler.fetch(new Request("http://localhost" + base));
if (!res.ok) throw new Error(`SSR render failed: ${res.status}`);
const html = await res.text();
if (html.length < 500 || !/<html/i.test(html)) {
  throw new Error(`Rendered HTML looks empty (${html.length} bytes)`);
}
await writeFile(join(outDir, "index.html"), html);
// Remove the 0-byte "index" file the buggy nitro prerenderer leaves behind.
await rm(join(outDir, "index"), { force: true });
console.log(`Wrote .output/public/index.html (${html.length} bytes)`);
