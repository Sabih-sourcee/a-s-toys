import fs from 'node:fs';
import path from 'node:path';
import { LANDINGS } from '../src/data/landings';
import { PRODUCTS } from '../src/data/products';

const SHOP_AMOUNTS = new Set([250, 300, 3500]);

function walk(dir: string, acc: string[] = []): string[] {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(tsx?|html)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

/** Visible copy must spell the brand 'A & S Toys'. alternateName fields may use the other forms. */
export function assertBrandCopy(distDir: string): void {
  const hits: string[] = [];
  const pattern = /A&S Toys|A and S Toys/;
  for (const file of walk('src')) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, index) => {
      if (line.includes('alternateName')) return;
      if (pattern.test(line)) hits.push(`${file}:${index + 1}: ${line.trim()}`);
    });
  }
  for (const file of walk(distDir)) {
    const visible = fs.readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/gi, '');
    if (pattern.test(visible)) hits.push(`${file}: visible HTML`);
  }
  if (hits.length) {
    throw new Error(`Brand spelling in visible copy:\n${hits.join('\n')}`);
  }
}

function rupeeAmounts(text: string): number[] {
  return [...text.matchAll(/Rs\.?\s*([0-9][0-9,]*)/g)].map((match) => Number(match[1].replace(/,/g, '')));
}

function landingText(page: (typeof LANDINGS)[number] & {
  intro?: string;
  sections?: {
    heading: string;
    paragraphs?: string[];
    list?: string[];
    table?: { caption: string; columns: string[]; rows: string[][] };
  }[];
}): string {
  const parts: string[] = [page.title, page.description, page.h1, ...page.paragraphs];
  if (page.intro) parts.push(page.intro);
  for (const faq of page.faqs) parts.push(faq.question, faq.answer);
  for (const section of page.sections ?? []) {
    parts.push(section.heading, ...(section.paragraphs ?? []), ...(section.list ?? []));
    if (section.table) {
      parts.push(section.table.caption, ...section.table.columns, ...section.table.rows.flat());
    }
  }
  return parts.join('\n');
}

/**
 * A sentence that names one of our products and states an Rs amount must use that product's price.
 * Shop figures (Rs 250, Rs 300, Rs 3,500) and market-listing sentences are allowed.
 */
export function assertLandingPrices(): void {
  const problems: string[] = [];
  for (const page of LANDINGS) {
    const sentences = landingText(page).split(/(?<=[.!?])\s+|\n+/);
    for (const sentence of sentences) {
      if (/shop listings|other shops|elsewhere|usually cost/i.test(sentence)) continue;
      for (const product of PRODUCTS) {
        if (!sentence.includes(product.title)) continue;
        for (const amount of rupeeAmounts(sentence)) {
          if (amount === product.price || SHOP_AMOUNTS.has(amount)) continue;
          problems.push(`${page.path}: "${product.title}" near Rs ${amount}, catalog price is Rs ${product.price}`);
        }
      }
    }
  }
  if (problems.length) {
    throw new Error(`Landing price mismatch:\n${problems.join('\n')}`);
  }
}
