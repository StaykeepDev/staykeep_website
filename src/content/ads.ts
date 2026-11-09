/**
 * Ad landing page config (/host). Every value the owner fills in
 * lives here, and nowhere else. Plan: docs/ads/google-ads-plan.md.
 *
 * Empty values are safe: no Google Ads tag loads, the CSP is unchanged, and
 * the video slot shows its poster image only.
 */

/** WhatsApp number, digits only with the country code (no +, no spaces). */
export const WHATSAPP_NUMBER = '919980783609';
export const WHATSAPP_TEXT = 'Hi StayKeep, please set up my property on StayKeep PMS. Google Maps link: ';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;

/**
 * Self-hosted ad video, for example '/media/homestay-hook-v2.mp4' (a file in
 * public/media/, MP4 H.264, under 25 MB: a Workers static asset limit).
 * Empty: the slot shows the poster only.
 */
// Owner, 9 Nov 2026: the hook-v2 video is off the page until the new PMS video is made
// (the slot shows the calendar screenshot meanwhile). Was '/media/homestay-hook-v2.mp4'.
export const AD_VIDEO_SRC = '';

/**
 * Poster frame for the video (a file in public/media/, 1280 x 720). Empty:
 * the video uses the calendar screenshot poster.
 */
export const AD_VIDEO_POSTER = '';

/**
 * Google Ads tag id, 'AW-' followed by digits. Empty: no Google Ads tag.
 * scripts/patch-csp-hashes.mjs reads this line to add the Google Ads origins
 * to the CSP, so keep it a plain single-quoted string.
 */
export const GOOGLE_ADS_ID = '';

/** One Google Ads conversion label per CTA (the part after the '/' in send_to). */
export const GOOGLE_ADS_LABELS = {
  whatsapp: '',
  call: '',
  signup: '',
};
