/**
 * Phase 60 S7: `https://staykeep.com/b/:code` is the booking short link in our SMS
 * (`staykeep.com` is the DLT-whitelisted domain). A well-formed code is 302-redirected to
 * the booking site's `/s/:code`; anything else falls through to the normal 404.
 * The code is 12 chars from the look-alike-free alphabet the backend issues.
 */
export const SHORT_CODE = /^[abcdefghjkmnpqrstuvwxyz23456789]{12}$/;
const PREFIX = '/b/';
const TARGET = 'https://app.staykeep.com/s/';

/** The redirect target for a request path, or null when this is not a short link. */
export function shortLinkTarget(pathname: string): string | null {
  if (!pathname.startsWith(PREFIX)) return null;
  const code = pathname.slice(PREFIX.length);
  return SHORT_CODE.test(code) ? `${TARGET}${code}` : null;
}

/** A 302 to the booking site, or null to fall through. GET and HEAD only. */
export function handleShortLink(request: Request): Response | null {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  const target = shortLinkTarget(new URL(request.url).pathname);
  if (target === null) return null;
  return new Response(null, {
    status: 302,
    headers: { Location: target, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
}
