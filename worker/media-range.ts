/**
 * 2026-10-27: byte ranges for the self-hosted ad video under `/media/`. Safari on iPhone first
 * asks for `Range: bytes=0-1` and plays a video only when the answer is a 206; the static asset
 * server answers every request with the whole file (200). So for `/media/*` this worker serves
 * the range itself from the full asset. Files there are small (under 25 MB, the Workers asset
 * limit), so reading one into memory is fine.
 */
const MEDIA_PREFIX = '/media/';

export type ByteRange = { start: number; end: number };

/**
 * The single range a `Range` header asks for, clamped to `size`. `null` means "send the whole
 * file" (no header, another unit, or several ranges: a 200 is a valid answer to all of them);
 * `'invalid'` means the range cannot be met (416).
 */
export function parseRange(header: string | null, size: number): ByteRange | 'invalid' | null {
  if (!header) return null;
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!m) return null;
  const [, a, b] = m;
  if (a === '' && b === '') return null;
  if (a === '') {
    const suffix = Number(b);
    if (suffix === 0 || size === 0) return 'invalid';
    return { start: Math.max(0, size - suffix), end: size - 1 };
  }
  const start = Number(a);
  const end = b === '' ? size - 1 : Math.min(Number(b), size - 1);
  if (start >= size || start > end) return 'invalid';
  return { start, end };
}

/** A 200, 206 or 416 for a `/media/` file, or null to fall through. GET and HEAD only. */
export async function handleMediaRange(request: Request, assets: Fetcher): Promise<Response | null> {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const url = new URL(request.url);
  if (!url.pathname.startsWith(MEDIA_PREFIX)) return null;

  const plain = new Headers(request.headers);
  plain.delete('Range');
  plain.delete('If-Range');
  const full = await assets.fetch(new Request(url.toString(), { method: 'GET', headers: plain }));
  if (full.status !== 200) return full;

  const headers = new Headers(full.headers);
  headers.set('Accept-Ranges', 'bytes');
  const head = request.method === 'HEAD';
  const range = request.headers.get('Range');
  if (!range) return new Response(head ? null : full.body, { status: 200, headers });

  const body = await full.arrayBuffer();
  const size = body.byteLength;
  const r = parseRange(range, size);
  if (r === null) {
    headers.set('Content-Length', String(size));
    return new Response(head ? null : body, { status: 200, headers });
  }
  if (r === 'invalid') {
    headers.set('Content-Range', `bytes */${size}`);
    headers.set('Content-Length', '0');
    return new Response(null, { status: 416, headers });
  }
  headers.set('Content-Range', `bytes ${r.start}-${r.end}/${size}`);
  headers.set('Content-Length', String(r.end - r.start + 1));
  return new Response(head ? null : body.slice(r.start, r.end + 1), { status: 206, headers });
}
