/// <reference types="@cloudflare/workers-types" />

/**
 * Phase 54 D2: `https://staykeep.com/sitemaps/sites.xml`, a <sitemapindex> of every published
 * builder site's own sitemap, built from the backend's public index. Cached 1 h at the edge;
 * on backend failure the last good copy is served, else 503 (never an empty index, which would
 * tell search engines the sites are gone).
 */

/** The one place the backend path lives. */
export const SITES_INDEX_URL =
  'https://staykeep-backend-c2moe422na-el.a.run.app/v1/public/sites-index';
export const SITES_SITEMAP_PATH = '/sitemaps/sites.xml';
const CACHE_KEY = 'https://staykeep.com/__cache/sitemaps/sites.xml';
const FETCH_TIMEOUT_MS = 10_000;
const MAX_AGE = 3600;

interface IndexItem {
  sitemap: string;
  updatedAt?: string | null;
}

export function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Null when the payload has no usable item (so the caller never emits an empty index). */
export function renderSitemapIndex(payload: unknown): string | null {
  const items = (payload as { items?: unknown } | null)?.items;
  if (!Array.isArray(items)) return null;
  const entries: string[] = [];
  for (const raw of items as IndexItem[]) {
    const loc = raw?.sitemap;
    if (typeof loc !== 'string' || !/^https:\/\/[a-z0-9-]+\.staykeep\.com\//.test(loc)) continue;
    const t = raw.updatedAt ? new Date(raw.updatedAt) : null;
    const lastmod = t && !Number.isNaN(t.getTime()) ? `<lastmod>${t.toISOString()}</lastmod>` : '';
    entries.push(`<sitemap><loc>${xmlEscape(loc)}</loc>${lastmod}</sitemap>`);
  }
  if (entries.length === 0) return null;
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</sitemapindex>\n`;
}

function xmlResponse(body: string, extra?: HeadersInit): Response {
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `public, max-age=${MAX_AGE}`,
      'X-Content-Type-Options': 'nosniff',
      ...extra,
    },
  });
}

export interface SitemapDeps {
  fetchFn?: typeof fetch;
  cache?: Cache;
  now?: () => number;
}

export async function handleSitesSitemap(
  request: Request,
  ctx: { waitUntil(p: Promise<unknown>): void },
  deps: SitemapDeps = {},
): Promise<Response> {
  const cache = deps.cache ?? (caches as unknown as { default: Cache }).default;
  const fetchFn = deps.fetchFn ?? fetch;
  const now = deps.now ?? Date.now;
  const key = new Request(CACHE_KEY);

  const stored = await cache.match(key).catch(() => undefined);
  const storedAt = stored ? Number(stored.headers.get('X-Stored-At') ?? 0) : 0;
  if (stored && now() - storedAt < MAX_AGE * 1000) return withBody(stored, request);

  try {
    const res = await fetchFn(SITES_INDEX_URL, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`index ${res.status}`);
    const xml = renderSitemapIndex(await res.json());
    if (!xml) throw new Error('index empty or malformed');
    ctx.waitUntil(
      cache.put(
        key,
        new Response(xml, {
          headers: { 'Content-Type': 'application/xml; charset=utf-8', 'X-Stored-At': String(now()) },
        }),
      ),
    );
    return request.method === 'HEAD' ? xmlResponse('') : xmlResponse(xml);
  } catch (err) {
    console.error(JSON.stringify({ evt: 'sites_sitemap_failed', err: String(err) }));
    if (stored) return withBody(stored, request, { 'Cache-Control': 'public, max-age=300' });
    return new Response('Temporarily unavailable', {
      status: 503,
      headers: { 'Retry-After': '300', 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
}

async function withBody(stored: Response, request: Request, extra?: HeadersInit): Promise<Response> {
  return xmlResponse(request.method === 'HEAD' ? '' : await stored.clone().text(), extra);
}
