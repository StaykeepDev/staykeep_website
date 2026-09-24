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
  accessible mobile-menu toggle.
- Vanilla CSS with a light white / blue theme, navy text and a small amber
  accent (`src/styles/global.css`). The original booking app logo is preserved.
- Self-hosted Plus Jakarta Sans (400, 600, 700 and 800, latin subset only).
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

## Redesign — September 2026

All eight pages use the new shared theme: home, owners, about, contact,
privacy, terms, refund, and 404. The homepage shows booking/listing actions
and an illustrative ₹5,000 booking comparison immediately. The calculator
accepts the visitor’s actual commission percentage (15% is an example,
not a claimed industry-wide rate). Estimates are commission avoided,
not net savings after subscriptions, taxes or payment charges.

The booking app source mark is copied unchanged from
`staykeep_flutter_v2/assets/images/app_logo.png` into
`src/assets/brand/booking-app-logo.png`. The build uses that source for
favicon, Apple touch icon and social image. The hosting walkthrough and property website preview use responsive HTML, CSS and SVG
illustrations with example data instead of enlarged screenshots.

### Visual sources

- Hospitality photograph: Marc Wieland, [Tropical villa with a private pool
  and outdoor seating](https://unsplash.com/photos/tropical-villa-with-a-private-pool-and-outdoor-seating-DcRVVXSs_5w),
  [Unsplash License](https://unsplash.com/license). Downloaded September 24,
  2026. Used as illustrative editorial imagery, not a bookable listing.
  Optimised and served locally by Astro.
- Palette research: [Adobe’s guide to website colour schemes](https://certifiedprofessional.adobe.com/blog/website-color-schemes).
  White and pale blue keep the content light; blue identifies actions,
  navy supports readable text, and amber relates to the existing icon.
- Comparison source: [Airbnb service fees](https://www.airbnb.com/help/article/1857),
  checked September 24, 2026. Fees vary by country, host and fee structure.

### Content still needing business review

Legal wording was preserved. Existing privacy copy names Airbnb/Booking.com
channel-manager integrations even though the shipped-feature list does not
claim those. The refund policy still mentions a 14-day free trial, while
`FREE_TRIAL_ENABLED` is false. Terms and refund policies refer to subscriptions,
and all policies carry a January 2024 update date. Confirm the actual terms,
integrations and contact address before updating that legal copy. The
redesign does not introduce or endorse new pricing or legal commitments.


## Scroll experience

The homepage uses native scrolling with an expanding, pinned photo scene and a transforming commission illustration. StayKeep Manage has a sticky product walkthrough on desktop and individual interface-demo chapters on mobile. `src/components/Motion.astro` coordinates requestAnimationFrame updates, entrance reveals and reduced-motion preferences. It never intercepts wheel or touch events and does not run a permanent frame loop.

All content remains available without JavaScript. The system reduced-motion preference disables pinned sequences; a footer control also lets visitors choose a static presentation. Short phone viewports show a static, complete commission comparison. Booking and listing links remain usable independently of the animations.

The original booking icon is retained at `src/assets/brand/booking-app-logo.png`. `booking-app-logo-hq.png` is a 1254 × 1254 image-generated restoration of the same roof-and-dot identity. The header and footer serve responsive 2×, 3× and 4× renditions. The build regenerates favicons and the social image from that asset.


### Animated interface previews

`src/components/demos/` contains reusable, responsive previews for bookings, room availability, billing, guest messages and the property website. Each illustrative sequence runs once for ten seconds on entering view, pauses when offscreen or when its desktop chapter is inactive, and offers pause/resume/replay controls. The property website scrolls to room selection and ends with a direct-booking confirmation. Native text, CSS shapes and an inline SVG illustration stay sharp at every size. No preview submits a real booking.

Reduced-motion preferences and the footer toggle show the complete still state and hide playback controls. Without JavaScript the same complete state remains visible. The existing booking and property-listing links remain the actual calls to action.
