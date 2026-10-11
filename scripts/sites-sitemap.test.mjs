// Phase 54 D2 handler tests. Run with `node --test scripts/` (Node strips the .ts types).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleSitesSitemap, renderSitemapIndex, SITES_INDEX_URL } from '../worker/sites-sitemap.ts';

function fakeCache() {
  const m = new Map();
  return {
    match: async (r) => m.get(r.url)?.clone(),
    put: async (r, res) => void m.set(r.url, res),
  };
}
const ctx = () => {
  const p = [];
  return { waitUntil: (x) => p.push(x), done: () => Promise.all(p) };
};
const payload = {
  items: [
    { slug: 'a', url: 'https://a.staykeep.com/', sitemap: 'https://a.staykeep.com/sitemap.xml', updatedAt: '2026-10-01T10:00:00.000Z' },
    { slug: 'b', url: 'https://b.staykeep.com/', sitemap: 'https://b.staykeep.com/sitemap.xml?x=1&y=2', updatedAt: '2026-10-02T10:00:00.000Z' },
  ],
};
const ok = () => async (url) => {
  assert.equal(url, SITES_INDEX_URL);
  return Response.json(payload);
};
const req = () => new Request('https://staykeep.com/sitemaps/sites.xml');

test('shape, lastmod and escaping', async () => {
  const c = ctx();
  const res = await handleSitesSitemap(req(), c, { fetchFn: ok(), cache: fakeCache() });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Content-Type'), 'application/xml; charset=utf-8');
  assert.equal(res.headers.get('Cache-Control'), 'public, max-age=3600');
  const xml = await res.text();
  assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8"\?>\n<sitemapindex xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.ok(xml.includes('<sitemap><loc>https://a.staykeep.com/sitemap.xml</loc><lastmod>2026-10-01T10:00:00.000Z</lastmod></sitemap>'));
  assert.ok(xml.includes('<loc>https://b.staykeep.com/sitemap.xml?x=1&amp;y=2</loc>'));
});

test('skips foreign hosts and never renders an empty index', () => {
  assert.equal(renderSitemapIndex({ items: [] }), null);
  assert.equal(renderSitemapIndex({ items: [{ sitemap: 'https://evil.example/sitemap.xml' }] }), null);
  assert.equal(renderSitemapIndex(null), null);
});

test('second call within the hour is served from cache', async () => {
  const cache = fakeCache();
  let n = 0;
  const fetchFn = async () => (n++, Response.json(payload));
  const c = ctx();
  await handleSitesSitemap(req(), c, { fetchFn, cache, now: () => 1000 });
  await c.done();
  const res = await handleSitesSitemap(req(), c, { fetchFn, cache, now: () => 2000 });
  assert.equal(n, 1);
  assert.match(await res.text(), /a\.staykeep\.com/);
});

test('backend failure serves the last good copy, else 503 with Retry-After', async () => {
  const cache = fakeCache();
  const c = ctx();
  const down = async () => new Response('x', { status: 500 });
  const none = await handleSitesSitemap(req(), c, { fetchFn: down, cache });
  assert.equal(none.status, 503);
  assert.ok(none.headers.get('Retry-After'));

  await handleSitesSitemap(req(), c, { fetchFn: ok(), cache, now: () => 0 });
  await c.done();
  const stale = await handleSitesSitemap(req(), c, { fetchFn: down, cache, now: () => 2 * 3600 * 1000 });
  assert.equal(stale.status, 200);
  assert.match(await stale.text(), /<sitemapindex/);

  const throwing = async () => { throw new Error('timeout'); };
  const stale2 = await handleSitesSitemap(req(), c, { fetchFn: throwing, cache, now: () => 2 * 3600 * 1000 });
  assert.equal(stale2.status, 200);
});

test('an empty backend index is a failure, not an empty sitemap', async () => {
  const res = await handleSitesSitemap(req(), ctx(), {
    fetchFn: async () => Response.json({ items: [] }),
    cache: fakeCache(),
  });
  assert.equal(res.status, 503);
});
