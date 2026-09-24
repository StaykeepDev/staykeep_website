/// <reference types="@cloudflare/workers-types" />

/**
 * StayKeep marketing site worker.
 *
 * The site is fully static (Astro output in `dist/`, served through the
 * `ASSETS` binding declared in `wrangler.toml`). This worker exists for
 * exactly one piece of logic that a static host can't express on its own:
 * redirecting `www.staykeep.com` to the apex `staykeep.com`, preserving the
 * path and query string. Everything else — including the legacy 301s in
 * `public/_redirects` and the security headers in `public/_headers` — is
 * handled by the asset server itself, which is why every other request is
 * simply handed to `env.ASSETS.fetch(request)`.
 *
 * `run_worker_first = true` in `wrangler.toml` means this `fetch` runs for
 * EVERY request, including ones that would otherwise be served straight
 * from static assets — so this handler must stay this small and must always
 * fall through to ASSETS for anything it doesn't special-case.
 */

export interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Plain http never serves a page: the old host (Vercel) redirected it, and HSTS
    // only protects a browser that has already been here once.
    if (url.protocol === 'http:' && url.hostname.endsWith('staykeep.com')) {
      const target = new URL(url.toString());
      target.protocol = 'https:';
      if (target.hostname === 'www.staykeep.com') target.hostname = 'staykeep.com';
      return Response.redirect(target.toString(), 301);
    }

    if (url.hostname === 'www.staykeep.com') {
      const target = new URL(url.toString());
      target.hostname = 'staykeep.com';
      // Always redirect to https, regardless of the scheme this request
      // arrived on — staykeep.com never serves plain http.
      target.protocol = 'https:';
      return Response.redirect(target.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
