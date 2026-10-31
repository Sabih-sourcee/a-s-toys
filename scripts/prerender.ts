import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';
import { LANDINGS, landingJsonLd, landingProducts } from '../src/data/landings';
import { ABOUT_FEATURED_SLUGS, CATEGORIES, PRODUCTS, relatedProducts } from '../src/data/products';
import { config } from '../src/config';
import {
  ABOUT_DESCRIPTION,
  ABOUT_TITLE,
  HOME_DESCRIPTION,
  HOME_TITLE,
  absolutePageUrl,
  aboutPageJsonLd,
  canonicalPath,
  categoryDescription,
  categoryItemListJsonLd,
  categoryTitle,
  organizationJsonLd,
  productDescription,
  productJsonLd,
  productPhotoAlt,
  productTitle,
  homeJsonLd,
} from '../src/lib/seo';
import { HOME_FAQS, ORDER_STEPS, SHOP } from '../src/data/homeFaq';

const env = loadEnv('production', process.cwd(), '');
const siteUrl = (env.VITE_SITE_URL || 'https://usmanitoys.com').replace(/\/$/, '');
const verification = env.VITE_GOOGLE_SITE_VERIFICATION || '';
const phone = env.VITE_SHOP_PHONE || config.phone;
const phoneTel = config.phoneTel;
const whatsappPhone = config.whatsappPhone;
const whatsappUrl = `https://wa.me/${config.whatsappNumber}`;
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

