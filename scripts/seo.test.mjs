// Run with `node --test scripts/` AFTER a build (reads dist/).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const ROOT = new URL('../', import.meta.url).pathname;

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await htmlFiles(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function graphOf(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  assert.ok(blocks.length >= 1, 'has JSON-LD');
  return blocks.flatMap((b) => b['@graph'] ?? [b]);
}
const byType = (g, t) => g.filter((n) => n['@type'] === t);

test('JSON-LD on every page parses and has the required fields', async () => {
  for (const f of await htmlFiles(DIST)) {
    const html = await readFile(f, 'utf8');
    const g = graphOf(html);
    const [org] = byType(g, 'Organization');
    assert.equal(org.legalName, 'STAYKEEP (OPC) PRIVATE LIMITED', f);
    assert.equal(org.identifier, 'U79900KL2025OPC097111', f);
    assert.equal(org.address.postalCode, '673575', f);
    assert.equal(org.address.addressCountry, 'IN', f);
    assert.equal(org.sameAs.length, 2, f);
    const [site] = byType(g, 'WebSite');
    assert.match(site.potentialAction.target.urlTemplate, /^https:\/\/app\.staykeep\.com\/stays\?q=\{search_term_string\}$/, f);
    assert.equal(byType(g, 'SoftwareApplication').length, 2, f);
    // The guest app is free; StayKeep Manage has paid plans, so it carries no price at all.
    for (const a of byType(g, 'SoftwareApplication')) {
      if (a['@id'].endsWith('#app-guest')) assert.equal(a.offers.price, '0', f);
      else assert.equal(a.offers, undefined, f);
    }
    const robots = html.match(/<meta name="robots" content="([^"]*)"/)?.[1];
    assert.ok(robots, f + ' has robots meta');
    if (f.endsWith('404.html')) assert.match(robots, /noindex/);
    else assert.equal(robots, 'index, follow, max-image-preview:large, max-snippet:-1');
    if (!f.endsWith('index.html') && !f.endsWith('404.html')) {
      const [bc] = byType(g, 'BreadcrumbList');
      assert.ok(bc && bc.itemListElement.length === 2, f + ' breadcrumb');
    }
  }
});

test('FAQPage on home and owners, About/Contact page types', async () => {
  for (const p of ['index', 'owners']) {
    const g = graphOf(await readFile(join(DIST, p + '.html'), 'utf8'));
    const [faq] = byType(g, 'FAQPage');
    assert.ok(faq.mainEntity.length >= 3, p);
    for (const q of faq.mainEntity) assert.ok(q.name && q.acceptedAnswer.text);
  }
  assert.equal(byType(graphOf(await readFile(join(DIST, 'about.html'), 'utf8')), 'AboutPage').length, 1);
  assert.equal(byType(graphOf(await readFile(join(DIST, 'contact.html'), 'utf8')), 'ContactPage').length, 1);
});

test('robots.txt has the AI crawler groups and the Sitemap line', async () => {
  const r = await readFile(join(DIST, 'robots.txt'), 'utf8');
  for (const b of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot', 'DuckAssistBot', 'meta-externalagent']) {
    assert.match(r, new RegExp(`^User-agent: ${b}\\nAllow: /$`, 'm'), b);
  }
  assert.match(r, /^Sitemap: https:\/\/staykeep\.com\/sitemap\.xml$/m);
  assert.match(r, /^Sitemap: https:\/\/staykeep\.com\/sitemaps\/sites\.xml$/m);
  assert.match(r, /llms\.txt/);
});

test('llms.txt format and no long dashes', async () => {
  const t = await readFile(join(DIST, 'llms.txt'), 'utf8');
  assert.ok(t.startsWith('# StayKeep'));
  assert.match(t, /^> .+/m);
  assert.ok(t.includes('https://play.google.com/store/apps/details?id=com.staykeep.app'));
  const full = await readFile(join(DIST, 'llms-full.txt'), 'utf8');
  assert.ok(full.startsWith('# StayKeep'));
  for (const s of [t, full]) assert.ok(!/[–—]/.test(s), 'no em/en dash');
});

test('sitemap has lastmod and the IndexNow key file matches', async () => {
  const x = await readFile(join(DIST, 'sitemap.xml'), 'utf8');
  assert.equal((x.match(/<lastmod>\d{4}-\d\d-\d\d<\/lastmod>/g) ?? []).length, 7);
  const script = await readFile(join(ROOT, 'scripts/indexnow.mjs'), 'utf8');
  const key = script.match(/const KEY = '([0-9a-f]{32})'/)[1];
  assert.equal(await readFile(join(DIST, key + '.txt'), 'utf8'), key);
});

test('CSP covers every executable inline script', async () => {
  const headers = await readFile(join(DIST, '_headers'), 'utf8');
  const { createHash } = await import('node:crypto');
  for (const f of await htmlFiles(DIST)) {
    for (const m of (await readFile(f, 'utf8')).matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\ssrc\s*=/.test(m[1]) || /ld\+json/.test(m[1]) || m[2].trim() === '') continue;
      const h = createHash('sha256').update(m[2], 'utf8').digest('base64');
      assert.ok(headers.includes(`sha256-${h}`), `${f}: inline script hash missing`);
    }
  }
});
