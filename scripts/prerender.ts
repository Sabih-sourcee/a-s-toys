import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';
import { CATEGORIES, PRODUCTS } from '../src/data/products';
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  categoryDescription,
  categoryTitle,
  productDescription,
  productJsonLd,
  productTitle,
} from '../src/lib/seo';

const env = loadEnv('production', process.cwd(), '');
const siteUrl = (env.VITE_SITE_URL || 'https://usmanitoys.com').replace(/\/$/, '');
const verification = env.VITE_GOOGLE_SITE_VERIFICATION || '';
const phone = env.VITE_SHOP_PHONE || 'TODO: shop phone';
const address = env.VITE_SHOP_ADDRESS || 'TODO: shop address';
const exchangePolicy = env.VITE_EXCHANGE_POLICY || 'TODO: 7-day exchange policy';
const deliveryCharges = env.VITE_DELIVERY_CHARGES || 'TODO: delivery charges';
const courier = env.VITE_COURIER || 'TODO: courier';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

function esc(value: string): string {
  return value.replace(/[&<>"']/g, (char) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char] || char
  ));
}

function render(opts: { title: string; description: string; urlPath: string; body: string; jsonLd?: unknown }): string {
  const canonical = `${siteUrl}${opts.urlPath === '/' ? '' : opts.urlPath}` || siteUrl;
  const canonicalHref = opts.urlPath === '/' ? `${siteUrl}/` : `${siteUrl}${opts.urlPath}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(opts.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(opts.description)}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${esc(opts.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${esc(opts.description)}" />`
  );

  const head = [
    `<link rel="canonical" href="${esc(canonicalHref)}" />`,
    `<meta property="og:url" content="${esc(canonicalHref)}" />`,
    verification ? `<meta name="google-site-verification" content="${esc(verification)}" />` : '',
    opts.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(opts.jsonLd).replace(/</g, '\\u003c')}</script>`
      : '',
  ].filter(Boolean).join('\n    ');

  html = html.replace('</head>', `    ${head}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${opts.body}</div>`);
  void canonical;
  return html;
}

function writePage(urlPath: string, html: string) {
  const rel = urlPath === '/' ? 'index.html' : path.join(urlPath.replace(/^\//, ''), 'index.html');
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function productList(products: typeof PRODUCTS): string {
  return `<ul>${products.map((product) => (
    `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a> — Rs. ${product.price.toLocaleString('en-PK')} PKR</li>`
  )).join('')}</ul>`;
}

const trust = `<ul>
  <li>Phone: ${esc(phone)}</li>
  <li>Address: ${esc(address)}</li>
  <li>7-day exchange: ${esc(exchangePolicy)}</li>
  <li>Delivery charges: ${esc(deliveryCharges)}</li>
  <li>Courier: ${esc(courier)}</li>
</ul>`;

writePage('/', render({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  urlPath: '/',
  body: `<main><h1>${esc(HOME_TITLE)}</h1><p>${esc(HOME_DESCRIPTION)}</p>${productList(PRODUCTS)}<p><a href="/about">About A&amp;S Toys</a></p>${trust}</main>`,
}));

writePage('/shop', render({
  title: `All Toys Price in Pakistan | A&S Toys`,
  description: 'All toy prices in Pakistan from A&S Toys. Cash on delivery.',
  urlPath: '/shop',
  body: `<main><h1>All Toys Price in Pakistan</h1>${productList(PRODUCTS)}</main>`,
}));

writePage('/about', render({
  title: `About A&S Toys | Toy Shop in Pakistan`,
  description: 'About A&S Toys. Cash on delivery toy shop in Pakistan. Exchange policy, delivery charges, and contact.',
  urlPath: '/about',
  body: `<main><h1>About A&amp;S Toys</h1><p>Cash on delivery toy shop. Contact and policy details:</p>${trust}</main>`,
}));

for (const category of CATEGORIES) {
  const items = PRODUCTS.filter((product) => product.category === category.slug);
  writePage(`/category/${category.slug}`, render({
    title: categoryTitle(category.name),
    description: categoryDescription(category.name, category.description),
    urlPath: `/category/${category.slug}`,
    body: `<main><h1>${esc(category.name)} Price in Pakistan</h1><p>${esc(category.description)}</p>${productList(items)}</main>`,
  }));
}

for (const product of PRODUCTS) {
  writePage(`/products/${product.slug}`, render({
    title: productTitle(product),
    description: productDescription(product),
    urlPath: `/products/${product.slug}`,
    jsonLd: productJsonLd(product, siteUrl),
    body: `<article><h1>${esc(product.title)} Price in Pakistan</h1><p>Rs. ${product.price.toLocaleString('en-PK')} PKR</p><p>${esc(product.shortDescription)}</p><p>${esc(product.fullDescription)}</p><p><a href="/category/${esc(product.category)}">${esc(product.categoryName)}</a></p></article>`,
  }));
}

const urls = [
  '/',
  '/shop',
  '/about',
  ...CATEGORIES.map((category) => `/category/${category.slug}`),
  ...PRODUCTS.map((product) => `/products/${product.slug}`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((urlPath) => `  <url><loc>${siteUrl}${urlPath === '/' ? '/' : urlPath}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

const htaccess = path.resolve('public/.htaccess');
if (fs.existsSync(htaccess)) {
  fs.copyFileSync(htaccess, path.join(dist, '.htaccess'));
}

console.log(`Prerendered ${urls.length} routes, sitemap.xml, robots.txt, .htaccess`);