function render(opts: { title: string; description: string; urlPath: string; body: string; image?: string; jsonLd?: unknown }): string {
  const canonicalHref = absolutePageUrl(siteUrl, opts.urlPath);
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
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${esc(opts.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${esc(opts.description)}" />`
  );

  const image = opts.image
    ? (opts.image.startsWith('http') ? opts.image : `${siteUrl}${opts.image.startsWith('/') ? opts.image : `/${opts.image}`}`)
    : '';
  const head = [
    `<link rel="canonical" href="${esc(canonicalHref)}" />`,
    `<meta property="og:url" content="${esc(canonicalHref)}" />`,
    `<meta property="og:locale" content="en_PK" />`,
    `<meta name="twitter:title" content="${esc(opts.title)}" />`,
    `<meta name="twitter:description" content="${esc(opts.description)}" />`,
    `<meta name="robots" content="max-image-preview:large" />`,
    `<link rel="alternate" type="text/plain" href="${esc(absolutePageUrl(siteUrl, '/llms.txt'))}" title="llms.txt" />`,
    image ? `<meta property="og:image" content="${esc(image)}" />` : '',
    verification ? `<meta name="google-site-verification" content="${esc(verification)}" />` : '',
    `<script type="application/ld+json">${JSON.stringify(organizationJsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
    opts.jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(opts.jsonLd).replace(/</g, '\\u003c')}</script>`
      : '',
  ].filter(Boolean).join('\n    ');

  html = html.replace('</head>', `    ${head}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${opts.body}</div>`);
  const noscript = `<noscript><p>${esc(SHOP.brand)} is a toy shop in ${esc(SHOP.city)}, ${esc(SHOP.country)}. ${esc(SHOP.noWalkIn)} Call ${esc(SHOP.phone)}. WhatsApp ${esc(SHOP.whatsapp)}. Email ${esc(SHOP.email)}. ${esc(SHOP.returns)} Delivery is free over ${esc(SHOP.freeOver)}. Courier: ${esc(SHOP.courier)}.</p><ul>${PRODUCTS.map((product) => `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a></li>`).join('')}</ul></noscript>`;
  html = html.replace('</body>', `  ${noscript}\n  </body>`);
  return html;
}

function writePage(urlPath: string, html: string) {
  const canon = canonicalPath(urlPath);
  const rel = canon === '/' ? 'index.html' : path.join(canon.replace(/^\//, ''), 'index.html');
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

function productList(products: typeof PRODUCTS): string {
  return `<ul>${products.map((product) => (
    `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a> — Rs. ${product.price.toLocaleString('en-PK')} PKR</li>`
  )).join('')}</ul>`;
}

function namedLinks(items: { href: string; name: string }[]): string {
  return `<ul>${items.map((item) => `<li><a href="${esc(item.href)}">${esc(item.name)}</a></li>`).join('')}</ul>`;
}

const catalogIndex = `<section><h2>All toys</h2><p>Categories</p><ul>${CATEGORIES.map((category) => `<li><a href="/category/${esc(category.slug)}">${esc(category.name)}</a></li>`).join('')}</ul><p>Products</p><ul>${PRODUCTS.map((product) => `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a></li>`).join('')}</ul></section>`;
const aboutFacts = `<section><h2>About A &amp; S Toys</h2><p>${esc(SHOP.brand)} is a ${esc(SHOP.city)} toy shop. ${esc(SHOP.noWalkIn)} Prices from ${esc(SHOP.priceFrom)}.</p><p>Delivery is ${esc(SHOP.deliveryFee)}, free over ${esc(SHOP.freeOver)}, in ${esc(SHOP.deliveryTime)}, via ${esc(SHOP.courier)}. ${esc(SHOP.payment)}</p><p>${esc(SHOP.returns)} Call ${esc(SHOP.phone)}. WhatsApp ${esc(SHOP.whatsapp)}. ${esc(SHOP.email)}.</p></section>`;
const aboutFaqs = HOME_FAQS.map((faq) => `<details><summary>${esc(faq.question)}</summary><p>${esc(faq.answer)}</p></details>`).join('');
const aboutOrder = `<h2>How to order from A &amp; S Toys</h2><ol>${ORDER_STEPS.map((step) => `<li>${esc(step)}</li>`).join('')}</ol>`;
const toyGuides = `<h2>Toy guides</h2><ul>${LANDINGS.map((page) => `<li><a href="${esc(page.path)}">${esc(page.navLabel)}</a></li>`).join('')}</ul>`;

const aboutFeatured = ABOUT_FEATURED_SLUGS.map((slug) => {
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) throw new Error(`Missing about-page product: ${slug}`);
  return product;
});

const trust = `<ul>
  <li>Call: <a href="tel:${esc(phoneTel)}">${esc(phone)}</a></li>
  <li>WhatsApp: <a href="${esc(whatsappUrl)}">${esc(whatsappPhone)}</a></li>
  <li>Address: ${esc(address)}</li>
  <li>7-day exchange: ${esc(exchangePolicy)}</li>
  <li>Delivery charges: ${esc(deliveryCharges)}</li>
  <li>Courier: ${esc(courier)}</li>
</ul>`;

writePage('/', render({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  urlPath: '/',
  body: `<main><h1>${esc(HOME_TITLE)}</h1><p>A &amp; S Toys is a Karachi toy shop that sells its own A &amp; S toys online and delivers them across Pakistan.</p><p>${esc(HOME_DESCRIPTION)}</p><p><a href="/about">About &amp; FAQ</a></p>${trust}</main>`,
  jsonLd: homeJsonLd(siteUrl),
}));

writePage('/shop', render({
  title: `All Toys Price in Pakistan | A & S Toys`,
  description: 'All toy prices in Pakistan from A & S Toys. Cash on delivery.',
  urlPath: '/shop',
  body: `<main><h1>All Toys Price in Pakistan</h1>${productList(PRODUCTS)}</main>`,
}));

writePage('/about', render({
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  urlPath: '/about',
  jsonLd: aboutPageJsonLd(),
  body: `<main><h1>Toys ordered online in Karachi, delivered across Pakistan</h1><p>A &amp; S Toys is an online toy store based in Karachi. Orders ship nationwide. There is no walk-in counter.</p><p><a href="/shop">Shop all toys</a></p><ul>${aboutFeatured.map((product) => `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a></li>`).join('')}</ul>${aboutFacts}<h2>Questions</h2>${aboutFaqs}${aboutOrder}${toyGuides}${catalogIndex}${trust}</main>`,
}));

for (const category of CATEGORIES) {
  const items = PRODUCTS.filter((product) => product.category === category.slug);
  writePage(`/category/${category.slug}`, render({
    title: categoryTitle(category.name),
    description: categoryDescription(category.name, category.description),
    urlPath: `/category/${category.slug}`,
    jsonLd: categoryItemListJsonLd(siteUrl, category.name, items),
    body: `<main><h1>${esc(category.name)} Price in Pakistan</h1><p>${esc(category.description)}</p>${productList(items)}</main>`,
  }));
}

for (const page of LANDINGS) {
  const linked = landingProducts(page);
  writePage(page.path, render({
    title: page.title,
    description: page.description,
    urlPath: page.path,
    jsonLd: landingJsonLd(page, siteUrl),
    body: `<main><h1>${esc(page.h1)}</h1>${page.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}<h2>Questions</h2>${page.faqs.map((faq) => `<section><h3>${esc(faq.question)}</h3><p>${esc(faq.answer)}</p></section>`).join('')}<h2>Toys on this page</h2><ul>${linked.map((product) => `<li><a href="/products/${esc(product.slug)}">${esc(product.title)}</a></li>`).join('')}</ul></main>`,
  }));
}

for (const product of PRODUCTS) {
  writePage(`/products/${product.slug}`, render({
    title: productTitle(product),
    description: productDescription(product),
    urlPath: `/products/${product.slug}`,
    image: product.image,
    jsonLd: productJsonLd(product, siteUrl),
    body: `<article><h1>${esc(product.title)} Price in Pakistan</h1><p>Rs. ${product.price.toLocaleString('en-PK')} PKR</p><img src="${esc(product.image)}" alt="${esc(productPhotoAlt(product, 0))}" />${product.galleryImages.map((src, index) => `<img src="${esc(src)}" alt="${esc(productPhotoAlt(product, index + 1))}" />`).join('')}<p>${esc(product.shortDescription)}</p><p>${esc(product.fullDescription)}</p><p><a href="/category/${esc(product.category)}">${esc(product.categoryName)}</a></p><h2>Related toys</h2>${namedLinks(relatedProducts(product).map((item) => ({ href: `/products/${item.slug}`, name: item.title })))}</article>`,
  }));
}

const urls = [
  '/',
  '/shop',
  '/about',
  ...CATEGORIES.map((category) => `/category/${category.slug}`),
  ...LANDINGS.map((page) => page.path),
  ...PRODUCTS.map((product) => `/products/${product.slug}`),
];

const notFound = render({
  title: 'Page not found | A & S Toys',
  description: 'That page is not on A & S Toys.',
  urlPath: '/404.html',
  body: '<main><h1>Page not found</h1><p><a href="/">Back home</a></p></main>',
}).replaceAll('content="max-image-preview:large"', 'content="noindex"');
fs.writeFileSync(path.join(dist, '404.html'), notFound);

function imageSitemapBlock(urlPath: string, images: { src: string; title: string }[]): string {
  const loc = absolutePageUrl(siteUrl, urlPath);
  const tags = images.map((image) => `    <image:image><image:loc>${absolutePageUrl(siteUrl, image.src)}</image:loc><image:title>${esc(image.title)}</image:title></image:image>`).join('\n');
  return `  <url><loc>${loc}</loc>\n${tags}\n  </url>`;
}

const pageUrls = urls.filter((urlPath) => !urlPath.startsWith('/products/'));
const productUrls = PRODUCTS.map((product) => imageSitemapBlock(`/products/${product.slug}`, [
  { src: product.image, title: product.title },
  ...product.galleryImages.map((src) => ({ src, title: product.title })),
]));
const extraUrls = ['/llms.txt', '/llms-full.txt', '/.well-known/llms.txt'];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pageUrls.map((urlPath) => `  <url><loc>${absolutePageUrl(siteUrl, urlPath)}</loc></url>`).join('\n')}
${productUrls.join('\n')}
${extraUrls.map((urlPath) => `  <url><loc>${absolutePageUrl(siteUrl, urlPath)}</loc></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

const bots = ['GPTBot', 'Google-Extended', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended', 'CCBot', 'cohere-ai', 'Amazonbot', 'FacebookBot', 'Bytespider'];
const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  ...bots.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
  `Sitemap: ${siteUrl}/sitemap.xml`,
  '',
].join('\n');
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

const llms = [
  `# ${SHOP.brand}`,
  '',
  `${SHOP.brand} is a ${SHOP.city} toy shop selling A & S toys from ${SHOP.priceFrom}, with cash on delivery and delivery across ${SHOP.country} in ${SHOP.deliveryTime}.`,
  '',
  `Website: ${SHOP.url}`,
  `About, FAQ, and all toys: ${SHOP.url}/about`,
  `Phone: ${SHOP.phone}`,
  `WhatsApp: ${SHOP.whatsapp}`,
  `Email: ${SHOP.email}`,
  SHOP.noWalkIn,
  `Delivery: ${SHOP.deliveryFee}, free over ${SHOP.freeOver}, ${SHOP.deliveryTime}, ${SHOP.courier}.`,
  `Payment: ${SHOP.payment}`,
  `Returns: ${SHOP.returns}`,
  '',
  '## Products',
  ...PRODUCTS.map((product) => `- ${product.title} (${product.price} PKR): ${SHOP.url}/products/${product.slug}`),
  '',
  '## Questions',
  ...HOME_FAQS.flatMap((faq) => [`Q: ${faq.question}`, `A: ${faq.answer}`, '']),
  '## Target queries',
  '- A & S kitchen set',
  '- A & S building blocks',
  '- building blocks set Pakistan',
  '- kitchen set toys Pakistan',
  '- toys online Karachi',
  '- toys with COD Pakistan',
  '',
].join('\n');
const llmsFull = `${llms}\n## How to order\n${ORDER_STEPS.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n`;
for (const [rel, body] of [
  ['llms.txt', llms],
  ['llms-full.txt', llmsFull],
  [path.join('.well-known', 'llms.txt'), llms],
] as const) {
  const out = path.join(dist, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, body);
  const pub = path.join('public', rel);
  fs.mkdirSync(path.dirname(pub), { recursive: true });
  fs.writeFileSync(pub, body);
}

const htaccess = path.resolve('public/.htaccess');
if (fs.existsSync(htaccess)) {
  fs.copyFileSync(htaccess, path.join(dist, '.htaccess'));
}

console.log(`Prerendered ${urls.length} routes, 404.html, sitemap.xml, robots.txt, llms.txt, .htaccess`);
