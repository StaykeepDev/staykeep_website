#!/usr/bin/env node
/**
 * Generates the social-share OG image and the raster favicon/apple-touch
 * icons at build time, straight into `public/` so `astro build` copies them
 * into `dist/` like any other static asset.
 *
 * Text uses the generic `serif` / `sans-serif` CSS families rather than the
 * brand fonts on purpose: librsvg (the SVG renderer behind `sharp`) resolves
 * those through whatever fontconfig has available, which is guaranteed on
 * every machine this runs on (a laptop, a GitHub Actions runner) without
 * bundling font files into this script. The brand mark itself (the circle +
 * keyhole) is drawn as plain shapes, so it is pixel-exact everywhere.
 */
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = join(ROOT, 'public');

const TEAL = '#00695c';
const IVORY = '#f7f3ec';
const PRIMARY_CONTAINER = '#dcebe6';
const ON_SURFACE = '#1f2a27';
const ON_SURFACE_VARIANT = '#5e6a66';

function keyholeMark(cx, cy, scale, fill) {
  const r = 16 * scale;
  const holeR = 3.4 * scale;
  const holeCx = cx;
  const holeCy = cy - 3.4 * scale;
  const rectW = 3.4 * scale;
  const rectH = 8.2 * scale;
  const rectX = cx - rectW / 2;
  const rectY = cy - 1 * scale;
  const rectRx = 1.7 * scale;
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${TEAL}" />
    <circle cx="${holeCx}" cy="${holeCy}" r="${holeR}" fill="${fill}" />
    <rect x="${rectX}" y="${rectY}" width="${rectW}" height="${rectH}" rx="${rectRx}" fill="${fill}" />
  `;
}

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${IVORY}" />
      <circle cx="${width + 40}" cy="${height * 0.5}" r="360" fill="${PRIMARY_CONTAINER}" />
      <circle cx="${width - 60}" cy="90" r="120" fill="${PRIMARY_CONTAINER}" opacity="0.7" />

      ${keyholeMark(92, 96, 1.5, '#ffffff')}
      <text x="140" y="106" font-family="serif" font-weight="700" font-size="44" fill="${ON_SURFACE}">StayKeep</text>

      <text x="90" y="300" font-family="serif" font-weight="700" font-size="92" fill="${TEAL}">0% commission.</text>
      <text x="90" y="400" font-family="serif" font-weight="700" font-size="92" fill="${ON_SURFACE}">On every booking.</text>

      <text x="90" y="460" font-family="sans-serif" font-weight="400" font-size="30" fill="${ON_SURFACE_VARIANT}">Guests pay less. Owners keep more.</text>

      <text x="90" y="560" font-family="sans-serif" font-weight="600" font-size="26" fill="${ON_SURFACE}">staykeep.com</text>
    </svg>
  `;

  await sharp(Buffer.from(svg)).png().toFile(join(PUBLIC_DIR, 'og.png'));
}

async function generateIcon(fileName, size) {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="${TEAL}" />
      <circle cx="16" cy="12.6" r="3.4" fill="#ffffff" />
      <rect x="14.3" y="15" width="3.4" height="8.2" rx="1.7" fill="#ffffff" />
    </svg>
  `;
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC_DIR, fileName));
}

/** Apple touch icons want a filled square (no transparency) per Apple HIG. */
async function generateAppleTouchIcon() {
  const size = 180;
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="${TEAL}" />
      <circle cx="16" cy="12.6" r="3.6" fill="#ffffff" />
      <rect x="14.1" y="15.1" width="3.8" height="9" rx="1.9" fill="#ffffff" />
    </svg>
  `;
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(join(PUBLIC_DIR, 'apple-touch-icon.png'));
}

async function main() {
  await mkdir(PUBLIC_DIR, { recursive: true });
  await generateOgImage();
  await generateIcon('icon-32.png', 32);
  await generateIcon('icon-192.png', 192);
  await generateIcon('icon-512.png', 512);
  await generateAppleTouchIcon();
  console.log('Generated public/og.png, apple-touch-icon.png, icon-32/192/512.png');
}

main().catch((error) => {
  console.error('generate-og-image failed:', error);
  process.exitCode = 1;
});
