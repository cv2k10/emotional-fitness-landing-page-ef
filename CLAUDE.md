# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Astro dev server (:4321) + Hono API via `wrangler dev` (:8787), run together; /api is proxied
npm run dev:web   # Astro only
npm run dev:api   # Hono worker only
npm run build     # Static Astro build → dist/
npm run build:guide  # Regenerate the lead-magnet PDF from guide/ (needs Google Chrome)
npm run preview   # Build, then serve dist/ + API through wrangler, the same way Cloudflare does
npm run deploy    # Build and `wrangler deploy` (Cloudflare Workers with static assets)
npm run check     # `astro check` (frontend) + `tsc -p server` (worker)
```

There is no test suite or linter. TypeScript is strict with `noUnusedLocals`/`noUnusedParameters`. Pin TypeScript to 5.x because `@astrojs/check` does not support TS 7.

## Architecture

A single-page marketing landing page for "Emotional Fitness" (emotional-fitness coaching for high-achieving professionals). It deploys as **one Cloudflare Worker** (`wrangler.jsonc`):

- **Frontend: Astro, static output** (`src/`). `astro build` prerenders `src/pages/index.astro` into `dist/`. The worker serves that folder as static assets.
- **Backend: Hono** (`server/`). `server/index.ts` is the worker entry. `run_worker_first: ["/api/*"]` sends only API requests to the worker; Cloudflare serves every other path directly from `dist/`. The two tsconfigs are separate: the root one excludes `server/`, and `server/tsconfig.json` uses `@cloudflare/workers-types`.

### Frontend

- `index.astro` puts one component per page section (`src/components/*.astro`) inside `layouts/BaseLayout.astro`. The layout holds `<head>` and the Google Fonts, and imports the global stylesheet. Repeated copy (challenges, benefits, FAQs, dialog text) lives in `src/data/content.ts`.
- **Styling is hand-written CSS, not Tailwind utilities.** Tailwind v4 (`@tailwindcss/vite`) is imported at the top of `src/styles/global.css` mainly for its preflight reset. Components use semantic classes (`hero`, `section-pad`, `page-width`, `button button-dark`, …) defined in that one stylesheet. Design tokens are CSS custom properties on `:root`. Don't add scoped `<style>` blocks unless they're needed.
- **No UI framework. Interactivity is plain TypeScript in `<script>` tags,** which Astro bundles. Conventions:
  - `data-reveal`: fades the element in on scroll (`src/scripts/reveal.ts`).
  - `data-conversion="<event>"`: fires `recordConversion(event)` on click (`src/scripts/analytics.ts`). This dispatches a `window` `CustomEvent("emotional-fitness:conversion")` and stands in for real analytics.
  - `data-open-dialog="workshop|session|intro"`: opens the single shared `<dialog>` in `ContactDialog.astro`, which fills in its text from `dialogContent`.
  - Success and error states switch with the `hidden` attribute. Tailwind's preflight makes `[hidden]` override the CSS `display` value.
- The lead-magnet download is `public/emotional-fitness-check-in.pdf`. It's generated, so don't edit it by hand. Its source is `guide/emotional-fitness-check-in.html`, a standalone A4 print layout. Rebuild it with `npm run build:guide`, which prints it through headless Chrome; set `CHROME_PATH` if Chrome isn't in the default macOS location. Each `.page` is a fixed A4 sheet that clips overflow. After editing, check every page of the output, then commit the regenerated PDF.

### API (`server/`)

- `server/api.ts` is mounted at `/api`. It has `GET /health`, `POST /guide-signups` and `POST /enquiries`. Request bodies are JSON and validated with the zod schemas in `server/schemas.ts`; invalid bodies get a 400 `{ ok: false }`.
- The frontend posts to these routes through `src/scripts/submit-contact.ts`. If you change a request shape, update both sides; no types are shared between them.
- **Submissions are emailed to the site owner, not stored.** `server/notify.ts` sends each one through the `NOTIFY_EMAIL` `send_email` binding, from `NOTIFY_FROM` (admin@createyourbestsite.com, on the Email Routing domain) to `NOTIFY_TO` (cv2k10@gmail.com). The visitor's address is set as Reply-To. All three are set in `wrangler.jsonc`, and their types are in `server/env.ts`. If `NOTIFY_FROM` is empty, notifications are skipped (`notified: false`). If sending fails, the API returns a 500 and the form shows an error.
- `NOTIFY_TO` must be a *verified destination address* in Email Routing. A routing address such as admin@createyourbestsite.com is rejected with "destination address is not a verified address". Sending to arbitrary recipients would need Cloudflare Email Sending (Workers Paid).
- `wrangler dev` only simulates the email binding: it logs each message instead of sending it. Add `"remote": true` to the binding to send real mail during development. Debug live send failures with `npx wrangler tail`.

## Demo content

This is a demo site. `DemoBanner.astro` (above the header, inside `index.astro`) says so on every page load. The workshop and session details, the guide profile (Daniel Marsh) and the portrait (`public/images/guide-portrait-placeholder.jpg`) are fictional sample data. The workshop title and learning outcomes are still "to be confirmed". When real details arrive, replace the sample values and remove the "Sample … for this demo site" notes along with the banner. The header is absolutely positioned inside `.page-shell`, which is what keeps it below the banner.
