// Phase 60 S7 redirect tests. Run with `node --test scripts/*.test.mjs` (Node strips the .ts types).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleShortLink, shortLinkTarget, SHORT_CODE } from '../worker/short-link.ts';

const CODE = 'abcdefghjkmn';
const get = (path, method = 'GET') => new Request(`https://staykeep.com${path}`, { method });

test('a well-formed code is a 302 to the booking site', () => {
  const res = handleShortLink(get(`/b/${CODE}`));
  assert.equal(res.status, 302);
  assert.equal(res.headers.get('Location'), `https://app.staykeep.com/s/${CODE}`);
  assert.equal(handleShortLink(get(`/b/${CODE}`, 'HEAD')).status, 302);
});

test('the STYKEP short link (the DLT CTA form) redirects the same way', () => {
  const res = handleShortLink(get(`/STYKEP/${CODE}`));
  assert.equal(res.status, 302);
  assert.equal(res.headers.get('Location'), `https://app.staykeep.com/s/${CODE}`);
  assert.equal(handleShortLink(get(`/STYKEP/${CODE}`, 'HEAD')).status, 302);
  for (const path of ['/STYKEP/', '/STYKEP', `/stykep/${CODE}`, `/STYKEP/${CODE}x`, `/STYKEP/${CODE}/extra`]) {
    assert.equal(handleShortLink(get(path)), null, path);
  }
});

test('digits 2-9 are in the alphabet', () => {
  assert.equal(shortLinkTarget('/b/23456789pqrs'), 'https://app.staykeep.com/s/23456789pqrs');
});

test('anything else falls through (null)', () => {
  for (const path of [
    '/b/',
    '/b',
    '/b/short',
    `/b/${CODE}x`,
    `/b/${CODE.slice(1)}`,
    '/b/ABCDEFGHJKMN',
    '/b/abcdefghjkm0',
    '/b/abcdefghjkml',
    '/b/abcdefghjkmo',
    '/b/abcdefghjkm1',
    `/b/${CODE}/extra`,
    `/x/b/${CODE}`,
    '/sitemaps/sites.xml',
    '/',
  ]) {
    assert.equal(handleShortLink(get(path)), null, path);
  }
});

test('only GET and HEAD redirect', () => {
  assert.equal(handleShortLink(get(`/b/${CODE}`, 'POST')), null);
});

test('the alphabet has 31 characters and no look-alikes', () => {
  assert.equal(SHORT_CODE.source.match(/\[(.*?)\]/)[1].length, 31);
  assert.ok(!/[01lio]/.test(SHORT_CODE.source.match(/\[(.*?)\]/)[1]));
});
