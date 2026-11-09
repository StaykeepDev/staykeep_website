/**
 * Every pricing-related string lives here, and nowhere else.
 *
 * 2026-09-24 - owner's answer, relayed by the lead: "No prices yet."
 *   - Lead with 0% commission on bookings. Show no numbers, no free-trial
 *     claims, anywhere on the site.
 *   - Where pricing would go (the /owners page, the "How much does StayKeep
 *     cost?" FAQ), say plans are simple and there is never a commission on
 *     bookings, and invite people to talk to us.
 *   - `/pricing` stays a 301 to `/owners` (see public/_redirects) - there is
 *     no `src/pages/pricing.astro` route to collide with it.
 *
 * `PRICING_ENABLED` is the single switch a future update flips once real
 * plans exist. Nothing in this file is imported by a page unless
 * `PRICING_ENABLED` is checked first, so turning it on is the only step
 * needed to bring a real pricing section into `/owners` (or a future
 * `/pricing` page) later - no layout or copy changes required.
 */

export const PRICING_ENABLED = false;

/**
 * 2026-11-09 - owner, for the Google Ads page: "499 per month up to 3 listing
 * and all", everything crystal clear. These are the live plan prices (admin >
 * Plans, changed 2026-10-10; docs/OPERATIONS.md "Plan prices"): per property,
 * by its number of rooms, no GST added (StayKeep is not GST-registered), yearly
 * = 10 x monthly. Change them here when admin > Plans changes.
 */
export interface RoomPlan {
  /** The most listings the plan covers. */
  maxListings: number;
  /** "Up to 3 listings", "4 to 6 listings". */
  listings: string;
  monthly: number;
  yearly: number;
}

/**
 * A listing is each room, cottage or whole villa a property rents out (what
 * the product counts as rooms). Owner, 9 Nov 2026: say "listing", not "room".
 */
export const LISTING_MEANING = 'A listing is each room, cottage or whole villa you rent out.';

export const ROOM_PLANS: RoomPlan[] = [
  { maxListings: 3, listings: 'Up to 3 listings', monthly: 499, yearly: 4990 },
  { maxListings: 6, listings: '4 to 6 listings', monthly: 899, yearly: 8990 },
  { maxListings: 10, listings: '7 to 10 listings', monthly: 1299, yearly: 12990 },
  { maxListings: 25, listings: '11 to 25 listings', monthly: 2499, yearly: 24990 },
  { maxListings: 50, listings: '26 to 50 listings', monthly: 4999, yearly: 49990 },
  { maxListings: 100, listings: '51 to 100 listings', monthly: 9999, yearly: 99990 },
];

/**
 * The channel manager add-on, on top of the plan (owner, 9 Nov 2026: "1000 for
 * up to 15 rooms and 2500 above that, this is additional"). Monthly only.
 */
export const CHANNEL_MANAGER_ADDON = [
  { listings: 'Up to 15 listings', monthly: 1000 },
  { listings: 'More than 15 listings', monthly: 2500 },
];

/** "₹1,299" (Indian digit grouping). */
export function rupees(n: number): string {
  return `₹${n.toLocaleString('en-IN')}`;
}

export const PRICING_FAQ_QUESTION = 'How much does StayKeep cost?';

export const PRICING_FAQ_ANSWER =
  `${rupees(499)} a month for a property with up to 3 listings. ${LISTING_MEANING} Bigger properties: ` +
  ROOM_PLANS.slice(1).map((p) => `${p.listings} ${rupees(p.monthly)}`).join(', ') +
  ' a month. Pay yearly and get 12 months for the price of 10. A booking website is free with every plan. No GST is added, and there is never a commission on your bookings. ' +
  `The channel manager is an add-on: ${rupees(1000)} a month for up to 15 listings, ${rupees(2500)} a month for more than 15. ` +
  'More than 100 listings: talk to us at hello@staykeep.com or +91 99807 83609.';

/**
 * Reserved for when real plans exist. Kept here, unused, so a pricing
 * section/page can be built against a stable shape without a rewrite -
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
