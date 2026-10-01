// Run with `node --test scripts/`. A7: analytics origins only when ids are set.
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { withAnalyticsOrigins } from './patch-csp-hashes.mjs';

const BASE =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; object-src 'none'";
const HOSTS = ['googletagmanager.com', 'google-analytics.com', 'analytics.google.com', 'clarity.ms', 'c.bing.com'];

test('no ids: the policy is untouched', () => {
  const out = withAnalyticsOrigins(BASE, { ga4: false, clarity: false });
  assert.equal(out, BASE);
  for (const h of HOSTS) assert.ok(!out.includes(h));
});

test('GA4 only: GA4 origins in script, connect and img, no Clarity', () => {
  const out = withAnalyticsOrigins(BASE, { ga4: true, clarity: false });
  assert.match(out, /script-src 'self' https:\/\/www\.googletagmanager\.com/);
  assert.match(out, /connect-src 'self' .*google-analytics\.com.*analytics\.google\.com/);
  assert.match(out, /img-src 'self' data: https:\/\/www\.googletagmanager\.com/);
  assert.ok(!out.includes('clarity.ms') && !out.includes('c.bing.com'));
});

test('Clarity only: Clarity origins, no GA4', () => {
  const out = withAnalyticsOrigins(BASE, { ga4: false, clarity: true });
  assert.match(out, /script-src 'self' https:\/\/\*\.clarity\.ms/);
  assert.match(out, /connect-src 'self' https:\/\/\*\.clarity\.ms https:\/\/c\.bing\.com/);
  assert.ok(!out.includes('googletagmanager') && !out.includes('google-analytics'));
});
