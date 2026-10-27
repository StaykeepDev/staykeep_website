// Byte ranges for /media/ (the ad video). Run with `node --test scripts/*.test.mjs` (Node strips the .ts types).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleMediaRange, parseRange } from '../worker/media-range.ts';

const BYTES = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const assets = {
  async fetch(req) {
    if (req.headers.get('Range')) throw new Error('the asset server must not see the Range header');
    if (!new URL(req.url).pathname.startsWith('/media/')) return new Response('page', { status: 200 });
    if (req.url.endsWith('/missing.mp4')) return new Response('nope', { status: 404 });
    return new Response(BYTES, {
      status: 200,
      headers: { 'Content-Type': 'video/mp4', ETag: '"v1"', 'Content-Length': '10' },
    });
  },
};
const req = (path, { method = 'GET', range } = {}) =>
  new Request(`https://staykeep.com${path}`, { method, headers: range ? { Range: range } : {} });
const bytesOf = async (res) => [...new Uint8Array(await res.arrayBuffer())];

test('parseRange: open, closed, suffix, clamped, unsatisfiable, ignored', () => {
  assert.deepEqual(parseRange('bytes=0-1', 10), { start: 0, end: 1 });
  assert.deepEqual(parseRange('bytes=5-', 10), { start: 5, end: 9 });
  assert.deepEqual(parseRange('bytes=-3', 10), { start: 7, end: 9 });
  assert.deepEqual(parseRange('bytes=-30', 10), { start: 0, end: 9 });
  assert.deepEqual(parseRange('bytes=8-100', 10), { start: 8, end: 9 });
  assert.equal(parseRange('bytes=10-', 10), 'invalid');
  assert.equal(parseRange('bytes=5-2', 10), 'invalid');
  assert.equal(parseRange('bytes=-0', 10), 'invalid');
  assert.equal(parseRange(null, 10), null);
  assert.equal(parseRange('bytes=0-1,4-5', 10), null);
  assert.equal(parseRange('items=0-1', 10), null);
  assert.equal(parseRange('bytes=-', 10), null);
});

test("Safari's first ask (bytes=0-1) gets a 206 with two bytes", async () => {
  const res = await handleMediaRange(req('/media/a.mp4', { range: 'bytes=0-1' }), assets);
  assert.equal(res.status, 206);
  assert.equal(res.headers.get('Content-Range'), 'bytes 0-1/10');
  assert.equal(res.headers.get('Content-Length'), '2');
  assert.equal(res.headers.get('Accept-Ranges'), 'bytes');
  assert.equal(res.headers.get('Content-Type'), 'video/mp4');
  assert.equal(res.headers.get('ETag'), '"v1"');
  assert.deepEqual(await bytesOf(res), [0, 1]);
});

test('an open range and a suffix range', async () => {
  assert.deepEqual(await bytesOf(await handleMediaRange(req('/media/a.mp4', { range: 'bytes=7-' }), assets)), [7, 8, 9]);
  const suffix = await handleMediaRange(req('/media/a.mp4', { range: 'bytes=-2' }), assets);
  assert.equal(suffix.headers.get('Content-Range'), 'bytes 8-9/10');
  assert.deepEqual(await bytesOf(suffix), [8, 9]);
});

test('no Range: the whole file, saying ranges work', async () => {
  const res = await handleMediaRange(req('/media/a.mp4'), assets);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('Accept-Ranges'), 'bytes');
  assert.equal((await bytesOf(res)).length, 10);
});

test('a range past the end is a 416', async () => {
  const res = await handleMediaRange(req('/media/a.mp4', { range: 'bytes=10-' }), assets);
  assert.equal(res.status, 416);
  assert.equal(res.headers.get('Content-Range'), 'bytes */10');
});

test('HEAD with a range: the 206 headers, no body', async () => {
  const res = await handleMediaRange(req('/media/a.mp4', { method: 'HEAD', range: 'bytes=0-1' }), assets);
  assert.equal(res.status, 206);
  assert.equal(res.headers.get('Content-Length'), '2');
  assert.equal(res.body, null);
});

test('a missing file keeps the asset server answer; other paths and methods fall through', async () => {
  assert.equal((await handleMediaRange(req('/media/missing.mp4', { range: 'bytes=0-1' }), assets)).status, 404);
  assert.equal(await handleMediaRange(req('/homestay-software', { range: 'bytes=0-1' }), assets), null);
  assert.equal(await handleMediaRange(req('/media/a.mp4', { method: 'POST' }), assets), null);
});
