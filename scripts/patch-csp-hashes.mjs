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

async function main() {
  const htmlFiles = await findHtmlFiles(DIST_DIR);
  const allHashes = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf8');
    for (const hash of extractInlineScriptHashes(html)) {
      allHashes.add(hash);
    }
  }

  if (allHashes.size === 0) {
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
  const patchedPolicy = originalPolicy.replace("script-src 'self'", `script-src 'self' ${hashList}`);
  headers = headers.replace(cspLineRegex, `$1${patchedPolicy}`);

  await writeFile(HEADERS_PATH, headers);
  console.log(`patch-csp-hashes: added ${allHashes.size} script hash(es) to dist/_headers.`);
}

main().catch((error) => {
  console.error('patch-csp-hashes failed:', error);
  process.exitCode = 1;
});
