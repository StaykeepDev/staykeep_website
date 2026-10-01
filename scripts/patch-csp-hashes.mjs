#!/usr/bin/env node
/**
 * Patches exact `sha256-` hashes for every inline, executable <script> Astro
 * emits into dist/_headers' Content-Security-Policy, after `astro build`.
 *
 * Why this exists: the brief asks for a strict, self-only CSP with no
 * `unsafe-inline` on scripts. Astro's own runtime unavoidably inlines a
 * couple of tiny bootstrap scripts whenever a `client:` island is used (the
 * custom-element/hydration loader), and — found by inspecting the actual
 * build output rather than assumed — it also inlines this site's own
 * Header.astro mobile-menu script as `<script type="module">` rather than
 * extracting it to an external file. None of these have a `src`, so
 * `script-src 'self'` alone would silently break the mobile menu and the
 * calculator's hydration. Content-hash allowlisting keeps script-src free of
 * 'unsafe-inline' while still allowing exactly these known, build-produced
 * scripts — any injected script would hash differently and stay blocked.
 *
 * `<script type="application/ld+json">` (Organization/WebSite structured
 * data) is skipped on purpose: it is never executed as script by the HTML
 * spec's own script-preparation algorithm, so CSP's script-blocking hook
 * never fires for it regardless of type — verified against real browser
 * behaviour, not assumed either.
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = join(ROOT, 'dist');
const HEADERS_PATH = join(DIST_DIR, '_headers');

const EXECUTABLE_TYPES = new Set(['', 'module', 'text/javascript', 'application/javascript']);

async function findHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractInlineScriptHashes(html) {
  const hashes = new Set();
  const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    const [, attrs, content] = match;
    if (/\ssrc\s*=/.test(attrs)) continue; // external script, governed by nothing here
    const typeMatch = /\stype\s*=\s*["']([^"']*)["']/i.exec(attrs);
    const type = typeMatch ? typeMatch[1].toLowerCase() : '';
    if (!EXECUTABLE_TYPES.has(type)) continue; // e.g. application/ld+json — never executed
    if (content.trim() === '') continue;
    const hash = createHash('sha256').update(content, 'utf8').digest('base64');
    hashes.add(`'sha256-${hash}'`);
  }
  return hashes;
}

/**
 * A7 - analytics origins, added to dist/_headers ONLY when the matching public
 * id is set at build time (`PUBLIC_GA4_ID` / `PUBLIC_CLARITY_ID`, from the
 * environment or a `.env` file, the same sources Astro reads). With neither
 * set the CSP is untouched. This site's CSP has no `connect-src`/`img-src`
 * widening otherwise, so the directives are appended or extended here.
 */
export const GA4_ORIGINS = {
  script: ['https://www.googletagmanager.com'],
  connect: ['https://www.googletagmanager.com', 'https://*.google-analytics.com', 'https://*.analytics.google.com'],
  img: ['https://www.googletagmanager.com', 'https://*.google-analytics.com'],
};
export const CLARITY_ORIGINS = {
  script: ['https://*.clarity.ms'],
  connect: ['https://*.clarity.ms', 'https://c.bing.com'],
  img: ['https://*.clarity.ms', 'https://c.bing.com'],
};

export function withAnalyticsOrigins(policy, { ga4, clarity }) {
  const add = { script: [], connect: [], img: [] };
  for (const [on, o] of [[ga4, GA4_ORIGINS], [clarity, CLARITY_ORIGINS]]) {
    if (!on) continue;
    add.script.push(...o.script);
    add.connect.push(...o.connect);
    add.img.push(...o.img);
  }
  const directives = policy.split(';').map((d) => d.trim()).filter((d) => d !== '');
  const extend = (name, extra, base) => {
    if (extra.length === 0) return;
    const i = directives.findIndex((d) => d.split(/\s+/)[0] === name);
    if (i >= 0) directives[i] = `${directives[i]} ${extra.join(' ')}`;
    else directives.push(`${name} ${base} ${extra.join(' ')}`);
  };
  extend('script-src', add.script, "'self'");
  // `connect-src` is absent from this CSP and falls back to `default-src 'self'`.
  extend('connect-src', add.connect, "'self'");
  extend('img-src', add.img, "'self'");
  return directives.join('; ');
}

async function readEnvId(name) {
  if (process.env[name]) return process.env[name].trim();
  for (const file of ['.env.production.local', '.env.local', '.env.production', '.env']) {
    try {
      const text = await readFile(join(ROOT, file), 'utf8');
      const m = new RegExp(`^${name}\\s*=\\s*(.*)$`, 'm').exec(text);
      if (m) return m[1].trim().replace(/^["']|["']$/g, '');
    } catch {
      /* no such file */
    }
  }
  return '';
}

async function main() {
  const htmlFiles = await findHtmlFiles(DIST_DIR);
  const allHashes = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    for (const hash of extractInlineScriptHashes(html)) {
      allHashes.add(hash);
    }
  }

  const ga4 = (await readEnvId('PUBLIC_GA4_ID')) !== '';
  const clarity = (await readEnvId('PUBLIC_CLARITY_ID')) !== '';

  if (allHashes.size === 0 && !ga4 && !clarity) {
    console.log('patch-csp-hashes: no inline scripts found, _headers left unchanged.');
    return;
  }

  let headers = await readFile(HEADERS_PATH, 'utf8');
  const cspLineRegex = /(Content-Security-Policy:\s*)([^\n]*)/;
  const cspMatch = cspLineRegex.exec(headers);
  if (!cspMatch) {
    throw new Error('patch-csp-hashes: no Content-Security-Policy line found in dist/_headers');
  }

  const hashList = [...allHashes].sort().join(' ');
  const originalPolicy = cspMatch[2];
  if (!originalPolicy.includes("script-src 'self'")) {
    throw new Error(
      "patch-csp-hashes: expected \"script-src 'self'\" in the CSP to extend with hashes; found: " + originalPolicy,
    );
  }
  let patchedPolicy =
    allHashes.size === 0
      ? originalPolicy
      : originalPolicy.replace("script-src 'self'", `script-src 'self' ${hashList}`);
  patchedPolicy = withAnalyticsOrigins(patchedPolicy, { ga4, clarity });
  // A function replacer: `$` in a policy must never be read as a pattern.
  headers = headers.replace(cspLineRegex, (_m, head) => `${head}${patchedPolicy}`);

  await writeFile(HEADERS_PATH, headers);
  console.log(
    `patch-csp-hashes: added ${allHashes.size} script hash(es) to dist/_headers` +
      `${ga4 || clarity ? ` and analytics origins (ga4=${ga4}, clarity=${clarity})` : ''}.`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    console.error('patch-csp-hashes failed:', error);
    process.exitCode = 1;
  });
}
