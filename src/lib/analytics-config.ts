/**
 * A2 - analytics config for the marketing site. Both ids are PUBLIC and
 * build-time (`PUBLIC_GA4_ID`, `PUBLIC_CLARITY_ID`); unset means nothing is
 * rendered, nothing loads and nothing is requested. The Google Ads tag id
 * lives in src/content/ads.ts (empty by default).
 */
import { GOOGLE_ADS_ID } from '../content/ads';

export const GA4_ID: string = (import.meta.env.PUBLIC_GA4_ID ?? '').trim();
export const CLARITY_ID: string = (import.meta.env.PUBLIC_CLARITY_ID ?? '').trim();
export const ADS_ENABLED: boolean = GOOGLE_ADS_ID.trim() !== '';
export const ANALYTICS_ENABLED: boolean = GA4_ID !== '' || CLARITY_ID !== '' || ADS_ENABLED;
