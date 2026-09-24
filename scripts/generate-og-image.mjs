#!/usr/bin/env node
// Higher-resolution restoration of the booking app icon. Original stays in assets/brand.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const logo = join(ROOT, "src/assets/brand/booking-app-logo-hq.png");
await mkdir(PUBLIC, { recursive: true });
await Promise.all(
  [32, 192, 512].map((size) =>
    sharp(logo)
      .resize(size, size)
      .png()
      .toFile(join(PUBLIC, `icon-${size}.png`)),
  ),
);
await writeFile(
  join(PUBLIC, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><image width="192" height="192" href="data:image/png;base64,${(await readFile(join(PUBLIC, "icon-192.png"))).toString("base64")}"/></svg>`,
);
await sharp(logo)
  .resize(180, 180)
  .flatten({ background: "#14665f" })
  .png()
  .toFile(join(PUBLIC, "apple-touch-icon.png"));
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f5f7ff"/><text x="165" y="119" font-family="sans-serif" font-size="42" font-weight="700" fill="#18233e">StayKeep</text><text x="70" y="278" font-family="sans-serif" font-size="78" font-weight="700" fill="#18233e">Great stays.</text><text x="70" y="377" font-family="sans-serif" font-size="78" font-weight="700" fill="#2856c7">Zero booking commission.</text><text x="74" y="456" font-family="sans-serif" font-size="30" fill="#606b80">Book directly. Keep more.</text><text x="74" y="565" font-family="sans-serif" font-size="24" fill="#18233e">Find a stay · List your property                 staykeep.com</text></svg>`;
await sharp(Buffer.from(svg))
  .composite([
    {
      input: await sharp(await readFile(logo))
        .resize(66, 66)
        .toBuffer(),
      left: 74,
      top: 68,
    },
  ])
  .png()
  .toFile(join(PUBLIC, "og.png"));
console.log("Generated social image and booking-app brand icons.");
