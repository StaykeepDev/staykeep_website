# staykeep.com

The StayKeep marketing site. Astro (static output) + a couple of React
islands for the interactive bits, deployed to a Cloudflare Worker with
static assets.

Core message: **0% commission, on every booking.** Two doors — "Find a
stay" sends guests to the guest app (`app.staykeep.com`), "List your
property" leads to `/owners`, which itself CTAs to the owner app
(`manage.staykeep.com`).

## Stack

- [Astro](https://astro.build) — static output, no server runtime.
- `@astrojs/react` — only for the savings calculator (`client:visible`).
  Everything else is plain `.astro` with zero shipped JS beyond the header's
  mobile-menu toggle.
- Vanilla CSS, custom properties for the "Soft Resort" design tokens
  (`src/styles/global.css`) — light by default, dark via
  `prefers-color-scheme`.
- Self-hosted fonts (`@fontsource/cormorant-garamond`,
  `@fontsource/plus-jakarta-sans`, latin subset only).
- Cloudflare Workers with static assets (`wrangler.toml` + `worker/index.ts`)
  — no adapter; the worker only handles the `www` -> apex redirect and falls
  back to `env.ASSETS.fetch(request)` for everything else, including the
  legacy redirects in `public/_redirects` and the headers in
  `public/_headers`.

## Develop

```bash
npm install
npm run dev          # astro dev, http://localhost:4321
npm run check        # astro check
npm run build        # generates public/og.png + icons, then astro check + astro build
npm run preview      # build, then `wrangler dev` against dist/
```

## Content that lives in one place

- `src/content/site.ts` — URLs (app/manage), contact details, nav/footer
  links, the fee footnote.
- `src/content/pricing.ts` — every pricing-related string, and the
  `PRICING_ENABLED` flag. No prices are published yet; see the file's own
  comment for what changes when that's ready.
- `src/content/features.ts`, `src/content/faq.ts`, `src/content/comparison.ts`
  — the only-real-features feature lists, FAQ copy and the comparison table
  rows.

## Deploying

Deploys are **not** run from here in the normal course of things — see
`.github/workflows/deploy.yml` (push to `prod`, or manual dispatch). It
needs a `CLOUDFLARE_API_TOKEN` repo secret; without one it skips the deploy
step with a notice instead of failing. Account id and Worker name are in
`wrangler.toml` / the workflow. The routes `staykeep.com/*` and
`www.staykeep.com/*` are declared in `wrangler.toml` (live since 2026-09-24);
both hostnames are proxied DNS records whose origin is still the old Vercel
deployment, so removing the two routes rolls the site back. Manual deploy:
`npm run build && npx wrangler deploy` (wrangler OAuth or a token).
