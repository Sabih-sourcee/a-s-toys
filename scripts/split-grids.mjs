/**
 * Split 2x2 product grids into four WebP angles.
 *
 * Run from anywhere, with a directory of grid files:
 *   node scripts/split-grids.mjs /path/to/grids
 *
 * Each grid is named NN_4angles.png or NN_4angles.webp (01 through 21).
 * If both exist for one number, the WebP is used. The number-to-slug map
 * is scripts/grid-slugs.json. Source grids are not written into the repo.
 *
 * Quadrant order, left to right, top to bottom:
 *   <slug>-1.webp  top-left, the card image
 *   <slug>-2.webp  top-right
 *   <slug>-3.webp  bottom-left
 *   <slug>-4.webp  bottom-right
 *
 * Output: public/images/products/, about 800x800, each file under 120 KB.
 * Quality is lowered until the file fits. Only numbers present in the
 * directory are rewritten, so a later folder of replacement grids can
 * be passed on its own.
 *
 * Products 12, 14, and 20 are provisional. When new grids arrive, rerun
 * this command on a directory that contains those files.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const MAX_BYTES = 120 * 1024;
const TARGET = 800;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mapPath = path.join(root, 'scripts', 'grid-slugs.json');
const outDir = path.join(root, 'public', 'images', 'products');

const gridDir = process.argv[2];
if (!gridDir) {
  console.error('Usage: node scripts/split-grids.mjs <grid-directory>');
  process.exit(1);
}

const map = JSON.parse(await fs.readFile(mapPath, 'utf8'));
const slugs = map.slugs;
const provisional = new Set(map.provisional || []);
const absoluteDir = path.resolve(gridDir);
const names = await fs.readdir(absoluteDir);

/** @type {Map<string, string>} */
const chosen = new Map();
for (const name of names) {
  const match = name.match(/^(\d{1,2})_4angles\.(png|webp)$/i);
  if (!match) continue;
  const num = match[1].padStart(2, '0');
  const ext = match[2].toLowerCase();
  const previous = chosen.get(num);
  if (!previous || ext === 'webp') chosen.set(num, name);
}

if (chosen.size === 0) {
  console.error(`No NN_4angles.png or NN_4angles.webp files in ${absoluteDir}`);
  process.exit(1);
}

await fs.mkdir(outDir, { recursive: true });

const numbers = [...chosen.keys()].sort();
let failed = 0;

for (const num of numbers) {
  const slug = slugs[num];
  if (!slug) {
    console.error(`${num}: no slug in scripts/grid-slugs.json, skipped`);
    failed += 1;
    continue;
  }

  const source = path.join(absoluteDir, chosen.get(num));
  const meta = await sharp(source).metadata();
  if (!meta.width || !meta.height) {
    console.error(`${num}: could not read ${source}`);
    failed += 1;
    continue;
  }

  const leftW = Math.floor(meta.width / 2);
  const rightW = meta.width - leftW;
  const topH = Math.floor(meta.height / 2);
  const botH = meta.height - topH;
  const rects = [
    { left: 0, top: 0, width: leftW, height: topH },
    { left: leftW, top: 0, width: rightW, height: topH },
    { left: 0, top: topH, width: leftW, height: botH },
    { left: leftW, top: topH, width: rightW, height: botH },
  ];

  const note = provisional.has(num) ? ' provisional' : '';
  console.log(`${num} ${slug}${note}  ${path.basename(source)} ${meta.width}x${meta.height}`);

  for (let index = 0; index < rects.length; index += 1) {
    const encoded = await encodeQuadrant(source, rects[index]);
    const dest = path.join(outDir, `${slug}-${index + 1}.webp`);
    await fs.writeFile(dest, encoded.buffer);
    const kb = (encoded.buffer.length / 1024).toFixed(1);
    console.log(
      `  ${slug}-${index + 1}.webp  ${encoded.size}x${encoded.size}  q${encoded.quality}  ${kb} KB`
    );
  }
}

if (failed > 0) process.exit(1);

async function encodeQuadrant(source, rect) {
  const master = await sharp(source)
    .extract(rect)
    .resize(TARGET, TARGET, { fit: 'fill' })
    .png()
    .toBuffer();

  let size = TARGET;
  let quality = 80;
  let buffer = await sharp(master).webp({ quality, effort: 6 }).toBuffer();

  while (buffer.length > MAX_BYTES && quality > 30) {
    quality -= 5;
    buffer = await sharp(master).resize(size, size, { fit: 'fill' }).webp({ quality, effort: 6 }).toBuffer();
  }

  while (buffer.length > MAX_BYTES && size > 640) {
    size -= 40;
    quality = Math.max(quality, 45);
    buffer = await sharp(master).resize(size, size, { fit: 'fill' }).webp({ quality, effort: 6 }).toBuffer();
    while (buffer.length > MAX_BYTES && quality > 30) {
      quality -= 5;
      buffer = await sharp(master).resize(size, size, { fit: 'fill' }).webp({ quality, effort: 6 }).toBuffer();
    }
  }

  if (buffer.length > MAX_BYTES) {
    throw new Error(`Could not get a quadrant under 120 KB (${buffer.length} bytes)`);
  }

  return { buffer, quality, size };
}
