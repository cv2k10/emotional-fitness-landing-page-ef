// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Static output: `astro build` writes to dist/, which the Hono worker serves as Cloudflare static assets.
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    server: {
      // In development the Hono API runs separately under `wrangler dev`.
      proxy: { "/api": "http://localhost:8787" },
    },
  },
});
