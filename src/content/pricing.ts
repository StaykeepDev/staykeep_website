/**
 * Every pricing-related string lives here, and nowhere else.
 *
 * 2026-09-24 — owner's answer, relayed by the lead: "No prices yet."
 *   - Lead with 0% commission on bookings. Show no numbers, no free-trial
 *     claims, anywhere on the site.
 *   - Where pricing would go (the /owners page, the "How much does StayKeep
 *     cost?" FAQ), say plans are simple and there is never a commission on
 *     bookings, and invite people to talk to us.
 *   - `/pricing` stays a 301 to `/owners` (see public/_redirects) — there is
 *     no `src/pages/pricing.astro` route to collide with it.
 *
 * `PRICING_ENABLED` is the single switch a future update flips once real
 * plans exist. Nothing in this file is imported by a page unless
 * `PRICING_ENABLED` is checked first, so turning it on is the only step
 * needed to bring a real pricing section into `/owners` (or a future
 * `/pricing` page) later — no layout or copy changes required.
 */

export const PRICING_ENABLED = false;

/** Shown today, wherever pricing would otherwise go. */
export const PRICING_FAQ_QUESTION = 'How much does StayKeep cost?';

export const PRICING_FAQ_ANSWER =
  "We haven't published pricing yet — plans are simple, and there is never a commission on your bookings. Talk to us and we'll work out what's right for your property: hello@staykeep.com or +91 99807 83609.";

/**
 * Reserved for when real plans exist. Kept here, unused, so a pricing
 * section/page can be built against a stable shape without a rewrite —
 * intentionally not rendered anywhere while PRICING_ENABLED is false.
 */
export interface PricingPlan {
  id: string;
  name: string;
  priceMonthlyPaise: number | null;
  billingNote: string;
  features: string[];
  highlighted?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [];

export const FREE_TRIAL_ENABLED = false;
