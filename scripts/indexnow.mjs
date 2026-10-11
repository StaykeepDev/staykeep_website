#!/usr/bin/env node
/**
 * IndexNow: tell Bing and other participating engines about every URL in the
 * sitemap. Run AFTER a deploy:  node scripts/indexnow.mjs [sitemap-url-or-path]
 * Default is the live https://staykeep.com/sitemap.xml; pass dist/sitemap.xml
 * to use the local build. The key file public/<key>.txt must already be live.
 */
import { readFile } from 'node:fs/promises';

const KEY = 'c2d6bf704b73e87cb5f6423cea2ef751';
const HOST = 'staykeep.com';
const source = process.argv[2] || `https://${HOST}/sitemap.xml`;

const xml = /^https?:/.test(source)
  ? await (await fetch(source)).text()
  : await readFile(source, 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (urlList.length === 0) throw new Error('indexnow: no <loc> entries found in ' + source);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`indexnow: submitted ${urlList.length} URL(s), HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exitCode = 1;
